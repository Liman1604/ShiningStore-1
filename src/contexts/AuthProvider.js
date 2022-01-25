import axios from "axios";
import React, { createContext, useReducer } from "react";
import { toast } from "react-toastify";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const AuthContext = createContext();

const INIT_STATE = {
  currentUser: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_USER_FIREBASE":
      return { ...state, currentUser: action.payload };
    default:
      return state;
  }
};
const AdminProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  function functionRegisterWithCredentials(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.warn(user);
        dispatch({
          type: "LOGIN_USER_FIREBASE",
          payload: user,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

  const value = {
    functionRegisterWithCredentials,
    currentUser: state.currentUser,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export default AdminProvider;
