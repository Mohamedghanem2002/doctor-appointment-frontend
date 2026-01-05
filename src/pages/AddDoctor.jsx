import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import doctorImg from "../img/avatar-dotor.webp";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Upload, UserPlus, Stethoscope, FileText, User } from "lucide-react";

function AddDoctor() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("specialty", form.specialty);
      formData.append("experienceYears", form.experienceYears);
      formData.append("description", form.description);
      if (form.image) formData.append("image", form.image);

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/doctors/addDoctors`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );

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
    } finally {
      setLoading(false);
    }
  };

  if (!user || user.role !== "admin") {
    return (
      <div className="flex items-center justify-center h-screen text-xl text-red-500 font-semibold bg-gray-50">
        Access Denied. Only admins can view this page.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-[#e0f7f8] to-white py-24 px-4">
      <ToastContainer position="top-right" autoClose={3000} />

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-[2rem] p-8 md:p-12 w-full max-w-5xl flex flex-col md:flex-row gap-12 border border-[#2cbcc04d] relative overflow-hidden"
        encType="multipart/form-data"
      >
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#2cbcc0]/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>

        {/* Image Upload Section */}
        <div className="flex flex-col items-center justify-center w-full md:w-1/3 border-r border-gray-100 pr-0 md:pr-12">
          <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-[#2cbcc0]/20 shadow-lg mb-6 relative group">
            <img
              src={preview || doctorImg}
              alt="Doctor Preview"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {!preview && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                <span className="text-gray-500 font-medium">No Image</span>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => document.getElementById("fileInput").click()}
            className="flex items-center gap-2 px-6 py-3 bg-[#e0f7f8] text-[#008e9b] rounded-xl font-bold hover:bg-[#2cbcc0] hover:text-white transition-all duration-300 shadow-sm"
          >
            <Upload size={20} />
            Upload Photo
          </button>

          <input
            id="fileInput"
            type="file"
            name="image"
            accept="image/*"
            className="hidden"
            onChange={handleChange}
          />
          <p className="text-xs text-gray-400 mt-4 text-center">
            Recommended: Square JPG/PNG, max 2MB
          </p>
        </div>

        {/* Form Fields Section */}
        <div className="w-full md:w-2/3">
          <h2 className="text-3xl font-extrabold mb-8 text-[#008e9b] flex items-center gap-3">
            <UserPlus className="w-8 h-8" />
            Add New Specialist
          </h2>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-semibold text-gray-700 ml-1">
                  Full Name
                </label>
                <div className="relative">
                  <User
                    className="absolute left-4 top-3.5 text-gray-400"
                    size={20}
                  />
                  <input
                    value={form.name}
                    onChange={handleChange}
                    type="text"
                    name="name"
                    required
                    placeholder="Dr. John Doe"
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2cbcc0] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 font-semibold text-gray-700 ml-1">
                  Specialty
                </label>
                <div className="relative">
                  <Stethoscope
                    className="absolute left-4 top-3.5 text-gray-400"
                    size={20}
                  />
                  <input
                    value={form.specialty}
                    onChange={handleChange}
                    type="text"
                    name="specialty"
                    required
                    placeholder="e.g. Cardiologist"
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2cbcc0] focus:bg-white transition-all"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700 ml-1">
                Experience (Years)
              </label>
              <input
                value={form.experienceYears}
                onChange={handleChange}
                type="number"
                name="experienceYears"
                required
                placeholder="e.g. 10"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2cbcc0] focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700 ml-1">
                Biography / Description
              </label>
              <div className="relative">
                <FileText
                  className="absolute left-4 top-4 text-gray-400"
                  size={20}
                />
                <textarea
                  value={form.description}
                  onChange={handleChange}
                  name="description"
                  rows={4}
                  required
                  placeholder="Enter a comprehensive bio, qualifications, and areas of expertise..."
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2cbcc0] focus:bg-white transition-all"
                ></textarea>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl font-bold text-lg text-white shadow-lg transition-all duration-300 mt-4 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#008e9b] to-[#2cbcc0] hover:shadow-[#2cbcc0]/40 hover:-translate-y-1"
              }`}
            >
              {loading ? "Adding Doctor..." : "Publish Doctor Profile"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddDoctor;

