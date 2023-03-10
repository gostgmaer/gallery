import React, { useState, useEffect, useContext } from "react";
import InvokeAPI from "../Apicall";
// @ts-ignore
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isSidebar, setisSidebar] = useState(false);
  const [isImageLitebox, setIsImageLitebox] = useState(false);
  const [lightboxData, setLightboxData] = useState(null);
  const [keyword, setkeyword] = useState("nature");
  const [loading, setloading] = useState(true);
  const [imageIndex, setimageIndex] = useState(0);
  const [indexPage, setIndexPage] = useState(1);
  const [orientation, setOrientation] = useState("");
  const [imageId, setImageId] = useState("");
  const [images, setImages] = useState(null);
  const [image, setImage] = useState(null);
  const [color, setColor] = useState(null);
  const [realted, setRealted] = useState(null);
  const [expand, setExpand] = useState(true);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  const onclickOpenImageLightBox = (id) => {
    setloading(true);
    // setLightboxData(Data.sampleData.find((data) => data.ID === id));
    setIsImageLitebox(true);
    setloading(false);
  };

  const reqParam = {
    client_id: "i5Kt1JQq4jZRXZeB2oO8D3J8avpZ_Xgy3ShUlYFNHh4",
  };

  const SearchImages = async () => {
    let imagesParam = {
      page: indexPage,
      per_page: 28,
      query: keyword,
      order_by: order,
      color: color,
      orientation: orientation,
      content_filter: "",
      collections: "",
    };
    let query = { ...imagesParam, ...reqParam };
    Object.keys(query).forEach(
      (key) =>
        (query[key] === "" || query[key] == null || query[key] === undefined) &&
        delete query[key]
    );

    setloading(true);
    const res = await InvokeAPI(`search`, "get", "", "", query);

    setImages(res);
    setloading(false);
  };
  const getImages = async () => {
    let imagesParam = {
      page: indexPage,
      per_page: 20,
      order_by: "",
    };
    let query = { ...imagesParam, ...reqParam };
    Object.keys(query).forEach(
      (key) =>
        (query[key] === "" || query[key] == null || query[key] === undefined) &&
        delete query[key]
    );

    setloading(true);
    const res = await InvokeAPI(`photos`, "get", "", "", query);

    setImages(res);
    setloading(false);
  };

  useEffect(() => {
    SearchImages();
  }, [indexPage,keyword,orientation,color,order]);
  // useEffect(() => {

  //   SearchImages()
  // }, [indexPage,keyword]);

  const openimage = () => {
    setloading(true);
    setIsImageLitebox(true);
    setloading(false);
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

  const calculateDiscount = (original, sale) => {
    let onePercent = original / 100;
    let diff = original - sale;
    return (diff / onePercent).toFixed(1);
  };

  return (
    <AppContext.Provider
      value={{
        openSidebar,
        closeSidebar,
        isImageLitebox,
        setIsImageLitebox,
        setLightboxData,
        lightboxData,
        imageId,
        setImageId,
        expand,
        setExpand,
        isSidebar,
        setisSidebar,
        images,
        orientation,
        setOrientation,error, setError,
        setkeyword,color, setColor,
        calculateDiscount,
        onclickOpenImageLightBox,
        openimage,
        closeimage,
        realted,
        setRealted,

        loading,
        reqParam,
        image,
        setImage,

        indexPage,
        keyword,
        setIndexPage,

        imageIndex,
        setimageIndex,
        setloading,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
