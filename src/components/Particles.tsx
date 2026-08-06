import { useEffect, useRef } from "react";

const Particles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    // Fewer particles and no shadow blur on small screens keeps mobile smooth.
    const isSmall = window.innerWidth < 768;
    const count = isSmall ? 24 : 55;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    let animationId = 0;
    let running = true;
    let last = 0;
    const frameInterval = 1000 / 30; // cap at 30fps — it's ambient decoration

    const particles = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0004,
      vy: (Math.random() - 0.5) * 0.0004,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.45 + 0.1,
      hue: [220, 270, 330][Math.floor(Math.random() * 3)],
    }));

    let w = 0;
    let h = 0;
    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 150);
    };
    window.addEventListener("resize", onResize);

    const animate = (t: number) => {
      animationId = requestAnimationFrame(animate);
      if (!running || t - last < frameInterval) return;
      last = t;

      ctx.clearRect(0, 0, w, h);
      ctx.shadowBlur = isSmall ? 0 : 12;
      for (const p of particles) {
        p.x = (p.x + p.vx + 1) % 1;
        p.y = (p.y + p.vy + 1) % 1;
        const color = `hsla(${p.hue}, 100%, 65%, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, p.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        if (!isSmall) ctx.shadowColor = color;
        ctx.fill();
      }
    };
    animationId = requestAnimationFrame(animate);

    // Stop burning CPU while the tab is hidden.
    const onVisibility = () => {
      running = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(animationId);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0" />;
};

export default Particles;
