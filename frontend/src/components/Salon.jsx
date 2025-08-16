import React, { useEffect, useState } from "react";
import API from "../api";

function Salon() {
  const [styles, setStyles] = useState([]);

  useEffect(() => {
    API.get("/styles")
      .then((res) => setStyles(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="bg-[#fff0f6] px-4 py-10">
      {/* Title */}
      <h2 className="text-center text-[#d63384] text-3xl font-bold mb-8">
        Our Styles
      </h2>

      {/* Styles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {styles.map((style) => (
          <div
            key={style._id}
            className="bg-white border border-[#f8bbd0] rounded-lg shadow-sm flex flex-col overflow-hidden"
          >
            {/* Image */}
            <img
              src={`https://salon-backend-autl.onrender.com/${style.image}`}
              alt={style.name}
              className="w-full h-64 object-cover"
            />

            {/* Card Body */}
            <div className="p-4 flex-1 flex flex-col">
              <h5 className="text-[#c2185b] font-semibold text-lg mb-2">
                {style.name}
              </h5>
              <p className="text-gray-700 text-sm mb-3 flex-1">{style.description}</p>
              <p className="text-[#880e4f] font-bold text-lg mt-auto">
                R{style.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Salon;
