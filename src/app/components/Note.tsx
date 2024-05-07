import React from 'react';

interface NoteData {
  value: number;
  note: string;
}

interface NoteProps {
  note: NoteData;
}

const Note: React.FC<NoteProps> = ({ note }) => {
  return (
    <div className="w-6 h-6 bg-black-300 border-4 rounded-full border-blue-600 flex items-center justify-center">
      {note.note}
    </div>
  );
};

export default Note;
