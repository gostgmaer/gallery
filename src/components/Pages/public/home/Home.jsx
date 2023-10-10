import React, { Fragment, useState } from "react";
import Images from "@/components/parts/ImageCard/Images";
import { useGlobalAppContext } from "@/context/context";
import Filter from "@/components/parts/Filter";
import Pagination from "@/components/global/fields/pagination/Pagination";

const Home = () => {
  const { indexPage, setIndexPage, images, loading, setPerpage, perpage } =
    useGlobalAppContext();
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
        (
        <Fragment>
          <div className="filterOption">
            <Filter></Filter>
          </div>
          <div className="navigation">
            {/* <ItemsPerPagePicker
                itemsPerPage={perpage}
                onItemsPerPageChange={handleItemsPerPageChange}
              />
              <Pagination
                totalPages={images.total_pages}
                // itemsPerPage={itemsPerPage}
                currentPage={indexPage}
                onPageChange={handlePageChange}
              /> */}
              <Pagination endpoint={undefined} items={undefined} pages={undefined}/>
          </div>
          <div className="ImageCards">
            {images?.results?.map((item) => {
              return <Images key={item.id} item={item}></Images>;
            })}
          </div>
        </Fragment>
        )
      </div>
    </div>
  );
};

export default Home;
