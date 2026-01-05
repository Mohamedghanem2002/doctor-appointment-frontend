import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Loader2, CalendarCheck, Clock, Award } from "lucide-react";

function DoctorDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [relatedDoctors, setRelatedDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchedDoctor = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/doctors/${id}`
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch doctor");
        setDoctor(data);
        fetchRelatedDoctors(data?.specialty.toLowerCase(), data?._id);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchRelatedDoctors = async (specialty, currentId) => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/doctors/bySpecialty/${specialty}`
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

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen pt-20">
        <Loader2 className="w-12 h-12 text-[#2cbcc0] animate-spin" />
      </div>
    );

  if (!doctor)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500 text-lg">
        Doctor not found.
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e0f7f8] to-white py-28 px-4 md:px-8">
      {/* ===== Doctor Card ===== */}
      <div className="bg-white rounded-[2rem] shadow-2xl p-8 md:p-12 flex flex-col md:flex-row items-center max-w-6xl mx-auto mb-16 border border-white/50 backdrop-blur-sm relative overflow-hidden">
        {/* Decorative Background Blob */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#2cbcc0]/10 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>

        <div className="relative group">
          <div className="absolute inset-0 bg-[#2cbcc0] rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
          <img
            src={doctor?.image}
            alt={doctor.name}
            className="w-72 h-72 rounded-full object-cover border-[6px] border-white shadow-xl relative z-10"
          />
        </div>

        <div className="flex-1 space-y-6 text-center md:text-left md:ml-16 mt-8 md:mt-0 z-10">
          <div>
            <span className="bg-[#e0f7f8] text-[#008e9b] px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide mb-3 inline-block">
              {doctor.specialty}
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-2">
              {doctor.name}
            </h2>
            <div className="flex items-center justify-center md:justify-start gap-2 text-gray-500 font-medium">
              <Award className="w-5 h-5 text-[#2cbcc0]" />
              <span>{doctor.experienceYears} Years of Experience</span>
            </div>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
            {doctor.description}
          </p>

          <div className="flex justify-center md:justify-start pt-4">
            <button
              onClick={() =>
                navigate(`/add-appointment?doctorId=${doctor._id}`)
              }
              className="flex items-center gap-3 bg-gradient-to-r from-[#2cbcc0] to-[#22a3a7] text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-[#2cbcc0]/40 hover:-translate-y-1 transition-all duration-300"
            >
              <CalendarCheck className="w-6 h-6" />
              Book Appointment
            </button>
          </div>
        </div>
      </div>

      {/* ===== Related Doctors Section ===== */}
      {relatedDoctors.length > 0 && (
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px bg-gray-200 flex-1"></div>
            <h3 className="text-2xl font-bold text-gray-400 uppercase tracking-widest">
              Related Doctors
            </h3>
            <div className="h-px bg-gray-200 flex-1"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {relatedDoctors.map((doc) => (
              <div
                key={doc._id}
                className="group bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border border-transparent hover:border-[#2cbcc0]/20 text-center"
              >
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="w-full h-full rounded-full object-cover border-2 border-gray-100 group-hover:border-[#2cbcc0] transition-colors duration-300"
                  />
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-1">
                  {doc.name}
                </h4>
                <p className="text-[#008e9b] text-sm font-medium mb-4">
                  {doc.specialty}
                </p>

                <Link to={`/doctor/${doc._id}`} className="block w-full">
                  <button className="w-full bg-gray-50 text-gray-600 hover:bg-[#2cbcc0] hover:text-white py-2 rounded-lg text-sm font-semibold transition-all duration-300">
                    View Profile
                  </button>
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

