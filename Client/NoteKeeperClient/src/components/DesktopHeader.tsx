import { Settings } from "lucide-react";
import { Divider } from "./Divider";

function DesktopHeader() {
  return (
    <div>
      <div className="w-full h-[80px] flex p-6 pb-2 max-lg:hidden justify-between relative ">
        <h1 className="mt-3">All Notes</h1>
        <div className="flex gap-4 absolute right-20 ">
          <input
            type="text"
            className="border rounded-[4px] p-2 w-[300px] "
            placeholder="Search by title,content or tags"
          />
          <button>
            <Settings />
          </button>
        </div>
      </div>
      <div className="border-b-[2px] max-lg:hidden "></div>
    </div>
  );
}

export default DesktopHeader;
