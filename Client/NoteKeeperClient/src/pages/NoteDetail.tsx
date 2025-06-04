import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { Notes } from "../types/notes";
import DisplayNote from "../components/DisplayNote";

export default function NoteDetail() {
  const { id } = useParams();
  const [note, setNote] = useState<Notes>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNote() {
      try {
        const response = await axios.get<Notes>(
          "https://localhost:7001/api/Notes/" + id
        );
        setNote(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchNote();
  }, [id]);

  if (loading) return <h1>Loading...</h1>;

  return (
    <div>
      <DisplayNote type="active" note={note} />
    </div>
  );
}
