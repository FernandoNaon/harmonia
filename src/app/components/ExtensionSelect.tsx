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
    <div className="inline-flex gap-1">
      {options.map((option, index) => {
        if (
          (modality === "Dim" && option.label === "Maj 7th") ||
          (modality === "Aug" && option.label === "Min 7th")
        ) {
          return null;
        }
        return (
          <button
            className={`bg-gray-50 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l ${
              activeOption === option.value ? "bg-gray-400 text-white" : ""
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
