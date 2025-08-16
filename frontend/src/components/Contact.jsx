import React from "react";

function Contact() {
  return (
    <div className="bg-[#fff0f5] p-6 rounded-lg max-w-3xl mx-auto my-10">
      <h2 className="text-[#d63384] font-bold text-2xl mb-4">Contact Us</h2>
      <p>Makhaza, Khayelitsha, Cape Town, South Africa</p>
      <p>
        Phone:{" "}
        <a href="tel:+27123456789" className="text-[#d63384] font-medium">
          +27 67 604 9312
        </a>
      </p>
      <p>
        Email:{" "}
        <a href="mailto:alvinzondi09@gmail.com" className="text-[#d63384] font-medium">
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
