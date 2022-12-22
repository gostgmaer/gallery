import React, { useState } from "react";
import { MdDownload } from "react-icons/md";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../Utils/Context/Context";
import "./Images.scss";
const Images = ({ item }) => {
  const [showDetails, setShowDetails] = useState(false);

  const { openimage, closeimage } = useGlobalContext();
  const download = () => {
  
    window.open(item.links.download);
  };

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
              <img src={item.user.profile_image.large} alt={item.user.name} />{" "}
              <span>{item.user.name}</span>{" "}
            </div>
            <div className="action">
              <MdDownload onClick={download}></MdDownload>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Images;
