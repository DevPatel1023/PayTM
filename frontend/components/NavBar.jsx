import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Navbar = () => {
  const navigate = useNavigate();
  const token = Cookies.get("token"); // Check if the user is logged in

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/signin"); // Redirect to Sign In
  };

  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center shadow-md">
      <h1 className="text-white text-2xl font-bold">MyApp</h1>
      <div>
        {token ? (
          <>
            <Link to="/dashboard" className="text-white px-4 hover:underline">
              Dashboard
            </Link>
            <button 
              onClick={handleLogout} 
              className="ml-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-all">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/signin" className="text-white px-4 hover:underline">
              Sign In
            </Link>
            <Link 
              to="/signup" 
              className="ml-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-all">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
