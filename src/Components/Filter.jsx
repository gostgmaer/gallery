// @ts-nocheck
import React, { Fragment, useEffect, useState } from "react";
import { Data } from "../Assets/StaticData/Data";
import { useGlobalContext } from "../Utils/Context/Context";
import ItemsMenu from "./MenuItem";

const Filter = () => {
  const {
    indexPage,
    setIndexPage,
    images,
    keyword,

    setkeyword,
    color,
    setColor,
    orientation,
    setOrientation,
  } = useGlobalContext();

  const arr = [
    "black_and_white",
    "black",
    "white",
    "yellow",
    "orange",
    "red",
    "purple",
    "magenta",
    "green",
    "teal",
    "blue",
  ];

  const SectionBottom = (
    <div className="bottom">
      <div className="left">
        <ul className="related-items">
          {arr.map((item, index) => (
            <li
              className={`color-item btn`}
              key={index}
              style={{
                backgroundColor: item,
                color:
                  item === "white" ||
                  item === "yellow" ||
                  item === "black_and_white"
                    ? "black"
                    : "white",
                border: item === "white" && "1px solid grey",
              }}
              onClick={(e) => setColor(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="right">
        <div className="filterSearch">
          <div className="Orientaion">
            <ItemsMenu></ItemsMenu>
          </div>
          {/* <div className="color">
Showing <span>0-20 </span> of
<span>{Data.Images.total} Items</span>
</div> */}
        </div>
      </div>
    </div>
  );
  // eslint-disable-next-line no-undef
  // useEffect(() => {
  //     console.log(indexPage);
  //     console.log(keyword);
  // }, [indexPage, keyword]);
  return (
    <div className="filter">
      <div className="filter-element">
        <div className="top">
          <div className="query">
            <div className="myquery">{keyword}</div>
            <div className="related">
              <ul className="related-items">
                {images?.related_searches?.map((item, index) => (
                  <li
                    className={`tag-item btn`}
                    key={index}
                    onClick={(e) => setkeyword(item.title)}
                  >
                    {item.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {SectionBottom}
      </div>
    </div>
  );
};

export default Filter;
