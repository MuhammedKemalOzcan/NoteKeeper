import { Clock, Tag } from "lucide-react";
import { Divider } from "./Divider";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { useNotes } from "../context/NoteContext";

type NoteData = {
  title: string;
  description: string;
};

function CreateNote() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const navigate = useNavigate();
  const { addNote } = useNotes();

  const onSubmit: SubmitHandler<NoteData> = async (data) => {
    await addNote({
      title: data.title,
      description: data.description,
      isArchived: false,
    });
    navigate("/notes");
  };

  const handleClose = () => {
    navigate("/notes");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 border-r">
      <div className="flex flex-col gap-4">
        <div>
          <input
            {...register("title", {
              required: "Title Required",
              minLength: {
                value: 3,
                message: "Title must contain at least 3 characters",
              },
            })}
            type="text"
            placeholder="Enter a title"
            className="w-full active:none placeholder:text-[24px] placeholder:text-bold placeholder:text-black focus:outline-none"
          />
          <p className="text-red-300">{errors.title?.message}</p>
        </div>

        <div className="flex items-center gap-2">
          <Tag size={16} />
          <div className="flex gap-20 items-center">
            <h6>Tags</h6>
            <input
              className="placeholder:text-[14px] w-full focus:outline-none"
              type="text"
              placeholder="Add tags separated by commas (e.g. Work, Planning)"
            />
          </div>
        </div>
        <div className="gap-2 flex items-center">
          <Clock size={16} />
          <h6>Last Edited</h6>
          <h4 className="text-gray-400 ml-[45px] ">Not yet saved</h4>
        </div>
        <Divider />
        <div>
          <textarea
            {...register("description", {
              required: "Description Required",
              minLength: {
                value: 10,
                message: "description must contain at least 10 characters",
              },
            })}
            name="description"
            placeholder="Start typing your note here"
            className="h-[450px] w-full focus:outline-none "
          ></textarea>
          <p className="text-red-300">{errors.description?.message}</p>
        </div>
        <Divider />
        <div className="flex gap-4">
          <button type="submit" className="border p-2 rounded-xl bg-blue-500 text-white">
            Save Note
          </button>
          <button
            onClick={handleClose}
            className="border p-2 rounded-xl bg-gray-200 text-black"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}

export default CreateNote;
