"use client";

import React, { useState } from "react";
import ExtensionSelect from "./ExtensionSelect";
import { NoteData, isMajor, seventh, modality } from "../types/Index";
import { notes, scaleOptions, seventhOptions } from "../utils/utils";

const Circle: React.FC = () => {
  const [scale, setScale] = useState<NoteData>({ value: 1, label: "C" });
  const [modality, setModality] = useState<modality>({ modality: "Major" });

  const [seventh, setSeventh] = useState<seventh>({
    hasSeventh: false,
  });

  const radius = 150;
  const angleIncrement = (2 * Math.PI) / notes.length;

  const handleChangeNote = (value: number) => {
    const selectedValue = value;
    const selectedNote = notes.find((note) => note.value === selectedValue);
    if (selectedNote) {
      setScale(selectedNote);
    }
  };

  const handleChangeScale = (selectedValue: string) => {
    setModality({ modality: selectedValue });
  };

  const handleChangeSeventh = (selectedValue: string) => {
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
    switch (modality.modality) {
      case "Major":
        chordIntervals = [0, 4, 7];
        if (seventh.hasSeventh) {
          chordIntervals.push(seventh.isMajor ? 11 : 10);
        }
        break;
      case "Minor":
        chordIntervals = [0, 3, 7];
        if (seventh.hasSeventh) {
          chordIntervals.push(seventh.isMajor ? 11 : 10);
        }
        break;
      case "Dim":
        chordIntervals = [0, 3, 6];
        if (seventh.hasSeventh) {
          chordIntervals.push(10);
        }
        break;
      case "Aug":
        chordIntervals = [0, 4, 8];
        if (seventh.hasSeventh) {
          chordIntervals.push(11);
        }
        break;
      default:
        throw new Error("Invalid modality");
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
      strokeWidth: "4",
    };
    return <path d={d} style={pathStyle} />;
  };
  const chordNotes = generateChord(scale.value - 1);

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
              zIndex: 1,
              fontSize: scale.label === note.label ? "1.75rem" : "1rem",
            };
            const isInChord = chordNotes.some(
              (chordNote) => chordNote.value === note.value
            );

            return (
              <div key={index} style={noteStyle}>
                {isInChord ? (
                  <button className="bg-[var(--primary-color)] h-16 w-16 text-gray-800  py-2 px-4 border rounded-full shadow text-center">
                    {note.label}
                  </button>
                ) : (
                  <button
                    onClick={() => handleChangeNote(note.value)}
                    className="bg-white hover:bg-gray-100 h-16 w-16 text-gray-800  py-2 px-4 border rounded-full shadow text-center"
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

      <div className="flex flex-col gap-8 justify-start mx-2">
        <ExtensionSelect
          label="Chord Modality"
          options={scaleOptions}
          modality={modality.modality}
          onChange={handleChangeScale}
        />
        <ExtensionSelect
          label="Seventh Extension"
          options={seventhOptions}
          modality={modality.modality}
          onChange={handleChangeSeventh}
        />
      </div>
    </div>
  );
};

export default Circle;
