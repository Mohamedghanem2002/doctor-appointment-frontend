import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AllDoctors() {
  const { user } = useContext(AuthContext);
  const [doctors, setDoctors] = useState([]);

  const fetchDoctors = async () => {
    try {
      const res = await fetch(
        "https://doctor-appointment-backend-gamma.vercel.app/doctors/allDoctors"
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch doctors");
      setDoctors(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this doctor?")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `https://doctor-appointment-backend-gamma.vercel.app/doctors/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete doctor");

      setDoctors((prev) => prev.filter((doc) => doc._id !== id));
      toast.success("Doctor deleted successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!doctors.length)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500 text-lg">
        Loading doctors...
      </div>
    );

  return (
    <section className="py-20 bg-gradient-to-b from-[#f5ffff] to-[#e9f8f8] min-h-screen mt-16">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-[#008e9b]">
          Our Doctors
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {doctors.map((doc) => (
            <div
              key={doc._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden text-center p-6 group"
            >
              <Link to={`/doctor/${doc._id}`}>
                <div className="relative mb-4">
                  <img
                    src={doc?.image}
                    alt={doc.name}
                    className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-[#008e9b]/20 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <h3 className="text-2xl font-bold text-gray-800 group-hover:text-[#008e9b] transition-colors duration-300">
                  {doc.name}
                </h3>

                <p className="text-[#008e9b] font-semibold text-lg mt-1 mb-2">
                  {doc.specialty}
                </p>

                <p className="text-gray-600 text-sm">
                  {doc.experienceYears} Years of Experience
                </p>
              </Link>

              {user?.role === "admin" && (
                <button
                  onClick={() => handleDelete(doc._id)}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AllDoctors;
