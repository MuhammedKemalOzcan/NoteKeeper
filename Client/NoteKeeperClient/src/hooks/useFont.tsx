import { useEffect, useState } from "react";

export function useFont(): [string, (font: string) => void] {
  const [font, setFont] = useState(() => localStorage.getItem("font") || "inter");

  useEffect(() => {
    document.documentElement.classList.remove("font-inter", "font-poppins", "font-tektur");
    document.documentElement.classList.add(`font-${font}`);
    localStorage.setItem("font", font);
  }, [font]);

  return [font, setFont];
}
