import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import error from "../../../components/Images/error.png";

function PaymentFailed() {
  const navigate = useNavigate();

  // Navigate to the profile page after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/profile"); // Change this route if your profile page URL is different
    }, 1000); // 1-second delay

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, [navigate]);

  return (
    <div className="overflow-x-hidden">
      <div className="flex flex-col items-center justify-center h-screen bg-cream-100">
        <div>
          <img src={error} alt="Payment Failed" />
        </div>

        <div className="mt-8 text-center text-xl">Payment Failed</div>
        <div className="mt-2 text-center text-sm text-gray-600">
          Oops, Your payment failed!!
        </div>
      </div>
    </div>
  );
}

export default PaymentFailed;
