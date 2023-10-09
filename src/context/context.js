"use client";

import { get, getsingle, patch } from "@/lib/http";
import React, { useContext, useState, useEffect } from "react";
const AppContext = React.createContext(null);

const AppProvider = ({ children }) => {
  const [loader, setLoader] = useState(false);
  const [currentData, setCurrentData] = useState(null);
  const [activeTab, setActiveTab] = useState("basic info");
  const [id, setId] = useState(undefined);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const loaderFalse = () => {
    setLoader(false);
  };
  const loaderTrue = () => {
    setLoader(true);
  };

  const fetchResumedata = async (id) => {
    loaderTrue();
    try {
      const data = await getsingle("/resume", {}, id); // Replace with your collection name
      setCurrentData(data);
      // setActiveTab(data.result.last_step)
      return data;
    } catch (error) {
      console.error("Error getting data:", error);
    }
    loaderFalse();
  };

  const updateResumeRecord = async (nav, body, id) => {
    loaderTrue();
    try {
      const response = await patch(`/resume`, body, id);
      setActiveTab(nav);
      console.log("Record updated successfully:", response);
    } catch (error) {
      console.error("Error updating record:", error);
    }
    loaderFalse();
  };

  return (
    <AppContext.Provider
      value={{
        loader,
        loaderFalse,
        loaderTrue,
        updateResumeRecord,
        id,
        setId,
        fetchResumedata,
        currentData,
        activeTab,
        setActiveTab,
        isModalOpen,
        openModal,
        closeModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalAppContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
