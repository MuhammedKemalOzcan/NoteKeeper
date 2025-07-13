import { Settings } from "lucide-react";
import { useNavigate } from "react-router";

function DesktopHeader() {
  const navigate = useNavigate();
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
          <button onClick={() => navigate("/settings")}>
            <Settings />
          </button>
        </div>
      </div>
      <div className="border-b-[2px] dark:border-[#232530] max-lg:hidden "></div>
    </div>
  );
}

export default DesktopHeader;
