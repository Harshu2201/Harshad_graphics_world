import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initAnalytics } from "@/lib/analytics";

initAnalytics();

// Every new visit begins in the clean light theme. Visitors can still switch
// theme for the current page session using the navbar control.
document.documentElement.classList.remove("dark");
document.documentElement.classList.add("light");

createRoot(document.getElementById("root")!).render(<App />);
