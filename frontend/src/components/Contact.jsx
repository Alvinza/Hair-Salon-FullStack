import React from "react";
import { MdOutlineLocationOn } from "react-icons/md";
import { MdOutlinePhoneEnabled } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";


function Contact() {
  return (
    <div className="bg-[#fff0f5] p-6 rounded-lg max-w-3xl mx-auto my-10">
      <h2 className="text-[#d63384] font-bold text-2xl mb-4">Contact Us</h2>
      <p className="flex items-center gap-2">
        <MdOutlineLocationOn className="text-xl"/>
        <span>Claremont, Cape Town, South Africa</span> 
      </p>
      <p className="flex items-center gap-2">
        <MdOutlinePhoneEnabled />
        <a href="tel:+27123456789" className="text-[#d63384] font-medium">
          +27 67 604 9312
        </a>
      </p>
      <p className="flex items-center gap-2">
        <MdOutlineEmail />
        <a
          href="mailto:alvinzondi09@gmail.com"
          className="text-[#d63384] font-medium"
        >
          alvinzondi09@gmail.com
        </a>
      </p>

      <div className="mt-6">
        <iframe
          title="salon-location"
          src="https://maps.google.com/maps?q=Goal%20Market%20Makhaza%20Khayelitsha&t=&z=15&ie=UTF8&iwloc=&output=embed"
          className="w-full h-64 md:h-80 border-4 border-[#d63384] rounded-lg"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

export default Contact;
