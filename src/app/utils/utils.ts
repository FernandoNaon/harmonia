import { NoteData, Option } from "../types/Index";

export const notes: NoteData[] = [
  { value: 1, label: "C" },
  { value: 2, label: "C#" },
  { value: 3, label: "D" },
  { value: 4, label: "D#" },
  { value: 5, label: "E" },
  { value: 6, label: "F" },
  { value: 7, label: "F#" },
  { value: 8, label: "G" },
  { value: 9, label: "G#" },
  { value: 10, label: "A" },
  { value: 11, label: "A#" },
  { value: 12, label: "B" },
];

export const scaleOptions: Option[] = [
  { value: "Major", label: "Major" },
  { value: "Minor", label: "Minor" },
  { value: "Dim", label: "Dim" },
  { value: "Aug", label: "Aug" },
];

export const seventhOptions: Option[] = [
  { value: "Null", label: "No 7th" },
  { value: "Major", label: "Maj 7th" },
  { value: "Minor", label: "Min 7th" },
];
