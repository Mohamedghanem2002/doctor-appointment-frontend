import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AddAppointment() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    doctor: "",
    date: "",
    reason: "",
  });

  useEffect(() => {
    const fetchDoctors = async () => {
      const res = await fetch(
        "https://doctor-appointment-backend-gamma.vercel.app/doctors/allDoctors"
      );
      const data = await res.json();
      setDoctors(data);
    };
    fetchDoctors();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const res = await fetch(
      "https://doctor-appointment-backend-gamma.vercel.app/appointments/createAppointment",
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
    if (res.ok) {
      toast.success("Appointment added successfully!");
      setForm({ doctor: "", date: "", reason: "" });
      navigate("/my-appointments");
    } else {
      toast.error(data.message || "Failed to create appointment");
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen text-xl text-[#008e9b] font-semibold">
        Please login to add an appointment.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-[#e0f7f8] to-[#ffffff] py-20 px-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-lg border border-[#2cbcc04d] transition-all duration-300 hover:shadow-[#2cbcc04d]"
      >
        <h2 className="text-3xl font-extrabold mb-8 text-center text-[#008e9b]">
          Book an Appointment
        </h2>

        <label className="block mb-2 text-sm font-semibold text-gray-700">
          Select Doctor
        </label>
        <select
          name="doctor"
          value={form.doctor}
          onChange={handleChange}
          required
          className="w-full mb-6 p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2cbcc0] transition"
        >
          <option value="">-- Choose a Doctor --</option>
          {doctors.map((doc) => (
            <option key={doc._id} value={doc._id}>
              {doc?.name} — {doc?.specialty}
            </option>
          ))}
        </select>

        <label className="block mb-2 text-sm font-semibold text-gray-700">
          Appointment Date
        </label>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
          className="w-full mb-6 p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2cbcc0] transition"
        />

        <label className="block mb-2 text-sm font-semibold text-gray-700">
          Reason for Visit
        </label>
        <textarea
          name="reason"
          value={form.reason}
          onChange={handleChange}
          required
          rows={4}
          placeholder="Describe your symptoms or reason for the visit..."
          className="w-full mb-6 p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2cbcc0] transition"
        ></textarea>

        <button
          type="submit"
          className="w-full py-3 rounded-lg font-semibold tracking-wide text-white bg-[#2cbcc0] shadow-md hover:bg-[#22a3a7] hover:shadow-lg transition-all duration-300"
        >
          Submit Appointment
        </button>
      </form>
    </div>
  );
}

export default AddAppointment;
