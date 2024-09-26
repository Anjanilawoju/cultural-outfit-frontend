import React from "react";
import PropTypes from "prop-types";
import { CiSearch } from "react-icons/ci";

const SearchBar = ({ label, value, onChange, type }) => {
  
  return (
    <form className="w-80">
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-800 sr-only dark:text-white"
      >
        {label}
      </label>
      <div className="relative flex flex-row border border-black w-full h-10 rounded-3xl overflow-hidden">
        <input
          type="search"
          value={value}
          id="default-search"
          onChange={onChange}
          className="block w-full py-2 pl-3 pr-10 text-sm text-gray-800 outline-none bg-white"
          placeholder="Search"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-800">
          <CiSearch className="h-5 w-5" />
        </div>
      </div>
    </form>
  );
};

SearchBar.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string,
};

export default SearchBar;
