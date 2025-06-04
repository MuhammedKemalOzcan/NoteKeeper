import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { NoteContextProvider } from "./context/NoteContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NoteContextProvider>
      <App />
    </NoteContextProvider>
  </StrictMode>
);
