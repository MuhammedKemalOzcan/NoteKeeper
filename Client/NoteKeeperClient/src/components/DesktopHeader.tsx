import { Settings } from "lucide-react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

function DesktopHeader() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login")
  }
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
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <div className="border-b-[2px] max-lg:hidden "></div>
    </div>
  );
}

export default DesktopHeader;
