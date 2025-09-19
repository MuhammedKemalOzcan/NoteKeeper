import { NavLink, useLocation, useNavigate } from "react-router";
import { dateFormater } from "../utils/format";
import type { Notes } from "../types/notes";
import { Plus } from "lucide-react";

interface Props {
  notes: Notes[];
  type?: "active" | "archived";
}

const NotesList = ({ notes, type = "active" }: Props) => {

  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const tagParams = query.get("tag");
  const input = query.get("input");

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

  const currentConfig = config[type];
  let filteredNotes = notes.filter(currentConfig.filter);
  
  if (tagParams) {
    filteredNotes = filteredNotes.filter((note) =>
      note.tags.some((tag) => tag.tagName === tagParams)
    );
  }

  if (input) {
    filteredNotes = filteredNotes.filter(
      (note) =>
        note.tags.some((tag) =>
          tag.tagName.toLowerCase().includes(input.toLowerCase())
        ) ||
        note.description.toLowerCase().includes(input.toLowerCase()) ||
        note.title.toLowerCase().includes(input.toLowerCase())
    );
  }
  console.log(filteredNotes);

  return (
    <div className="relative p-4 max-lg:w-full w-full flex flex-col lg:border-r dark:border-[#232530] h-screen overflow-auto ">
      {tagParams ? (
        <h1 className="lg:hidden">Notes Tagged : {tagParams}</h1>
      ) : (
        <h1 className="lg:hidden mb-4 ">{currentConfig.title}</h1>
      )}
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
          {note.createdDate && (
            <h6>{dateFormater.format(new Date(note.createdDate))}</h6>
          )}

          <div className="flex flex-wrap gap-4 dark:text-black">
            {note?.tags?.map((tag) => (
              <div key={tag.id} className="flex gap-3 ">
                <p className="flex w-auto h-[30px] whitespace-nowrap border px-2 bg-[#E0E4EA] py-[2px] rounded-[4px] ">
                  {tag.tagName}
                </p>
              </div>
            ))}
          </div>

          <div className="border-b mt-5 dark:border-[#232530]"></div>
        </NavLink>
      ))}
      <button
        onClick={() => navigate("/notes/create")}
        className="fixed bottom-24 right-10 bg-blue-500 p-3 rounded-full drop-shadow-lg lg:hidden"
      >
        <Plus className="text-white " />
      </button>
    </div>
  );
};

export default NotesList;
