import React from "react";
import Routes from "./Routes/Routes";
import { AuthContexProvider } from "./Store/AuthContextProvider";
// import { ToastContainer } from "react-toastify";
const App = () => {
  return (
    <>
      <AuthContexProvider>
      <Routes />
      </AuthContexProvider>
    </>
  );
};

export default App;
