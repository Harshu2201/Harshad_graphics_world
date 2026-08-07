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
    src: "/__l5e/assets-v1/31e9f5da-5e93-41bb-99a0-f07fa772389a/ai-film-1.mp4",
    poster: "/__l5e/assets-v1/dce9f94f-623b-4e11-9eb7-ba17d749a6eb/ai-film-1.jpg",
  },
  {
    id: "film-2",
    title: "Signal Drift",
    category: "Concept",
    description: "Concept film exploring motion, texture and AI-generated camera language.",
    src: "/__l5e/assets-v1/d3f0519a-cd34-4291-ad2f-1f32e947a39e/ai-film-2.mp4",
    poster: "/__l5e/assets-v1/264954bc-3bba-4e7e-9805-b227aa6e460c/ai-film-2.jpg",
  },
  {
    id: "film-3",
    title: "Brand Pulse",
    category: "Brand Reel",
    description: "Vertical brand reel built for Reels and Shorts distribution.",
    src: "/__l5e/assets-v1/980ce4e5-f77c-49b4-a116-31ef81cced23/ai-film-3.mp4",
    poster: "/__l5e/assets-v1/8bb3ec53-7401-45dc-8cea-ce241696a567/ai-film-3.jpg",
  },
  {
    id: "film-4",
    title: "Midnight Protocol",
    category: "Cinematic",
    description: "Story-led AI short with continuity-controlled shots and edit rhythm.",
    src: "/__l5e/assets-v1/dd71a50a-aae0-4b28-bfeb-bd113dc483f6/ai-film-4.mp4",
    poster: "/__l5e/assets-v1/9e1338d6-2901-488f-b664-b7f0ae948262/ai-film-4.jpg",
  },
  {
    id: "film-5",
    title: "Scroll Stopper",
    category: "Social Ad",
    description: "Performance-first creative designed to hook in the first two seconds.",
    src: "/__l5e/assets-v1/2730d273-12fb-4aac-9992-51aaf0100df7/ai-film-5.mp4",
    poster: "/__l5e/assets-v1/00af64df-8049-4352-9bdc-a6cd5c1b6784/ai-film-5.jpg",
  },
  {
    id: "film-6",
    title: "Chrome Dreams",
    category: "Concept",
    description: "Visual experiment in AI light, reflection and product-style motion.",
    src: "/__l5e/assets-v1/174265cf-c418-4e42-b90e-0d17c4dd3ebb/ai-film-6.mp4",
    poster: "/__l5e/assets-v1/8e472cb4-039b-4d56-9a85-035a9a48b841/ai-film-6.jpg",
  },
];

export const filmCategories: ("All" | FilmCategory)[] = [
  "All",
  "Cinematic",
  "Brand Reel",
  "Concept",
  "Social Ad",
];
