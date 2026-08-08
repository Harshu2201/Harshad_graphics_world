/**
 * Analytics layer: GA4 (gtag.js), Google Tag Manager and Microsoft Clarity.
 * IDs come from environment variables so they can differ per environment.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

const env = import.meta.env as Record<string, string | undefined>;

export const GA4_ID = env.VITE_GA4_MEASUREMENT_ID ?? "G-E334NFPNCH";
export const GTM_ID = env.VITE_GTM_CONTAINER_ID ?? "";
export const CLARITY_ID = env.VITE_CLARITY_PROJECT_ID ?? "";

const isBrowser = typeof window !== "undefined";

function pushDataLayer(event: string, params: Record<string, unknown>) {
  if (!isBrowser) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

/** Fire an event to GA4, GTM's dataLayer and Clarity at once. */
export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (!isBrowser) return;
  window.gtag?.("event", name, params);
  pushDataLayer(name, params);
  window.clarity?.("event", name);
}

export const trackButtonClick = (label: string, location?: string) =>
  trackEvent("button_click", { button_label: label, section: location });

export const trackCtaConversion = (label: string, destination?: string) =>
  trackEvent("cta_conversion", { cta_label: label, destination });

export const trackWhatsAppClick = (source: string) =>
  trackEvent("whatsapp_click", { source, channel: "whatsapp" });

export const trackFormSubmit = (formName: string, status: "success" | "error", reason?: string) =>
  trackEvent("form_submit", { form_name: formName, status, reason });

export const trackVideoPlay = (title: string, category?: string) =>
  trackEvent("video_play", { video_title: title, video_category: category });

export const trackPageView = (path: string) =>
  trackEvent("page_view", { page_path: path, page_title: document.title });

function loadScript(src: string) {
  const s = document.createElement("script");
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

function initGa4() {
  if (!GA4_ID) return;
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = (...args: unknown[]) => {
      window.dataLayer!.push(args);
    };
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`);
    window.gtag("js", new Date());
    window.gtag("config", GA4_ID);
  } else if (env.VITE_GA4_MEASUREMENT_ID && env.VITE_GA4_MEASUREMENT_ID !== "G-E334NFPNCH") {
    // Static snippet configured a different property: also configure the env one.
    window.gtag("config", GA4_ID);
  }
}

function initGtm() {
  if (!GTM_ID) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
  loadScript(`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`);
}

function initClarity() {
  if (!CLARITY_ID) return;
  window.clarity =
    window.clarity ||
    function (...args: unknown[]) {
      (window.clarity as unknown as { q: unknown[][] }).q =
        (window.clarity as unknown as { q?: unknown[][] }).q || [];
      (window.clarity as unknown as { q: unknown[][] }).q.push(args);
    };
  loadScript(`https://www.clarity.ms/tag/${CLARITY_ID}`);
}

/** Fires scroll_depth once per 25% threshold. */
function initScrollDepth() {
  const thresholds = [25, 50, 75, 90, 100];
  const fired = new Set<number>();
  let queued = false;

  const measure = () => {
    queued = false;
    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - window.innerHeight;
    if (scrollable <= 0) return;
    const percent = Math.min(100, Math.round(((window.scrollY || 0) / scrollable) * 100));
    for (const t of thresholds) {
      if (percent >= t && !fired.has(t)) {
        fired.add(t);
        trackEvent("scroll_depth", { percent_scrolled: t });
      }
    }
    if (fired.size === thresholds.length) window.removeEventListener("scroll", onScroll);
  };

  const onScroll = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(measure);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  measure();
}

let started = false;

export function initAnalytics() {
  if (!isBrowser || started) return;
  started = true;
  initGa4();
  initGtm();
  initClarity();
  initScrollDepth();
}
