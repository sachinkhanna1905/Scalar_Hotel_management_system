import React, { useEffect, useState } from "react";
import BookingSlot from "./BookingSlot";
import UserBookingDetail from "../BookingList/BookingList";
import { useHttpClient } from "../../Hooks/http-hook";
import { toast } from "react-toastify";
import LoadingSpinner from "../../UIElements/LoadingSpinner";
import TextInput from "../../UI/InputForm";
import ButtonForm from "./../../UI/buttonForm";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { mapAction } from "../../Store/map-slice";

const BookingTable = () => {
  const dispatch = useDispatch();
  const [isPop, setPop] = useState(false);
  const [fetchUser, setFetchUser] = useState([
    { mobilenumber: "", toDate: "" },
  ]);
  const [timeSlot, setTimeSlot] = useState([]);
  const BookingHandler = (value) => {
    setPop(!isPop);
    setFetchUser(value);
    dispatch(
      mapAction.newValues({
        mobilenumber: value.mobilenumber,
        toDate: value.Date,
      })
    );
  };
  var curr = new Date();
  curr.setDate(curr.getDate() + 1);
  var date = curr.toISOString().substring(0, 10);
  const [toDate, setToDate] = useState(date);
  const onToDateChange = (event) => {
    setToDate(event.target.value);
  };
  const { isLoading, error, sendRequest } = useHttpClient();
  const handleError = (err) =>
    toast.error(err, {
      position: "top-right",
    });
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await sendRequest(
          `http://localhost:2020/api/hotelmanagements/auth/slotfinder`,
          "POST",
          JSON.stringify({ Date: toDate }),
          {
            "Content-Type": "application/json",
          }
        );
        const { success, message, slot } = data;
        console.log(slot, data);
        if (success) {
          setTimeSlot(slot);
        } else {
          handleError(message);
        }
      } catch (err) {
        handleError(error);
      }
    };
    fetchUsers();
  }, [sendRequest, toDate]);
  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && !isPop && (
        <div className="space-2 shadow mt-[2rem]">
          <h2 className="flex items-center justify-center text-[1rem] sm:text-[1.2rem] md:text-[3rem] text-black font-semibold">
            Booking Time Table for Room Name
          </h2>
          <div className="flex items-center justify-center mt-[2rem] m-auto w-[80%] sm:w-[50%] md:w-[30%]">
            <TextInput
              label="Date"
              input={{
                type: "date",
                name: "To Date",
                id: "date",
              }}
              value={toDate}
              onChange={onToDateChange}
            />
          </div>
          <div className="flex items-center justify-center">
            <ul className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 w-[90%] mx-auto mt-[2rem] ">
              {timeSlot.map((data, index) => (
                <BookingSlot
                  toTime={data.toHour}
                  fromTime={data.fromHour}
                  BookingHandler={BookingHandler}
                  Date={data.Date}
                  mobilenumber={data.mobilenumber}
                />
              ))}
            </ul>
          </div>
          <ButtonForm
            type="button"
            buttonContent={
              <Link to="/hotelmanagement/booking"> Book Slot</Link>
            }
            className="text-[20px] w-[60%] sm:w-[20%] ml-auto flex items-end justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          />
        </div>
      )}
      {!isLoading && isPop && (
        <UserBookingDetail
          BookingHandler={BookingHandler}
          fetchUser={fetchUser}
        />
      )}
    </>
  );
};

export default BookingTable;
