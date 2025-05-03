import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Heading from "../components/Heading";
import axios from "axios";
import Cookies from "js-cookie";
import InputBox from "../components/InputBox";

const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("id"); // Get the recipient's ID from URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (!userId) return;

    const fetchUserDetails = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) {
          setError("Unauthorized access. Please login.");
          return;
        }

        const response = await axios.get(
          `http://localhost:3000/api/v1/user/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data.success) {
          setUser(response.data.user);
        } else {
          setError("User not found.");
        }
      } catch (err) {
        setError("Error fetching user details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const handleSendMoney = async () => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        alert("Unauthorized access. Please login.");
        return;
      }

      const response = await axios.post(
        "http://localhost:3000/api/v1/account/transferMoney",
        {
          amount: amount,
          ReciverId: userId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.message === "transfer successful") {
        alert("Transfer Successful!");
        setAmount(""); // Reset input after transfer
      } else {
        alert("Transfer Failed: " + response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-600 to-indigo-400">
      <div className="shadow-lg p-8 w-96 bg-white rounded-lg flex flex-col items-center text-center space-y-6">
        <div className="flex items-center justify-center space-x-2 mb-6">
          <Heading title="Send Money" style="text-2xl font-bold text-black" />
          <span>
            <i className="fa-solid fa-circle-check bg-green-500 text-white p-2 rounded-full"></i>
          </span>
        </div>

        {/* User info display */}
        <div className="flex flex-col items-center justify-center mb-6 space-y-3">
          {/* User Avatar */}
          <div className="w-16 h-16 flex items-center justify-center bg-indigo-500 text-white text-2xl font-semibold rounded-full shadow-lg">
            {user.firstName?.[0]?.toUpperCase()}
          </div>

          {/* User Name */}
          <div className="text-center">
            <Heading
              title={`${user.firstName} ${user.lastName}`}
              style="text-lg font-semibold text-gray-800"
            />
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        {/* Money Input */}
        <InputBox
          type="text"
          placeholder="Enter amount"
          name="amount"
          value={amount}
          onChange={handleAmountChange}
          title="Amount"
        />

        {/* Send Button */}
        <button
          onClick={handleSendMoney}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-500 transition duration-300"
        >
          Send Money
        </button>
      </div>
    </div>
  );
};

export default SendMoney;
