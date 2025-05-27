import axios from "axios";
import { useEffect, useState } from "react";

type Notes = {
  id: number;
  title: string;
  description: string;
  createdDate: Date;
  updatedDate: Date;
};

export default function AllNotes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    async function fetchNotes() {
      const response = await axios.get("https://localhost:7001/api/Notes");
      console.log(response.data);
      setNotes(response.data);
    }
    fetchNotes();
  }, []);

  return (
    <div className="rounded-[12px] p-4 ">
      <h1 className="text-[29px] font-bold ">All Notes</h1>
      {/* {notes.map((note) => (
        <div key={note.id}>
          <p>{note.title}</p>
        </div>
      ))} */}
    </div>
  );
}
