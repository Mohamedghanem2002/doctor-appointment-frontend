import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AllDepartments() {
  const { user } = useContext(AuthContext);
  const [departments, setDepartments] = useState([]);

  // Fetch all departments
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/departments/allDepartments"
        );
        const data = await res.json();
        if (!res.ok)
          throw new Error(data.message || "Failed to fetch departments");
        setDepartments(data);
      } catch (error) {
        toast.error(error.message || "Error fetching departments");
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
      const res = await fetch(`http://localhost:5000/departments/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok)
        throw new Error(data.message || "Failed to delete department");

      toast.success("Department deleted successfully!");
      setDepartments((prev) => prev.filter((dep) => dep._id !== id));
    } catch (error) {
      toast.error(error.message || "Error deleting department");
    }
  };

  if (!departments.length)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500 text-lg">
        Loading departments...
      </div>
    );

  return (
    <section className="py-20 bg-gradient-to-b from-[#f5ffff] to-[#e9f8f8] min-h-screen mt-16">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-[#008e9b]">
          Hospital Departments
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {departments.map((dep) => (
            <div
              key={dep._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-center"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                {dep.name}
              </h3>
              <p className="text-gray-600 text-sm mb-4">{dep.description}</p>

              {user && user.role === "admin" && (
                <button
                  onClick={() => handleDelete(dep._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-all duration-300"
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

export default AllDepartments;
