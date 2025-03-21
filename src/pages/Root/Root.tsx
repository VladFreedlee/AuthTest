import * as React from "react";
import { RouterProvider } from "react-router-dom";
import router from "../../configs/routes/router";

const Root = (): React.ReactElement => {
  return <RouterProvider router={router} />;
};

export default Root;
