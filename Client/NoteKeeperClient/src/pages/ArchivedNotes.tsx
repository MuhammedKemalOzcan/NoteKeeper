import NotesList from "../components/NotesList";
import { useNotes } from "../context/NoteContext";

export default function ArchivedNotes() {
  const { notes } = useNotes();

  return (
    <div>
      <NotesList notes={notes} type="archived" />
    </div>
  );
}
