import { ArrowRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Doctors() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchedDoctors = async () => {
      try {
        const res = await fetch(
          "https://doctor-appointment-backend-gamma.vercel.app/doctors/allDoctors"
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch doctors");
        setDoctors(data.slice(0, 3));
      } catch (error) {
        console.error(error);
      }
    };
    fetchedDoctors();
  }, []);

  return (
    <section
      id="doctors"
      className="py-20 bg-gradient-to-b from-[#f5ffff] to-[#e9f8f8]"
    >
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-[#008e9b]">
          Meet Our Doctors
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {doctors.map((doc) => (
            <div
              key={doc?._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden text-center p-6 group"
            >
              <Link to={`/doctor/${doc._id}`}>
                <div className="relative mb-4">
                  <img
                    src={doc?.image}
                    alt={doc?.name}
                    className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-[#008e9b]/20 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <h3 className="text-2xl font-bold text-gray-800 group-hover:text-[#008e9b] transition-colors duration-300">
                  {doc?.name}
                </h3>

                <p className="text-[#008e9b] font-semibold text-lg mt-1 mb-2">
                  {doc?.specialty}
                </p>

                <p className="text-gray-600 text-sm">
                  {doc?.experienceYears} Years of Experience
                </p>
              </Link>
            </div>
          ))}
        </div>

        <div className="w-full flex justify-center mt-12">
          <Link
            to="/allDoctors"
            className="group flex items-center gap-3 bg-[#2cbcc0] text-white px-8 py-3 rounded-full font-semibold tracking-wide shadow-md shadow-[#2cbcc04d] transition-all duration-300 hover:bg-[#22a3a7] hover:shadow-lg hover:shadow-[#22a3a766]"
          >
            See All Doctors
            <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Doctors;
