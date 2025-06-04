import { NavLink, useNavigate } from "react-router";
import { dateFormater } from "../utils/format";
import type { Notes } from "../types/notes";
import { Plus } from "lucide-react";

interface Props {
  notes: Notes[];
  type?: "active" | "archived";
}

const NotesList = ({ notes, type = "active" }: Props) => {
  const config = {
    active: {
      title: "All Notes",
      filter: (note: Notes) => !note.isArchived,
      link: "/notes/",
    },
    archived: {
      title: "Archived Notes",
      filter: (note: Notes) => note.isArchived,
      link: "/archived/",
    },
  };
  const navigate = useNavigate();

  const currentConfig = config[type];
  const filteredNotes = notes.filter(currentConfig.filter);

  return (
    <div className="p-4 max-lg:w-full flex flex-col lg:border-r h-screen relative">
      <h1 className="lg:hidden mb-4">{currentConfig.title}</h1>
      <button
        onClick={() => navigate("/notes/create")}
        className="bg-blue-500 text-white p-3 rounded-[12px] mb-4 max-lg:hidden "
      >
        + Create New Note
      </button>

      {filteredNotes.map((note) => (
        <NavLink
          className="flex flex-col gap-4 p-3 lg:w-full "
          to={currentConfig.link + note.id}
          key={note.id}
        >
          <h3 className="lg:text-left">{note.title}</h3>
          <h6>{dateFormater.format(new Date(note.createdDate))}</h6>
          <div className="border-b mt-5"></div>
        </NavLink>
      ))}
      <button className="absolute bottom-40 right-10 bg-blue-500 p-3 rounded-full drop-shadow-lg lg:hidden ">
        <Plus className="text-white" />
      </button>
    </div>
  );
};

export default NotesList;
