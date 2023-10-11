import React, { useCallback, useEffect, useState } from "react";
import { MdAdd, MdDownload, MdFavorite } from "react-icons/md";

import "./Images.scss";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useGlobalAppContext } from "@/context/context";
import Modal from "@/components/global/modal/Modal";

import Imageoverlay from "../ImageOverlay/Imageoverlay";
import InvokeAPI from "@/lib/network/invokeapi/invokeapi";
const Images = ({ item }) => {
  const {
    reqParam,
    setImageId,
    openModal,
    setRealted,

    image,
    setImage,
  } = useGlobalAppContext();
  const [showDetails, setShowDetails] = useState(true);

  const router = useRouter();
  const searchParams = useSearchParams();
  var pathname = usePathname();

  const createQueryString = useCallback(
    (obj) => {
      if (pathname === "/") {
        pathname = "";
      }

  
      const params = new URLSearchParams(searchParams);

      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          params.set(key, obj[key]);
        }
      }

      openModal()
      return params.toString();
    },
    [searchParams]
  );

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
    <div
      onMouseOver={() => setShowDetails(true)}
      onMouseOut={() => setShowDetails(false)}
      onClick={() =>
        router.push(
          pathname +
            "?" +
            createQueryString({
              id: item.id,
              slug: item.slug,
              alt_description: item.alt_description,
              auther: item.user.username,
              auther_id: item.user.id,
            })
        )
      }
      className="relative group overflow-hidden rounded-lg shadow-md transition-transform transform-gpu hover:scale-105 hover:z-50"
    >
      <div className="block w-full h-full">
        <Image
          src={item.urls.regular}
          alt={item.alt_description}
          width={320}
          height={220}
          className="object-cover h-auto"
        />
      </div>
      {showDetails && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center flex-col justify-between transition-opacity opacity-0 group-hover:opacity-100  w-full py-5 px-10">
          <div className="text-white flex justify-between items-end w-full ">
            <div className="flex items-center justify-end space-x-2  w-full ">
              <button className=" bg-gray-50 text-gray-600 px-1 py-1 rounded-sm">
                <MdFavorite className=" w-4 h-4" />
              </button>
              <button className="bg-gray-50 text-gray-600 px-1 py-1 rounded-sm">
                <MdAdd className=" w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="text-white flex justify-between items-end  w-full ">
            <div className="flex items-center space-x-2">
              <Image
                src={item?.user?.profile_image.large}
                alt={item.user.name}
                width={50}
                height={50}
                className="w-8 h-8 rounded-full"
              />
              <span className="font-semibold text-sm">{item?.user.name}</span>
            </div>
            <div className="mt-2">
              <button
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-300 ease-in-out"
                // onClick={() =>
                //   downloadFile(`${item?.links?.download}`, `${item?.id}.jpg`)
                // }
              >
                <MdDownload />
              </button>
            </div>
          </div>
        </div>
      )}
      <Modal>
        <Imageoverlay />
      </Modal>
    </div>
  );
};

export default Images;
