import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './styles/Global.scss';
import { BrowserRouter } from "react-router";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
