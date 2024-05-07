import React from "react";
import Circle from "./components/Circle";
import { notes } from "./utils/utils.js";

const Home: React.FC = () => {
  const cNote = notes.find((note) => note.note === "C");

  return (
    <div>
      <Circle notes={notes} />
    </div>
  );
};

export default Home;
