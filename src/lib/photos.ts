export interface PhotoItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: "childhood" | "prime" | "recent";
  badge?: string;
  year?: string;
}

export const childhoodPhotos: PhotoItem[] = [
  {
    id: "childhood-01",
    src: "/photos/childhood/01_first_birthday.jpeg",
    alt: "Little Akkoww in a yellow dress behind her birthday cake with a floral hairpiece",
    caption: "The very first birthday celebrations — that sweet smile from day one.",
    category: "childhood",
    badge: "Age ~1-2",
    year: "Babyhood",
  },
  {
    id: "childhood-02",
    src: "/photos/childhood/02_tonsure_garlands.jpeg",
    alt: "Tonsure ceremony portrait of Akkoww wearing floral garlands",
    caption: "The traditional tonsure ceremony — big bright curious eyes.",
    category: "childhood",
    badge: "Age ~2",
    year: "Toddler Years",
  },
  {
    id: "childhood-03",
    src: "/photos/childhood/03_tonsure_brother.jpeg",
    alt: "Akkoww and her brother together during the ceremony with garlands",
    caption: "Side by side through every ceremony, every laughter, and every little mischief.",
    category: "childhood",
    badge: "Age ~2-3",
    year: "Partners in Crime",
  },
  {
    id: "childhood-04",
    src: "/photos/childhood/04_tonsure_jasmine.jpeg",
    alt: "Akkoww in a light blue dress with jasmine flower garlands holding hands with brother",
    caption: "Holding jasmine garlands, already looking after each other.",
    category: "childhood",
    badge: "Age ~3",
    year: "Early Memories",
  },
  {
    id: "childhood-05",
    src: "/photos/childhood/05_tonsure_parents.jpeg",
    alt: "Family celebration portrait with parents and little brother",
    caption: "Surrounded by love and blessings from mom and dad.",
    category: "childhood",
    badge: "Age ~3",
    year: "Family Blessings",
  },
  {
    id: "childhood-06",
    src: "/photos/childhood/06_album_collage.jpeg",
    alt: "Classic family photo album page capturing childhood memories",
    caption: "Pages from our treasured album — frill dresses, pattu pavadai, and endless adventures.",
    category: "childhood",
    badge: "Age ~4-5",
    year: "Vintage Keepsake",
  },
  {
    id: "childhood-07",
    src: "/photos/childhood/07_turquoise_dress.jpeg",
    alt: "Akkoww in a white lace top and turquoise skirt standing with baby brother",
    caption: "Big sister energy starting young — protecting and posing together.",
    category: "childhood",
    badge: "Age ~5-6",
    year: "School Begins",
  },
  {
    id: "childhood-08",
    src: "/photos/childhood/08_classical_dance.jpeg",
    alt: "Akkoww in a royal blue Bharatanatyam classical dance costume with traditional head jewelry",
    caption: "Graceful in classical dance costume — always performing with pride.",
    category: "childhood",
    badge: "Age ~7-8",
    year: "Classical Grace",
  },
  {
    id: "childhood-09",
    src: "/photos/childhood/09_studio_family.jpeg",
    alt: "Studio family portrait with parents, Akkoww in a blue gown and brother in white suit coat",
    caption: "A timeless studio family portrait in royal blue.",
    category: "childhood",
    badge: "Age ~9-11",
    year: "Growing Up",
  },
  {
    id: "childhood-10",
    src: "/photos/childhood/10_tween_selfie.jpeg",
    alt: "Akkoww with braided hair and brother posing with peace sign",
    caption: "Two braids, a peace sign, and the goofy camaraderie that never changed.",
    category: "childhood",
    badge: "Age ~11-13",
    year: "The Tween Years",
  },
];

