import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function DoctorDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [relatedDoctors, setRelatedDoctors] = useState([]);

  useEffect(() => {
    const fetchedDoctor = async () => {
      try {
        const res = await fetch(
          `https://doctor-appointment-backend-gamma.vercel.app/doctors/${id}`
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch doctor");
        setDoctor(data);
        fetchRelatedDoctors(data?.specialty.toLowerCase(), data?._id);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchRelatedDoctors = async (specialty, currentId) => {
      try {
        const res = await fetch(
          `https://doctor-appointment-backend-gamma.vercel.app/doctors/bySpecialty/${specialty}`
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch doctors");
        const normalized = data.filter(
          (doc) =>
            doc?._id !== currentId && doc.specialty.toLowerCase() === specialty
        );
        setRelatedDoctors(normalized);
      } catch (error) {
        console.error(error);
      }
    };

    fetchedDoctor();
  }, [id]);

  if (!doctor)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500 text-lg">
        Loading doctor details...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e0f7f8] to-[#ffffff] py-28 px-6">
      {/* ===== Doctor Card ===== */}
      <div className="bg-white rounded-3xl shadow-2xl p-10 flex flex-col md:flex-row items-center max-w-5xl mx-auto mb-16 transition-all duration-300 hover:shadow-[#2cbcc04d]">
        <img
          src={doctor?.image}
          alt={doctor.name}
          className="w-64 h-64 rounded-full object-cover border-4 border-[#2cbcc0] shadow-md hover:scale-105 transition-transform duration-300"
        />

        <div className="flex-1 space-y-4 text-center md:text-left md:ml-12 mt-6 md:mt-0">
          <h2 className="text-4xl font-extrabold text-[#008e9b]">
            {doctor.name}
          </h2>
          <p className="text-2xl text-gray-700 font-semibold">
            {doctor.specialty}
          </p>
          <p className="text-gray-600 text-lg">
            {doctor.experienceYears} Years of Experience
          </p>
          <p className="text-gray-700 leading-relaxed text-md md:max-w-md mx-auto md:mx-0">
            {doctor.description}
          </p>

          <div className="flex justify-center md:justify-start mt-6">
            <button
              onClick={() => navigate("/add-appointment")}
              className="bg-[#2cbcc0] text-white px-8 py-3 rounded-lg font-semibold tracking-wide shadow-md hover:bg-[#22a3a7] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>

      {/* ===== Related Doctors Section ===== */}
      {relatedDoctors.length > 0 && (
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-[#008e9b] mb-8">
            Related Doctors
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {relatedDoctors.map((doc) => (
              <div
                key={doc._id}
                className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-[#2cbcc04d] transition-all duration-300 hover:-translate-y-1"
              >
                <img
                  src={`http://localhost:5000/uploads/${doc.image}`}
                  alt={doc.name}
                  className="w-28 h-28 mx-auto rounded-full object-cover border-2 border-[#2cbcc0] mb-4"
                />
                <h4 className="text-xl font-semibold text-[#008e9b]">
                  {doc.name}
                </h4>
                <p className="text-gray-600">{doc.specialty}</p>
                <p className="text-sm text-gray-500">
                  {doc.experienceYears} Years of Experience
                </p>
                <Link
                  to={`/doctor/${doc._id}`}
                  className="inline-block mt-4 bg-[#2cbcc0] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#22a3a7] transition-all duration-300"
                >
                  View Profile
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DoctorDetails;
