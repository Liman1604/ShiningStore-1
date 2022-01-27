import React, { useContext } from "react";
import Home from "./Home";
// import { useNavigate } from "react-router-dom";
import { userAuthContext } from "../contexts/UserAuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // let user = useUserAuth();
  const { user } = useContext(userAuthContext);
  if (!user) {
    return <Navigate to="/" />;
  }
  return <Home />;
};

export default ProtectedRoute;
