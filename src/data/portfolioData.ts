export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  filter: "all" | "films" | "portraits" | "brand" | "editorial";
  image: string;
  aspect: "portrait" | "landscape" | "tall";
  span: string; // Tailwind grid span
  synopsis: string;
  client: string;
  location: string;
  cameraGear: string;
  quote?: string;
  quoteAuthor?: string;
}

export interface Service {
  id: string;
  title: string;
  category: string;
  description: string;
  deliverables: string[];
  icon: "camera" | "film" | "sparkles" | "compass";
}

export interface ProcessStep {
  number: string;
  title: string;
  phase: string;
  description: string;
  details: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  client: string;
  role: string;
  category: string;
  year: string;
}

export const PROJECTS: Project[] = [
  {
    id: "the-wedding-story",
    title: "The Wedding Story",
    category: "Cinematic Films & Editorial",
    year: "2024",
    filter: "films",
    image: "/images/work-wedding.jpg",
    aspect: "landscape",
    span: "col-span-12 md:col-span-8",
    synopsis:
      "A quiet, poetic documentary of an intimate celebration in Udaipur. We prioritized unfiltered human warmth, spontaneous tears, and twilight light over orchestrated postures.",
    client: "Aanya & Kabir",
    location: "Udaipur, India",
    cameraGear: "Sony FX3 · Sony 35mm f/1.4 GM · Leica M11",
    quote: "Om didn't just record our day; he immortalized how every second felt.",
    quoteAuthor: "Aanya Mehta",
  },
  {
    id: "faces-and-feelings",
    title: "Faces & Feelings",
    category: "Portrait Photography",
    year: "2024",
    filter: "portraits",
    image: "/images/work-faces.jpg",
    aspect: "portrait",
    span: "col-span-12 md:col-span-4",
    synopsis:
      "A minimalist studio exploration of natural light and raw expression. Stripping away heavy styling to let human vulnerability and the eyes take center stage.",
    client: "Editorial Studio",
    location: "Mumbai, India",
    cameraGear: "Hasselblad X2D 100C · 80mm f/1.9",
    quote: "A masterclass in restraint, quiet emotion, and honest lighting.",
    quoteAuthor: "Vogue India Contributor",
  },
  {
    id: "the-art-of-motion",
    title: "The Art of Motion",
    category: "Fashion & Movement",
    year: "2023",
    filter: "editorial",
    image: "/images/work-motion.jpg",
    aspect: "portrait",
    span: "col-span-12 md:col-span-5",
    synopsis:
      "Capturing the fluid poetry of contemporary dance fused with sustainable haute couture. Slow shutter speeds and deliberate motion blur create impressionistic gestures.",
    client: "Aura Haute Atelier",
    location: "Jaipur, India",
    cameraGear: "Canon EOS R5 · RF 50mm f/1.2 L USM",
    quote: "The garments breathe and flow as if woven from the air itself.",
    quoteAuthor: "Priya Sen, Creative Director",
  },
  {
    id: "urban-frames",
    title: "Urban Frames",
    category: "Architecture & Street",
    year: "2024",
    filter: "editorial",
    image: "/images/work-urban.jpg",
    aspect: "landscape",
    span: "col-span-12 md:col-span-7",
    synopsis:
      "A study of geometrical brutalism meeting morning golden light across South Mumbai. Juxtaposing colossal heritage stone facades with fleeting pedestrian silhouettes.",
    client: "Monochrome Review",
    location: "South Mumbai",
    cameraGear: "Leica Q3 · Summilux 28mm f/1.7 ASPH",
    quote: "Every shadow in these frames holds a century of silent stories.",
    quoteAuthor: "Architectural Digest Feature",
  },
  {
    id: "brand-in-focus",
    title: "Brand in Focus",
    category: "Brand Campaigns",
    year: "2023",
    filter: "brand",
    image: "/images/work-brand.jpg",
    aspect: "landscape",
    span: "col-span-12 md:col-span-7",
    synopsis:
      "An understated visual narrative for an artisanal apothecary brand. Emphasizing tactile botanical textures, handcrafted amber glassware, and earthy palettes.",
    client: "Terra Botanics",
    location: "Goa, India",
    cameraGear: "Sony A7S III · Sony 90mm f/2.8 Macro",
    quote: "Our brand sales increased 180% following the campaign launch.",
    quoteAuthor: "Rohan Kapoor, Founder",
  },
  {
    id: "moments-unscripted",
    title: "Moments Unscripted",
    category: "Documentary & Lifestyle",
    year: "2024",
    filter: "editorial",
    image: "/images/work-moments.jpg",
    aspect: "portrait",
    span: "col-span-12 md:col-span-5",
    synopsis:
      "An organic visual journal across the misty tea estates of Nilgiris. Shot entirely with 35mm film emulation to preserve grain, nostalgic sun flares, and earthy tones.",
    client: "Personal Project",
    location: "Nilgiris, Western Ghats",
    cameraGear: "Contax T2 · Kodak Portra 400 35mm",
    quote: "Photographs that smell of petrichor and early morning mist.",
    quoteAuthor: "Kunal S., Curator",
  },
];

