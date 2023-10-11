import { useState } from "react";

const useInput = (validateInput) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [enteredNumber, setEnteredNumber] = useState("");

  const enteredInputIsValid = validateInput(enteredValue);
  const hasError = !enteredInputIsValid && isTouched;
  const enteredInputNumberIsValid = validateInput(enteredNumber);
  const hasNumberError = !enteredInputNumberIsValid && isTouched;

  const inputChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };
  const inputNumberChangeHandler = (event) => {
    const re = /^[0-9\b]+$/;
    if (event.target.value === "" || re.test(event.target.value)) {
      setEnteredNumber(event.target.value);
    }
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setEnteredNumber("");
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    numberValue: enteredNumber,
    hasError,
    hasNumberError,
    inputChangeHandler,
    inputBlurHandler,
    inputNumberChangeHandler,
    isValid: enteredInputIsValid,
    isNumberValid: enteredInputNumberIsValid,
    reset,
  };
};

export default useInput;
