import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import Home1 from "./../../Images/f1.jpg";
import Home2 from "./../../Images/f2.jpg";
import Home3 from "./../../Images/f3.jpg";
import Header from "./../header/header.jsx";
import CategoryButton from "./../../atoms/CategoryButton.jsx";
import ProductDisplay from "../../organisms/ProductDisplay/ProductDisplay.jsx";
import Footer from "../../organisms/footerspage.jsx";

function Homepage() {
  const images = [Home1, Home2, Home3];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [picks, setPicks] = useState([]);
  const [arrivals, setArrivals] = useState([]);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/hot-deals/")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          console.error("Unexpected data format:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
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
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="overflow-x-hidden">
      <Header />

      {/* Slider Section */}
      <div className="w-screen h-[90vh] overflow-hidden relative">
        <div className="relative w-full h-full">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-full object-cover flex-shrink-0"
              />
            ))}
          </div>

          <div className="absolute inset-0 top-72 left-20 items-start text-white bg-opacity-40">
            <h1 className="text-4xl md:text-5xl mb-2 font-bold">
              Discover Perfect Cultural Fit
            </h1>
            <p className="mt-4 text-lg md:text-xl mb-2">
              Explore our diverse range of traditional attire from different
              cultures.
            </p>
            <button className="mt-6 px-8 py-3 bg-orange-400 text-white rounded-full text-lg italic">
              Explore
            </button>
          </div>

          <button
            className="absolute top-1/2 left-4 transform -translate-y-1/2 text-3xl text-white bg-black bg-opacity-50 p-2 rounded-full"
            onClick={prevSlide}
          >
            &lt;
          </button>

          <button
            className="absolute top-1/2 right-4 transform -translate-y-1/2 text-3xl text-white bg-black bg-opacity-50 p-2 rounded-full"
            onClick={nextSlide}
          >
            &gt;
          </button>
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-16 bg-gradient-to-l from-pink-100 to-white-100-100">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Categories</h2>
          <p className="mt-4 text-lg md:text-xl text-gray-700">
            Explore our curated categories featuring traditional outfits from
            various cultures.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <CategoryButton />
          </div>

          {/* Video Section */}
          <div className="relative mt-10 w-full max-w-10xl mx-auto h-96 bg-pink-200 flex items-center justify-center">
            <video
              src="/videos/show.mp4"
              autoPlay
              className="absolute top-0 left-0 w-full h-full object-cover"
              controls
            />
          </div>
        </div>
      </div>

      {/* Hot Deals Section */}
      <div className="py-4 bg-gradient-to-l from-pink-100 to-white-100-100">
        <div className="max-w-screen-xl mx-auto px-4 text-start">
          <h1 className="text-4xl md:text-5xl font-bold">Hot Deals</h1>
          <p className="mt-4 text-lg md:text-xl text-gray-700 flex justify-between items-center">
            Grab Them Before They're Gone!
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
                product_id={product.id}
                key={index}
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

      {/* Our Picks Section */}
      <div className="py-16 bg-gradient-to-l from-pink-100 to-white-100-100">
        <div className="max-w-screen-xl mx-auto px-4 text-start">
          <h1 className="text-4xl md:text-5xl font-bold">Our Picks</h1>
          <p className="mt-4 text-lg md:text-xl text-gray-700">
            Discover our exclusive selection of traditional outfits, carefully
            chosen for their unique craftsmanship and cultural significance.
          </p>
          <div className="flex flex-wrap  gap-16 py-10">
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
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default Homepage;
