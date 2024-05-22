"use client";

import React, { useEffect, useState } from "react";
import AudioControls from "./AudioControls";
import HarmonicSphere from "./HarmonicSphere";
import { useHarmonia } from "../context/HarmoniaContext";
import ChordGenerator from "./ChordGenerator";
import ToolSelector from "./ToolSelector";
import GreekModes from "./GreekModes";

const Container: React.FC = () => {
  const {selectedTool} = useHarmonia();

  return (
    <>
      <AudioControls />
      <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row items-center gap-20 mx-8">
        <HarmonicSphere />
        <div>
          <ToolSelector />
         {selectedTool.value === 'chordGen' && <ChordGenerator />}
         {selectedTool.value === 'greekModes' && <GreekModes />}
       </div>
      </div>
    </>
  );
};

export default Container;
