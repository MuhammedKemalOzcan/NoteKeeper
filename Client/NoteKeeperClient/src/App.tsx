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

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
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
      { path: "settings", element: <Settings /> },
    ],
  },
  { path: "login", element: <Login /> },
  { path: "register", element: <Register /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
