import { Archive, StepBack, Trash2 } from "lucide-react";

export default function ActionBar() {
  return (
    <div className="flex justify-between lg:hidden border-b-[2px] p-4 ">
        <button className="flex">
          <StepBack /> Go Back
        </button>
        <div className="flex gap-4">
          <button>
            <Trash2 />
          </button>
          <button>
            <Archive />
          </button>
          <button className="text-red-500">Cancel</button>
          <button className="text-[#335CFF]">Save Note</button>
        </div>
    </div>
  );
}
