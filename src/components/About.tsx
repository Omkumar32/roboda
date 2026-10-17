"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Camera, Film, Sparkles, CheckCircle2 } from "lucide-react";

export default function About() {
  const [showFullBio, setShowFullBio] = useState(false);

  const pillars = [
    {
      title: "Light & Atmosphere",
      desc: "Harnessing natural golden hour and organic shadows to create depth without artificial stiffness.",
      icon: Sparkles,
    },
    {
      title: "Authentic Human Emotion",
      desc: "Creating a calm, trusting space where subjects feel free to simply be themselves.",
      icon: Camera,
    },
    {
      title: "Cinematic Color Tone",
      desc: "Bespoke color palettes grounded in warm earth tones, subtle greens, and soft film grain.",
      icon: Film,
    },
  ];

  return (
    <section id="about" className="w-full py-16 sm:py-24 px-4 sm:px-8 md:px-12 bg-[#D5D0C3]/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Portrait Photograph in Working Environment */}
          <div className="lg:col-span-5 relative">
            <div className="relative w-full h-[460px] sm:h-[560px] md:h-[620px] rounded-[24px] sm:rounded-[32px] overflow-hidden bg-[#F2F0E8] border border-[#D3D0C6] shadow-sm">
              <Image
                src="/images/editorial_camera.jpg"
                alt="Anurag - Portrait of the photographer"
                fill
                priority
                className="object-cover"
              />

              {/* Editorial Frame Stamp */}
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-[#E8E5DA]/90 backdrop-blur-sm rounded-xl border border-[#D3D0C6] flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold tracking-wider text-[#22221F] uppercase">
                    अnurag
                  </p>
                  <p className="text-[#77766F] text-[11px]">Cinematographer & Stills</p>
                </div>
                <span className="font-mono text-[#596637] font-semibold text-[11px] px-2 py-0.5 bg-[#596637]/10 rounded">
                  EST. 2020
                </span>
              </div>
            </div>

            {/* Accent geometry behind image */}
            <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-3xl border border-[#596637]/30 -z-10 hidden sm:block" />
          </div>

          {/* Right Column: Editorial Copy */}
          <div className="lg:col-span-7 flex flex-col items-start lg:pl-4">
            {/* Small Label */}
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#596637]" />
              <p className="text-xs font-semibold tracking-[0.25em] text-[#77766F] uppercase">
                A LITTLE ABOUT ME
              </p>
            </div>

            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#22221F] leading-[1.15]">
              Behind every frame, <br className="hidden sm:block" />
              there&apos;s a feeling.
            </h2>

            {/* Supporting Paragraphs */}
            <div className="mt-6 space-y-4 text-base sm:text-lg text-[#77766F] leading-relaxed">
              <p>
                I&apos;m a photographer and visual storyteller passionate about capturing honest
                emotions, meaningful details, and moments that deserve to be remembered.
              </p>
              <p>
                My process is rooted in patience, observation, and an obsession with light.
                Whether working with creative brands or filming intimate milestone celebrations,
                I strive to craft visual narratives that feel effortless, cinematic, and deeply human.
              </p>
              {showFullBio && (
                <div className="pt-2 space-y-4 text-base text-[#22221F] border-t border-[#D3D0C6] animate-in fade-in duration-300">
                  <p>
                    From the bustling streetscapes of Mumbai to secluded natural retreats across
                    India and abroad, my camera serves as an invitation to slow down and see the
                    unnoticed poetry of life.
                  </p>
                  <p className="italic text-[#596637]">
                    &ldquo;Great photography is not about asserting control over the scene; it&apos;s
                    about attuning yourself to the story that is already unfolding.&rdquo;
                  </p>
                </div>
              )}
            </div>

            {/* Three Pillars of Craft */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
              {pillars.map((pillar) => {
                const IconComponent = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className="p-4 bg-[#F2F0E8] border border-[#D3D0C6] rounded-2xl flex flex-col justify-between"
                  >
                    <IconComponent className="w-5 h-5 text-[#596637] mb-3 stroke-[1.5]" />
                    <div>
                      <h3 className="text-sm font-bold text-[#22221F] tracking-tight mb-1">
                        {pillar.title}
                      </h3>
                      <p className="text-xs text-[#77766F] leading-normal">{pillar.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="mt-8 flex items-center gap-4">
              <button
                onClick={() => setShowFullBio(!showFullBio)}
                className="group inline-flex items-center gap-2.5 px-6 py-3 bg-[#596637] text-[#F2F0E8] rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase hover:bg-[#4a552e] transition-colors focus:outline-none"
              >
                <span>{showFullBio ? "Show Less" : "More About Me"}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold tracking-wider text-[#22221F] hover:text-[#596637] uppercase transition-colors px-3 py-2"
              >
                <span>Let&apos;s Connect</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
