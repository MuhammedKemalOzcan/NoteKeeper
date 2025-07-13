import { createContext, useContext, useEffect, useState } from "react";
import type { AddNote, Notes } from "../types/notes";
import axios from "axios";
import { useAuth } from "./AuthContext";
import requests from "../api/apiClient";

type NotesContextType = {
  notes: Notes[];
  setNotes: React.Dispatch<React.SetStateAction<Notes[]>>;
  fetchNotes: () => void;
  fetchNoteById: (id: string | undefined) => Promise<void>;
  addNote: (note: AddNote) => Promise<void>;
  deleteNote: (id: string | undefined) => Promise<void>;
  patchNote: (id: string | undefined, isArchived: boolean) => Promise<void>;
  note: Notes | undefined;
  setNote: React.Dispatch<React.SetStateAction<Notes | undefined>>;
  token: string | null;
  loading: boolean;
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
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, [user]); // Sadece user değiştiğinde token'ı güncelle

  useEffect(() => {
    if (token) {
      setNotes([]);
      setNote(undefined);
      fetchNotes();
    } else {
      setNotes([]);
      setNote(undefined);
    }
  }, [token]); // Token değiştiğinde notları yükle

  const fetchNotes = async () => {
    if (!token) return;

    try {
      const data = await requests.notes.list();
      setNotes(data.notes);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNoteById = async (id: string | undefined) => {
    if (!id || !token) return;
    const response = await requests.notes.details(id);
    setNote(response);
  };

  const addNote = async (note: AddNote) => {
    if (!token) return;
    try {
      const response = await requests.notes.add(note);
      console.log("Yeni not:", response);

      setNotes((prevNotes) => [...prevNotes, response]);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async (id: string | undefined) => {
    if (!id || !token) return;
    await axios.delete("https://localhost:7001/api/Notes/" + id);
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const patchNote = async (id: string | undefined, isArchived: boolean) => {
    if (!id || !token) throw new Error("Note ID is required");
    const response = await axios.patch<Notes>(
      `https://localhost:7001/api/Notes`,
      { id, isArchived }
    );

    const updatedNote = response.data;

    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
  };

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
        token,
        loading,
      }}
    >
      {children}{" "}
      {/*provider aracılığıyla göndereceğimiz component ve sayfalar children yardımıyla erişir. */}
    </NoteContext.Provider>
  );
}
