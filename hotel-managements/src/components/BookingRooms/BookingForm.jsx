import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useHttpClient } from "../../Hooks/http-hook";
import useInput from "../../Hooks/user-input";
import TextInput from "../../UI/InputForm";
import ButtonForm from "../../UI/buttonForm";
import { Link } from "react-router-dom";
const nameHasEmpty = (value) => value.trim() !== "";
const lastnameHasEmpty = (value) => value.trim() !== "";
const roomnameHasEmpty = (value) => value.trim() !== "";
const phoneNumberHasEmpty = (value) => value.trim().length === 10;
const amountHasEmpty = (value) => value.trim().length >= 2;
const emailValidate = (value) => value.includes("@");

const BookingForm = (props) => {
  var curr = new Date();
  curr.setDate(curr.getDate() + 1);
  var date = curr.toISOString().substring(0, 10);
  const [toDate, setToDate] = useState(date);
  const onToDateChange = (event) => {
    setToDate(event.target.value);
  };
  const [fromDate, setFromDate] = useState(date);
  const onFromDateChange = (event) => {
    setFromDate(event.target.value);
  };
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();

  // Ensure two-digit formatting
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  const currentTime24H = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  const [toHour, setToHour] = useState(currentTime24H);
  const onToTimeChange = (event) => {
    setToHour(event.target.value);
  };
  const [fromHour, setFromHour] = useState(currentTime24H);
  const onFromHourChange = (event) => {
    setFromHour(event.target.value);
  };
  const {
    value: enteredNameValue,
    hasError: nameHasError,
    inputChangeHandler: inputNameHandler,
    inputBlurHandler: nameBlurHandler,
    isValid: enteredNameIsValid,
    reset: nameInputReset,
  } = useInput(nameHasEmpty);
  const {
    value: enteredRoomNameValue,
    hasError: roomnameHasError,
    inputChangeHandler: inputRoomNameHandler,
    inputBlurHandler: roomnameBlurHandler,
    isValid: enteredRoomNameIsValid,
    reset: roomnameInputReset,
  } = useInput(roomnameHasEmpty);
  const {
    value: enteredLastNameValue,
    hasError: lastnameHasError,
    inputChangeHandler: inputLastNameHandler,
    inputBlurHandler: lastnameBlurHandler,
    isValid: enteredLastNameIsValid,
    reset: lastnameInputReset,
  } = useInput(lastnameHasEmpty);
  const {
    numberValue: enteredPhoneNumberValue,
    hasNumberError: phoneNumberHasError,
    inputNumberChangeHandler: inputPhoneNumberHandler,
    inputBlurHandler: phoneNumberBlurHandler,
    isNumberValid: enteredPhoneNumberIsValid,
    reset: phoneNumberInputReset,
  } = useInput(phoneNumberHasEmpty);
  const {
    numberValue: enteredAmountValue,
    hasNumberError: amountHasError,
    inputNumberChangeHandler: inputAmountHandler,
    inputBlurHandler: amountBlurHandler,
    isNumberValid: enteredAmountIsValid,
    reset: amountInputReset,
  } = useInput(amountHasEmpty);
  const {
    value: enteredEmailValue,
    hasError: emailHasError,
    inputChangeHandler: inputEmailHandler,
    inputBlurHandler: emailBlurHandler,
    isValid: enteredEmailIsValid,
    reset: emailInputReset,
  } = useInput(emailValidate);

  let formIsValid =
    enteredNameIsValid &&
    enteredPhoneNumberIsValid &&
    enteredEmailIsValid &&
    enteredLastNameIsValid &&
    enteredRoomNameIsValid &&
    enteredAmountIsValid;
  const handleError = (err) =>
    toast.error(err, {
      position: "top-right",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "top-right",
    });
  const navigate = useNavigate();
  const { isLoading, sendRequest } = useHttpClient();
  const queryFormSubmitHandler = async (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    const contactUsData = {
      firstname: enteredNameValue,
      lastname: enteredLastNameValue,
      roomname: enteredRoomNameValue,
      amount: enteredAmountValue,
      mobilenumber: enteredPhoneNumberValue,
      email: enteredEmailValue,
      toDate,
      fromDate,
      toHour,
      fromHour,
    };
    console.log(contactUsData);
    try {
      const data = await sendRequest(
        `http://localhost:2020/api/hotelmanagements/auth/booking`,
        "POST",
        JSON.stringify({ ...contactUsData }),
        {
          "Content-Type": "application/json",
        }
      );
      const { success, message } = data;
      console.log(data, "data");
      if (success) {
        handleSuccess(message);
        navigate("/hotelmanagement/timetable");
      } else {
        handleError(message);
      }
    } catch (err) {
      console.log(err.message);
      handleError(err);
    }
    nameInputReset();
    phoneNumberInputReset();
    emailInputReset();
    lastnameInputReset();
    roomnameInputReset();
  };
  const resetHandler = () => {
    nameInputReset();
    phoneNumberInputReset();
    emailInputReset();
    amountInputReset();
  };

  return (
    <form
      onSubmit={queryFormSubmitHandler}
      className=" flex flex-wrap items-center flex-col overflow-hidden justify-center
      relative w-[100%] bg-white space-y-10"
    >
      <TextInput
        label="First Name"
        input={{
          type: "text",
          name: "name",
          id: "name",
        }}
        value={enteredNameValue}
        onChange={inputNameHandler}
        onBlur={nameBlurHandler}
        error={nameHasError}
        success={!nameHasError}
        message="Enter First Name"
      />
      <TextInput
        label="Last Name"
        input={{
          type: "text",
          name: "name",
          id: "name",
        }}
        value={enteredLastNameValue}
        onChange={inputLastNameHandler}
        onBlur={lastnameBlurHandler}
        error={lastnameHasError}
        success={!lastnameHasError}
        message="Enter Last Name"
      />
      <TextInput
        label="Email"
        input={{
          type: "email",
          name: "email",
        }}
        onChange={inputEmailHandler}
        onBlur={emailBlurHandler}
        value={enteredEmailValue}
        error={emailHasError}
        success={!emailHasError}
        message="Enter valid Email"
      />

      <TextInput
        label="10 digit mobile no"
        input={{
          type: "text",
          name: "phone",
          maxLength: "10",
          id: "phone",
        }}
        value={enteredPhoneNumberValue}
        onChange={inputPhoneNumberHandler}
        onBlur={phoneNumberBlurHandler}
        error={phoneNumberHasError}
        success={!phoneNumberHasError}
        message="Enter valid Phone Number"
      />
      <TextInput
        label="Room Name"
        input={{
          type: "text",
          name: "name",
          id: "name",
        }}
        value={enteredRoomNameValue}
        onChange={inputRoomNameHandler}
        onBlur={roomnameBlurHandler}
        error={roomnameHasError}
        success={!roomnameHasError}
        message="Enter room Name"
      />
      <TextInput
        label="To Date"
        input={{
          type: "date",
          name: "To Date",
          id: "date",
        }}
        value={toDate}
        onChange={onToDateChange}
      />
      <TextInput
        label="From Date"
        input={{
          type: "date",
          name: "From Date",
          id: "date",
        }}
        value={fromDate}
        onChange={onFromDateChange}
      />
      <TextInput
        label="To Time"
        input={{
          type: "time",
          name: "To Time",
          step: 1,
          id: "time",
        }}
        value={toHour}
        onChange={onToTimeChange}
      />
      <TextInput
        label="From Time"
        input={{
          type: "time",
          name: " From Time",
          step: 1,
          id: "from Time",
        }}
        value={fromHour}
        onChange={onFromHourChange}
      />
      <TextInput
        label="Total Price"
        input={{
          type: "text",
          name: "phone",
          id: "price",
        }}
        value={enteredAmountValue}
        onChange={inputAmountHandler}
        onBlur={amountBlurHandler}
        error={amountHasError}
        success={!amountHasError}
        message="Enter valid Phone Number"
      />
      <div className="flex space-x-7 mt-[1rem]">
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
              "Submit"
            )
          }
          disabled={!formIsValid}
          className={`${
            formIsValid
              ? "text-[20px] w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              : "text-[20px] cursor-not-allowed bg-slate-600  w-full text-white  hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800"
          }`}
        />
        <ButtonForm
          onClick={resetHandler}
          type="button"
          buttonContent={<Link to="/hotelmanagement/timetable">Cancel</Link>}
          className="text-[20px] w-full text-white bg-red-700 hover:red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        />
      </div>
    </form>
  );
};

export default BookingForm;
