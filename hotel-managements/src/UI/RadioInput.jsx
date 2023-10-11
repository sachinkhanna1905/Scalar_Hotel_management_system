import React from "react";
const RadioInput = (props) => {
  return (
    <div class="flex items-center mr-4">
      <input
        type="radio"
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        disabled={props.disabled}
        checked={props.checked}
        id={props.label.toLowerCase()}
        name="gender"
        required={props.required}
        class={`${
          props.disabled ? "cursor-not-allowed bg-zinc-100" : " "
        } w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500
         dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 
         dark:border-gray-600`}
      />
      <label
        htmlFor={props.label.toLowerCase()}
        class={`ml-4 text-[22px] font-medium text-gray-900 dark:text-gray-300 ${
          props.checked ? "text-zinc-600" : " "
        }`}
      >
        {props.label}
      </label>
    </div>
  );
};

export default RadioInput;
