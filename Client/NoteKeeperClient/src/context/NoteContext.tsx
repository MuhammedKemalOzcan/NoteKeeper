import { createContext, useContext, useEffect, useState } from "react";
import type { AddNote, Notes } from "../types/notes";
import axios from "axios";

type NotesContextType = {
  notes: Notes[];
  setNotes: React.Dispatch<React.SetStateAction<Notes[]>>;
  fetchNotes: () => void;
  addNote: (note: AddNote) => Promise<void>;
  deleteNote: (id: string | undefined) => Promise<void>;
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
    await axios.post("https://localhost:7001/api/Notes", note);
    fetchNotes(); // yeni not eklendikten sonra tekrar fetch et
  };

  const deleteNote = async (id: string | undefined) => {
    await axios.delete("https://localhost:7001/api/Notes/" + id);
    await fetchNotes();
  };

  useEffect(() => {
    fetchNotes(); // İlk açılışta notları getir
  }, []);

  return (
    <NoteContext.Provider
      value={{ notes, setNotes, fetchNotes, addNote, deleteNote }}
    >
      {children}{" "}
      {/*provider aracılığıyla göndereceğimiz component ve sayfalar children yardımıyla erişir. */}
    </NoteContext.Provider>
  );
}
