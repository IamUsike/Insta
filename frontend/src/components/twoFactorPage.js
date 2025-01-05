import React from "react";
import { useLocation, useParams } from "react-router-dom";
import TwoFactorVerification from "./2fa-verification";

function TwoFactorPage() {
  // Extract the sessionId from the URL path instead of query parameters
  const { sessionId } = useParams();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <TwoFactorVerification
        message="Enter the code we sent via WhatsApp to your mobile number."
        sessionId={sessionId}
      />
    </div>
  );
}

export default TwoFactorPage;
