import React, { useEffect, useState } from "react";
import Card from "../../UI/Card";
import TextInput from "../../UI/InputForm";
import ButtonForm from "../../UI/buttonForm";
import UserBookingDetail from "./BookingList";
import EditBookingData from "./EditBookingList";
import { useHttpClient } from "../../Hooks/http-hook";
import { toast } from 'react-toastify';
const BookRooms = (props) => {
  const [isedit, setIsEdit] = useState(false);
  const editHandler = () => {
    setIsEdit(!isedit);
  };
  const [userData, setUserData] = useState([]);
  const { isLoading, error, sendRequest } = useHttpClient();
  const handleError = (err) =>
    toast.error(err, {
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
  return (
    <>
      {!isedit && !props.isPop && (
        <UserBookingDetail isLoading={isLoading} userData={userData} />
      )}
      {isedit && props.isPop && (
        <EditBookingData isLoading={isLoading} userData={userData}/>
      )}
    </>
  );
};

export default BookRooms;
