import { Outlet } from "react-router";
import { UseIsMobile } from "../hooks/UseIsMobile";
import DesktopSettingsLayout from "./DesktopSettingsLayout";

export default function SettingsLayout() {
  const isMobile = UseIsMobile();

  if (isMobile) {
    return <Outlet />;
  }
  return <DesktopSettingsLayout />;
}
