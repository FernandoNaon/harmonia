import React from "react";
import { useHarmonia } from "../context/HarmoniaContext";
import ExtensionSelect from "./ExtensionSelect";
import { scaleOptions, seventhOptions } from "../utils/utils";

const ChordGenerator: React.FC = () => {
  const { modality, seventh, handleChangeScale, handleChangeSeventh } =
    useHarmonia();

  return (
    <div className="w-screen sm:w-[70vw] lg:w-[35vw] h-40 flex flex-col gap-4 justify-center mx-2  bg-white p-8 rounded-[25px] ">
      <ExtensionSelect
        options={scaleOptions}
        modality={modality.modality}
        onChange={handleChangeScale}
        activeOption={modality.modality}
      />
      <ExtensionSelect
        options={seventhOptions}
        modality={modality.modality}
        onChange={handleChangeSeventh}
        activeOption={
          seventh.hasSeventh ? (seventh.isMajor ? "Major" : "Minor") : "Null"
        }
      />
    </div>
  );
};

export default ChordGenerator;
