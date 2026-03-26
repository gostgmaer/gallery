"use client";
import InvokeAPI from "@/lib/network/invokeapi/invokeapi";
import { deletekeys } from "@/utils/custom/functions";
import { ENDPOINTS } from "@/config/endpoints";
import React, { useContext, useState, useEffect, useCallback } from "react";

interface AppContextType {
  // State
  id: string | undefined;
  setId: React.Dispatch<React.SetStateAction<string | undefined>>;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  isImageLitebox: boolean;
  setIsImageLitebox: React.Dispatch<React.SetStateAction<boolean>>;
  lightboxData: any;
  setLightboxData: React.Dispatch<React.SetStateAction<any>>;
  perpage: number;
  expand: boolean;
  setExpand: React.Dispatch<React.SetStateAction<boolean>>;
  isSidebar: boolean;
  setIsSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  images: any;
  orientation: string;
  setOrientation: React.Dispatch<React.SetStateAction<string>>;
  error: Error | null;
  setError: React.Dispatch<React.SetStateAction<Error | null>>;
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  color: string | null;
  setColor: React.Dispatch<React.SetStateAction<string | null>>;
  onclickOpenImageLightBox: (id: string) => void;
  openimage: () => void;
  closeimage: () => void;
  related: any;
  setRelated: React.Dispatch<React.SetStateAction<any>>;
  setPerpage: React.Dispatch<React.SetStateAction<number>>;
  image: any;
  setImage: React.Dispatch<React.SetStateAction<any>>;
  indexPage: number;
  SearchImages: () => Promise<any>;
  setIndexPage: React.Dispatch<React.SetStateAction<number>>;
  imageIndex: number;
  setImageIndex: React.Dispatch<React.SetStateAction<number>>;
  reqParam: any;
  setReqParam: React.Dispatch<React.SetStateAction<any>>;
  imageId: string | undefined;
  setImageId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const AppContext = React.createContext<AppContextType | undefined>(undefined);

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [id, setId] = useState<string | undefined>(undefined);
  const [isSidebar, setIsSidebar] = useState(false);
  const [isImageLitebox, setIsImageLitebox] = useState(false);
  const [lightboxData, setLightboxData] = useState<any>(null);
  const [keyword, setKeyword] = useState("nature");
  const [imageIndex, setImageIndex] = useState(0);
  const [indexPage, setIndexPage] = useState(1);
  const [orientation, setOrientation] = useState("");
  const [images, setImages] = useState<any>(null);
  const [image, setImage] = useState<any>(null);
  const [color, setColor] = useState<string | null>(null);
  const [perpage, setPerpage] = useState(12);
  const [related, setRelated] = useState<any>(null);
  const [expand, setExpand] = useState(true);
  const [order, setOrder] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reqParam, setReqParam] = useState<any>(null);
  const [imageId, setImageId] = useState<string | undefined>(undefined);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  const onclickOpenImageLightBox = useCallback((id: string) => {
    setIsImageLitebox(true);
  }, []);

  const SearchImages = useCallback(async () => {
    const imagesParam = {
      page: indexPage,
      per_page: perpage,
      query: keyword || 'nature',
      order_by: order,
      color: color,
      orientation: orientation,
      content_filter: "",
      collections: "",
    };
    const query = deletekeys(imagesParam);
    const res = await InvokeAPI(ENDPOINTS.IMAGES.SEARCH_PHOTOS, "get", "", "", imagesParam);
    setImages(res);
    return res;
  }, [indexPage, perpage, keyword, order, color, orientation]);

  const getImages = useCallback(async () => {
    const imagesParam = {
      page: indexPage,
      per_page: 20,
      order_by: "",
    };
    const query = deletekeys(imagesParam);
    const res = await InvokeAPI(ENDPOINTS.IMAGES.PHOTOS, "get", "", "", query);
    setImages(res);
  }, [indexPage]);

  useEffect(() => {
    SearchImages();
  }, [SearchImages]);

  const openimage = useCallback(() => setIsImageLitebox(true), []);
  const closeimage = useCallback(() => setIsImageLitebox(false), []);

  const openSidebar = useCallback(() => setIsSidebar(true), []);
  const closeSidebar = useCallback(() => setIsSidebar(false), []);

  const contextValue: AppContextType = {
    id,
    setId,
    isModalOpen,
    openModal,
    closeModal,
    isImageLitebox,
    setIsImageLitebox,
    setLightboxData,
    lightboxData,
    perpage,
    expand,
    setExpand,
    isSidebar,
    setIsSidebar,
    images,
    orientation,
    setOrientation,
    error,
    setError,
    setKeyword,
    color,
    setColor,
    onclickOpenImageLightBox,
    openimage,
    closeimage,
    related,
    setRelated,
    setPerpage,
    image,
    setImage,
    indexPage,
    SearchImages,
    keyword,
    setIndexPage,
    imageIndex,
    setImageIndex,
    reqParam,
    setReqParam,
    imageId,
    setImageId,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useGlobalAppContext must be used within an AppProvider');
  }
  return context;
};

export { AppContext, AppProvider };
