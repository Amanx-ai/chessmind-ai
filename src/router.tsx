import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Analysis from "./pages/Analysis";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/analysis",
    element: <Analysis />,
  },
]);