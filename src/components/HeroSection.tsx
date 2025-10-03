import React, { useEffect, useMemo, useRef, useState } from "react";
import { Users, UserCircle, SearchCode, Ship, ChevronLeft, ChevronRight } from "lucide-react";

const HeroSection: React.FC = () => {
  // === Config ===
  const portalLinks = useMemo(
    () => [
      { icon: <Users className="w-5 h-5" />, title: "Consolmate", url: "https://consolmate.com/auth/login/10" },
      { icon: <UserCircle className="w-5 h-5" />, title: "Partner Portal", url: "https://pp.onlinetracking.co/auth/login/10" },
      { icon: <SearchCode className="w-5 h-5" />, title: "Tracking", url: "http://ec2-13-229-38-56.ap-southeast-1.compute.amazonaws.com:8081/ords/f?p=107:102:::::P0_GROUP_RID:195" },
      { icon: <Ship className="w-5 h-5" />, title: "Sailing Schedule", url: "http://ec2-13-229-38-56.ap-southeast-1.compute.amazonaws.com:8081/ords/f?p=107:104:::::P0_GROUP_RID:195" },
    ],
    []
  );

  const heroImages = useMemo(() => ["/oceanfreight.png", "/airfreight.png", "/truck.png"], []);
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState<boolean[]>(() => heroImages.map(() => false));
  const [autoPlay, setAutoPlay] = useState(true);
  const prefersReducedMotion = useRef<boolean>(
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ).current;

  // Preload images
  useEffect(() => {
    const imgs = heroImages.map((src, i) => {
      const img = new Image();
      img.src = src;
      img.onload = () => setLoaded((prev) => {
        const next = [...prev];
        next[i] = true;
        return next;
      });
      return img;
    });
    return () => {
      imgs.forEach((img) => (img.onload = null));
    };
  }, [heroImages]);

  // Autoplay
  useEffect(() => {
    if (prefersReducedMotion || !autoPlay) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(id);
  }, [heroImages.length, prefersReducedMotion, autoPlay]);

  // Pause on tab hidden
  useEffect(() => {
    const onVis = () => setAutoPlay(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const goNext = () => {
    setAutoPlay(false);
    setIndex((p) => (p + 1) % heroImages.length);
  };
  const goPrev = () => {
    setAutoPlay(false);
    setIndex((p) => (p - 1 + heroImages.length) % heroImages.length);
  };

  return (
    <section className="relative h-[100svh] w-full overflow-hidden">
      {/* Backdrop images */}
      <div className="absolute inset-0">
        {heroImages.map((src, i) => (
          <img
            key="/hero1.mp4"
            src="/hero1.mp4"
            alt={`Hero background ${i + 1}`}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-out
              ${i === index ? "opacity-100" : "opacity-0"}`}
            aria-hidden={i !== index}
            draggable={false}
            loading={i === 0 ? "eager" : "lazy"}
          />
        ))}
      </div>

      {/* Readability overlays */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

      {/* Content (kept minimal to stay “hero only”) */}
      <div className="relative z-10 h-full w-full">
        {/* Optional headline block — hide if you truly want only imagery + buttons */}
        <div className="absolute inset-x-0 top-20 mx-auto max-w-6xl px-6">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white drop-shadow">
            Global Freight. <span className="text-white/80">On Time. Every Time.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-white/80">
            Ocean • Air • Road • Integrated tracking & schedules.
          </p>
        </div>

        {/* Prev / Next arrows */}
        <button
          aria-label="Previous slide"
          onClick={goPrev}
          className="group absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/40 p-3 text-white backdrop-blur hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white/50"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          aria-label="Next slide"
          onClick={goNext}
          className="group absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/40 p-3 text-white backdrop-blur hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white/50"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-28 left-0 right-0 z-20 flex items-center justify-center gap-2">
          {heroImages.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => {
                setAutoPlay(false);
                setIndex(i);
              }}
              className={`h-2.5 w-2.5 rounded-full border border-white/60 transition
                ${i === index ? "bg-white" : "bg-white/30 hover:bg-white/50"}`}
            />
          ))}
        </div>

        {/* Buttons Bar */}
        <div className="absolute bottom-8 left-0 right-0 z-20">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 px-4 sm:grid-cols-4">
            {portalLinks.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white backdrop-blur-md transition hover:bg-white/15 hover:border-white/25"
              >
                <span className="rounded-full bg-white/20 p-2">{link.icon}</span>
                <span className="text-sm font-semibold">{link.title}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Soft vignette edges (subtle polish) */}
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />

      {/* Lazy state helper (optional): tiny shimmer while first image loads */}
      {!loaded[0] && (
        <div className="absolute inset-0 z-0 animate-pulse bg-neutral-900" aria-hidden />
      )}
    </section>
  );
};

export default HeroSection;
