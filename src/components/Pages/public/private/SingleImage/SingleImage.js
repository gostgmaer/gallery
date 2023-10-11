import Modal from "@/components/global/modal/Modal";
import Imageoverlay from "@/components/parts/ImageOverlay/Imageoverlay";
import { useGlobalAppContext } from "@/context/context";
import InvokeAPI from "@/lib/network/invokeapi/invokeapi";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const SingleImage = () => {
  const {
    reqParam,
    setImageId,
    openModal,
    setRealted,
    image,
    setImage,
  } = useGlobalAppContext();

  const param = useSearchParams();

  const id = param.get("id");

  const getImage = async () => {
    const res = await InvokeAPI(`photos/${id}`, "get", "", "", reqParam);

    setImage(res);
  };
  const getRelated = async () => {
    const res = await InvokeAPI(
      `photos/${id}/related`,
      "get",
      "",
      "",
      reqParam
    );

    setRealted(res);
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
