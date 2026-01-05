import React from "react";
import { Link } from "react-router-dom";
import { Home, AlertCircle } from "lucide-react";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#f5ffff] to-white px-6 text-center">
      <div className="bg-red-50 p-6 rounded-full mb-8 animate-bounce">
        <AlertCircle className="w-16 h-16 text-red-500" />
      </div>
      
      <h1 className="text-6xl md:text-8xl font-extrabold text-[#008e9b] mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Page Not Found</h2>
      
      <p className="text-gray-600 text-lg max-w-md mb-10">
        Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>

      <Link 
        to="/" 
        className="flex items-center gap-2 bg-[#2cbcc0] text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-[#2cbcc0]/40 hover:-translate-y-1 transition-all duration-300"
      >
        <Home size={20} />
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
