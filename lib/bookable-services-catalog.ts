/** Full editable price catalog — seeded into BookableService for admin + public lists. */

export type PriceCatalogEntry = {
  category: "barber" | "hairdresser";
  group: string;
  name: string;
  /** Single Kwacha amount, or null when using priceText */
  price: number | null;
  /** Used for ranges like "K400 & K450" */
  priceText?: string;
};

export const BARBER_PRICE_CATALOG: PriceCatalogEntry[] = [
  { category: "barber", group: "Haircuts", name: "Haircut (Adults)", price: 130 },
  { category: "barber", group: "Haircuts", name: "Children (Under 13)", price: 80 },
  { category: "barber", group: "Haircuts", name: "Caucasian Haircut", price: 250 },
  { category: "barber", group: "Haircuts", name: "Children Haircut + Black Dye", price: 150 },
  { category: "barber", group: "Shaving & Lining", name: "Shave", price: 60 },
  { category: "barber", group: "Shaving & Lining", name: "Lining Only", price: 40 },
  { category: "barber", group: "Shaving & Lining", name: "Lining and Dye", price: 70 },
  { category: "barber", group: "Shaving & Lining", name: "Beard Trim & Shape", price: 70 },
  { category: "barber", group: "Shaving & Lining", name: "Cut & Beard Trim", price: 180 },
  { category: "barber", group: "Colour & Dye", name: "Haircut + Blonde Dye", price: 300 },
  { category: "barber", group: "Colour & Dye", name: "Haircut + Black Dye", price: 180 },
  { category: "barber", group: "Colour & Dye", name: "Haircut + Magic Powder", price: 230 },
  { category: "barber", group: "Colour & Dye", name: "Magic Powder", price: 150 },
  { category: "barber", group: "Colour & Dye", name: "Hair Coloring / Dye", price: 150 },
  { category: "barber", group: "Treatments & Extras", name: "S Curl", price: 200 },
  { category: "barber", group: "Treatments & Extras", name: "Facial Scrub", price: 150 },
  { category: "barber", group: "Treatments & Extras", name: "Neck Massage", price: 150 },
];

