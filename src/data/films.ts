export type FilmCategory = "Cinematic" | "Brand Reel" | "Concept" | "Social Ad";

export interface Film {
  id: string;
  title: string;
  category: FilmCategory;
  description: string;
  src: string;
  poster: string;
}

/** Self-hosted, web-optimised AI films (H.264, faststart) served from the CDN. */
export const films: Film[] = [
  {
    id: "film-1",
    title: "Neon Horizon",
    category: "Cinematic",
    description: "Prompt-directed cinematic sequence with custom grade and sound design.",
    src: "/films/ai-film-1.mp4",
    poster: "/films/ai-film-1.jpg",
  },
  {
    id: "film-2",
    title: "Signal Drift",
    category: "Concept",
    description: "Concept film exploring motion, texture and AI-generated camera language.",
    src: "/films/ai-film-2.mp4",
    poster: "/films/ai-film-2.jpg",
  },
  {
    id: "film-3",
    title: "Brand Pulse",
    category: "Brand Reel",
    description: "Vertical brand reel built for Reels and Shorts distribution.",
    src: "/films/ai-film-3.mp4",
    poster: "/films/ai-film-3.jpg",
  },
  {
    id: "film-4",
    title: "Midnight Protocol",
    category: "Cinematic",
    description: "Story-led AI short with continuity-controlled shots and edit rhythm.",
    src: "/films/ai-film-4.mp4",
    poster: "/films/ai-film-4.jpg",
  },
  {
    id: "film-5",
    title: "Scroll Stopper",
    category: "Social Ad",
    description: "Performance-first creative designed to hook in the first two seconds.",
    src: "/films/ai-film-5.mp4",
    poster: "/films/ai-film-5.jpg",
  },
  {
    id: "film-6",
    title: "Chrome Dreams",
    category: "Concept",
    description: "Visual experiment in AI light, reflection and product-style motion.",
    src: "/films/ai-film-6.mp4",
    poster: "/films/ai-film-6.jpg",
  },
  {
    id: "film-7",
    title: "Signal Bloom",
    category: "Brand Reel",
    description: "Vertical brand film with AI-generated environments and kinetic titling.",
    src: "/films/ai-film-7.mp4",
    poster: "/films/ai-film-7.jpg",
  },
];


export const filmCategories: ("All" | FilmCategory)[] = [
  "All",
  "Cinematic",
  "Brand Reel",
  "Concept",
  "Social Ad",
];
