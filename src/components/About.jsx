import React from "react";
import AboutUs from "../img/about.jpg";
import { Play } from "lucide-react";

function About() {
  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-b from-[#f5ffff] to-[#e6f9fa] text-gray-800"
    >
      {/* Section Header */}
      <div className="text-center mb-14 px-6">
        <h2 className="text-4xl font-extrabold text-[#008e9b] mb-4">
          About Us
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          We are committed to providing top-notch healthcare services with a
          patient-centered approach. Our team of experienced medical
          professionals is dedicated to ensuring your well-being through
          personalized care and advanced medical treatments.
        </p>
      </div>

      {/* Content Grid */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 px-6 items-center">
        {/* Image Section */}
        <div className="relative group">
          <img
            src={AboutUs}
            alt="About Us"
            className="rounded-2xl shadow-lg w-full object-cover transform transition-transform duration-500 group-hover:scale-105"
          />
          <a
            href="https://www.youtube.com/watch?v=Y7f98aduVJ8"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="bg-white text-[#008e9b] rounded-full p-5 shadow-lg hover:scale-110 transition-all duration-300">
              <Play size={28} />
            </div>
          </a>
        </div>

        {/* Text Section */}
        <div className="space-y-5">
          <h3 className="text-2xl font-semibold text-gray-800">
            Dedicated to delivering world-class healthcare with compassion and
            innovation.
          </h3>
          <p className="text-gray-600 leading-relaxed">
            We strive to deliver exceptional healthcare with a patient-first
            approach, combining expert medical knowledge, modern facilities, and
            compassionate care to improve lives and build healthier communities.
          </p>

          <ul className="space-y-3 mt-6 text-gray-700">
            <li className="flex items-center gap-2">
              <span className="text-[#00a2b3] font-bold">✔</span> Quick and easy
              online appointment booking
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#00a2b3] font-bold">✔</span> Professional
              and experienced doctors
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#00a2b3] font-bold">✔</span> 24/7 emergency
              support and consultation
            </li>
          </ul>

          <button className="mt-6 bg-[#2cbcc0] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#22a3a7] transition-all duration-300 shadow-md">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}

export default About;
