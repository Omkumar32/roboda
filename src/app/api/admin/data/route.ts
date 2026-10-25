import { NextResponse } from "next/server";
import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import {
  PROJECTS,
  VISUAL_DESIGNS,
  SERVICES,
  CONTACT_INFO,
} from "@/data/portfolioData";

const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "dynamicData.json");

export async function GET() {
  try {
    const fileContent = await readFile(DATA_FILE_PATH, "utf-8");
    const data = JSON.parse(fileContent);
    return NextResponse.json(data);
  } catch (error) {
    // If file doesn't exist yet, return initial defaults
    const initialData = {
      hero: {
        headline: "Every frame holds a quiet truth.",
        subheadline: "Cinematographer & visual storyteller documenting intimate human moments, analog moods, and bold editorial narratives across the world.",
        locationTag: "BASED IN MUMBAI · WORKING WORLDWIDE",
        statusBadge: "Available for Commissions '24",
      },
      about: {
        heading: "Behind every frame, there's a feeling.",
        monogram: "अ",
        authorName: "ANURAG",
        subtitle: "Cinematographer & Stills",
        establishedYear: "EST. 2020",
        paragraph1: "I'm a photographer and visual storyteller passionate about capturing honest emotions, meaningful details, and moments that deserve to be remembered.",
        paragraph2: "My process is rooted in patience, observation, and an obsession with light. Whether working with creative brands or filming intimate milestone celebrations, I strive to craft visual narratives that feel effortless, cinematic, and deeply human.",
        paragraph3: "From the bustling streetscapes of Mumbai to secluded natural retreats across India and abroad, my camera serves as an invitation to slow down and see the unnoticed poetry of life.",
        quote: "Great photography is not about asserting control over the scene; it's about attuning yourself to the story that is already unfolding.",
      },
      projects: PROJECTS,
      visualDesigns: VISUAL_DESIGNS,
      services: SERVICES,
      contact: CONTACT_INFO,
      updatedAt: new Date().toISOString(),
    };

    try {
      await mkdir(path.dirname(DATA_FILE_PATH), { recursive: true });
      await writeFile(DATA_FILE_PATH, JSON.stringify(initialData, null, 2), "utf-8");
    } catch (writeErr) {
      console.warn("Could not write initial dynamicData.json:", writeErr);
    }

    return NextResponse.json(initialData);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const updatedData = {
      ...body,
      updatedAt: new Date().toISOString(),
    };

    await mkdir(path.dirname(DATA_FILE_PATH), { recursive: true });
    await writeFile(DATA_FILE_PATH, JSON.stringify(updatedData, null, 2), "utf-8");

    return NextResponse.json({ success: true, data: updatedData });
  } catch (error: any) {
    console.error("Save error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to save portfolio data" },
      { status: 500 }
    );
  }
}
