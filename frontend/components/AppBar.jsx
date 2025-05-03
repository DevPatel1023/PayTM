import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const AppBar = () => {
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/signin"); // Redirect to Sign In
  };

  return (
    <div className="flex justify-between items-center px-4 py-3 shadow-md bg-white my-2">
      {/* Logo */}
      <div className="flex items-center space-x-1">
        <h1 className="text-2xl font-bold text-green-600">Pay</h1>
        <h1 className="text-2xl font-bold text-blue-700">App</h1>
      </div>

      {/* Right Section */}
      <div className="relative">
        {token ? (
          <div className="flex items-center space-x-2">
            <span className="text-md">Hello, User</span>
            {/* User Icon with Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center">
                <span className="text-gray-700 text-md">U</span>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-40">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    onClick={() => setIsDropdownOpen(false)}>
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Link to="/signin" className="text-blue-600 hover:underline">
              Sign In
            </Link>
            <Link
              to="/signup"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppBar;
