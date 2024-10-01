import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header2 from "../header/header2.jsx";
import Footer from "../../organisms/footerspage.jsx";
import cartemptypage from "../../../components/Images/cart.png";
import axios from "axios";

function Cart() {
  const [cart, setCart] = useState([]);
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);
  const navigate = useNavigate();
  const shippingFee = 50;
  const discount = 0;

  // Fetch cart data from API
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/cart/");
        setCart(
          response.data.map((item) => ({
            ...item,
            size: "S", // default size
            preference: "",
            review: "",
            rating: 0,
          }))
        );
      } catch (error) {
        setError("Failed to fetch cart data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCartData();
  }, []);

  // Fetch product details for items in the cart
  useEffect(() => {
    if (cart.length > 0) {
      const fetchProductDetails = async () => {
        try {
          const productRequests = cart.map((item) =>
            axios.get(`http://127.0.0.1:8000/dresses/${item.product_id}`)
          );
          const responses = await Promise.all(productRequests);
          setProductList(responses.map((response) => response.data));
        } catch (error) {
          console.error("Error fetching product details:", error);
        }
      };
      fetchProductDetails();
    }
  }, [cart]);

  const handleIncrement = (index) => {
    const newCart = [...cart];
    newCart[index].quantity += 1;
    setCart(newCart);
  };

  const handleDecrement = (index) => {
    const newCart = [...cart];
    if (newCart[index].quantity > 1) {
      newCart[index].quantity -= 1;
      setCart(newCart);
    }
  };

  const handleDelete = async (index) => {
    try {
      const item = cart[index];
      await axios.delete(`http://localhost:8000/cart/${item.id}/`);
      const newCart = [...cart];
      newCart.splice(index, 1);
      setCart(newCart);
    } catch (error) {
      setError("Failed to remove item from cart");
    }
  };

  const handleContinueShopping = () => {
    navigate("/profile");
  };

  const handleSizeChange = (index, value) => {
    const newCart = [...cart];
    newCart[index].size = value;
    setCart(newCart);
  };

  const handlePreferenceChange = (index, value) => {
    const newCart = [...cart];
    newCart[index].preference = value;
    setCart(newCart);
  };

  const handleRatingChange = (index, value) => {
    const newCart = [...cart];
    newCart[index].rating = value;
    setCart(newCart);
  };

  const handleReviewChange = (index, value) => {
    const newCart = [...cart];
    newCart[index].review = value;
    setCart(newCart);
  };

  const handleReviewSubmit = async (index) => {
    const item = cart[index];
    try {
      await axios.put(`http://localhost:8000/cart/${item.id}/`, {
        product: item.product_id,
        quantity: item.quantity,
        size: item.size,
        rating: item.rating,
        review: item.review,
        preference: item.preference, // Include preference in the request
      });
      setIsReviewSubmitted(true); // Show success message
      setTimeout(() => setIsReviewSubmitted(false), 3000); // Hide after 3 seconds
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => {
      const product = productList.find((p) => p.id === item.product_id);
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const total = subtotal + shippingFee - discount;

  const handleCheckout = () => {
    navigate(`/checkout/${total}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header2 />

      <div className="flex-grow flex flex-col justify-center items-center py-8 space-y-4">
        {cart.length > 0 ? (
          cart.map((item, index) => {
            const product = productList.find((p) => p.id === item.product_id);

            return (
              <div
                key={item.product_id}
                className="bg-gray-100 rounded-md p-4 w-full md:w-3/5"
              >
                <div className="flex justify-between">
                  <div className="flex">
                    {product && product.image ? (
                      <img
                        src={`http://localhost:8000${product.image}`}
                        alt={product.name}
                        className="w-48 h-48"
                      />
                    ) : (
                      <div className="w-48 h-48 bg-gray-300 flex items-center justify-center">
                        <p>No Image</p>
                      </div>
                    )}
                    <div className="ml-4">
                      <h2 className="text-xl font-bold">
                        {product ? product.name : "Product Name"}
                      </h2>
                      <p className="text-gray-600">
                        {product ? product.desc : "Product Description"}
                      </p>

                      <div className="mt-4 ">
                        <div className= "flex flex-row ">
                        <p className="text-gray-600 font-semibold">
                          Select Size:
                        </p>
                        <div >
                          <select
                            value={item.size}
                            onChange={(e) =>
                              handleSizeChange(index, e.target.value)
                            }
                            className="border p-1 rounded"
                          >
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                          </select>
                        </div>

                        {/* Preference Input */}
                        <div className=" px-10 ">
                          <p className="text-gray-600 font-normal">
                            Your Preference:
                          </p>
                          <div className="flex flex-row ">
                          <input
                            type="text"
                            value={item.preference}
                            onChange={(e) =>
                              handlePreferenceChange(index, e.target.value)
                            }
                            className="border p-1 rounded w-full text-sm"
                            placeholder="Enter any preferences..."
                            />
                            <button className=" bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded"
                            onClick={() => handleReviewSubmit(index)}
                          >
                            Send </button>
                            </div>
                        </div>
                        </div>

                        {/* Rating & Review Section */}
                        <div className="mt-2">
                          <p className="text-gray-600 font-semibold">
                            Rate this product:
                          </p>
                          <div className="flex space-x-2 mt-2">
                            {[1, 2, 3, 4, 5].map((value) => (
                              <span
                                key={value}
                                className={`cursor-pointer text-xl ${
                                  item.rating >= value
                                    ? "text-yellow-500"
                                    : "text-gray-400"
                                }`}
                                onClick={() =>
                                  handleRatingChange(index, value)
                                }
                              >
                                ★
                              </span>
                            ))}
                          </div>
                          <div className="mt-4">
                            <textarea
                              value={item.review}
                              onChange={(e) =>
                                handleReviewChange(index, e.target.value)
                              }
                              className="border p-1 rounded w-full h-18 text-sm"
                              rows="1"
                              cols="40"
                              placeholder="Write your comment..."
                            ></textarea>
                            <button
                              className="mt-1 bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded"
                              onClick={() => handleReviewSubmit(index)}
                            >
                              Send Review
                            </button>

                            {isReviewSubmitted && (
                              <p className="text-green-500 mt-2">
                                Review submitted successfully!
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end ">
                      <div className="flex items-center mt-4 ">
                        <button
                          onClick={() => handleDecrement(index)}
                          className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-l"
                        >
                          -
                        </button>
                        <span className="px-4 py-2 bg-white border">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleIncrement(index)}
                          className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-r"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => handleDelete(index)}
                        className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded mt-40"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col justify-center items-center">
            <img src={cartemptypage} alt="Empty cart" className="h-56" />
            <p>Your cart is empty</p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 mt-4 rounded"
              onClick={handleContinueShopping}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>

      {cart.length > 0 && (
        <div className="bg-gray-100 w-full md:w-3/5 mx-auto p-4 mb-8 rounded">
          <div className="flex justify-between mb-2">
            <p className="text-lg font-semibold">Subtotal:</p>
            <p className="text-lg">Rs {subtotal}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-lg font-semibold">Shipping Fee:</p>
            <p className="text-lg">Rs {shippingFee}</p>
          </div>
          <div className="flex justify-between mb-4">
            <p className="text-lg font-semibold">Discount:</p>
            <p className="text-lg">Rs {discount}</p>
          </div>
          <div className="flex justify-between mb-4 border-t pt-4">
            <p className="text-lg font-semibold">Total:</p>
            <p className="text-lg">Rs {total}</p>
          </div>
          <button
            className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 w-full rounded"
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Cart;
