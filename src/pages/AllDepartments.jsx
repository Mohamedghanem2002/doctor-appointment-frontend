import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Trash2, Building2, Loader2, Plus } from "lucide-react";
import { Link } from "react-router-dom";

function AllDepartments() {
  const { user } = useContext(AuthContext);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all departments
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/departments/allDepartments`
        );
        const data = await res.json();
        if (!res.ok)
          throw new Error(data.message || "Failed to fetch departments");
        setDepartments(data);
      } catch (error) {
        toast.error(error.message || "Error fetching departments");
      } finally {
        setLoading(false);
      }
    };
    fetchDepartments();
  }, []);

  // Delete department (admin only)
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this department?"))
      return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/departments/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      if (!res.ok)
        throw new Error(data.message || "Failed to delete department");

      toast.success("Department deleted successfully!");
      setDepartments((prev) => prev.filter((dep) => dep._id !== id));
    } catch (error) {
      toast.error(error.message || "Error deleting department");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
         <Loader2 className="w-12 h-12 text-[#2cbcc0] animate-spin" />
      </div>
    );

  return (
    <section className="py-24 bg-gradient-to-b from-[#f5ffff] to-white min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
             <div>
                <h2 className="text-4xl font-extrabold text-[#008e9b] mb-2">
                Our Departments
                </h2>
                <p className="text-gray-600 text-lg">Detailed breakdown of our medical specialties</p>
             </div>
             
             {user && user.role === "admin" && (
                <Link to="/add-department" className="flex items-center gap-2 bg-[#2cbcc0] text-white px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-[#2cbcc0]/40 hover:-translate-y-1 transition-all duration-300">
                    <Plus size={20} /> Add New Department
                </Link>
             )}
        </div>

        {!departments.length ? (
             <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-dashed border-gray-300">
                <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-700">No Departments Found</h3>
                <p className="text-gray-500">Departments will appear here once added.</p>
             </div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {departments.map((dep) => (
                <div
                key={dep._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100 group relative overflow-hidden"
                >
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#e0f7f8] rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                
                <div className="relative z-10">
                    <div className="w-14 h-14 bg-[#e0f7f8] text-[#008e9b] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#2cbcc0] group-hover:text-white transition-colors duration-300">
                        <Building2 size={28} />
                    </div>

                    <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-[#008e9b] transition-colors">
                        {dep.name}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
                        {dep.description}
                    </p>

                    {user && user.role === "admin" && (
                        <div className="pt-4 border-t border-gray-100 flex justify-end">
                            <button
                            onClick={() => handleDelete(dep._id)}
                            className="flex items-center gap-2 text-red-500 hover:text-red-600 font-semibold px-4 py-2 hover:bg-red-50 rounded-lg transition-all"
                            >
                            <Trash2 size={18} /> Delete
                            </button>
                        </div>
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

export default AllDepartments;

