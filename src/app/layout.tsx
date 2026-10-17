import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "अnurag — Photographer & Visual Storyteller",
  description:
    "Editorial photographer and filmmaker capturing authentic moments, cinematic stories, and timeless visuals. Based in Mumbai, available worldwide.",
  keywords: [
    "photographer",
    "filmmaker",
    "cinematographer",
    "visual storyteller",
    "editorial photography",
    "portrait photography",
    "fashion portfolio",
    "brand campaigns",
    "Anurag",
  ],
  authors: [{ name: "Anurag" }],
  creator: "Anurag",
  metadataBase: new URL("https://anurag.studio"),
  openGraph: {
    title: "अnurag — Photographer & Visual Storyteller",
    description:
      "Capturing authentic moments, meaningful stories, and cinematic visuals that stay with you.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/editorial_camera.jpg",
        width: 1200,
        height: 800,
        alt: "अnurag Photography",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "अnurag — Photographer & Visual Storyteller",
    description:
      "Editorial photographer and filmmaker capturing authentic moments and cinematic visuals.",
    images: ["/images/editorial_camera.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{ fontFamily: "'Manrope', 'Inter', -apple-system, sans-serif" }}
        className="antialiased bg-[#E8E5DA] text-[#22221F] min-h-screen selection:bg-[#596637] selection:text-[#F2F0E8]"
      >
        {children}
      </body>
    </html>
  );
}
