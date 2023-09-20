// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDvERN_Vif53pY2u29eu5c-1NC4V2eqOBk",
  authDomain: "registration-b540d.firebaseapp.com",
  databaseURL: "https://registration-b540d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "registration-b540d",
  storageBucket: "registration-b540d.appspot.com",
  messagingSenderId: "608006951090",
  appId: "1:608006951090:web:ebc882b6c6fb9951c879ab",
  measurementId: "G-5QEMLPTK3B"
};
  
const app = initializeApp(firebaseConfig);
const Auth = getAuth(app)
const analytics = getAnalytics(app);
export default Auth