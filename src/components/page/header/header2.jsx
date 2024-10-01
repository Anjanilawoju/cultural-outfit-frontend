import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuShoppingCart } from "react-icons/lu";
import {
  FaAddressBook,
  FaBars,
  FaHome,
  FaEnvelope,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import SearchBar from "../../molecules/SearchBar/SearchBar";

const Header2 = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Function to toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Function to handle logout and navigate to homepage
  const handleLogout = () => {
    setIsSidebarOpen(false); // Close the sidebar
    navigate("/"); // Navigate to homepage
  };

  return (
    <div className="relative">
      <div className="flex flex-row items-center h-16 px-8 bg-gradient-to-tr from-pink-200 to-pink-200-100">
        <div className="text-center px-10">
          <p className="text-2xl text-black font-semibold underline">
            Culture and Pride
          </p>
        </div>
        <nav className="flex-grow flex justify-center">
          <ul className="flex space-x-12">
            <li className="text-black hover:font-semibold hover:scale-110 transition-transform duration-300 italic">
              <Link to="/profile">Home</Link>
            </li>
            <li className="text-black hover:font-semibold hover:scale-110 transition-transform duration-300 italic">
              <Link to="/about">About</Link>
            </li>
            <li className="text-black hover:font-semibold hover:scale-110 transition-transform duration-300 italic">
              <Link to="/dress-code">DressCode</Link>
            </li>
          </ul>
        </nav>
        <div className="flex flex-row items-center ml-auto gap-10">
          <div className="flex flex-row justify-center items-center rounded-md ">
            <SearchBar />
          </div>
          <Link to="/cart" className="flex items-center">
            <LuShoppingCart size={24} />
            <span className="ml-2">View Cart</span>
          </Link>
          {/* <Link to="/Order" className="flex items-center">
            <LuShoppingCart size={24} />
            <span className="ml-2">Your Order</span>
          </Link> */}
          <Link to="/contact" className="flex items-center">
            <FaAddressBook size={24} />
            <span className="ml-2">Contact</span>
          </Link>

          {/* Menu Icon */}
          <div
            className="flex items-center cursor-pointer"
            onClick={toggleSidebar}
          >
            <FaBars size={24} />
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-pink-200 p-5 transition-transform duration-300 ease-in-out z-50 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col">
          <ul className="space-y-6">
            <li className="flex items-center space-x-3">
              <FaHome size={20} />
              <Link
                to="/profile"
                className="text-black"
                onClick={toggleSidebar}
              >
                Home
              </Link>
            </li>
            <li className="flex items-center space-x-3">
              <FaAddressBook size={20} />
              <Link to="/about" className="text-black" onClick={toggleSidebar}>
                About Us
              </Link>
            </li>
            <li className="flex items-center space-x-3">
              <FaEnvelope size={20} />
              <Link
                to="/contact"
                className="text-black"
                onClick={toggleSidebar}
              >
                Message
              </Link>
            </li>
            <li
              className="flex items-center space-x-3 cursor-pointer"
              onClick={handleLogout}
            >
              <FaSignOutAlt size={20} />
              <span className="text-black">Logout</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default Header2;