export const recentPhotos: PhotoItem[] = [
  {
    id: "recent-01",
    src: "/photos/2024-26/01_recent.jpeg",
    alt: "Akkoww in a purple traditional outfit",
    caption: "One of my all-time favourite memories ❤️",
    category: "recent",
    badge: "2024-2026",
  },
  {
    id: "recent-02",
    src: "/photos/2024-26/02_recent.jpeg",
    alt: "Akkoww leaning against a balcony with a calm smile",
    caption: "The calm between all our chaos.",
    category: "recent",
    badge: "2024-2026",
  },
  {
    id: "recent-03",
    src: "/photos/2024-26/03_recent.jpeg",
    alt: "Akkoww smiling in an elegant black dress",
    caption: "This moment >>> always shining.",
    category: "recent",
    badge: "2024-2026",
  },
  {
    id: "recent-04",
    src: "/photos/2024-26/04_recent.jpeg",
    alt: "Akkoww beneath flowering green vines",
    caption: "An ordinary day, made special by your presence.",
    category: "recent",
    badge: "2024-2026",
  },
  {
    id: "recent-05",
    src: "/photos/2024-26/05_recent.jpeg",
    alt: "Akkoww in a festive red and green traditional outfit",
    caption: "Another memory I never want to forget.",
    category: "recent",
    badge: "2024-2026",
  },
  {
    id: "recent-06",
    src: "/photos/2024-26/06_recent.jpeg",
    alt: "Akkoww in warm sunlight wearing a saree",
    caption: "Soft golden light, softer heart.",
    category: "recent",
    badge: "2024-2026",
  },
  {
    id: "recent-07",
    src: "/photos/2024-26/07_recent.jpeg",
    alt: "Akkoww in a green saree holding a basket of flowers",
    caption: "You being authentically you — our favorite photo.",
    category: "recent",
    badge: "Signature",
  },
  {
    id: "recent-08",
    src: "/photos/2024-26/08_recent.jpeg",
    alt: "Akkoww walking through a sunlit garden path",
    caption: "Sunshine found you and made everything brighter.",
    category: "recent",
    badge: "2024-2026",
  },
  {
    id: "recent-09",
    src: "/photos/2024-26/09_recent.jpeg",
    alt: "Akkoww smiling happily on a garden walk",
    caption: "A genuine smile worth remembering forever.",
    category: "recent",
    badge: "2024-2026",
  },
  {
    id: "recent-10",
    src: "/photos/2024-26/10_recent.jpeg",
    alt: "Akkoww portrait in modern elegance",
    caption: "Effortlessly elegant, as always.",
    category: "recent",
    badge: "2024-2026",
  },
  {
    id: "recent-11",
    src: "/photos/2024-26/11_recent.jpeg",
    alt: "Akkoww candid smiling outdoors",
    caption: "Candid joy and pure warmth.",
    category: "recent",
    badge: "2024-2026",
  },
  {
    id: "recent-12",
    src: "/photos/2024-26/12_recent.jpeg",
    alt: "Akkoww festive celebration memory",
    caption: "Dressed in celebration, lighting up the room.",
    category: "recent",
    badge: "2024-2026",
  },
  {
    id: "recent-13",
    src: "/photos/2024-26/13_recent.jpeg",
    alt: "Akkoww in gentle natural lighting",
    caption: "Soft smiles and beautiful days.",
    category: "recent",
    badge: "2024-2026",
  },
  {
    id: "recent-14",
    src: "/photos/2024-26/14_recent.jpeg",
    alt: "Akkoww with family and friends",
    caption: "Making memories with the ones who matter most.",
    category: "recent",
    badge: "2024-2026",
  },
  {
    id: "recent-15",
    src: "/photos/2024-26/15_recent.jpeg",
    alt: "Akkoww peaceful portrait in natural backdrop",
    caption: "Poised, confident, and blooming beautifully.",
    category: "recent",
    badge: "2024-2026",
  },
];

// Prime photos (38 photos from her teenage, school, family, and memorable prime years)
export const primePhotos: PhotoItem[] = Array.from({ length: 38 }, (_, i) => {
  const indexStr = String(i + 1).padStart(2, "0");
  const specialCaptions: Record<number, string> = {
    1: "A gorgeous family portrait in nature — all our smiles together.",
    2: "Matching red outfits during school days — endless drama and fun.",
    3: "Priceless teenage selfies and goofy expressions.",
    4: "Every day with you had its own funny soundtrack.",
    5: "School trips and shared secrets no one else knew about.",
    6: "When we couldn't stop giggling at the most serious moments.",
    7: "A beautiful milestone captured in time.",
    8: "Festival celebrations filled with lights and laughter.",
    9: "The calm sibling bond that words can never quite describe.",
    10: "Unplanned road trips and spontaneous memories.",
  };

  return {
    id: `prime-${indexStr}`,
    src: `/photos/prime/${indexStr}_prime.jpeg`,
    alt: `Akkoww memory from her prime years photo ${i + 1}`,
    caption: specialCaptions[i + 1] ?? `A golden memory from our prime years — chapter ${i + 1}.`,
    category: "prime",
    badge: "Prime Years",
  };
});

// All photos combined for universal lightbox lookup
export const allPhotos: PhotoItem[] = [
  ...childhoodPhotos,
  ...primePhotos,
  ...recentPhotos,
];
