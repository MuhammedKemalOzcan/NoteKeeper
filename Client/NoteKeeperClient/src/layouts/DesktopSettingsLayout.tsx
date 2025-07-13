import { useLocation } from "react-router";
import ColorTheme from "../components/ColorTheme";
import Settings from "../pages/Settings";
import FontTheme from "../components/FontTheme";

export default function DesktopSettingsLayout() {
  const location = useLocation();
  const isColor = location.pathname.includes("color");
  const isFont = location.pathname.includes("font");
  return (
    <div className="h-full w-full flex">
      <Settings />
      {isColor && <ColorTheme />}
      {isFont && <FontTheme />}
    </div>
  );
}
