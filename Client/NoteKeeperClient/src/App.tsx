import { createBrowserRouter, RouterProvider } from "react-router";
import MainLayout from "./layouts/MainLayout";
import ArchivedLayout from "./layouts/ArchivedLayout";
import AllNotes from "./pages/AllNotes";
import Search from "./pages/Search";
import ArchivedNotes from "./pages/ArchivedNotes";
import Tags from "./pages/Tags";
import Settings from "./pages/Settings";
import NoteDetail from "./pages/NoteDetail";
import NotesLayout from "./layouts/NotesLayout";
import ArchivedNoteDetail from "./pages/ArchivedNoteDetail";
import CreateNote from "./components/CreateNote";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import ColorTheme from "./components/ColorTheme";
import SettingsLayout from "./layouts/SettingsLayout";
import FontTheme from "./components/FontTheme";
import ChangePassword from "./components/ChangePassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "notes",
        element: <NotesLayout />,
        children: [
          { index: true, element: <AllNotes /> },
          { path: ":id", element: <NoteDetail /> },
          { path: "create", element: <CreateNote /> },
        ],
      },
      {
        path: "archived",
        element: <ArchivedLayout />,
        children: [
          { index: true, element: <ArchivedNotes /> },
          { path: ":id", element: <ArchivedNoteDetail /> },
        ],
      },
      { path: "search", element: <Search /> },
      { path: "tags", element: <Tags /> },
      {
        path: "settings",
        element: <SettingsLayout />,
        children: [
          { index: true, element: <Settings /> },
          { path: "color-theme", element: <ColorTheme /> },
          { path: "font-theme", element: <FontTheme /> },
          { path: "change-password", element: <ChangePassword /> },
        ],
      },
    ],
  },
  { path: "login", element: <Login /> },
  { path: "register", element: <Register /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