export const SERVICES: Service[] = [
  {
    id: "photography",
    title: "Photography",
    category: "Still Imagery",
    description:
      "Portraits, lifestyle photography, editorial shoots, and personal branding crafted with natural light and intentional composition.",
    deliverables: [
      "Editorial Portrait Sessions",
      "Lookbook & Fashion Editorial",
      "Curated High-Res Digital Gallery",
      "Fine-Art Archival Prints",
    ],
    icon: "camera",
  },
  {
    id: "cinematic-films",
    title: "Cinematic Films",
    category: "Motion & Sound",
    description:
      "Creative films, short-form videos, promotional content, and visual storytelling captured with professional cinema rigs and custom color grading.",
    deliverables: [
      "4K DCI Cinematic Master",
      "Bespoke Film Color Grade",
      "Sound Design & Licensed Score",
      "Social Teasers (9:16 Vertical Cuts)",
    ],
    icon: "film",
  },
  {
    id: "weddings-events",
    title: "Weddings & Events",
    category: "Documentary",
    description:
      "Documenting meaningful celebrations and authentic moments with a discreet, fly-on-the-wall approach that lets your memories breathe.",
    deliverables: [
      "Feature-Length Wedding Film",
      "Highlight Cinematic Reel",
      "Full Photographic Coverage",
      "Handcrafted Heirloom Album",
    ],
    icon: "sparkles",
  },
  {
    id: "brand-campaigns",
    title: "Brand Campaigns",
    category: "Commercial",
    description:
      "Visual content for businesses, products, and creative brands needing high-end aesthetic identity, consistency, and emotional resonance.",
    deliverables: [
      "Creative Direction & Moodboards",
      "Multi-Platform Campaign Assets",
      "Product & Lifestyle Integration",
      "Full Commercial Licensing Rights",
    ],
    icon: "compass",
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    phase: "Discover",
    title: "Understand the story, concept, and vision.",
    description:
      "Every project begins with listening. We explore the emotional core of your story, define moodboards, scout locations, and plan light and styling with deliberate intention.",
    details: [
      "Initial concept consultation",
      "Moodboard & color palette curation",
      "Location scouting & lighting analysis",
      "Shot list & visual schedule",
    ],
  },
  {
    number: "02",
    phase: "Create",
    title: "Capture the right moments with intention.",
    description:
      "On set or in the field, I cultivate an atmosphere of relaxed trust. Rather than stiff poses, we facilitate genuine interactions and chase organic light as it shifts.",
    details: [
      "Hands-on creative direction",
      "Professional cinema & medium format gear",
      "Natural and intentional light setups",
      "Real-time composition review",
    ],
  },
  {
    number: "03",
    phase: "Deliver",
    title: "Refine and deliver polished visual work.",
    description:
      "Post-production is where the final filmic magic happens. Each image and sequence undergoes meticulous tonal correction, custom film-grain tuning, and audio mastering.",
    details: [
      "Custom analog-inspired color grading",
      "Subtle, natural skin & tonal retouching",
      "Private interactive online gallery",
      "Archival deliverable formats & prints",
    ],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    quote:
      "Om captured the soul of our wedding day without ever feeling intrusive. Looking through the photographs feels like stepping right back into the golden hour warmth.",
    client: "Aanya & Kabir",
    role: "Private Commission",
    category: "The Wedding Story",
    year: "2024",
  },
  {
    id: "test-2",
    quote:
      "His understanding of natural light and tonal harmony brought our campaign to life in a way that resonated deeply with our luxury audience. Unmatched editorial taste.",
    client: "Rohan Kapoor",
    role: "Founder, Terra Botanics",
    category: "Brand Campaign",
    year: "2023",
  },
  {
    id: "test-3",
    quote:
      "Working with Om was an effortless collaboration. He manages to frame human vulnerability with such cinematic elegance that every still looks like a frame from a film.",
    client: "Priya Sen",
    role: "Creative Director, Aura Atelier",
    category: "Fashion Editorial",
    year: "2024",
  },
];

export const CONTACT_INFO = {
  email: "anurag@anurag.studio",
  instagram: "@anurag.visuals",
  instagramUrl: "https://instagram.com",
  vimeoUrl: "https://vimeo.com",
  youtubeUrl: "https://youtube.com",
  behanceUrl: "https://behance.net",
  linkedinUrl: "https://linkedin.com",
  location: "Mumbai, India",
  availability: "Available for Commissions Worldwide",
};

export interface VisualDesignItem {
  id: string;
  badgeTitle: string;
  badgeSubtitle?: string;
  title: string;
  category: string;
  viewsOrMetric: string;
  image: string;
  client: string;
  year: string;
  tags: string[];
  description: string;
}

