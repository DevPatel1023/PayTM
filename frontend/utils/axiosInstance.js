import axios from "axios";
import Cookies from "js-cookie"; // Import js-cookie

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

// Add token to every request if available from cookies
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token"); // Get the token from cookies
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
