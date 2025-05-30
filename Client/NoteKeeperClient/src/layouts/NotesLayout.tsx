import { UseIsMobile } from "../hooks/UseIsMobile";
import DesktopLayout from "./DesktopLayout";
import MobileLayout from "./MobileLayout";

export default function NotesLayout() {
  const isMobile = UseIsMobile();
  if (isMobile) {
    return <MobileLayout />;
  }

  return <DesktopLayout />;
}