export const VISUAL_DESIGNS: VisualDesignItem[] = [
  {
    id: "surprised-best-friend",
    badgeTitle: "SURPRISED MY BEST FRIEND",
    badgeSubtitle: "LUXURY CAR REVEAL",
    title: "Surprised My Best Friend — G-Wagon Delivery",
    category: "YouTube Thumbnail & Cover",
    viewsOrMetric: "4.8M Views · 14.2% CTR",
    image: "/images/designs/thumb-friend.jpg",
    client: "Creator Media Network",
    year: "2024",
    tags: ["High CTR", "Color Graded", "Facial Expression Staging"],
    description: "Designed for peak click-through engagement with high-contrast character lighting, bold 3D typography, and emotional facial framing."
  },
  {
    id: "shopping-challenge",
    badgeTitle: "SPENDING 20 LAKH",
    badgeSubtitle: "SHOPPING CHALLENGE",
    title: "20 Lakh Luxury Mall Shopping Challenge",
    category: "Creative Thumbnail & Campaign",
    viewsOrMetric: "3.2M Views · 12.8% CTR",
    image: "/images/designs/thumb-shopping.jpg",
    client: "Lifestyle Vlog Production",
    year: "2024",
    tags: ["Vibrant Hues", "Product Stacking", "Action Pose"],
    description: "Dynamic layered visual composition featuring shopping bags, high-energy lighting, and expressive typography designed for luxury audience retention."
  },
  {
    id: "jet-skiing-pattaya",
    badgeTitle: "JET SKIING",
    badgeSubtitle: "IN PATTAYA 4K",
    title: "Extreme Jet Skiing in Pattaya Islands",
    category: "Travel & Adventure Cinema",
    viewsOrMetric: "2.1M Views · 11.5% CTR",
    image: "/images/designs/thumb-pattaya.jpg",
    client: "Wanderlust Expeditions",
    year: "2024",
    tags: ["Action Water Splashes", "Warm Daylight", "Bold Text Stroke"],
    description: "High-octane tropical action cover highlighting water spray dynamics, authentic laughter, and vibrant turquoise-to-warm-orange grading."
  },
  {
    id: "midnight-drift",
    badgeTitle: "MIDNIGHT DRIFT",
    badgeSubtitle: "STREET CULTURE 4K",
    title: "Midnight Underground Supercar Drift",
    category: "Automotive Street Cinema",
    viewsOrMetric: "1.9M Views · 13.4% CTR",
    image: "/images/designs/thumb-drift.jpg",
    client: "Apex Auto Journal",
    year: "2023",
    tags: ["Neon Gradients", "Motion Blur", "Bold Branding"],
    description: "Moody, high-contrast night aesthetics combining red taillight streaks with metallic gloss reflections."
  },
  {
    id: "tokyo-cyber",
    badgeTitle: "TOKYO 2049",
    badgeSubtitle: "CYBERPUNK VISUALS",
    title: "Neo-Tokyo Rain & Reflections Cinematic",
    category: "Concept Poster & Key Visual",
    viewsOrMetric: "2.7M Views · 15.1% CTR",
    image: "/images/designs/thumb-tokyo.jpg",
    client: "Sci-Fi Short Series",
    year: "2024",
    tags: ["Cyan & Magenta", "Rain Refraction", "Cinematic Aspect"],
    description: "Atmospheric concept visual built with multi-layered neon reflections, futuristic Japanese typography, and moody depth of field."
  },
  {
    id: "desert-mirage",
    badgeTitle: "DESERT MIRAGE",
    badgeSubtitle: "AFTERMOVIE 2024",
    title: "Desert Mirage Music & Arts Festival",
    category: "Festival Campaign & Poster",
    viewsOrMetric: "1.4M Views · 10.9% CTR",
    image: "/images/designs/thumb-festival.jpg",
    client: "Mirage Music Global",
    year: "2024",
    tags: ["Stage Lighting", "Crowd Euphoria", "Typography Overlay"],
    description: "Electric festival key art capturing golden hour pyrotechnics, stage silhouettes, and vibrant community energy."
  },
  {
    id: "artisanal-roastery",
    badgeTitle: "ORIGIN CRAFT",
    badgeSubtitle: "SINGLE ESTATE COFFEE",
    title: "Origin Craft Coffee Brand Kit & Packaging",
    category: "Brand Kit & Poster Series",
    viewsOrMetric: "Commercial Launch · 180% Sales Boost",
    image: "/images/designs/thumb-coffee.jpg",
    client: "Origin Roasters",
    year: "2024",
    tags: ["Minimalist Layout", "Warm Earth Tones", "Fine-Art Print"],
    description: "Clean artisanal identity system featuring warm monochrome packaging typography, textured paper stock, and earthy palettes."
  }
];

