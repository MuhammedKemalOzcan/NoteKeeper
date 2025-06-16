import { Outlet } from "react-router";
import NavbarMobile from "../components/NavbarMobile";
import Header from "../components/Header";
import NavbarDesktop from "../components/NavbarDesktop";
import { UseIsMobile } from "../hooks/UseIsMobile";
import DesktopHeader from "../components/DesktopHeader";

export default function MainLayout() {
  const isMobile = UseIsMobile();

  return (
    <div className="lg:flex lg:p-3 w-full">
      <div className="lg:w-[20%] lg:h-screen border-r-2">
        <Header />
        {!isMobile && <NavbarDesktop />}
      </div>
      <div id="outlet" className="w-full">
        <DesktopHeader />
        <Outlet />
      </div>
      {isMobile && <NavbarMobile />}
    </div>
  );
}
