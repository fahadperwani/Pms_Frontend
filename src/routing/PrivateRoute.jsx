import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const location = useLocation();

  console.log("Logged In: " + isLoggedIn);
  console.log(children);

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

export default PrivateRoute;
