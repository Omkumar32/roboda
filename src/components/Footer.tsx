"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { Settings } from "lucide-react";
import Social3DButtons from "./Social3DButtons";
import { usePortfolio } from "@/context/PortfolioDataContext";

export default function Footer() {
  const { data } = usePortfolio();
  const about = data?.about;
  const [currentYear, setCurrentYear] = React.useState(2026);

  // Mouse tracking for interactive spotlight glow effect
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const marqueeRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!marqueeRef.current) return;
    const rect = marqueeRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <footer className="w-full bg-[#E8E5DA] border-t border-[#D3D0C6] py-10 sm:py-12 px-4 sm:px-8 md:px-12 text-[#22221F]">
      <div className="max-w-7xl mx-auto flex flex-col justify-between gap-8">
        {/* Top Row: Brand & Socials */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-[#D3D0C6]">
          <div>
            <span className="text-2xl sm:text-3xl font-bold tracking-[0.25em] uppercase text-[#22221F]">
              {about?.authorName ? `${about.monogram || ""}${about.authorName.slice(1).toLowerCase()}` : "अnurag"}
            </span>
            <p className="text-xs sm:text-sm text-[#77766F] mt-1 tracking-wider uppercase font-medium">
              {about?.subtitle || "Cinematographer & Visual Storyteller"}
            </p>
          </div>

          <div className="flex items-center">
            <Social3DButtons />
          </div>
        </div>

        {/* ===================================================================== */}
        {/* Giant Interactive Futuristic Typography: IVΛN ROBOTS ΛNURΛG with Cursor Glow (Seamless, No Box) */}
        {/* ===================================================================== */}
        <div
          ref={marqueeRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="group relative w-full py-8 sm:py-14 md:py-16 px-2 sm:px-6 overflow-hidden select-none cursor-crosshair"
        >
          {/* Interactive Mouse Spotlight Radial Glow (Soft Olive Ambient) */}
          <div
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl transition-opacity duration-300"
            style={{
              left: `${mousePos.x}px`,
              top: `${mousePos.y}px`,
              width: "380px",
              height: "380px",
              background:
                "radial-gradient(circle, rgba(89, 102, 55, 0.22) 0%, rgba(164, 184, 130, 0.14) 45%, transparent 75%)",
              opacity: isHovered ? 1 : 0,
            }}
          />

          {/* Precision Circular Cursor Ring */}
          <div
            className="pointer-events-none absolute rounded-full border border-[#596637]/60 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-150 z-30"
            style={{
              left: `${mousePos.x}px`,
              top: `${mousePos.y}px`,
              width: "44px",
              height: "44px",
              boxShadow: "0 0 16px rgba(89, 102, 55, 0.35), inset 0 0 8px rgba(89, 102, 55, 0.15)",
              opacity: isHovered ? 1 : 0,
            }}
          />

          {/* Base Layer: Subtle Watermark Typography on Linen (Seamless, no box) */}
          <div
            aria-hidden="true"
            className="flex items-center justify-center text-center leading-none w-full"
          >
            <span
              className="font-futuristic font-black text-sm xs:text-base sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl tracking-[0.06em] sm:tracking-[0.1em] md:tracking-[0.14em] whitespace-nowrap select-none transition-colors duration-500"
              style={{
                color: "rgba(34, 34, 31, 0.18)",
                WebkitTextStroke: "1px rgba(89, 102, 55, 0.2)",
              }}
            >
              IVΛN ROBOTS ΛNURΛG
            </span>
          </div>

          {/* Foreground Spotlight Layer: Deep Charcoal & Radiant Olive Glow Under Cursor */}
          <div
            aria-label="Ivan Robots Anurag"
            className="absolute inset-0 flex items-center justify-center text-center leading-none pointer-events-none w-full"
            style={{
              clipPath: isHovered
                ? `circle(160px at ${mousePos.x}px ${mousePos.y}px)`
                : "circle(0px at 50% 50%)",
              transition: isHovered ? "clip-path 0.04s ease-out" : "clip-path 0.35s ease-out",
            }}
          >
            <span
              className="font-futuristic font-black text-sm xs:text-base sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl tracking-[0.06em] sm:tracking-[0.1em] md:tracking-[0.14em] whitespace-nowrap"
              style={{
                color: "#22221F",
                WebkitTextStroke: "1px rgba(34, 34, 31, 0.4)",
                textShadow:
                  "0 0 15px rgba(89, 102, 55, 0.8), 0 0 35px rgba(164, 184, 130, 0.6), 0 0 70px rgba(89, 102, 55, 0.45)",
              }}
            >
              IVΛN ROBOTS ΛNURΛG
            </span>
          </div>

          {/* Interactive Hint Indicator */}
          <div className="absolute bottom-1 right-2 pointer-events-none text-[9px] font-mono tracking-widest uppercase text-[#77766F] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#596637] animate-ping" />
            <span>Hover to Illuminate</span>
          </div>
        </div>

        {/* Bottom Row: Dynamic Copyright & Colophon */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#77766F] font-mono">
          <p>© {currentYear} {about?.authorName || "Anurag"}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="tracking-wider">Editorial Fashion & Cinematic Narrative</span>
            <span>·</span>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#D5D0C3]/60 hover:bg-[#596637] hover:text-[#F2F0E8] transition-colors text-[11px] font-mono"
            >
              <Settings className="w-3 h-3" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
