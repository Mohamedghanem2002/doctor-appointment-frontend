import React from "react";
import { useNavigate } from "react-router-dom";

function CallToAction() {
  const navigate = useNavigate();

  return (
    <section
      id="services"
      className="bg-gradient-to-r from-[#008e9b] to-[#2cbcc0] text-white py-24 relative overflow-hidden"
    >
      {/* Decorative Circles */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -ml-20 -mt-20"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -mr-20 -mb-20"></div>

      <div className="max-w-5xl mx-auto text-center px-6 relative z-10">
        <h3 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight drop-shadow-md">
          In an emergency? Need help now?
        </h3>
        <p className="text-lg md:text-2xl text-cyan-50 mb-10 max-w-3xl mx-auto font-light leading-relaxed">
          Our team is available{" "}
          <span className="font-bold bg-white/20 px-2 py-0.5 rounded text-white mx-1">24/7</span> to provide
          urgent care and immediate medical assistance whenever you need it
          most.
        </p>
        <button
          onClick={() => navigate("/add-appointment")}
          className="bg-white text-[#008e9b] text-lg font-bold px-10 py-4 rounded-full shadow-xl hover:shadow-2xl hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
        >
          Make An Appointment
        </button>
      </div>
    </section>
  );
}

export default CallToAction;
