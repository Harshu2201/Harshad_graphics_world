import aiFilm1Mp4 from "@/assets/films/ai-film-1.mp4.asset.json";
import aiFilm1Jpg from "@/assets/films/ai-film-1.jpg.asset.json";
import aiFilm2Mp4 from "@/assets/films/ai-film-2.mp4.asset.json";
import aiFilm2Jpg from "@/assets/films/ai-film-2.jpg.asset.json";
import aiFilm3Mp4 from "@/assets/films/ai-film-3.mp4.asset.json";
import aiFilm3Jpg from "@/assets/films/ai-film-3.jpg.asset.json";
import aiFilm4Mp4 from "@/assets/films/ai-film-4.mp4.asset.json";
import aiFilm4Jpg from "@/assets/films/ai-film-4.jpg.asset.json";
import aiFilm5Mp4 from "@/assets/films/ai-film-5.mp4.asset.json";
import aiFilm5Jpg from "@/assets/films/ai-film-5.jpg.asset.json";
import aiFilm6Mp4 from "@/assets/films/ai-film-6.mp4.asset.json";
import aiFilm6Jpg from "@/assets/films/ai-film-6.jpg.asset.json";
import aiFilm7Mp4 from "@/assets/films/ai-film-7.mp4.asset.json";
import aiFilm7Jpg from "@/assets/films/ai-film-7.jpg.asset.json";

export type FilmCategory = "Cinematic" | "Brand Reel" | "Concept" | "Social Ad";

export interface Film {
  id: string;
  title: string;
  category: FilmCategory;
  description: string;
  src: string;
  poster: string;
}

/** CDN-hosted, web-optimised AI films (H.264, faststart) served from Lovable Assets. */
export const films: Film[] = [
  {
    id: "film-1",
    title: "Neon Horizon",
    category: "Cinematic",
    description: "Prompt-directed cinematic sequence with custom grade and sound design.",
    src: aiFilm1Mp4.url,
    poster: aiFilm1Jpg.url,
  },
  {
    id: "film-2",
    title: "Signal Drift",
    category: "Concept",
    description: "Concept film exploring motion, texture and AI-generated camera language.",
    src: aiFilm2Mp4.url,
    poster: aiFilm2Jpg.url,
  },
  {
    id: "film-3",
    title: "Brand Pulse",
    category: "Brand Reel",
    description: "Vertical brand reel built for Reels and Shorts distribution.",
    src: aiFilm3Mp4.url,
    poster: aiFilm3Jpg.url,
  },
  {
    id: "film-4",
    title: "Midnight Protocol",
    category: "Cinematic",
    description: "Story-led AI short with continuity-controlled shots and edit rhythm.",
    src: aiFilm4Mp4.url,
    poster: aiFilm4Jpg.url,
  },
  {
    id: "film-5",
    title: "Scroll Stopper",
    category: "Social Ad",
    description: "Performance-first creative designed to hook in the first two seconds.",
    src: aiFilm5Mp4.url,
    poster: aiFilm5Jpg.url,
  },
  {
    id: "film-6",
    title: "Chrome Dreams",
    category: "Concept",
    description: "Visual experiment in AI light, reflection and product-style motion.",
    src: aiFilm6Mp4.url,
    poster: aiFilm6Jpg.url,
  },
  {
    id: "film-7",
    title: "Signal Bloom",
    category: "Brand Reel",
    description: "Vertical brand film with AI-generated environments and kinetic titling.",
    src: aiFilm7Mp4.url,
    poster: aiFilm7Jpg.url,
  },
];


export const filmCategories: ("All" | FilmCategory)[] = [
  "All",
  "Cinematic",
  "Brand Reel",
  "Concept",
  "Social Ad",
];
