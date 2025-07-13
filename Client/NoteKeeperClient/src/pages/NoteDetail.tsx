import { useEffect, useState } from "react";
import { useParams } from "react-router";
import DisplayNote from "../components/DisplayNote";
import { useNotes } from "../context/NoteContext";

export default function NoteDetail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const { fetchNoteById, note } = useNotes();

  useEffect(() => {
    fetchNoteById(id);
    setLoading(false);
  }, [id]);

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="h-screen">
      <DisplayNote type="active" note={note} />
    </div>
  );
}
