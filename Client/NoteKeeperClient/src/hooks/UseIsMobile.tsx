import { useEffect, useState } from "react";

export function UseIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkScreen = () => {
      if (window.innerWidth < 1024) {
        setIsMobile(true);
      } else setIsMobile(false);
    };
    checkScreen();
    console.log(isMobile);
    console.log(window.innerWidth);
    window.addEventListener("resize", checkScreen);
    return;
  }, [isMobile]);
  return isMobile;
}
