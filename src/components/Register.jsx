import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate, useNavigation } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "patient",
    specialization: "",
  });
  const [apiErrors, setApiErrors] = useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const dataToSend = {
      name: formData.name,
      password: formData.password,
      email: formData.email,
      isDoctor: formData.userType === "doctor",
    };

    if (dataToSend.isDoctor)
      dataToSend["specialization"] = formData.specialization;

    try {
      const response = await axios.post(
        "https://localhost:7062/api/user/register",
        dataToSend
      ); // Replace with your API endpoint
      console.log("Registration successful:", response.data);
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        userType: "patient",
        specialization: "",
      });
      setApiErrors(null);
      navigate("/login");
      // Handle successful registration (e.g., redirect to login page)
    } catch (error) {
      console.log(error);
      setApiErrors(error.response?.data?.errors || "Registration failed."); // Assuming API returns error messages
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 items-center justify-center px-4">
      <div className="w-full max-w-md rounded-lg shadow-md bg-white py-12 px-8">
        <h1 className="text-2xl font-bold text-center mb-8">Register</h1>

        <div className="mb-6">
          {apiErrors && <div className="mb-4 text-red-500">{apiErrors}</div>}

          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="shadow-sm bg-gray-50 border border-gray-300 rounded-lg w-full py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

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

        <div className="mb-6">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="shadow-sm bg-gray-50 border border-gray-300 rounded-lg w-full py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex gap-2">
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
              id="patient"
              name="userType"
              value="patient"
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              checked={formData.userType === "patient"}
              onChange={handleChange}
            />
            <label htmlFor="patient" className="ml-2 text-sm text-gray-700">
              Patient
            </label>
          </div>
        </div>

        {formData.userType === "doctor" && (
          <div className="mb-6">
            <label
              htmlFor="specialization"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Specialization
            </label>
            <input
              type="text"
              id="specialization"
              name="specialization"
              className="shadow-sm bg-gray-50 border border-gray-300 rounded-lg w-full py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={formData.specialization}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <button
          type="submit"
          className="block mt-2 w-full px-4 py-2 text-center font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
          onClick={handleSubmit}
        >
          Register
        </button>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link to={"/login"} className="text-indigo-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
