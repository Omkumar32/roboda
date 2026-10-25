import Hero from "@/components/Hero";
import SelectedWork from "@/components/SelectedWork";
import VisualDesigns from "@/components/VisualDesigns";
import About from "@/components/About";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-[#E8E5DA] text-[#22221F] selection:bg-[#596637] selection:text-[#F2F0E8]">
      {/* 1. Hero Section inside large rounded rectangular container */}
      <Hero />

      {/* 2. Selected Work Section */}
      <SelectedWork />

      {/* 3. 3D Visual Designs & Thumbnails Showcase */}
      <VisualDesigns />

      {/* 3. About Section */}
      <About />

      {/* 4. Services Section */}
      <Services />

      {/* 6. Testimonials Section */}
      <Testimonials />

      {/* 7. Contact Section */}
      <Contact />

      {/* 8. Footer */}
      <Footer />
    </main>
  );
}
