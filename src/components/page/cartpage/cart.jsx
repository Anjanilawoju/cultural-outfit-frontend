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
            size: "S", // Default size
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

  // Fetch product details for items in cart
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
                className="bg-gray-100 rounded-md p-4 w-full md:w-3/4"
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

                      <div className="mt-4">
                        <p className="text-gray-600 font-semibold">
                          Select Size:
                        </p>
                        <div className="mt-2">
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

                          <div className="mt-4 flex items-center gap-2">
                            <h2 className="text-lg font-semibold">
                              Product Review:
                            </h2>
                            <div className="flex gap-6 ml-4">
                              {[
                                "Poor",
                                "Average",
                                "Good",
                                "Very Good",
                                "Excellent",
                              ].map((value) => (
                                <div
                                  key={value}
                                  className="flex items-center gap-1"
                                >
                                  <input
                                    type="radio"
                                    id={value}
                                    name={`review-${index}`}
                                    value={value}
                                    onChange={(e) =>
                                      handleReviewChange(index, e.target.value)
                                    }
                                  />
                                  <label htmlFor={value} className="ml-1">
                                    {value}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col justify-between items-end">
                      <div className="flex items-center">
                        <button
                          onClick={() => handleDecrement(index)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                          -
                        </button>
                        <span className="mx-4 text-gray-600">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleIncrement(index)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                          +
                        </button>
                      </div>

                      <p className="mt-4 text-lg font-bold">
                        Rs. {product ? product.price * item.quantity : "N/A"}
                      </p>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
                        onClick={() => handleDelete(index)}
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
        )}

        {/* Order Summary Section */}
        {cart.length > 0 && (
          <div className="bg-gray-200 rounded-md p-4 w-full md:w-3/4">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>Rs. {subtotal}</p>
            </div>
            <div className="flex justify-between">
              <p>Shipping Fee</p>
              <p>Rs. {shippingFee}</p>
            </div>
            <div className="flex justify-between">
              <p>Discount on Shipping Fee</p>
              <p>Rs. {discount}</p>
            </div>
            <div className="flex justify-between">
              <p>Total Items</p>
              <p>{cart.reduce((sum, item) => sum + item.quantity, 0)}</p>
            </div>
            <div className="flex justify-between mt-4">
              <p className="font-bold">Total</p>
              <p className="font-bold">Rs. {total}</p>
            </div>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 w-full"
              onClick={handleCheckout}
            >
              Proceed to checkout
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Cart;
