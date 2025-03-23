import { Outlet } from "react-router-dom";
import "./App.css";
import * as React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Outlet />
    </Provider>
  );
};

export default App;
