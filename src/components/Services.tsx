"use client";

import React, { useState } from "react";
import { Camera, Film, Sparkles, Compass, ArrowUpRight, Check } from "lucide-react";
import { SERVICES, Service } from "@/data/portfolioData";

export default function Services() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const getIcon = (iconName: Service["icon"]) => {
    switch (iconName) {
      case "camera":
        return <Camera className="w-6 h-6 text-[#596637] stroke-[1.5]" />;
      case "film":
        return <Film className="w-6 h-6 text-[#596637] stroke-[1.5]" />;
      case "sparkles":
        return <Sparkles className="w-6 h-6 text-[#596637] stroke-[1.5]" />;
      case "compass":
        return <Compass className="w-6 h-6 text-[#596637] stroke-[1.5]" />;
      default:
        return <Camera className="w-6 h-6 text-[#596637] stroke-[1.5]" />;
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
    <section id="services" className="w-full py-16 sm:py-24 px-4 sm:px-8 md:px-12 bg-[#E8E5DA]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-2xl pb-12 sm:pb-16 border-b border-[#D3D0C6]">
          <p className="text-xs font-semibold tracking-[0.25em] text-[#77766F] uppercase mb-3">
            CREATIVE DISCIPLINES
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#22221F]">
            What I do best.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#77766F]">
            Refined visual productions crafted for discerning individuals, weddings, and forward-thinking brands.
          </p>
        </div>

        {/* Services Grid (2x2 balanced editorial layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pt-10 sm:pt-14">
          {SERVICES.map((service, idx) => (
            <div
              key={service.id}
              className="p-8 sm:p-10 bg-[#F2F0E8] border border-[#D3D0C6] rounded-[24px] hover:border-[#596637]/60 hover:shadow-sm transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Header with Icon & Index */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#E8E5DA] border border-[#D3D0C6] flex items-center justify-center group-hover:scale-105 transition-transform">
                    {getIcon(service.icon)}
                  </div>
                  <span className="font-mono text-xs font-semibold tracking-widest text-[#77766F]">
                    0{idx + 1}
                  </span>
                </div>

                {/* Service Category & Title */}
                <p className="text-[11px] font-mono tracking-widest text-[#596637] uppercase mb-1">
                  {service.category}
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#22221F] tracking-tight mb-4 group-hover:text-[#596637] transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm sm:text-base text-[#77766F] leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Key Deliverables */}
                <div className="space-y-2 py-4 border-t border-[#D3D0C6]/70 mb-6">
                  <p className="text-[11px] font-bold tracking-wider text-[#22221F] uppercase">
                    Deliverables Include:
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#77766F]">
                    {service.deliverables.map((item) => (
                      <li key={item} className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-[#596637] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Inquire Action Button */}
              <button
                onClick={() => handleServiceInquire(service.title)}
                className="inline-flex items-center justify-between w-full pt-4 border-t border-[#D3D0C6]/70 text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#22221F] group-hover:text-[#596637] transition-colors cursor-pointer"
              >
                <span>Inquire About {service.title}</span>
                <span className="w-8 h-8 rounded-full bg-[#E8E5DA] flex items-center justify-center group-hover:bg-[#596637] group-hover:text-[#F2F0E8] transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
