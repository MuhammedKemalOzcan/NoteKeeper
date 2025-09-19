import { Clock, Tag } from "lucide-react";
import type { Notes } from "../types/notes";
import ActionBar from "./ActionBar";
import { Divider } from "./Divider";
import { dateFormater } from "../utils/format";

interface Props {
  note?: Notes;
  type: "active" | "archived";
}

const DisplayNote = ({ note, type }: Props) => {
  return (
    <div className="p-4 pt-4 gap-4 w-full h-screen">
      <ActionBar type={type} />
      <div className="mt-4 whitespace-pre-line flex flex-col gap-4 h-[90%]">
        <h1>{note?.title}</h1>
        <div className="flex flex-col gap-4 ">
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <div className="flex gap-20 items-center">
              <h6>Last Edited</h6>
              {note && (
                <h6>{dateFormater.format(new Date(note?.updatedDate))}</h6>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Tag size={16} />
            <div className="flex gap-20 items-center">
              <h6>{note?.tags?.map((tag) => tag.tagName).join(", ")}</h6>
            </div>
          </div>
        </div>
        <Divider />
        <p>{note?.description}</p>
      </div>
      <Divider />
      {/* <div className="flex gap-4 py-4">
        <button className="bg-blue-500 p-2 rounded-[8px] text-white">
          <p>Save Note</p>
        </button>
        <button className="bg-gray-300 p-2 rounded-[8px]">
          <p>Cancel</p>
        </button>
      </div> */}
    </div>
  );
};

export default DisplayNote;
