import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function AddDepartment() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Handle department creation
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/departments/addDepartments`,
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
    }
  };

  if (!user || user.role !== "admin") {
    return (
      <div className="flex items-center justify-center h-screen text-xl text-[#008e9b] font-semibold">
        Only admin users can add departments.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-[#e0f7f8] to-white py-20 px-4">
      <ToastContainer position="top-right" autoClose={3000} />

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-lg flex flex-col gap-6 border border-[#2cbcc04d] transition-all duration-300 hover:shadow-[#2cbcc04d]"
      >
        <h2 className="text-3xl font-extrabold text-center mb-4 text-[#008e9b]">
          Add New Department
        </h2>

        <label className="block mb-2 font-semibold text-gray-700">Name</label>
        <input
          value={form.name}
          onChange={handleChange}
          type="text"
          name="name"
          required
          placeholder="Enter department name"
          className="w-full mb-4 p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2cbcc0]"
        />

        <label className="block mb-2 font-semibold text-gray-700">
          Description
        </label>
        <textarea
          value={form.description}
          onChange={handleChange}
          name="description"
          rows={4}
          required
          placeholder="Enter department details..."
          className="w-full mb-6 p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2cbcc0]"
        ></textarea>

        <button
          type="submit"
          className="w-full py-3 rounded-lg font-semibold text-white bg-[#2cbcc0] shadow-md hover:bg-[#22a3a7] hover:shadow-lg transition-all duration-300"
        >
          Add Department
        </button>
      </form>
    </div>
  );
}

export default AddDepartment;
