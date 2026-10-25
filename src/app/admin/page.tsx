"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  usePortfolio,
  PortfolioData,
  DEFAULT_PORTFOLIO_DATA,
} from "@/context/PortfolioDataContext";
import { Project, VisualDesignItem, Service } from "@/data/portfolioData";
import {
  Image as ImageIcon,
  Video,
  FileText,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  Upload,
  ExternalLink,
  Check,
  AlertCircle,
  Layers,
  Sparkles,
  ArrowLeft,
  Download,
  UploadCloud,
  X,
  Search,
  SlidersHorizontal,
  Film,
  Camera,
  MapPin,
  Calendar,
  Quote,
  Edit3,
  TrendingUp,
  Globe,
  Mail,
  Play,
  Star,
  BarChart2,
  Settings,
  Share2,
  CheckCircle2,
  Eye,
  EyeOff,
  Send,
  Inbox,
  Sliders,
} from "lucide-react";
import { InstagramIcon, YoutubeIcon, LinkedinIcon, VimeoIcon } from "@/components/SocialIcons";

type NavTab = "stories" | "designs" | "content" | "services" | "social" | "inbox";

export default function AdminPage() {
  const { data, isLoading, saveData, resetToDefaults, uploadFile } = usePortfolio();
  const [activeTab, setActiveTab] = useState<NavTab>("stories");
  const [formData, setFormData] = useState<PortfolioData>(data);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  // SMTP & Mail Testing State
  const [isTestingSmtp, setIsTestingSmtp] = useState(false);
  const [smtpTestResult, setSmtpTestResult] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [showSmtpPass, setShowSmtpPass] = useState(false);

  // Inquiries Search & Filter
  const [inquirySearch, setInquirySearch] = useState("");
  const [inquiryFilter, setInquiryFilter] = useState<"all" | "new" | "replied" | "archived">("all");

  // Stories Filter & Search
  const [storySearch, setStorySearch] = useState("");
  const [storyFilter, setStoryFilter] = useState<string>("all");

  // Slide-over Drawer for Editing a Story
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Slide-over Drawer for Editing a Visual Design
  const [editingDesign, setEditingDesign] = useState<VisualDesignItem | null>(null);

  // Synchronize with server state on load
  useEffect(() => {
    if (!isLoading && data) {
      setFormData(data);
    }
  }, [isLoading, data]);

  // Keyboard shortcut: Cmd/Ctrl + S to save
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        handleSaveAll();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [formData]);

  const triggerStatus = (type: "success" | "error", message: string) => {
    setSaveStatus({ type, message });
    setTimeout(() => {
      setSaveStatus({ type: null, message: "" });
    }, 4500);
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    const result = await saveData(formData);
    setIsSaving(false);

    if (result.success) {
      triggerStatus("success", "All updates published to portfolio successfully!");
    } else {
      triggerStatus("error", result.error || "Failed to save portfolio data.");
    }
  };

  const handleReset = async () => {
    if (
      window.confirm(
        "Are you sure you want to restore original default settings? All custom edits will be reverted."
      )
    ) {
      setIsSaving(true);
      await resetToDefaults();
      setFormData(DEFAULT_PORTFOLIO_DATA);
      setIsSaving(false);
      triggerStatus("success", "Portfolio restored to original defaults.");
    }
  };

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    onSuccess: (url: string) => void,
    fieldKey: string
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingField(fieldKey);
    const result = await uploadFile(file);
    setUploadingField(null);

    if (result.url) {
      onSuccess(result.url);
      triggerStatus("success", `File "${file.name}" uploaded successfully!`);
    } else {
      triggerStatus("error", result.error || "File upload failed.");
    }
  };

  // Export JSON
  const handleExportJSON = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(formData, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute(
      "download",
      `portfolio-backup-${new Date().toISOString().split("T")[0]}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import JSON
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.projects && parsed.hero) {
          setFormData(parsed);
          triggerStatus("success", "Backup imported! Click 'Publish Changes' to save.");
        } else {
          triggerStatus("error", "Invalid backup JSON file.");
        }
      } catch (err) {
        triggerStatus("error", "Failed to parse JSON file.");
      }
    };
    reader.readAsText(file);
  };

  // ================= STORIES HANDLERS =================
  const handleAddProject = () => {
    const newProject: Project = {
      id: `project-${Date.now()}`,
      title: "New Visual Story",
      category: "Cinematic Film",
      year: new Date().getFullYear().toString(),
      filter: "films",
      image: "/images/work-wedding.jpg",
      video: "",
      aspect: "landscape",
      aspectRatioClass: "aspect-[16/10]",
      span: "col-span-12 md:col-span-8",
      mediaType: "film",
      mediaTag: "▶ 4K CINEMA · 02:30",
      likesCount: 120,
      synopsis: "Brief narrative explaining this project.",
      client: "Client Name",
      location: "Location",
      cameraGear: "Cinema Gear & Optics",
      quote: "Client testimonial quote.",
      quoteAuthor: "Client",
      link: "",
    };

    setFormData((prev) => ({
      ...prev,
      projects: [newProject, ...prev.projects],
    }));
    setEditingProject(newProject);
  };

  const handleDeleteProject = (id: string) => {
    if (window.confirm("Delete this story from your portfolio?")) {
      setFormData((prev) => ({
        ...prev,
        projects: prev.projects.filter((p) => p.id !== id),
      }));
      if (editingProject?.id === id) setEditingProject(null);
    }
  };

  const handleUpdateProject = (id: string, updates: Partial<Project>) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    }));
    if (editingProject?.id === id) {
      setEditingProject((prev) => (prev ? { ...prev, ...updates } : null));
    }
  };

  // Filtered Stories
  const filteredProjects = useMemo(() => {
    return formData.projects.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(storySearch.toLowerCase()) ||
        p.category.toLowerCase().includes(storySearch.toLowerCase()) ||
        p.client.toLowerCase().includes(storySearch.toLowerCase()) ||
        p.location.toLowerCase().includes(storySearch.toLowerCase());

      const matchesFilter =
        storyFilter === "all" ||
        p.filter === storyFilter ||
        (storyFilter === "films" && p.video);

      return matchesSearch && matchesFilter;
    });
  }, [formData.projects, storySearch, storyFilter]);

  // Statistics
  const videoCount = formData.projects.filter((p) => p.video).length;
  const stillsCount = formData.projects.length - videoCount;
  const totalLikes = formData.projects.reduce((acc, p) => acc + (p.likesCount || 0), 0);
  const filmCount = formData.projects.filter((p) => p.video || p.filter === "films").length;
  const portraitCount = formData.projects.filter((p) => p.filter === "portraits").length;
  const brandCount = formData.projects.filter((p) => p.filter === "brand").length;
  const editorialCount = formData.projects.filter((p) => p.filter === "editorial").length;

  // ================= 3D VISUAL DESIGNS HANDLERS =================
  const handleAddDesign = () => {
    const newDesign: VisualDesignItem = {
      id: `design-${Date.now()}`,
      badgeTitle: "NEW VISUAL CONCEPT",
      badgeSubtitle: "EDITION 4K",
      title: "Title of Visual Concept",
      category: "YouTube Thumbnail & Cover",
      viewsOrMetric: "1.2M Views · 13.5% CTR",
      image: "/images/designs/thumb-drift.jpg",
      client: "Studio Network",
      year: new Date().getFullYear().toString(),
      tags: ["High CTR", "Color Graded", "Custom Framing"],
      description: "Description of the visual concept and strategy.",
      link: "",
    };

    setFormData((prev) => ({
      ...prev,
      visualDesigns: [...prev.visualDesigns, newDesign],
    }));
    setEditingDesign(newDesign);
  };

  const handleDeleteDesign = (id: string) => {
    if (window.confirm("Delete this 3D visual design?")) {
      setFormData((prev) => ({
        ...prev,
        visualDesigns: prev.visualDesigns.filter((d) => d.id !== id),
      }));
      if (editingDesign?.id === id) setEditingDesign(null);
    }
  };

  const handleUpdateDesign = (id: string, updates: Partial<VisualDesignItem>) => {
    setFormData((prev) => ({
      ...prev,
      visualDesigns: prev.visualDesigns.map((d) =>
        d.id === id ? { ...d, ...updates } : d
      ),
    }));
    if (editingDesign?.id === id) {
      setEditingDesign((prev) => (prev ? { ...prev, ...updates } : null));
    }
  };

  // ================= SMTP & INQUIRIES HANDLERS =================
  const handleTestSmtp = async () => {
    if (!formData.smtp?.host || !formData.smtp?.user || !formData.smtp?.pass) {
      setSmtpTestResult({
        type: "error",
        message: "Please fill in SMTP Host, Username, and Password first.",
      });
      return;
    }

    setIsTestingSmtp(true);
    setSmtpTestResult({ type: null, message: "" });

    try {
      const res = await fetch("/api/admin/test-smtp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData.smtp),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || "SMTP test failed.");
      }

      setSmtpTestResult({
        type: "success",
        message: result.message || "Connection verified! Test email successfully sent.",
      });
    } catch (err: any) {
      setSmtpTestResult({
        type: "error",
        message: err?.message || "Failed to establish connection to SMTP server.",
      });
    } finally {
      setIsTestingSmtp(false);
    }
  };

  const applySmtpPreset = (preset: "gmail" | "outlook" | "sendgrid" | "mailgun") => {
    const presets = {
      gmail: { host: "smtp.gmail.com", port: 587, secure: false },
      outlook: { host: "smtp.office365.com", port: 587, secure: false },
      sendgrid: { host: "smtp.sendgrid.net", port: 587, secure: false },
      mailgun: { host: "smtp.mailgun.org", port: 587, secure: false },
    };

    setFormData((prev) => ({
      ...prev,
      smtp: {
        ...(prev.smtp || DEFAULT_PORTFOLIO_DATA.smtp!),
        ...presets[preset],
      },
    }));
  };

  const handleUpdateInquiryStatus = (id: string, status: "new" | "replied" | "archived") => {
    setFormData((prev) => ({
      ...prev,
      inquiries: (prev.inquiries || []).map((inq) =>
        inq.id === id ? { ...inq, status } : inq
      ),
    }));
  };

  const handleDeleteInquiry = (id: string) => {
    if (window.confirm("Are you sure you want to delete this client inquiry?")) {
      setFormData((prev) => ({
        ...prev,
        inquiries: (prev.inquiries || []).filter((inq) => inq.id !== id),
      }));
    }
  };

  const filteredInquiries = useMemo(() => {
    const list = formData.inquiries || [];
    return list.filter((inq) => {
      const matchesSearch =
        inq.name.toLowerCase().includes(inquirySearch.toLowerCase()) ||
        inq.email.toLowerCase().includes(inquirySearch.toLowerCase()) ||
        inq.service.toLowerCase().includes(inquirySearch.toLowerCase()) ||
        inq.message.toLowerCase().includes(inquirySearch.toLowerCase());

      const matchesFilter =
        inquiryFilter === "all" || inq.status === inquiryFilter;

      return matchesSearch && matchesFilter;
    });
  }, [formData.inquiries, inquirySearch, inquiryFilter]);

  const newInquiriesCount = (formData.inquiries || []).filter((i) => i.status === "new").length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#455A64] text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin" />
          <p className="text-xs tracking-widest uppercase font-mono text-white/80">
            Loading Studio Portal...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen max-h-screen bg-[#48636E] text-[#1E252B] font-sans selection:bg-[#2C4953] selection:text-white flex overflow-hidden">
      {/* ================= LEFT SLEEK SIDEBAR ================= */}
      <aside className="w-20 sm:w-24 h-full shrink-0 flex flex-col items-center justify-between py-4 select-none z-20">
        {/* Brand / Logo */}
        <div className="flex flex-col items-center gap-1 shrink-0">
          <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-md">
            <span className="font-extrabold text-lg tracking-tight">अ</span>
          </div>
          <span className="text-[9px] font-bold tracking-widest uppercase text-white/90">
            ANURAG
          </span>
        </div>

        {/* Vertical Nav Icons (Compact & non-overflowing) */}
        <nav className="flex flex-col items-center gap-2.5 my-auto shrink-0">
          {/* Stories & Media Feed */}
          <button
            onClick={() => setActiveTab("stories")}
            className={`group relative flex flex-col items-center gap-1 cursor-pointer transition-all ${
              activeTab === "stories" ? "scale-105" : "opacity-75 hover:opacity-100"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                activeTab === "stories"
                  ? "bg-white text-[#2C4953] shadow-lg shadow-black/20"
                  : "text-white hover:bg-white/10"
              }`}
            >
              <ImageIcon className="w-4 h-4" />
            </div>
            <span
              className={`text-[8.5px] font-bold uppercase tracking-wider ${
                activeTab === "stories" ? "text-white font-extrabold" : "text-white/70"
              }`}
            >
              Stories
            </span>
          </button>

          {/* 3D Visual Designs */}
          <button
            onClick={() => setActiveTab("designs")}
            className={`group relative flex flex-col items-center gap-1 cursor-pointer transition-all ${
              activeTab === "designs" ? "scale-105" : "opacity-75 hover:opacity-100"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                activeTab === "designs"
                  ? "bg-white text-[#2C4953] shadow-lg shadow-black/20"
                  : "text-white hover:bg-white/10"
              }`}
            >
              <Layers className="w-4 h-4" />
            </div>
            <span
              className={`text-[8.5px] font-bold uppercase tracking-wider ${
                activeTab === "designs" ? "text-white font-extrabold" : "text-white/70"
              }`}
            >
              3D Designs
            </span>
          </button>

          {/* Bio & Content */}
          <button
            onClick={() => setActiveTab("content")}
            className={`group relative flex flex-col items-center gap-1 cursor-pointer transition-all ${
              activeTab === "content" ? "scale-105" : "opacity-75 hover:opacity-100"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                activeTab === "content"
                  ? "bg-white text-[#2C4953] shadow-lg shadow-black/20"
                  : "text-white hover:bg-white/10"
              }`}
            >
              <FileText className="w-4 h-4" />
            </div>
            <span
              className={`text-[8.5px] font-bold uppercase tracking-wider ${
                activeTab === "content" ? "text-white font-extrabold" : "text-white/70"
              }`}
            >
              Bio Copy
            </span>
          </button>

          {/* Disciplines & Services */}
          <button
            onClick={() => setActiveTab("services")}
            className={`group relative flex flex-col items-center gap-1 cursor-pointer transition-all ${
              activeTab === "services" ? "scale-105" : "opacity-75 hover:opacity-100"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                activeTab === "services"
                  ? "bg-white text-[#2C4953] shadow-lg shadow-black/20"
                  : "text-white hover:bg-white/10"
              }`}
            >
              <Sparkles className="w-4 h-4" />
            </div>
            <span
              className={`text-[8.5px] font-bold uppercase tracking-wider ${
                activeTab === "services" ? "text-white font-extrabold" : "text-white/70"
              }`}
            >
              Services
            </span>
          </button>

          {/* Channels & Settings */}
          <button
            onClick={() => setActiveTab("social")}
            className={`group relative flex flex-col items-center gap-1 cursor-pointer transition-all ${
              activeTab === "social" ? "scale-105" : "opacity-75 hover:opacity-100"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                activeTab === "social"
                  ? "bg-white text-[#2C4953] shadow-lg shadow-black/20"
                  : "text-white hover:bg-white/10"
              }`}
            >
              <Settings className="w-4 h-4" />
            </div>
            <span
              className={`text-[8.5px] font-bold uppercase tracking-wider ${
                activeTab === "social" ? "text-white font-extrabold" : "text-white/70"
              }`}
            >
              Channels
            </span>
          </button>

          {/* SMTP & Inquiries */}
          <button
            onClick={() => setActiveTab("inbox")}
            className={`group relative flex flex-col items-center gap-1 cursor-pointer transition-all ${
              activeTab === "inbox" ? "scale-105" : "opacity-75 hover:opacity-100"
            }`}
          >
            <div className="relative">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  activeTab === "inbox"
                    ? "bg-white text-[#2C4953] shadow-lg shadow-black/20"
                    : "text-white hover:bg-white/10"
                }`}
              >
                <Mail className="w-4 h-4" />
              </div>
              {newInquiriesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center border-2 border-[#48636E]">
                  {newInquiriesCount}
                </span>
              )}
            </div>
            <span
              className={`text-[8.5px] font-bold uppercase tracking-wider ${
                activeTab === "inbox" ? "text-white font-extrabold" : "text-white/70"
              }`}
            >
              SMTP
            </span>
          </button>
        </nav>

        {/* Bottom Profile Dot */}
        <div className="relative shrink-0 mb-1">
          <div className="w-8 h-8 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center text-white font-bold text-[10px]">
            OM
          </div>
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#48636E] rounded-full" />
        </div>
      </aside>

      {/* ================= MAIN EXPANSIVE WHITE CANVAS ================= */}
      <div className="flex-1 flex flex-col h-full min-h-0 py-3 sm:py-4 pr-3 sm:pr-6 pl-0 overflow-hidden">
        {/* Top Header Row inside Teal Container */}
        <div className="shrink-0 flex items-center justify-between pb-3 px-2 sm:px-4 text-white">
          {/* Back Pill Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 text-xs font-semibold tracking-wide backdrop-blur-md transition-all shadow-xs shrink-0"
          >
            <span className="w-4 h-4 rounded-full bg-white text-[#3C555F] flex items-center justify-center text-[10px] font-bold">
              ‹
            </span>
            <span>Back to Live Site</span>
          </Link>

          {/* Center Text Navigation Tabs */}
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8 text-xs font-extrabold uppercase tracking-[0.2em] overflow-x-auto scrollbar-none px-2">
            {[
              { id: "stories", label: `STORIES (${formData.projects.length})` },
              { id: "designs", label: `3D DESIGNS (${formData.visualDesigns.length})` },
              { id: "content", label: "BIO & CONTENT" },
              { id: "services", label: "SERVICES" },
              { id: "social", label: "CHANNELS" },
              { id: "inbox", label: `SMTP & INBOX (${formData.inquiries?.length || 0})` },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as NavTab)}
                  className={`pb-1.5 pt-0.5 whitespace-nowrap cursor-pointer transition-all border-b-2 font-black ${
                    isActive
                      ? "text-white border-white"
                      : "text-white/60 hover:text-white border-transparent"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleExportJSON}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
              title="Export Backup"
            >
              <Download className="w-4 h-4" />
            </button>

            <button
              onClick={handleSaveAll}
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full bg-white text-[#2C4953] hover:bg-[#F2F0E8] text-xs font-black tracking-wider uppercase shadow-xl transition-all cursor-pointer disabled:opacity-50 active:scale-95"
            >
              {isSaving ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-[#2C4953] border-t-transparent rounded-full animate-spin" />
                  <span>Publishing...</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Publish Changes</span>
                  <span className="sm:hidden">Publish</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Floating Notification */}
        {saveStatus.type && (
          <div
            className={`shrink-0 mb-3 px-5 py-2.5 rounded-2xl text-xs font-semibold flex items-center justify-between shadow-xl animate-in fade-in slide-in-from-top-2 duration-200 ${
              saveStatus.type === "success"
                ? "bg-emerald-600 text-white"
                : "bg-rose-600 text-white"
            }`}
          >
            <div className="flex items-center gap-2">
              {saveStatus.type === "success" ? (
                <CheckCircle2 className="w-4 h-4 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0" />
              )}
              <span>{saveStatus.message}</span>
            </div>
            <button
              onClick={() => setSaveStatus({ type: null, message: "" })}
              className="opacity-80 hover:opacity-100 p-1 cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* ================= WHITE/CREAM ROUNDED INNER CANVAS ================= */}
        <div className="flex-1 min-h-0 bg-[#FAFAF7] rounded-[28px] sm:rounded-[38px] p-5 sm:p-8 md:p-10 shadow-2xl overflow-y-auto">
          {/* =================================================================== */}
          {/* ================= SECTION 1: STORIES & MEDIA MANAGEMENT =========== */}
          {/* =================================================================== */}
          {activeTab === "stories" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* Header Action Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-[#E9E9E2]">
                <div>
                  <h2 className="text-2xl font-black text-[#1E252B]">Stories & Media Archive</h2>
                  <p className="text-xs text-[#8C907E] mt-0.5">
                    Click any story to edit video/photo URLs, aspect ratio, or external project link.
                  </p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {/* Search */}
                  <div className="relative flex-1 sm:w-64">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C907E]" />
                    <input
                      type="text"
                      value={storySearch}
                      onChange={(e) => setStorySearch(e.target.value)}
                      placeholder="Search title, client..."
                      className="w-full pl-9 pr-3 py-2 rounded-full bg-white border border-[#D5D5CA] text-xs text-[#1E252B] focus:border-[#2D6A75] focus:outline-none"
                    />
                  </div>

                  <button
                    onClick={handleAddProject}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#2D6A75] hover:bg-[#22555E] text-white text-xs font-bold tracking-wide shrink-0 transition-all shadow-md cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>New Story</span>
                  </button>
                </div>
              </div>

              {/* Category Filter Chips with Live Item Counts */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {[
                  { id: "all", label: `ALL (${formData.projects.length})` },
                  { id: "films", label: `FILMS (${filmCount})` },
                  { id: "portraits", label: `PORTRAITS (${portraitCount})` },
                  { id: "brand", label: `BRAND (${brandCount})` },
                  { id: "editorial", label: `EDITORIAL (${editorialCount})` },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setStoryFilter(cat.id)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      storyFilter === cat.id
                        ? "bg-[#2D6A75] text-white shadow-sm"
                        : "bg-white text-[#8C907E] hover:text-[#1E252B] border border-[#E0E0D8]"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Bento Gallery Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => setEditingProject(project)}
                    className="group bg-white rounded-[24px] p-3.5 border border-[#E2E2D8] hover:border-[#2D6A75] hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
                  >
                    {/* Media Thumbnail */}
                    <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-900">
                      {project.video ? (
                        <video
                          src={project.video}
                          poster={project.image}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      )}

                      {/* Top Badges */}
                      <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                        <span className="px-2 py-0.5 rounded-md text-[9px] font-mono font-bold uppercase bg-black/75 text-white backdrop-blur-md">
                          {project.video ? "▶ Video" : "📷 Photo"}
                        </span>
                        {project.link && (
                          <span className="px-2 py-0.5 rounded-md text-[9px] font-mono font-bold uppercase bg-[#2D6A75] text-white">
                            Link ↗
                          </span>
                        )}
                      </div>

                      <div className="absolute bottom-2 left-2.5">
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-black/60 text-white/90">
                          {project.aspectRatioClass?.replace("aspect-", "") || "4/3"}
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="pt-3 pb-1 flex flex-col justify-between flex-1">
                      <div>
                        <div className="flex items-center justify-between text-[10px] font-mono text-[#8C907E] uppercase">
                          <span className="font-bold text-[#2D6A75]">{project.category}</span>
                          <span>{project.year}</span>
                        </div>
                        <h4 className="font-bold text-sm text-[#1E252B] mt-1 line-clamp-1 group-hover:text-[#2D6A75] transition-colors">
                          {project.title}
                        </h4>
                        <p className="text-xs text-[#8C907E] mt-1 line-clamp-2 leading-relaxed">
                          {project.synopsis}
                        </p>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-[#F0F0E8] flex items-center justify-between text-xs">
                        <span className="text-[#2D6A75] font-bold inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                          Edit Story ›
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteProject(project.id);
                          }}
                          className="p-1 text-red-400 hover:text-red-600 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =================================================================== */}
          {/* ================= SECTION 3: 3D VISUAL DESIGNS ==================== */}
          {/* =================================================================== */}
          {activeTab === "designs" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between pb-4 border-b border-[#E9E9E2]">
                <div>
                  <h2 className="text-2xl font-black text-[#1E252B]">3D Coverflow Designs</h2>
                  <p className="text-xs text-[#8C907E] mt-0.5">
                    Customize titles, CTR metrics, badges, and external links for each 3D carousel card.
                  </p>
                </div>
                <button
                  onClick={handleAddDesign}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#2D6A75] hover:bg-[#22555E] text-white text-xs font-bold tracking-wide shrink-0 transition-all shadow-md cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Slide</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {formData.visualDesigns.map((design, idx) => (
                  <div
                    key={design.id}
                    onClick={() => setEditingDesign(design)}
                    className="group bg-white rounded-[26px] p-4 border border-[#E2E2D8] hover:border-[#2D6A75] hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-900">
                      {design.image && (
                        <Image
                          src={design.image}
                          alt={design.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 p-3 flex flex-col justify-between pointer-events-none">
                        <span className="self-start px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase bg-black/75 text-emerald-300">
                          {design.badgeTitle}
                        </span>
                        <span className="self-end px-2 py-0.5 rounded text-[9px] font-mono bg-[#E07A4A] text-white">
                          {design.viewsOrMetric}
                        </span>
                      </div>
                    </div>

                    <div className="pt-3 flex flex-col justify-between flex-1">
                      <div>
                        <div className="flex items-center justify-between text-[10px] font-mono text-[#8C907E]">
                          <span>Slide #{idx + 1}</span>
                          <span>{design.category}</span>
                        </div>
                        <h4 className="font-bold text-sm text-[#1E252B] mt-1 line-clamp-1 group-hover:text-[#2D6A75] transition-colors">
                          {design.title}
                        </h4>
                        <p className="text-xs text-[#8C907E] mt-1 line-clamp-2">
                          {design.description}
                        </p>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-[#F0F0E8] flex items-center justify-between text-xs">
                        <span className="text-[#2D6A75] font-bold">Edit Slide ›</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteDesign(design.id);
                          }}
                          className="p-1 text-red-400 hover:text-red-600 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =================================================================== */}
          {/* ================= SECTION 4: BIO & CONTENT ======================== */}
          {/* =================================================================== */}
          {activeTab === "content" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="pb-4 border-b border-[#E9E9E2]">
                <h2 className="text-2xl font-black text-[#1E252B]">Hero Headlines & About Bio</h2>
                <p className="text-xs text-[#8C907E] mt-0.5">
                  Update your display typography, creator cutout photo, monogram badge, and story paragraphs.
                </p>
              </div>

              {/* Bento Grid Layout for Content */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Hero Box (8 Cols) */}
                <div className="lg:col-span-8 bg-white rounded-[28px] p-6 sm:p-8 border border-[#E2E2D8] space-y-4">
                  <h3 className="text-xs font-bold text-[#2D6A75] uppercase tracking-wider">
                    Hero Section Copy
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-mono text-[#8C907E] uppercase mb-1">
                        Eyebrow Label
                      </label>
                      <input
                        type="text"
                        value={formData.hero.eyebrow}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            hero: { ...prev.hero, eyebrow: e.target.value },
                          }))
                        }
                        className="w-full px-3 py-2 rounded-xl bg-[#F6F6F2] border border-[#DCDCD0] text-xs font-medium text-[#1E252B] focus:border-[#2D6A75] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-[#8C907E] uppercase mb-1">
                        Display Top ("Behind")
                      </label>
                      <input
                        type="text"
                        value={formData.hero.displayHeadlineTop}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            hero: { ...prev.hero, displayHeadlineTop: e.target.value },
                          }))
                        }
                        className="w-full px-3 py-2 rounded-xl bg-[#F6F6F2] border border-[#DCDCD0] text-xs font-medium text-[#1E252B] focus:border-[#2D6A75] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-[#8C907E] uppercase mb-1">
                        Display Bottom ("the lens")
                      </label>
                      <input
                        type="text"
                        value={formData.hero.displayHeadlineBottom}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            hero: { ...prev.hero, displayHeadlineBottom: e.target.value },
                          }))
                        }
                        className="w-full px-3 py-2 rounded-xl bg-[#F6F6F2] border border-[#DCDCD0] text-xs font-medium text-[#1E252B] focus:border-[#2D6A75] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-[#8C907E] uppercase mb-1">
                        Bold Lead ("Stories in")
                      </label>
                      <input
                        type="text"
                        value={formData.hero.boldHeadlineLead}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            hero: { ...prev.hero, boldHeadlineLead: e.target.value },
                          }))
                        }
                        className="w-full px-3 py-2 rounded-xl bg-[#F6F6F2] border border-[#DCDCD0] text-xs font-medium text-[#1E252B] focus:border-[#2D6A75] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-[#8C907E] uppercase mb-1">
                        Bold Highlight ("Motion.")
                      </label>
                      <input
                        type="text"
                        value={formData.hero.boldHeadlineHighlight}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            hero: { ...prev.hero, boldHeadlineHighlight: e.target.value },
                          }))
                        }
                        className="w-full px-3 py-2 rounded-xl bg-[#F6F6F2] border border-[#DCDCD0] text-xs font-black text-[#596637] focus:border-[#2D6A75] focus:outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-mono text-[#8C907E] uppercase mb-1">
                        Hero Description
                      </label>
                      <textarea
                        rows={2}
                        value={formData.hero.description}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            hero: { ...prev.hero, description: e.target.value },
                          }))
                        }
                        className="w-full px-3 py-2 rounded-xl bg-[#F6F6F2] border border-[#DCDCD0] text-xs text-[#1E252B] focus:border-[#2D6A75] focus:outline-none resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Creator Cutout Box (4 Cols) */}
                <div className="lg:col-span-4 bg-white rounded-[28px] p-6 border border-[#E2E2D8] flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-[#2D6A75] uppercase tracking-wider mb-2">
                      Creator Cutout PNG
                    </h3>

                    <div className="relative aspect-[3/4] w-full max-w-[200px] mx-auto my-3 rounded-2xl overflow-hidden bg-[#ECECE5] flex items-end justify-center">
                      {formData.hero.creatorImage && (
                        <Image
                          src={formData.hero.creatorImage}
                          alt="Creator Cutout"
                          width={200}
                          height={280}
                          className="object-contain object-bottom max-h-full"
                        />
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <input
                      type="text"
                      value={formData.hero.creatorImage}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          hero: { ...prev.hero, creatorImage: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-1.5 rounded-lg bg-[#F6F6F2] border border-[#DCDCD0] text-[11px] text-[#1E252B]"
                    />
                    <label className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#2D6A75] hover:bg-[#22555E] text-white text-xs font-bold transition-all cursor-pointer">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload New Cutout PNG</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleFileUpload(
                            e,
                            (url) =>
                              setFormData((prev) => ({
                                ...prev,
                                hero: { ...prev.hero, creatorImage: url },
                              })),
                            "cutout-file"
                          )
                        }
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* About Bio Box (12 Cols) */}
                <div className="lg:col-span-12 bg-white rounded-[28px] p-6 sm:p-8 border border-[#E2E2D8] space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#F0F0E8] gap-2">
                    <div>
                      <h3 className="text-sm font-extrabold text-[#1E252B] tracking-tight">
                        About Me & Creator Biography
                      </h3>
                      <p className="text-[11px] text-[#6F767E]">
                        Customize your portrait photograph, slate badge, editorial narrative, philosophy cards, and buttons.
                      </p>
                    </div>
                    <span className="px-2.5 py-1 bg-[#596637]/10 text-[#596637] rounded-full text-[10px] font-bold font-mono tracking-wider uppercase self-start sm:self-auto">
                      Live Section
                    </span>
                  </div>

                  {/* Top Grid: Portrait Photo & Badge (Left) vs Narrative Copy (Right) */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Left Column: Portrait Photo & Slate Badge */}
                    <div className="lg:col-span-5 bg-[#FBFBF9] p-5 rounded-2xl border border-[#E8E8DF] space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-mono text-[#8C907E] uppercase font-bold">
                          Portrait Photograph & Badge
                        </label>
                        <span className="text-[10px] text-[#8C907E]">Editorial Shot</span>
                      </div>

                      {/* Live Image Preview with Badge Overlay */}
                      <div className="relative w-full h-[280px] rounded-2xl overflow-hidden bg-[#F2F0E8] border border-[#D3D0C6] shadow-xs group">
                        <Image
                          src={formData.about?.portraitImage || "/images/editorial_camera.jpg"}
                          alt="About portrait preview"
                          fill
                          className="object-cover"
                        />

                        {/* Overlaid Badge Preview */}
                        <div className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-2 px-2.5 py-1.5 bg-[#F2F0E8]/90 backdrop-blur-md rounded-xl border border-[#D3D0C6] shadow-sm max-w-[calc(100%-20px)] pointer-events-none">
                          <div className="w-5 h-5 rounded-full bg-[#596637] text-[#F2F0E8] flex items-center justify-center font-bold text-[10px] shrink-0">
                            {formData.about?.monogram || "अ"}
                          </div>
                          <div className="text-left leading-none">
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold tracking-wider text-[#22221F] uppercase text-[9.5px]">
                                {formData.about?.authorName || "ANURAG"}
                              </span>
                              <span className="w-1 h-1 rounded-full bg-[#596637]" />
                              <span className="font-mono text-[#596637] font-semibold text-[8px]">
                                {formData.about?.establishedYear || "EST. 2020"}
                              </span>
                            </div>
                            <p className="text-[#77766F] text-[8.5px] font-mono mt-0.5 truncate">
                              {formData.about?.subtitle || "Cinematographer & Stills"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Upload / URL Controls */}
                      <div className="space-y-2">
                        <div>
                          <label className="block text-[10px] font-mono text-[#8C907E] uppercase mb-1">
                            Portrait Image URL
                          </label>
                          <input
                            type="text"
                            value={formData.about?.portraitImage || ""}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                about: { ...prev.about, portraitImage: e.target.value },
                              }))
                            }
                            placeholder="/images/editorial_camera.jpg"
                            className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#DCDCD0] text-xs font-mono text-[#1E252B] focus:border-[#2D6A75] focus:outline-none"
                          />
                        </div>

                        <label className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#2D6A75] hover:bg-[#22555E] text-white text-xs font-bold transition-all cursor-pointer shadow-xs">
                          {uploadingField === "about-portrait" ? (
                            <>
                              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              <span>Uploading Portrait...</span>
                            </>
                          ) : (
                            <>
                              <Upload className="w-3.5 h-3.5" />
                              <span>Upload New Portrait Photo</span>
                            </>
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              handleFileUpload(
                                e,
                                (url) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    about: { ...prev.about, portraitImage: url },
                                  })),
                                "about-portrait"
                              )
                            }
                            className="hidden"
                          />
                        </label>
                      </div>

                      {/* Creator Badge Fields */}
                      <div className="pt-2 border-t border-[#E8E8DF] space-y-2.5">
                        <span className="block text-[10px] font-mono text-[#8C907E] uppercase font-bold">
                          Badge Metadata
                        </span>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[9px] font-mono text-[#8C907E] uppercase mb-0.5">
                              Author Name
                            </label>
                            <input
                              type="text"
                              value={formData.about?.authorName || ""}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  about: { ...prev.about, authorName: e.target.value },
                                }))
                              }
                              className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-[#DCDCD0] text-xs font-bold text-[#1E252B]"
                            />
                          </div>

                          <div>
                            <label className="block text-[9px] font-mono text-[#8C907E] uppercase mb-0.5">
                              Devanagari Monogram
                            </label>
                            <input
                              type="text"
                              value={formData.about?.monogram || ""}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  about: { ...prev.about, monogram: e.target.value },
                                }))
                              }
                              className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-[#DCDCD0] text-xs font-bold text-center text-[#596637]"
                            />
                          </div>

                          <div>
                            <label className="block text-[9px] font-mono text-[#8C907E] uppercase mb-0.5">
                              Established Year
                            </label>
                            <input
                              type="text"
                              value={formData.about?.establishedYear || ""}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  about: { ...prev.about, establishedYear: e.target.value },
                                }))
                              }
                              className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-[#DCDCD0] text-xs text-[#1E252B]"
                            />
                          </div>

                          <div>
                            <label className="block text-[9px] font-mono text-[#8C907E] uppercase mb-0.5">
                              Subtitle / Role
                            </label>
                            <input
                              type="text"
                              value={formData.about?.subtitle || ""}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  about: { ...prev.about, subtitle: e.target.value },
                                }))
                              }
                              className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-[#DCDCD0] text-xs text-[#1E252B]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Editorial Narrative Copy */}
                    <div className="lg:col-span-7 space-y-3.5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-mono text-[#8C907E] uppercase mb-1">
                            Eyebrow Label
                          </label>
                          <input
                            type="text"
                            placeholder="A LITTLE ABOUT ME"
                            value={formData.about?.eyebrow || ""}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                about: { ...prev.about, eyebrow: e.target.value },
                              }))
                            }
                            className="w-full px-3 py-1.5 rounded-xl bg-[#F6F6F2] border border-[#DCDCD0] text-xs font-mono font-bold text-[#1E252B]"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono text-[#8C907E] uppercase mb-1">
                            Featured Pull-Quote
                          </label>
                          <input
                            type="text"
                            value={formData.about?.quote || ""}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                about: { ...prev.about, quote: e.target.value },
                              }))
                            }
                            className="w-full px-3 py-1.5 rounded-xl bg-[#F6F6F2] border border-[#DCDCD0] text-xs italic text-[#596637] font-medium"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono text-[#8C907E] uppercase mb-1">
                          Main Heading (Lead Title)
                        </label>
                        <input
                          type="text"
                          value={formData.about?.heading || ""}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              about: { ...prev.about, heading: e.target.value },
                            }))
                          }
                          className="w-full px-3 py-2 rounded-xl bg-[#F6F6F2] border border-[#DCDCD0] text-xs font-bold text-[#1E252B]"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono text-[#8C907E] uppercase mb-1">
                          Bio Paragraph 1 (Lead Introduction)
                        </label>
                        <textarea
                          rows={2}
                          value={formData.about?.paragraph1 || ""}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              about: { ...prev.about, paragraph1: e.target.value },
                            }))
                          }
                          className="w-full px-3 py-2 rounded-xl bg-[#F6F6F2] border border-[#DCDCD0] text-xs text-[#1E252B] resize-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono text-[#8C907E] uppercase mb-1">
                          Bio Paragraph 2 (Artistic Process & Philosophy)
                        </label>
                        <textarea
                          rows={2}
                          value={formData.about?.paragraph2 || ""}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              about: { ...prev.about, paragraph2: e.target.value },
                            }))
                          }
                          className="w-full px-3 py-2 rounded-xl bg-[#F6F6F2] border border-[#DCDCD0] text-xs text-[#1E252B] resize-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono text-[#8C907E] uppercase mb-1">
                          Bio Paragraph 3 (Extended Story — Revealed via &quot;More About Me&quot;)
                        </label>
                        <textarea
                          rows={2}
                          value={formData.about?.paragraph3 || ""}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              about: { ...prev.about, paragraph3: e.target.value },
                            }))
                          }
                          className="w-full px-3 py-2 rounded-xl bg-[#F6F6F2] border border-[#DCDCD0] text-xs text-[#1E252B] resize-none"
                        />
                      </div>

                      {/* Action Button Labels */}
                      <div className="pt-2 border-t border-[#F0F0E8] grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[9px] font-mono text-[#8C907E] uppercase mb-0.5">
                            Button: Read More
                          </label>
                          <input
                            type="text"
                            placeholder="More About Me"
                            value={formData.about?.ctaButtonText || ""}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                about: { ...prev.about, ctaButtonText: e.target.value },
                              }))
                            }
                            className="w-full px-2.5 py-1.5 rounded-lg bg-[#F6F6F2] border border-[#DCDCD0] text-xs text-[#1E252B]"
                          />
                        </div>

                        <div>
                          <label className="block text-[9px] font-mono text-[#8C907E] uppercase mb-0.5">
                            Button: Collapse
                          </label>
                          <input
                            type="text"
                            placeholder="Show Less"
                            value={formData.about?.ctaButtonTextExpanded || ""}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                about: { ...prev.about, ctaButtonTextExpanded: e.target.value },
                              }))
                            }
                            className="w-full px-2.5 py-1.5 rounded-lg bg-[#F6F6F2] border border-[#DCDCD0] text-xs text-[#1E252B]"
                          />
                        </div>

                        <div>
                          <label className="block text-[9px] font-mono text-[#8C907E] uppercase mb-0.5">
                            Link: Contact
                          </label>
                          <input
                            type="text"
                            placeholder="Let's Connect"
                            value={formData.about?.contactButtonText || ""}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                about: { ...prev.about, contactButtonText: e.target.value },
                              }))
                            }
                            className="w-full px-2.5 py-1.5 rounded-lg bg-[#F6F6F2] border border-[#DCDCD0] text-xs text-[#1E252B]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom: Three Pillars of Craft (Cards below biography) */}
                  <div className="pt-4 border-t border-[#F0F0E8] space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-[#1E252B] uppercase tracking-wider">
                          Three Pillars of Craft & Artistic Pillars (3 Feature Cards)
                        </h4>
                        <p className="text-[10px] text-[#6F767E]">
                          Edit the 3 core values showcased below your bio paragraphs.
                        </p>
                      </div>
                      <span className="text-[10px] font-mono text-[#8C907E]">3 Cards</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {(
                        formData.about?.pillars || [
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
                        ]
                      ).map((pillar, idx) => (
                        <div
                          key={idx}
                          className="bg-[#FBFBF9] p-4 rounded-2xl border border-[#E8E8DF] space-y-2.5 shadow-2xs"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold font-mono text-[#596637] bg-[#596637]/10 px-2 py-0.5 rounded-full">
                              Card {idx + 1}
                            </span>
                            <div className="flex items-center gap-1.5">
                              <label className="text-[9px] font-mono text-[#8C907E] uppercase">
                                Icon:
                              </label>
                              <select
                                value={pillar.icon || "sparkles"}
                                onChange={(e) => {
                                  const currentPillars = [
                                    ...(formData.about?.pillars || [
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
                                    ]),
                                  ];
                                  currentPillars[idx] = {
                                    ...currentPillars[idx],
                                    icon: e.target.value as any,
                                  };
                                  setFormData((prev) => ({
                                    ...prev,
                                    about: { ...prev.about, pillars: currentPillars },
                                  }));
                                }}
                                className="px-2 py-1 rounded-md bg-white border border-[#DCDCD0] text-[10px] font-bold text-[#1E252B] focus:outline-none"
                              >
                                <option value="sparkles">✨ Sparkles</option>
                                <option value="camera">📷 Camera</option>
                                <option value="film">🎞️ Film</option>
                                <option value="star">⭐ Star</option>
                                <option value="compass">🧭 Compass</option>
                                <option value="layers">🥞 Layers</option>
                              </select>
                            </div>
                          </div>

                          <div>
                            <label className="block text-[9px] font-mono text-[#8C907E] uppercase mb-1">
                              Card Title
                            </label>
                            <input
                              type="text"
                              value={pillar.title}
                              onChange={(e) => {
                                const currentPillars = [
                                  ...(formData.about?.pillars || [
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
                                  ]),
                                ];
                                currentPillars[idx] = {
                                  ...currentPillars[idx],
                                  title: e.target.value,
                                };
                                setFormData((prev) => ({
                                  ...prev,
                                  about: { ...prev.about, pillars: currentPillars },
                                }));
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-[#DCDCD0] text-xs font-bold text-[#1E252B]"
                            />
                          </div>

                          <div>
                            <label className="block text-[9px] font-mono text-[#8C907E] uppercase mb-1">
                              Description
                            </label>
                            <textarea
                              rows={2}
                              value={pillar.desc}
                              onChange={(e) => {
                                const currentPillars = [
                                  ...(formData.about?.pillars || [
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
                                  ]),
                                ];
                                currentPillars[idx] = {
                                  ...currentPillars[idx],
                                  desc: e.target.value,
                                };
                                setFormData((prev) => ({
                                  ...prev,
                                  about: { ...prev.about, pillars: currentPillars },
                                }));
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-[#DCDCD0] text-[11px] text-[#1E252B] resize-none"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =================================================================== */}
          {/* ================= SECTION 5: SERVICES ============================= */}
          {/* =================================================================== */}
          {activeTab === "services" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="pb-4 border-b border-[#E9E9E2]">
                <h2 className="text-2xl font-black text-[#1E252B]">Creative Disciplines</h2>
                <p className="text-xs text-[#8C907E] mt-0.5">
                  Update deliverables, titles, and descriptions for your 4 primary offerings.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {formData.services.map((service, idx) => (
                  <div
                    key={service.id}
                    className="bg-white rounded-[28px] p-6 border border-[#E2E2D8] space-y-3"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-[#F0F0E8]">
                      <span className="text-xs font-mono font-bold text-[#2D6A75]">
                        0{idx + 1} · {service.category}
                      </span>
                      <h4 className="font-bold text-sm text-[#1E252B]">{service.title}</h4>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-[#8C907E] uppercase mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={service.title}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            services: prev.services.map((s) =>
                              s.id === service.id ? { ...s, title: val } : s
                            ),
                          }));
                        }}
                        className="w-full px-3 py-1.5 rounded-lg bg-[#F6F6F2] border border-[#DCDCD0] text-xs text-[#1E252B]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-[#8C907E] uppercase mb-1">
                        Description
                      </label>
                      <textarea
                        rows={2}
                        value={service.description}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            services: prev.services.map((s) =>
                              s.id === service.id ? { ...s, description: val } : s
                            ),
                          }));
                        }}
                        className="w-full px-3 py-1.5 rounded-lg bg-[#F6F6F2] border border-[#DCDCD0] text-xs text-[#1E252B] resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-[#8C907E] uppercase mb-1">
                        Deliverables (comma separated)
                      </label>
                      <input
                        type="text"
                        value={service.deliverables.join(", ")}
                        onChange={(e) => {
                          const val = e.target.value.split(",").map((d) => d.trim());
                          setFormData((prev) => ({
                            ...prev,
                            services: prev.services.map((s) =>
                              s.id === service.id ? { ...s, deliverables: val } : s
                            ),
                          }));
                        }}
                        className="w-full px-3 py-1.5 rounded-lg bg-[#F6F6F2] border border-[#DCDCD0] text-xs text-[#1E252B]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =================================================================== */}
          {/* ================= SECTION 6: CHANNELS & SOCIAL ==================== */}
          {/* =================================================================== */}
          {activeTab === "social" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="pb-4 border-b border-[#E9E9E2]">
                <h2 className="text-2xl font-black text-[#1E252B]">Channels & Inquiries</h2>
                <p className="text-xs text-[#8C907E] mt-0.5">
                  Manage your social profiles, inquiries email, and location.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Instagram */}
                <div className="bg-white rounded-[26px] p-6 border border-[#E2E2D8] space-y-3">
                  <div className="flex items-center gap-2 text-[#2D6A75] pb-2 border-b border-[#F0F0E8]">
                    <InstagramIcon className="w-5 h-5" />
                    <span className="font-bold text-xs uppercase tracking-wider text-[#1E252B]">
                      Instagram
                    </span>
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-[#8C907E] uppercase mb-1">
                      Handle
                    </label>
                    <input
                      type="text"
                      value={formData.contact.instagram}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          contact: { ...prev.contact, instagram: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-1.5 rounded-lg bg-[#F6F6F2] border border-[#DCDCD0] text-xs text-[#1E252B]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-[#8C907E] uppercase mb-1">
                      URL
                    </label>
                    <input
                      type="url"
                      value={formData.contact.instagramUrl}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          contact: { ...prev.contact, instagramUrl: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-1.5 rounded-lg bg-[#F6F6F2] border border-[#DCDCD0] text-xs text-[#1E252B]"
                    />
                  </div>
                </div>

                {/* YouTube */}
                <div className="bg-white rounded-[26px] p-6 border border-[#E2E2D8] space-y-3">
                  <div className="flex items-center gap-2 text-[#2D6A75] pb-2 border-b border-[#F0F0E8]">
                    <YoutubeIcon className="w-5 h-5" />
                    <span className="font-bold text-xs uppercase tracking-wider text-[#1E252B]">
                      YouTube Channel
                    </span>
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-[#8C907E] uppercase mb-1">
                      Channel URL
                    </label>
                    <input
                      type="url"
                      value={formData.contact.youtubeUrl}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          contact: { ...prev.contact, youtubeUrl: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-1.5 rounded-lg bg-[#F6F6F2] border border-[#DCDCD0] text-xs text-[#1E252B]"
                    />
                  </div>
                </div>

                {/* Vimeo */}
                <div className="bg-white rounded-[26px] p-6 border border-[#E2E2D8] space-y-3">
                  <div className="flex items-center gap-2 text-[#2D6A75] pb-2 border-b border-[#F0F0E8]">
                    <VimeoIcon className="w-5 h-5" />
                    <span className="font-bold text-xs uppercase tracking-wider text-[#1E252B]">
                      Vimeo
                    </span>
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-[#8C907E] uppercase mb-1">
                      Profile URL
                    </label>
                    <input
                      type="url"
                      value={formData.contact.vimeoUrl}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          contact: { ...prev.contact, vimeoUrl: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-1.5 rounded-lg bg-[#F6F6F2] border border-[#DCDCD0] text-xs text-[#1E252B]"
                    />
                  </div>
                </div>

                {/* Direct Inquiries & Location */}
                <div className="bg-white rounded-[26px] p-6 border border-[#E2E2D8] space-y-3 lg:col-span-3">
                  <div className="flex items-center gap-2 text-[#2D6A75] pb-2 border-b border-[#F0F0E8]">
                    <Mail className="w-5 h-5" />
                    <span className="font-bold text-xs uppercase tracking-wider text-[#1E252B]">
                      Direct Inquiries & Studio Base
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono text-[#8C907E] uppercase mb-1">
                        Inquiries Email
                      </label>
                      <input
                        type="email"
                        value={formData.contact.email}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            contact: { ...prev.contact, email: e.target.value },
                          }))
                        }
                        className="w-full px-3 py-1.5 rounded-lg bg-[#F6F6F2] border border-[#DCDCD0] text-xs text-[#1E252B]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-[#8C907E] uppercase mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        value={formData.contact.location}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            contact: { ...prev.contact, location: e.target.value },
                          }))
                        }
                        className="w-full px-3 py-1.5 rounded-lg bg-[#F6F6F2] border border-[#DCDCD0] text-xs text-[#1E252B]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-[#8C907E] uppercase mb-1">
                        Availability Status
                      </label>
                      <input
                        type="text"
                        value={formData.contact.availability}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            contact: { ...prev.contact, availability: e.target.value },
                          }))
                        }
                        className="w-full px-3 py-1.5 rounded-lg bg-[#F6F6F2] border border-[#DCDCD0] text-xs text-[#1E252B]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =================================================================== */}
          {/* ================= SECTION 7: SMTP & CLIENT INBOX ================== */}
          {/* =================================================================== */}
          {activeTab === "inbox" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#E0E0D8]">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#1E252B] tracking-tight flex items-center gap-2.5">
                    <Mail className="w-6 h-6 text-[#2D6A75]" />
                    SMTP Mail Gateway & Client Inquiries
                  </h2>
                  <p className="text-xs text-[#6F767E] mt-0.5">
                    Configure your outgoing email server, verify connectivity with live test dispatches, and manage client inquiries from the portfolio contact form.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleTestSmtp}
                    disabled={isTestingSmtp}
                    className="flex items-center gap-2 px-4 py-2 bg-[#2D6A75] hover:bg-[#23535C] text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer disabled:opacity-50"
                  >
                    {isTestingSmtp ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Testing Connection...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Test Email</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleSaveAll}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-4 py-2 bg-[#1E252B] hover:bg-black text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer disabled:opacity-50"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save All</span>
                  </button>
                </div>
              </div>

              {/* SMTP Test Status Banner */}
              {smtpTestResult.type && (
                <div
                  className={`p-4 rounded-2xl border text-xs flex items-start justify-between gap-3 ${
                    smtpTestResult.type === "success"
                      ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                      : "bg-rose-50 border-rose-200 text-rose-800"
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    {smtpTestResult.type === "success" ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
                    )}
                    <div>
                      <p className="font-bold">
                        {smtpTestResult.type === "success" ? "SMTP Verified!" : "SMTP Test Failed"}
                      </p>
                      <p className="mt-0.5 text-xs opacity-90">{smtpTestResult.message}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSmtpTestResult({ type: null, message: "" })}
                    className="text-stone-400 hover:text-stone-700 cursor-pointer text-sm"
                  >
                    ✕
                  </button>
                </div>
              )}

              {/* CARD 1: SMTP GATEWAY CONTROLS */}
              <div className="bg-white rounded-[28px] p-6 sm:p-8 border border-[#E2E2D8] shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F0F0E8]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#2D6A75]/10 flex items-center justify-center text-[#2D6A75]">
                      <Sliders className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm text-[#1E252B]">
                        Outgoing Mail Server (SMTP) Configuration
                      </h3>
                      <p className="text-[11px] text-[#6F767E]">
                        Connect your Gmail, Workspace, Outlook, or custom SMTP server to receive contact form emails automatically.
                      </p>
                    </div>
                  </div>

                  {/* Enable / Disable Toggle */}
                  <div className="flex items-center gap-3 bg-[#F6F6F2] px-4 py-2 rounded-2xl border border-[#E2E2D8]">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C907E]">
                        Gateway Status
                      </span>
                      <span
                        className={`text-xs font-bold ${
                          formData.smtp?.enabled ? "text-emerald-600" : "text-stone-500"
                        }`}
                      >
                        {formData.smtp?.enabled ? "● ACTIVE & DISPATCHING" : "○ DISABLED"}
                      </span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.smtp?.enabled ?? true}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            smtp: {
                              ...(prev.smtp || DEFAULT_PORTFOLIO_DATA.smtp!),
                              enabled: e.target.checked,
                            },
                          }))
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2D6A75]"></div>
                    </label>
                  </div>
                </div>

                {/* Quick Presets */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-[#8C907E]">
                      Quick Service Presets
                    </label>
                    <span className="text-[10px] text-[#8C907E]">
                      Auto-fills standard host & port
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    <button
                      type="button"
                      onClick={() => applySmtpPreset("gmail")}
                      className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all text-left flex items-center justify-between cursor-pointer ${
                        formData.smtp?.host === "smtp.gmail.com"
                          ? "bg-[#2D6A75]/10 border-[#2D6A75] text-[#2D6A75]"
                          : "bg-[#FBFBF9] border-[#E2E2D8] text-[#1E252B] hover:bg-white"
                      }`}
                    >
                      <span>Gmail / Workspace</span>
                      <span className="text-[9px] font-mono opacity-60">587</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => applySmtpPreset("outlook")}
                      className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all text-left flex items-center justify-between cursor-pointer ${
                        formData.smtp?.host === "smtp.office365.com"
                          ? "bg-[#2D6A75]/10 border-[#2D6A75] text-[#2D6A75]"
                          : "bg-[#FBFBF9] border-[#E2E2D8] text-[#1E252B] hover:bg-white"
                      }`}
                    >
                      <span>Outlook 365</span>
                      <span className="text-[9px] font-mono opacity-60">587</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => applySmtpPreset("sendgrid")}
                      className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all text-left flex items-center justify-between cursor-pointer ${
                        formData.smtp?.host === "smtp.sendgrid.net"
                          ? "bg-[#2D6A75]/10 border-[#2D6A75] text-[#2D6A75]"
                          : "bg-[#FBFBF9] border-[#E2E2D8] text-[#1E252B] hover:bg-white"
                      }`}
                    >
                      <span>SendGrid</span>
                      <span className="text-[9px] font-mono opacity-60">587</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => applySmtpPreset("mailgun")}
                      className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all text-left flex items-center justify-between cursor-pointer ${
                        formData.smtp?.host === "smtp.mailgun.org"
                          ? "bg-[#2D6A75]/10 border-[#2D6A75] text-[#2D6A75]"
                          : "bg-[#FBFBF9] border-[#E2E2D8] text-[#1E252B] hover:bg-white"
                      }`}
                    >
                      <span>Mailgun</span>
                      <span className="text-[9px] font-mono opacity-60">587</span>
                    </button>
                  </div>
                </div>

                {/* Form Fields Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Host */}
                  <div className="sm:col-span-2 lg:col-span-1">
                    <label className="block text-[10px] font-mono text-[#8C907E] uppercase mb-1">
                      SMTP Host
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. smtp.gmail.com"
                      value={formData.smtp?.host ?? ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          smtp: {
                            ...(prev.smtp || DEFAULT_PORTFOLIO_DATA.smtp!),
                            host: e.target.value,
                          },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl bg-[#F6F6F2] border border-[#DCDCD0] text-xs font-mono text-[#1E252B] focus:border-[#2D6A75] focus:outline-none"
                    />
                  </div>

                  {/* Port */}
                  <div>
                    <label className="block text-[10px] font-mono text-[#8C907E] uppercase mb-1">
                      SMTP Port
                    </label>
                    <input
                      type="number"
                      placeholder="587"
                      value={formData.smtp?.port ?? 587}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          smtp: {
                            ...(prev.smtp || DEFAULT_PORTFOLIO_DATA.smtp!),
                            port: parseInt(e.target.value) || 587,
                          },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl bg-[#F6F6F2] border border-[#DCDCD0] text-xs font-mono text-[#1E252B] focus:border-[#2D6A75] focus:outline-none"
                    />
                  </div>

                  {/* SSL / TLS Toggle */}
                  <div className="flex flex-col justify-end">
                    <label className="flex items-center gap-2 p-2 rounded-xl bg-[#F6F6F2] border border-[#DCDCD0] cursor-pointer hover:bg-stone-100 transition-colors">
                      <input
                        type="checkbox"
                        checked={formData.smtp?.secure ?? false}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            smtp: {
                              ...(prev.smtp || DEFAULT_PORTFOLIO_DATA.smtp!),
                              secure: e.target.checked,
                            },
                          }))
                        }
                        className="rounded text-[#2D6A75] focus:ring-[#2D6A75] w-4 h-4 cursor-pointer"
                      />
                      <div className="text-[11px] leading-tight">
                        <span className="font-bold text-[#1E252B] block">SSL / TLS Mode</span>
                        <span className="text-[9px] text-[#8C907E]">
                          {formData.smtp?.secure ? "Port 465 (Direct SSL)" : "Port 587 (STARTTLS)"}
                        </span>
                      </div>
                    </label>
                  </div>

                  {/* Username / User */}
                  <div className="sm:col-span-2 lg:col-span-1">
                    <label className="block text-[10px] font-mono text-[#8C907E] uppercase mb-1">
                      SMTP Username / Email
                    </label>
                    <input
                      type="text"
                      placeholder="your.email@gmail.com"
                      value={formData.smtp?.user ?? ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          smtp: {
                            ...(prev.smtp || DEFAULT_PORTFOLIO_DATA.smtp!),
                            user: e.target.value,
                          },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl bg-[#F6F6F2] border border-[#DCDCD0] text-xs text-[#1E252B] focus:border-[#2D6A75] focus:outline-none"
                    />
                  </div>

                  {/* Password / App Password */}
                  <div className="sm:col-span-2 lg:col-span-2">
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-[10px] font-mono text-[#8C907E] uppercase">
                        SMTP Password / Google App Password
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowSmtpPass(!showSmtpPass)}
                        className="text-[10px] text-[#2D6A75] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        {showSmtpPass ? (
                          <>
                            <EyeOff className="w-3 h-3" /> Hide
                          </>
                        ) : (
                          <>
                            <Eye className="w-3 h-3" /> Reveal
                          </>
                        )}
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        type={showSmtpPass ? "text" : "password"}
                        placeholder="••••••••••••••••"
                        value={formData.smtp?.pass ?? ""}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            smtp: {
                              ...(prev.smtp || DEFAULT_PORTFOLIO_DATA.smtp!),
                              pass: e.target.value,
                            },
                          }))
                        }
                        className="w-full px-3 py-2 rounded-xl bg-[#F6F6F2] border border-[#DCDCD0] text-xs font-mono text-[#1E252B] focus:border-[#2D6A75] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Sender Display Name */}
                  <div>
                    <label className="block text-[10px] font-mono text-[#8C907E] uppercase mb-1">
                      Sender Name (From Name)
                    </label>
                    <input
                      type="text"
                      placeholder="Ivan Robots Studio"
                      value={formData.smtp?.fromName ?? ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          smtp: {
                            ...(prev.smtp || DEFAULT_PORTFOLIO_DATA.smtp!),
                            fromName: e.target.value,
                          },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl bg-[#F6F6F2] border border-[#DCDCD0] text-xs text-[#1E252B] focus:border-[#2D6A75] focus:outline-none"
                    />
                  </div>

                  {/* Sender From Email */}
                  <div>
                    <label className="block text-[10px] font-mono text-[#8C907E] uppercase mb-1">
                      Sender Email (From Email)
                    </label>
                    <input
                      type="email"
                      placeholder="noreply@ivanrobots.com"
                      value={formData.smtp?.fromEmail ?? ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          smtp: {
                            ...(prev.smtp || DEFAULT_PORTFOLIO_DATA.smtp!),
                            fromEmail: e.target.value,
                          },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl bg-[#F6F6F2] border border-[#DCDCD0] text-xs text-[#1E252B] focus:border-[#2D6A75] focus:outline-none"
                    />
                  </div>

                  {/* Forward Inquiries To */}
                  <div>
                    <label className="block text-[10px] font-mono text-[#8C907E] uppercase mb-1">
                      Forward Inquiries To (Your Email)
                    </label>
                    <input
                      type="email"
                      placeholder="hello@ivanrobots.com"
                      value={formData.smtp?.toEmail ?? ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          smtp: {
                            ...(prev.smtp || DEFAULT_PORTFOLIO_DATA.smtp!),
                            toEmail: e.target.value,
                          },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl bg-[#F6F6F2] border border-[#DCDCD0] text-xs text-[#1E252B] focus:border-[#2D6A75] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Helpful Instruction Tip */}
                <div className="bg-[#FAF8F3] border border-[#EBE3D3] rounded-2xl p-4 text-[11px] text-[#63573D] space-y-1">
                  <p className="font-bold flex items-center gap-1.5 text-[#54462B]">
                    <Sparkles className="w-3.5 h-3.5 text-[#C4893B]" />
                    Gmail & Google Workspace tip:
                  </p>
                  <p>
                    If using standard Gmail with 2-Step Verification enabled, generate a 16-character{" "}
                    <strong>App Password</strong> at{" "}
                    <span className="font-mono bg-white/60 px-1 py-0.5 rounded">
                      myaccount.google.com/apppasswords
                    </span>{" "}
                    and paste it into the Password field above.
                  </p>
                </div>
              </div>

              {/* CARD 2: CLIENT INQUIRIES & MESSAGES INBOX */}
              <div className="bg-white rounded-[28px] p-6 sm:p-8 border border-[#E2E2D8] shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F0F0E8]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#2D6A75]/10 flex items-center justify-center text-[#2D6A75]">
                      <Inbox className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-extrabold text-sm text-[#1E252B]">
                          Client Inquiries & Project Messages
                        </h3>
                        <span className="px-2 py-0.5 bg-[#2D6A75] text-white rounded-full text-[10px] font-bold font-mono">
                          {formData.inquiries?.length || 0} Total
                        </span>
                        {newInquiriesCount > 0 && (
                          <span className="px-2 py-0.5 bg-amber-500 text-white rounded-full text-[10px] font-bold font-mono animate-pulse">
                            {newInquiriesCount} New
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#6F767E]">
                        Incoming submissions captured automatically from the front-end contact section.
                      </p>
                    </div>
                  </div>

                  {/* Search Bar */}
                  <div className="relative w-full sm:w-64">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type="text"
                      placeholder="Search inquiries..."
                      value={inquirySearch}
                      onChange={(e) => setInquirySearch(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-[#F6F6F2] border border-[#DCDCD0] text-xs text-[#1E252B] focus:border-[#2D6A75] focus:outline-none"
                    />
                    {inquirySearch && (
                      <button
                        onClick={() => setInquirySearch("")}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-xs"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-2 border-b border-[#F0F0E8] pb-3">
                  {(
                    [
                      { key: "all", label: "All Inquiries", count: formData.inquiries?.length || 0 },
                      {
                        key: "new",
                        label: "New",
                        count: (formData.inquiries || []).filter((i) => i.status === "new").length,
                      },
                      {
                        key: "replied",
                        label: "Replied",
                        count: (formData.inquiries || []).filter((i) => i.status === "replied").length,
                      },
                      {
                        key: "archived",
                        label: "Archived",
                        count: (formData.inquiries || []).filter((i) => i.status === "archived").length,
                      },
                    ] as const
                  ).map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setInquiryFilter(tab.key)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                        inquiryFilter === tab.key
                          ? "bg-[#2D6A75] text-white shadow-xs"
                          : "bg-[#F6F6F2] text-[#6F767E] hover:text-[#1E252B] hover:bg-stone-200"
                      }`}
                    >
                      <span>{tab.label}</span>
                      <span
                        className={`text-[9.5px] px-1.5 py-0.2 rounded-full font-mono ${
                          inquiryFilter === tab.key ? "bg-white/20 text-white" : "bg-black/5 text-[#8C907E]"
                        }`}
                      >
                        {tab.count}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Inquiries List */}
                {filteredInquiries.length === 0 ? (
                  <div className="py-12 text-center border-2 border-dashed border-[#E2E2D8] rounded-2xl bg-[#FAFAF7]">
                    <Mail className="w-8 h-8 text-stone-300 mx-auto mb-2" />
                    <p className="text-xs font-bold text-[#1E252B]">No Inquiries Found</p>
                    <p className="text-[11px] text-[#8C907E] mt-0.5">
                      {inquirySearch
                        ? "Try clearing your search query."
                        : "Submissions from the portfolio contact form will display here automatically."}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredInquiries.map((inq) => (
                      <div
                        key={inq.id}
                        className={`p-5 rounded-2xl border transition-all ${
                          inq.status === "new"
                            ? "bg-amber-50/40 border-amber-200/80 shadow-xs"
                            : inq.status === "replied"
                            ? "bg-[#F8FBFB] border-[#D0E2E5]"
                            : "bg-[#F9F9F7] border-[#E8E8DF] opacity-75"
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                          <div className="flex items-start gap-3">
                            <div className="w-9 h-9 rounded-full bg-[#2D6A75] text-white flex items-center justify-center font-black text-xs shrink-0">
                              {inq.name.slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="font-extrabold text-xs sm:text-sm text-[#1E252B]">
                                  {inq.name}
                                </h4>
                                <span
                                  className={`text-[9px] font-bold font-mono px-2 py-0.5 rounded-full uppercase tracking-wider ${
                                    inq.status === "new"
                                      ? "bg-amber-500 text-white"
                                      : inq.status === "replied"
                                      ? "bg-[#2D6A75] text-white"
                                      : "bg-stone-300 text-stone-700"
                                  }`}
                                >
                                  {inq.status}
                                </span>
                                {inq.service && (
                                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white border border-[#DCDCD0] text-[#2D6A75]">
                                    {inq.service}
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-2 mt-0.5 text-[11px] text-[#6F767E]">
                                <a
                                  href={`mailto:${inq.email}`}
                                  className="text-[#2D6A75] hover:underline font-mono"
                                >
                                  {inq.email}
                                </a>
                                {inq.date && (
                                  <>
                                    <span>•</span>
                                    <span>Target Date: {inq.date}</span>
                                  </>
                                )}
                                <span>•</span>
                                <span className="text-[10px] text-[#8C907E]">
                                  {new Date(inq.createdAt).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-1.5 self-end sm:self-auto">
                            <a
                              href={`mailto:${inq.email}?subject=${encodeURIComponent(
                                `Re: ${inq.service || "Project"} Inquiry - Ivan Robots Studio`
                              )}`}
                              className="px-2.5 py-1.5 rounded-lg bg-[#2D6A75] hover:bg-[#23535C] text-white text-[10px] font-bold flex items-center gap-1 transition-all"
                              target="_blank"
                              rel="noreferrer"
                            >
                              <Send className="w-3 h-3" /> Reply
                            </a>

                            {inq.status !== "replied" && (
                              <button
                                onClick={() => handleUpdateInquiryStatus(inq.id, "replied")}
                                className="px-2.5 py-1.5 rounded-lg bg-white border border-[#DCDCD0] hover:bg-stone-100 text-[#1E252B] text-[10px] font-bold transition-all cursor-pointer"
                                title="Mark as Replied"
                              >
                                Mark Replied
                              </button>
                            )}

                            {inq.status !== "archived" ? (
                              <button
                                onClick={() => handleUpdateInquiryStatus(inq.id, "archived")}
                                className="px-2 py-1.5 rounded-lg bg-white border border-[#DCDCD0] hover:bg-stone-100 text-stone-500 text-[10px] font-bold transition-all cursor-pointer"
                                title="Archive inquiry"
                              >
                                Archive
                              </button>
                            ) : (
                              <button
                                onClick={() => handleUpdateInquiryStatus(inq.id, "new")}
                                className="px-2 py-1.5 rounded-lg bg-white border border-[#DCDCD0] hover:bg-stone-100 text-stone-500 text-[10px] font-bold transition-all cursor-pointer"
                                title="Restore to new"
                              >
                                Unarchive
                              </button>
                            )}

                            <button
                              onClick={() => handleDeleteInquiry(inq.id)}
                              className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                              title="Delete inquiry"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Message Content */}
                        <div className="bg-white/80 border border-black/5 rounded-xl p-3 text-xs text-[#2A323D] leading-relaxed whitespace-pre-wrap font-sans">
                          {inq.message}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* =================================================================== */}
      {/* ================= SLIDE-OVER DRAWER FOR EDITING A STORY =========== */}
      {/* =================================================================== */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="w-full max-w-2xl h-full bg-[#FAFAF7] border-l border-[#DCDCD0] flex flex-col justify-between shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="sticky top-0 z-10 bg-white px-6 py-4 border-b border-[#E0E0D8] flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-sm text-[#1E252B]">
                  {editingProject.title || "Edit Visual Story"}
                </h3>
                <p className="text-[10px] font-mono text-[#8C907E]">
                  ID: {editingProject.id}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDeleteProject(editingProject.id)}
                  className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  title="Delete story"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setEditingProject(null)}
                  className="p-2 text-[#8C907E] hover:text-[#1E252B] hover:bg-[#F2F2EC] rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Drawer Form Body */}
            <div className="p-6 space-y-5">
              {/* Media Preview Box */}
              <div className="bg-white rounded-2xl p-4 border border-[#E0E0D8] space-y-3">
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-black">
                  {editingProject.video ? (
                    <video
                      src={editingProject.video}
                      poster={editingProject.image}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : editingProject.image ? (
                    <Image
                      src={editingProject.image}
                      alt={editingProject.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-white/50">
                      No media
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <label className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-[#F4F4EE] hover:bg-[#EBEBE2] text-xs font-bold text-[#1E252B] border border-[#D5D5CA] cursor-pointer transition-all">
                    <Upload className="w-3.5 h-3.5 text-[#2D6A75]" />
                    <span>
                      {uploadingField === `p-img-${editingProject.id}`
                        ? "Uploading..."
                        : "Upload Poster/Photo"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      disabled={uploadingField === `p-img-${editingProject.id}`}
                      onChange={(e) =>
                        handleFileUpload(
                          e,
                          (url) => handleUpdateProject(editingProject.id, { image: url }),
                          `p-img-${editingProject.id}`
                        )
                      }
                      className="hidden"
                    />
                  </label>

                  <label className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-[#F4F4EE] hover:bg-[#EBEBE2] text-xs font-bold text-[#1E252B] border border-[#D5D5CA] cursor-pointer transition-all">
                    <Video className="w-3.5 h-3.5 text-[#2D6A75]" />
                    <span>
                      {uploadingField === `p-vid-${editingProject.id}`
                        ? "Uploading..."
                        : "Upload MP4 Video"}
                    </span>
                    <input
                      type="file"
                      accept="video/mp4,video/webm"
                      disabled={uploadingField === `p-vid-${editingProject.id}`}
                      onChange={(e) =>
                        handleFileUpload(
                          e,
                          (url) =>
                            handleUpdateProject(editingProject.id, {
                              video: url,
                              mediaType: "film",
                            }),
                          `p-vid-${editingProject.id}`
                        )
                      }
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-mono text-[#8C907E] uppercase mb-1">
                    Story Title
                  </label>
                  <input
                    type="text"
                    value={editingProject.title}
                    onChange={(e) =>
                      handleUpdateProject(editingProject.id, { title: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#DCDCD0] text-xs font-bold text-[#1E252B]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-[#8C907E] uppercase mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={editingProject.category}
                    onChange={(e) =>
                      handleUpdateProject(editingProject.id, { category: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#DCDCD0] text-xs text-[#1E252B]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-[#8C907E] uppercase mb-1">
                    Aspect Ratio Class
                  </label>
                  <select
                    value={editingProject.aspectRatioClass || "aspect-[4/3]"}
                    onChange={(e) =>
                      handleUpdateProject(editingProject.id, {
                        aspectRatioClass: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#DCDCD0] text-xs text-[#1E252B]"
                  >
                    <option value="aspect-[16/10]">Landscape 16:10</option>
                    <option value="aspect-[16/9]">Widescreen 16:9</option>
                    <option value="aspect-[3/4]">Portrait 3:4</option>
                    <option value="aspect-[4/5]">Portrait 4:5</option>
                    <option value="aspect-[9/13]">Tall 9:13</option>
                    <option value="aspect-[2/3]">Tall 2:3</option>
                    <option value="aspect-square">Square 1:1</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-mono text-[#8C907E] uppercase flex items-center gap-1.5">
                      <ExternalLink className="w-3.5 h-3.5 text-[#2D6A75]" />
                      <span>Project Link / External URL (YouTube, Vimeo, Behance)</span>
                    </label>
                    {editingProject.link && (
                      <a
                        href={editingProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] font-mono text-[#2D6A75] hover:underline inline-flex items-center gap-1"
                      >
                        <span>Test Link ↗</span>
                      </a>
                    )}
                  </div>
                  <input
                    type="url"
                    value={editingProject.link || ""}
                    onChange={(e) =>
                      handleUpdateProject(editingProject.id, { link: e.target.value })
                    }
                    placeholder="https://youtube.com/watch?v=... or https://vimeo.com/..."
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#DCDCD0] text-xs text-[#1E252B]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-[#8C907E] uppercase mb-1">
                    Video URL
                  </label>
                  <input
                    type="text"
                    value={editingProject.video || ""}
                    onChange={(e) =>
                      handleUpdateProject(editingProject.id, { video: e.target.value })
                    }
                    placeholder="/videos/... or /uploads/..."
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#DCDCD0] text-xs text-[#1E252B]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-[#8C907E] uppercase mb-1">
                    Photo URL
                  </label>
                  <input
                    type="text"
                    value={editingProject.image || ""}
                    onChange={(e) =>
                      handleUpdateProject(editingProject.id, { image: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#DCDCD0] text-xs text-[#1E252B]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-[#8C907E] uppercase mb-1">
                    Client Name
                  </label>
                  <input
                    type="text"
                    value={editingProject.client || ""}
                    onChange={(e) =>
                      handleUpdateProject(editingProject.id, { client: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#DCDCD0] text-xs text-[#1E252B]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-[#8C907E] uppercase mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={editingProject.location || ""}
                    onChange={(e) =>
                      handleUpdateProject(editingProject.id, { location: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#DCDCD0] text-xs text-[#1E252B]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-mono text-[#8C907E] uppercase mb-1">
                    Camera & Optics
                  </label>
                  <input
                    type="text"
                    value={editingProject.cameraGear || ""}
                    onChange={(e) =>
                      handleUpdateProject(editingProject.id, { cameraGear: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#DCDCD0] text-xs text-[#1E252B]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-mono text-[#8C907E] uppercase mb-1">
                    Synopsis / Narrative
                  </label>
                  <textarea
                    rows={3}
                    value={editingProject.synopsis || ""}
                    onChange={(e) =>
                      handleUpdateProject(editingProject.id, { synopsis: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#DCDCD0] text-xs text-[#1E252B] resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="sticky bottom-0 bg-white px-6 py-4 border-t border-[#E0E0D8] flex items-center justify-between">
              <span className="text-xs text-[#8C907E] font-mono">Staged locally</span>
              <button
                onClick={() => setEditingProject(null)}
                className="px-6 py-2 rounded-full bg-[#2D6A75] text-white text-xs font-bold hover:bg-[#204F57] transition-all cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* ================= SLIDE-OVER DRAWER FOR 3D DESIGN ================= */}
      {/* =================================================================== */}
      {editingDesign && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="w-full max-w-xl h-full bg-[#FAFAF7] border-l border-[#DCDCD0] flex flex-col justify-between shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 bg-white px-6 py-4 border-b border-[#E0E0D8] flex items-center justify-between">
              <h3 className="font-extrabold text-sm text-[#1E252B]">
                {editingDesign.title || "Edit 3D Slide"}
              </h3>
              <button
                onClick={() => setEditingDesign(null)}
                className="p-2 text-[#8C907E] hover:text-[#1E252B] hover:bg-[#F2F2EC] rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-black">
                {editingDesign.image && (
                  <Image
                    src={editingDesign.image}
                    alt={editingDesign.title}
                    fill
                    className="object-cover"
                  />
                )}
                <label className="absolute bottom-2.5 right-2.5 px-3 py-1.5 rounded-full bg-white text-xs font-bold text-[#1E252B] shadow-md cursor-pointer hover:bg-[#F0F0E8]">
                  Upload Poster
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleFileUpload(
                        e,
                        (url) => handleUpdateDesign(editingDesign.id, { image: url }),
                        "slide-img"
                      )
                    }
                    className="hidden"
                  />
                </label>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-[10px] font-mono text-[#8C907E] uppercase mb-1">
                    Badge Title
                  </label>
                  <input
                    type="text"
                    value={editingDesign.badgeTitle}
                    onChange={(e) =>
                      handleUpdateDesign(editingDesign.id, { badgeTitle: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#DCDCD0] text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-[#8C907E] uppercase mb-1">
                    Badge Subtitle
                  </label>
                  <input
                    type="text"
                    value={editingDesign.badgeSubtitle || ""}
                    onChange={(e) =>
                      handleUpdateDesign(editingDesign.id, { badgeSubtitle: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#DCDCD0] text-xs"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] font-mono text-[#8C907E] uppercase mb-1">
                    Full Title
                  </label>
                  <input
                    type="text"
                    value={editingDesign.title}
                    onChange={(e) =>
                      handleUpdateDesign(editingDesign.id, { title: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#DCDCD0] text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-[#8C907E] uppercase mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={editingDesign.category}
                    onChange={(e) =>
                      handleUpdateDesign(editingDesign.id, { category: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#DCDCD0] text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-[#8C907E] uppercase mb-1">
                    CTR / Views Metric
                  </label>
                  <input
                    type="text"
                    value={editingDesign.viewsOrMetric}
                    onChange={(e) =>
                      handleUpdateDesign(editingDesign.id, { viewsOrMetric: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#DCDCD0] text-xs font-bold text-[#E07A4A]"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] font-mono text-[#8C907E] uppercase mb-1">
                    External Link URL
                  </label>
                  <input
                    type="url"
                    value={editingDesign.link || ""}
                    onChange={(e) =>
                      handleUpdateDesign(editingDesign.id, { link: e.target.value })
                    }
                    placeholder="https://behance.net/... or https://youtube.com/..."
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#DCDCD0] text-xs"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] font-mono text-[#8C907E] uppercase mb-1">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    value={editingDesign.description}
                    onChange={(e) =>
                      handleUpdateDesign(editingDesign.id, { description: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#DCDCD0] text-xs resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-white px-6 py-4 border-t border-[#E0E0D8] flex items-center justify-end">
              <button
                onClick={() => setEditingDesign(null)}
                className="px-6 py-2 rounded-full bg-[#2D6A75] text-white text-xs font-bold hover:bg-[#204F57] transition-all cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
