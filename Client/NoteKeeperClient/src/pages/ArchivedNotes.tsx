import axios from "axios";
import { useEffect, useState } from "react";
import type { Notes } from "../types/notes";
import NotesList from "../components/NotesList";

export default function ArchivedNotes() {
  const [notes, setNotes] = useState<Notes[]>([]);
  useEffect(() => {
    async function fetchNotes() {
      const response = await axios.get<Notes[]>(
        "https://localhost:7001/api/Notes"
      );
      console.log(response.data);
      setNotes(response.data);
    }
    fetchNotes();
  }, []);
  return (
    <div>
      <NotesList notes={notes} type="archived" />
    </div>
  );
}
