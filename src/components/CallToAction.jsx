import React from "react";
import { useNavigate } from "react-router-dom";

function CallToAction() {
  const navigate = useNavigate();

  return (
    <section
      id="services"
      className="bg-gradient-to-r from-cyan-50 to-cyan-100 text-gray-800 py-20"
    >
      <div className="max-w-5xl mx-auto text-center px-6">
        <h3 className="text-4xl font-extrabold text-cyan-700 mb-6 leading-tight">
          In an emergency? Need help now?
        </h3>
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Our team is available{" "}
          <span className="text-cyan-700 font-semibold">24/7</span> to provide
          urgent care and immediate medical assistance whenever you need it
          most.
        </p>
        <button
          onClick={() => navigate("/add-appointment")}
          className="bg-[#00a2b3] text-white text-lg font-semibold px-8 py-3 rounded-full shadow-md hover:bg-[#0092a3] transition-all duration-300 transform hover:scale-105"
        >
          Make An Appointment
        </button>
      </div>
    </section>
  );
}

export default CallToAction;
