import React from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";
import Card from "./Card";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClick} />;
};

const ModalOverlay = (props) => {
  const modalClasses = `${classes.modal}  ${props.className}`;
  return (
    <Card>
      <div className={modalClasses}>{props.children}</div>
    </Card>
  );
};

const Modal = (props) => {
  const modalClasses = `${classes.modal} + ${props.className}`;
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        props.show && <Backdrop onClick={props.onClick} />,
        document.getElementById("backdrop")
      )}
      {ReactDOM.createPortal(
        props.show && (
          <ModalOverlay className={modalClasses}>{props.children}</ModalOverlay>
        ),
        document.getElementById("backdrop")
      )}
    </React.Fragment>
  );
};

export default Modal;
