export const products = [
  {
    id: 1,
    name: "Wagyu Ribeye",
    slug: "wagyu-ribeye",
    price: 89.99,
    originalPrice: 109.99,
    rating: 4.9,
    reviewCount: 234,
    badge: "Chef Choice",
    badgeColor: "bg-amber-500",
    category: "Wagyu Selection",
    description:
      "Experience the pinnacle of beef luxury. Our A5 Wagyu Ribeye is marbled to perfection with buttery fat distribution that melts on your tongue. Sourced from certified Wagyu farms, each steak is hand-selected by our master butchers.",
    weight: ["200g", "300g", "400g"],
    cookingTips:
      "Best seared on a very hot cast iron for 90 seconds per side. Let rest 5 minutes before slicing against the grain.",
    sourcing: "Certified A5 Wagyu, grass-fed and grain-finished for 300+ days.",
    image:
      "https://images.unsplash.com/photo-1558030006-450675393462?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1558030006-450675393462?w=800&q=80",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
    ],
    featured: true,
  },
  {
    id: 2,
    name: "Grass Fed Tenderloin",
    slug: "grass-fed-tenderloin",
    price: 64.99,
    originalPrice: 79.99,
    rating: 4.8,
    reviewCount: 189,
    badge: "Bestseller",
    badgeColor: "bg-emerald-500",
    category: "Premium Steaks",
    description:
      "Our prized Grass-Fed Tenderloin is the most tender cut available. Raised on open pastures without hormones or antibiotics, the subtle flavor profile is enhanced by its buttery texture and clean finish.",
    weight: ["200g", "300g"],
    cookingTips:
      "Pan-sear in butter with thyme and garlic for 3 minutes per side. Perfect at medium-rare.",
    sourcing:
      "Pasture-raised, hormone-free, from partner farms in the highlands.",
    image:
      "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80",
      "https://images.unsplash.com/photo-1558030006-450675393462?w=800&q=80",
    ],
    featured: true,
  },
  {
    id: 3,
    name: "Dry Aged T-Bone",
    slug: "dry-aged-t-bone",
    price: 74.99,
    originalPrice: null,
    rating: 4.9,
    reviewCount: 156,
    badge: "Limited Cut",
    badgeColor: "bg-rose-500",
    category: "Premium Steaks",
    description:
      "Our 28-day dry-aged T-Bone is a butcher's showstopper. The aging process concentrates flavor and tenderizes the meat to an extraordinary level. Two muscles in one — the strip and the tenderloin — separated by a T-shaped bone.",
    weight: ["400g", "600g"],
    cookingTips:
      "Grill over high heat. 4-5 minutes per side for a perfect medium-rare. Season generously with sea salt.",
    sourcing:
      "Dry-aged in-house for 28 days in our temperature-controlled aging rooms.",
    image:
      "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&q=80",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
    ],
    featured: true,
  },
  {
    id: 4,
    name: "Angus Sirloin",
    slug: "angus-sirloin",
    price: 44.99,
    originalPrice: 54.99,
    rating: 4.7,
    reviewCount: 312,
    badge: "Popular",
    badgeColor: "bg-blue-500",
    category: "Everyday Beef",
    description:
      "Our certified Black Angus Sirloin delivers bold beefy flavor at an incredible value. Perfectly marbled and incredibly versatile — grill it, pan-fry it, or slice it for steak salads.",
    weight: ["250g", "350g", "500g"],
    cookingTips:
      "Marinate overnight for best results. High heat, 3 minutes per side. Rest for 5 minutes.",
    sourcing: "Certified Black Angus, corn-finished for superior marbling.",
    image:
      "https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?w=800&q=80",
    ],
    featured: true,
  },
  {
    id: 5,
    name: "Filet Mignon",
    slug: "filet-mignon",
    price: 79.99,
    originalPrice: null,
    rating: 5.0,
    reviewCount: 98,
    badge: "Chef Choice",
    badgeColor: "bg-amber-500",
    category: "Premium Steaks",
    description:
      "The crown jewel of steakhouse dining. Our Filet Mignon is extraordinarily tender with a mild, delicate flavor. Cut from the small end of the tenderloin, it pairs beautifully with a red wine reduction.",
    weight: ["180g", "250g"],
    cookingTips:
      "Wrap in bacon, sear all sides in a hot oven-safe skillet, then finish in oven at 180°C for 5-8 minutes.",
    sourcing:
      "Hand-selected from the finest tenderloin loins, trimmed to perfection by our master butchers.",
    image:
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80",
    ],
    featured: true,
  },
  {
    id: 6,
    name: "Beef Short Ribs",
    slug: "beef-short-ribs",
    price: 34.99,
    originalPrice: 42.99,
    rating: 4.8,
    reviewCount: 201,
    badge: "Bestseller",
    badgeColor: "bg-emerald-500",
    category: "BBQ Cuts",
    description:
      "Meaty, rich, and deeply flavored — our Beef Short Ribs are a BBQ essential. Slow cook for fall-off-the-bone tenderness or braise them in red wine for an indulgent winter meal.",
    weight: ["500g", "1kg"],
    cookingTips:
      "Low and slow is the way. Apply dry rub, smoke at 120°C for 6-8 hours, or braise at 160°C for 3-4 hours.",
    sourcing:
      "Grass-fed and ethically raised. Cut from the chuck plate for maximum flavor.",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
    ],
    featured: true,
  },
  {
    id: 7,
    name: "Striploin Steak",
    slug: "striploin-steak",
    price: 49.99,
    originalPrice: 59.99,
    rating: 4.7,
    reviewCount: 178,
    badge: "Popular",
    badgeColor: "bg-blue-500",
    category: "Premium Steaks",
    description:
      "A robust, beefy flavor with just enough fat to keep it juicy. Our Striploin Steak is perfect for weeknight grilling without compromising on quality. Bold, satisfying, and reliably delicious.",
    weight: ["250g", "350g"],
    cookingTips:
      "Grill or pan-sear on high heat. 3-4 minutes per side. Let rest and slice against the grain.",
    sourcing: "Prime grain-finished beef, aged 14 days for optimal flavor.",
    image:
      "https://images.unsplash.com/photo-1432139509613-5c4255815697?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1432139509613-5c4255815697?w=800&q=80",
    ],
    featured: false,
  },
  {
    id: 8,
    name: "BBQ Rib Pack",
    slug: "bbq-rib-pack",
    price: 54.99,
    originalPrice: 69.99,
    rating: 4.9,
    reviewCount: 143,
    badge: "Bestseller",
    badgeColor: "bg-emerald-500",
    category: "BBQ Cuts",
    description:
      "Everything you need for the perfect BBQ feast. Our premium Rib Pack includes a full rack of beautifully marbled ribs, ready for your favorite marinade or smoky rub treatment.",
    weight: ["1kg", "1.5kg"],
    cookingTips:
      "Apply mustard as a binder, coat with dry rub, and smoke at 110°C for 5-6 hours using hickory wood.",
    sourcing: "Farm-raised beef, naturally raised without growth hormones.",
    image:
      "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800&q=80",
    ],
    featured: false,
  },
  {
    id: 9,
    name: "Slow Cook Chuck Roast",
    slug: "slow-cook-chuck-roast",
    price: 28.99,
    originalPrice: 35.99,
    rating: 4.6,
    reviewCount: 267,
    badge: "Popular",
    badgeColor: "bg-blue-500",
    category: "Slow Cook Cuts",
    description:
      "The slow cooker's best friend. Our Chuck Roast is perfectly marbled for hours of slow cooking, resulting in fork-tender, melt-in-your-mouth beef that fills your home with incredible aromas.",
    weight: ["500g", "1kg", "1.5kg"],
    cookingTips:
      "Sear on all sides, then slow cook with vegetables and stock for 8 hours on low. Shred and serve.",
    sourcing:
      "Grass-fed beef from free-range farms. Rich in natural collagen for extraordinary texture.",
    image:
      "https://getinspiredeveryday.com/wp-content/uploads/2022/01/Slow-Cooker-Pot-Roast-Get-Inspired-Everyday-4.jpg",
    images: [
      "https://getinspiredeveryday.com/wp-content/uploads/2022/01/Slow-Cooker-Pot-Roast-Get-Inspired-Everyday-4.jpg",
      "https://www.asouthernsoul.com/wp-content/uploads/2023/06/cp-pot-roast-2.jpg",
    ],
    featured: false,
  },
  {
    id: 10,
    name: "Premium Ground Beef",
    slug: "premium-ground-beef",
    price: 18.99,
    originalPrice: null,
    rating: 4.7,
    reviewCount: 423,
    badge: "Everyday",
    badgeColor: "bg-purple-500",
    category: "Everyday Beef",
    description:
      "Freshly ground daily in our butcher shop, our Premium Ground Beef is blended from choice cuts for the perfect fat ratio. Ideal for gourmet burgers, meatballs, Bolognese, and more.",
    weight: ["500g", "1kg"],
    cookingTips:
      "For burgers, form loose patties and season only the exterior. Cook at high heat for crust and juicy interior.",
    sourcing:
      "Freshly ground from shoulder and brisket cuts. 80/20 lean-to-fat ratio.",
    image:
      "https://images.unsplash.com/photo-1606728035253-49e8a23146de?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1606728035253-49e8a23146de?w=800&q=80",
    ],
    featured: false,
  },
  {
    id: 11,
    name: "Brisket Cut",
    slug: "brisket-cut",
    price: 38.99,
    originalPrice: 47.99,
    rating: 4.8,
    reviewCount: 189,
    badge: "Chef Choice",
    badgeColor: "bg-amber-500",
    category: "Slow Cook Cuts",
    description:
      "The king of BBQ. Our premium Brisket is point-and-flat cut for the most flavorful smoking experience. High fat content keeps it moist throughout a long, low cook for that iconic bark and smoke ring.",
    weight: ["1kg", "2kg"],
    cookingTips:
      "Trim fat to ¼ inch, apply salt and pepper rub. Smoke fat side up at 110°C for 12-16 hours.",
    sourcing: "USDA Choice or Prime grade brisket, sourced fresh never frozen.",
    image:
      "https://disheswithdad.com/wp-content/uploads/2025/09/smoked-brisket-flat-02.jpg",
    images: [
      "https://disheswithdad.com/wp-content/uploads/2025/09/smoked-brisket-flat-02.jpg",
    ],
    featured: false,
  },
  {
    id: 12,
    name: "Wagyu Picanha",
    slug: "wagyu-picanha",
    price: 94.99,
    originalPrice: 119.99,
    rating: 4.9,
    reviewCount: 76,
    badge: "Limited Cut",
    badgeColor: "bg-rose-500",
    category: "Wagyu Selection",
    description:
      "A South American gem elevated to Wagyu standards. Our Wagyu Picanha features a thick fat cap that bastes the meat as it cooks, delivering unparalleled richness, tenderness, and beefy flavor in every bite.",
    weight: ["400g", "600g"],
    cookingTips:
      "Score the fat cap, fold into a C-shape, skewer, and grill on high or roast at 220°C until internal temp reaches 55°C.",
    sourcing: "Certified Wagyu cross, aged 21 days for concentrated flavor.",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
    ],
    featured: true,
  },
];

