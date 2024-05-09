"use client";
import React from "react";
import { ExtensionSelectProps } from "../types/Index";

const ExtensionSelect: React.FC<ExtensionSelectProps> = ({
  label,
  id,
  options,
  onChange,
}) => {
  return (
    <form className="max-w-sm mx-auto mt-8">
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <select
        id={id}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={onChange}
      >
        <option disabled>Choose an option</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </form>
  );
};

export default ExtensionSelect;
