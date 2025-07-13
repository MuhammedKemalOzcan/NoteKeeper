import { ALargeSmall, ArrowLeftCircleIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { useFont } from "../hooks/useFont";
import { useState } from "react";

export default function FontTheme() {
  const navigate = useNavigate();
  const [font, setFont] = useFont();
  const [selectedFont, setSelectedFont] = useState(font);

  const handleFont = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedFont) {
      setFont(selectedFont);
      console.log("Font Değiştirildi:", font);
    }
  };
  return (
    <div className="p-6 flex flex-col gap-4 lg:w-[50%] ">
      <button
        onClick={() => navigate("/settings")}
        className="flex gap-3 lg:hidden "
      >
        <ArrowLeftCircleIcon /> Settings
      </button>
      <h1>Color Theme</h1>
      <h5>Choose your color theme:</h5>
      <form
        onSubmit={handleFont}
        className="flex flex-col h-[72px] items-center gap-4 w-full"
      >
        <div
          onClick={() => setSelectedFont("inter")}
          className="flex items-center gap-4 w-full relative border p-4 rounded-[14px] active:bg-gray-100 "
        >
          <ALargeSmall />
          <div className="flex flex-col gap-2">
            <h4>Inter</h4>
            <h6>Clean and modern, easy to read.</h6>
          </div>
          <input
            name="theme"
            value="light-mode"
            className="flex absolute right-5"
            type="radio"
          />
        </div>
        <div
          onClick={() => setSelectedFont("poppins")}
          className="flex items-center gap-4 w-full relative border p-4 rounded-[14px] active:bg-gray-100 "
        >
          <ALargeSmall />
          <div className="flex flex-col gap-2">
            <h4>Poppins</h4>
            <h6>Classic and elegant for a timeless feel.</h6>
          </div>
          <input
            name="theme"
            value="dark-mode"
            className="flex absolute right-5"
            type="radio"
          />
        </div>
        <div
          onClick={() => setSelectedFont("tektur")}
          className="flex items-center gap-4 w-full relative border p-4 rounded-[14px] active:bg-gray-100 "
        >
          <ALargeSmall />
          <div className="flex flex-col gap-2">
            <h4>Tektur</h4>
            <h6>Code-like, great for a technical vibe.</h6>
          </div>
          <input
            name="theme"
            value="dark-mode"
            className="flex absolute right-5"
            type="radio"
          />
        </div>
        <button
          className="bg-blue-500 p-2 rounded-[12px] text-white flex self-end"
          type="submit"
        >
          Apply Changes
        </button>
      </form>
    </div>
  );
}
