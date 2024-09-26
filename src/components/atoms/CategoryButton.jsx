import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CategoryButton = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  console.log({ pathname });

  const categories = [
    { id: 0, label: "Newari", route: "/newari" },
    { id: 1, label: "Tamang", route: "/tamang" },
    { id: 2, label: "Gurung", route: "/gurung" },
    { id: 3, label: "Sherpa", route: "/sherpa" },
    { id: 4, label: "Magar", route: "/magar" },
    { id: 5, label: "Tharu", route: "/tharu" },
  ];

  const handleItemClick = (route) => {
    navigate(route);
  };

  return (
    <div className="mt-8 flex flex-wrap space-x-12 justify-center  gap-8">
      {categories.map((item, index) => (
        <button
          key={index}
          onClick={() => handleItemClick(item.route)}
          className={
            pathname === item.route
              ? "px-10 py-2 bg-orange-200 text-gray-800 rounded-full border border-orange-300  hover:bg-gray-100 transition-colors"
              : "px-10 py-2 bg-white text-gray-800 rounded-full border border-orange-300  hover:bg-gray-100 transition-colors"
          }
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryButton;
