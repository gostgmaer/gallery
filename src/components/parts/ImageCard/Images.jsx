import React, { useState } from "react";
import { MdAdd, MdDownload, MdFavorite } from "react-icons/md";

import "./Images.scss";
import Image from "next/image";
import { useGlobalAppContext } from "@/context/context";
import Link from "next/link";
const Images = ({ item }) => {
  const [showDetails, setShowDetails] = useState(true);

  const { openimage, closeimage, downloadFile, DownloadImage } =
    useGlobalAppContext();

  // function download(url, filename) {
  //   fetch(url)
  //     .then(response => response.blob())
  //     .then(blob => {
  //       const link = document.createElement("a");
  //       link.href = URL.createObjectURL(blob);
  //       link.download = filename;
  //       link.click();
  //   })
  //   .catch(console.error);
  // }

  //console.log(item?.links.download,`${item?.alt_description.replace(/\s+/g, '-').toLowerCase()}.jpeg`);
  return (
    // <div
    //   onMouseOver={() => setShowDetails(true)}
    //   onMouseOut={() => setShowDetails(false)}
    //   className="Image-card"
    // >
    //   <Link to={`/image/${item.id}`} className="imageBlock">
    //     <img src={item.urls.regular} alt={item.alt_description} />
    //   </Link>
    //   <div className="userBlock">
    //     {showDetails ? (
    //       <div className="imageInfo">
    //         <div className="user">
    //           <img src={item?.user?.profile_image.large} alt={item.user.name} />{" "}
    //           <span>{item?.user.name}</span>{" "}
    //         </div>
    //         {/* <a href={`data:jpg/image,${item?.links?.download}`} target='_blank' rel="noreferrer" download={`${item?.alt_description}.jpg`}>Download Image</a> */}
    //         <div
    //           className="action"
    //           onClick={() =>
    //             downloadFile(`${item?.links?.download}`, `${item?.id}.jpg`)
    //           }
    //         >
    //           <MdDownload></MdDownload>
    //         </div>
    //       </div>
    //     ) : (
    //       ""
    //     )}
    //   </div>
    // </div>

    <div
      // onMouseOver={() => setShowDetails(true)}
      // onMouseOut={() => setShowDetails(false)}
      className="relative group overflow-hidden rounded-lg shadow-md transition-transform transform-gpu hover:scale-105 hover:z-50"
    >
      <Link href={`/image/${item.id}`} className="block w-full h-full">
        <Image
          src={item.urls.regular}
          alt={item.alt_description}
          width={320}
          height={220}
          className="object-cover h-auto"
        />
      </Link>
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
               <MdDownload/>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Images;
