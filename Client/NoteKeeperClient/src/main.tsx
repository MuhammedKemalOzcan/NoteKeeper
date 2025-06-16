import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { NoteContextProvider } from "./context/NoteContext.tsx";
import { AuthContextProvider } from "./context/AuthContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthContextProvider>
      <NoteContextProvider>
        <App />
      </NoteContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
