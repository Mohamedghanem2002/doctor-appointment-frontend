import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch("http://localhost:5000/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
        return;
      }

      if (data.token) {
        login(data.token);
        navigate("/");
      }
    } catch (err) {
      setError("Server error, please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#e0f7f8] to-white px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md border border-[#2cbcc04d] transition-all duration-300 hover:shadow-[#2cbcc04d]"
      >
        <h2 className="text-3xl font-extrabold text-center mb-6 text-[#008e9b]">
          Create an Account
        </h2>

        {error && (
          <p className="text-red-500 text-center mb-4 font-medium">{error}</p>
        )}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full mb-4 p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2cbcc0] transition"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full mb-4 p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2cbcc0] transition"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full mb-6 p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2cbcc0] transition"
        />

        <button
          type="submit"
          className="w-full py-3 rounded-lg font-semibold text-white bg-[#2cbcc0] shadow-md hover:bg-[#22a3a7] hover:shadow-lg transition-all duration-300"
        >
          Register
        </button>

        <p className="text-center text-gray-600 text-sm mt-5">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#008e9b] font-semibold hover:underline"
          >
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
