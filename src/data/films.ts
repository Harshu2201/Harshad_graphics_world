import film1 from "@/assets/films/ai-film-1.mp4.asset.json";
import film1Poster from "@/assets/films/ai-film-1-poster.jpg.asset.json";
import film2 from "@/assets/films/ai-film-2.mp4.asset.json";
import film2Poster from "@/assets/films/ai-film-2-poster.jpg.asset.json";
import film3 from "@/assets/films/ai-film-3.mp4.asset.json";
import film3Poster from "@/assets/films/ai-film-3-poster.jpg.asset.json";
import film4 from "@/assets/films/ai-film-4.mp4.asset.json";
import film4Poster from "@/assets/films/ai-film-4-poster.jpg.asset.json";
import film5 from "@/assets/films/ai-film-5.mp4.asset.json";
import film5Poster from "@/assets/films/ai-film-5-poster.jpg.asset.json";

export type FilmCategory = "Brand Films" | "Commercials" | "Product Ads" | "UGC" | "Instagram Reels";

export const FILM_CATEGORIES: FilmCategory[] = [
  "Brand Films",
  "Commercials",
  "Product Ads",
  "UGC",
  "Instagram Reels",
];

export interface Film {
  id: string;
  title: string;
  description: string;
  category: FilmCategory;
  /** Self-hosted MP4 served from the CDN. */
  src?: string;
  poster?: string;
  /** Instagram permalink for reels that live on Instagram. */
  instagramUrl?: string;
}

export const films: Film[] = [
  {
    id: "film-1",
    title: "Neon Origins",
    description: "A cinematic brand film built end-to-end with AI generation, custom prompts and hand-crafted sound design.",
    category: "Brand Films",
    src: film1.url,
    poster: film1Poster.url,
  },
  {
    id: "film-2",
    title: "Signal Drift",
    description: "High-energy commercial spot cut for paid social — hook in the first second, payoff in five.",
    category: "Commercials",
    src: film2.url,
    poster: film2Poster.url,
  },
  {
    id: "film-3",
    title: "Product in Motion",
    description: "AI-generated product ad with photoreal lighting passes and a scroll-stopping vertical crop.",
    category: "Product Ads",
    src: film3.url,
    poster: film3Poster.url,
  },
  {
    id: "film-4",
    title: "Street Voice",
    description: "UGC-style creative that reads as authentic while being fully generated and directed.",
    category: "UGC",
    src: film4.url,
    poster: film4Poster.url,
  },
  {
    id: "film-5",
    title: "Afterglow",
    description: "Moody brand film exploring colour grade, camera language and generative continuity.",
    category: "Brand Films",
    src: film5.url,
    poster: film5Poster.url,
  },
  ...[
    "https://www.instagram.com/p/DaAyuGRoqFb/",
    "https://www.instagram.com/p/DaSf25HIYcc/",
    "https://www.instagram.com/p/C8tl7cWoH4e/",
    "https://www.instagram.com/p/DaSlrNtlJF8/",
    "https://www.instagram.com/p/DaXvvBJCvo9/",
    "https://www.instagram.com/p/DaNbvIgj-s_/",
    "https://www.instagram.com/p/DaIR0sBim57/",
    "https://www.instagram.com/p/DZryk3NtKYV/",
    "https://www.instagram.com/p/DaFqao-E-Ui/",
    "https://www.instagram.com/p/DZ7VzNLAAba/",
    "https://www.instagram.com/p/DZubIZIjj60/",
  ].map<Film>((url, i) => ({
    id: `reel-${i + 1}`,
    title: `AI Reel ${String(i + 1).padStart(2, "0")}`,
    description: "Published AI film on Instagram — direction, prompt engineering, edit and sound.",
    category: "Instagram Reels",
    instagramUrl: url,
  })),
];

export const featuredFilm = films[0];
