import React from "react";
const CardImageContainer = (props) => {
  return (
    <div className={`${props.className}`}>
      <div class="flex items-center justify-center w-[95%] mx-auto h-[95%]">
        <label
          htmlFor={props.label}
          class={` ${
            props.error
              ? "dark:border-red-600 dark:hover:border-red-500 dark:hover:bg-red-600 border-red-600"
              : " border-green-600 dark:border-green-600 dark:hover:border-green-500 dark:hover:bg-green-600"
          } flex flex-col items-center justify-center w-[100%] h-[200px] md:h-[250px] border-[2px] border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100`}
        >
          {props.image && (
            <div className="h-[100%] w-[100%] flex  items-center justify-center">
              <img
                src={props.image}
                className="h-[100%] w-[100%] rounded-lg"
                alt="pan_card"
              />
            </div>
          )}
          {!props.image && (
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span class="font-semibold">Click to upload</span>
                {props.name}
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF {props.name}
              </p>
            </div>
          )}
          <input
            onChange={props.onUpload}
            type="file"
            name="profile"
            id={props.label}
            className="hidden"
            onBlur={props.onUpload}
          />
        </label>
      </div>
      {props.error && (
        <p className="mt-1 text-xs ml-2 font-semibold text-red-600 dark:text-red-400">
          {props.message}.
        </p>
      )}
    </div>
  );
};

export default CardImageContainer;
