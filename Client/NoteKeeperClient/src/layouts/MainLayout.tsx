import { Outlet } from "react-router";
import NavbarMobile from "../components/NavbarMobile";
import Header from "../components/Header";

export default function MainLayout() {
  return (
    <div>
      <Header />
      <Outlet />
      <NavbarMobile />
    </div>
  );
}
