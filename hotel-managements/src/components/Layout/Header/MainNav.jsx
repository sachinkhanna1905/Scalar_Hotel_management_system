import React, { useState } from "react";
import { Link } from "react-router-dom";
import HeaderContainer from "./HeaderContainer";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import "./MainNavLink.css";
import Backdrop from "../../../UIElements/Backdrop";
import { ToastContainer } from 'react-toastify';

const MainNavigation = (props) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const openDrawerHandler = async () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  return (
    <>
      <ToastContainer/>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>

      <HeaderContainer>
        <button
          class="ml-2 inline-flex items-center p-2 w-10 h-10 justify-center text-md text-white rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          onClick={openDrawerHandler}
        >
          <svg
            class="w-6 h-6 text-white "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <Link to="/" class="flex items-center">
          <span class="ml-[1rem] sm:ml-[2rem] self-center text-2xl font-semibold whitespace-nowrap dark:text-white text-white">
            Hotem Managements
          </span>
        </Link>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </HeaderContainer>
    </>
  );
};

export default MainNavigation;
