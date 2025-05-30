import { Clock, Tag } from "lucide-react";
import type { Notes } from "../types/notes";
import ActionBar from "./ActionBar";
import { Divider } from "./Divider";
import { dateFormater } from "../utils/format";

interface Props {
  note?: Notes;
}

const DisplayNote = ({ note }: Props) => {
  return (
    <div className="p-4 pt-4 gap-4 w-full ">
      <ActionBar />
      <div className="mt-4 whitespace-pre-line flex flex-col gap-4">
        <h1>{note?.title}</h1>
        <div className="flex flex-col gap-4 ">
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <div className="flex gap-20 items-center">
              <h6>Last Edited</h6>
              {note && (
                <h6>{dateFormater.format(new Date(note.updatedDate))}</h6>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Tag size={16} />
            <div className="flex gap-20 items-center">
              <h6>Tags</h6>
            </div>
          </div>
        </div>
        <Divider />
        <p>{note?.description}</p>
      </div>
    </div>
  );
};

export default DisplayNote;
