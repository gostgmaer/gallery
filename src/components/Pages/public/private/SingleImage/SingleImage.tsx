import { Dialog, DialogContent } from "@/components/ui";
import Imageoverlay from "@/components/parts/ImageOverlay/Imageoverlay";
import { useGlobalAppContext } from "@/context/context";
import InvokeAPI from "@/lib/network/invokeapi/invokeapi";
import { ENDPOINTS } from "@/config/endpoints";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const SingleImage = () => {
  const {
    reqParam,
    setRelated,
    image,
    setImage,
    isModalOpen,
    closeModal,
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
      <Dialog open={isModalOpen} onOpenChange={closeModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <Imageoverlay />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SingleImage;
