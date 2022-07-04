import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GlobalServicesProvider } from "./context/globalServices";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalServicesProvider>
      <App />
    </GlobalServicesProvider>
  </React.StrictMode>
);
