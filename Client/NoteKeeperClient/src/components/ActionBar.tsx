import { Archive, RefreshCcw, StepBack, Trash2 } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { useNotes } from "../context/NoteContext";

interface Props {
  type: "active" | "archived";
}

export default function ActionBar({ type }: Props) {
  const { deleteNote, patchNote } = useNotes();
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);

  const handleDelete = async () => {
    await deleteNote(id);
    navigate("/notes");
  };

  const handleArchive = async () => {
    await patchNote(id, true);
    navigate("/notes");
  };

  const handleRestore = async () => {
    await patchNote(id, false);
    navigate("/notes");
  };

  return (
    <div className="flex justify-between lg:hidden border-b-[2px] p-4 ">
      <button onClick={() => navigate("/notes")} className="flex">
        <StepBack /> Go Back
      </button>
      <div className="flex gap-4">
        <button onClick={handleDelete}>
          <Trash2 />
        </button>
        {type == "active" ? (
          <button onClick={handleArchive}>
            <Archive />
          </button>
        ) : (
          <button onClick={handleRestore}>
            <RefreshCcw />
          </button>
        )}
      </div>
    </div>
  );
}
