import React from "react";
import { useHarmonia } from "../context/HarmoniaContext";
import ExtensionSelect from "./ExtensionSelect";
import { scaleOptions, seventhOptions } from "../utils/utils";

const ChordGenerator: React.FC = () => {
  const { modality, seventh, handleChangeScale, handleChangeSeventh } =
    useHarmonia();

  return (
    <div className="w-fit flex flex-col gap-8 justify-start mx-2  h-[15rem] bg-white p-8 rounded-[25px] ">
      <ExtensionSelect
        label="Chord Modality"
        options={scaleOptions}
        modality={modality.modality}
        onChange={handleChangeScale}
        activeOption={modality.modality}
      />
      <ExtensionSelect
        label="Seventh Extension"
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
