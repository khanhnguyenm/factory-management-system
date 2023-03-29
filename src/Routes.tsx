import React, { lazy, Suspense } from "react";
import { RouteObject } from "react-router";
import { Navigate } from "react-router-dom";
import SuspenseLoader from "./components/SuspenseLoader";
import MainLayout from "./layouts/MainLayout";

const Loader = (Component: any) => (props: any) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Dashboards
const Dashboard = Loader(lazy(() => import("../src/pages/dashboard")));
const HomePage = Loader(lazy(() => import("../src/pages/home")));
const Detail = Loader(lazy(() => import("../src/pages/detail")));
const Manufactories = Loader(lazy(() => import("../src/pages/manufactories")));

const routes: RouteObject[] = [
  {
    path: "",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "detail/:id",
        element: <Detail />,
      },
      {
        path: "manufactories",
        element: <Manufactories />,
      },
    ],
  },
  {
    path: "/*",
    element: <Navigate to="/" replace />,
  },
];

export { routes };
