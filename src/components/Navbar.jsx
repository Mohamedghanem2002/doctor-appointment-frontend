// src/components/Navbar.jsx
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
      <div className="max-w-7xl mx-auto px-4 md:px-10 py-2 md:py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" onClick={closeMenu}>
          <img src={logo} alt="Logo" className="w-40 md:w-48" />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 items-center text-lg font-semibold text-[#008e9b]">
          {(user?.role === "user" || !user) && (
            <>
              <li>
                <Link
                  to="/#home"
                  onClick={closeMenu}
                  className="hover:text-[#2cbcc0] transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/#about"
                  onClick={closeMenu}
                  className="hover:text-[#2cbcc0] transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/#departments"
                  onClick={closeMenu}
                  className="hover:text-[#2cbcc0] transition-colors"
                >
                  Our Departments
                </Link>
              </li>
              <li>
                <Link
                  to="/#doctors"
                  onClick={closeMenu}
                  className="hover:text-[#2cbcc0] transition-colors"
                >
                  Our Doctors
                </Link>
              </li>
            </>
          )}

          {/* ADMIN LINKS */}
          {user?.role === "admin" && (
            <>
              <li>
                <Link
                  to="/add-doctor"
                  className="hover:text-[#2cbcc0] transition"
                  onClick={closeMenu}
                >
                  Add Doctor
                </Link>
              </li>
              <li>
                <Link
                  to="/add-department"
                  className="hover:text-[#2cbcc0] transition"
                  onClick={closeMenu}
                >
                  Add Department
                </Link>
              </li>
              <li>
                <Link
                  to="/all-departments"
                  className="hover:text-[#2cbcc0] transition"
                  onClick={closeMenu}
                >
                  All Departments
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                  className="bg-[#2cbcc0] text-white px-4 py-2 rounded-lg hover:bg-[#22a3a7] transition-all"
                >
                  Logout
                </button>
              </li>
            </>
          )}

          {/* USER LINKS */}
          {user?.role === "user" && (
            <>
              <li>
                <Link
                  to="/my-appointments"
                  className="hover:text-[#2cbcc0] transition"
                  onClick={closeMenu}
                >
                  My Appointments
                </Link>
              </li>

              {/* Dashboard button: لو عايز تودّي للـ login مع from=dashboard استبدل to="/login" بـ to={{ pathname: "/login" }} مع state */}
              <li>
                <Link
                  to="/login?from=dashboard"
                  className="bg-[#008e9b] text-white px-5 py-2 rounded-full shadow-md hover:bg-[#2cbcc0] hover:scale-105 transition-all duration-300"
                  onClick={closeMenu}
                >
                  Dashboard
                </Link>
              </li>

              <li>
                <button
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                  className="bg-[#2cbcc0] text-white px-4 py-2 rounded-lg hover:bg-[#22a3a7] transition-all"
                >
                  Logout
                </button>
              </li>
            </>
          )}

          {/* GUEST (not logged in) */}
          {!user && (
            <>
              <li>
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="hover:text-[#2cbcc0] transition"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="hover:text-[#2cbcc0] transition"
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-[#008e9b] hover:text-[#2cbcc0] transition"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`absolute top-full left-0 w-full bg-gradient-to-b from-[#e0f9fb] to-white shadow-md transition-all duration-500 ease-in-out ${
          menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <ul className="flex flex-col items-center space-y-5 py-6 text-lg font-semibold text-[#008e9b]">
          {(user?.role === "user" || !user) && (
            <>
              <li>
                <Link to="/#home" onClick={closeMenu}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/#about" onClick={closeMenu}>
                  About
                </Link>
              </li>
              <li>
                <Link to="/#departments" onClick={closeMenu}>
                  Our Departments
                </Link>
              </li>
              <li>
                <Link to="/#doctors" onClick={closeMenu}>
                  Our Doctors
                </Link>
              </li>
              <li>
                <Link to="/my-appointments" onClick={closeMenu}>
                  My Appointments
                </Link>
              </li>
            </>
          )}

          {/* Dashboard for mobile (user) */}
          {user?.role === "user" && (
            <li>
              <Link
                to="/login?from=dashboard"
                onClick={closeMenu}
                className="bg-[#008e9b] text-white px-6 py-2 rounded-full shadow-md hover:bg-[#2cbcc0] transition-all duration-300"
              >
                Dashboard
              </Link>
            </li>
          )}

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
              <li>
                <Link to="/all-departments" onClick={closeMenu}>
                  All Departments
                </Link>
              </li>
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
            </>
          )}

          {user?.role === "user" && (
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
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
