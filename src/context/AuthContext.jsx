import { jwtDecode } from "jwt-decode";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decode = jwtDecode(token);
        setUser(decode);
      } catch {
        localStorage.removeItem("token");
      }
    }
  }, []);

  const login = (token) => {
    try {
      localStorage.setItem("token", token);
      const decode = jwtDecode(token);
      setUser(decode);
      toast.success("Welcome back!");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      toast.error("Invalid token!");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    toast.info("Logging out...");
    setTimeout(() => navigate("/login"), 800);
  };

  const updateUser = (userData) => {
    setUser((prev) => ({ ...prev, ...userData }));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
