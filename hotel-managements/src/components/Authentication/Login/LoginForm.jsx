import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useHttpClient } from "./../../../Hooks/http-hook";
import useInput from "./../../../Hooks/user-input";
import { toast } from "react-toastify";
import Card from "./../../../UI/Card";
import TextInput from "./../../../UI/InputForm";
import classes from "./LoginForm.module.css";
import ButtonForm from "./../../../UI/buttonForm";
import PasswordInput from "./../../../UI/PasswordInput";
import OTPForm from "../../OTP/OTPForm";
import AuthContex from "../../../Store/AuthContextProvider";
// import { ToastContainer } from "react-toastify";
const passwordValidate = (value) => value.trim().length >= 8;
const EmailValidate = (value) => value.includes("@");
const LoginForm = () => {
  const authCtx = useContext(AuthContex);
  const navigate = useNavigate();
  const [generated, setGenerated] = useState(false);
  const [generateData, setGeneratedData] = useState();
  const { isLoading: isOTPLoading, sendRequest: OTPsendRequest } =
    useHttpClient();
  const { isLoading: isPasswordLoading, sendRequest: passwordSendRequest } =
    useHttpClient();
  const {
    value: enteredEmailValue,
    hasError: emailHasError,
    inputChangeHandler: inputEmailHandler,
    inputBlurHandler: emailBlurHandler,
    isValid: enteredEmailIsValid,
    reset: emailInputReset,
  } = useInput(EmailValidate);
  const {
    value: enteredPasswordValue,
    hasError: passwordHasError,
    inputChangeHandler: inputPasswordHandler,
    inputBlurHandler: passwordBlurHandler,
    isValid: enteredPasswordIsValid,
    reset: passwordInputReset,
  } = useInput(passwordValidate);

  let formIsValid = enteredPasswordIsValid && enteredEmailIsValid;

  const handleError = (err) =>
    toast.error(err, {
      position: "top-right",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "top-right",
    });

  const loginFormSubmitHandler = async (event) => {
    event.preventDefault();
    const inputValue = {
      email: enteredEmailValue,
      password: enteredPasswordValue,
    };
    setGeneratedData(inputValue);
    if (enteredPasswordIsValid) {
      try {
        const data = await passwordSendRequest(
          "http://localhost:2020/api/hotelmanagements/auth/login",
          "POST",
          JSON.stringify({ ...inputValue }),
          {
            "Content-Type": "application/json",
          }
        );
        const { success, message } = data;
        if (success) {
          handleSuccess(message);
          authCtx.login(data.token);
          navigate("/hotelmanagement/roomdetail");
        } else {
          handleError(message);
        }
      } catch (err) {
        console.log(err.message);
        handleError(err);
      }
    } else {
      try {
        const data = await OTPsendRequest(
          `http://localhost:2020/api/hotelmanagements/auth/generateloginotp`,
          "POST",
          JSON.stringify({ ...inputValue }),
          {
            "Content-Type": "application/json",
          }
        );
        const { success, message } = data;
        if (success) {
          handleSuccess(message);
          setGenerated(true);
        } else {
          handleError(message);
          setGenerated(false);
        }
      } catch (error) {
        console.log(error);
        handleError(error.message);
        setGenerated(false);
      }
    }
    emailInputReset();
    passwordInputReset();
  };

  const resetData = () => {
    setGeneratedData({});
  };
  return (
    <>
      {/* <ToastContainer/> */}
      {!generated && (
        <Card
          className="max-w-[550px] rounded overflow-hidden mx-auto w-[350px] md:w-[400px]
          lg:w-[100%] bg-white"
        >
          <div className="flex flex-wrap w-[100%] relative mt-[1rem] shadow rounded-lg mx-auto">
            <div className="flex flex-col items-center justify-center w-[100%] mx-auto relative space-y-5">
              <div className="flex items-center my-[1rem]">
                <span className="text-[25px] font-medium">Login</span>
              </div>
              <div className="w-[100%]">
                <form
                  onSubmit={loginFormSubmitHandler}
                  className="flex flex-wrap items-center flex-col overflow-hidden justify-center
        relative w-[95%] bg-white space-y-6 mx-auto mb-4"
                >
                  <div
                    className={`mx-auto flex flex-col space-y-1 items-start w-[100%] ${
                      emailHasError ? classes.invalid : ""
                    }`}
                  >
                    <TextInput
                      label="Email"
                      input={{
                        type: "email",
                        name: "email",
                      }}
                      onChange={inputEmailHandler}
                      onBlur={emailBlurHandler}
                      value={enteredEmailValue}
                    />
                    {emailHasError && (
                      <span className="text-[12px] font-semibold text-red-500 ml-1">
                        Enter valid Email
                      </span>
                    )}
                  </div>
                  <div
                    className={`mx-auto flex flex-col space-y-1 items-start w-[100%] ${
                      passwordHasError ? classes.invalid : " "
                    }`}
                  >
                    <PasswordInput
                      label="Password"
                      onChange={inputPasswordHandler}
                      onBlur={passwordBlurHandler}
                      value={enteredPasswordValue}
                    />
                    {passwordHasError && (
                      <span className="text-[12px] font-semibold text-red-500 ml-1">
                        Password should greater than 8 digit
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col items-center justify-center mx-auto space-y-4 w-[90%]">
                    <ButtonForm
                      type="submit"
                      buttonContent={
                        isPasswordLoading ? (
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
                          "Login"
                        )
                      }
                      disabled={!formIsValid}
                      className={`${
                        formIsValid
                          ? "text-[20px] w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          : "text-[20px] cursor-not-allowed bg-slate-600  w-full text-white  hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800"
                      }`}
                    />
                    {/* <span className="w-[100%] border-[1px] border-solid border-black m-0 p-0"></span>
                    <ButtonForm
                      type="submit"
                      buttonContent={
                        isOTPLoading ? (
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
                          "Request OTP"
                        )
                      }
                      disabled={!enteredEmailIsValid}
                      className={`${
                        enteredEmailIsValid
                          ? "text-[20px] w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          : "cursor-not-allowed bg-slate-600 font-normal  rounded-md py-[.5rem] px-[2.6rem] text-white w-[100%] shadow-md text-[16px] leading-6 "
                      }`}
                    /> */}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Card>
      )}
      {generated && (
        <OTPForm
          data={generateData}
          routeUrl="verifyloginotp"
          resetData={resetData}
          route="puncturedukan"
          otpRoute="generateloginotp"
        />
      )}
    </>
  );
};

export default LoginForm;
