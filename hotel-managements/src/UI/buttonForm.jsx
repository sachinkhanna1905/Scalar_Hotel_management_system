import React from "react";
const ButtonForm = (props) => {
  const classesButton = `${props.className}`;
  return (
    <button
      type={props.type}
      onClick={props.onClick}
      className={classesButton}
      disabled={props.disabled}
      onMouseOver={props.onMouseOver}
      onMouseOut={props.onMouseOut}
    >
      {props.buttonContent}
    </button>
  );
};

export default ButtonForm;
