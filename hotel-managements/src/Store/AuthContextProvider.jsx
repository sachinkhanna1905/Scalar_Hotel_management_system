import React, { useState } from "react";
import { getCurrentUser } from "../Middleware/middleware";
const AuthContex = React.createContext({
  token: "",
  login: (token) => {},
  logout: () => {},
  user_id: "",
});

export const AuthContexProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const loginHandler = (token) => {
    setToken(token);
    console.log(token, "token");
    localStorage.setItem("token", token);
  };
  const logoutHandler = () => {
    setToken("");
    localStorage.removeItem("token");
  };
  const contexValue = {
    token: token,
    login: loginHandler,
    logout: logoutHandler,
    user_id: token ? getCurrentUser(token).username : "",
  };
  return (
    <AuthContex.Provider value={contexValue}>
      {props.children}
    </AuthContex.Provider>
  );
};

export default AuthContex;
