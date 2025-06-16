import { useEffect, useState } from "react";
import { useParams } from "react-router";
import DisplayNote from "../components/DisplayNote";
import { useNotes } from "../context/NoteContext";

export default function ArchivedNoteDetail() {
  const { id } = useParams();
  const { fetchNoteById, note } = useNotes();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNoteById(id);
    setLoading(false);
  }, [id]);

  if (loading) return <h1>Loading...</h1>;

  return (
    <div>
      <DisplayNote type="archived" note={note} />
    </div>
  );
}
