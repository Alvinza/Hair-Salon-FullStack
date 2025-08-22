import React from "react";
import homeImage from "../assets/homeImage.png"

function Home() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <img
        src={homeImage}
        alt="Salon"
        className="w-full h-full object-cover brightness-50"
      />

      {/* Centered Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
          Welcome to Our Hair Salon
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl">
          Your style, your way. Book your appointment today!
        </p>
      </div>
    </div>
  );
}

export default Home;
