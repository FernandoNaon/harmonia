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
    <div>
      <p className="text-sm">{label}</p>
      <div className="inline-flex">
        {options.map((option, index) => (
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
            key={index}
            onClick={() => onChange(option.value.toString())}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ExtensionSelect;
