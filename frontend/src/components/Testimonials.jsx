import React from "react";
import { Star } from "lucide-react";
// Import local user profile images for testimonials
import user1 from "../assets/user1.png";
import user2 from "../assets/user2.jpg";
import user3 from "../assets/user3.jpg";
import user4 from "../assets/user4.png";

/**
 * Features:
 * - Dynamic star rating system using Lucide React icons
 * - Responsive grid layout (1 col mobile → 2 cols tablet → 4 cols desktop)
 */
const Testimonials = () => {
  // Testimonials data array - easily maintainable and scalable
  const testimonials = [
    {
      id: 1,
      name: "Alvin Zondi",
      text: "Wow! The hair salon is incredible. Great work and amazing staff. My hair has never looked better!",
      rating: 5,
      image: user1,
    },
    {
      id: 2,
      name: "Emma Davis",
      text: "Absolutely love my new haircut! The stylist was so professional and really listened to what I wanted.",
      rating: 5,
      image: user2,
    },
    {
      id: 3,
      name: "Lisa Chen",
      text: "Best salon experience ever! The color came out perfect and the atmosphere is so relaxing.",
      rating: 4,
      image: user3,
    },
    {
      id: 4,
      name: "Vinny",
      text: "Incredible transformation! The team here really knows what they're doing. Highly recommend!",
      rating: 4,
      image: user4,
    },
  ];

  /**
   * Renders interactive star rating display using Lucide React icons
   * {Object} props
   * {number} props.rating - Rating value (1-5)
   * Star rating display
   */
  const StarRating = ({ rating }) => {
    return (
      <div className="flex space-x-1">
        {/* Generate 5 stars, conditionally filled based on rating */}
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-8 mb-11">
      <h1
        className="text-3xl font-bold text-center mb-8"
        style={{ color: "#d63384" }}
      >
        Testimonials
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Map through testimonials data for dynamic rendering */}
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id} // Unique key for React optimization
            className="bg-white rounded-lg shadow-lg p-6"
            style={{
              borderWidth: "2px",
              borderStyle: "solid",
              borderColor: "#d63384",
            }}
          >
            {/* Card content centered layout */}
            <div className="flex flex-col items-center text-center">
              <img
                src={testimonial.image}
                alt={`${testimonial.name} profile`} 
                className="w-16 h-16 rounded-full object-cover mb-4"
                loading="lazy"
              />

              <h5 className="font-semibold text-gray-800 mb-2 testimonialName">
                {testimonial.name}
              </h5>

              {/* Star rating component */}
              <StarRating rating={testimonial.rating} />

              <p className="text-gray-600 text-sm mt-4 leading-relaxed">
                {testimonial.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
