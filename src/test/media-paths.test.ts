import { describe, expect, it } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { films } from "@/data/films";
import { clientReels } from "@/components/ClientReelsSection";

/**
 * Deployment-safety rule: every video and poster must be served from this
 * site's own origin via an absolute root path that maps to a real file under
 * `public/`. Lovable CDN URLs (/__l5e/...) or remote URLs break on self-hosted
 * builds such as Netlify.
 */
const MEDIA_HOST_PREFIXES = ["/films/", "/client-reels/"];

const allFilms = [...films, ...clientReels];

describe("bundled media paths (deployment-safe)", () => {
  it("every film/reel uses an absolute local path under public/", () => {
    expect(allFilms.length).toBeGreaterThan(0);
    for (const film of allFilms) {
      expect(film.src, `${film.id} src`).toMatch(/^\/(films|client-reels)\//);
      expect(film.poster, `${film.id} poster`).toMatch(/^\/(films|client-reels)\//);
      for (const [kind, path] of [
        ["src", film.src],
        ["poster", film.poster],
      ] as const) {
        expect(
          MEDIA_HOST_PREFIXES.some((p) => path.startsWith(p)),
          `${film.id} ${kind} must stay under public/ media folders`,
        ).toBe(true);
      }
    }
  });

  it("every referenced media file exists under public/", () => {
    for (const film of allFilms) {
      // strip the leading "/" so paths join under public/ instead of resetting to root
      const rel = (p: string) => p.replace(/^\//, "");
      expect(existsSync(resolve("public", rel(film.src))), `${film.id} src file`).toBe(true);
      expect(existsSync(resolve("public", rel(film.poster))), `${film.id} poster file`).toBe(true);
    }
  });

  it("Netlify SPA fallback is present", () => {
    const redirects = readFileSync(resolve("public/_redirects"), "utf8");
    expect(redirects).toContain("/*    /index.html   200");
  });

  it("Netlify cache headers cover both media folders", () => {
    const headers = readFileSync(resolve("public/_headers"), "utf8");
    expect(headers).toContain("/films/*");
    expect(headers).toContain("/client-reels/*");
    expect(headers).toContain("immutable");
  });
});
