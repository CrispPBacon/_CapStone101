import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { BrowserRouter as Router } from "react-router-dom";

import App from "./App.tsx";
import "./css/index.css";
import { AuthProvider } from "./context/AuthProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </StrictMode>
);
