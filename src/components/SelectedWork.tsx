"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS, Project } from "@/data/portfolioData";
import ProjectModal from "./ProjectModal";

export default function SelectedWork() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filters = [
    { label: "All Projects", value: "all" },
    { label: "Cinematic Films", value: "films" },
    { label: "Portraits", value: "portraits" },
    { label: "Brand Campaigns", value: "brand" },
    { label: "Editorial", value: "editorial" },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.filter === activeFilter);

  return (
    <section id="work" className="w-full py-16 sm:py-24 px-4 sm:px-8 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 sm:pb-16 border-b border-[#D3D0C6]">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] text-[#77766F] uppercase mb-3">
              A SELECTION OF MY WORK
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#22221F]">
              Stories worth seeing.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#77766F] max-w-xl">
              A collection of moments, places, people, and ideas captured through my lens.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2 md:pt-0">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-200 ${
                  activeFilter === f.value
                    ? "bg-[#596637] text-[#F2F0E8] shadow-xs"
                    : "bg-[#F2F0E8] text-[#77766F] hover:text-[#22221F] hover:bg-[#D5D0C3]/60 border border-[#D3D0C6]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetrical Editorial Grid */}
        <div className="grid grid-cols-12 gap-6 sm:gap-8 pt-10 sm:pt-14">
          {filteredProjects.map((project, index) => {
            const isTall = project.aspect === "portrait";

            return (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={`${project.span} group cursor-pointer flex flex-col justify-between`}
              >
                {/* Image Container with Subtle Hover Zoom */}
                <div
                  className={`relative w-full ${
                    isTall
                      ? "h-[420px] sm:h-[520px] md:h-[580px]"
                      : "h-[320px] sm:h-[400px] md:h-[480px]"
                  } rounded-[20px] sm:rounded-[24px] overflow-hidden bg-[#D5D0C3] border border-[#D3D0C6] transition-all duration-500`}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Gradient Overlay for subtle depth on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#22221F]/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Category Pill Tag */}
                  <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-10">
                    <span className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono tracking-wider uppercase bg-[#F2F0E8]/90 backdrop-blur-xs text-[#22221F] border border-[#D3D0C6]">
                      {project.category}
                    </span>
                  </div>

                  {/* Hover Arrow Icon Button */}
                  <div className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 z-10 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#F2F0E8] text-[#22221F] flex items-center justify-center shadow-md transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-hover:bg-[#596637] group-hover:text-[#F2F0E8] transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                {/* Card Title & Meta Info */}
                <div className="pt-4 sm:pt-5 pb-2 flex items-baseline justify-between border-b border-[#D3D0C6]/60">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#22221F] group-hover:text-[#596637] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#77766F] mt-1 font-medium">
                      {project.location} · {project.client}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-[#77766F] font-semibold">
                    {project.year}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Projects Link */}
        <div className="pt-14 sm:pt-16 flex items-center justify-center">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-[#22221F] hover:text-[#596637] transition-colors pb-1 border-b border-[#22221F] hover:border-[#596637]"
          >
            <span>View All Projects & Archive</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
