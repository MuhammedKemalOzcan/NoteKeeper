import { Outlet } from "react-router";

export default function MobileLayout() {
  return (
    <div className="dark:bg-[#0E121B] dark:text-white ">
      <Outlet />
    </div>
  );
}
