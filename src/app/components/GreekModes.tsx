import React from "react";
import { useHarmonia } from "../context/HarmoniaContext";
import ExtensionSelect from "./ExtensionSelect";
import { greekModes } from "../utils/utils";

const GreekModes: React.FC = () => {
  const { selectedGreekMode, handleChangeGreekMode } = useHarmonia();
  return (
    <div className="w-screen sm:w-[70vw] lg:w-[35vw]  h-40 flex flex-col gap-8 justify-center mx-2  bg-white p-8 rounded-[25px] ">
      <ExtensionSelect
        options={greekModes}
        modality={selectedGreekMode.value}
        onChange={handleChangeGreekMode}
        activeOption={selectedGreekMode.value}
      />
    </div>
  );
};

export default GreekModes;
