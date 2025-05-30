import { ArchiveRestoreIcon, House } from "lucide-react";
import { Divider } from "./Divider";
import { NavLink } from "react-router";

const links = [
  { title: "All Notes", to: "/notes", icon: House },
  { title: "Archived", to: "/archived", icon: ArchiveRestoreIcon },
];

export default function NavbarDesktop() {
  return (
    <div className="flex flex-col gap-4 ">
      <div className="border-r-[2px]"></div>
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <NavLink
            className={({ isActive }) =>
              isActive
                ? " bg-gray-200 flex items-center rounded-[4px] p-3 gap-4 "
                : " flex items-center p-3 gap-4"
            }
            key={link.to}
            to={link.to}
          >
            <Icon />
            <h4>{link.title}</h4>
          </NavLink>
        );
      })}
      <Divider />
      <h4>Tags</h4>
    </div>
  );
}
