"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { InstagramIcon, VimeoIcon, YoutubeIcon, LinkedinIcon } from "./SocialIcons";
import { CONTACT_INFO } from "@/data/portfolioData";

export default function Footer() {
  const [currentYear, setCurrentYear] = React.useState(2026);

  React.useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Work", href: "#work" },
    { name: "Designs", href: "#visual-designs" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <footer className="w-full bg-[#E8E5DA] border-t border-[#D3D0C6] py-12 sm:py-16 px-4 sm:px-8 md:px-12 text-[#22221F]">
      <div className="max-w-7xl mx-auto flex flex-col justify-between gap-10">
        {/* Top Row: Brand & Back to top */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-[#D3D0C6]">
          <div>
            <span className="text-2xl sm:text-3xl font-bold tracking-[0.25em] uppercase text-[#22221F]">
              अnurag
            </span>
            <p className="text-xs sm:text-sm text-[#77766F] mt-1 tracking-wider uppercase font-medium">
              Cinematographer & Visual Storyteller
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#77766F] hover:text-[#596637] transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <span className="w-8 h-8 rounded-full border border-[#D3D0C6] flex items-center justify-center group-hover:border-[#596637] group-hover:bg-[#596637] group-hover:text-[#F2F0E8] transition-all">
              <ArrowUp className="w-3.5 h-3.5" />
            </span>
          </button>
        </div>

        {/* Middle Row: Navigation Links & Socials */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-sm">
          <nav className="flex flex-wrap items-center gap-6 sm:gap-8 font-medium">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[#77766F] hover:text-[#22221F] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-5 text-[#77766F]">
            <a
              href={CONTACT_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-[#596637] transition-colors"
            >
              <InstagramIcon className="w-5 h-5" />
            </a>
            <a
              href={CONTACT_INFO.vimeoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Vimeo"
              className="hover:text-[#596637] transition-colors"
            >
              <VimeoIcon className="w-5 h-5" />
            </a>
            <a
              href={CONTACT_INFO.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="hover:text-[#596637] transition-colors"
            >
              <YoutubeIcon className="w-5 h-5" />
            </a>
            <a
              href={CONTACT_INFO.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-[#596637] transition-colors"
            >
              <LinkedinIcon className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Bottom Row: Dynamic Copyright & Colophon */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#D3D0C6] text-xs text-[#77766F] font-mono">
          <p>© {currentYear} अnurag. All rights reserved.</p>
          <p className="tracking-wider">Editorial Fashion & Cinematic Narrative</p>
        </div>
      </div>
    </footer>
  );
}
