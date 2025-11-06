// Fetches hairstyles from API and displays them in a grid
import React, { useEffect, useState } from "react";
import API from "../api";
import Spinner from 'react-bootstrap/Spinner';

function Salon() {
  const [styles, setStyles] = useState([]); // State to store styles
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch salon styles from backend API
  useEffect(() => {
    const fetchStyles = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await API.get("/styles"); // ✅ async call
        setStyles(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load styles. Please try again.");
      } finally {
        setLoading(false); // ✅ always run after try/catch
      }
    };

    fetchStyles();
  }, []);

  return (
    <div className="bg-[#fff0f6] px-4 py-10">
      <h2 className="text-center text-[#d63384] text-3xl font-bold mb-8">
        Our Styles
      </h2>
      {error && <p className="text-red-700">{error}</p>}

      {/* Styles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-center font-bold text-xl text-gray-600">
            <Spinner animation="border" variant="dark" />
            Please wait a moment… your style inspiration is on its way.
          </p>
        ) : (
          <>
            {/* Loop through styles and render each */}
            {styles.map((style) => (
              <div
                key={style._id}
                className="bg-white border border-[#f8bbd0] rounded-lg shadow-sm flex flex-col overflow-hidden"
              >
                {/* Image */}
                <img
                  src={`https://salon-backend-autl.onrender.com${style.image}`}
                  alt={style.name}
                  className="w-full h-64 object-cover"
                />

                {/* Card Body */}
                <div className="p-4 flex-1 flex flex-col">
                  <h5 className="text-[#c2185b] font-semibold text-lg mb-2">
                    {style.name}
                  </h5>
                  <p className="text-gray-700 text-sm mb-3 flex-1">
                    {style.description}
                  </p>
                  <p className="text-[#880e4f] font-bold text-lg mt-auto">
                    R{style.price}
                  </p>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default Salon;
