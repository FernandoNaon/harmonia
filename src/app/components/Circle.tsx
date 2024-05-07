"use client";

import React, { useState } from "react";
import Note from "./Note";

interface NoteData {
  value: number;
  note: string;
}

interface CircleProps {
  notes: NoteData[];
}

type isMajor = {
  isMajor: boolean;
};

type seventh = {
  hasSeventh: boolean;
  isMajor?: boolean;
};

const Circle: React.FC<CircleProps> = ({ notes }) => {
  const [scale, setScale] = useState<NoteData>({ value: 1, note: "C" });
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
    const isMajor = selectedValue === "Major"; // Check if the selected value is "Major"
    setIsMajor({ isMajor }); // Update isMajor state based on the selected value
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

    console.log(seventh);
  };

  const calculatePosition = (index: number) => {
    const angle = index * angleIncrement;
    const x = radius * Math.cos(angle) + radius;
    const y = radius * Math.sin(angle) + radius;
    return { x, y };
  };

  // const generateChord = (noteIndex: number): NoteData[] => {
  //   const chordIntervals =
  //     seventh.seventh === null && isMajor.isMajor ? [0, 4, 7] : [0, 3, 7];

  //   //add this if seventh.seventh = true => [0, 4, 7,11] if it is false [0, 3, 7, 11]

  //   const triadNotes = chordIntervals.map((interval) => {
  //     const newIndex = (noteIndex + interval) % notes.length;
  //     return notes[newIndex];
  //   });
  //   return triadNotes;
  // };

  const generateChord = (noteIndex: number): NoteData[] => {
    let chordIntervals: number[];

    // Check if seventh exists and is true
    if (seventh.hasSeventh && seventh.isMajor !== undefined) {
      chordIntervals = seventh.isMajor ? [0, 4, 7, 11] : [0, 3, 7, 10];
    } else {
      chordIntervals = isMajor.isMajor ? [0, 4, 7] : [0, 3, 7];
    }

    const triadNotes = chordIntervals.map((interval) => {
      const newIndex = (noteIndex + interval) % notes.length;
      return notes[newIndex];
    });
    return triadNotes;
  };

  const drawTriadLines = () => {
    if (!scale) return null;

    const triadNotes = generateChord(scale.value - 1); // Note value starts from 1
    const points = triadNotes.map(({ value }) => {
      const { x, y } = calculatePosition(value - 1);
      return `${x},${y}`;
    });
    const d = `M${points.join("L")}Z`;

    return <path d={d} fill="none" stroke="red" strokeWidth="2" />;
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-center">
        <div className="relative ml-9 mt-9 w-80 h-80">
          {notes.map((note, index) => {
            const { x, y } = calculatePosition(note.value - 1);

            return (
              <div key={index} className="absolute" style={{ top: y, left: x }}>
                <Note note={note} />
              </div>
            );
          })}
          <svg className="w-full h-full">
            {scale && drawTriadLines()}
            <circle
              cx={radius}
              cy={radius}
              r={radius}
              fill="transparent"
              stroke="black"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>

      <div className="flex justify-start">
        <form className="max-w-sm mx-auto mt-8">
          <label
            htmlFor="notes"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select a scale
          </label>
          <select
            id="notes"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={handleChangeNote}
            value={scale.value}
          >
            <option disabled>Choose a Scale</option>
            {notes.map((note, index) => (
              <option value={note.value} key={index}>
                {note.note}
              </option>
            ))}
          </select>
        </form>

        <form className="max-w-sm mx-auto mt-8">
          <label
            htmlFor="scale"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select a scale
          </label>
          <select
            id="scale"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={handleChangeScale}
          >
            <option disabled>Choose an option</option>
            <option value="Major">Major</option>
            <option value="Minor">Minor</option>
          </select>
        </form>

        <form className="max-w-sm mx-auto mt-8">
          <label
            htmlFor="seventh"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Add a 7th
          </label>
          <select
            id="seventh"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={handleChangeSeventh}
          >
            <option disabled>Choose an option</option>
            <option value="Null">No 7th</option>
            <option value="Major">Major 7th</option>
            <option value="Minor">Minor 7th</option>
          </select>
        </form>
      </div>
    </div>
  );
};

export default Circle;
