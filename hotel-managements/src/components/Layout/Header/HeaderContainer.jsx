import React from "react";
const HeaderContainer = (props) => {
  return (
    <header
      className="flex items-center  flex-wrap w-[100%] h-[3.8rem] box-border 
  fixed top-0 bg-neutral-700	left-0 z-50 border-solid border-#00000042 border-2"
    >
      {props.children}
    </header>
  );
};

export default HeaderContainer;
