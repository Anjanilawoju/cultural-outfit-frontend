import React from 'react';
import Header from './../header/header2.jsx';
import StoryImage from './../../Images/f2.jpg'; // Replace this with the appropriate image
import Footer from '../../organisms/footerspage.jsx';


function About() {
  return (
    <div className="overflow-x-hidden">
      <Header />
      <div className="py-16 bg-gradient-to-r from-pink-100 to-white">
        <div className="max-w-screen-xl mx-auto px-4">
          {/* Hero Section */}
          <div className="relative bg-black text-white p-8 rounded-lg shadow-lg">
            <h1 className="text-4xl md:text-5xl font-bold">Cultural Outfits</h1>
            <p className="mt-4 text-lg md:text-xl">Embracing Tradition, Celebrating Diversity</p>
            <p className="mt-4 text-md md:text-lg" class="break-all">
              Discover the beauty and richness of traditional attire from <br/>around the world. Our collection celebrates cultural heritage <br/>and artistic craftsmanship.
            </p>
            {/* <img src={StoryImage} alt="Cultural Outfits" className="absolute top-0 right-0 h-full w-1/2 object-cover rounded-lg shadow-lg" /> */}
          </div>

          {/* Our Story Section */}
          <div className="mt-12 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold">Our Story</h2>
              <p className="mt-4 text-lg md:text-xl text-gray-700">
                Welcome to our cultural outfit website, where we bring you the finest traditional attire from cultures around the world. Our journey began with a passion for cultural heritage and fashion, and a desire to connect people with their roots through beautifully crafted garments. Each piece in our collection is a testament to the rich history and artistic craftsmanship of different cultures.
              </p>
            </div>
            <div className="mt-8 md:mt-0 md:w-1/2 md:ml-8">
              <img src={StoryImage} alt="Our Story" className="w-full rounded-lg shadow-lg" />
            </div>
          </div>

          {/* Our Mission Section */}
          <div className="mt-12">
            <h2 className="text-3xl md:text-4xl font-bold">Our Mission</h2>
            <p className="mt-4 text-lg md:text-xl text-gray-700">
              Our mission is to celebrate cultural diversity through fashion. We strive to offer a diverse range of traditional outfits that not only honor the traditions they come from but also appeal to the modern fashion sense. By providing high-quality, authentic clothing, we hope to foster an appreciation for cultural heritage and promote inclusivity and understanding.
            </p>
          </div>

          {/* Our Values Section */}
          <div className="mt-12">
            <h2 className="text-3xl md:text-4xl font-bold text-purple-500">Our Values</h2>
            <ul className="mt-4 text-lg md:text-xl text-gray-700 list-disc pl-5">
              <li><strong>Authenticity:</strong> We are committed to offering genuine traditional outfits that respect and honor the cultures they represent.</li>
              <li><strong>Quality:</strong> We believe in providing high-quality garments made with the finest materials and craftsmanship.</li>
              <li><strong>Inclusivity:</strong> We celebrate diversity and aim to make everyone feel represented and included through our collections.</li>
              <li><strong>Sustainability:</strong> We are dedicated to sustainable practices and work with artisans who share our commitment to the environment.</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default About;
