import { ArchiveRestoreIcon, House, Tag, X } from "lucide-react";
import { Divider } from "./Divider";
import { NavLink, useNavigate } from "react-router";
import { useNotes } from "../context/NoteContext";

const links = [
  { title: "All Notes", to: "/notes", icon: House },
  { title: "Archived", to: "/archived", icon: ArchiveRestoreIcon },
];

export default function NavbarDesktop() {
  const { notes } = useNotes();
  const navigate = useNavigate();

  const allTags = notes.flatMap((note) => note.tags ?? []);

  const handleFilter = (tagName: string) => {
    navigate(`/notes?tag=${tagName}`);
  };

  return (
    <div className="flex flex-col gap-4 h-screen">
      <div className="border-r-[2px]"></div>
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <NavLink
            className={({ isActive }) =>
              isActive
                ? " bg-gray-200 flex items-center rounded-[4px] p-3 gap-4 "
                : " flex items-center p-3 gap-4"
            }
            key={link.to}
            to={link.to}
          >
            <Icon />
            <h4>{link.title}</h4>
          </NavLink>
        );
      })}
      <Divider/>
      <div className="h-[70%] overflow-auto">
        {allTags.map((tag, index) => {
          const isExist = allTags?.some((t, i) => t.id === tag.id && i < index);
          if (isExist) return null;
          return (
            <div
              key={tag.id}
              className="flex items-center justify-between pr-3 overflow-auto "
            >
              <button
                onClick={() => handleFilter(tag.tagName)}
                className="flex items-center gap-2 focus:bg-gray-400 w-full p-3 rounded-[8px] focus:text-blue-900"
              >
                <Tag size={20} />
                <p>{tag.tagName}</p>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
