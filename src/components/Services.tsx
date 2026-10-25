"use client";

import React from "react";
import { Camera, Film, Sparkles, Compass, ArrowUpRight } from "lucide-react";
import { Service } from "@/data/portfolioData";
import { usePortfolio } from "@/context/PortfolioDataContext";

export default function Services() {
  const { data } = usePortfolio();
  const services = data?.services || [];
  const getIcon = (iconName: Service["icon"]) => {
    switch (iconName) {
      case "camera":
        return <Camera className="w-5 h-5 stroke-[1.75]" />;
      case "film":
        return <Film className="w-5 h-5 stroke-[1.75]" />;
      case "sparkles":
        return <Sparkles className="w-5 h-5 stroke-[1.75]" />;
      case "compass":
        return <Compass className="w-5 h-5 stroke-[1.75]" />;
      default:
        return <Camera className="w-5 h-5 stroke-[1.75]" />;
    }
  };

  const getDisciplinesSummary = (id: string) => {
    switch (id) {
      case "photography":
        return {
          tagline: "Natural light portraiture, editorial lookbooks, and archival fine-art prints.",
          tags: ["Portraits", "Editorials", "Fine-Art"],
        };
      case "cinematic-films":
        return {
          tagline: "4K DCI master films, bespoke analog color grading, and licensed scores.",
          tags: ["4K Cinema", "Color Grade", "Sound Design"],
        };
      case "weddings-events":
        return {
          tagline: "Fly-on-the-wall documentary wedding films and heirloom memory archives.",
          tags: ["Documentary", "Heirloom", "Full Coverage"],
        };
      case "brand-campaigns":
        return {
          tagline: "High-impact visual narratives, campaign assets, and commercial licensing.",
          tags: ["Campaigns", "Direction", "Commercial"],
        };
      default:
        return {
          tagline: "Tailored visual productions crafted with intention and precision.",
          tags: ["Curated", "Bespoke", "Mastered"],
        };
    }
  };

  const handleServiceInquire = (serviceTitle: string) => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
      const selectEl = document.getElementById("service-select") as HTMLSelectElement | null;
      if (selectEl) {
        selectEl.value = serviceTitle;
      }
    }
  };

  return (
    <section id="services" className="w-full py-10 sm:py-14 md:py-16 px-4 sm:px-6 md:px-10 bg-[#E8E5DA] border-t border-[#D3D0C6]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 pb-6 sm:pb-8 border-b border-[#D3D0C6]">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#596637]" />
              <p className="text-[11px] font-mono font-semibold tracking-[0.25em] text-[#77766F] uppercase">
                CREATIVE DISCIPLINES
              </p>
            </div>
            <h2 className="select-none flex flex-wrap items-center gap-2 sm:gap-2.5 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-sans font-black tracking-tight leading-none">
              <span className="text-[#22221F] uppercase">
                WHAT I DO
              </span>
              <span
                className="uppercase transition-all duration-300"
                style={{
                  WebkitTextStroke: "1.5px #596637",
                  color: "rgba(89, 102, 55, 0.14)",
                  opacity: 0.92,
                }}
              >
                BEST
              </span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#77766F] max-w-md leading-relaxed">
            Refined visual productions crafted for discerning individuals and brands.
          </p>
        </div>

        {/* 4-Column Services Grid with Fixed-Height Stable Cards (Zero Shaking) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 pt-6 sm:pt-8">
          {services.map((service, idx) => {
            const summary = getDisciplinesSummary(service.id);

            return (
              <div
                key={service.id}
                onClick={() => handleServiceInquire(service.title)}
                className="relative h-[290px] sm:h-[300px] bg-[#F2F0E8] border border-[#D3D0C6] rounded-[20px] p-5 flex flex-col justify-between overflow-hidden cursor-pointer group transition-all duration-300 ease-out hover:border-[#596637] hover:shadow-[0_16px_36px_rgba(89,102,55,0.16)] select-none"
              >
                {/* Top-Right Quarter-Circle Leaf Accent that expands to 100% on hover */}
                <div
                  aria-hidden="true"
                  className="absolute top-0 right-0 w-[24%] h-[22%] bg-[#D5D0C3] group-hover:bg-[#596637] rounded-tr-[20px] rounded-bl-[100%] group-hover:w-full group-hover:h-full group-hover:rounded-[20px] transition-all duration-500 ease-out z-0 pointer-events-none"
                />

                {/* Bottom-Left Quarter-Circle Leaf Accent that expands to 100% on hover */}
                <div
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 w-[24%] h-[22%] bg-[#D5D0C3] group-hover:bg-[#596637] rounded-bl-[20px] rounded-tr-[100%] group-hover:w-full group-hover:h-full group-hover:rounded-[20px] transition-all duration-500 ease-out z-0 pointer-events-none"
                />

                {/* Card Content (Layered above expanding background accents, locked height) */}
                <div className="relative z-10 flex flex-col justify-between h-full pointer-events-none">
                  {/* Top Row: Icon + Index */}
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-[#E8E5DA] text-[#596637] border border-[#D3D0C6] flex items-center justify-center group-hover:bg-[#F2F0E8] group-hover:text-[#596637] group-hover:border-transparent group-hover:scale-105 transition-all duration-400 shadow-2xs">
                      {getIcon(service.icon)}
                    </div>
                    <span className="font-mono text-xs font-semibold tracking-widest text-[#77766F] group-hover:text-[#F2F0E8] transition-colors duration-400 pr-0.5">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Center Body: Category, Heading & Revealed Details */}
                  <div className="py-2 flex flex-col justify-center">
                    <p className="text-[10px] font-mono tracking-[0.2em] font-bold text-[#596637] group-hover:text-[#F2F0E8]/80 uppercase mb-1 transition-colors duration-400">
                      {service.category}
                    </p>

                    <h3 className="text-xl sm:text-2xl font-bold text-[#22221F] group-hover:text-[#F2F0E8] tracking-tight transition-colors duration-400">
                      {service.title}
                    </h3>

                    {/* Revealed on Hover: Tagline & Keywords */}
                    <div className="transition-all duration-400 ease-out max-h-0 opacity-0 group-hover:max-h-28 group-hover:opacity-100 overflow-hidden">
                      <p className="text-xs text-[#F2F0E8]/90 leading-relaxed mt-2 mb-2">
                        {summary.tagline}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-1.5 border-t border-white/20">
                        {summary.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-full text-[10px] font-mono text-[#F2F0E8] bg-white/15 border border-white/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Bar */}
                  <div className="pt-2.5 border-t border-[#D3D0C6]/60 group-hover:border-white/30 flex items-center justify-between text-xs font-semibold tracking-wider uppercase text-[#77766F] group-hover:text-[#F2F0E8] transition-all duration-400">
                    <span className="text-[11px] group-hover:translate-x-0.5 transition-transform duration-300">
                      <span className="group-hover:hidden">Explore</span>
                      <span className="hidden group-hover:inline">Inquire Discipline</span>
                    </span>
                    <span className="w-6 h-6 rounded-full bg-[#E8E5DA] text-[#22221F] group-hover:bg-[#F2F0E8] group-hover:text-[#596637] flex items-center justify-center transition-all duration-400 group-hover:rotate-45 shadow-2xs">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
