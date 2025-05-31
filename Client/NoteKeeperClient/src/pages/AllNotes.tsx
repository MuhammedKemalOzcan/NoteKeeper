import axios from "axios";
import { useEffect, useState } from "react";
import NotesList from "../components/NotesList";
import type { Notes } from "../types/notes";

export default function AllNotes() {
  const [notes, setNotes] = useState<Notes[]>([]);

  useEffect(() => {
    async function fetchNotes() {
      const response = await axios.get<Notes[]>(
        "https://localhost:7001/api/Notes"
      );
      setNotes(response.data);
    }
    fetchNotes();
  }, []);

  return (
    <div id="allNotes">
      <div className="flex">
        <NotesList notes={notes} type="active" />
      </div>
    </div>
  );
}
