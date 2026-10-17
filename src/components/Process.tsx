"use client";

import React from "react";
import { PROCESS_STEPS } from "@/data/portfolioData";
import { Sparkles } from "lucide-react";

export default function Process() {
  return (
    <section className="w-full py-16 sm:py-24 px-4 sm:px-8 md:px-12 bg-[#D5D0C3]/20 border-y border-[#D3D0C6]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#596637]" />
            <p className="text-xs font-semibold tracking-[0.25em] text-[#77766F] uppercase">
              METHODOLOGY
            </p>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#22221F]">
            The Creative Process.
          </h2>
          <p className="mt-3 text-base text-[#77766F]">
            How we transform an initial concept into timeless visual imagery.
          </p>
        </div>

        {/* 3 Step Editorial Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROCESS_STEPS.map((step) => (
            <div
              key={step.number}
              className="p-8 bg-[#F2F0E8] border border-[#D3D0C6] rounded-[24px] flex flex-col justify-between hover:border-[#596637] transition-colors"
            >
              <div>
                <div className="flex items-baseline justify-between mb-6 pb-4 border-b border-[#D3D0C6]">
                  <span className="font-mono text-3xl font-extrabold text-[#596637]">
                    {step.number}
                  </span>
                  <span className="text-xs font-bold tracking-[0.2em] text-[#22221F] uppercase px-3 py-1 bg-[#E8E5DA] rounded-full border border-[#D3D0C6]">
                    {step.phase}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#22221F] tracking-tight mb-3">
                  {step.title}
                </h3>

                <p className="text-sm text-[#77766F] leading-relaxed mb-6">
                  {step.description}
                </p>
              </div>

              {/* Checklist points */}
              <div className="pt-4 border-t border-[#D3D0C6]/60">
                <ul className="space-y-2 text-xs text-[#22221F]/80">
                  {step.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#596637]" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Philosophy Note Banner */}
        <div className="mt-12 p-6 sm:p-8 bg-[#E8E5DA] border border-[#D3D0C6] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-[#596637] shrink-0" />
            <p className="text-sm text-[#22221F] font-medium">
              Every commission is tailored uniquely. No formulaic scripts, only honest storytelling.
            </p>
          </div>
          <a
            href="#contact"
            className="shrink-0 text-xs font-semibold tracking-wider uppercase text-[#596637] hover:underline"
          >
            Start Your Project ↗
          </a>
        </div>
      </div>
    </section>
  );
}
