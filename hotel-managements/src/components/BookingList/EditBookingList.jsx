import React, { useEffect } from "react";
import TextInput from "../../UI/InputForm";
// import RadioInput from "../../../UI/RadioInput";
import ButtonForm from "../../UI/buttonForm";
import { useHttpClient } from "../../Hooks/http-hook";
import { toast } from "react-toastify";
import { useState } from "react";
import LoadingSpinner from "../../UIElements/LoadingSpinner";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const EditBookingData = () => {
  const navigate = useNavigate();
  const fetchUser = useSelector((state) => state.booking.values);
  const [userData, setUserData] = useState([]);
  const { isLoading: userIsLoading, sendRequest: userSendRequest } =
    useHttpClient();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await userSendRequest(
          `http://localhost:2020/api/hotelmanagements/auth/userdetail`,
          "POST",
          JSON.stringify({
            mobilenumber: fetchUser.mobilenumber,
            toDate: fetchUser.toDate,
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
        handleError(err);
      }
    };
    fetchUsers();
  }, [userSendRequest]);
  const { isLoading, sendRequest } = useHttpClient();
  const handleError = (err) =>
    toast.error(err, {
      position: "top-right",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "top-right",
    });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };
  const userDataUpdateHandler = async (event) => {
    try {
      event.preventDefault();
      const data = await sendRequest(
        "http://localhost:2020/api/hotelmanagements/auth/updateuser",
        "PUT",
        JSON.stringify({ ...userData }),
        {
          "Content-Type": "application/json",
        }
      );
      const { success, message } = data;
      console.log(data, "edit");
      if (success) {
        handleSuccess(message);
        navigate("/hotelmanagement/timetable");
      } else {
        handleError(message);
      }
    } catch (err) {
      handleError(err.message);
    }
  };
  return (
    <>
      {userIsLoading && <LoadingSpinner asOverlay />}
      {!userIsLoading && (
        <div className="space-y-6 flex flex-col flex-wrap mb-[2rem] ">
          <form
            onSubmit={userDataUpdateHandler}
            className="flex flex-wrap flex-col overflow-hidden
            relative w-[100%] bg-white space-y-6 mx-auto"
          >
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
                />
                <RadioInput
                  label="Female"
                  value="Female"
                  checked={userData.gender === "Female" ? true : false}
                  onChange={handleInputChange}
                />
                <RadioInput
                  label="Other"
                  value="Other"
                  checked={userData.gender === "Other" ? true : false}
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
                  className="w-[100%] lg:w-[90%] my-[1rem]"
                />
              </div>
            </div>
            <div className="flex justify-center  space-x-6 w-[95%] ">
              <ButtonForm
                type="submit"
                buttonContent={
                  <Link to="/hotelmanagement/timetable">Back</Link>
                }
                className={`text-[20px] w-[50%] sm:w-[40%] md:w-[30%] text-white bg-blue-700 hover:blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-auto
               `}
              />

              <ButtonForm
                type="submit"
                buttonContent={
                  isLoading ? (
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        class="inline w-5 h-5 mr-2 text-white animate-spin dark:text-gray-600 fill-blue-900"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span class=" text-white text-[15px] ml-[0.7rem]">
                        Loading...
                      </span>
                    </div>
                  ) : (
                    "Update"
                  )
                }
                className={`text-[20px] w-[50%] sm:w-[40%] md:w-[40%] text-white bg-green-700 hover:green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800
                   `}
              />
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default EditBookingData;
