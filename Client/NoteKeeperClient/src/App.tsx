import { createBrowserRouter, RouterProvider } from "react-router";
import MainLayout from "./layouts/MainLayout";
import AllNotes from "./pages/AllNotes";
import Search from "./pages/Search";
import ArchivedNotes from "./pages/ArchivedNotes";
import Tags from "./pages/Tags";
import Settings from "./pages/Settings";
import NoteDetail from "./pages/NoteDetail";
import NotesLayout from "./layouts/NotesLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <AllNotes /> },
      {
        path: "notes",
        element: <NotesLayout />,
        children: [
          { index: true, element: <AllNotes /> },
          { path: ":id", element: <NoteDetail /> },
        ],
      },
      { path: "archived", element: <ArchivedNotes /> },
      { path: "search", element: <Search /> },
      { path: "tags", element: <Tags /> },
      { path: "settings", element: <Settings /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
