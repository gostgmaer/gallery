// @ts-nocheck
import React, { useEffect } from 'react'
import { Data } from '../../Assets/StaticData/Data';
import { useGlobalContext } from '../../Utils/Context/Context';

const Pagination = () => {
    const {
       
        indexPage,
        setIndexPage,
       
      } = useGlobalContext();
    
      useEffect(() => {
        console.log(indexPage);
      }, [indexPage]);
  return (
    <div className="Pagination">
      <div className="Pagination-element">
        <div className="pageNumber">
          Page <span>{indexPage}</span> of <span>{Data.Images.total_pages}</span>
        </div>

        <div className="totalPagination">
          <div className="pageNumber">
            Showing <span>0-20 </span> of
            <span>{Data.Images.total} Items</span>
          </div>
          <ul className="pagination-items">
            <li
              className={`page-item btn ${indexPage === 1 ? "disabled" : ""}`}
              onClick={(e) => setIndexPage(indexPage < 2 ? 1 : indexPage - 1)}>
              Previous
            </li>

            {Array.from(Array(5).keys()).map((item) => (
              <li
                className={`page-item btn ${
                  indexPage === item + 1 ? "active" : ""
                }`}
                key={item}
                onClick={(e) => setIndexPage(Number(e.target.innerText))}>
                {item + 1}
              </li>
            ))}
            <li
              className="page-item btn"
              onClick={(e) => setIndexPage(indexPage + 1)}>
              Next
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Pagination