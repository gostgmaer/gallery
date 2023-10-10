"use client";
import { get, getsingle, patch } from "@/lib/network/http";
import InvokeAPI from "@/lib/network/invokeapi/invokeapi";
import { deletekeys } from "@/utils/custom/functions";
import React, { useContext, useState, useEffect } from "react";
const AppContext = React.createContext(null);

const AppProvider = ({ children }) => {

  const [id, setId] = useState(undefined);
  const [isSidebar, setisSidebar] = useState(false);
  const [isImageLitebox, setIsImageLitebox] = useState(false);
  const [lightboxData, setLightboxData] = useState(null);
  const [keyword, setkeyword] = useState("nature");
  const [imageIndex, setimageIndex] = useState(0);
  const [indexPage, setIndexPage] = useState(1);
  const [orientation, setOrientation] = useState("");
  const [images, setImages] = useState(null);
  const [image, setImage] = useState(null);
  const [color, setColor] = useState(null);
  const [perpage, setPerpage] = useState(12);
  const [realted, setRealted] = useState(null);
  const [expand, setExpand] = useState(true);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onclickOpenImageLightBox = (id) => {
  
    // setLightboxData(Data.sampleData.find((data) => data.ID === id));
    setIsImageLitebox(true);
    
  };

  const SearchImages = async () => {
    let imagesParam = {
      page: indexPage?indexPage:1,
      per_page: perpage?perpage:20,
      query: keyword?keyword:'nature',
      order_by: order,
      color: color,
      orientation: orientation,
      content_filter: "",
      collections: "",
    };
    let query = deletekeys(imagesParam);
    const res = await InvokeAPI(`search/photos`, "get", "", "", imagesParam);
    setImages(res);
    
  };

  const getImages = async () => {
    let imagesParam = {
      page: indexPage,
      per_page: 20,
      order_by: "",
    };
    let query = deletekeys({ ...imagesParam })
    const res = await InvokeAPI(`photos`, "get", "", "", query);
    setImages(res);
  };

  useEffect(() => {
    SearchImages();
  }, [indexPage, keyword, orientation, color, order, perpage]);


  const openimage = () => {
  
    setIsImageLitebox(true);
    
  };
  const closeimage = () => {
    setIsImageLitebox(false);
  };

  const openSidebar = () => {
    setisSidebar(true);
  };
  const closeSidebar = () => {
    setisSidebar(false);
  };




  return (
    <AppContext.Provider
      value={{
     
       
        id,
        setId,
        isModalOpen,
        openModal,
        closeModal,
        openSidebar,
        closeSidebar,
        isImageLitebox,
        setIsImageLitebox,
        setLightboxData,
        lightboxData,
        perpage,
        expand,
        setExpand,
        isSidebar,
        setisSidebar,
        images,
        orientation,
        setOrientation,
        error,
        setError,
        setkeyword,
        color,
        setColor,
        onclickOpenImageLightBox,
        openimage,
        closeimage,
        realted,
        setRealted,
        setPerpage,
        image,
        setImage,
        indexPage,
        keyword,
        setIndexPage,
        imageIndex,
        setimageIndex
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
