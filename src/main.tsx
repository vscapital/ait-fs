import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import LessonsPage from "./components/LessonsPage.tsx";
import "./i18n";
import { BrowserRouter } from "react-router-dom";

const base = import.meta.env.VITE_APP_BASE || "/";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter
      basename={base}
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <LessonsPage />
    </BrowserRouter>
  </StrictMode>,
);
