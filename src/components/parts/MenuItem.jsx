import React, { Fragment, useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { useGlobalAppContext } from "@/context/context";
import { Data } from "@/assets/StaticData/Data";
const ItemsMenu = ({ isarrow, event }) => {
  const [openTab, setopenTab] = useState(false);
  const {
    indexPage,
    setIndexPage,
    keyword,
    setkeyword,
    orientation,
    setOrientation,
  } = useGlobalAppContext();
  return (
    <Fragment>
      <div className="icon-wrapper">
        <label
          className="hamburger btn menu-button"
          onClick={() => setopenTab(!openTab)}
        >
          Orientation
        </label>
        {isarrow ? (
          <label
            className="hamburger btn menu-button"
            onClick={() => setopenTab(!openTab)}
          >
            <MdArrowDropDown></MdArrowDropDown>
          </label>
        ) : (
          ""
        )}
      </div>
      {openTab ? (
        <ul className="item-list">
          <li onClick={(e) => setOrientation("")}>{"any Orientation"}</li>
          {Data.newData.map((item) => (
            <li
              key={item.id}
              onClick={(e) => {
                // @ts-ignore
                setOrientation(e.target.innerHTML);
                setopenTab(!openTab);
              }}
            >
              {item.text}
            </li>
          ))}
        </ul>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default ItemsMenu;
