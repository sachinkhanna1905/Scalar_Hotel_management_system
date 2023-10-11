import React  from "react";
import ButtonForm from "../../UI/buttonForm";
const BookingSlot = (props) => {
  const handleClick = ()=>{
    const data = {
      mobilenumber:props.mobilenumber,
      Date:props.Date,
      toHour:props.toTime
    }
    props.BookingHandler(data);
  }
  return (
    <li onClick={handleClick}>
      <ButtonForm
        className={`flex items-center flex-col justify-center m-auto my-2 py-1 w-[100%] rounded-xl bg-green-800 `}
        type="button"
        buttonContent={
          <>
            <div className="text-[1.5rem] text-white font-medium">
              {props.toTime}
            </div>
            <div className="flex items-center justify-center">
              <span className="text-[1em] text-white font-normal">{props.fromTime}</span>
            </div>
          </>
        }
      />
    </li>
  );
};

export default BookingSlot;
