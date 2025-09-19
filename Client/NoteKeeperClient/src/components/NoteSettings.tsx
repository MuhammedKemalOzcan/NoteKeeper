import { Archive, RefreshCcw, Trash2 } from "lucide-react";
import { useNotes } from "../context/NoteContext";
import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import DeleteModal from "./DeleteModal";

interface Props {
  type?: "active" | "archived";
}

function NoteSettings({ type }: Props) {
  const [isClicked, setIsClicked] = useState(false);
  const { deleteNote, patchNote } = useNotes();
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    setIsClicked(true);
  };

  const handleArchive = async () => {
    await patchNote(id, true);
    navigate("/archived");
  };

  const handleRestore = async () => {
    await patchNote(id, false);
    navigate("/notes");
  };

  return (
    <div className="p-4 border-l-[2px] dark:border-[#232530] h-screen w-full flex flex-col gap-3 whitespace-nowrap ">
      {type == "active" ? (
        <button
          onClick={handleArchive}
          className="flex  gap-2 border border-gray dark:border-[#232530] p-4 rounded-[8px] w-full "
        >
          <Archive />
          Archive Note
        </button>
      ) : (
        <button
          onClick={handleRestore}
          className="flex  gap-2 border border-gray dark:border-[#232530] p-4 rounded-[8px] w-full "
        >
          <RefreshCcw />
          Restore Note
        </button>
      )}

      <button
        onClick={handleDelete}
        className="flex  gap-2 border border-gray dark:border-[#232530] p-4 rounded-[8px] w-full "
      >
        <Trash2 />
        Delete Note
      </button>
      {isClicked === true && <DeleteModal />}
    </div>
  );
}

export default NoteSettings;
