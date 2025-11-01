import React, { useState, useEffect } from "react";
import { Stethoscope, Building2, FlaskRound, Award } from "lucide-react";

function Status() {
  const [doctorsCount, setDoctorsCount] = useState(0);
  const [departmentsCount, setDepartmentsCount] = useState(0);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const doctorsStats = await fetch(
          "https://doctor-appointment-backend-gamma.vercel.app/doctors/count"
        );
        const departmentsStats = await fetch(
          "https://doctor-appointment-backend-gamma.vercel.app/departments/count"
        );

        const doctorsData = await doctorsStats.json();
        const departmentsData = await departmentsStats.json();

        setDoctorsCount(doctorsData.count || 0);
        setDepartmentsCount(departmentsData.count || 0);
      } catch (error) {
        console.error("Error fetching status:", error);
      }
    };
    fetchStatus();
  }, []);

  const stats = [
    {
      icon: <Stethoscope size={40} />,
      count: doctorsCount,
      label: "Doctors",
    },
    {
      icon: <Building2 size={40} />,
      count: departmentsCount,
      label: "Departments",
    },
    {
      icon: <FlaskRound size={40} />,
      count: 8,
      label: "Research Labs",
    },
    {
      icon: <Award size={40} />,
      count: 150,
      label: "Awards",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-[#f5ffff] to-[#e6f9fa]">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-extrabold text-[#008e9b] mb-10">
          Our Achievements
        </h2>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-8">
          {stats.map((item, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-md p-8 flex flex-col items-center justify-center 
              hover:bg-[#008e9b] hover:shadow-xl transition-all duration-500"
            >
              <div className="text-[#00a2b3] group-hover:text-white mb-4 transition-colors duration-300">
                {item.icon}
              </div>

              <h3 className="text-4xl font-bold text-gray-800 group-hover:text-white transition-colors duration-300">
                {item.count}
              </h3>

              <p className="mt-2 text-lg text-gray-600 group-hover:text-white transition-colors duration-300">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Status;
