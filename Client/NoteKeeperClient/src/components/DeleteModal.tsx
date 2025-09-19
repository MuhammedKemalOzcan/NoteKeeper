import { Trash2Icon } from "lucide-react";
import { Divider } from "./Divider";
import { useNavigate, useParams } from "react-router";
import { useNotes } from "../context/NoteContext";

function DeleteModal() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { deleteNote } = useNotes();

  const handleDelete = async () => {
    await deleteNote(id);
    navigate("/notes");
  };

  return (
    <div className="modal">
      <div className="modal-container">
        <div className="flex w-full h-[50%] items-center gap-4">
          <div className="bg-gray-100 w-10 h-10 rounded-[8px] flex items-center justify-center ">
            <Trash2Icon />
          </div>
          <div className="flex flex-col gap-2">
            <h3>Delete Note</h3>
            <h5>
              Are you sure you want to permanently delete this note? <br /> This
              action cannot be undone.
            </h5>
          </div>
        </div>
        <Divider />
        <div className="flex justify-end gap-4 mt-10">
          <button
            onClick={() => navigate(`/notes`)}
            className="bg-gray-100 p-2 rounded-[8px]"
          >
            Cancel
          </button>
          <button
            onClick={() => handleDelete()}
            className="bg-red-400 p-2 rounded-[8px] text-white"
          >
            Delete Note
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
