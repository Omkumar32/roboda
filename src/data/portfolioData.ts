export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  filter: "all" | "films" | "portraits" | "brand" | "editorial";
  image: string;
  video?: string;
  aspect: "portrait" | "landscape" | "tall" | "square";
  aspectRatioClass: string;
  span: string; // Tailwind grid span (backwards compatibility)
  synopsis: string;
  client: string;
  location: string;
  cameraGear: string;
  quote?: string;
  quoteAuthor?: string;
  mediaType: "film" | "portrait" | "series" | "editorial" | "commercial";
  mediaTag: string;
  duration?: string;
  likesCount: number;
  link?: string;
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
    category: "Cinematic Film",
    year: "2024",
    filter: "films",
    image: "/images/work-wedding.jpg",
    aspect: "landscape",
    aspectRatioClass: "aspect-[16/10]",
    span: "col-span-12 md:col-span-8",
    mediaType: "film",
    mediaTag: "▶ 4K CINEMA · 03:42",
    duration: "03:42",
    likesCount: 384,
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
    aspectRatioClass: "aspect-[3/4]",
    span: "col-span-12 md:col-span-4",
    mediaType: "portrait",
    mediaTag: "📷 HASSELBLAD 100MP",
    likesCount: 528,
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
    video: "/videos/creative-fashion.mp4",
    aspect: "tall",
    aspectRatioClass: "aspect-[9/13]",
    span: "col-span-12 md:col-span-5",
    mediaType: "series",
    mediaTag: "❐ 8 FRAMES · EDITORIAL",
    likesCount: 412,
    synopsis:
      "Capturing the fluid poetry of contemporary dance fused with sustainable haute couture. Slow shutter speeds and deliberate motion blur create impressionistic gestures.",
    client: "Aura Haute Atelier",
    location: "Jaipur, India",
    cameraGear: "Canon EOS R5 · RF 50mm f/1.2 L USM",
    quote: "The garments breathe and flow as if woven from the air itself.",
    quoteAuthor: "Priya Sen, Creative Director",
  },
  {
    id: "tokyo-drift",
    title: "Tokyo Midnight Run",
    category: "Cinematic Motion",
    year: "2024",
    filter: "films",
    image: "/images/designs/thumb-drift.jpg",
    video: "/videos/bike-motion.mp4",
    aspect: "landscape",
    aspectRatioClass: "aspect-[16/9]",
    span: "col-span-12 md:col-span-7",
    mediaType: "film",
    mediaTag: "▶ 4K 120FPS · 01:28",
    duration: "01:28",
    likesCount: 764,
    synopsis:
      "A neon-bathed nocturnal journey through the subterranean expressways of Shinjuku. High frame-rate captures of tire smoke, headlight trails, and asphalt reflections.",
    client: "Kurogane Racing Club",
    location: "Tokyo, Japan",
    cameraGear: "RED Komodo 6K · 24mm Anamorphic T2.0",
    quote: "The closest visual feeling to velocity frozen inside liquid amber.",
    quoteAuthor: "Daisuke T., Director",
  },
  {
    id: "urban-frames",
    title: "Brutalist Monoliths",
    category: "Architecture & Street",
    year: "2024",
    filter: "editorial",
    image: "/images/work-urban.jpg",
    aspect: "square",
    aspectRatioClass: "aspect-square",
    span: "col-span-12 md:col-span-7",
    mediaType: "editorial",
    mediaTag: "✦ LEICA MONOCHROME",
    likesCount: 319,
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
    title: "Terra Botanics Apothecary",
    category: "Brand Campaigns",
    year: "2023",
    filter: "brand",
    image: "/images/work-brand.jpg",
    aspect: "portrait",
    aspectRatioClass: "aspect-[4/5]",
    span: "col-span-12 md:col-span-7",
    mediaType: "commercial",
    mediaTag: "❐ CAMPAIGN · 12 ASSETS",
    likesCount: 442,
    synopsis:
      "An understated visual narrative for an artisanal apothecary brand. Emphasizing tactile botanical textures, handcrafted amber glassware, and earthy palettes.",
    client: "Terra Botanics",
    location: "Goa, India",
    cameraGear: "Sony A7S III · Sony 90mm f/2.8 Macro",
    quote: "Our brand sales increased 180% following the campaign launch.",
    quoteAuthor: "Rohan Kapoor, Founder",
  },
  {
    id: "artisan-coffee",
    title: "The Quiet Pour",
    category: "Brand & Lifestyle",
    year: "2024",
    filter: "brand",
    image: "/images/designs/thumb-coffee.jpg",
    aspect: "portrait",
    aspectRatioClass: "aspect-[3/4]",
    span: "col-span-12 md:col-span-5",
    mediaType: "commercial",
    mediaTag: "☕ LIFESTYLE ESSAY",
    likesCount: 521,
    synopsis:
      "A visual ode to slow drip espresso and handcrafted ceramic vessels in Higashiyama. Warm amber tones highlighting morning steam and single-origin roast textures.",
    client: "Kissa Kurasu",
    location: "Kyoto, Japan",
    cameraGear: "Leica M11 · Summilux 50mm f/1.4",
    quote: "Every frame makes you taste the quiet reverence of the first cup.",
    quoteAuthor: "Specialty Coffee Magazine",
  },
  {
    id: "moments-unscripted",
    title: "Misty Heights of Nilgiris",
    category: "Documentary & Lifestyle",
    year: "2024",
    filter: "editorial",
    image: "/images/work-moments.jpg",
    aspect: "tall",
    aspectRatioClass: "aspect-[2/3]",
    span: "col-span-12 md:col-span-5",
    mediaType: "editorial",
    mediaTag: "🎞 KODAK PORTRA 400",
    likesCount: 639,
    synopsis:
      "An organic visual journal across the misty tea estates of Nilgiris. Shot entirely with 35mm film emulation to preserve grain, nostalgic sun flares, and earthy tones.",
    client: "Personal Project",
    location: "Nilgiris, Western Ghats",
    cameraGear: "Contax T2 · Kodak Portra 400 35mm",
    quote: "Photographs that smell of petrichor and early morning mist.",
    quoteAuthor: "Kunal S., Curator",
  },
  {
    id: "festival-of-light",
    title: "Lanterns of Solitude",
    category: "Cinematic Film",
    year: "2023",
    filter: "films",
    image: "/images/designs/thumb-festival.jpg",
    aspect: "landscape",
    aspectRatioClass: "aspect-[16/10]",
    span: "col-span-12 md:col-span-6",
    mediaType: "film",
    mediaTag: "▶ 4K CINEMA · 02:15",
    duration: "02:15",
    likesCount: 890,
    synopsis:
      "Immersed in Chiang Mai's Yi Peng sky lantern ascension. Capturing thousands of buoyant paper luminaries floating into the midnight atmosphere.",
    client: "Wanderlust Film Project",
    location: "Chiang Mai, Thailand",
    cameraGear: "Sony FX3 · 24mm f/1.4 GM",
    quote: "A constellation storm drifting into the stars.",
    quoteAuthor: "National Geographic Traveler",
  },
  {
    id: "summer-respite",
    title: "Golden Solitude",
    category: "Portrait Photography",
    year: "2024",
    filter: "portraits",
    image: "/images/designs/thumb-friend.jpg",
    aspect: "portrait",
    aspectRatioClass: "aspect-[4/5]",
    span: "col-span-12 md:col-span-6",
    mediaType: "portrait",
    mediaTag: "📷 85MM NATURAL LIGHT",
    likesCount: 476,
    synopsis:
      "Gentle portrait study capturing the golden twilight hour across coastal cliffs. Completely unscripted poses, natural hair caught in sea breeze, and warm skin undertones.",
    client: "Private Collection",
    location: "Algarve, Portugal",
    cameraGear: "Sony A1 · FE 85mm f/1.4 GM",
    quote: "Unpretentious, deeply genuine, and luminous.",
    quoteAuthor: "Elle Editorial Review",
  },
  {
    id: "coastal-solitude",
    title: "Tides & Monoliths",
    category: "Cinematic Film",
    year: "2023",
    filter: "films",
    image: "/images/designs/thumb-pattaya.jpg",
    video: "/videos/cinematic-reel.mp4",
    aspect: "landscape",
    aspectRatioClass: "aspect-[16/9]",
    span: "col-span-12 md:col-span-6",
    mediaType: "film",
    mediaTag: "▶ ANAMORPHIC · 04:10",
    duration: "04:10",
    likesCount: 562,
    synopsis:
      "A visual exploration of coastal geography where limestone cliffs plunge into tropical turquoise surf. Atmospheric drone sequences juxtaposed with handheld macro surf swells.",
    client: "Terra Incognita Docs",
    location: "Andaman Coastline",
    cameraGear: "DJI Inspire 3 · Zenmuse X9-8K Air",
    quote: "Grandeur and tranquility woven into one seamless movement.",
    quoteAuthor: "Cinematography World",
  },
  {
    id: "metropolis-silhouettes",
    title: "Midnight Walkers",
    category: "Brand Campaigns",
    year: "2024",
    filter: "brand",
    image: "/images/designs/thumb-shopping.jpg",
    aspect: "portrait",
    aspectRatioClass: "aspect-[3/4]",
    span: "col-span-12 md:col-span-6",
    mediaType: "commercial",
    mediaTag: "✦ STREETWEAR '24",
    likesCount: 603,
    synopsis:
      "A fashion lookbook campaign set within bustling neon retail districts. Heavy contrasts, chrome storefront reflections, and movement-ready silhouettes.",
    client: "District 9 Apparel",
    location: "Ginza, Tokyo",
    cameraGear: "Hasselblad 907X 50C · 45mm f/4",
    quote: "A vision of urban streetwear that feels both futuristic and timeless.",
    quoteAuthor: "Highsnobiety Feature",
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
  link?: string;
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

