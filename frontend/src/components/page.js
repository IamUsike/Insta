import React from "react";
import TwoFactorVerification from "./2fa-verification";

const Page = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <TwoFactorVerification message="Enter the code we sent via WhatsApp to your mobile number." />
    </div>
  );
};

export default Page;
