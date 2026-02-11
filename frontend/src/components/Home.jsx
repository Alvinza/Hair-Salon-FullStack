import React from "react";
import homeImage from "../assets/homeImage.png";

function Home() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <img
        src={homeImage}
        alt="Salon interior"
        className="w-full h-full object-cover"
      />
      
      {/* Simple Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
          Welcome to Our Salon
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-2xl">
          Professional hair care services tailored just for you.
        </p>
        
        {/* Simple CTA Button */}
        <button className="px-8 py-3 bg-[#d63384] text-white rounded-md hover:bg-[#b82c6f] transition-colors duration-200 font-medium">
          Book Appointment
        </button>
      </div>
    </div>
  );
}

export default Home;
