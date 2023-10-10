"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { get } from "@/lib/network/http";

const Pagination = ({ endpoint, items, pages }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Default items per page
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(pages ? pages : 100);

  const fetchData = async () => {

    try {
      const response = await get(endpoint, {
        params: {
          page: currentPage,
          limit: itemsPerPage,
        },
      });
      setData(response.result);
      setTotalPages(Math.ceil(response.data.total_count / itemsPerPage));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to the first page when changing items per page.
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, itemsPerPage]);

  return (
    <div className="w-full max-w-3xl mx-auto p-4 bg-white shadow-md rounded-md">
      <div className="flex justify-between items-center ">
        <div className="text-gray-600 flex items-center">
          <label className="mr-2 font-semibold">Items per page:</label>
          <select
            value={itemsPerPage}
            onChange={handlePerPageChange}
            className="border rounded-md px-2 py-1"
          >
            {items ? (
              items.map(data, (index) => (
                <option key={index} value={data}>
                  {data}
                </option>
              ))
            ) : (

              [10,20,30,50].map(item=>(
                <option key={item} value={item}>{item}</option>
              ))
            
            )}
          </select>
        </div>
        <div className="text-gray-600 flex items-center">
          <span className="mr-4">
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex">
            <button
              onClick={handlePrevClick}
              disabled={currentPage === 1}
              className={`${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              } btn`}
            >
              Previous
            </button>
            <button
              onClick={handleNextClick}
              disabled={currentPage === totalPages}
              className={`${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              } btn ml-2`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
