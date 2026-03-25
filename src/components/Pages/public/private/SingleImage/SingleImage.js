import Modal from "@/components/global/modal/Modal";
import Imageoverlay from "@/components/parts/ImageOverlay/Imageoverlay";
import { useGlobalAppContext } from "@/context/context";
import InvokeAPI from "@/lib/network/invokeapi/invokeapi";
import { ENDPOINTS } from "@/config/endpoints";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const SingleImage = () => {
  const {
    reqParam,
    setImageId,
    openModal,
    setRelated,
    image,
    setImage,
  } = useGlobalAppContext();

  const param = useSearchParams();

  const id = param.get("id");

  const getImage = async () => {
    const endpoint = ENDPOINTS.IMAGES.SINGLE_PHOTO.replace(':id', id);
    const res = await InvokeAPI(endpoint, "get", "", "", reqParam);

    setImage(res);
  };
  const getRelated = async () => {
    const endpoint = ENDPOINTS.IMAGES.RELATED.replace(':id', id);
    const res = await InvokeAPI(
      endpoint,
      "get",
      "",
      "",
      reqParam
    );

    setRelated(res);
  };

  useEffect(() => {
    getImage();
    getRelated();
  }, [id]);

  return (
    <div className="SingleImage">
      <Modal>
        <Imageoverlay />
      </Modal>
    </div>
  );
};

export default SingleImage;
