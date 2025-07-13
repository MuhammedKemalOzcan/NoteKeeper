import { ArrowLeftCircleIcon, Moon, SunMediumIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { useTheme } from "../hooks/useTheme";
import React, { useState } from "react";

export default function ColorTheme() {
  const navigate = useNavigate();
  const [theme, setTheme] = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme);

  const handleTheme = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedTheme) {
      setTheme(selectedTheme);
      console.log("Tema Değiştirildi:", theme);
    }
  };
  return (
    <div className="p-6 flex flex-col gap-4 lg:w-[50%]  ">
      <button
        onClick={() => navigate("/settings")}
        className="flex gap-3 lg:hidden "
      >
        <ArrowLeftCircleIcon /> Settings
      </button>
      <h1>Color Theme</h1>
      <h5>Choose your color theme:</h5>
      <form
        onSubmit={handleTheme}
        className="flex flex-col h-[72px] items-center gap-4 w-full"
      >
        <div
          onClick={() => setSelectedTheme("light")}
          className={`flex items-center gap-4 w-full relative border p-4 rounded-[14px]`}
        >
          <SunMediumIcon />
          <div className="flex flex-col gap-2">
            <h4>Light Mode</h4>
            <h6>Pick a clean and classic light theme</h6>
          </div>
          <input
            name="theme"
            value="light-mode"
            className="flex absolute right-5"
            type="radio"
          />
        </div>
        <div
          onClick={() => setSelectedTheme("dark")}
          className="flex items-center gap-4 w-full relative border p-4 rounded-[14px]"
        >
          <Moon />
          <div className="flex flex-col gap-2">
            <h4>Dark Mode</h4>
            <h6>Select a sleek and modern dark theme</h6>
          </div>
          <input
            name="theme"
            value="dark-mode"
            className="flex absolute right-5"
            type="radio"
          />
        </div>
        <input
          className="bg-blue-500 p-2 rounded-[12px] text-white flex self-end"
          type="submit"
          value="Apply Changes"
        />
      </form>
    </div>
  );
}
