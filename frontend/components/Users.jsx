import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Users = ({ searchTerm }) => {
  const [users, setUsers] = useState([]); // Stores all users
  const [filteredUsers, setFilteredUsers] = useState([]); // Stores filtered users
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getUserColor = (id) => {
    const colors = [
      "bg-red-400", "bg-blue-400", "bg-green-400", "bg-yellow-400",
      "bg-purple-400", "bg-pink-400", "bg-indigo-400", "bg-teal-400",
      "bg-orange-400", "bg-gray-400"
    ];
    
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  };
  

  // Function to fetch all users excluding the logged-in user
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = Cookies.get("token");

      if (!token) {
        setError("Please login to continue");
        return;
      }

      const response = await axios.get(
        "http://localhost:3000/api/v1/user/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setUsers(response.data.users); // Set all users initially
        setFilteredUsers(response.data.users); // Initially, show all users
        setError(null);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setError(error.response?.data?.msg || "Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  // Filter users based on search term
  const handleSearch = (query) => {
    if (!query || query.trim().length === 0) {
      setFilteredUsers(users); // Show all users if the search term is empty
    } else {
      const lowercasedQuery = query.toLowerCase();
      const filtered = users.filter(
        (user) =>
          user.firstName.toLowerCase().includes(lowercasedQuery) ||
          user.lastName.toLowerCase().includes(lowercasedQuery) ||
          user.email.toLowerCase().includes(lowercasedQuery) ||
          user.phoneNo.includes(lowercasedQuery)
      );
      setFilteredUsers(filtered); // Set the filtered users
    }
  };

  useEffect(() => {
    fetchUsers(); // Fetch users on component mount
  }, []);

  useEffect(() => {
    handleSearch(searchTerm); // Filter users whenever `searchTerm` changes
  }, [searchTerm]);

  return (
    <div className="mt-4">
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="space-y-4">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user._id}
                className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
              >
                <div className="flex items-center ">
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-full text-white ${getUserColor(
                      user._id
                    )}`}
                  >
                    {user.firstName?.[0]?.toUpperCase()}
                  </div>

                  <div className="ml-4">
                    <div className="font-medium">
                      {user.firstName} {user.lastName}
                    </div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                </div>
                <button
                  onClick={() =>
                    navigate(`/send?id=${user._id}&name=${user.firstName}`)
                  }
                  className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                >
                  Send Money
                </button>
              </div>
            ))
          ) : searchTerm.trim() ? (
            <div className="text-center text-gray-500">No users found</div>
          ) : (
            <div className="text-center text-gray-500">
              Start typing to search users
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Users;
