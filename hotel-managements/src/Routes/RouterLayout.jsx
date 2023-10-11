import React from "react";
import { Outlet } from "react-router-dom";
import MainNavigation from "../components/Layout/Header/MainNav";

const RouterLayout = () => {
  return (
    <>
      <MainNavigation />
      <Outlet />
    </>
  );
};

export default RouterLayout;
