"use client";

import React, { useEffect, useState } from "react";
import AudioControls from "./AudioControls";
import HarmonicSphere from "./HarmonicSphere";
import { useHarmonia } from "../context/HarmoniaContext";
import ChordGenerator from "./ChordGenerator";

const Container: React.FC = () => {
  const {} = useHarmonia();

  return (
    <>
      <AudioControls />
      <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row items-center gap-20 mx-8">
        <HarmonicSphere />
        <ChordGenerator />
      </div>
    </>
  );
};

export default Container;
