import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCdKxBFS5voClSp4fY48mmBZGNtVAbVAsQ",
  authDomain: "react-authentication-a1795.firebaseapp.com",
  projectId: "react-authentication-a1795",
  storageBucket: "react-authentication-a1795.appspot.com",
  messagingSenderId: "384250351916",
  appId: "1:384250351916:web:5b10c50b023bbc6381dc89",
  measurementId: "G-4PJ36BF5ZF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
