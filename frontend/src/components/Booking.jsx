import React from "react";

function Booking() {
  return (
    <div className="bg-[#fff0f5] p-5 rounded-lg max-w-2xl mx-auto mt-4">
      {/* Title */}
      <div className="text-center mb-6">
        <h2 className="text-[#d63384] font-bold text-2xl">
          Book Your Appointment
        </h2>
        <p className="text-gray-600">
          Booking functionality will be added soon.
        </p>
      </div>

      {/* Form */}
      <form className="bg-white p-5 rounded-lg shadow-md">
        {/* Name */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="form-label text-[#d63384] font-medium"
          >
            Your Name
          </label>
          <input type="text" className="form-control" id="name" />
        </div>

        {/* Preferred Date */}
        <div className="mb-4">
          <label
            htmlFor="date"
            className="form-label text-[#d63384] font-medium"
          >
            Preferred Date
          </label>
          <input type="date" className="form-control" id="date" />
        </div>

        {/* Preferred Time */}
        <div className="mb-4">
          <label
            htmlFor="time"
            className="form-label text-[#d63384] font-medium"
          >
            Preferred Time
          </label>
          <input type="time" className="form-control" id="time"/>
        </div>

        {/* Message */}
        <div className="mb-4">
          <label
            htmlFor="message"
            className="form-label text-[#d63384] font-medium"
          >
            Message
          </label>
          <textarea
            className="form-control"
            id="message"
            rows="4"
            placeholder="Write your message here..."
          ></textarea>
        </div>

        {/* Button */}
        <button
          className="btn w-full"
          style={{ backgroundColor: "#d63384", color: "white", border: "none" }}
          disabled
        >
          Book Now
        </button>
      </form>
    </div>
  );
}

export default Booking;
