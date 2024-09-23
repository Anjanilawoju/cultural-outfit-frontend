import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header2 from '../header/header2.jsx';
import Footer from '../../organisms/footerspage.jsx';
import cartemptypage from '../../../components/Images/cart.png';

function CartEmpty() {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate('/profile');
  };

  return (
    <>
      <Header2 />
      <div className="flex flex-col items-center justify-center h-screen bg-cream-100">
        <div>
          <img src={cartemptypage} alt="cart is empty" />
        </div>

        <div className="mt-8 text-center text-xl">
          Your cart is empty and sad :(
        </div>
        <div className="mt-2 text-center text-sm text-gray-600">
          Add something to make it happy!
        </div>
        <button 
          onClick={handleContinueShopping}
          className="mt-8 px-6 py-2 rounded-md bg-orange-600 text-white font-medium hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          Continue Shopping
        </button>
      </div>
      <Footer />
    </>
  );
}

export default CartEmpty;
