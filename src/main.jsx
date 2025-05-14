import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./style/app.css"; // Import CSS
import { StrictMode } from "react"; // Import StrictMode

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
