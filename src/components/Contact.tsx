"use client";

import React, { useState } from "react";
import { ArrowUpRight, Mail, MapPin, Send, CheckCircle2 } from "lucide-react";
import { InstagramIcon } from "./SocialIcons";
import { CONTACT_INFO } from "@/data/portfolioData";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "Cinematic Films",
    date: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="w-full py-16 sm:py-24 px-4 sm:px-8 md:px-12 bg-[#D5D0C3]/30">
      <div className="max-w-7xl mx-auto">
        {/* Main CTA Rounded Container */}
        <div className="p-8 sm:p-12 md:p-16 lg:p-20 bg-[#F2F0E8] border border-[#D3D0C6] rounded-[28px] sm:rounded-[36px] shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Editorial CTA & Direct Contacts */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full">
              <div>
                <div className="inline-flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-[#596637] animate-pulse" />
                  <p className="text-xs font-semibold tracking-[0.25em] text-[#77766F] uppercase">
                    LET&apos;S CREATE SOMETHING MEANINGFUL
                  </p>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#22221F] leading-[1.1]">
                  Have a story <br />
                  to tell?
                </h2>

                <p className="mt-6 text-base sm:text-lg text-[#77766F] leading-relaxed">
                  Whether it&apos;s a personal project, a celebration, or a brand campaign,
                  let&apos;s bring your vision to life.
                </p>
              </div>

              {/* Direct Info Card Grid */}
              <div className="mt-10 sm:mt-14 space-y-4 pt-8 border-t border-[#D3D0C6]">
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[#E8E5DA] hover:bg-[#D5D0C3] text-[#22221F] border border-[#D3D0C6] transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#596637] text-[#F2F0E8] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-mono tracking-widest text-[#77766F] uppercase">
                      Direct Inquiries
                    </p>
                    <p className="text-sm font-semibold truncate group-hover:text-[#596637] transition-colors">
                      {CONTACT_INFO.email}
                    </p>
                  </div>
                </a>

                <a
                  href={CONTACT_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[#E8E5DA] hover:bg-[#D5D0C3] text-[#22221F] border border-[#D3D0C6] transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#596637] text-[#F2F0E8] flex items-center justify-center shrink-0">
                    <InstagramIcon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-mono tracking-widest text-[#77766F] uppercase">
                      Visual Journal
                    </p>
                    <p className="text-sm font-semibold truncate group-hover:text-[#596637] transition-colors">
                      {CONTACT_INFO.instagram}
                    </p>
                  </div>
                </a>

                <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[#E8E5DA] border border-[#D3D0C6] text-[#22221F]">
                  <div className="w-10 h-10 rounded-lg bg-[#596637] text-[#F2F0E8] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono tracking-widest text-[#77766F] uppercase">
                      Studio Location
                    </p>
                    <p className="text-xs sm:text-sm font-semibold text-[#22221F]">
                      {CONTACT_INFO.location} · {CONTACT_INFO.availability}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Inquiry Form */}
            <div className="lg:col-span-7 bg-[#E8E5DA] border border-[#D3D0C6] rounded-2xl sm:rounded-3xl p-6 sm:p-10">
              {submitted ? (
                <div className="py-12 sm:py-16 text-center space-y-4 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-[#596637]/10 text-[#596637] mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 stroke-[1.5]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#22221F]">
                    Thank you, {formData.name}.
                  </h3>
                  <p className="text-sm sm:text-base text-[#77766F] max-w-md mx-auto">
                    Your inquiry has been received. I review every project brief personally and will respond within 24–48 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        service: "Cinematic Films",
                        date: "",
                        message: "",
                      });
                    }}
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#596637] hover:underline pt-4"
                  >
                    <span>Send another inquiry</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold tracking-wider text-[#22221F] uppercase mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="e.g. Elena Rostova"
                        className="w-full px-4 py-3 bg-[#F2F0E8] border border-[#D3D0C6] rounded-xl text-sm text-[#22221F] placeholder-[#77766F]/60 focus:outline-none focus:border-[#596637] focus:ring-1 focus:ring-[#596637]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold tracking-wider text-[#22221F] uppercase mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="name@company.com"
                        className="w-full px-4 py-3 bg-[#F2F0E8] border border-[#D3D0C6] rounded-xl text-sm text-[#22221F] placeholder-[#77766F]/60 focus:outline-none focus:border-[#596637] focus:ring-1 focus:ring-[#596637]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold tracking-wider text-[#22221F] uppercase mb-2">
                        Service Discipline
                      </label>
                      <select
                        id="service-select"
                        value={formData.service}
                        onChange={(e) =>
                          setFormData({ ...formData, service: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-[#F2F0E8] border border-[#D3D0C6] rounded-xl text-sm text-[#22221F] focus:outline-none focus:border-[#596637] focus:ring-1 focus:ring-[#596637]"
                      >
                        <option value="Cinematic Films">Cinematic Films</option>
                        <option value="Photography">Portrait & Stills</option>
                        <option value="Weddings & Events">Weddings & Celebrations</option>
                        <option value="Brand Campaigns">Brand Campaigns</option>
                        <option value="Other Commissions">Other Commissions</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold tracking-wider text-[#22221F] uppercase mb-2">
                        Target Date or Season
                      </label>
                      <input
                        type="text"
                        value={formData.date}
                        onChange={(e) =>
                          setFormData({ ...formData, date: e.target.value })
                        }
                        placeholder="e.g. Autumn 2026 or Q4"
                        className="w-full px-4 py-3 bg-[#F2F0E8] border border-[#D3D0C6] rounded-xl text-sm text-[#22221F] placeholder-[#77766F]/60 focus:outline-none focus:border-[#596637] focus:ring-1 focus:ring-[#596637]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold tracking-wider text-[#22221F] uppercase mb-2">
                      Tell Me About Your Story & Vision
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Share your ideas, location, aesthetic inspirations, or specific requirements..."
                      className="w-full px-4 py-3 bg-[#F2F0E8] border border-[#D3D0C6] rounded-xl text-sm text-[#22221F] placeholder-[#77766F]/60 focus:outline-none focus:border-[#596637] focus:ring-1 focus:ring-[#596637] resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="group w-full py-4 px-8 bg-[#596637] text-[#F2F0E8] font-semibold text-sm sm:text-base tracking-wider uppercase rounded-full shadow-sm hover:bg-[#4a552e] hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#596637] focus:ring-offset-2"
                    >
                      <span>Let&apos;s Talk</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </button>
                  </div>

                  <p className="text-center text-[11px] text-[#77766F] pt-1">
                    Typically responding within 24 hours · Worldwide travels accommodated
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
