import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { User, Mail, Phone, Save, Loader2, Camera } from "lucide-react";
import { toast } from "react-toastify";

function Profile() {
  const { user, updateUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    image: user?.image || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${import.meta.env.VITE_API_URL}/user/updateUser/${user.id || user._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(form)
        });

        const data = await res.json();

        if (!res.ok) {
            toast.error(data.message || "Failed to update profile");
            setLoading(false);
            return;
        }

        // Update local context
        updateUser(data.data || form); 
        toast.success("Profile updated successfully!");

    } catch (error) {
        console.error(error);
        toast.error("Something went wrong");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e0f7f8] to-white py-28 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-[2rem] shadow-2xl p-8 md:p-12 border border-[#2cbcc04d] relative overflow-hidden">
          
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#008e9b] mb-2">My Profile</h1>
            <p className="text-gray-500">Manage your personal information</p>
          </div>

          <div className="flex flex-col md:flex-row items-start gap-12">
            
            {/* Avatar Section */}
            <div className="w-full md:w-auto flex flex-col items-center">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#2cbcc0]/20 shadow-lg">
                  <img 
                    src={user?.image || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <button className="absolute bottom-0 right-0 p-2 bg-[#008e9b] text-white rounded-full shadow-md hover:bg-[#2cbcc0] transition-colors">
                  <Camera size={18} />
                </button>
              </div>
              <p className="mt-4 font-bold text-gray-800 text-lg">{user?.name}</p>
              <p className="text-sm text-gray-500 capitalize">{user?.role}</p>
            </div>

            {/* Form Section */}
            <form onSubmit={handleSubmit} className="flex-1 w-full space-y-6">
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-3.5 text-gray-400" size={20} />
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2cbcc0] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 text-gray-400" size={20} />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    disabled
                    className="w-full pl-12 pr-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-3.5 text-gray-400" size={20} />
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+1 234 567 890"
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2cbcc0] transition-all"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-[#2cbcc0] text-white py-4 rounded-xl font-bold shadow-lg hover:bg-[#22a3a7] hover:shadow-[#2cbcc0]/40 hover:-translate-y-1 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                  Save Changes
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
