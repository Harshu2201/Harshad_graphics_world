import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initAnalytics } from "@/lib/analytics";

initAnalytics();

// Apply the saved theme before first paint to avoid a flash.
try {
  const stored = localStorage.getItem("hp-theme");
  document.documentElement.classList.add(stored === "light" ? "light" : "dark");
} catch {
  document.documentElement.classList.add("dark");
}

createRoot(document.getElementById("root")!).render(<App />);
