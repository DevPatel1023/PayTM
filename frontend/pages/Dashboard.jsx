import { useEffect, useState } from "react";
import AppBar from "../components/AppBar";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import Users from "../components/Users";
import axios from "axios";
import Cookies from "js-cookie";


const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [balance,setBalance] = useState("");
  const [error, setError] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };


  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) {
          setError("Unauthorized access. Please login.");
          return;
        }

        const result = await axios.get("http://localhost:3000/api/v1/account/getBalance", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setBalance(result.data.balance); // Ensure you are extracting `balance` correctly
      } catch (err) {
        setError("Failed to fetch balance. Check server connection.");
        console.error("Error fetching balance:", err);
      }
    };

    fetchBalance();
  }, []);
  
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navigation Bar */}
      <AppBar />

      <div className="max-w-4xl mx-auto p-6">
        {/* Balance Section */}
        <div className="bg-white shadow-lg rounded-xl p-6 flex justify-between items-center hover:shadow-2xl transition-all duration-300">
          <Heading title="Your Balance" style="text-3xl font-semibold text-blue-700" />
          <span className="text-2xl font-bold text-green-600"><i class="fa fa-inr"></i> {balance}</span>
        </div>

        {/* Search Section */}
        <div className="mt-8">
          <Heading title="Search Users" style="text-xl font-medium text-gray-700 mb-4" />
          <div className="relative">
            <InputBox  
              type="text"
              placeholder="Search users by name, email..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-4 py-3 rounded-lg shadow-md bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
            />
          </div>
        </div>

        {/* Users List */}
        <div className="mt-6 bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition-all duration-300">
          <Users searchTerm={searchTerm} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
