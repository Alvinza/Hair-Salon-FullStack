import React, { useState, useEffect } from "react";

function Booking() {
  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    message: ""
  });
  
  // State for bookings list, errors, and submission status
  const [bookings, setBookings] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Load saved bookings from localStorage when component mounts
  useEffect(() => {
    const savedBookings = localStorage.getItem("bookings");
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    }
  }, []);

  // Handle input field changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    // Clear error for current field when user types
    if (errors[id]) {
      setErrors(prev => ({
        ...prev,
        [id]: ""
      }));
    }
  };

  // Validate form fields before submission
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.date) {
      newErrors.date = "Please select a date";
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.date = "Please select a future date";
      }
    }
    
    if (!formData.time) {
      newErrors.time = "Please select a time";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Create new booking object
      const newBooking = {
        ...formData,
        id: Date.now(),
        date: formData.date,
        time: formData.time
      };
      
      // Update bookings array and save to localStorage
      const updatedBookings = [newBooking, ...bookings].slice(0, 5); // Keep only last 5 bookings
      setBookings(updatedBookings);
      localStorage.setItem("bookings", JSON.stringify(updatedBookings));
      
      // Reset form
      setFormData({
        name: "",
        date: "",
        time: "",
        message: ""
      });
      
      // Show success message
      setSubmitSuccess(true);
      setIsSubmitting(false);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    }
  };

  // Get tomorrow's date for min date attribute
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="bg-gradient-to-br from-[#fff0f5] to-[#fce4ec] rounded-xl mt-6 shadow-lg p-6">
      {/* Header Section */}
      <div className="text-center mb-6">
        <h2 className="text-[#d63384] font-bold text-3xl">
          Book Your Appointment
        </h2>
        <p className="text-gray-600 italic">
          Fill in the form below to schedule your appointment
        </p>
      </div>

      {/* Success Message - Using Tailwind classes only */}
      {submitSuccess && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          ✓ Booking submitted successfully! We'll confirm your appointment soon.
        </div>
      )}

      {/* Booking Form */}
      <form onSubmit={handleSubmit} className="bg-white p-5 rounded-lg shadow-md border border-[#f8bbd9]">
        {/* Name Field */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-[#d63384] font-medium mb-1"
          >
            Your Name *
          </label>
          <input
            type="text"
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#d63384] ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            id="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your full name"
          />
          {/* Error message */}
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Date Field */}
        <div className="mb-4">
          <label
            htmlFor="date"
            className="block text-[#d63384] font-medium mb-1"
          >
            Preferred Date *
          </label>
          <input
            type="date"
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#d63384] ${
              errors.date ? 'border-red-500' : 'border-gray-300'
            }`}
            id="date"
            value={formData.date}
            onChange={handleInputChange}
            min={minDate}
          />
          {/* Error message */}
          {errors.date && (
            <p className="text-red-500 text-sm mt-1">{errors.date}</p>
          )}
        </div>

        {/* Time Field */}
        <div className="mb-4">
          <label
            htmlFor="time"
            className="block text-[#d63384] font-medium mb-1"
          >
            Preferred Time *
          </label>
          <input
            type="time"
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#d63384] ${
              errors.time ? 'border-red-500' : 'border-gray-300'
            }`}
            id="time"
            value={formData.time}
            onChange={handleInputChange}
            min="09:00"
            max="18:00"
          />
          {/* Error message */}
          {errors.time && (
            <p className="text-red-500 text-sm mt-1">{errors.time}</p>
          )}
          {/* Helper text */}
          <p className="text-gray-500 text-xs mt-1">Available: 9:00 AM - 6:00 PM</p>
        </div>

        {/* Message Field */}
        <div className="mb-4">
          <label
            htmlFor="message"
            className="block text-[#d63384] font-medium mb-1"
          >
            Message (Optional)
          </label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d63384]"
            id="message"
            rows="4"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Write your message here..."
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-[#d63384] text-white rounded-md hover:bg-[#b82c6f] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processing..." : "Book Now"}
        </button>
      </form>

      {/* Recent Bookings Section - Shows last 3 bookings */}
      {bookings.length > 0 && (
        <div className="mt-6 p-4 bg-white rounded-lg shadow-sm border border-[#f8bbd9]">
          <h3 className="text-[#d63384] font-semibold text-lg mb-2">
            Recent Bookings
          </h3>
          <div className="space-y-2">
            {bookings.slice(0, 3).map((booking) => (
              <div key={booking.id} className="p-2 bg-gray-50 rounded-md text-sm">
                <p className="font-medium text-gray-800">{booking.name}</p>
                <p className="text-gray-600">
                  {new Date(booking.date).toLocaleDateString()} at {booking.time}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Booking;
