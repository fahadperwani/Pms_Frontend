import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";

function Navbar() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  console.log("isLoggedIn in navbar: " + isLoggedIn);
  return (
    <nav className="bg-gradient-to-r from-sky-500 to-indigo-500 shadow-md py-4 px-6 flex justify-between items-center">
      <h1 className="text-xl font-bold text-white">
        Patient Management System
      </h1>
      {isLoggedIn && (
        <ul className="flex space-x-4">
          <li>
            <a href="#" className="text-white hover:text-gray-200">
              Search for a Doctor
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-gray-200">
              Appointments
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-gray-200">
              Log Out
            </a>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
