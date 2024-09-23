import React from 'react';
import { useNavigate } from 'react-router-dom';

const CategoryButton = () => {

  const navigate = useNavigate();
  const categories = [{label:'Newari', route:'/newari'}, {label:'Tamang', route:'/tamang'},
    {label:'Gurung', route:'/gurung'} ,{label: 'Sherpa', route:'/sherpa'},
    {label: 'Magar',route:'/magar'},{label: 'Tharu', route:'/tharu'}];

    const handleItemClick = (route) => {
      navigate(route); 
     
    };

  return (
    <div className="mt-8 flex flex-wrap space-x-12 justify-center  gap-8">
      {categories.map((item, index) => (
        <button
          key={index}
          onClick={()=>handleItemClick(item.route)}
          className="px-10 py-2 bg-white text-gray-800 rounded-full border border-orange-300  hover:bg-gray-100 transition-colors">
          {item.label}
          
        </button>
      ))}
    </div>
  );
};

export default CategoryButton;