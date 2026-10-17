"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";

interface NavbarProps {
  activeSection?: string;
}

export default function Navbar({ activeSection = "home" }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Work", href: "#work" },
    { name: "Designs", href: "#visual-designs" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" },
  ];

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="w-full pt-6 sm:pt-8 pb-4 px-4 sm:px-8 md:px-12 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Side: Typographic Logo */}
        <Link
          href="#home"
          onClick={(e) => handleLinkClick(e, "#home")}
          className="group flex flex-col items-start cursor-pointer focus:outline-none"
        >
          <span className="text-xl sm:text-2xl font-bold tracking-[0.28em] text-[#22221F] uppercase transition-colors group-hover:text-[#596637]">
            अnurag
          </span>
          <span className="text-[9px] tracking-[0.35em] text-[#77766F] uppercase font-medium mt-0.5">
            VISUAL STORYTELLER
          </span>
        </Link>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 lg:space-x-10 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive =
              activeSection.toLowerCase() === link.name.toLowerCase() ||
              (activeSection === "" && link.name === "Home");

            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`relative py-1 tracking-wide transition-colors duration-200 ${
                  isActive
                    ? "text-[#22221F] font-semibold"
                    : "text-[#77766F] hover:text-[#22221F]"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#596637] rounded-full animate-in fade-in" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Side: Quick Action & Hamburger */}
        <div className="flex items-center gap-3 sm:gap-4">
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, "#contact")}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold tracking-wider text-[#22221F] hover:text-[#596637] transition-colors uppercase"
          >
            Inquire
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Hamburger Icon */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="p-2 -mr-2 text-[#22221F] hover:text-[#596637] transition-colors focus:outline-none focus:ring-1 focus:ring-[#596637] rounded-full"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 stroke-[1.5]" />
            ) : (
              <Menu className="w-6 h-6 stroke-[1.5]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 pt-6 pb-8 px-6 bg-[#F2F0E8] border border-[#D3D0C6] rounded-2xl shadow-sm animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-lg font-medium text-[#22221F] hover:text-[#596637] py-2 border-b border-[#D3D0C6]/50 transition-colors flex items-center justify-between"
              >
                <span>{link.name}</span>
                <span className="text-xs text-[#77766F] font-mono tracking-widest">
                  ↗
                </span>
              </a>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, "#contact")}
                className="w-full py-3 bg-[#596637] text-[#F2F0E8] text-center text-sm font-medium tracking-wider uppercase rounded-full hover:bg-[#4a552e] transition-colors"
              >
                Book a Session ↗
              </a>
              <div className="text-center text-xs text-[#77766F] pt-2">
                Mumbai · Available Worldwide
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
