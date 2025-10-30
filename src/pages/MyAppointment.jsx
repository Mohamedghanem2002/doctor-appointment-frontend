import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import { getMyAppointments, deleteAppointment } from "../api/api";

function MyAppointment() {
  const { user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);

  // Fetch user appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await getMyAppointments();
        setAppointments(res.data);
      } catch (error) {
        console.error(error);
        setError(
          error.response?.data?.message || "Failed to fetch appointments"
        );
        toast.error(
          error.response?.data?.message || "Failed to fetch appointments"
        );
      }
    };
    fetchAppointments();
  }, []);

  // Cancel an existing appointment
  const cancelAppointmentHandler = async (id) => {
    try {
      await deleteAppointment(id);
      setAppointments((prev) => prev.filter((app) => app._id !== id));
      toast.success("Appointment cancelled successfully");
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to cancel appointment"
      );
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen pt-40">
      <h2 className="text-3xl font-bold text-center mb-8 text-[#008e9b]">
        My Appointments
      </h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="space-y-6 max-w-3xl mx-auto">
        {appointments.length === 0 ? (
          <p className="text-center text-gray-500">No appointments found</p>
        ) : (
          appointments.map((app) => (
            <div
              key={app._id}
              className="flex items-center justify-between bg-white shadow p-4 rounded-lg hover:shadow-[#2cbcc04d] transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <img
                  src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${
                    app.doctor?.image
                  }`}
                  alt={app.doctor?.name}
                  className="w-20 h-20 rounded-full object-cover border"
                />
                <div>
                  <h3 className="text-xl font-semibold text-[#008e9b]">
                    {app.doctor?.name}
                  </h3>
                  <p className="text-gray-600">{app.reason}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(app.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <button
                className="text-red-500 hover:text-red-700 transition-colors"
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to cancel this appointment?"
                    )
                  ) {
                    cancelAppointmentHandler(app._id);
                  }
                }}
              >
                <X />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyAppointment;
