import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Building2, FileText, PlusCircle, Loader2 } from "lucide-react";

function AddDepartment() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/departments/addDepartments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add department");

      toast.success("Department added successfully!");
      setForm({ name: "", description: "" });

      setTimeout(() => navigate("/all-departments"), 1500);
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!user || user.role !== "admin") {
    return (
      <div className="flex items-center justify-center h-screen text-xl text-red-500 font-semibold bg-gray-50">
        Access Denied. Only admins can add departments.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-[#e0f7f8] to-white py-24 px-4">
      <ToastContainer position="top-right" autoClose={3000} />

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-[2rem] p-8 md:p-12 w-full max-w-2xl flex flex-col gap-8 border border-[#2cbcc04d] relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#2cbcc0]/10 rounded-full blur-2xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#008e9b]/5 rounded-full blur-2xl -z-10 -translate-x-1/2 translate-y-1/2"></div>

        <div className="text-center mb-4">
          <div className="w-16 h-16 bg-[#e0f7f8] text-[#008e9b] rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
            <Building2 size={32} />
          </div>
          <h2 className="text-3xl font-extrabold text-[#008e9b]">
            Add New Department
          </h2>
          <p className="text-gray-500 mt-2">Create a new medical department for the clinic.</p>
        </div>

        <div>
          <label className="block mb-2 font-bold text-gray-700 ml-1">Department Name</label>
          <div className="relative">
            <PlusCircle className="absolute left-4 top-3.5 text-gray-400" size={20} />
            <input
              value={form.name}
              onChange={handleChange}
              type="text"
              name="name"
              required
              placeholder="e.g. Cardiology, Neurology"
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2cbcc0] focus:bg-white transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block mb-2 font-bold text-gray-700 ml-1">
            Description
          </label>
          <div className="relative">
             <FileText className="absolute left-4 top-4 text-gray-400" size={20} />
             <textarea
                value={form.description}
                onChange={handleChange}
                name="description"
                rows={5}
                required
                placeholder="Describe the services offered by this department..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2cbcc0] focus:bg-white transition-all"
              ></textarea>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 rounded-xl font-bold text-lg text-white shadow-lg transition-all duration-300 mt-2 flex items-center justify-center gap-2 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-[#008e9b] to-[#2cbcc0] hover:shadow-[#2cbcc0]/40 hover:-translate-y-1"
          }`}
        >
          {loading ? (
             <>
               <Loader2 className="animate-spin" /> Adding...
             </>
          ) : (
             "Add Department"
          )}
        </button>
      </form>
    </div>
  );
}

export default AddDepartment;

