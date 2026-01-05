import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { X, Calendar, Clock, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

function MyAppointment() {
  const { user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/appointments/myAppointments`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch appointments");
        }
        setAppointments(data);
      } catch (error) {
        console.error(error);
        setError(error.message);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const cancelAppointment = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/appointments/deleteAppointment/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to delete appointment");
      }
      setAppointments((prev) => prev.filter((a) => a._id !== id));
      toast.success("Appointment cancelled successfully");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen pt-20">
        <Loader2 className="w-12 h-12 text-[#2cbcc0] animate-spin" />
      </div>
    );

  return (
    <div className="min-h-screen pt-28 pb-20 bg-gradient-to-b from-[#f5ffff] to-white px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#008e9b] mb-4">
            My Appointments
          </h2>
          <p className="text-gray-600">
            Manage your upcoming scheduled visits and consultations.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6 text-center border border-red-200">
            {error}
          </div>
        )}

        <div className="space-y-6">
          {appointments.length === 0 && !loading ? (
            <div className="text-center py-16 bg-white rounded-3xl shadow-sm border border-gray-100">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                You have no upcoming appointments.
              </p>
            </div>
          ) : (
            appointments.map((app) => (
              <div
                key={app?._id}
                className="group flex flex-col md:flex-row items-center justify-between bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-transparent hover:border-[#2cbcc0]/20"
              >
                <div className="flex items-center gap-6 w-full md:w-auto">
                  <div className="relative">
                    <img
                      src={app?.doctor?.image}
                      className="w-20 h-20 rounded-full object-cover border-2 border-gray-100 shadow-sm"
                      alt={app.doctor?.name || "Doctor"}
                    />
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      {app.doctor?.name}
                    </h3>
                    <p className="text-[#008e9b] font-medium text-sm bg-[#e0f7f8] inline-block px-3 py-1 rounded-full mb-2">
                      {app.reason}
                    </p>

                    <div className="flex flex-wrap gap-4 text-gray-500 text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar size={16} className="text-[#2cbcc0]" />
                        {new Date(app?.date).toLocaleDateString(undefined, {
                          weekday: "short",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={16} className="text-[#2cbcc0]" />
                        {app?.time
                          ? new Date(
                              `1970-01-01T${app.time}`
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "Time N/A"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 md:mt-0 w-full md:w-auto flex justify-end">
                  <button
                    className="flex items-center gap-2 text-red-500 bg-red-50 hover:bg-red-100 px-5 py-2.5 rounded-xl transition-colors duration-300 font-medium"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to cancel this appointment?"
                        )
                      ) {
                        cancelAppointment(app?._id);
                      }
                    }}
                  >
                    <X size={18} />
                    <span>Cancel</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default MyAppointment;

