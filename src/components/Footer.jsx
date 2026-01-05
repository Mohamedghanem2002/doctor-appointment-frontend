import React from "react";
import { Link } from "react-router-dom";
import logo from "../img/Frame 2.png";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Brand Section */}
        <div>
          <img
            src={logo}
            alt="Doctor App"
            className="w-40 mb-6 brightness-0 invert" 
          />
          <p className="text-gray-400 leading-relaxed mb-6">
            We are committed to providing the best medical care with our team of
            specialized doctors and modern facilities. Your health is our
            priority.
          </p>
          <div className="flex gap-4">
            <SocialIcon icon={<Facebook size={18} />} />
            <SocialIcon icon={<Twitter size={18} />} />
            <SocialIcon icon={<Instagram size={18} />} />
            <SocialIcon icon={<Linkedin size={18} />} />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-6 text-[#2cbcc0]">Quick Links</h3>
          <ul className="space-y-4">
            <FooterLink to="/" label="Home" />
            <FooterLink to="/allDoctors" label="Our Doctors" />
            <FooterLink to="/all-departments" label="Departments" />
            <FooterLink to="/#about" label="About Us" />
            <FooterLink to="/add-appointment" label="Book Appointment" />
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-xl font-bold mb-6 text-[#2cbcc0]">Services</h3>
          <ul className="space-y-4">
            <li className="text-gray-400 hover:text-white transition-colors cursor-pointer">
              Emergency Care
            </li>
            <li className="text-gray-400 hover:text-white transition-colors cursor-pointer">
              Heart Disease
            </li>
            <li className="text-gray-400 hover:text-white transition-colors cursor-pointer">
              Dental Care
            </li>
            <li className="text-gray-400 hover:text-white transition-colors cursor-pointer">
              Neurology
            </li>
            <li className="text-gray-400 hover:text-white transition-colors cursor-pointer">
              Orthopedics
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-bold mb-6 text-[#2cbcc0]">Contact Used</h3>
          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <MapPin className="text-[#2cbcc0] mt-1" size={20} />
              <span className="text-gray-400">
                123 Medical Center Dr,
                <br />
                Health City, HC 90210
              </span>
            </li>
            <li className="flex items-center gap-4">
              <Phone className="text-[#2cbcc0]" size={20} />
              <span className="text-gray-400 font-medium">+1 (555) 123-4567</span>
            </li>
            <li className="flex items-center gap-4">
              <Mail className="text-[#2cbcc0]" size={20} />
              <span className="text-gray-400">support@doctorapp.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <p className="text-gray-500">
          © {new Date().getFullYear()} Doctor App. All Rights Reserved.
        </p>
        <div className="flex gap-8 text-sm text-gray-500">
          <Link to="#" className="hover:text-[#2cbcc0] transition-colors">
            Privacy Policy
          </Link>
          <Link to="#" className="hover:text-[#2cbcc0] transition-colors">
            Terms of Service
          </Link>
          <Link to="#" className="hover:text-[#2cbcc0] transition-colors">
            Cookie Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}

// Helper Components
const FooterLink = ({ to, label }) => (
  <li>
    <Link
      to={to}
      className="text-gray-400 hover:text-[#2cbcc0] hover:translate-x-1 transition-all duration-300 inline-block"
    >
      {label}
    </Link>
  </li>
);

const SocialIcon = ({ icon }) => (
  <a
    href="#"
    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#2cbcc0] hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-md"
  >
    {icon}
  </a>
);

export default Footer;
