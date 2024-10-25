import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateComponent = () => {
  // const auth = localStorage.getItem("users");
  const auth = Cookies.get("user");
 return auth ? <Outlet /> : <Navigate to="/signup" />;
};

export default PrivateComponent;
