import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Landing = () => {
  const navigate = useNavigate();
  const token = Cookies.get("token");

  useEffect(() => {
    if (token) {
      navigate("/dashboard"); // Redirect to Dashboard if logged in
    }
  }, [token, navigate]);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-gray-100 to-gray-300">
      {/* Navbar */}
      <div className="flex justify-between items-center px-6 py-4 bg-white shadow-lg rounded-b-lg">
        <div className="flex items-center space-x-1">
          <h1 className="text-2xl font-bold text-green-600">Pay</h1>
          <h1 className="text-2xl font-bold text-blue-700">App</h1>
        </div>
        <div className="flex space-x-4">
          <button 
            onClick={() => navigate("/signin")} 
            className="bg-green-500 text-white px-5 py-2 rounded-md shadow-md hover:bg-green-600 hover:scale-105 transition-all duration-300">
            Sign In
          </button>
          <button 
            onClick={() => navigate("/signup")} 
            className="bg-blue-500 text-white px-5 py-2 rounded-md shadow-md hover:bg-blue-600 hover:scale-105 transition-all duration-300">
            Sign Up
          </button>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="flex flex-col items-center justify-center flex-grow px-4">
        <div className="bg-white shadow-2xl p-8 rounded-xl w-[90%] md:w-[60%] lg:w-[50%] text-center hover:shadow-lg transition-all duration-300">
          <h2 className="text-5xl font-bold text-blue-700">Welcome to PayApp</h2>
          <p className="text-lg mt-4 text-gray-600">
            A secure and seamless way to manage your transactions.
          </p>
        </div>

        {/* Features Section */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-[90%] md:w-[80%]">
          <div className="bg-green-100 shadow-md p-6 rounded-xl flex items-center space-x-4 hover:shadow-lg hover:scale-105 transition-all duration-300">
            <span className="text-green-600 text-3xl">💸</span>
            <p className="text-gray-800 text-lg">Instant money transfers</p>
          </div>
          <div className="bg-blue-100 shadow-lg p-6 rounded-xl flex items-center space-x-4 hover:shadow-lg hover:scale-105 transition-all duration-300">
            <span className="text-blue-600 text-3xl">🔒</span>
            <p className="text-gray-800 text-lg">Secure and encrypted transactions</p>
          </div>
          <div className="bg-yellow-100 shadow-xl p-6 rounded-xl flex items-center space-x-4 hover:shadow-lg hover:scale-105 transition-all duration-300">
            <span className="text-yellow-600 text-3xl">📊</span>
            <p className="text-gray-800 text-lg">Real-time expense tracking</p>
          </div>
          <div className="bg-red-100 shadow-md p-6 rounded-xl flex items-center space-x-4 hover:shadow-lg hover:scale-105 transition-all duration-300">
            <span className="text-red-600 text-3xl">🕘</span>
            <p className="text-gray-800 text-lg">24/7 customer support</p>
          </div>
          <div className="bg-purple-100 shadow-md p-6 rounded-xl flex items-center space-x-4 hover:shadow-lg hover:scale-105 transition-all duration-300">
            <span className="text-purple-600 text-3xl">📱</span>
            <p className="text-gray-800 text-lg">Mobile-friendly experience</p>
          </div>
          <div className="bg-teal-100 shadow-md p-6 rounded-xl flex items-center space-x-4 hover:shadow-lg hover:scale-105 transition-all duration-300">
            <span className="text-teal-600 text-3xl">🌎</span>
            <p className="text-gray-800 text-lg">Global transactions support</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12">
          <button 
            onClick={() => navigate("/signup")} 
            className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-3 rounded-lg shadow-lg hover:scale-110 transition-all duration-300">
            Get Started Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
