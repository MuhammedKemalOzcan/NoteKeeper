import {
  House,
  LucideArchive,
  Search,
  SettingsIcon,
  TagIcon,
} from "lucide-react";
import { NavLink } from "react-router";

const links = [
  { title: "Home", to: "/notes", icon: House },
  { title: "Search", to: "/search", icon: Search },
  { title: "Archived", to: "/archived", icon: LucideArchive },
  { title: "Tags", to: "/tags", icon: TagIcon },
  { title: "Settings", to: "/settings", icon: SettingsIcon },
];

export default function NavbarMobile() {
  return (
      <div className="bottom-0 w-full h-20 flex justify-around items-center border-t p-3 lg:hidden bg-gray-200 ">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? " w-[25%] h-[80%] bg-blue-200 flex flex-col items-center justify-center rounded-[4px]"
                  : " w-[25%] h-[80%] flex flex-col items-center justify-center"
              }
              key={link.to}
              to={link.to}
            >
              <Icon color="black" size={24} />
              <p className="max-sm:hidden">{link.title}</p>
            </NavLink>
          );
        })}
      </div>
  );
}
