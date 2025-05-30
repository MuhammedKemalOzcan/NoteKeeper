import { useParams } from "react-router";
import NoteSettings from "../components/NoteSettings";
import ArchivedNotes from "../pages/ArchivedNotes";
import ArchivedNoteDetail from "../pages/ArchivedNoteDetail";

export default function DesktopArchivedLayout() {
  const { id } = useParams();
  console.log(id);
  return (
    <div id="desktopLayout" className="flex">
      <div className="w-[26%]">
        <ArchivedNotes />
      </div>
      <main id="note-detail" className="w-[50%]">
        {id && <ArchivedNoteDetail />}
      </main>
      <div className="flex flex-col w-[25%] ">
        <NoteSettings type="archived" />
      </div>
    </div>
  );
}
