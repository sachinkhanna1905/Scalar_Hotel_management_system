import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContex from "../Store/AuthContextProvider";
const RedirectRoute = () => {
  const authCtx = useContext(AuthContex);
  if (authCtx.user_id) {
    return <Navigate to="hotelmanagement/roomdetail" />;
  }
  return <Outlet />;
};
export default RedirectRoute;
