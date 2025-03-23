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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <AuthPage />,
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
