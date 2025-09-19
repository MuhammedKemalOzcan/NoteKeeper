import { useState } from "react";
import { useNotes } from "../context/NoteContext";
import { NavLink } from "react-router";
import { dateFormater } from "../utils/format";

export default function Search() {
  const [input, setInput] = useState("");
  const { notes } = useNotes();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(input.toLowerCase()) ||
      note.description.toLowerCase().includes(input.toLowerCase()) 
      // note.tags.flatMap((tag) => tag.tagName.toLowerCase().includes(input))
  );
  console.log(filteredNotes);

  return (
    <div className="h-screen py-6 px-4 lg:hidden flex flex-col gap-4 ">
      <h1>Search</h1>
      <input
        type="text"
        className="border rounded-[4px] p-2 w-full "
        placeholder="Search by title,content or tags"
        value={input}
        onChange={handleSearch}
      />
      {input && (
        <h5>
          All notes matching <b>"{input}"</b> are displayed below.
        </h5>
      )}

      {input &&
        filteredNotes.map((note) => (
          <NavLink
            className="flex flex-col gap-4 p-3 lg:w-full "
            to={"/notes/" + note.id}
            key={note.id}
          >
            <h3 className="lg:text-left">{note.title}</h3>
            {note.createdDate && (
              <h6>{dateFormater.format(new Date(note.createdDate))}</h6>
            )}

            <div className="flex flex-wrap gap-4">
              {note.tags?.map((tag) => (
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
    </div>
  );
}
