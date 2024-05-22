import React from "react";
import { useHarmonia } from "../context/HarmoniaContext";
import { notes } from "../utils/utils";

const HarmonicSphere: React.FC = () => {
  const {
    scale,
    chordNotes,
    handleChangeNote,
    calculatePosition,
    drawChordLines,
  } = useHarmonia();

  return (
    <div className="w-fit flex items-center justify-center">
      <div className="relative mt-9 w-80 h-80">
        {notes.map((note, index) => {
          const { x, y } = calculatePosition(note.value - 1);
          const noteStyle: React.CSSProperties = {
            position: "absolute",
            top: `${y}px`,
            left: `${x}px`,
            transform: "translate(-50%, -50%)",
            zIndex: 1,
          };
          const isInChord = chordNotes.some(
            (chordNote) => chordNote.value === note.value
          );

          return (
            <div key={index} style={noteStyle}>
              {isInChord ? (
                <button
                  onClick={() => handleChangeNote(note.value, notes)}
                  className={` text-white border rounded-full shadow text-center ${
                    scale.label === note.label ? "h-12 w-12 bg-secondary" : "h-8 w-8 bg-secondary"
                  }`}
                >
                  {note.label}
                </button>
              ) : (
                <button
                  onClick={() => handleChangeNote(note.value, notes)}
                  className="bg-white hover:bg-gray-100 h-8 w-8 text-gray-800 border rounded-full shadow text-center"
                >
                  {note.label}
                </button>
              )}
            </div>
          );
        })}
        <svg className="z-0 absolute w-full h-full">
          {scale && drawChordLines()}
        </svg>
      </div>
    </div>
  );
};

export default HarmonicSphere;
