import React from "react";
import { LuShoppingCart } from "react-icons/lu";
import { GoPerson } from "react-icons/go";
import { FaAddressBook } from "react-icons/fa"; // Importing the Font Awesome address book icon
import { Link } from "react-router-dom";
import SearchBar from "../../molecules/SearchBar/SearchBar";

const Header = () => {
  return (
    <div className="flex flex-row items-center h-16 px-8 bg-gradient-to-tr from-pink-200 to-pink-200-100">
      <div className="text-center px-10">
        <p className="text-2xl text-black font-semibold underline">
          Culture and Pride
        </p>
      </div>
      <nav className="flex-grow flex justify-center">
        <ul className="flex space-x-12">
          <li className="text-black hover:font-semibold hover:scale-110 transition-transform duration-300 italic">
            <Link to="/home">Home</Link>
          </li>
          <li className="text-black hover:font-semibold hover:scale-110 transition-transform duration-300 italic">
            <Link to="/about">About</Link>
          </li>
          <li className="text-black hover:font-semibold hover:scale-110 transition-transform duration-300 italic">
            <Link to="/dress-code">DressCode</Link>
          </li>
        </ul>
      </nav>
      <div className="flex flex-row items-center ml-auto gap-10 ">
        <div className="flex flex-row justify-center items-center rounded-md ">
          <SearchBar />
        </div>
        <Link to="/cart" className="flex items-center">
          <LuShoppingCart size={24} />
          <span className="ml-2">View Cart</span>
        </Link>
        <Link to="/contact" className="flex items-center">
          <FaAddressBook size={24} />
          <span className="ml-2">Contact</span>
        </Link>
        <div className="flex items-center">
          <GoPerson size={24} />
          <Link to="/login" className="text-black hover:font-semibold transition-transform duration-300 ml-2">
            Login
          </Link>
          <span className="mx-2">|</span>
          <Link to="/signup" className="text-black hover:font-semibold transition-transform duration-300">
            Signup
          </Link>
        </div>
      </div>
      
    </div>
  );
};

export default Header;
