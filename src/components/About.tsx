"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Camera, Film, Sparkles, Star, Compass, Layers } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioDataContext";

const ICON_MAP: Record<string, React.ElementType> = {
  sparkles: Sparkles,
  camera: Camera,
  film: Film,
  star: Star,
  compass: Compass,
  layers: Layers,
};

export default function About() {
  const { data } = usePortfolio();
  const about = data?.about;
  const [showFullBio, setShowFullBio] = useState(false);

  const pillars = about?.pillars || [
    {
      title: "Light & Atmosphere",
      desc: "Harnessing natural golden hour and organic shadows to create depth without artificial stiffness.",
      icon: "sparkles",
    },
    {
      title: "Authentic Human Emotion",
      desc: "Creating a calm, trusting space where subjects feel free to simply be themselves.",
      icon: "camera",
    },
    {
      title: "Cinematic Color Tone",
      desc: "Bespoke color palettes grounded in warm earth tones, subtle greens, and soft film grain.",
      icon: "film",
    },
  ];

  return (
    <section id="about" className="w-full py-6 sm:py-8 md:py-10 px-4 sm:px-6 md:px-8 bg-[#D5D0C3]/30 border-t border-[#D3D0C6]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-7 items-stretch">
          {/* Left Column: Slender Portrait Photograph aligned with content height */}
          <div className="lg:col-span-4 relative w-full flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[320px] sm:max-w-[340px] lg:max-w-none h-[360px] sm:h-[400px] lg:h-full min-h-[360px] lg:min-h-[420px] rounded-[20px] sm:rounded-[24px] overflow-hidden bg-[#F2F0E8] border border-[#D3D0C6] shadow-sm">
              <Image
                src={about?.portraitImage || "/images/editorial_camera.jpg"}
                alt={`${about?.authorName || "Anurag"} - Portrait of the photographer`}
                fill
                priority
                className="object-cover"
              />

              {/* Unique Compact Creator Slate Badge */}
              <div className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-2 px-2.5 py-1.5 bg-[#F2F0E8]/90 backdrop-blur-md rounded-xl border border-[#D3D0C6] shadow-md max-w-[calc(100%-20px)]">
                <div className="w-5 h-5 rounded-full bg-[#596637] text-[#F2F0E8] flex items-center justify-center font-bold text-[10px] shrink-0 shadow-2xs">
                  {about?.monogram || "अ"}
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1.5 leading-none">
                    <span className="font-bold tracking-wider text-[#22221F] uppercase text-[10px]">
                      {about?.authorName || "ANURAG"}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-[#596637]" />
                    <span className="font-mono text-[#596637] font-semibold text-[8px] px-1 py-0.2 bg-[#596637]/10 rounded">
                      {about?.establishedYear || "EST. 2020"}
                    </span>
                  </div>
                  <p className="text-[#77766F] text-[9px] font-mono mt-0.5 tracking-tight truncate">
                    {about?.subtitle || "Cinematographer & Stills"}
                  </p>
                </div>
              </div>
            </div>

            {/* Accent geometry behind image */}
            <div className="absolute -bottom-2 -left-2 w-20 h-20 rounded-2xl border border-[#596637]/25 -z-10 hidden sm:block" />
          </div>

          {/* Right Column: Editorial Copy */}
          <div className="lg:col-span-8 flex flex-col justify-between items-start">
            <div>
              {/* Small Label */}
              <div className="inline-flex items-center gap-1.5 mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#596637]" />
                <p className="text-[10px] font-mono font-semibold tracking-[0.25em] text-[#77766F] uppercase">
                  {about?.eyebrow || "A LITTLE ABOUT ME"}
                </p>
              </div>

              {/* Main Heading */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#22221F] leading-[1.15]">
                {about?.heading || "Behind every frame, there's a feeling."}
              </h2>

              {/* Supporting Paragraphs */}
              <div className="mt-2.5 space-y-2 text-xs sm:text-sm text-[#77766F] leading-relaxed">
                <p>
                  {about?.paragraph1 ||
                    "I'm a photographer and visual storyteller passionate about capturing honest emotions, meaningful details, and moments that deserve to be remembered."}
                </p>
                <p>
                  {about?.paragraph2 ||
                    "My process is rooted in patience, observation, and an obsession with light. Whether working with creative brands or filming intimate milestone celebrations, I strive to craft visual narratives that feel effortless, cinematic, and deeply human."}
                </p>
                {showFullBio && (
                  <div className="pt-2 space-y-2 text-xs sm:text-sm text-[#22221F] border-t border-[#D3D0C6] animate-in fade-in duration-300">
                    <p>
                      {about?.paragraph3 ||
                        "From the bustling streetscapes of Mumbai to secluded natural retreats across India and abroad, my camera serves as an invitation to slow down and see the unnoticed poetry of life."}
                    </p>
                    <p className="italic text-[#596637]">
                      &ldquo;
                      {about?.quote ||
                        "Great photography is not about asserting control over the scene; it's about attuning yourself to the story that is already unfolding."}
                      &rdquo;
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Three Pillars of Craft */}
            <div className="mt-3.5 sm:mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5 w-full">
              {pillars.map((pillar) => {
                const IconComponent = typeof pillar.icon === "string" ? (ICON_MAP[pillar.icon] || Sparkles) : (pillar.icon || Sparkles);
                return (
                  <div
                    key={pillar.title}
                    className="p-2.5 sm:p-3 bg-[#F2F0E8] border border-[#D3D0C6] rounded-xl flex flex-col justify-between shadow-2xs hover:border-[#596637]/50 transition-colors"
                  >
                    <IconComponent className="w-3.5 h-3.5 text-[#596637] mb-1.5 stroke-[1.75]" />
                    <div>
                      <h3 className="text-xs font-bold text-[#22221F] tracking-tight mb-0.5">
                        {pillar.title}
                      </h3>
                      <p className="text-[10px] text-[#77766F] leading-snug">{pillar.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="mt-3 sm:mt-3.5 flex items-center gap-3">
              <button
                onClick={() => setShowFullBio(!showFullBio)}
                className="group inline-flex items-center gap-1.5 px-4 py-2 bg-[#596637] text-[#F2F0E8] rounded-full text-xs font-semibold tracking-wider uppercase hover:bg-[#4a552e] transition-colors focus:outline-none cursor-pointer"
              >
                <span>{showFullBio ? (about?.ctaButtonTextExpanded || "Show Less") : (about?.ctaButtonText || "More About Me")}</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <a
                href="#contact"
                className="inline-flex items-center gap-1 text-xs font-semibold tracking-wider text-[#22221F] hover:text-[#596637] uppercase transition-colors px-2.5 py-1.5 cursor-pointer"
              >
                <span>{about?.contactButtonText || "Let's Connect"}</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
