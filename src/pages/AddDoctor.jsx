import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import doctorImg from "../img/avatar-dotor.webp";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function AddDoctor() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    name: "",
    specialty: "",
    experienceYears: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      setForm({ ...form, [name]: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("specialty", form.specialty);
      formData.append("experienceYears", form.experienceYears);
      formData.append("description", form.description);
      if (form.image) formData.append("image", form.image);

      const res = await fetch("http://localhost:5000/doctors/addDoctors", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add doctor");

      toast.success("Doctor added successfully!");
      setForm({
        name: "",
        specialty: "",
        experienceYears: "",
        description: "",
        image: null,
      });
      setPreview(null);
      setTimeout(() => {
        navigate("/allDoctors");
      }, 1500);
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  if (!user || user.role !== "admin") {
    return (
      <div className="flex items-center justify-center h-screen text-xl text-[#008e9b] font-semibold">
        Only admin users can add doctors.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-[#e0f7f8] to-white py-20 px-4">
      <ToastContainer position="top-right" autoClose={3000} />

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-4xl flex flex-col md:flex-row gap-10 border border-[#2cbcc04d] transition-all duration-300 hover:shadow-[#2cbcc04d]"
        encType="multipart/form-data"
      >
        <div className="flex flex-col items-center w-full md:w-1/3">
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-[#2cbcc0] shadow-md">
            <img
              src={preview || doctorImg}
              alt="Doctor Preview"
              className="w-full h-full object-cover"
            />
          </div>

          <button
            type="button"
            onClick={() => document.getElementById("fileInput").click()}
            className="mt-5 px-4 py-2 bg-[#2cbcc0] text-white rounded-lg font-semibold hover:bg-[#22a3a7] transition-all duration-300"
          >
            Choose Image
          </button>

          <input
            id="fileInput"
            type="file"
            name="image"
            accept="image/*"
            className="hidden"
            onChange={handleChange}
          />
        </div>

        <div className="w-full md:w-2/3">
          <h2 className="text-3xl font-extrabold text-center mb-8 text-[#008e9b]">
            Add New Doctor
          </h2>

          <label className="block mb-2 font-semibold text-gray-700">Name</label>
          <input
            value={form.name}
            onChange={handleChange}
            type="text"
            name="name"
            required
            className="w-full mb-4 p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2cbcc0]"
          />

          <label className="block mb-2 font-semibold text-gray-700">
            Specialty
          </label>
          <input
            value={form.specialty}
            onChange={handleChange}
            type="text"
            name="specialty"
            required
            className="w-full mb-4 p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2cbcc0]"
          />

          <label className="block mb-2 font-semibold text-gray-700">
            Experience Years
          </label>
          <input
            value={form.experienceYears}
            onChange={handleChange}
            type="number"
            name="experienceYears"
            required
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
            placeholder="Enter a short bio or specialization details..."
            className="w-full mb-6 p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2cbcc0]"
          ></textarea>

          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold text-white bg-[#2cbcc0] shadow-md hover:bg-[#22a3a7] hover:shadow-lg transition-all duration-300"
          >
            Add Doctor
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddDoctor;
