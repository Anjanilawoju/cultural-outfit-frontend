import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header2 from "../header/header2.jsx";
import Footer from "../../organisms/footerspage.jsx";
import KhaltiCheckout from "khalti-checkout-web";
import { toast } from "react-toastify";
import axios from "axios";

function Checkout({ cart, setCart }) {
  const [fullName, setFullName] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [orderMessage, setOrderMessage] = useState("");
  const { total } = useParams();

  const navigate = useNavigate();

  // Khalti configuration
  const khaltiConfig = {
    publicKey: "test_public_key_cca60a6e0b6e44b5b1af97bb1732c9c4",
    productIdentity: "1234567890",
    productName: "Your Product Name",
    productUrl: "http://localhost:3000",
    eventHandler: {
      onSuccess(payload) {
        toast.success("Payment done successfully!");
        handleOrderPlace("Khalti"); // Proceed with placing the order
      },
      onError(error) {
        console.error("Payment error:", error);
        toast.error("Payment failed. Please try again.");
      },
      onClose() {
        console.log("Khalti payment widget closed");
      },
    },
    paymentPreference: ["KHALTI", "CONNECT_IPS", "SCT"],
  };

  const khaltiCheckout = new KhaltiCheckout(khaltiConfig);

  // Validation for form inputs
  const validateForm = () => {
    if (!fullName || !location || !phone || !email || !paymentMethod) {
      setErrorMessage("Please fill in all required fields.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  // Handle order placement
  const handleOrderPlace = async (paymentType) => {
    if (!validateForm()) return;

    try {
      const response = await axios.post("http://localhost:8000/order/create", {
        items: cart.map((item) => ({
          product_id: item.product_id,
        })),
        total: total, // Total price of the order
        paymentMethod: paymentType,
        customerDetails: {
          fullName,
          location,
          phone,
          email,
        },
      });

      if (response.status === 201) {
        setOrderMessage("Your order has been placed successfully.");
        if (paymentType === "Khalti") {
          navigate("/payment"); // Navigate to payment page
        } else {
          navigate("/profile"); // Navigate to profile page after COD
        }
      }
    } catch (error) {
      console.error("Error during order placement:", error);
      setErrorMessage("Failed to place the order. Please try again.");
    }
  };

  // Handle the checkout button click
  const handleCheckout = () => {
    if (!validateForm()) return;

    if (paymentMethod === "Khalti") {
      khaltiCheckout.show({ amount: total ? total * 100 : 1000 }); // Amount in paisa
    } else if (paymentMethod === "Cash on Delivery") {
      handleOrderPlace("Cash on Delivery");
    } else {
      setErrorMessage("Please select a valid payment method.");
    }
  };

  return (
    <>
      <Header2 />

      <div className="m-14 p-10">
        <div className="w-[36vw] bg-slate-300 m-auto flex flex-col justify-center p-6">
          <h1 className="text-center text-2xl font-bold">Check Out</h1>

          {/* Billing Details Section */}
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
                type="email"
                id="email"
                placeholder="Enter your email address"
                className="border-2 border-slate-300 p-2 rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Payment Method Section */}
          <h2 className="text-lg font-semibold mb-4 mt-6">Payment Method</h2>
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

          {/* Submit Button */}
          <button
            className="bg-orange-500 text-white hover:bg-orange-300 hover:text-orange-500 px-4 p-2 rounded w-full mt-6"
            onClick={handleCheckout}
          >
            Place Order
          </button>

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
