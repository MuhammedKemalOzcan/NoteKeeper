import { createBrowserRouter, RouterProvider } from "react-router";
import MainLayout from "./layouts/MainLayout";
import AllNotes from "./pages/AllNotes";
import Search from "./pages/Search";
import ArchivedNotes from "./pages/ArchivedNotes";
import Tags from "./pages/Tags";
import Settings from "./pages/Settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <AllNotes /> },
      { path: "home", element: <AllNotes /> },
      { path: "search", element: <Search /> },
      { path: "archived", element: <ArchivedNotes /> },
      { path: "tags", element: <Tags /> },
      { path: "settings", element: <Settings /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
