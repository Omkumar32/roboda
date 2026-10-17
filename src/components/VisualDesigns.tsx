"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowUpRight, Sparkles, X, Eye, Tag, Award } from "lucide-react";
import { VISUAL_DESIGNS, VisualDesignItem } from "@/data/portfolioData";

export default function VisualDesigns() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [selectedDesign, setSelectedDesign] = useState<VisualDesignItem | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const total = VISUAL_DESIGNS.length;

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "Escape") setSelectedDesign(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [total]);

  // Calculate 3D transformation for each card
  const getCardStyle = (index: number) => {
    let offset = index - activeIndex;

    // Wrap around for circular rotation
    if (offset > Math.floor(total / 2)) {
      offset -= total;
    } else if (offset < -Math.floor(total / 2)) {
      offset += total;
    }

    const isActive = offset === 0;
    const isAbsOffset1 = Math.abs(offset) === 1;
    const isAbsOffset2 = Math.abs(offset) === 2;

    if (Math.abs(offset) > 2) {
      return {
        transform: `translateX(${offset * 120}%) scale(0.6) rotateY(${offset > 0 ? -45 : 45}deg)`,
        opacity: 0,
        zIndex: 0,
        pointerEvents: "none" as const,
      };
    }

    const translateX = offset * 280; // horizontal separation
    const rotateY = offset * -25; // 3D cylindrical angle
    const translateZ = -Math.abs(offset) * 90; // depth receding
    const scale = isActive ? 1.05 : isAbsOffset1 ? 0.88 : 0.74;
    const opacity = isActive ? 1 : isAbsOffset1 ? 0.82 : 0.45;
    const zIndex = 20 - Math.abs(offset) * 5;

    return {
      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity,
      zIndex,
      cursor: "pointer",
    };
  };

  return (
    <section
      id="visual-designs"
      className="relative w-full py-20 sm:py-28 px-4 sm:px-8 md:px-12 bg-[#E8E5DA] text-[#22221F] overflow-hidden border-t border-[#D3D0C6]"
    >
      {/* Subtle Atmospheric Glow Elements matching brand tones */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#596637]/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-20 left-1/4 w-[400px] h-[250px] bg-[#D5D0C3]/40 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Eyebrow Label: 05 • DESIGN PORTFOLIO */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F2F0E8] border border-[#D3D0C6] mb-4 shadow-2xs">
          <span className="font-mono text-xs font-semibold tracking-[0.25em] text-[#596637] uppercase">
            05
          </span>
          <span className="text-[#77766F] text-xs">•</span>
          <span className="text-xs font-semibold tracking-[0.2em] text-[#22221F] uppercase">
            DESIGN PORTFOLIO
          </span>
        </div>

        {/* Massive Editorial Headline: VISUAL (solid) / DESIGNS (stroke) */}
        <div className="select-none flex flex-col items-center leading-[0.88] tracking-tight my-2">
          <span className="font-sans font-black text-[#22221F] text-[clamp(3.5rem,11vw,8rem)] uppercase tracking-tight">
            VISUAL
          </span>
          <span
            className="font-sans font-black text-[clamp(3.5rem,11vw,8rem)] uppercase tracking-tight"
            style={{
              WebkitTextStroke: "1.5px #22221F",
              color: "transparent",
              opacity: 0.3,
            }}
          >
            DESIGNS
          </span>
        </div>

        {/* Sub-bar Category Ticker */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[11px] sm:text-xs font-mono tracking-[0.25em] text-[#77766F] uppercase pt-4 pb-12 sm:pb-16 border-b border-[#D3D0C6] w-full max-w-4xl">
          <span>BRAND KITS</span>
          <span className="text-[#596637]">•</span>
          <span>THUMBNAILS</span>
          <span className="text-[#596637]">•</span>
          <span>SOCIAL MEDIA</span>
          <span className="text-[#596637]">•</span>
          <span>POSTERS</span>
          <span className="text-[#596637]">•</span>
          <span>KEY VISUALS</span>
        </div>

        {/* 3D Coverflow Carousel Stage */}
        <div
          className="relative w-full h-[420px] sm:h-[480px] md:h-[540px] flex items-center justify-center perspective-[1200px] mt-6 sm:mt-10"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative w-full max-w-[540px] h-[300px] sm:h-[350px] md:h-[380px] flex items-center justify-center">
            {VISUAL_DESIGNS.map((item, index) => {
              const isActive = index === activeIndex;
              const cardStyle = getCardStyle(index);

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    if (isActive) {
                      setSelectedDesign(item);
                    } else {
                      setActiveIndex(index);
                    }
                  }}
                  style={cardStyle}
                  className={`absolute w-[320px] sm:w-[420px] md:w-[480px] h-[210px] sm:h-[265px] md:h-[295px] rounded-2xl overflow-hidden transition-all duration-500 ease-out select-none ${
                    isActive
                      ? "ring-2 ring-[#596637] shadow-[0_16px_40px_rgba(89,102,55,0.28)]"
                      : "ring-1 ring-[#D3D0C6] shadow-sm hover:ring-[#77766F]"
                  }`}
                >
                  {/* Background Image */}
                  <div className="relative w-full h-full bg-[#111110]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                      priority={isActive}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                    {/* Creative Typography Badge Overlay */}
                    <div className="absolute top-4 left-4 right-4 flex items-start justify-between z-10 pointer-events-none">
                      <div className="flex flex-col items-start bg-[#22221F]/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/15">
                        <span className="text-[11px] sm:text-xs font-black tracking-wider text-[#F2F0E8] uppercase drop-shadow-md">
                          {item.badgeTitle}
                        </span>
                        {item.badgeSubtitle && (
                          <span className="text-[9px] font-bold tracking-widest text-[#D5D0C3] uppercase">
                            {item.badgeSubtitle}
                          </span>
                        )}
                      </div>

                      <span className="px-2.5 py-1 rounded-md text-[9px] font-mono tracking-wider uppercase bg-[#596637] text-[#F2F0E8] font-semibold shadow-xs">
                        {item.category.split("&")[0]}
                      </span>
                    </div>

                    {/* Bottom Metadata */}
                    <div className="absolute bottom-4 left-4 right-4 z-10 flex items-end justify-between">
                      <div className="text-left">
                        <p className="text-xs sm:text-sm font-bold text-white tracking-tight line-clamp-1 drop-shadow-sm">
                          {item.title}
                        </p>
                        <p className="text-[11px] text-[#D5D0C3] font-mono mt-0.5">
                          {item.viewsOrMetric}
                        </p>
                      </div>

                      {isActive && (
                        <div className="w-8 h-8 rounded-full bg-[#596637] text-[#F2F0E8] flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                          <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Left Arrow Button */}
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="absolute left-2 sm:left-8 md:left-16 z-30 p-3 rounded-full bg-[#F2F0E8] hover:bg-[#596637] hover:text-[#F2F0E8] text-[#22221F] border border-[#D3D0C6] shadow-md transition-all backdrop-blur-sm focus:outline-none"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="absolute right-2 sm:right-8 md:right-16 z-30 p-3 rounded-full bg-[#F2F0E8] hover:bg-[#596637] hover:text-[#F2F0E8] text-[#22221F] border border-[#D3D0C6] shadow-md transition-all backdrop-blur-sm focus:outline-none"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Carousel Slide Indicators & Hint */}
        <div className="mt-8 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            {VISUAL_DESIGNS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === activeIndex
                    ? "w-8 bg-[#596637]"
                    : "w-2 bg-[#D3D0C6] hover:bg-[#77766F]"
                }`}
              />
            ))}
          </div>

          <p className="text-[11px] font-mono tracking-widest text-[#77766F] uppercase">
            Click center card or arrows to explore case studies
          </p>
        </div>
      </div>

      {/* Full Project Detail Modal */}
      {selectedDesign && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-[#22221F]/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedDesign(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#F2F0E8] border border-[#D3D0C6] rounded-[24px] sm:rounded-[32px] p-6 sm:p-10 text-[#22221F] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedDesign(null)}
              aria-label="Close modal"
              className="absolute top-5 right-5 p-2 rounded-full bg-[#E8E5DA] text-[#22221F] hover:bg-[#596637] hover:text-[#F2F0E8] transition-colors"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>

            {/* Modal Content */}
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#596637] uppercase mb-2">
              <span>{selectedDesign.category}</span>
              <span className="text-[#77766F]">·</span>
              <span>{selectedDesign.year}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-[#22221F]">
              {selectedDesign.title}
            </h3>

            {/* Full-width Image Preview */}
            <div className="relative w-full h-[280px] sm:h-[400px] rounded-2xl overflow-hidden mb-6 border border-[#D3D0C6]">
              <Image
                src={selectedDesign.image}
                alt={selectedDesign.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start pt-4 border-t border-[#D3D0C6]">
              <div className="md:col-span-7 space-y-3">
                <p className="text-xs font-bold tracking-wider text-[#77766F] uppercase">
                  Design Strategy & Approach
                </p>
                <p className="text-sm sm:text-base text-[#22221F]/80 leading-relaxed">
                  {selectedDesign.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {selectedDesign.tags.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full text-xs font-mono bg-[#E8E5DA] border border-[#D3D0C6] text-[#22221F]"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="md:col-span-5 bg-[#E8E5DA] border border-[#D3D0C6] p-5 rounded-2xl space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-[#D3D0C6]">
                  <span className="text-[#77766F]">Client</span>
                  <span className="font-semibold text-[#22221F]">{selectedDesign.client}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-[#D3D0C6]">
                  <span className="text-[#77766F]">Performance Metrics</span>
                  <span className="font-mono font-semibold text-[#596637]">
                    {selectedDesign.viewsOrMetric}
                  </span>
                </div>
                <a
                  href="#contact"
                  onClick={() => setSelectedDesign(null)}
                  className="mt-3 w-full py-3 bg-[#596637] text-[#F2F0E8] font-bold tracking-wider uppercase rounded-full text-center flex items-center justify-center gap-1.5 hover:bg-[#4a552e] transition-colors"
                >
                  <span>Request Custom Design</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
