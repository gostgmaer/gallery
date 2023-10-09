// components/SelectField.js
import React from "react";

const SelectField = ({ options, value, onChange, id, label,placeholder }) => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block mb-2 text-sm font-semibold">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        name={id}
        id={id}
        className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
      >
        <option value="">{placeholder?placeholder:"Select"}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
