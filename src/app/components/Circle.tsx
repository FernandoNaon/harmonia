/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
import ExtensionSelect from "./ExtensionSelect";
import { NoteData, seventh, modality } from "../types/Index";
import { notes, scaleOptions, seventhOptions } from "../utils/utils";
import * as Tone from "tone";

const Circle: React.FC = () => {
  const [scale, setScale] = useState<NoteData>({ value: 1, label: "C" });
  const [modality, setModality] = useState<modality>({ modality: "Major" });
  const [seventh, setSeventh] = useState<seventh>({ hasSeventh: false });
  const [chordNotes, setChordNotes] = useState<NoteData[]>([]);
  const [players, setPlayers] = useState<Tone.Player[]>([]);
  const [audio, setAudio] = useState<boolean>(false);

  useEffect(() => {
    setChordNotes(generateChord(scale.value - 1));
  }, [scale, modality, seventh]);

  useEffect(() => {
    preloadAudio();
  }, [chordNotes]);

  const radius = 150;
  const angleIncrement = (2 * Math.PI) / notes.length;

  const getNoteFilePath = (noteValue: number, baseNote: number): string => {
    const octaveOffset = noteValue < baseNote ? 12 : 0;
    return `/notes/${noteValue + octaveOffset}.wav`;
  };



  const handleChangeNote = (value: number) => {
    const selectedNote = notes.find((note) => note.value === value);
    if (selectedNote) {
      setScale(selectedNote);
    }
    if (audio) {
      playChordSequentially();
    }
  };

  const handleChangeScale = (selectedValue: string) => {
    setModality({ modality: selectedValue });
  };

  const handleChangeSeventh = (selectedValue: string) => {
    let hasSeventh = false;
    let isMajor: boolean | undefined;

    if (selectedValue === "Major" || selectedValue === "Minor") {
      hasSeventh = true;
      isMajor = selectedValue === "Major";
    }
    setSeventh({ hasSeventh, isMajor });
  };

  const handleAudioToggle = () => {
    setAudio(!audio);
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

    return chordIntervals.map((interval) => {
      const newIndex = (noteIndex + interval) % notes.length;
      return notes[newIndex];
    });
  };

  const preloadAudio = () => {
    console.log("Preload Audio");
    const baseNote = scale.value;
    const newPlayers = chordNotes.map((note) => {
      const filePath = getNoteFilePath(note.value, baseNote);
      const player = new Tone.Player({
        url: filePath,
        autostart: false,
      }).toDestination();
      return player;
    });

    Promise.all(newPlayers.map((player) => player.loaded))
      .then(() => {
        setPlayers(newPlayers);
      })
      .catch((error) => {
        console.error("Error loading audio files: ", error);
      });
  };

  const playChordSequentially = () => {
    players.forEach((player, index) => {
      player.start(Tone.now() + index * 0.5);
    });
  };

  const drawChordLines = () => {
    if (!scale) return null;
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

  return (
    <div className="flex flex-col">
      <label className="inline-flex items-center align-bottom cursor-pointe mt-4">
        <input
          type="checkbox"
          checked={audio}
          onChange={handleAudioToggle}
          className="sr-only peer"
        />
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          🔊
        </span>
      </label>

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
