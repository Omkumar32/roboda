"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  Project,
  VisualDesignItem,
  Service,
  PROJECTS,
  VISUAL_DESIGNS,
  SERVICES,
  CONTACT_INFO,
} from "@/data/portfolioData";

export interface HeroContent {
  eyebrow: string;
  displayHeadlineTop: string;
  displayHeadlineBottom: string;
  boldHeadlineLead: string;
  boldHeadlineHighlight: string;
  description: string;
  creatorImage: string;
}

export interface AboutPillar {
  title: string;
  desc: string;
  icon: "sparkles" | "camera" | "film" | "star" | "compass" | "layers";
}

export interface AboutContent {
  eyebrow?: string;
  heading: string;
  monogram: string;
  authorName: string;
  subtitle: string;
  establishedYear: string;
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
  quote: string;
  portraitImage: string;
  pillars?: AboutPillar[];
  ctaButtonText?: string;
  ctaButtonTextExpanded?: string;
  contactButtonText?: string;
}

export interface ContactContent {
  email: string;
  instagram: string;
  instagramUrl: string;
  vimeoUrl: string;
  youtubeUrl: string;
  behanceUrl: string;
  linkedinUrl: string;
  location: string;
  availability: string;
  phone?: string;
}

export interface SmtpSettings {
  enabled: boolean;
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  fromName: string;
  fromEmail: string;
  toEmail: string;
}

export interface InquiryItem {
  id: string;
  name: string;
  email: string;
  service: string;
  date?: string;
  message: string;
  createdAt: string;
  status: "new" | "replied" | "archived";
}

export interface PortfolioData {
  hero: HeroContent;
  about: AboutContent;
  projects: Project[];
  visualDesigns: VisualDesignItem[];
  services: Service[];
  contact: ContactContent;
  smtp?: SmtpSettings;
  inquiries?: InquiryItem[];
  updatedAt?: string;
}

export const DEFAULT_PORTFOLIO_DATA: PortfolioData = {
  hero: {
    eyebrow: "PHOTOGRAPHER & VISUAL STORYTELLER",
    displayHeadlineTop: "Behind",
    displayHeadlineBottom: "the lens",
    boldHeadlineLead: "Stories in",
    boldHeadlineHighlight: "Motion.",
    description:
      "Capturing authentic moments, meaningful stories, and cinematic visuals that stay with you.",
    creatorImage: "/images/hero-creator.png",
  },
  about: {
    eyebrow: "A LITTLE ABOUT ME",
    heading: "Behind every frame, there's a feeling.",
    monogram: "अ",
    authorName: "ANURAG",
    subtitle: "Cinematographer & Stills",
    establishedYear: "EST. 2020",
    paragraph1:
      "I'm a photographer and visual storyteller passionate about capturing honest emotions, meaningful details, and moments that deserve to be remembered.",
    paragraph2:
      "My process is rooted in patience, observation, and an obsession with light. Whether working with creative brands or filming intimate milestone celebrations, I strive to craft visual narratives that feel effortless, cinematic, and deeply human.",
    paragraph3:
      "From the bustling streetscapes of Mumbai to secluded natural retreats across India and abroad, my camera serves as an invitation to slow down and see the unnoticed poetry of life.",
    quote:
      "Great photography is not about asserting control over the scene; it's about attuning yourself to the story that is already unfolding.",
    portraitImage: "/images/editorial_camera.jpg",
    pillars: [
      {
        title: "Light & Atmosphere",
        desc: "Harnessing natural golden hour and organic shadows to create depth without artificial stiffness.",
        icon: "sparkles",
      },
      {
        title: "Authentic Human Emotion",
        desc: "Creating a calm, trusting space where subjects feel free to simply be themselves.",
        icon: "camera",
      },
      {
        title: "Cinematic Color Tone",
        desc: "Bespoke color palettes grounded in warm earth tones, subtle greens, and soft film grain.",
        icon: "film",
      },
    ],
    ctaButtonText: "More About Me",
    ctaButtonTextExpanded: "Show Less",
    contactButtonText: "Let's Connect",
  },
  projects: PROJECTS,
  visualDesigns: VISUAL_DESIGNS,
  services: SERVICES,
  contact: CONTACT_INFO,
  smtp: {
    enabled: false,
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    user: "",
    pass: "",
    fromName: "Anurag Studio Portfolio",
    fromEmail: "",
    toEmail: CONTACT_INFO.email || "anurag@anurag.studio",
  },
  inquiries: [],
};

interface PortfolioDataContextType {
  data: PortfolioData;
  isLoading: boolean;
  saveData: (newData: PortfolioData) => Promise<{ success: boolean; error?: string }>;
  resetToDefaults: () => Promise<void>;
  uploadFile: (file: File) => Promise<{ url: string; error?: string }>;
  refreshData: () => Promise<void>;
}

const PortfolioDataContext = createContext<PortfolioDataContextType | undefined>(
  undefined
);

const LOCAL_STORAGE_KEY = "anurag_portfolio_data_v1";

export function PortfolioDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [data, setData] = useState<PortfolioData>(DEFAULT_PORTFOLIO_DATA);
  const [isLoading, setIsLoading] = useState(true);

  const refreshData = async () => {
    try {
      // 1. First check local storage for instant responsiveness
      if (typeof window !== "undefined") {
        const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (cached) {
          try {
            const parsed = JSON.parse(cached);
            setData(parsed);
          } catch (e) {
            console.warn("Invalid cached portfolio data");
          }
        }
      }

      // 2. Fetch server-side truth
      const res = await fetch("/api/admin/data", { cache: "no-store" });
      if (res.ok) {
        const serverData = await res.json();
        if (serverData && serverData.projects) {
          const merged: PortfolioData = {
            ...DEFAULT_PORTFOLIO_DATA,
            ...serverData,
            hero: { ...DEFAULT_PORTFOLIO_DATA.hero, ...(serverData.hero || {}) },
            about: { ...DEFAULT_PORTFOLIO_DATA.about, ...(serverData.about || {}) },
            contact: { ...DEFAULT_PORTFOLIO_DATA.contact, ...(serverData.contact || {}) },
            smtp: { ...DEFAULT_PORTFOLIO_DATA.smtp!, ...(serverData.smtp || {}) },
            inquiries: serverData.inquiries || [],
          };
          setData(merged);
          if (typeof window !== "undefined") {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(merged));
          }
        }
      }
    } catch (err) {
      console.warn("Failed to fetch dynamic portfolio data, using defaults:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const saveData = async (newData: PortfolioData) => {
    try {
      setData(newData);
      if (typeof window !== "undefined") {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newData));
      }

      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      });

      if (!res.ok) {
        const err = await res.json();
        return { success: false, error: err.error || "Save failed" };
      }

      return { success: true };
    } catch (error: any) {
      return { success: false, error: error?.message || "Failed to save data" };
    }
  };

  const resetToDefaults = async () => {
    await saveData(DEFAULT_PORTFOLIO_DATA);
  };

  const uploadFile = async (file: File): Promise<{ url: string; error?: string }> => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (!res.ok || json.error) {
        return { url: "", error: json.error || "Upload failed" };
      }

      return { url: json.url };
    } catch (error: any) {
      return { url: "", error: error?.message || "Upload request error" };
    }
  };

  return (
    <PortfolioDataContext.Provider
      value={{
        data,
        isLoading,
        saveData,
        resetToDefaults,
        uploadFile,
        refreshData,
      }}
    >
      {children}
    </PortfolioDataContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioDataContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioDataProvider");
  }
  return context;
}
