import React, { useState } from "react";

function InstagramLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful");
        window.location.href = "/dashboard"; // Redirect after login
      } else {
        setError(data.message || "An error occurred during login.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              required
            />
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
