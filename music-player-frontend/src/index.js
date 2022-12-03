import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import Routers from "./Router";
import { Provider } from "react-redux";
import store from "./StateManagement/store";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("Music"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routers />
      </Router>
    </Provider>
  </React.StrictMode>
);
