// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlKLA8iXCdSB9PukyFRhBtnd2CerjfnJQ",
  authDomain: "shiningstore-57008.firebaseapp.com",
  projectId: "shiningstore-57008",
  storageBucket: "shiningstore-57008.appspot.com",
  messagingSenderId: "7445310582",
  appId: "1:7445310582:web:29a97de99f4fd12839c357",
  measurementId: "G-XWQHKFNYBW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
