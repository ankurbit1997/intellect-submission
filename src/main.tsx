import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import One from "./page/One";
import Two from "./page/Two";

const router = createBrowserRouter([
  {
    path: "/",
    element: <One />,
  },
  {
    path: "/2",
    element: <Two />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
