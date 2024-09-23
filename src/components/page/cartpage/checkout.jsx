import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header2 from '../header/header2.jsx';
import Footer from "../../organisms/footerspage.jsx";

function Checkout() {
  const [fullName, setFullName] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [orderMessage, setOrderMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleOrderPlace = () => {
    // Check if all required fields are filled
    if (!fullName || !location || !phone || !email || !paymentMethod) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setErrorMessage(''); // Clear any previous error messages
    setOrderMessage('Your order is in delivery process');

    setTimeout(() => {
      navigate('/profile'); // Change this to the route for your profile page
    }, 500); //  a seconds delay to show the message before navigating
  };

  return (
    <>
      <Header2/>
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
                <label htmlFor="cashondelivery" className="ml-2">Cash on Delivery</label>
              </div>

              <div>
                <input
                  type="radio"
                  id="Esewa"
                  name="paymentMethod"
                  value="E-Sewa"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label htmlFor="Esewa" className="ml-2">E-Sewa</label>
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
