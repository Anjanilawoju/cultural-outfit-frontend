import React, { useState, useEffect } from "react";
import Header2 from "../header/header2.jsx";
import Footer from "../../organisms/footerspage.jsx";
import axios from "axios";

function Order() {
  const [orders, setOrders] = useState([]);
  const [productList, setProductList] = useState([]);

  // Fetch orders from the backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/order/list");
        console.log("Orders fetched:", response.data); // Add this line
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
  
    fetchOrders();
  }, []);
  
  useEffect(() => {
    if (orders.length > 0) {
      const fetchProductDetails = async () => {
        try {
          const productRequests = orders.map((order) =>
            axios.get(`http://127.0.0.1:8000/dresses/${order.product_id}`)
          );
          const responses = await Promise.all(productRequests);
          console.log("Product details fetched:", responses); // Add this line
          setProductList(responses.map((response) => response.data));
        } catch (error) {
          console.error("Error fetching product details:", error);
        }
      };
      fetchProductDetails();
    }
  }, [orders]);
  

  return (
    <div className="flex flex-col min-h-screen">
      <Header2 />

      <div className="flex-grow flex flex-col justify-center items-center py-8 space-y-4">
        {orders.length > 0 ? (
          orders.map((order, index) => {
            const product = productList.find((p) => p.id === order.product_id);

            return (
              <div
                key={order.product_id}
                className="bg-gray-200 rounded-md p-4 w-full md:w-1/2"
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
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>No orders yet.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Order;
