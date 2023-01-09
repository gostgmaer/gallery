import React, { useState } from "react";
import { MdDownload } from "react-icons/md";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../Utils/Context/Context";
import "./Images.scss";
const Images = ({ item }) => {
  const [showDetails, setShowDetails] = useState(false);

  const { openimage, closeimage,downloadFile,DownloadImage } = useGlobalContext();

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
    <div
      onMouseOver={() => setShowDetails(true)}
      onMouseOut={() => setShowDetails(false)}
      className="Image-card">
      <Link to={`/image/${item.id}`} className="imageBlock">
        <img
          src={item.urls.regular}
         
          alt={item.alt_description}
        />
      </Link>
      <div className="userBlock">
        {showDetails ? (
          <div className="imageInfo">
            <div className="user">
              <img src={item?.user?.profile_image.large} alt={item.user.name} />{" "}
              <span>{item?.user.name}</span>{" "}
            </div>
            {/* <a href={`data:jpg/image,${item?.links?.download}`} target='_blank' rel="noreferrer" download={`${item?.alt_description}.jpg`}>Download Image</a> */}
            <div className="action" onClick={()=>downloadFile(`${item?.links?.download}`,`${item?.id}.jpg`)}>
            <MdDownload ></MdDownload>
          </div>
          </div>
        ) : (
          ''
        )
      }
      </div>
    </div>
  );
};

export default Images;
