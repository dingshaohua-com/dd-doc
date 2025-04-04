import { createBrowserRouter } from "react-router";
import Root from "@/pages/root";
import { lazy } from "react";
// import Home from "@/pages/home";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        // path: "home",
        // Component: Home,
        Component: lazy(() => import("@/pages/book")),
      },
      {
        path: "detail",
        Component: lazy(() => import("@/pages/detail")),
      },
    ],
  },
]);

export default router;
