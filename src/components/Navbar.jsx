import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/actions";
import { Link } from "react-router-dom";

function Navbar() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  console.log("isLoggedIn in navbar: " + isLoggedIn);
  console.log("User in navbar: " + JSON.stringify(user));
  return (
    <nav className="bg-gradient-to-r from-sky-500 to-indigo-500 shadow-md py-4 px-6 flex justify-between items-center">
      <h1 className="text-xl font-bold text-white">
        Patient Management System
      </h1>
      {isLoggedIn && (
        <ul className="flex space-x-4">
          {user && user.Specialization == "" && (
            <li>
              <Link to={"/"} className="text-white hover:text-gray-200">
                Search for a Doctor
              </Link>
            </li>
          )}

          <li>
            <Link
              to={"/appointments"}
              className="text-white hover:text-gray-200"
            >
              Appointments
            </Link>
          </li>
          <li>
            <button
              className="text-white hover:text-gray-200"
              onClick={() => dispatch(logout())}
            >
              Logout
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
