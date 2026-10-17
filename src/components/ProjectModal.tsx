"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { X, ArrowUpRight, Camera, MapPin, Calendar, UserCheck } from "lucide-react";
import { Project } from "@/data/portfolioData";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-[#22221F]/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-[#F2F0E8] border border-[#D3D0C6] rounded-[24px] shadow-2xl p-6 sm:p-8 md:p-12 text-[#22221F]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 sm:top-7 sm:right-7 p-2 rounded-full bg-[#E8E5DA] text-[#22221F] hover:bg-[#596637] hover:text-[#F2F0E8] transition-colors focus:outline-none"
        >
          <X className="w-5 h-5 stroke-[1.5]" />
        </button>

        {/* Header Metadata */}
        <div className="flex flex-wrap items-center gap-3 text-xs tracking-widest text-[#77766F] uppercase mb-4">
          <span className="font-semibold text-[#596637]">{project.category}</span>
          <span>·</span>
          <span>{project.year}</span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            {project.location}
          </span>
        </div>

        {/* Project Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#22221F] mb-6">
          {project.title}
        </h2>

        {/* Main Image Banner */}
        <div className="relative w-full h-[320px] sm:h-[450px] md:h-[520px] rounded-2xl overflow-hidden mb-8 border border-[#D3D0C6]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Editorial Details & Specifications */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-4 border-t border-[#D3D0C6]">
          {/* Left: Synopsis & Director's Note */}
          <div className="md:col-span-7 space-y-4">
            <h3 className="text-xs font-bold tracking-[0.2em] text-[#77766F] uppercase">
              Project Overview & Concept
            </h3>
            <p className="text-base sm:text-lg text-[#22221F] leading-relaxed">
              {project.synopsis}
            </p>

            {project.quote && (
              <blockquote className="mt-6 p-4 sm:p-5 bg-[#E8E5DA] border-l-2 border-[#596637] rounded-r-xl">
                <p className="italic text-sm sm:text-base text-[#22221F]">
                  &ldquo;{project.quote}&rdquo;
                </p>
                {project.quoteAuthor && (
                  <footer className="mt-2 text-xs font-semibold tracking-wider text-[#77766F] uppercase">
                    — {project.quoteAuthor}
                  </footer>
                )}
              </blockquote>
            )}
          </div>

          {/* Right: Technical Gear & Client Metadata */}
          <div className="md:col-span-5 bg-[#E8E5DA] border border-[#D3D0C6] p-5 sm:p-6 rounded-2xl space-y-4 text-sm">
            <h4 className="text-xs font-bold tracking-[0.2em] text-[#596637] uppercase">
              Production Details
            </h4>

            <div className="space-y-3 divide-y divide-[#D3D0C6]">
              <div className="pt-2 flex items-center justify-between text-xs">
                <span className="text-[#77766F] flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5" /> Client
                </span>
                <span className="font-semibold text-[#22221F]">{project.client}</span>
              </div>

              <div className="pt-3 flex items-center justify-between text-xs">
                <span className="text-[#77766F] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> Year
                </span>
                <span className="font-semibold text-[#22221F]">{project.year}</span>
              </div>

              <div className="pt-3 flex flex-col gap-1 text-xs">
                <span className="text-[#77766F] flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5" /> Camera & Optics
                </span>
                <span className="font-mono text-[#22221F] font-medium pt-1">
                  {project.cameraGear}
                </span>
              </div>
            </div>

            <div className="pt-4">
              <a
                href="#contact"
                onClick={onClose}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 bg-[#596637] text-[#F2F0E8] text-xs font-semibold tracking-wider uppercase rounded-full hover:bg-[#4a552e] transition-colors"
              >
                <span>Commission Similar Work</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
