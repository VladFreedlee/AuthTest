import * as React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import { routerUrls } from "./routerUrls";
import { TablePage } from "../../pages/TablePage";
import App from "../../App";
import { withAuth } from "../../hocs/withAuth";
import { AuthPage } from "../../pages/AuthPage";

/* Страницы доступные только авторизованным пользователям */
const Table = withAuth({
  Component: TablePage,
});

/* Страницы доступные только неавторизованным пользователям */
const Login = withAuth({
  Component: AuthPage,
  forAuthorizedUser: false,
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: routerUrls.table.mask,
        element: <Table />,
      },
      {
        path: "*",
        element: <Navigate to={"/"} replace />,
      },
    ],
  },
]);

export default router;
