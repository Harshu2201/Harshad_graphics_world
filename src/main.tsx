import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initAnalytics } from "@/lib/analytics";

initAnalytics();

// Apply the saved theme before first paint to avoid a flash.
try {
  const stored = localStorage.getItem("hp-theme");
  document.documentElement.classList.add(stored === "dark" ? "dark" : "light");
} catch {
  document.documentElement.classList.add("light");
}

createRoot(document.getElementById("root")!).render(<App />);
