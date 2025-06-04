import { useLocation, useParams } from "react-router";
import NoteDetail from "../pages/NoteDetail";
import AllNotes from "../pages/AllNotes";
import NoteSettings from "../components/NoteSettings";
import CreateNote from "../components/CreateNote";

export default function DesktopLayout() {
  const { id } = useParams();
  const location = useLocation();
  const isCreate = location.pathname.includes("create");

  return (
    <div id="desktopLayout" className="flex">
      <div id="allnotes" className="w-[30%]" >
        <AllNotes/>
      </div>
      <main id="note-detail" className="w-[50%]">
        {id ? <NoteDetail /> : <div></div>}
        {isCreate ? <CreateNote/> : <div></div>}
      </main>
      <div className="flex flex-col w-[25%] ">
        {id && <NoteSettings type="active" />}
      </div>
    </div>
  );
}
