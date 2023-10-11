import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext } from "react";
import { useHttpClient } from "../../Hooks/http-hook";
import AuthContex from "../../Store/AuthContextProvider";
import ButtonForm from "../../UI/buttonForm";
const OTPForm = (props) => {
  const { isLoading, error, sendRequest } = useHttpClient();
  const { isLoading: isOTPLoading, sendRequest: OTPsendRequest } =
    useHttpClient();
  const [otp, setOtp] = useState("");
  const authCtx = useContext(AuthContex);
  const navigate = useNavigate();
  const handleError = (err) =>
    toast.error(err, {
      position: "top-right",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "top-right",
    });

  let isValid = otp.length === 6;
  const otpSubmitHandler = async (event) => {
    event.preventDefault();
    if (!isValid) {
      return;
    }
    try {
      const data = await sendRequest(
        `http://localhost:2020/api/hotelmanagements/auth//verifyloginotp`,
        "POST",
        JSON.stringify({
          code: otp,
          email: props.data.email,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      const { success, message } = data;
      console.log(data);
      if (success) {
        handleSuccess(message);
        authCtx.login(data.token);
        props.resetData();
        navigate(`/${props.route}`);
      } else {
        handleError(message);
      }
    } catch (err) {
      handleError(err.mesage);
      console.log(err.message);
    }
    setOtp("");
  };
  const resendOtpHandler = async () => {
    try {
      const data = await OTPsendRequest(
        `http://localhost:2020/api/hotelmanagements/auth/generateloginotp`,
        "POST",
        JSON.stringify({
          email: props.data.email,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
      handleError(error.message);
    }
  };
  return (
    <div className="max-w-[350px] w-[100%] h-auto flex flex-wrap shadow rounded m-auto mt-9">
      <div className="flex flex-col w-[100%] items-center space-y-5">
        <div className="flex flex-wrap items-center flex-col mt-[.9rem] px-4">
          <span className="text-[18px] font-normal">
            Please enter the OTP we have{" "}
          </span>
          <span>{props.data.mobilenumber || props.data.email}</span>
        </div>
        <div className="w-[100%]">
          <form
            onSubmit={otpSubmitHandler}
            className="flex flex-wrap items-center flex-col overflow-hidden justify-center
        relative w-[95%] bg-white  mx-auto mb-[1rem]"
          >
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              containerStyle={"my-[2rem] flex justify-center"}
              renderInput={(props) => (
                <input
                  {...props}
                  className="border-[1px] border-solid
                       border-slate-800 font-light mx-[.5rem] !w-[40px] h-[35px]"
                />
              )}
              inputType="string"
            />
            <div className="w-[90%] flex items-center mx-auto ">
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
                    "Verify"
                  )
                }
                disabled={!isValid}
                className={`${
                  isValid
                    ? "cursor-pointer hover:bg-[#9f2bec] border-solid border-2  border-[#9f5ccc]"
                    : "cursor-not-allowed bg-slate-600 "
                }  font-normal bg-[#9f5ccc]  rounded-md py-[.5rem] px-[2.6rem]
                   w-[100%] shadow-md text-[16px] leading-6 `}
              />
            </div>
          </form>
          <div className="w-[90%] flex ml-auto mx-auto text-blue-800 mb-[2rem]">
            <ButtonForm
              onClick={resendOtpHandler}
              type="submit"
              buttonContent={isOTPLoading ? "Sending..." : "Resend Otp"}
              className="ml-auto border-b-[1px] border-blue-800"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default OTPForm;
