import React from "react";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Header from "./Components/Header/Header";
import Imageoverlay from "./Components/ImageOverlay/Imageoverlay";
import Appnavigation from "./Utils/Appnavigation";
import { useGlobalContext } from "./Utils/Context/Context";

const App = () => {
  const { isImageLitebox } = useGlobalContext();

  return (
    <div className="App">
      <Header></Header>
      <Appnavigation></Appnavigation>
      {isImageLitebox ? <Imageoverlay></Imageoverlay> : ""}
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default App;
