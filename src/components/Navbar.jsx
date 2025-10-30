import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../img/Frame 2.png";
import { AuthContext } from "../context/AuthContext";
import { Menu, X } from "lucide-react";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-lg shadow-md z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" onClick={closeMenu}>
          <img src={logo} alt="Logo" className="w-32 md:w-36" />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 items-center text-lg font-semibold text-[#008e9b]">
          <li>
            <Link to="/" className="hover:text-[#2cbcc0] transition-colors">
              Home
            </Link>
          </li>
          <li>
            <a
              href="#services"
              className="hover:text-[#2cbcc0] transition-colors"
            >
              Services
            </a>
          </li>
          <li>
            <a href="#about" className="hover:text-[#2cbcc0] transition-colors">
              About
            </a>
          </li>

          {user?.role === "admin" && (
            <>
              <li>
                <Link
                  to="/add-doctor"
                  className="hover:text-[#2cbcc0] transition"
                >
                  Add Doctor
                </Link>
              </li>
              <li>
                <Link
                  to="/add-department"
                  className="hover:text-[#2cbcc0] transition"
                >
                  Add Department
                </Link>
              </li>
              <li>
                <Link to="/all-departments" onClick={closeMenu}>
                  All Departments
                </Link>
              </li>
            </>
          )}

          {user?.role === "user" && (
            <>
              <li>
                <Link
                  to="/add-appointment"
                  className="hover:text-[#2cbcc0] transition"
                >
                  Add Appointment
                </Link>
              </li>
              <li>
                <Link
                  to="/my-appointments"
                  className="hover:text-[#2cbcc0] transition"
                >
                  My Appointments
                </Link>
              </li>
            </>
          )}

          {!user && (
            <>
              <li>
                <Link to="/login" className="hover:text-[#2cbcc0] transition">
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="hover:text-[#2cbcc0] transition"
                >
                  Register
                </Link>
              </li>
            </>
          )}

          {user && (
            <li>
              <button
                onClick={logout}
                className="bg-[#2cbcc0] text-white px-4 py-2 rounded-lg hover:bg-[#22a3a7] transition-all"
              >
                Logout
              </button>
            </li>
          )}
        </ul>

        {/* Mobile Menu Icon */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-[#008e9b] hover:text-[#2cbcc0] transition"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`absolute top-full left-0 w-full bg-gradient-to-b from-[#e0f9fb] to-white shadow-md transition-all duration-500 ease-in-out ${
          menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <ul className="flex flex-col items-center space-y-5 py-6 text-lg font-semibold text-[#008e9b]">
          <li>
            <Link to="/" onClick={closeMenu}>
              Home
            </Link>
          </li>
          <li>
            <a href="#services" onClick={closeMenu}>
              Services
            </a>
          </li>
          <li>
            <a href="#about" onClick={closeMenu}>
              About
            </a>
          </li>

          {user?.role === "admin" && (
            <>
              <li>
                <Link to="/add-doctor" onClick={closeMenu}>
                  Add Doctor
                </Link>
              </li>
              <li>
                <Link to="/add-department" onClick={closeMenu}>
                  Add Department
                </Link>
              </li>
            </>
          )}

          {user?.role === "user" && (
            <li>
              <Link to="/add-appointment" onClick={closeMenu}>
                Add Appointment
              </Link>
            </li>
          )}

          {!user && (
            <>
              <li>
                <Link to="/login" onClick={closeMenu}>
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" onClick={closeMenu}>
                  Register
                </Link>
              </li>
            </>
          )}

          {user && (
            <li>
              <button
                onClick={() => {
                  logout();
                  closeMenu();
                }}
                className="bg-[#2cbcc0] text-white px-6 py-2 rounded-lg hover:bg-[#22a3a7] transition-all"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
