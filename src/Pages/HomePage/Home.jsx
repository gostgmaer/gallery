import React, { Fragment, useState } from "react";
import { Data } from "../../Assets/StaticData/Data";
import Images from "../../Components/ImageCard/Images";
import { useGlobalContext } from "../../Utils/Context/Context";
import Filter from "../../Components/Filter";
import "./Home.scss";
import Pagination, { ItemsPerPagePicker } from "./Pagination";
import Loader from "react-loaders";

import { Bars, TailSpin } from "react-loader-spinner";

const Home = () => {
  const { indexPage, setIndexPage, images, loading, setPerpage,perpage } =
    useGlobalContext();
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
      <div className="homeWrapper">
        {loading ? (
          <div className="loader">
            <Bars height={200} width={""}></Bars>
          </div>
        ) : (
          <Fragment>
            <div className="filterOption">
              <Filter></Filter>
            </div>
            <div className="navigation">
              <ItemsPerPagePicker
                itemsPerPage={perpage}
                onItemsPerPageChange={handleItemsPerPageChange}
              />
              <Pagination
                totalPages={images.total_pages}
                // itemsPerPage={itemsPerPage}
                currentPage={indexPage}
                onPageChange={handlePageChange}
              />
            </div>
            <div className="ImageCards">
              {loading ? (
                <TailSpin></TailSpin>
              ) : (
                images?.results?.map((item) => {
                  return <Images key={item.id} item={item}></Images>;
                })
              )}
            </div>
          
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default Home;
