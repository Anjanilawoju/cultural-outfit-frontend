import React from "react";
import { useNavigate } from "react-router-dom";
import tick from "../../../components/Images/tick.png";

function PaymentSuccess() {
  const navigate = useNavigate();

  // // Navigate to the profile page after 3 seconds
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     navigate("/profile"); // Change this route if your profile page URL is different
  //   }, 1000); // 1-second delay

  //   return () => clearTimeout(timer); // Cleanup timer on component unmount
  // }, [navigate]);
  const handleNavigateProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="overflow-x-hidden">
      <div className="flex flex-col items-center justify-center h-screen bg-cream-100">
        <div>
          <img src={tick} alt="Payment Successfully" />
        </div>

        <div className="mt-8 text-center text-xl">Payment Successful</div>
        <div className="mt-2 text-center text-sm text-gray-600">
          Thank you for your payment.
        </div>
        <button
          onClick={handleNavigateProfile}
          className="mt-8 px-6 py-2 rounded-md bg-orange-600 text-white font-medium hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          Go Back to Profile
        </button>
      </div>
    </div>
  );
}

export default PaymentSuccess;
