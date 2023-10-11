import React from "react";
import { NavLink } from "react-router-dom";
const HeaderNavLinks = (props) => {
  var str = props.name.replace(/\s+/g, "");
  return (
    <li className="p-0 list-none relative mt-2 mr-[1rem] mb-0 ml-0">
      <NavLink
        className="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
        to={`hotelmanagement/${str.toLowerCase()}`}
      >
        {props.name}
      </NavLink>
    </li>
  );
};

export default HeaderNavLinks;
