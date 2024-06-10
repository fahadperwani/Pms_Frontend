import axios from "axios";
import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/actions";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "patient",
  });
  const [apiErrors, setApiErrors] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const dataToSend = {
      email: formData.email,
      password: formData.password,
      isDoctor: formData.userType == "doctor",
    };
    try {
      const response = await axios.post(
        "https://localhost:7062/api/user/login",
        dataToSend
      ); // Replace with your API endpoint
      const decode = jwtDecode(response.data);
      console.log(decode);
      setFormData({
        email: "",
        password: "",
        userType: "patient",
      });
      dispatch(login(response.data, decode));
      navigate("/");
      // Handle successful registration (e.g., redirect to login page)
    } catch (error) {
      console.log(error);
      setApiErrors(error.response?.data?.errors || "Registration failed."); // Assuming API returns error messages
    }
    console.log("Form submitted:", formData);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 items-center justify-center px-4">
      <div className="w-full max-w-md rounded-lg shadow-md bg-white py-12 px-8">
        <h1 className="text-2xl font-bold text-center mb-8">Login</h1>
        {apiErrors && <div className="mb-4 text-red-500">{apiErrors}</div>}
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="shadow-sm bg-gray-50 border border-gray-300 rounded-lg w-full py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="shadow-sm bg-gray-50 border border-gray-300 rounded-lg w-full py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {/* <div className="flex gap-2">
          <div className="flex items-center">
            <input
              type="radio"
              id="doctor"
              name="userType"
              value="doctor"
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              checked={formData.userType === "doctor"}
              onChange={handleChange}
            />
            <label htmlFor="doctor" className="ml-2 text-sm text-gray-700">
              Doctor
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="doctor"
              name="userType"
              value="patient"
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              checked={formData.userType === "patient"}
              onChange={handleChange}
            />
            <label htmlFor="doctor" className="ml-2 text-sm text-gray-700">
              Patient
            </label>
          </div>
        </div> */}

        {/* <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label htmlFor="remember" className="text-sm ml-2 text-gray-700">
              Remember me
            </label>
          </div>
          <a href="#" className="text-sm text-indigo-600 hover:underline">
            Forgot password?
          </a>
        </div> */}

        <button
          type="submit"
          className="block w-full px-4 py-2 text-center font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
          onClick={handleSubmit}
        >
          Login
        </button>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <Link to={"/register"} className="text-indigo-600 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
