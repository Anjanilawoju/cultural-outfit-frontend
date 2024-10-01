import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Assuming axios is used for HTTP requests

const ProductDisplay = ({
  image,
  productName,
  price,
  discount,
  product_id,
  rating,
  freeDelivery,
}) => {
  const navigate = useNavigate();

  // Initialize data state with proper default values
  const [data, setData] = useState({
    product_id: product_id,
    size: "M",
    quantity: 1,
    rating: 4,
    review: "Very Good",
  });

  const [errorMessage, setErrorMessage] = useState(null); // To handle errors
  const [isSubmitting, setIsSubmitting] = useState(false); // To manage submission state

  const handleAddToCart = async () => {
    setIsSubmitting(true);
    try {
      console.log("Data to submit:", data);

      // Prepare data for submission
      const postData = {
        ...data,
        coupon_code: data.coupon_code ? data.coupon_code : undefined,
      };

      const response = await axios.post(
        "http://localhost:8000/cart/",
        postData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        console.log("Product added to cart:", response.data);
        navigate("/cart");
      } else {
        setErrorMessage("Failed to add product to the cart");
      }
    } catch (error) {
      console.error(
        "Error adding to cart:",
        error.response ? error.response.data : error.message
      );
      setErrorMessage(
        "An error occurred: " +
          (error.response ? error.response.data : error.message)
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-64 shadow-lg p-4 bg-white rounded-lg relative">
      {/* Image Section */}
      <div className="w-full h-52 bg-gray-100 rounded-lg overflow-hidden mb-4">
        {image ? (
          <img
            src={image}
            alt={productName}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-500">No Image</span>
        )}
      </div>

      {/* Product Information */}
      <h3 className="text-base font-semibold mb-1 text-center">
        {productName}
      </h3>

      {/* Rating Section */}
      {rating && (
        <div className="flex justify-center items-center mb-2">
          {[...Array(5)].map((star, index) => (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              fill={index < rating ? "currentColor" : "none"}
              viewBox="0 0 24 24"
              stroke="currentColor"
              className={`w-4 h-4 ${
                index < rating ? "text-yellow-500" : "text-gray-300"
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.12 6.545a1 1 0 00.95.69h6.904c.97 0 1.371 1.24.588 1.81l-5.454 3.962a1 1 0 00-.364 1.118l2.12 6.545c.3.921-.755 1.688-1.54 1.118L12 19.347l-5.455 3.963c-.784.57-1.838-.197-1.539-1.118l2.119-6.545a1 1 0 00-.364-1.118L1.307 11.97c-.783-.57-.382-1.81.588-1.81h6.905a1 1 0 00.949-.69l2.12-6.545z"
              />
            </svg>
          ))}
        </div>
      )}

      {/* Delivery Tag */}
      {freeDelivery && (
        <div className="text-green-600 text-xs font-medium border border-green-600 rounded-full py-1 px-2 mb-2 inline-block">
          Free Delivery
        </div>
      )}

      {/* Price Section */}
      <div className="text-red-500 text-xl font-bold text-center mb-4">
        Rs.{price}
      </div>

      {/* Add to Cart Button */}
      <button
        className="w-full bg-pink-200 text-black py-2 rounded-lg flex items-center justify-center"
        onClick={handleAddToCart}
        disabled={isSubmitting}
      >
        <span className="text-sm font-semibold">Add To Cart</span>
      </button>

      {/* Error message */}
      {errorMessage && (
        <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
      )}
    </div>
  );
};

export default ProductDisplay;
