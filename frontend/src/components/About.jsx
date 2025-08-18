import React from "react";
import aboutImage from "../assets/aboutPic.png";

function About() {
  return (
    <div className="bg-[#fff0f5] px-6 py-14 md:px-12 flex flex-col md:flex-row items-center gap-8">
      {/* Text Section */}
      <div className="flex-1">
        <h2 className="font-bold mb-3 text-[1.8rem] text-[#d63384]">
          About Our Salon
        </h2>
        <p className="mb-2">
          We provide top-notch hair styling services with experienced stylists.
          Our goal is to make you look and feel amazing.
        </p>
        <p className="mb-2">
          Located in the vibrant community of Claremont, we use the best
          products and latest trends to bring your hair dreams to life.
        </p>
        <p className="mb-2">
          At Denis Salon, we specialize in creating beautiful dreadlocks from
          start to finish. Whether you're looking to begin your dreadlock
          journey or maintain your existing locs, our skilled stylists have the
          expertise to craft the perfect look for you.
        </p>
        <p className="mb-2">
          Our comprehensive services include professional hair styling, cutting,
          coloring, treatments, and specialized dreadlock installation and
          maintenance.
        </p>
        <p className="text-gray-600 text-[0.9rem] leading-relaxed">
          We're open every day of the week to serve our community, making it
          convenient for you to book your appointment at a time that works best
          for your schedule. Our commitment is to provide exceptional service in
          a welcoming and professional environment.We look forward to helping
          you achieve the perfect style that reflects your unique personality
          and enhances your natural beauty.
        </p>
      </div>

      {/* Image Section */}
      <div className="flex-1">
        <img
          src={aboutImage}
          alt="Salon interior"
          className="w-full max-h-[400px] object-cover rounded shadow border border-[#d63384]"
        />
      </div>
    </div>
  );
}

export default About;
