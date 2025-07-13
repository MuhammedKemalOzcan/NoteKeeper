import { ALargeSmall, LockKeyholeIcon, LogOut, Sun } from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import { Divider } from "../components/Divider";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../hooks/useTheme";

export default function Settings() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [theme] = useTheme();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      className={`flex h-screen lg:w-[25%]`}
    >
      <div className="flex flex-col gap-4 m-4 w-full lg:w-full ">
        <h1>Settings</h1>
        <NavLink to={"color-theme"} className="flex items-center gap-2">
          <Sun />
          <h3>Color Theme</h3>
        </NavLink>
        <NavLink to={"font-theme"} className="flex items-center gap-2">
          <ALargeSmall />
          <h3>Font Theme</h3>
        </NavLink>
        <NavLink to={"change-password"} className="flex items-center gap-2">
          <LockKeyholeIcon />
          <h3>Change Password</h3>
        </NavLink>
        <Divider />
        <button onClick={handleLogout} className="flex items-center gap-2">
          <LogOut />
          <h3>Logout</h3>
        </button>
      </div>
      <div className="lg:border dark:border-[#232530]"></div>
    </div>
  );
}