export const categories = [
  {
    id: "premium-steaks",
    name: "Premium Steaks",
    description: "Hand-selected premium cuts",
    image:
      "https://images.unsplash.com/photo-1558030006-450675393462?w=800&q=80",
    color: "from-amber-900/80 to-amber-800/40",
  },
  {
    id: "bbq-cuts",
    name: "BBQ Cuts",
    description: "Perfect for the grill",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
    color: "from-red-900/80 to-red-700/40",
  },
  {
    id: "everyday-beef",
    name: "Everyday Beef",
    description: "Quality cuts for any meal",
    image:
      "https://images.unsplash.com/photo-1606728035253-49e8a23146de?w=800&q=80",
    color: "from-stone-900/80 to-stone-700/40",
  },
  {
    id: "wagyu-selection",
    name: "Wagyu Selection",
    description: "The pinnacle of beef luxury",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
    color: "from-orange-950/80 to-orange-800/40",
  },
  {
    id: "slow-cook-cuts",
    name: "Slow Cook Cuts",
    description: "Low & slow perfection",
    image:
      "https://www.asouthernsoul.com/wp-content/uploads/2023/06/cp-pot-roast-2.jpg",
    color: "from-brown-900/80 to-stone-700/40",
  },
  {
    id: "chef-specials",
    name: "Chef Specials",
    description: "Curated by our master butchers",
    image:
      "https://www.escoffier.edu/wp-content/uploads/2021/12/Male-chef-with-black-bandana-cutting-ingredients-with-a-knife-in-the-kitchen-768.jpg",
    color: "from-zinc-900/80 to-zinc-700/40",
  },
];

export const testimonials = [
  {
    id: 1,
    name: "James Harrington",
    role: "Home Chef",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    rating: 5,
    quote:
      "This steak quality is incredible. I've never cooked a ribeye this good at home. The marbling on the Wagyu is unlike anything I've seen at my local butcher.",
  },
  {
    id: 2,
    name: "Sophia Chen",
    role: "Food Blogger",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    rating: 5,
    quote:
      "Meato has completely changed how I source my meat. The dry-aged T-Bone was an absolute showstopper at my dinner party. Worth every penny.",
  },
  {
    id: 3,
    name: "Marco Rossi",
    role: "BBQ Enthusiast",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    rating: 5,
    quote:
      "The BBQ Rib Pack is my go-to every weekend. The quality is consistently exceptional and the delivery is always fresh. This is the real deal.",
  },
  {
    id: 4,
    name: "Priya Sharma",
    role: "Restaurant Owner",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    rating: 5,
    quote:
      "I use Meato for our restaurant's premium steak nights. The cold chain delivery is impeccable and the cuts arrive in perfect condition every single time.",
  },
];
