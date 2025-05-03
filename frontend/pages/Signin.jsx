import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import js-cookie
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomText from "../components/BottomText";

const SignIn = () => {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/login",
        {
          email: formValue.email,
          password: formValue.password,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Login successful:", response.data);
      
      // Store token in cookies instead of localStorage
      Cookies.set("token", response.data.token, { expires: 7, secure: true }); // 7 days expiry

      // Store user data in cookies (optional)
      Cookies.set("user", JSON.stringify(response.data.user), { expires: 7, secure: true });
      
      navigate("/Dashboard");
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
    }
  };

  const handleChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-500">
      <div className="shadow-md p-8 w-96 bg-white rounded-md flex flex-col items-center justify-center text-center">
        <Heading
          title="Sign in"
          style="text-4xl font-bold text-gray-800 tracking-tight"
        />
        <SubHeading subtitle="Enter your credentials to access your account" />

        <InputBox
          title="Email"
          type="email"
          name="email"
          placeholder="Joedoe123@gmail.com"
          value={formValue.email}
          onChange={handleChange}
        />

        <InputBox
          title="Password"
          type="password"
          name="password"
          placeholder="Joedoe123@"
          value={formValue.password}
          onChange={handleChange}
        />

        <Button text="Sign In" onClick={handleSubmit} />

        <BottomText text="Don't have an account?" to="/signup" title="sign up" />
      </div>
    </div>
  );
};

export default SignIn;
