import { useEffect, useRef } from "react";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

let scriptLoaded = false;
const loadScript = () =>
  new Promise<void>((resolve) => {
    if (scriptLoaded && window.instgrm) return resolve();
    const existing = document.querySelector<HTMLScriptElement>('script[src="//www.instagram.com/embed.js"]');
    if (existing) {
      existing.addEventListener("load", () => resolve());
      if (window.instgrm) resolve();
      return;
    }
    const s = document.createElement("script");
    s.src = "//www.instagram.com/embed.js";
    s.async = true;
    s.onload = () => {
      scriptLoaded = true;
      resolve();
    };
    document.body.appendChild(s);
  });

const InstagramEmbed = ({ url, className = "" }: { url: string; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    loadScript().then(() => {
      if (cancelled) return;
      window.instgrm?.Embeds.process();
    });
    return () => {
      cancelled = true;
    };
  }, [url]);

  return (
    <div ref={ref} className={className}>
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        style={{
          background: "#0A0A0A",
          border: 0,
          borderRadius: "12px",
          margin: 0,
          maxWidth: "540px",
          minWidth: "280px",
          width: "100%",
        }}
      >
        <a href={url} style={{ display: "none" }} aria-hidden />
      </blockquote>
    </div>
  );
};

export default InstagramEmbed;
