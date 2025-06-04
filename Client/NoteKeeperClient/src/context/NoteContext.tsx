import { createContext, useContext, useEffect, useState } from "react";
import type { AddNote, Notes } from "../types/notes";
import axios from "axios";

type NotesContextType = {
  notes: Notes[];
  setNotes: React.Dispatch<React.SetStateAction<Notes[]>>;
  fetchNotes: () => void;
  addNote: (note: AddNote) => Promise<void>;
  deleteNote: (id: string | undefined) => Promise<void>;
  patchNote: (id: string | undefined, isArchived: boolean) => Promise<void>;
};

export const NoteContext = createContext<NotesContextType | undefined>(
  undefined
);

//Bu işlemi bütün componentlerde tek tek yapmaktansa burada bir sefer uyguladık.
export function useNotes() {
  const context = useContext(NoteContext);
  if (!context) throw new Error("useNotes must be used within a NotesProvider");
  return context;
}

export function NoteContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notes, setNotes] = useState<Notes[]>([]);

  const fetchNotes = async () => {
    const response = await axios.get<Notes[]>(
      "https://localhost:7001/api/Notes"
    );
    setNotes(response.data);
  };

  const addNote = async (note: AddNote) => {
    const response = await axios.post<Notes>(
      "https://localhost:7001/api/Notes",
      note
    );
    setNotes((prevNotes) => [...prevNotes, response.data]);
  };

  const deleteNote = async (id: string | undefined) => {
    if (!id) return;
    await axios.delete("https://localhost:7001/api/Notes/" + id);
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const patchNote = async (id: string | undefined, isArchived: boolean) => {
    if (!id) throw new Error("Note ID is required");
    const response = await axios.patch<Notes>(
      `https://localhost:7001/api/Notes`,
      { id,isArchived }
    );

    const updatedNote = response.data;

    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
  };

  useEffect(() => {
    fetchNotes(); // İlk açılışta notları getir
  }, []);

  return (
    <NoteContext.Provider
      value={{ notes, setNotes, fetchNotes, addNote, deleteNote, patchNote }}
    >
      {children}{" "}
      {/*provider aracılığıyla göndereceğimiz component ve sayfalar children yardımıyla erişir. */}
    </NoteContext.Provider>
  );
}
