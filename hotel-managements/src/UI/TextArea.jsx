import React from "react";
import classes from "./TextArea.module.css";
const TextArea = (props) => {
  const divClasses = `${classes["input-container"]} + ${props.className}`;
  const labelClasses = `${classes.filled} + ${props.className}`;
  return (
    <div className={divClasses}>
      <textarea
        // rows="10"
        {...props.input}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        id={props.label.toLowerCase()}
      />
      <label
        htmlFor={props.label.toLowerCase()}
        className={props.value && labelClasses}
      >
        {props.label}
      </label>
    </div>
  );
};

export default TextArea;