export const SALON_PRICE_CATALOG: PriceCatalogEntry[] = [
  { category: "hairdresser", group: "Goddess Braids", name: "Small", price: 450 },
  { category: "hairdresser", group: "Goddess Braids", name: "Medium", price: 380 },
  { category: "hairdresser", group: "Goddess Braids", name: "Big", price: 300 },
  { category: "hairdresser", group: "Knotless Braids", name: "Small", price: 400 },
  { category: "hairdresser", group: "Knotless Braids", name: "Medium", price: 350 },
  { category: "hairdresser", group: "Knotless Braids", name: "Big", price: 300 },
  { category: "hairdresser", group: "Fox Locks", name: "Fox Locks", price: null, priceText: "K400 & K450" },
  { category: "hairdresser", group: "Twist Knotless", name: "Small", price: 400 },
  { category: "hairdresser", group: "Twist Knotless", name: "Medium", price: 350 },
  { category: "hairdresser", group: "Twist Knotless", name: "Big", price: 300 },
  { category: "hairdresser", group: "Box Braids", name: "Small", price: 350 },
  { category: "hairdresser", group: "Box Braids", name: "Medium", price: 300 },
  { category: "hairdresser", group: "Box Braids", name: "Big", price: 250 },
  { category: "hairdresser", group: "Cornrows — Fishtail Mukule", name: "Small", price: 350 },
  { category: "hairdresser", group: "Cornrows — Fishtail Mukule", name: "Medium", price: 300 },
  { category: "hairdresser", group: "Cornrows — Fishtail Mukule", name: "Big", price: 250 },
  { category: "hairdresser", group: "Butterfly Braids", name: "Small", price: 450 },
  { category: "hairdresser", group: "Butterfly Braids", name: "Medium", price: 400 },
  { category: "hairdresser", group: "Butterfly Braids", name: "Big", price: 350 },
  { category: "hairdresser", group: "Crochet", name: "Crochet", price: null, priceText: "K350 & K300" },
  { category: "hairdresser", group: "Crochet", name: "Pick and Drop", price: 400 },
  { category: "hairdresser", group: "Passion Twist", name: "Small", price: 450 },
  { category: "hairdresser", group: "Passion Twist", name: "Medium", price: 350 },
  { category: "hairdresser", group: "Passion Twist", name: "Big", price: 300 },
  { category: "hairdresser", group: "Fishtail with Braids", name: "Small", price: 380 },
  { category: "hairdresser", group: "Fishtail with Braids", name: "Medium", price: 300 },
  { category: "hairdresser", group: "Fishtail with Braids", name: "Big", price: 250 },
  { category: "hairdresser", group: "Plain Mukule & More", name: "Plain Mukule — Small", price: 180 },
  { category: "hairdresser", group: "Plain Mukule & More", name: "Plain Mukule — Medium", price: 150 },
  { category: "hairdresser", group: "Plain Mukule & More", name: "Cornrows with Wig", price: 200 },
  { category: "hairdresser", group: "Plain Mukule & More", name: "Twin Braids", price: 200 },
  { category: "hairdresser", group: "Plain Mukule & More", name: "Natural Twist", price: 250 },
  { category: "hairdresser", group: "Plain Mukule & More", name: "Retouch", price: 300 },
  { category: "hairdresser", group: "Plain Mukule & More", name: "Bone Straight", price: 600 },
  { category: "hairdresser", group: "Plain Mukule & More", name: "Draids Start", price: 250 },
  { category: "hairdresser", group: "Plain Mukule & More", name: "Retouch (Alt)", price: 200 },
  { category: "hairdresser", group: "Plain Mukule & More", name: "Children Knotless", price: 300 },
  { category: "hairdresser", group: "Plain Mukule & More", name: "Mukule", price: null, priceText: "K150 & K180" },
  { category: "hairdresser", group: "Plain Mukule & More", name: "Mukule with Wig", price: null, priceText: "K250 & K300" },
  { category: "hairdresser", group: "Hair Relaxer", name: "Dark and Lovely", price: 350 },
  { category: "hairdresser", group: "Hair Relaxer", name: "Olive Oil", price: 350 },
  { category: "hairdresser", group: "Hair Relaxer", name: "Beautiful Beginning", price: 350 },
  { category: "hairdresser", group: "Hair Relaxer", name: "Easy Wave", price: 250 },
  { category: "hairdresser", group: "Hair Relaxer", name: "Labour", price: 200 },
  { category: "hairdresser", group: "Hair Relaxer", name: "Wash and Set", price: 150 },
  { category: "hairdresser", group: "Hair Relaxer", name: "Wash and Blow", price: 100 },
  { category: "hairdresser", group: "Hair Relaxer", name: "Dye", price: null, priceText: "K150, K250 & K300" },
  { category: "hairdresser", group: "Hair Treatment", name: "Collateral", price: 250 },
  { category: "hairdresser", group: "Hair Treatment", name: "Hair Mayonnaise", price: 250 },
  { category: "hairdresser", group: "Hair Treatment", name: "Silk Press", price: 300 },
  { category: "hairdresser", group: "Weaving & Styling", name: "Open Weave", price: 300 },
  { category: "hairdresser", group: "Weaving & Styling", name: "Closed Weave", price: 300 },
  { category: "hairdresser", group: "Weaving & Styling", name: "Weave with Closure", price: 350 },
  { category: "hairdresser", group: "Weaving & Styling", name: "Razor Cut with Closure", price: 350 },
  { category: "hairdresser", group: "Weaving & Styling", name: "Wig Making", price: 350 },
  { category: "hairdresser", group: "Weaving & Styling", name: "Wig Blowing", price: 130 },
  { category: "hairdresser", group: "Weaving & Styling", name: "Wig Wash & Steampod", price: 250 },
  { category: "hairdresser", group: "Weaving & Styling", name: "Steampod Only", price: null, priceText: "K200 & K150" },
  { category: "hairdresser", group: "Weaving & Styling", name: "Gel Puff", price: null, priceText: "K250 & K200" },
  { category: "hairdresser", group: "Weaving & Styling", name: "Razor Cut", price: 300 },
  { category: "hairdresser", group: "Weaving & Styling", name: "Installation", price: null, priceText: "K350 & K300" },
  { category: "hairdresser", group: "Makeup & Lashes", name: "Makeup with Lash Extension", price: 350 },
  { category: "hairdresser", group: "Makeup & Lashes", name: "Makeup without Lash Extension", price: 300 },
  { category: "hairdresser", group: "Makeup & Lashes", name: "Classic Lashes", price: 300 },
  { category: "hairdresser", group: "Makeup & Lashes", name: "Hybrid Lashes", price: 350 },
  { category: "hairdresser", group: "Makeup & Lashes", name: "Mega Volume Lashes", price: 400 },
  { category: "hairdresser", group: "Makeup & Lashes", name: "Eyebrows Threading", price: 100 },
  { category: "hairdresser", group: "Makeup & Lashes", name: "Eyebrow Tweezing", price: 40 },
  { category: "hairdresser", group: "Nails & Pedicure", name: "Stick-on", price: 300 },
  { category: "hairdresser", group: "Nails & Pedicure", name: "Acrylic", price: 400 },
  { category: "hairdresser", group: "Nails & Pedicure", name: "Rubber Gel", price: 380 },
  { category: "hairdresser", group: "Nails & Pedicure", name: "Polly Gel", price: 380 },
  { category: "hairdresser", group: "Nails & Pedicure", name: "Gel Paint", price: 200 },
  { category: "hairdresser", group: "Nails & Pedicure", name: "Rubber Gel on Natural Nails", price: 300 },
  { category: "hairdresser", group: "Nails & Pedicure", name: "Polly Gel on Natural Nails", price: 300 },
  { category: "hairdresser", group: "Nails & Pedicure", name: "Toe Nails", price: 250 },
  { category: "hairdresser", group: "Nails & Pedicure", name: "Pedicure & Manicure", price: 450 },
  { category: "hairdresser", group: "Nails & Pedicure", name: "Pedicure Only", price: 400 },
  { category: "hairdresser", group: "Nails & Pedicure", name: "Sock Off", price: 80 },
  { category: "hairdresser", group: "Nails & Pedicure", name: "Nail Refill", price: 300 },
  { category: "hairdresser", group: "Nails & Pedicure", name: "Manicure", price: 100 },
  { category: "hairdresser", group: "Nails & Pedicure", name: "Stick-on's", price: 250 },
  { category: "hairdresser", group: "Nails & Pedicure", name: "Rubber Gel (Alt)", price: 280 },
  { category: "hairdresser", group: "Nails & Pedicure", name: "Polly Gel (Alt)", price: 280 },
];

export const PRICE_CATALOG = [...BARBER_PRICE_CATALOG, ...SALON_PRICE_CATALOG];

/** Legacy booking labels (kept for booking fallbacks). */
export const BARBER_SERVICE_LABELS = BARBER_PRICE_CATALOG.map((entry) =>
  entry.price != null ? `${entry.name} — K${entry.price}` : `${entry.name} — ${entry.priceText ?? ""}`,
);

export const SALON_SERVICE_LABELS = SALON_PRICE_CATALOG.map((entry) =>
  entry.price != null ? `${entry.name} — K${entry.price}` : `${entry.name} — ${entry.priceText ?? ""}`,
);
