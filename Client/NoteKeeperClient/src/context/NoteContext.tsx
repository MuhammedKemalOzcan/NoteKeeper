import { createContext, useContext, useEffect, useState } from "react";
import type { AddNote, Notes } from "../types/notes";
import axios from "axios";

type NotesContextType = {
  notes: Notes[];
  setNotes: React.Dispatch<React.SetStateAction<Notes[]>>;
  fetchNotes: () => void;
  fetchNoteById: (id: string | undefined) => void;
  addNote: (note: AddNote) => Promise<void>;
  deleteNote: (id: string | undefined) => Promise<void>;
  patchNote: (id: string | undefined, isArchived: boolean) => Promise<void>;
  note: Notes;
  setNote: React.Dispatch<React.SetStateAction<Notes | undefined>>;
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
  const [note, setNote] = useState<Notes>();
  const token = JSON.parse(localStorage.getItem("user") ?? "");

  const fetchNotes = async () => {
    const response = await axios.get<Notes[]>(
      "https://localhost:7001/api/Notes",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    setNotes(response.data.notes);
  };

  const fetchNoteById = async (id: string) => {
    const response = await axios.get<Notes[]>(
      "https://localhost:7001/api/Notes" + id,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    setNote(response.data.notes);
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
      { id, isArchived }
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
      value={{
        notes,
        setNotes,
        fetchNotes,
        addNote,
        deleteNote,
        patchNote,
        note,
        setNote,
        fetchNoteById,
      }}
    >
      {children}{" "}
      {/*provider aracılığıyla göndereceğimiz component ve sayfalar children yardımıyla erişir. */}
    </NoteContext.Provider>
  );
}
