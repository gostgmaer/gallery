import { useGlobalAppContext } from "@/context/context";
import { useState } from "react";

const Modal = ({ children }) => {
  const { isModalOpen, closeModal, lo } = useGlobalAppContext();

  if (!isModalOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div
        className="absolute w-full h-full bg-gray-900 opacity-50"
        onClick={closeModal}
      ></div>
      <div className="bg-white p-4 rounded-lg shadow-md z-50 text-black">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={closeModal}
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
