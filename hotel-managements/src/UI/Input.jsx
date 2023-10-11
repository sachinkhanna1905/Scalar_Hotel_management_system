import React from "react";
import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  const classesInput = `${classes.input} + ${props.className}`;
  return (
    <div className={classesInput}>
      <label htmlFor={props.label.toLowerCase()}>{props.label}</label>
      <input ref={ref} {...props.input} id={props.label.toLowerCase()} />
    </div>
  );
});

export default Input;
