"use client";
import React, { Fragment, useEffect, useState } from "react";
import Images from "@/components/parts/ImageCard/Images";
import { useGlobalAppContext } from "@/context/context";
import Filter from "@/components/parts/Filter";
import Pagination from "@/components/global/fields/pagination/Pagination";
import SelectField from "@/components/global/fields/SelectField";
import { Data } from "@/assets/StaticData/Data";

const Home = () => {
  const {
    indexPage,
    setIndexPage,
    images,
    orientation,
    setOrientation,
    SearchImages,
  } = useGlobalAppContext();

  const [mydata, setMydata] = useState([]);

  const fetchMoreData = async () => {
    const data = await SearchImages();
    
    var mynewData = [...data.results, ...mydata]
    console.log(mynewData);
    setMydata([...data.results, ...mydata]);
    setIndexPage(indexPage + 1);
    console.log(mydata);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      fetchMoreData();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    fetchMoreData();
  }, []);

  return (
    <div className="Home">
      <div className="heading">
        <div className="homeWrapper">
          <SelectField
            options={Data.newData}
            value={orientation}
            onChange={(e) => setOrientation(e.target.value)}
            id={"orientation"}
            label={"Orientation"}
            placeholder={"Select"}
          ></SelectField>
        </div>
      </div>
      <div className="image-listing">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mydata.map((item) => {
            return <Images key={item.id} item={item}></Images>;
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
