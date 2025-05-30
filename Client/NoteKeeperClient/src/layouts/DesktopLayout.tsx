import { useParams } from "react-router";
import NoteDetail from "../pages/NoteDetail";
import AllNotes from "../pages/AllNotes";
import CreateNote from "../components/CreateNote";
import NoteSettings from "../components/NoteSettings";

export default function DesktopLayout() {
  const { id } = useParams();
  console.log(id);
  return (
    <div id="desktopLayout" className="flex">
      <div>
        <AllNotes />
      </div>
      <main id="note-detail" className="w-[50%]" >
        {id ? <NoteDetail /> : <CreateNote />}
      </main>
      <div className="flex flex-col w-[25%] ">
        <NoteSettings/>
      </div>
    </div>
  );
}
