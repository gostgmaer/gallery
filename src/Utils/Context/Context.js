import React, { useState, useEffect, useContext } from "react";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isSidebar, setisSidebar] = useState(false);
  const [isImageLitebox, setIsImageLitebox] = useState(false);
  const [lightboxData, setLightboxData] = useState(null);
  const [keyword, setkeyword] = useState("");
  const [loading, setloading] = useState(true);
  const [imageIndex, setimageIndex] = useState(0);
  const [indexPage, setIndexPage] = useState(1);

  const onclickOpenImageLightBox = (id) => {
    setloading(true);
    // setLightboxData(Data.sampleData.find((data) => data.ID === id));
    setIsImageLitebox(true);
    setloading(false);
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
        isSidebar,
        setisSidebar,
        setkeyword,
        calculateDiscount,
        onclickOpenImageLightBox,

        loading,

        indexPage,
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
