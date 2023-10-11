import React from "react";
import List from "./list";
import ButtonForm from "./../../UI/buttonForm";
import { Link } from "react-router-dom";
const RoomCard = (props) => {
  console.log(props);
  return (
    <div className="w-full max-w-sm m-3 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
        {props.roomName}
      </h5>
      <div className="flex items-baseline text-gray-900 dark:text-white">
        <span className="text-3xl font-semibold">₹</span>
        <span className="text-5xl font-extrabold tracking-tight">
          {props.price}
        </span>
        <span className="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">
          /hour
        </span>
      </div>
      <ul className="space-y-5 my-7">
        {props.features.map((data, index) => (
          <List name={data.name} key={index} />
        ))}
      </ul>
      <ButtonForm
        type="button"
        buttonContent={<Link to="/hotelmanagement/timetable">Choose plan</Link>}
        className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
      />
    </div>
  );
};

export default RoomCard;
