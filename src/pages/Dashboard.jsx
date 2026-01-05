import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import {
  Calendar,
  Users,
  Building2,
  Activity,
  PlusCircle,
  Settings,
  UserPlus,
  Stethoscope,
  Clock,
  ArrowRight,
  User,
  Loader2
} from "lucide-react";
import { toast } from "react-toastify";

function Dashboard() {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    doctors: 0,
    users: 0,
    appointments: 0,
    departments: 0
  });
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        if (user?.role === "admin") {
          // Fetch Real Admin Stats independently (so one failure doesn't break all)
          const results = await Promise.allSettled([
            fetch(`${import.meta.env.VITE_API_URL}/doctors/count`).then(res => res.json()),
            fetch(`${import.meta.env.VITE_API_URL}/users/count`).then(res => res.json()),
            fetch(`${import.meta.env.VITE_API_URL}/appointments/count`).then(res => res.json()),
            fetch(`${import.meta.env.VITE_API_URL}/departments/count`).then(res => res.json())
          ]);

          const [docRes, userRes, appRes, depRes] = results;

          setStats({
            doctors: docRes.status === "fulfilled" ? (docRes.value.count || 0) : 0,
            users: userRes.status === "fulfilled" ? (userRes.value.count || 0) : 0,
            appointments: appRes.status === "fulfilled" ? (appRes.value.count || 0) : 0,
            departments: depRes.status === "fulfilled" ? (depRes.value.count || 0) : 0
          });

        } else {
          // Fetch User Appointments
          const res = await fetch(
            `${import.meta.env.VITE_API_URL}/appointments/myAppointments`,
            { headers }
          );
          if (res.ok) {
              const data = await res.json();
              if (Array.isArray(data)) {
                  setAppointments(data);
              }
          }
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-12 h-12 text-[#2cbcc0] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0fdfd] to-white pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-[#008e9b]">
            Welcome, {user?.name}!
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Here is your daily activity overview.
          </p>
        </div>

        {/* ADMIN DASHBOARD */}
        {user?.role === "admin" ? (
          <div>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <StatCard
                icon={<Activity size={32} />}
                label="Total Appointments"
                value={stats.appointments}
                color="bg-blue-500"
              />
              <StatCard
                icon={<Users size={32} />}
                label="Registered Patients"
                value={stats.users}
                color="bg-green-500"
              />
              <StatCard
                icon={<Stethoscope size={32} />}
                label="Total Doctors"
                value={stats.doctors}
                color="bg-purple-500"
              />
              <StatCard
                icon={<Building2 size={32} />}
                label="Departments"
                value={stats.departments}
                color="bg-orange-500"
              />
            </div>

            {/* Admin Quick Actions */}
            <div>
                 <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <Settings className="text-[#008e9b]" /> Admin Quick Actions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <QuickAction 
                        to="/add-doctor" 
                        icon={<UserPlus size={24} />} 
                        label="Add New Doctor" 
                        desc="Register a new specialist"
                        color="bg-gradient-to-r from-blue-500 to-blue-400"
                    />
                    <QuickAction 
                        to="/add-department" 
                        icon={<PlusCircle size={24} />} 
                        label="Add Department" 
                        desc="Create a new medical unit"
                        color="bg-gradient-to-r from-teal-500 to-teal-400"
                    />
                    <QuickAction 
                        to="/allDoctors" 
                        icon={<Users size={24} />} 
                        label="Manage Doctors" 
                        desc="View and delete doctors"
                        color="bg-gradient-to-r from-purple-500 to-purple-400"
                    />
                    <QuickAction 
                        to="/all-departments" 
                        icon={<Building2 size={24} />} 
                        label="Manage Departments" 
                        desc="View and delete departments"
                        color="bg-gradient-to-r from-orange-500 to-orange-400"
                    />
                </div>
            </div>
          </div>
        ) : (
          /* USER DASHBOARD */
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Upcoming Appointments Card */}
              <div className="col-span-2 bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <Calendar className="text-[#008e9b]" /> Your Appointments
                </h2>
                
                {!appointments.length ? (
                     <div className="flex flex-col items-center justify-center py-10 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                        <Calendar size={48} className="text-gray-300 mb-4" />
                        <p className="text-gray-500 mb-6">You have no upcoming appointments.</p>
                        <Link to="/allDoctors" className="bg-[#008e9b] text-white px-6 py-3 rounded-full font-bold shadow-lg hover:bg-[#2cbcc0] transition-all">
                            Book Now
                        </Link>
                    </div>
                ) : (
                     <div className="space-y-4">
                        {appointments.map((app) => (
                            <div key={app._id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-6 hover:shadow-md transition-all">
                                <div className="relative">
                                     <img src={app.doctor?.image || "https://cdn-icons-png.flaticon.com/512/3774/3774299.png"} alt="Doctor" className="w-16 h-16 rounded-full object-cover border border-gray-200" />
                                </div>
                                <div className="flex-1 text-center sm:text-left">
                                     <h3 className="font-bold text-lg text-gray-800">{app.doctor?.name}</h3>
                                     <p className="text-sm text-[#008e9b] font-medium">{app.doctor?.specialty}</p>
                                     <div className="flex items-center justify-center sm:justify-start gap-4 mt-2 text-gray-500 text-xs">
                                        <span className="flex items-center gap-1"><Calendar size={12}/> {new Date(app.date).toLocaleDateString()}</span>
                                        <span className="flex items-center gap-1"><Clock size={12}/> {app.time}</span>
                                     </div>
                                </div>
                                <div className="px-4 py-1.5 bg-green-100 text-green-700 text-xs font-bold rounded-lg uppercase tracking-wide">
                                    Confirmed
                                </div>
                            </div>
                        ))}
                     </div>
                )}
              </div>

               {/* Quick Info & Actions */}
               <div className="space-y-6">
                    <div className="bg-gradient-to-br from-[#008e9b] to-[#2cbcc0] p-8 rounded-3xl shadow-xl text-white text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -mr-10 -mt-10 blur-xl"></div>
                         <div className="w-20 h-20 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center backdrop-blur-sm border-2 border-white/20">
                            <User className="w-10 h-10 text-white" />
                         </div>
                         <h3 className="text-xl font-bold">{user?.name}</h3>
                         <p className="text-blue-50 text-sm mb-6 opacity-90">{user?.email}</p>
                         
                         <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                            <span className="block text-3xl font-bold">{appointments.length}</span>
                            <span className="text-xs uppercase tracking-widest opacity-80">Total Bookings</span>
                         </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                        <h3 className="font-bold text-gray-800 mb-4">Quick Links</h3>
                        <div className="space-y-3">
                             <Link to="/allDoctors" className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-[#e0f7f8] hover:text-[#008e9b] transition-all group">
                                <span className="font-medium text-gray-700 group-hover:text-[#008e9b]">Find a Doctor</span>
                                <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity"/>
                             </Link>
                             <Link to="/profile" className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-[#e0f7f8] hover:text-[#008e9b] transition-all group">
                                <span className="font-medium text-gray-700 group-hover:text-[#008e9b]">Update Profile</span>
                                <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity"/>
                             </Link>
                        </div>
                    </div>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper Components
const StatCard = ({ icon, label, value, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex items-center gap-4 hover:-translate-y-1 transition-transform duration-300">
    <div className={`p-4 rounded-xl text-white ${color} shadow-md`}>
      {icon}
    </div>
    <div>
      <p className="text-gray-500 text-sm font-medium">{label}</p>
      <h3 className="text-3xl font-bold text-gray-800">{value}</h3>
    </div>
  </div>
);

const QuickAction = ({ to, icon, label, desc, color }) => (
    <Link to={to} className="group relative overflow-hidden bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex items-start gap-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className={`p-3 rounded-xl text-white shadow-sm ${color} group-hover:scale-110 transition-transform`}>
            {icon}
        </div>
        <div>
            <h3 className="font-bold text-gray-800 text-lg group-hover:text-[#008e9b] transition-colors">{label}</h3>
            <p className="text-sm text-gray-500">{desc}</p>
        </div>
    </Link>
);

export default Dashboard;
