import React, { useEffect, useState } from "react";
import TextInput from "../../UI/InputForm";
// import RadioInput from "../../UI/RadioInput";
import { useHttpClient } from "../../Hooks/http-hook";
import { toast } from "react-toastify";
import LoadingSpinner from "../../UIElements/LoadingSpinner";
import ButtonForm from "../../UI/buttonForm";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
const UserBookingDetail = (props) => {
  // const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const { isLoading, error, sendRequest } = useHttpClient();
  const handleError = (err) =>
    toast.error(err, {
      position: "top-right",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "top-right",
    });
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await sendRequest(
          `http://localhost:2020/api/hotelmanagements/auth/userdetail`,
          "POST",
          JSON.stringify({
            mobilenumber: props.fetchUser.mobilenumber,
            toDate: props.fetchUser.Date,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        const { success, message, user } = data;
        console.log(data, "hello");
        if (success) {
          setUserData(user);
        } else {
          handleError(message);
        }
      } catch (err) {
        handleError(error);
      }
    };
    fetchUsers();
  }, [sendRequest]);

  const deleteHandler = async () => {
    try {
      const data = await sendRequest(
        "http://localhost:2020/api/hotelmanagements/auth/deleteBooking",
        "PUT",
        JSON.stringify({
          toHour: props.fetchUser.toHour,
          toDate: props.fetchUser.Date,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      const { success, message } = data;
      // console.log(data, "delete");
      if (success) {
        handleSuccess(message);
        props.BookingHandler();
      } else {
        handleError(message);
      }
    } catch (err) {
      handleError(err.message);
    }
  };

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && (
        <div className="space-y-6 flex flex-col flex-wrap mb-[2rem] ">
          <button
            onClick={props.BookingHandler}
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-[9.4%] left-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-black"
          >
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
          <div className="flex flex-wrap items-center justify-center mt-[2rem] md:mt-0">
            <span className="text-[30px] font-semibold">
              Personal Information
            </span>
            <div className="grid gid-cols-1 lg:grid-cols-2 gap-4 w-[90%] mx-auto mt-[2rem]">
              <TextInput
                label="FirstName"
                input={{
                  type: "text",
                  name: "firstname",
                  id: "firstname",
                }}
                defaultValue={userData.firstname}
                disabled="disabled"
                className="w-[100%] lg:w-[90%] my-[1rem]"
              />
              <TextInput
                label="LastName"
                input={{
                  type: "text",
                  name: "lastname",
                  id: "lastname",
                }}
                defaultValue={userData.lastname}
                disabled="disabled"
                className="w-[100%] lg:w-[90%] my-[1rem]"
              />
            </div>
          </div>
          {/* <div className="flex flex-col items-start ml-[2rem] space-y-4">
            <span className="block text-[23px] font-medium text-zinc-500">
              Your Gender
            </span>
            <div className="flex items-start space-x-2">
              <RadioInput
                label="Male"
                value="Male"
                checked={userData.gender === "Male" ? true : false}
                className="text-zinc-600"
                disabled="disabled"
              />
              <RadioInput
                label="Female"
                value="Female"
                checked={userData.gender === "Female" ? true : false}
                disabled="disabled"
              />
              <RadioInput
                label="Other"
                value="Other"
                checked={userData.gender === "Other" ? true : false}
                disabled="disabled"
              />
            </div>
          </div> */}
          <div className="flex flex-col items-start ml-[2rem] space-y-4">
            <span className="block text-[23px] font-medium text-zinc-500">
              Email Address
            </span>
            <div className="flex items-start w-[95%] md:w-[60%]">
              <TextInput
                label="Email"
                input={{
                  type: "email",
                  name: "email",
                  id: "email",
                }}
                defaultValue={userData.email}
                disabled="disabled"
              />
            </div>
          </div>
          <div className="flex flex-col items-start ml-[2rem] space-y-4">
            <span className="block text-[23px] font-medium text-zinc-500">
              Phone Number
            </span>
            <div className="flex items-start w-[95%] md:w-[60%]">
              <TextInput
                label="MobileNumber"
                input={{
                  type: "number",
                  name: "mobilenumber",
                  id: "mobilenumber",
                }}
                defaultValue={userData.mobilenumber}
                disabled="disabled"
              />
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center mt-[2rem] md:mt-0">
            <span className="text-[30px] font-semibold">
              Hotel Booking Detail
            </span>
            <div className="grid gid-cols-1 lg:grid-cols-2 gap-4 w-[90%] mx-auto mt-[2rem]">
              <TextInput
                label="Room Name"
                input={{
                  type: "text",
                  name: "roomName",
                  id: "roomName",
                }}
                defaultValue={userData.roomname}
                disabled="disabled"
                className="w-[100%] lg:w-[90%] my-[1rem]"
              />
            </div>
            <div className="grid gid-cols-1 lg:grid-cols-2 gap-4 w-[90%] mx-auto mt-[2rem]">
              <TextInput
                label="To Date"
                input={{
                  type: "date",
                  name: "toDate",
                  id: "toDate",
                }}
                defaultValue={userData.toDate}
                disabled="disabled"
                className="w-[100%] lg:w-[90%] my-[1rem]"
              />
              <TextInput
                label="From Date"
                input={{
                  type: "date",
                  name: "fromDate",
                  id: "fromDate",
                }}
                defaultValue={userData.fromDate}
                disabled="disabled"
                className="w-[100%] lg:w-[90%] my-[1rem]"
              />
            </div>
            <div className="grid gid-cols-1 lg:grid-cols-2 gap-4 w-[90%] mx-auto mt-[2rem]">
              <TextInput
                label="To Hour"
                input={{
                  type: "time",
                  name: "toDate",
                  id: "toDate",
                }}
                defaultValue={userData.toHour}
                disabled="disabled"
                className="w-[100%] lg:w-[90%] my-[1rem]"
              />
              <TextInput
                label="From Hour"
                input={{
                  type: "time",
                  name: "fromHour",
                  id: "fromHour",
                }}
                defaultValue={userData.fromHour}
                disabled="disabled"
                className="w-[100%] lg:w-[90%] my-[1rem]"
              />
            </div>
          </div>
          <div className="flex justify-center space-x-6 w-[95%] ">
            <ButtonForm
              onClick={deleteHandler}
              type="button"
              buttonContent="Delete Booking"
              className={`text-[20px] w-[50%] sm:w-[40%] md:w-[30%] text-white bg-red-700 hover:red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 ml-auto
               `}
            />
            <ButtonForm
              type="submit"
              buttonContent={
                <Link to="/hotelmanagement/edituser">Edit Booking Detail</Link>
              }
              className={`text-[20px] w-[50%] sm:w-[40%] md:w-[30%] text-white bg-green-700 hover:green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 ml-auto
               `}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default UserBookingDetail;
