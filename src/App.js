import React from "react";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Header from "./Components/Header/Header";
import Imageoverlay from "./Components/ImageOverlay/Imageoverlay";
import Appnavigation from "./Utils/Appnavigation";
import { AuthProvider } from "./Utils/Context/AuthContext";
import { useGlobalContext } from "./Utils/Context/Context";

const App = () => {
  const { isImageLitebox } = useGlobalContext();

  return (
    <AuthProvider>
    <div className="App">
      <Header></Header>
      <Appnavigation></Appnavigation>
      {isImageLitebox ? <Imageoverlay></Imageoverlay> : ""}
      <ToastContainer></ToastContainer>
    </div></AuthProvider>
  );
};

export default App;
