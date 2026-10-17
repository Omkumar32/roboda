"use client";

import React from "react";
import { TESTIMONIALS } from "@/data/portfolioData";
import { Quote } from "lucide-react";

export default function Testimonials() {
  return (
    <section className="w-full py-16 sm:py-24 px-4 sm:px-8 md:px-12 bg-[#E8E5DA]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
          <p className="text-xs font-semibold tracking-[0.25em] text-[#77766F] uppercase mb-3">
            WORDS FROM COLLABORATORS
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#22221F]">
            Praise & Perspectives.
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="p-8 bg-[#F2F0E8] border border-[#D3D0C6] rounded-[24px] flex flex-col justify-between"
            >
              <div>
                <Quote className="w-6 h-6 text-[#596637] mb-4 opacity-70" />
                <p className="text-sm sm:text-base text-[#22221F] italic leading-relaxed mb-6">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-[#D3D0C6] flex items-baseline justify-between text-xs">
                <div>
                  <h3 className="font-bold text-[#22221F]">{item.client}</h3>
                  <p className="text-[#77766F] text-[11px]">{item.role}</p>
                </div>
                <span className="font-mono text-[10px] uppercase text-[#596637] bg-[#E8E5DA] px-2 py-0.5 rounded border border-[#D3D0C6]">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
