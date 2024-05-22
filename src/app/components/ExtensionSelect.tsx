"use client";
import React from "react";
import { ExtensionSelectProps } from "../types/Index";

const ExtensionSelect: React.FC<ExtensionSelectProps> = ({
  modality,
  options,
  onChange,
  activeOption,
}) => {
  return (
    // <div className={`grid grid-cols-4 gap-1 ${options.length > 4 ? 'grid-flow-row' : 'inline-flex'}`}>
    <div className='grid grid-cols-4 gap-1 grid-flow-row'>
      {options.map((option, index) => {
        if (
          (modality === "Dim" && option.label === "Maj 7th") ||
          (modality === "Aug" && option.label === "Min 7th")
        ) {
          return null;
        }
        return (
          <button
            className={` w-fit h-8 bg-gray-50 hover:bg-gray-500 hover:text-white text-gray-800 font-bold py-2 px-4 rounded-l text-xs sm:text-base  ${
              activeOption === option.value ? "bg-gray-500 text-white" : ""
            }`}
            key={index}
            onClick={() => onChange(option.value.toString())}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

export default ExtensionSelect;
