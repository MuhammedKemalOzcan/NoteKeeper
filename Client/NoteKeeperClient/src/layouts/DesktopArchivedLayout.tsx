import { useParams } from "react-router";
import NoteSettings from "../components/NoteSettings";
import ArchivedNotes from "../pages/ArchivedNotes";
import ArchivedNoteDetail from "../pages/ArchivedNoteDetail";

export default function DesktopArchivedLayout() {
  const { id } = useParams();
  return (
    <div id="desktopLayout" className="flex">
      <div className="w-[30%]">
        <ArchivedNotes />
      </div>
      <main id="note-detail" className="w-[50%]">
        {id && <ArchivedNoteDetail />}
      </main>
      <div className="flex flex-col w-[25%] ">
        {id && <NoteSettings type="archived" />}
      </div>
    </div>
  );
}
