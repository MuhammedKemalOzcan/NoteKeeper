import { UseIsMobile } from "../hooks/UseIsMobile";
import DesktopArchivedLayout from "./DesktopArchivedLayout";
import MobileLayout from "./MobileLayout";

export default function NotesLayout() {
  const isMobile = UseIsMobile();
  if (isMobile) {
    return <MobileLayout />;
  }

  return <DesktopArchivedLayout />;
}
