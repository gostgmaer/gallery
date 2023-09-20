import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  return (
    <div className="pagination-container">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-button"
      >
        Previous
      </button>
      <span className="pagination-status">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination-button"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;


export const ItemsPerPagePicker = ({ itemsPerPage, onItemsPerPageChange }) => {
  const handleItemsPerPageChange = (e) => {
    const newValue = parseInt(e.target.value);
    onItemsPerPageChange(newValue);
  };

  return (
<div className="items">
<div className="items-per-page-picker">
      <label htmlFor="itemsPerPage">Items per page:</label>
      <select
        id="itemsPerPage"
        value={itemsPerPage}
        onChange={handleItemsPerPageChange}
      
      >
        <option value="4" >4</option>
        <option value="12">12</option>
        <option value="24">24</option>
        <option value="30">30</option>
      </select>
    </div>
    <div className="total-item"></div>
</div>
  );
};
