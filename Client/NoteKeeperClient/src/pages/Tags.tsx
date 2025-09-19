import { Tag } from "lucide-react";
import { useNotes } from "../context/NoteContext";
import { useNavigate } from "react-router";

export default function Tags() {
  const { notes } = useNotes();
  const navigate = useNavigate();

  const allTags = notes.flatMap((note) => note.tags ?? []);

  const handleFilter = (tagName: string) => {
    navigate(`/notes?tag=${tagName}`);
  };

  return (
    <div className="h-screen lg:hidden p-4 flex flex-col gap-4 ">
      <h1 className="mb-3">Tags</h1>
      {allTags.map((tag, index) => {
        const isExist = allTags.some((t, i) => t.id === tag.id && i < index);
        if (isExist) return null;
        return (
          <button
            key={index}
            onClick={() => handleFilter(tag.tagName)}
            className="flex items-center gap-1 pb-2 border-b"
          >
            <Tag size={16} />
            <h4>{tag.tagName}</h4>
            <p className="border-b"></p>
          </button>
        );
      })}
    </div>
  );
}
