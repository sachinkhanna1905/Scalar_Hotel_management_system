// import React from "react";
// import classes from "./InputForm.module.css";

// const TextInput = (props) => {
//   const divClasses = `${classes["input-container"]} ${props.className}`;
//   const labelClasses = `${classes.filled}  ${props.className}`;
//   return (
//     <div className={divClasses}>
//       <input
//         {...props.input}
//         value={props.value}
//         onChange={props.onChange}
//         onBlur={props.onBlur}
//         id={props.label.toLowerCase()}
//         disabled={props.disabled}
//         defaultValue={props.defaultValue}
//       />
//       <label
//         htmlFor={props.label.toLowerCase()}
//         className={props.value && labelClasses}
//       >
//         {props.label}
//       </label>
//     </div>
//   );
// };
// export default TextInput;

import React from "react";
const TextInput = (props) => {
  return (
    <div className={` w-[95%] mx-auto text-star ${props.className}`}>
      <div className={`relative`}>
        <input
          {...props.input}
          value={props.value}
          onChange={props.onChange}
          onBlur={props.onBlur}
          disabled={props.disabled}
          defaultValue={props.defaultValue}
          id={props.label.toLowerCase()}
          placeholder=" "
          className={`${
            props.disabled ? "cursor-not-allowed bg-zinc-100" : " "
          } block px-2.5 pb-3 pt-5 w-full text-[17px] text-gray-900 bg-transparent rounded-lg border-[2px]   ${
            props.error
              ? "focus:border-red-600  border-red-600 dark:border-red-500 dark:focus:border-red-500"
              : "focus:border-green-600 dark:focus:border-green-500 border-blue-600 dark:border-blue-500"
          }  appearance-none dark:text-white focus:outline-none focus:ring-0 peer`}
        />
        <label
          htmlFor={props.label.toLowerCase()}
          className={`${
            props.disabled ? "cursor-not-allowed bg-zinc-100" : " "
          } absolute text-[16px] font-semibold mt-[2px] ${
            props.error
              ? "text-red-600 dark:text-red-500"
              : "text-green-600 dark:text-green-500"
          }  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1`}
        >
          {props.label}
        </label>
      </div>
      {props.error && (
        <p className="mt-1 text-xs font-semibold text-red-600 dark:text-red-400">
          {props.message}.
        </p>
      )}
    </div>
  );
};
export default TextInput;
