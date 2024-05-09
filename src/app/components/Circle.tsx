"use client";

import React, { useEffect, useState } from "react";
import ExtensionSelect from "./ExtensionSelect";
import { NoteData, isMajor, seventh } from "../types/Index";
import { notes, scaleOptions, seventhOptions } from "../utils/utils";

const Circle: React.FC = () => {
  const [scale, setScale] = useState<NoteData>({ value: 1, label: "C" });
  const [isMajor, setIsMajor] = useState<isMajor>({ isMajor: true });
  const [seventh, setSeventh] = useState<seventh>({
    hasSeventh: false,
  });

  const radius = 150;
  const angleIncrement = (2 * Math.PI) / notes.length;

  const handleChangeNote = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = parseInt(e.target.value);
    const selectedNote = notes.find((note) => note.value === selectedValue);
    if (selectedNote) {
      setScale(selectedNote);
    }
  };

  const handleChangeScale = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const isMajor = selectedValue === "Major";
    setIsMajor({ isMajor });
  };

  const handleChangeSeventh = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;

    let hasSeventh: boolean = false;
    let isMajor: boolean | undefined;

    if (selectedValue === "Major" || selectedValue === "Minor") {
      hasSeventh = true;
      isMajor = selectedValue === "Major";
    }
    setSeventh({ hasSeventh, isMajor });
  };

  const calculatePosition = (index: number) => {
    const startAngle = -Math.PI / 2;
    const angle = startAngle + index * angleIncrement;
    const x = Math.round(radius * Math.cos(angle) + radius);
    const y = Math.round(radius * Math.sin(angle) + radius);
    return { x, y };
  };

  const generateChord = (noteIndex: number): NoteData[] => {
    let chordIntervals: number[];
    if (seventh.hasSeventh && seventh.isMajor !== undefined) {
      chordIntervals = seventh.isMajor ? [0, 4, 7, 11] : [0, 3, 7, 10];
    } else {
      chordIntervals = isMajor.isMajor ? [0, 4, 7] : [0, 3, 7];
    }

    const chordNotes = chordIntervals.map((interval) => {
      const newIndex = (noteIndex + interval) % notes.length;
      return notes[newIndex];
    });

    return chordNotes;
  };

  const drawChordLines = () => {
    if (!scale) return null;
    const chordNotes = generateChord(scale.value - 1);
    const points = chordNotes.map(({ value }) => {
      const { x, y } = calculatePosition(value - 1);
      return `${x},${y}`;
    });
    const d = `M${points.join("L")}Z`;

    const pathStyle: React.CSSProperties = {
      fill: "none",
      stroke: "var(--primary-color)",
      strokeWidth: "2",
    };
    return <path d={d} style={pathStyle} />;
  };
  const chordNotes = generateChord(scale.value - 1);

  useEffect(() => {
    console.log(chordNotes);
  }, [chordNotes, scale]);

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-center">
        <div className="relative mt-9 w-80 h-80">
          {notes.map((note, index) => {
            const { x, y } = calculatePosition(note.value - 1);
            const noteStyle: React.CSSProperties = {
              position: "absolute",
              top: `${y}px`,
              left: `${x}px`,
              transform: "translate(-50%, -50%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1,
              width: scale.label === note.label ? "4rem" : "3rem",
              fontSize: scale.label === note.label ? "1.5rem" : "1rem",
            };
            const isInChord = chordNotes.some(
              (chordNote) => chordNote.value === note.value
            );

            return (
              <div key={index} style={noteStyle}>
                {isInChord ? (
                  <p className="w-9 border-4 bg-[var(--primary-color)] rounded-full flex justify-center align-middle">
                    {note.label}
                  </p>
                ) : (
                  <p>{note.label}</p>
                )}
              </div>
            );
          })}
          <svg className="z-0 absolute w-full h-full">
            {scale && drawChordLines()}
          </svg>
        </div>
      </div>

      <div className="flex justify-start">
        <ExtensionSelect
          label="Select a Triad"
          id="Triad"
          options={notes}
          onChange={handleChangeNote}
        />

        <ExtensionSelect
          label="Chord Modality"
          id="scale"
          options={scaleOptions}
          onChange={handleChangeScale}
        />
        <ExtensionSelect
          label="Seventh Extension"
          id="seventh"
          options={seventhOptions}
          onChange={handleChangeSeventh}
        />
      </div>
    </div>
  );
};

export default Circle;
