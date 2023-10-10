// components/AutocompleteSearch.js
"use client";

import React, { useState, useEffect } from "react";

const AutocompleteSearch = ({ fetchData }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleInputChange = (e) => {
    const inputValue = e.target.value.toLowerCase();
    setQuery(inputValue);

    // Filter the results based on the user's input
    const filteredResults = fetchData().filter((item) =>
      item.toLowerCase().includes(inputValue)
    );

    setResults(filteredResults);
  };

  useEffect(() => {
    if (selectedItem) {
      // Make an API call with the selectedItem
      // Replace this with your actual API call logic
      console.log(`API call with selected item: ${selectedItem}`);

      // Hide the autocomplete results
      setResults([]);
    }
  }, [selectedItem]);

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search..."
        className="border rounded-lg py-2 pl-10 pr-4 w-64 focus:outline-none focus:border-blue-400"
        onChange={handleInputChange}
        value={query}
      />
      {results.length > 0 && (
        <div className="absolute top-10 left-0 w-64 border border-gray-300 bg-white shadow-lg rounded-lg">
          {results.map((result, index) => (
            <div
              key={index}
              className="p-2 cursor-pointer hover:bg-blue-100 border-b border-gray-200"
              onClick={() => {
                setSelectedItem(result);
                setQuery(result); // Update the input field with the selected item
              }}
            >
              {result}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AutocompleteSearch;
