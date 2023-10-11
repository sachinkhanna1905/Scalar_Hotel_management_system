// import React, { useState } from "react";
// import classes from "./InputForm.module.css";
// import ButtonForm from "./buttonForm";
// import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// const PasswordInput = (props) => {
//   const [showPassword, setShowPassword] = useState(false);
//   const divClasses = `${classes["input-container"]} ${props.className}`;
//   const labelClasses = `${classes.filled}  ${props.className}`;
//   const isShowPassword = () => {
//     setShowPassword(!showPassword);
//   };
//   return (
//     <div className={divClasses}>
//       <input
//         name="password"
//         type={`${showPassword ? "text" : "password"}`}
//         value={props.value}
//         onChange={props.onChange}
//         onBlur={props.onBlur}
//         id={props.label.toLowerCase()}
//       />
//       <label
//         htmlFor={props.label.toLowerCase()}
//         className={props.value && labelClasses}
//       >
//         {props.label}
//       </label>
//       <ButtonForm
//         className="absolute bottom-[27%] right-[5%]"
//         type="button"
//         onClick={isShowPassword}
//         buttonContent={
//           showPassword ? (
//             <FontAwesomeIcon icon={faEyeSlash} />
//           ) : (
//             <FontAwesomeIcon icon={faEye} />
//           )
//         }
//       />
//     </div>
//   );
// };
// export default PasswordInput;

import React, { useState } from "react";
import ButtonForm from "./buttonForm";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const PasswordInput = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const isShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className={` w-[95%] mx-auto`}>
      <div className={`relative`}>
        <input
          name="password"
          type={`${showPassword ? "text" : "password"}`}
          value={props.value}
          onChange={props.onChange}
          onBlur={props.onBlur}
          disabled={props.disabled}
          id={props.label.toLowerCase()}
          placeholder=" "
          className={` block px-2.5 pb-3 pt-5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-[2px]   ${
            props.error
              ? "focus:border-red-600  border-red-600 dark:border-red-500 dark:focus:border-red-500"
              : "focus:border-green-600 dark:focus:border-green-500 border-blue-600 dark:border-blue-500"
          }  appearance-none dark:text-white focus:outline-none focus:ring-0 peer`}
        />
        <label
          htmlFor={props.label.toLowerCase()}
          className={`absolute text-[16px] font-semibold ${
            props.error
              ? "text-red-600 dark:text-red-500"
              : "text-green-600 dark:text-blue-500"
          }  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1`}
        >
          {props.label}
        </label>
        <ButtonForm
          className="absolute bottom-[27%] right-[5%]"
          type="button"
          onClick={isShowPassword}
          buttonContent={
            showPassword ? (
              <FontAwesomeIcon icon={faEyeSlash} />
            ) : (
              <FontAwesomeIcon icon={faEye} />
            )
          }
        />
      </div>
      {props.error && (
        <span className="mt-1 text-xs font-semibold text-red-600 dark:text-red-400">
          {props.message}.
        </span>
      )}
    </div>
  );
};
export default PasswordInput;
