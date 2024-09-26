import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./components/page/homepage/homepage.jsx";
import AboutPage from "./components/page/aboutpage/aboutpage.jsx";
import DressCode from "./components/page/dresscodepage/dresscode.jsx";
import Login from "./components/organisms/loginpage/login.jsx";
import Signup from "./components/organisms/signuppage/signup.jsx";
import Cart from "./components/page/cartpage/cart.jsx";
import Cartempty from "./components/page/cartpage/Cartempty.jsx";
import Contact from "./components/page/contactpage/contactpage.jsx";
import Profile from "./components/page/profilepage/profile.jsx";
import Tharu from "./components/page/Categories/tharupage.jsx";
import Gurung from "./components/page/Categories/gurungpage.jsx";
import Newari from "./components/page/Categories/newarpage.jsx";
import Tamang from "./components/page/Categories/tamangpage.jsx";
import Magar from "./components/page/Categories/magarpage.jsx";
import Sherpa from "./components/page/Categories/sherpapage.jsx";
import Checkout from "./components/page/cartpage/checkout.jsx";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/dress-code" element={<DressCode />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/tharu" element={<Tharu />} />
        <Route path="/gurung" element={<Gurung />} />
        <Route path="/newari" element={<Newari />} />
        <Route path="/tamang" element={<Tamang />} />
        <Route path="/magar" element={<Magar />} />
        <Route path="/sherpa" element={<Sherpa />} />
        <Route path="/cartempty" element={<Cartempty />} />
        <Route path="/checkout/:total" element={<Checkout />} />
        <Route path="/*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};
export default AppRoutes;
