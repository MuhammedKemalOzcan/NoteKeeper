import { ArchiveRestoreIcon, House, Tag, X } from "lucide-react";
import { Divider } from "./Divider";
import { NavLink } from "react-router";
import { useNotes } from "../context/NoteContext";

const links = [
  { title: "All Notes", to: "/notes", icon: House },
  { title: "Archived", to: "/archived", icon: ArchiveRestoreIcon },
];

export default function NavbarDesktop() {
  const { deleteTag, notes } = useNotes();

  const allTags = notes.flatMap((note) => note.tags);

  const handleDelete = async (id: string) => {
    await deleteTag(id);
  };

  return (
    <div className="flex flex-col gap-4 ">
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
      <Divider />
      <div>
        {allTags.map((tag, index) => {
          const isExist = allTags.some((t, i) => t.id === tag.id && i < index);
          if (isExist) return null;
          return (
            <div
              key={tag.id}
              className="flex items-center justify-between pr-3"
            >
              <button className="flex items-center gap-2 ">
                <Tag size={20} />
                <p>{tag.tagName}</p>
              </button>
              <button onClick={() => handleDelete(tag.id)}>
                <X size={15} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
