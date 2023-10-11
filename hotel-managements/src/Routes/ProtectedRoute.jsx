import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContex from "../Store/AuthContextProvider";
const ProtectedRoute = () => {
  const authCtx = useContext(AuthContex);
  if (!authCtx.user_id) {
    return <Navigate to="hotelmanagement/login" />;
  }
  return <Outlet />;
};
export default ProtectedRoute;
