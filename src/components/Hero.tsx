"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight, Film, User, Compass, ArrowDown } from "lucide-react";
import Navbar from "./Navbar";

export default function Hero() {
  const scrollToWork = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const workSection = document.getElementById("work");
    if (workSection) {
      workSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="w-full">
      {/* Seamless Editorial Hero */}
      <div className="relative w-full min-h-[92vh] lg:min-h-[96vh] bg-[#E8E5DA] flex flex-col justify-between overflow-hidden">
        {/* Integrated Navbar at Top */}
        <Navbar activeSection="home" />

        {/* Main Hero Body Content */}
        <div className="relative flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 py-6 sm:py-10 lg:py-12 flex flex-col lg:flex-row items-center justify-between">
          {/* Left Column: Editorial Typography & Copy */}
          <div className="w-full lg:w-7/12 z-10 flex flex-col items-start pr-0 lg:pr-8">
            {/* Eyebrow Label */}
            <div className="inline-flex items-center gap-2 mb-4 sm:mb-6">
              <span className="w-2 h-2 rounded-full bg-[#596637] animate-pulse" />
              <p className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#22221F] uppercase">
                PHOTOGRAPHER & VISUAL STORYTELLER
              </p>
            </div>

            {/* Massive Editorial Display Headline ("Behind the lens") */}
            <div className="relative select-none -ml-1 sm:-ml-2">
              <h1 className="font-sans font-light tracking-tight text-[#77766F]/50 leading-[0.88] text-[clamp(3.8rem,10vw,8.5rem)] mb-1 sm:mb-2 uppercase">
                Behind <br />
                <span className="text-[#22221F]/80">the lens</span>
              </h1>
            </div>

            {/* Main Bold Headline ("Stories in Motion.") */}
            <div className="mt-2 sm:mt-3">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#22221F] leading-[1.08]">
                Stories in{" "}
                <span className="text-[#596637] inline-block hover:scale-[1.02] transition-transform duration-300">
                  Motion.
                </span>
              </h2>
            </div>

            {/* Short Description */}
            <p className="mt-5 sm:mt-6 text-[#77766F] text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-xl">
              Capturing authentic moments, meaningful stories, and cinematic visuals that stay with you.
            </p>

            {/* Primary CTA & Secondary action */}
            <div className="mt-7 sm:mt-9 flex flex-wrap items-center gap-4 sm:gap-6">
              <a
                href="#work"
                onClick={scrollToWork}
                className="group relative inline-flex items-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 bg-[#596637] text-[#F2F0E8] font-medium text-sm sm:text-base tracking-wide rounded-full shadow-sm hover:bg-[#4a552e] hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#596637] focus:ring-offset-2 focus:ring-offset-[#E8E5DA]"
              >
                <span>Explore My Work</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>

              <a
                href="#contact"
                onClick={scrollToContact}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-[#22221F] hover:text-[#596637] uppercase transition-colors py-2 px-1"
              >
                <span>Commission A Shoot</span>
                <span className="text-xs text-[#77766F]">→</span>
              </a>
            </div>
          </div>

          {/* Right Column: Full-body Photographer Cutout */}
          <div className="w-full lg:w-5/12 h-[380px] sm:h-[480px] md:h-[540px] lg:h-[620px] relative mt-8 lg:mt-0 flex items-end justify-center lg:justify-end">
            {/* Subtle atmospheric backdrop blur/circle in warm ivory tone */}
            <div className="absolute w-[280px] sm:w-[380px] lg:w-[440px] h-[280px] sm:h-[380px] lg:h-[440px] rounded-full bg-[#D5D0C3]/30 blur-3xl pointer-events-none -z-0 bottom-10 right-4" />

            {/* Photographer Cutout Image */}
            <div className="relative w-full h-full flex items-end justify-center lg:justify-end z-10 pointer-events-none">
              <Image
                src="/images/hero-photographer.png"
                alt="Anurag - Photographer operating cinema camera equipment"
                width={560}
                height={780}
                priority
                className="object-contain object-bottom max-h-full drop-shadow-sm select-none"
              />
            </div>

            {/* Subtle editorial floating tag */}
            <div className="absolute top-6 sm:top-12 right-2 sm:right-6 z-20 hidden sm:flex items-center gap-2.5 bg-[#F2F0E8]/90 backdrop-blur-sm border border-[#D3D0C6] py-1.5 px-3.5 rounded-full text-[11px] text-[#22221F] font-mono tracking-wider shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#596637]" />
              <span>SONY FX3 · 24-70MM GM II</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Service Indicators & Scroll Indicator */}
        <div className="w-full border-t border-[#D3D0C6] bg-[#E8E5DA]/80 backdrop-blur-xs px-4 sm:px-8 md:px-12 py-3.5 sm:py-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Bottom-left service indicators */}
            <div className="flex items-center flex-wrap justify-center sm:justify-start divide-x divide-[#D3D0C6] text-xs sm:text-sm font-medium text-[#22221F]">
              <div className="flex items-center gap-2 px-3 sm:px-4 first:pl-0 py-1">
                <Film className="w-4 h-4 text-[#596637] stroke-[1.5]" />
                <span className="tracking-wide">Cinematic Films</span>
              </div>
              <div className="flex items-center gap-2 px-3 sm:px-4 py-1">
                <User className="w-4 h-4 text-[#596637] stroke-[1.5]" />
                <span className="tracking-wide">Portrait Photography</span>
              </div>
              <div className="flex items-center gap-2 px-3 sm:px-4 py-1">
                <Compass className="w-4 h-4 text-[#596637] stroke-[1.5]" />
                <span className="tracking-wide">Brand Stories</span>
              </div>
            </div>

            {/* Bottom-right detail: Scroll Indicator */}
            <a
              href="#work"
              onClick={scrollToWork}
              className="flex items-center gap-2 text-[10px] sm:text-xs font-semibold tracking-[0.2em] text-[#77766F] hover:text-[#596637] uppercase transition-colors group cursor-pointer"
            >
              <span>SCROLL TO EXPLORE</span>
              <ArrowDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
