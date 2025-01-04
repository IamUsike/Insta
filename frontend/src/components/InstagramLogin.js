import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function InstagramLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setError("");

  const loginData = {
    username,
    password,
  };

  try {
    const response = await fetch("http://localhost:8000/accounts/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
      redirect: "manual", // Handle redirects manually
    });

    if (response.ok) {
      // Handle redirect if the backend sends a redirect
      const redirectUrl = response.headers.get("Location");
      if (redirectUrl) {
        window.location.href = redirectUrl;
      } else {
        console.log("Login successful");
      }
    } else {
      // Check if the response has a JSON body
      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        const errorData = await response.json();
        setError(errorData.message || "An error occurred during login.");
      } else {
        setError("An error occurred, but no additional details are available.");
      }
    }
  } catch (error) {
    console.error("Login failed:", error);
    setError("An unexpected error occurred. Please try again.");
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
