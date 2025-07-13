import NotesList from "../components/NotesList";
import { useNotes } from "../context/NoteContext";

export default function AllNotes() {
  const { notes } = useNotes();

  return (
      <div className="flex h-auto">
        <NotesList notes={notes} type="active" />
      </div>
  );
}
