import React, { useState, useEffect } from "react";

function Departments() {
  const [departments, setDepartments] = useState([]);
  const [activeTab, setActiveTab] = useState(null);

  useEffect(() => {
    fetch(
      "https://doctor-appointment-backend-gamma.vercel.app/departments/allDepartments"
    )
      .then((res) => res.json())
      .then((data) => {
        setDepartments(data);
        if (data.length > 0) setActiveTab(data[0]._id);
      })
      .catch((error) => console.error("Error fetching departments:", error));
  }, []);

  return (
    <section
      id="departments"
      className="py-20 bg-gradient-to-b from-[#f5ffff] to-[#e9f8f8]"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#008e9b] mb-3">
            Our Departments
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Explore our specialized medical departments, each equipped with
            expert doctors and modern technology.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <ul className="flex flex-col md:flex-col items-center md:items-start md:w-1/4 border-b-0 md:border-r border-gray-200 pb-2 md:pb-0 md:pr-4">
            {departments.map((dep) => (
              <li
                key={dep._id}
                className="w-full flex justify-center md:justify-start"
              >
                <button
                  onClick={() => setActiveTab(dep._id)}
                  className={`w-56 md:w-full text-center px-5 py-3 font-semibold rounded-lg transition-all duration-300 mb-2 
                    ${
                      activeTab === dep._id
                        ? "bg-[#008e9b] text-white shadow-lg"
                        : "bg-white text-[#008e9b] hover:bg-cyan-50 hover:shadow"
                    }`}
                >
                  {dep?.name}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex-1 bg-white shadow-md rounded-2xl p-6 md:p-8 transition-all duration-300">
            {departments?.map((dep) =>
              dep?._id === activeTab ? (
                <div
                  key={dep._id}
                  className="flex flex-col md:flex-row items-center gap-6"
                >
                  {dep?.image && (
                    <img
                      src={`http://localhost:5000/uploads/${dep.image}`}
                      alt={dep.name}
                      className="w-full md:w-1/2 rounded-lg shadow-md object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold text-[#008e9b] mb-4">
                      {dep?.name}
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {dep?.description}
                    </p>
                  </div>
                </div>
              ) : null
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Departments;
