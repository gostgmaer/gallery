"use client";
import React, { Fragment, useState } from "react";
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
    loading,
    setPerpage,
    perpage,
    orientation,
    setOrientation,
  } = useGlobalAppContext();
  const [totalPages, setTotalPages] = useState(0);
  const [newLoading, setNewLoading] = useState(true);
  // const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (newPage) => {
    setIndexPage(newPage);
    // You can also fetch data for the new page here
  };
  // Change this to your desired page size
  const startIndex = (indexPage - 1) * perpage;
  const endIndex = startIndex + perpage;
  const itemsToDisplay = images?.results.slice(startIndex, endIndex);

  const handleItemsPerPageChange = (newItemsPerPage) => {
    // Update the itemsPerPage state and reset the current page to 1
    setPerpage(newItemsPerPage);
  };

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
          {images?.results?.map((item) => {
            return <Images key={item.id} item={item}></Images>;
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
