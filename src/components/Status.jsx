import React, { useState, useEffect, useRef } from "react";
import { Stethoscope, Building2, FlaskRound, Award } from "lucide-react";

function Status() {
  const [doctorsCount, setDoctorsCount] = useState(0);
  const [departmentsCount, setDepartmentsCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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

  // 🔥 مراقبة ظهور القسم على الشاشة
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.4 } // لما يظهر 40% من القسم
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // 🎯 أنيميشن زيادة الأرقام
  const useCountAnimation = (target, active) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
      if (!active) {
        setCount(0); // يرجع الصفر لما نسيب القسم
        return;
      }
      let start = 0;
      const duration = 1200; // زمن الأنيميشن
      const increment = target / (duration / 16);
      const interval = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(interval);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(interval);
    }, [active, target]);
    return count;
  };

  // القيم اللي هنعدها
  const animatedDoctors = useCountAnimation(doctorsCount, isVisible);
  const animatedDepartments = useCountAnimation(departmentsCount, isVisible);
  const animatedLabs = useCountAnimation(8, isVisible);
  const animatedAwards = useCountAnimation(150, isVisible);

  const stats = [
    {
      icon: <Stethoscope size={40} />,
      count: animatedDoctors,
      label: "Doctors",
    },
    {
      icon: <Building2 size={40} />,
      count: animatedDepartments,
      label: "Departments",
    },
    {
      icon: <FlaskRound size={40} />,
      count: animatedLabs,
      label: "Research Labs",
    },
    {
      icon: <Award size={40} />,
      count: animatedAwards,
      label: "Awards",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-[#f5ffff] to-[#e6f9fa]"
    >
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
