import React, { useEffect, useState } from "react";
import Header from "../header/header2";
import axios from "axios";
import CategoryButton from "../../atoms/CategoryButton.jsx"; 
import ProductDisplay from "../../organisms/ProductDisplay/ProductDisplay.jsx";
import Footer from "../../organisms/footerspage.jsx";

const Sherpapage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [picks, setPicks] = useState([]);
  const [arrivals, setArrivals]= useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/sherpa/")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          console.error("Unexpected data format:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
    axios
      .get("http://127.0.0.1:8000/our-picks/")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setPicks(response.data);
        } else {
          console.error("Unexpected data format:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
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

  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <Header />
      <div className="py-1 bg-pink-100">
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <CategoryButton />
        </div>
      </div>
      <div className="py-6 bg-gradient-to-b from-pink-100 to-white-100-100">
        <div className="max-w-screen-xl mx-auto px-4 text-Start">
          <h1 className="text-4xl md:text-5xl font-bold">Sherpa Dress</h1>
          <p className="mt-4 text-lg md:text-xl text-gray-700 flex justify-between items-center">
          "Timeless beauty and tradition, beautifully expressed through Sherpa dress."
          </p>
        </div>
        {/* Our Products section */}
        <div className="py-10 max-w-screen-xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">Our Products</h1>
          <p className="mt-4 text-lg md:text-xl text-gray-700 text-center">
            Discover the latest additions to our collection of traditional attire, showcasing the rich heritage and <br/>unique styles of various cultures.
          </p>
          <div className="flex flex-wrap  gap-16 py-10">
            {products.map((product, index) => (
              <ProductDisplay
                key={index} 
                product_id={product.id} 
                image={`http://localhost:8000${product.image}`}
                productName={product.desc}
                price={product.price}
                discount={product.discount}
                rating={product.rating}
                freeDelivery={product.freeDelivery}
              />
            ))}
          </div>
        </div>
        {/* New Arrivals Section */}
        <div className="py-10 max-w-screen-xl mx-auto px-4 text-start">
          <h1 className="text-4xl md:text-5xl font-bold">New Arrivals </h1>
          <div className="flex justify-between items-center">
            <p className="mt-4 text-lg md:text-xl text-gray-700">
              Explore our newest additions to the Sherpa collection
            </p>
          </div>
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
        {/* Our Picks */}
        <div className="max-w-screen-xl mx-auto px-16 text-start">
          <h1 className="text-4xl md:text-5xl font-bold">Our Picks</h1>
          <p className="mt-4 text-lg md:text-xl text-gray-700">
            Timeless Tradition, Modern Elegance.
          </p>
          <div className="flex flex-wrap  gap-4 py-10">
            {picks.map((product, index) => (
              <ProductDisplay
                key={index} 
                product_id={product.id} 
                image={`http://localhost:8000${product.image}`}
                productName={product.desc}
                price={product.price}
                discount={product.discount}
                rating={product.rating}
                freeDelivery={product.freeDelivery}
              />
            ))}
          </div>
        </div>
        {/* Video Section */}
        <div className="max-w-screen-xl mx-auto px-4 py-10 flex items-center gap-20">
          <div className="w-full md:w-1/2">
            <video
              src="/videos/tamang.mp4"
              className="w-full h-auto object-cover"
              controls
            />
          </div>
          <div className="w-full md:w-1/2 px-4">
            <h2 className="text-3xl md:text-4xl font-bold">Hear it from our Designers</h2>
            <p className="mt-4 text-lg md:text-xl text-gray-700">
              Discover the vision and inspiration behind our Sherpa collection. Get an inside look at the artistry and dedication of our designers.
            </p>
          </div>
        </div>
         {/* Footer Section */}
      <Footer/>
      </div>
    </>
  );
};

export default Sherpapage;