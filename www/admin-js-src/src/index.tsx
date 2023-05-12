import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "./icons/css/all.min.css";
import { AdminProvider } from "./context/AdminProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AdminProvider>
      <App />
    </AdminProvider>
  </React.StrictMode>
);
