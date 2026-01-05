import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../img/Frame 2.png";
import { AuthContext } from "../context/AuthContext";
import { Menu, X, LayoutDashboard, LogOut } from "lucide-react";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NavLink = ({ to, children, mobile = false }) => {
    const isActive = 
      to === "/" 
        ? location.pathname === "/" && location.hash === "" 
        : location.pathname === to || (to.startsWith("/#") && location.hash === to.substring(1));
    const isHome = location.pathname === "/";
    
    // Text Color Logic:
    // - Mobile: Always Gray/Teal
    // - Desktop Scrolled OR Not Home: Dark Gray/Teal
    // - Desktop Top & Home: White/Teal
    const textColor = mobile 
        ? (isActive ? "text-[#2cbcc0]" : "text-gray-600 hover:text-[#2cbcc0]")
        : (scrolled || !isHome 
            ? (isActive ? "text-[#2cbcc0]" : "text-gray-900 hover:text-[#2cbcc0]")
            : (isActive ? "text-[#2cbcc0]" : "text-white hover:text-[#2cbcc0]")
          );

    if (mobile) {
        return (
            <Link 
               to={to} 
               onClick={closeMenu}
               className={`text-xl font-semibold transition-colors duration-300 ${textColor}`}
            >
               {children}
            </Link>
        )
    }

    return (
       <li>
           <Link 
               to={to} 
               className={`relative font-bold text-base transition-colors duration-300 ${textColor}`}
           >
               {children}
               <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-[#2cbcc0] transition-all duration-300 group-hover:w-full ${isActive ? "w-full" : ""}`}></span>
           </Link>
       </li>
    )
  };

  const isHome = location.pathname === "/";
  /* 
     Navbar Background Logic:
     - Scrolled: White/Blur
     - Not Home (Inner Pages): White/Blur (Always visible)
     - Home & Top: Transparent (for Hero)
  */
  const navBackground = (scrolled || !isHome) ? "bg-white/90 backdrop-blur-md shadow-md py-3" : "bg-transparent py-5";

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${navBackground}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" onClick={closeMenu} className="flex-shrink-0">
          <img src={logo} alt="Logo" className="w-36 md:w-44 transition-all duration-300" />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 items-center">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/#about">About</NavLink>
          <NavLink to="/all-departments">Departments</NavLink>
          <NavLink to="/allDoctors">Doctors</NavLink>
          {user && user.role === "user" && (
            <NavLink to="/my-appointments">My Appointments</NavLink>
          )}
          {user && user.role === "admin" && (
            <NavLink to="/add-doctor">+ Doctor</NavLink>
          )}
        </ul>

        {/* Desktop Auth/Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
             {user ? (
                 <>
                    {/* Dashboard Button */}
                     <Link to="/dashboard" className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#008e9b] bg-[#e0f7f8] rounded-full hover:bg-[#2cbcc0] hover:text-white transition-all duration-300">
                         <LayoutDashboard size={18} />
                         Dashboard
                     </Link>

                     {/* Profile Avatar Link */}
                     {user.role === "user" && (
                         <Link to="/profile" className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-[#2cbcc0] transition-all">
                             <div className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden border border-gray-300 shadow-sm hover:shadow-md transition-shadow">
                                 <img src={user.image || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} alt="User" className="w-full h-full object-cover" />
                             </div>
                         </Link>
                     )}

                     {user.role === "admin" && (
                        <></>
                     )}

                     <button onClick={logout} className="p-2 text-gray-400 hover:text-red-500 transition-colors" title="Logout">
                         <LogOut size={20} />
                     </button>
                 </>
             ) : (
                <>
                    <Link to="/login" className="text-gray-600 font-semibold hover:text-[#2cbcc0] transition-colors">Login</Link>
                    <Link to="/register" className="bg-[#2cbcc0] text-white px-5 py-2.5 rounded-full font-semibold shadow-lg shadow-[#2cbcc0]/30 hover:shadow-[#2cbcc0]/50 hover:-translate-y-0.5 transition-all duration-300">
                        Book Now
                    </Link>
                </>
             )}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="md:hidden text-gray-700 hover:text-[#2cbcc0] transition-colors">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-xl transition-all duration-500 ease-in-out overflow-hidden ${menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="flex flex-col items-center space-y-6 py-10 px-6">
            <NavLink to="/" mobile>Home</NavLink>
            <NavLink to="/all-departments" mobile>Departments</NavLink>
            <NavLink to="/allDoctors" mobile>Doctors</NavLink>
            {user && user.role === "user" && (
                <NavLink to="/my-appointments" mobile>My Appointments</NavLink>
            )}
            {user && user.role === "admin" && (
                <NavLink to="/add-doctor" mobile>+ Doctor</NavLink>
            )}
            
            <div className="w-16 h-1 bg-gray-100 rounded-full"></div>

            {user ? (
                <>  
                     <Link to="/dashboard" onClick={closeMenu} className="flex items-center gap-2 w-full justify-center py-3 bg-[#e0f7f8] text-[#008e9b] rounded-xl font-bold">
                        <LayoutDashboard size={20} /> Dashboard
                     </Link>
                     
                     {user.role === "user" && (
                        <Link to="/profile" onClick={closeMenu} className="text-lg font-semibold text-gray-600 hover:text-[#2cbcc0]">My Profile</Link>
                     )}

                     <button onClick={() => { logout(); closeMenu(); }} className="flex items-center gap-2 text-red-500 font-semibold">
                        <LogOut size={20} /> Logout
                     </button>
                </>
            ) : (
                <div className="flex flex-col w-full gap-4">
                    <Link to="/login" onClick={closeMenu} className="w-full py-3 text-center border border-gray-200 rounded-xl font-bold text-gray-600">Login</Link>
                    <Link to="/register" onClick={closeMenu} className="w-full py-3 text-center bg-[#2cbcc0] text-white rounded-xl font-bold shadow-lg">Register</Link>
                </div>
            )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
