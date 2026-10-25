"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/data/portfolioData";
import { usePortfolio } from "@/context/PortfolioDataContext";
import ProjectModal from "./ProjectModal";

export default function SelectedWork() {
  const { data } = usePortfolio();
  const projects = data?.projects || [];
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section
      id="work"
      className="w-full h-auto lg:h-screen lg:max-h-screen py-5 sm:py-6 lg:py-5 px-4 sm:px-8 md:px-12 bg-[#E8E5DA] flex flex-col justify-between border-b border-[#D3D0C6] overflow-visible lg:overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full h-full flex flex-col justify-between">
        {/* Compact Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 pb-3 border-b border-[#D3D0C6] shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
            <span className="w-2 h-2 rounded-full bg-[#596637] animate-pulse shrink-0" />
            <h2 className="select-none flex flex-wrap items-center gap-2 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-sans font-black tracking-tight leading-none">
              <span className="text-[#22221F] uppercase">STORIES</span>
              <span
                className="uppercase transition-all duration-300"
                style={{
                  WebkitTextStroke: "1.5px #596637",
                  color: "rgba(89, 102, 55, 0.14)",
                  opacity: 0.92,
                }}
              >
                WORTH SEEING
              </span>
            </h2>
            <span className="hidden sm:inline-block text-xs font-mono text-[#77766F] pl-2 border-l border-[#D3D0C6]">
              A collection of moments captured through my lens
            </span>
          </div>

          <div className="text-[10px] sm:text-[11px] font-mono tracking-wider uppercase text-[#77766F] flex items-center gap-2 self-start sm:self-auto">
            <span>VISUAL ARCHIVE</span>
            <span className="text-[#596637]">·</span>
            <span>{projects.length} FRAMES</span>
          </div>
        </div>

        {/* Masonry Feed: Natural page scroll on mobile, 1-screen scrollable on desktop */}
        <div className="flex-1 min-h-0 my-3 lg:overflow-y-auto pr-0 sm:pr-1 lg:pr-2 scrollbar-thin">
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 sm:gap-4 [column-fill:_balance]">
            {projects.map((project, index) => {
              // Responsive aspect ratio: well-balanced on mobile, editorial variety on desktop
              const aspectClass =
                project.aspect === "landscape"
                  ? "aspect-[4/3] sm:aspect-[16/10]"
                  : project.aspect === "tall"
                  ? "aspect-[3/4] sm:aspect-[9/13]"
                  : project.aspectRatioClass || "aspect-[3/4]";

              return (
                <div
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="break-inside-avoid mb-3 sm:mb-4 group cursor-pointer"
                >
                  {/* Pure Media Container (Video or Photo) */}
                  <div
                    className={`relative w-full ${aspectClass} rounded-xl sm:rounded-2xl overflow-hidden bg-[#D5D0C3] border border-[#D3D0C6] transition-all duration-400 group-hover:border-[#596637] group-hover:shadow-xl group-hover:-translate-y-0.5`}
                  >
                  {project.video ? (
                    <video
                      src={project.video}
                      poster={project.image}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
                    />
                  ) : (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      priority={index < 4}
                    />
                  )}

                  {/* Clean Minimal Hover Overlay with Project Title and Arrow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#22221F]/85 via-[#22221F]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3 sm:p-3.5 pointer-events-none">
                    <div className="flex items-center justify-between">
                      {project.video ? (
                        <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-black/60 text-[#E8E5DA] uppercase backdrop-blur-xs">
                          ▶ Video
                        </span>
                      ) : <span />}
                      {project.link && (
                        <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-[#596637] text-[#F2F0E8] uppercase shadow-xs">
                          Link ↗
                        </span>
                      )}
                    </div>

                    <div className="flex items-end justify-between">
                      <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-[#F2F0E8]/75 block mb-0.5">
                          {project.category}
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-[#F2F0E8] leading-tight truncate max-w-[180px]">
                          {project.title}
                        </h4>
                      </div>

                      <div className="w-7 h-7 rounded-full bg-[#F2F0E8] text-[#22221F] flex items-center justify-center shadow-md transform translate-y-2 group-hover:translate-y-0 group-hover:bg-[#596637] group-hover:text-[#F2F0E8] transition-all duration-300">
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          </div>
        </div>

        {/* Compact Bottom Bar */}
        <div className="pt-2 border-t border-[#D3D0C6] flex items-center justify-between text-xs shrink-0">
          <p className="text-[11px] font-mono text-[#77766F]">
            {projects.length} CURATED FRAMES · CLICK ANY PHOTO TO VIEW FULL CASE STUDY
          </p>

          <a
            href="#contact"
            className="group inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-[#22221F] hover:text-[#596637] transition-colors pb-0.5 border-b border-[#22221F] hover:border-[#596637]"
          >
            <span>Commission a Project</span>
            <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>

      {/* Interactive Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
