import { createBrowserRouter } from 'react-router';
import Root from '@/pages/root';
import { lazy } from 'react';
// import Home from "@/pages/home";

const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      {
        index: true,
        // path: "home",
        // Component: Home,
        Component: lazy(() => import('@/pages/home')),
      },
      
      {
        path: "/login",
        Component: lazy(() => import('@/pages/login')),
      },
      {
        path: "/shelf",
        Component: lazy(() => import('@/pages/shelf')),
      },
      {
        
        path: 'book',
        Component: lazy(() => import('@/pages/book')),
      },
    ],
  },
]);

export default router;
