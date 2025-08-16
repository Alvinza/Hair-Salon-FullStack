import React from "react";

function Footer() {
  return (
    <footer className="bg-black text-white text-center py-4 mt-auto">
      &copy; {new Date().getFullYear()} Hair Salon. All rights reserved.
    </footer>
  );
}

export default Footer;
