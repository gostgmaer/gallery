"use client";
// components/ComboBox.js

import React, { useState } from "react";

const ComboBox = ({ classes }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false); // Track whether to show results or not
  const fruits = [
    "Apple",
    "Banana",
    "Cherry",
    "Date",
    "Grape",
    "Lemon",
    "Mango",
    "Orange",
    "Peach",
    "Pear",
  ];

  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredResults = fruits.filter((fruit) =>
      fruit.toLowerCase().includes(term.toLowerCase())
    );

    setResults(filteredResults);
    setShowResults(true); // Show results when there is input
  };

  const handleResultClick = (selectedFruit) => {
    setSearchTerm(selectedFruit);
    setShowResults(false); // Hide results after selection
  };

  return (
    <div className={`relative ${classes}`}>
      <div className="relative w-full max-w-lg transform transition-all opacity-100 scale-100">
        <div className=" relative mx-auto flex items-center">
          <form
            typeof="post"
            className="w-full max-w-screen-md mx-auto  bg-white h-10 rounded-lg overflow-hidden shadow-md flex"
          >
            <input
              type="text"
              placeholder="Search for image/video..."
              value={searchTerm}
              required
              onChange={handleInputChange}
              className="flex-grow py-2 px-4 focus:outline-none text-black"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600  font-semibold py-2 text-white px-6 rounded-r-lg transition duration-300 ease-in-out"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ComboBox;
