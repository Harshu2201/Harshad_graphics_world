# AGENTS.md

- All videos and posters (AI films, client reels) are real files under `public/films/` and `public/client-reels/`, referenced by absolute paths (`/films/...`, `/client-reels/...`) — why: the site must serve all media from its own origin so self-hosted builds (e.g. Netlify) work without Lovable's asset CDN; never re-point them at `/__l5e/assets-v1/` URLs.
- `public/_redirects` contains the SPA fallback (`/* /index.html 200`) — why: deep links like `/client-reels` and `/contact` must work on static hosts that don't have built-in SPA routing; keep it when adding routes.
