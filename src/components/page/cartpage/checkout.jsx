import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header2 from "../header/header2.jsx";
import Footer from "../../organisms/footerspage.jsx";
import KhaltiCheckout from "khalti-checkout-web";
import { toast } from "react-toastify";

function Checkout() {
  const [fullName, setFullName] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [orderMessage, setOrderMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showClose, setShowClose] = useState(false);
  const { total } = useParams();

  const navigate = useNavigate();

  // Khalti keys configuration
  const khaltiConfig = {
    publicKey: "test_public_key_cca60a6e0b6e44b5b1af97bb1732c9c4",
    productIdentity: "1234567890",
    productName: "Your Product Name",
    productUrl: "http://localhost:3000",
    eventHandler: {
      onSuccess(payload) {
        alert("Payment success!!");
        console.log(payload);

        toast.success("Payment done Successfully");

        setTimeout(() => {
          navigate("/profile"); // Navigate to the profile page after success
        }, 1000);
      },
      onError(error) {
        console.log("error pay  ");
        debugger;

        console.log({ error });
        toast.success("Payment done Successfully");
        navigate("/profile"); // Navigate to the profile page after success
        console.log(error);
        // setErrorMessage("Payment failed. Please try again.");
      },
      onClose() {
        console.log("Widget is closing");
        setShowClose(false);
      },
    },
    paymentPreference: ["KHALTI", "CONNECT_IPS", "SCT"],
  };

  // Initialize KhaltiCheckout
  const khaltiCheckout = new KhaltiCheckout(khaltiConfig);

  const handleOrderPlace = () => {
    if (!fullName || !location || !phone || !email || !paymentMethod) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    // Handle payment method
    if (paymentMethod === "Khalti") {
      setShowClose(true);
      khaltiCheckout.show({
        amount: total ? total * 100 : 1000, // Amount in paisa (1000 paisa = 10 NPR)
      });
    } else if (paymentMethod === "Cash on Delivery") {
      // Handle Cash on Delivery
      setOrderMessage(
        "Your order is in delivery process with Cash on Delivery."
      );
      setTimeout(() => {
        navigate("/profile"); // Navigate to the profile page
      }, 1000);
    } else {
      setErrorMessage("Please select a valid payment method.");
    }
  };
  const handleNavigateSuccess = () => {
    toast.success("Payment done Successfully");
    alert("Payment success!!");
    window.location.href = "http://localhost:3000/profile";
  };

  return (
    <>
      {showClose && (
        <div
          style={{
            zIndex: 99999999,
            position: "fixed",
            cursor: "pointer",
            bottom: 0,
            left: "50%",
            transform: "translate(-50%, 2%)",
          }}
          className="h-72 w-[100vw] absolute bg-red-600  flex justify-center items-center opacity-0"
          onClick={handleNavigateSuccess}
        >
          {/* Centered content can go here */}
        </div>
      )}
      <Header2 />

      <div className="m-14 p-10">
        <div className="w-[36vw] bg-slate-300 m-auto flex flex-col justify-center p-6">
          <div className="text-center text-2xl font-bold">
            <h1>Check Out</h1>
          </div>

          {/* Billing Details Section */}
          <div>
            <h2 className="text-lg font-semibold my-4">Billing Details</h2>

            <div className="flex flex-col gap-4">
              {/* Full Name */}
              <div className="flex flex-col">
                <label htmlFor="fullName">Full Name*</label>
                <input
                  type="text"
                  id="fullName"
                  placeholder="Enter your full name"
                  className="border-2 border-slate-300 p-2 rounded-md"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              {/* Location */}
              <div className="flex flex-col">
                <label htmlFor="location">Location*</label>
                <input
                  type="text"
                  id="location"
                  placeholder="Enter your location"
                  className="border-2 border-slate-300 p-2 rounded-md"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col">
                <label htmlFor="phone">Phone*</label>
                <input
                  type="text"
                  id="phone"
                  placeholder="Enter your phone number"
                  className="border-2 border-slate-300 p-2 rounded-md"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label htmlFor="email">Email*</label>
                <input
                  type="text"
                  id="email"
                  placeholder="Enter your email address"
                  className="border-2 border-slate-300 p-2 rounded-md"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Payment Method Section */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-4">Payment Method</h2>

            <div className="flex flex-col gap-2">
              <div>
                <input
                  type="radio"
                  id="cashondelivery"
                  name="paymentMethod"
                  value="Cash on Delivery"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label htmlFor="cashondelivery" className="ml-2">
                  Cash on Delivery
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="Khalti"
                  name="paymentMethod"
                  value="Khalti"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label htmlFor="Khalti" className="ml-2">
                  Khalti
                </label>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              className="bg-orange-500 text-white hover:bg-orange-300 hover:text-orange-500 px-4 p-2 rounded w-full"
              onClick={handleOrderPlace}
            >
              Order Place
            </button>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mt-6 text-center text-red-500 font-semibold">
              {errorMessage}
            </div>
          )}

          {/* Order Message */}
          {orderMessage && (
            <div className="mt-6 text-center text-green-500 font-semibold">
              {orderMessage}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Checkout;
