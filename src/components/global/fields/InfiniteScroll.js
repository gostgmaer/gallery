// components/InfiniteScroll.js
import ItemsMenu from '@/components/parts/MenuItem';
import React, { useState, useEffect } from 'react';


const InfiniteScroll = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // Track the current page

  const fetchMoreData = async () => {
    setLoading(true);

    const response = await fetch(`/api/getData?page=${page}`);
    const newData = await response.json();
    setItems([...items, ...newData]);
    setPage(page + 1);
    setLoading(false);
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
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Initial data load
    fetchMoreData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <ItemsMenu isarrow={undefined} event={undefined}  />
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default InfiniteScroll;
