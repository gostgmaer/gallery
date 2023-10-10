import moment from "moment";
import React, { useState } from "react";
import {
  MdArrowRight,
  MdCalendarToday,
  MdCamera,
  MdClose,
  MdCloseFullscreen,
  MdFavorite,
  MdFullscreen,
  MdInfo,
  MdOutlineArrowLeft,
  MdShare,
  MdShield,
} from "react-icons/md";
import { Bars } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { Data } from "../../Assets/StaticData/Data";
import { useGlobalContext } from "../../Utils/Context/Context";
import Filter from "../Filter";
import Images from "../ImageCard/Images";
import ItemsMenu from "../MenuItem";
import "./Imageoverlay.scss";

const Imageoverlay = () => {
  // let ImageData = image;
  const {
    isImageLitebox,
    setIsImageLitebox,
    imageIndex,
    setimageIndex,
    loading,
    setloading,
    setLightboxData,
    openimage,
    reqParam,DownloadImage,
    setImageId,
    realted,
    setRealted, setkeyword,
    image,
    setImage,
    closeimage,
    lightboxData,
    expand,
    setExpand,
  } = useGlobalContext();
  const [openTab, setopenTab] = useState(false);

  const handleClick = (e) => {
    setIsImageLitebox(!isImageLitebox);
  };
  // setImage(image);

  const imgSty = {
    objectFit: "cover",
  };

  const ContentHeader = () => {
    return (
      <div className="contentHeaderWrapper">
        <div className="headerLeft">
          <img src={image?.user?.profile_image.large} alt="" />
          <div className="userName">
            <div>{image?.user.name}</div>
            <small>{image?.user.username}</small>
          </div>
        </div>
        <div className="headerRight">
          <div className="favorite">
            <MdFavorite></MdFavorite>
          </div>
          <div className="download">
            <button
              onClick={() => {
                DownloadImage(`${image?.links?.download}`,`${image?.alt_description}.jpg`)
              }}
              className="btn">

              Download Image
            </button>
          </div>
        </div>
      </div>
    );
  };
  const ContentImage = () => {
    return (
      <div className="image">
        <img
          style={expand ? {} : { objectFit: "cover" }}
          src={image?.urls.regular}
          alt=""
        />
        <div className="icon">
          {expand ? (
            <MdFullscreen onClick={() => setExpand(!expand)}></MdFullscreen>
          ) : (
            <MdCloseFullscreen
              onClick={() => setExpand(!expand)}></MdCloseFullscreen>
          )}
        </div>
      </div>
    );
  };
  const ImageDetails = () => {
    return (
      <div className="detailsWrapper">
        <div className="top">
          <div className="count">
            <div className="dataField">
              <div className="label">Views: </div>
              <div className="data">{image?.views}</div>
            </div>
            <div className="dataField">
              <div className="label">Download: </div>
              <div className="data">{image?.downloads}</div>
            </div>
            <div className="dataField">
              <div className="label">Featured in: </div>
              <ul className="data">
                {image?.topics?.map((item) => {
                  return <li key={item.id}> {item.title}</li>;
                })}
              </ul>
            </div>
            <div className="dataField">
              <div className="label"></div>
              <div className="data"></div>
            </div>
          </div>
          <div className="share">
            <div className="btn">
              <MdShare></MdShare> Share
            </div>
            <div className="btn">
              <MdInfo></MdInfo> info
            </div>
          </div>
        </div>
        <div className="bottom">
          <div className="left">
            <div className="listDetails">
              <MdCalendarToday></MdCalendarToday>{" "}
              <span>
                Published{" "}
                {moment(image?.created_at).format("MMMM Do YYYY, h:mm a")}
              </span>{" "}
            </div>
            {image?.exif?.name !== "" ? (
              <div className="listDetails">
                <MdCamera></MdCamera> <span>{image?.exif?.name}</span>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="right">
            <div className="listDetails">
              <span></span>
            </div>
          </div>
        </div>
        <div className="description">
          <div className="listDetails">
            <span>{image?.description}</span>
          </div>
        </div>
      </div>
    );
  };
  const RelatedImages = () => {
    return (
      <div className="relatedImageWrapper">
        {realted?.results.map((item) => {
          return <Images key={item.id} item={item}></Images>;
        })}
      </div>
    );
  };
  const RelatedCollection = () => { };
  const RelatedTags = () => {
    return (
      <div className="related">
        <div className="title">Related Tags</div>
        <ul className="related-items">
          {image?.tags.map((item, index) => (
            <li
              className={`tag-item btn`}
              key={index}
              onClick={(e) => setkeyword(item.title)}>
              {item.title}
            </li>
          ))}
        </ul>
      </div>
    )
  }
  const Arrow = () => {
    return (
      <div className="arrow">
        <span
          onClick={() =>
            imageIndex === 0
              ? setimageIndex(lightboxData.newImage.length - 1)
              : setimageIndex(imageIndex - 1)
          }>
          <MdOutlineArrowLeft></MdOutlineArrowLeft>
        </span>

        <span
          onClick={() =>
            imageIndex === lightboxData.newImage.length - 1
              ? setimageIndex(0)
              : setimageIndex(imageIndex + 1)
          }>
          <MdArrowRight></MdArrowRight>
        </span>
      </div>
    );
  };

  return (
    <>
      <div className="overlay-image-container">
        <div className="overlaywrapper">
          <div className="overlayHeading">
            <Link to={"/"}>
              {" "}
              <MdClose className="dismiss" onClick={closeimage}></MdClose>
            </Link>
          </div>
          <div className="overlayContent">
            <div className="content-header">
              <ContentHeader></ContentHeader>
            </div>
            <div className="contentImage">
              <ContentImage></ContentImage>
            </div>
            <div className="ImageDetails">
              <ImageDetails></ImageDetails>
            </div>
            <div className="relatedImages">
              <RelatedImages></RelatedImages>
            </div>
            <div className="relatedCollection"></div>
            <div className="realtedTage">
              <RelatedTags></RelatedTags>
            </div>
          </div>

          <div className="overlayfooter"></div>
        </div>
      </div>
    </>
  );
};

export default Imageoverlay;
