import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader2, Trash2 } from "lucide-react";

function AllDoctors() {
  const { user } = useContext(AuthContext);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/doctors/allDoctors`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch doctors");
      setDoctors(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
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
        `${import.meta.env.VITE_API_URL}/doctors/${id}`,
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

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen pt-20">
        <Loader2 className="w-12 h-12 text-[#2cbcc0] animate-spin" />
      </div>
    );

  return (
    <section className="py-24 bg-gradient-to-b from-[#f5ffff] to-white min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#008e9b] mb-4">
            Meet Our Specialists
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Our team of expert doctors is here to provide you with the best
            medical care. Choose regular appointments or book a consultation.
          </p>
        </div>

        {!doctors.length ? (
          <div className="text-center text-gray-500 text-xl py-12">
            No doctors found directly.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {doctors.map((doc) => (
              <div
                key={doc._id}
                className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2 border border-transparent hover:border-[#2cbcc0]/20"
              >
                {/* Image Section */}
                <Link to={`/doctor/${doc._id}`}>
                  <div className="relative h-64 overflow-hidden bg-gray-100">
                    <img
                      src={doc?.image}
                      alt={doc.name}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                      <span className="text-white font-medium px-4 py-2 border border-white/50 rounded-full backdrop-blur-sm">
                        View Profile
                      </span>
                    </div>
                  </div>
                </Link>

                {/* Content Section */}
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-[#008e9b] transition-colors">
                    {doc.name}
                  </h3>
                  <p className="text-[#2cbcc0] font-medium text-sm mb-4 uppercase tracking-wider">
                    {doc.specialty}
                  </p>

                  <div className="flex items-center justify-center gap-2 text-gray-500 text-sm mb-6">
                    <span className="bg-gray-100 px-3 py-1 rounded-full">
                      {doc.experienceYears}+ Years Exp.
                    </span>
                  </div>

                  <Link to={`/doctor/${doc._id}`} className="block w-full">
                    <button className="w-full">Book Appointment</button>
                  </Link>

                  {user?.role === "admin" && (
                    <button
                      onClick={() => handleDelete(doc._id)}
                      className="absolute top-4 right-4 bg-white/90 p-2 rounded-full text-red-500 shadow-sm hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                      title="Delete Doctor"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default AllDoctors;

