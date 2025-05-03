import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomText from "../components/BottomText";

const Signup = () => {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    firstName: "",
    lastName: "",
    phoneNo: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/register", formValue);

      if (response.data) {
      
        // Redirect to the dashboard
        navigate("/signin");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-500">
      <div className="shadow-md p-8 w-96 bg-white rounded-md flex flex-col items-center justify-center text-center">
        <Heading title="Sign Up" style="text-4xl font-bold text-gray-800 tracking-tight" />
        <SubHeading subtitle="Enter your information to create an account" />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <InputBox
          title="First Name"
          type="text"
          name="firstName"
          placeholder="John"
          value={formValue.firstName}
          onChange={handleChange}
        />
        <InputBox
          title="Last Name"
          type="text"
          name="lastName"
          placeholder="Doe"
          value={formValue.lastName}
          onChange={handleChange}
        />
        <InputBox
          title="Phone No"
          type="text"
          name="phoneNo"
          placeholder="9554212476"
          value={formValue.phoneNo}
          onChange={handleChange}
        />
        <InputBox
          title="Email"
          type="email"
          name="email"
          placeholder="johndoe@gmail.com"
          value={formValue.email}
          onChange={handleChange}
        />
        <InputBox
          title="Password"
          type="password"
          name="password"
          placeholder="********"
          value={formValue.password}
          onChange={handleChange}
        />
        <Button text="Sign up" onClick={handleSubmit} />
        <BottomText text="Already have an account?" to="/signin" title="sign in" />
      </div>
    </div>
  );
};

export default Signup;
