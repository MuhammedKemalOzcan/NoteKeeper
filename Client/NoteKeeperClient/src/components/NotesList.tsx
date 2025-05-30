import { NavLink } from "react-router";
import { dateFormater } from "../utils/format";
import type { Notes } from "../types/notes";
import { Plus } from "lucide-react";

const NotesList = ({ notes }: { notes: Notes[] }) => {
  const message =
    "You don’t have any notes yet. Start a new note to capture your thoughts and ideas.";

  const handleClick = () => {
    console.log("create note açıldı");
  };

  return (
    <div className="p-4 max-lg:w-full lg:w-full flex flex-col lg:border-r h-screen relative">
      <h1 className="lg:hidden mb-4">All Notes</h1>
      <button
        onClick={handleClick}
        className="bg-blue-500 text-white p-3 rounded-[12px] mb-4 max-lg:hidden "
      >
        + Create New Note
      </button>

      {notes.map((note) =>
        !note ? (
          message
        ) : (
          <NavLink
            className="flex flex-col gap-4 p-3 lg:w-full "
            to={"/notes/" + note.id}
            key={note.id}
          >
            <h3 className="lg:text-left">{note.title}</h3>
            <h6>{dateFormater.format(new Date(note.createdDate))}</h6>
            <div className="border-b mt-5"></div>
          </NavLink>
        )
      )}
      <button className="absolute bottom-40 right-10 bg-blue-500 p-3 rounded-full drop-shadow-lg lg:hidden ">
        <Plus className="text-white" />
      </button>
    </div>
  );
};

export default NotesList;
