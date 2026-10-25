"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowUpRight, Sparkles, X, Eye, Tag, Award } from "lucide-react";
import { VisualDesignItem } from "@/data/portfolioData";
import { usePortfolio } from "@/context/PortfolioDataContext";

export default function VisualDesigns() {
  const { data } = usePortfolio();
  const visualDesigns = data?.visualDesigns || [];
  const [activeIndex, setActiveIndex] = useState(1);
  const [selectedDesign, setSelectedDesign] = useState<VisualDesignItem | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const total = visualDesigns.length || 1;

  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  // Smooth auto-swipe interval (pauses on hover or when modal is open)
  useEffect(() => {
    if (isHovered || selectedDesign !== null) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 3200);

    return () => clearInterval(timer);
  }, [isHovered, selectedDesign, total]);

  // Touch swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (diff > 50) {
      prevSlide();
    } else if (diff < -50) {
      nextSlide();
    }
    setTouchStartX(null);
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

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

    // Mobile-optimized coverflow: Active card centered, neighbors peek softly, others hidden
    if (isMobile) {
      if (Math.abs(offset) > 1) {
        return {
          transform: `translateX(${offset * 120}%) scale(0.6)`,
          opacity: 0,
          zIndex: 0,
          pointerEvents: "none" as const,
        };
      }

      const translateX = offset * 210;
      const rotateY = offset * -15;
      const translateZ = -Math.abs(offset) * 50;
      const scale = isActive ? 1 : 0.85;
      const opacity = isActive ? 1 : 0.35;
      const zIndex = 20 - Math.abs(offset) * 5;

      return {
        transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
        opacity,
        zIndex,
        cursor: "pointer",
      };
    }

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
      className="relative w-full min-h-[90vh] lg:min-h-screen py-8 sm:py-12 md:py-16 px-4 sm:px-8 md:px-12 bg-[#E8E5DA] text-[#22221F] overflow-hidden border-t border-[#D3D0C6] flex flex-col justify-center items-center"
    >
      {/* Subtle Atmospheric Glow Elements matching brand tones */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#596637]/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-20 left-1/4 w-[400px] h-[250px] bg-[#D5D0C3]/40 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto w-full flex flex-col items-center text-center">
        {/* Eyebrow Label: 05 • DESIGN PORTFOLIO */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F2F0E8] border border-[#D3D0C6] mb-2 sm:mb-3 shadow-2xs">
          <span className="font-mono text-xs font-semibold tracking-[0.25em] text-[#596637] uppercase">
            05
          </span>
          <span className="text-[#596637] text-xs">•</span>
          <span className="text-xs font-semibold tracking-[0.2em] text-[#22221F] uppercase">
            DESIGN PORTFOLIO
          </span>
        </div>

        {/* Editorial Headline: VISUAL (solid) / DESIGNS (theme olive stroke & tint) on one unified line */}
        <div className="select-none flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 leading-none tracking-tight my-1 sm:my-2">
          <span className="font-sans font-black text-[#22221F] text-3xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-tight">
            VISUAL
          </span>
          <span
            className="font-sans font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-tight transition-all duration-300 hover:scale-[1.02] cursor-default"
            style={{
              WebkitTextStroke: "2px #596637",
              color: "rgba(89, 102, 55, 0.18)",
              opacity: 0.95,
            }}
          >
            DESIGNS
          </span>
        </div>

        {/* Sub-bar Category Ticker: Clean 1-line ticker on mobile without awkward line wraps */}
        <div className="w-full max-w-3xl mb-3 sm:mb-5 pt-1.5 pb-2.5 sm:pb-4 border-b border-[#D3D0C6] overflow-x-auto no-scrollbar">
          <div className="flex items-center justify-center gap-2 sm:gap-4 text-[10px] sm:text-xs font-mono tracking-[0.15em] sm:tracking-[0.2em] text-[#77766F] uppercase whitespace-nowrap min-w-max mx-auto px-2">
            <span className="hover:text-[#596637] transition-colors cursor-default">BRAND KITS</span>
            <span className="text-[#596637]">•</span>
            <span className="hover:text-[#596637] transition-colors cursor-default">THUMBNAILS</span>
            <span className="text-[#596637]">•</span>
            <span className="hover:text-[#596637] transition-colors cursor-default">SOCIAL MEDIA</span>
            <span className="text-[#596637]">•</span>
            <span className="hover:text-[#596637] transition-colors cursor-default">POSTERS</span>
            <span className="text-[#596637]">•</span>
            <span className="hover:text-[#596637] transition-colors cursor-default">KEY VISUALS</span>
          </div>
        </div>

        {/* 3D Coverflow Carousel Stage */}
        <div
          className="relative w-full h-[280px] sm:h-[350px] md:h-[400px] flex items-center justify-center perspective-[1200px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative w-full max-w-[500px] h-[220px] sm:h-[280px] md:h-[320px] flex items-center justify-center">
            {visualDesigns.map((item, index) => {
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
                  className={`absolute w-[86vw] max-w-[320px] sm:max-w-none sm:w-[380px] md:w-[460px] h-[195px] sm:h-[240px] md:h-[280px] rounded-2xl overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] select-none ${
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
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-start justify-between z-10 pointer-events-none">
                      <div className="flex flex-col items-start bg-[#22221F]/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/15">
                        <span className="text-[10px] sm:text-xs font-black tracking-wider text-[#F2F0E8] uppercase drop-shadow-md">
                          {item.badgeTitle}
                        </span>
                        {item.badgeSubtitle && (
                          <span className="text-[8px] sm:text-[9px] font-bold tracking-widest text-[#D5D0C3] uppercase">
                            {item.badgeSubtitle}
                          </span>
                        )}
                      </div>

                      <span className="px-2.5 py-0.5 sm:py-1 rounded-md text-[9px] font-mono tracking-wider uppercase bg-[#596637] text-[#F2F0E8] font-semibold shadow-xs">
                        {item.category.split("&")[0]}
                      </span>
                    </div>

                    {/* Bottom Metadata */}
                    <div className="absolute bottom-3.5 left-3.5 right-3.5 z-10 flex items-end justify-between">
                      <div className="text-left pr-2">
                        <p className="text-xs sm:text-sm font-bold text-white tracking-tight line-clamp-1 drop-shadow-sm">
                          {item.title}
                        </p>
                        <p className="text-[10px] sm:text-[11px] text-[#D5D0C3] font-mono mt-0.5">
                          {item.viewsOrMetric}
                        </p>
                      </div>

                      {isActive && (
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#596637] text-[#F2F0E8] flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                          <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Left Arrow Button (Desktop only - avoids covering photos on mobile) */}
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="hidden sm:flex absolute left-2 sm:left-4 md:left-8 lg:left-14 z-30 p-2.5 sm:p-3 rounded-full bg-[#F2F0E8] hover:bg-[#596637] hover:text-[#F2F0E8] text-[#22221F] border border-[#D3D0C6] shadow-md transition-all backdrop-blur-sm focus:outline-none"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow Button (Desktop only - avoids covering photos on mobile) */}
          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="hidden sm:flex absolute right-2 sm:right-4 md:right-8 lg:right-14 z-30 p-2.5 sm:p-3 rounded-full bg-[#F2F0E8] hover:bg-[#596637] hover:text-[#F2F0E8] text-[#22221F] border border-[#D3D0C6] shadow-md transition-all backdrop-blur-sm focus:outline-none"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Carousel Slide Indicators & Mobile Navigation Controls */}
        <div className="mt-4 sm:mt-6 flex flex-col items-center gap-2.5 w-full">
          <div className="flex items-center justify-center gap-3 sm:gap-6">
            {/* Mobile Prev Arrow */}
            <button
              onClick={prevSlide}
              aria-label="Previous slide"
              className="sm:hidden p-2 rounded-full bg-[#F2F0E8] text-[#22221F] hover:bg-[#596637] hover:text-[#F2F0E8] border border-[#D3D0C6] shadow-xs active:scale-95 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Dot Indicators */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {visualDesigns.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-500 ease-out cursor-pointer ${
                    idx === activeIndex
                      ? "w-7 sm:w-8 bg-[#596637]"
                      : "w-2 bg-[#D3D0C6] hover:bg-[#77766F]"
                  }`}
                />
              ))}
            </div>

            {/* Mobile Next Arrow */}
            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="sm:hidden p-2 rounded-full bg-[#F2F0E8] text-[#22221F] hover:bg-[#596637] hover:text-[#F2F0E8] border border-[#D3D0C6] shadow-xs active:scale-95 transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[10px] sm:text-[11px] font-mono tracking-widest text-[#77766F] uppercase text-center px-4">
            Swipe or tap card to view full project
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
                {selectedDesign.link && (
                  <a
                    href={selectedDesign.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 bg-[#22221F] text-[#F2F0E8] font-bold tracking-wider uppercase rounded-full text-center flex items-center justify-center gap-1.5 hover:bg-black transition-colors"
                  >
                    <span>View Project / Artwork ↗</span>
                  </a>
                )}

                <a
                  href="#contact"
                  onClick={() => setSelectedDesign(null)}
                  className="mt-2 w-full py-3 bg-[#596637] text-[#F2F0E8] font-bold tracking-wider uppercase rounded-full text-center flex items-center justify-center gap-1.5 hover:bg-[#4a552e] transition-colors"
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
