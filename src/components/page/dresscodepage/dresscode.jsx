import React, { useEffect, useState } from "react";
import Header from "../header/header2";
import axios from "axios";
import CategoryButton from "../../atoms/CategoryButton.jsx"; 
import ProductDisplay from "../../organisms/ProductDisplay/ProductDisplay.jsx";
import Footer from "../../organisms/footerspage.jsx";

const DressCode = () => {
  const [arrivals, setArrivals] = useState([]);
  useEffect(() => {
      axios
      .get("http://127.0.0.1:8000/new-arrival/")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setArrivals(response.data);
        } else {
          console.error("Unexpected data format:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, 
  []);
  return (
    <>
    <Header />
    <div className="py-16 bg-pink-100 ">
    <div className="max-w-screen-xl mx-auto px-4 text-center">
      <h2 className="text-3xl md:text-4xl font-bold">Categories</h2>
      <p className="mt-4 text-lg md:text-xl text-gray-700">
        Explore our curated categories featuring traditional outfits from
        various cultures.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <CategoryButton />
      </div>
    </div>
    {/* New Arrival Section */}
    <div className="py-16 bg-gradient-to-l from-pink-100 to-white-100-100">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">New Arrival</h1>
          <p className="mt-4 text-lg md:text-xl text-gray-700 flex justify-between items-center">
            Discover the latest additions to our collection of traditional
            attire, showcasing the rich heritage and unique styles of various
            cultures.
          </p>
          <div className="flex flex-wrap  gap-16 py-10">
            {arrivals.map((product, index) => (
              <ProductDisplay
                key={index}  
                product_id={product.id}
                image={`http://127.0.0.1:8000${product.image}`}
                productName={product.desc}
                price={product.price}
                discount={product.discount}
                rating={product.rating}
                freeDelivery={product.freeDelivery}
              />
            ))}
          </div>
        </div>
      </div>
    <Footer/>
  </div>
  </>
  );
};

export default DressCode;