import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi"; // import logout icon

function NavBar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = !!localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload(); // refresh to update UI
  };

  // Tailwind classes for links
  const linkClasses =
    "block md:inline-block px-2 py-1 no-underline hover:text-pink-400 transition-colors text-gray-200";
  const activeLinkClasses = "text-pink-500 font-semibold";

  return (
    <nav className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <NavLink
            to="/"
            className="text-2xl font-bold text-pink-600 no-underline"
          >
            Hair Salon
          </NavLink>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6 items-center">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `${linkClasses} ${isActive ? activeLinkClasses : ""}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `${linkClasses} ${isActive ? activeLinkClasses : ""}`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/salon"
              className={({ isActive }) =>
                `${linkClasses} ${isActive ? activeLinkClasses : ""}`
              }
            >
              Salon
            </NavLink>
            <NavLink
              to="/booking"
              className={({ isActive }) =>
                `${linkClasses} ${isActive ? activeLinkClasses : ""}`
              }
            >
              Booking
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `${linkClasses} ${isActive ? activeLinkClasses : ""}`
              }
            >
              Contact
            </NavLink>
          </div>

          {/* User Links */}
          <div className="hidden md:flex space-x-4 items-center">
            {!isLoggedIn && (
              <>
                <NavLink to="/login" className={linkClasses}>
                  Login
                </NavLink>
                <NavLink to="/register" className={linkClasses}>
                  Register
                </NavLink>
              </>
            )}
            {isLoggedIn && (
              <>
                {isAdmin && (
                  <NavLink to="/admin" className={linkClasses}>
                    Admin Dashboard
                  </NavLink>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 hover:text-pink-400 cursor-pointer px-2 py-1"
                >
                  <FiLogOut />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black px-4 pt-2 pb-4 space-y-2">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${linkClasses} ${isActive ? activeLinkClasses : ""}`
            }
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${linkClasses} ${isActive ? activeLinkClasses : ""}`
            }
            onClick={() => setIsOpen(false)}
          >
            About
          </NavLink>
          <NavLink
            to="/salon"
            className={({ isActive }) =>
              `${linkClasses} ${isActive ? activeLinkClasses : ""}`
            }
            onClick={() => setIsOpen(false)}
          >
            Salon
          </NavLink>
          <NavLink
            to="/booking"
            className={({ isActive }) =>
              `${linkClasses} ${isActive ? activeLinkClasses : ""}`
            }
            onClick={() => setIsOpen(false)}
          >
            Booking
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `${linkClasses} ${isActive ? activeLinkClasses : ""}`
            }
            onClick={() => setIsOpen(false)}
          >
            Contact
          </NavLink>

          {!isLoggedIn && (
            <>
              <NavLink
                to="/login"
                className={linkClasses}
                onClick={() => setIsOpen(false)}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={linkClasses}
                onClick={() => setIsOpen(false)}
              >
                Register
              </NavLink>
            </>
          )}
          {isLoggedIn && (
            <>
              {isAdmin && (
                <NavLink
                  to="/admin"
                  className={linkClasses}
                  onClick={() => setIsOpen(false)}
                >
                  Admin Dashboard
                </NavLink>
              )}
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="hover:text-pink-400 cursor-pointer px-2 py-1 flex items-center space-x-1"
              >
                <FiLogOut />
                <span>Logout</span>
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default NavBar;
