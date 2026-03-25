"use client";
import React, { Fragment, useEffect, useState, useRef, useCallback } from "react";
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

  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const lastScrollTime = useRef(0);

  const fetchData = async () => {
    const response = await SearchImages();
    const newItems = response?.results || [];
    setItems(prevItems => [...prevItems, ...newItems]);
  };

  const onScroll = useCallback(() => {
    const now = Date.now();
    if (now - lastScrollTime.current < 300) {
      return; // Throttle to max once every 300ms
    }
    lastScrollTime.current = now;

    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight || window.innerHeight;

    if (scrollTop + clientHeight >= scrollHeight - 50) {
      setIndexPage(prev => prev + 1);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  useEffect(() => {
    fetchData();
  }, [indexPage]);

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
          {items.map((item) => {
            return <Images key={item.id} item={item}></Images>;
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
