import NotesList from "../components/NotesList";
import { useNotes } from "../context/NoteContext";

export default function AllNotes() {
  const { notes } = useNotes();

  return (
    <div id="allNotes">
      <div className="flex">
        <NotesList notes={notes} type="active" />
      </div>
    </div>
  );
}
