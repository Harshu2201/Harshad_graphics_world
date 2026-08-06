/**
 * Lightweight, opt-in analytics layer.
 *
 * Nothing loads unless the matching environment variable is present, so the
 * site stays fast and privacy-friendly by default. Supported vars:
 *
 *   VITE_GA4_ID          e.g. G-XXXXXXXXXX  (or the Lovable GA connector var)
 *   VITE_GTM_ID          e.g. GTM-XXXXXXX
 *   VITE_META_PIXEL_ID   e.g. 1234567890
 *   VITE_CLARITY_ID      e.g. abcdefghij
 */

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: ((...args: unknown[]) => void) & { queue?: unknown[]; loaded?: boolean; version?: string; push?: unknown };
    _fbq?: unknown;
    clarity?: (...args: unknown[]) => void;
  }
}

const env = import.meta.env as Record<string, string | undefined>;

const GA4_ID = env.VITE_GA4_ID || env.VITE_LOVABLE_CONNECTOR_GOOGLE_ANALYTICS_API_KEY || "";
const GTM_ID = env.VITE_GTM_ID || "";
const META_PIXEL_ID = env.VITE_META_PIXEL_ID || "";
const CLARITY_ID = env.VITE_CLARITY_ID || "";

const injectScript = (src: string, attrs: Record<string, string> = {}) => {
  if (document.querySelector(`script[src="${src}"]`)) return;
  const s = document.createElement("script");
  s.src = src;
  s.async = true;
  Object.entries(attrs).forEach(([k, v]) => s.setAttribute(k, v));
  document.head.appendChild(s);
};

let initialised = false;

export const initAnalytics = () => {
  if (initialised || typeof window === "undefined") return;
  initialised = true;

  window.dataLayer = window.dataLayer || [];
  const gtag = (...args: unknown[]) => {
    window.dataLayer!.push(args);
  };
  window.gtag = window.gtag || gtag;

  if (GA4_ID) {
    injectScript(`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`);
    gtag("js", new Date());
    gtag("config", GA4_ID, { anonymize_ip: true });
  }

  if (GTM_ID) {
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
    injectScript(`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`);
  }

  if (META_PIXEL_ID && !window.fbq) {
    const fbq: Window["fbq"] = function (...args: unknown[]) {
      // eslint-disable-next-line prefer-rest-params
      (fbq!.queue as unknown[]).push(args);
    } as NonNullable<Window["fbq"]>;
    fbq.queue = [];
    fbq.loaded = true;
    fbq.version = "2.0";
    window.fbq = fbq;
    window._fbq = fbq;
    injectScript("https://connect.facebook.net/en_US/fbevents.js");
    fbq("init", META_PIXEL_ID);
    fbq("track", "PageView");
  }

  if (CLARITY_ID) {
    const c = (...args: unknown[]) => {
      ((c as unknown as { q: unknown[] }).q = (c as unknown as { q?: unknown[] }).q || []).push(args);
    };
    window.clarity = window.clarity || (c as (...a: unknown[]) => void);
    injectScript(`https://www.clarity.ms/tag/${CLARITY_ID}`);
  }

  trackScrollDepth();
};

/** Fire a custom event to every configured destination. */
export const track = (event: string, params: Params = {}) => {
  if (typeof window === "undefined") return;
  window.gtag?.("event", event, params);
  window.dataLayer?.push({ event, ...params });
  window.fbq?.("trackCustom", event, params);
  if (import.meta.env.DEV) console.debug("[analytics]", event, params);
};

/** Scroll-depth milestones: 25 / 50 / 75 / 100 %. */
const trackScrollDepth = () => {
  const milestones = [25, 50, 75, 100];
  const fired = new Set<number>();
  let queued = false;

  const measure = () => {
    queued = false;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollable <= 0) return;
    const pct = Math.round((window.scrollY / scrollable) * 100);
    for (const m of milestones) {
      if (pct >= m && !fired.has(m)) {
        fired.add(m);
        track("scroll_depth", { percent: m });
      }
    }
    if (fired.size === milestones.length) window.removeEventListener("scroll", onScroll);
  };

  const onScroll = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(measure);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
};
