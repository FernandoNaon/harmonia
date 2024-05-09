import { ChangeEvent } from "react";

export interface NoteData {
  value: number;
  label: string;
}
export interface Option {
  value: string;
  label: string;
}

export interface NoteProps {
  note: NoteData;
}

export interface ExtensionSelectProps {
  label: string;
  modality: string;
  options: Option[] | NoteData[];
  onChange: (e: string) => void;
}

export type isMajor = {
  isMajor: boolean;
};

export type modality = {
  modality: string;
};

export type seventh = {
  hasSeventh: boolean;
  isMajor?: boolean;
};
