import { ArchiveRestoreIcon, Trash2 } from "lucide-react";

function NoteSettings() {
  return (
    <div className="p-4 border-l-[2px] h-screen w-full flex flex-col gap-3 whitespace-nowrap ">
      <button className="flex  gap-2 border border-gray p-4 rounded-[8px] w-full ">
        <ArchiveRestoreIcon />
        Archive Note
      </button>
      <button className="flex  gap-2 border border-gray p-4 rounded-[8px] w-full ">
        <Trash2 />
        Delete Note
      </button>
    </div>
  );
}

export default NoteSettings;
