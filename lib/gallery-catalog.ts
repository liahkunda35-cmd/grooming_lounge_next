import type { GalleryCategory, GalleryItem } from "@prisma/client";

export type GalleryCatalogItem = {
  mediaUrl: string;
  caption?: string;
  altText?: string;
  overlayText?: string;
  badgeType?: string | null;
  mediaType?: string;
};

export type GalleryCatalogCategory = {
  slug: string;
  name: string;
  section: "barbershop" | "salon";
  sortOrder: number;
  layout?: string;
  items: GalleryCatalogItem[];
};

export type GalleryCategoryWithItems = GalleryCategory & { items: GalleryItem[] };

/** Default gallery served from /public when the database is unavailable. */
export const GALLERY_CATALOG: GalleryCatalogCategory[] = [
  {
    slug: "adult-haircuts",
    name: "Adult Haircuts",
    section: "barbershop",
    sortOrder: 1,
    items: [
      { mediaUrl: "/haircut.jpeg", caption: "Adult Haircut", altText: "Adult haircut", overlayText: "Classic Cut", badgeType: "logo" },
      { mediaUrl: "/haircut2.jpeg", caption: "Adult Haircut", altText: "Adult haircut style", overlayText: "Styled Cut", badgeType: "logo" },
      { mediaUrl: "/haircut.png", caption: "Adult Haircut", altText: "Premium adult haircut", overlayText: "Premium Cut", badgeType: "logo" },
      { mediaUrl: "/haircut7.jpg", caption: "Adult Haircut", altText: "Adult haircut fade", overlayText: "Clean Fade", badgeType: "inspo" },
      { mediaUrl: "/haircut10.jpg", caption: "Adult Haircut", altText: "Adult haircut style", overlayText: "Sharp Look", badgeType: "inspo" },
      { mediaUrl: "/haircut25.jpg", caption: "Adult Haircut", altText: "Adult haircut", overlayText: "Modern Cut", badgeType: "inspo" },
      { mediaUrl: "/caucasian.jpg", caption: "Caucasian Haircut", altText: "Caucasian haircut", overlayText: "Caucasian Cut" },
      // New adult haircut showcase images
      { mediaUrl: "/haircut_new1.png", caption: "Adult Haircut", altText: "Adult haircut side view", overlayText: "Clean Fade", badgeType: "inspo" },
      { mediaUrl: "/haircut_new2.png", caption: "Adult Haircut", altText: "Adult haircut side profile", overlayText: "Sharp Line-Up", badgeType: "inspo" },
      { mediaUrl: "/haircut_new3.png", caption: "Adult Haircut", altText: "Adult haircut back view", overlayText: "Tapered Neckline", badgeType: "inspo" },
      { mediaUrl: "/haircut_new4.png", caption: "Adult Haircut", altText: "Adult haircut back fade", overlayText: "Smooth Fade", badgeType: "inspo" },
      { mediaUrl: "/haircut_new5.png", caption: "Adult Haircut", altText: "Adult haircut side fade", overlayText: "Fresh Cut", badgeType: "inspo" },
    ],
  },
  {
    slug: "kids-haircuts",
    name: "Kids Haircuts",
    section: "barbershop",
    sortOrder: 2,
    items: [
      { mediaUrl: "/kidcut.jpeg", caption: "Kids Haircut", altText: "Kids haircut", overlayText: "Kids Cut", badgeType: "logo" },
      { mediaUrl: "/kidcut11.jpg", caption: "Kids Haircut", altText: "Kids haircut style", overlayText: "Young Gentleman", badgeType: "inspo" },
      { mediaUrl: "/kidcut12.jpg", caption: "Kids Haircut", altText: "Kids haircut", overlayText: "Kids Style" },
      { mediaUrl: "/kidcut13.jpg", caption: "Kids Haircut", altText: "Kids haircut fade", overlayText: "Kids Fade", badgeType: "logo" },
      { mediaUrl: "/kidcut20.jpeg", caption: "Kids Haircut", altText: "Kids haircut", overlayText: "Fresh Cut", badgeType: "logo" },
    ],
  },
  {
    slug: "womens-cuts",
    name: "Women's Cuts",
    section: "barbershop",
    sortOrder: 3,
    items: [
      { mediaUrl: "/womancut1.jpg", caption: "Women's Cut", altText: "Women's haircut", overlayText: "Women's Style", badgeType: "inspo" },
      { mediaUrl: "/womancut2.jpg", caption: "Women's Cut", altText: "Women's haircut", overlayText: "Elegant Cut", badgeType: "inspo" },
      { mediaUrl: "/womancut4.jpg", caption: "Women's Cut", altText: "Women's haircut", overlayText: "Chic Style", badgeType: "inspo" },
      { mediaUrl: "/womancut5.jpg", caption: "Women's Cut", altText: "Women's haircut", overlayText: "Precision Cut", badgeType: "inspo" },
      { mediaUrl: "/womancut22.jpg", caption: "Women's Cut", altText: "Women's haircut", overlayText: "Women's Cut", badgeType: "inspo" },
      // New women's haircut showcase images
      { mediaUrl: "/womencut_new1.png", caption: "Women's Cut", altText: "Women's blonde tapered cut (back view)", overlayText: "Blonde Taper", badgeType: "inspo" },
      { mediaUrl: "/womencut_new2.png", caption: "Women's Cut", altText: "Women's blonde tapered cut (side view)", overlayText: "Signature Style", badgeType: "inspo" },
    ],
  },
  {
    slug: "beard-trims",
    name: "Beard Trims & Shaving",
    section: "barbershop",
    sortOrder: 4,
    layout: "static",
    items: [
      { mediaUrl: "/bearedtrim.jpg", caption: "Beard Trim & Shape", altText: "Beard trim and shape", overlayText: "Beard Trim", badgeType: "inspo" },
      { mediaUrl: "/cutandbeardtrim.jpg", caption: "Cut & Beard Trim", altText: "Haircut and beard trim", overlayText: "Cut & Beard", badgeType: "inspo" },
    ],
  },
  {
    slug: "hair-coloring",
    name: "Hair Coloring",
    section: "barbershop",
    sortOrder: 5,
    layout: "single",
    items: [
      { mediaUrl: "/1781356260197.jpg", caption: "Hair Coloring", altText: "Hair coloring style", overlayText: "Colour Style" },
    ],
  },
  {
    slug: "braids",
    name: "Braids",
    section: "salon",
    sortOrder: 1,
    items: [
      { mediaUrl: "/braids2.jpeg", caption: "Boho Braids", altText: "Boho braids", overlayText: "Boho Braids", badgeType: "logo" },
      { mediaUrl: "/braids.jpeg", caption: "Fulani Braids", altText: "Fulani braids", overlayText: "Fulani Braids", badgeType: "logo" },
      { mediaUrl: "/braids3.jpeg", caption: "Cornrow Braids", altText: "Cornrow braids", overlayText: "Cornrows", badgeType: "logo" },
      { mediaUrl: "/mukule.jpeg", caption: "Cornrows with Natural Hair", altText: "Cornrows with natural hair", overlayText: "Mukule", badgeType: "logo" },
      { mediaUrl: "/braids4.jpeg", caption: "Copper Boho Braids", altText: "Copper boho braids", overlayText: "Copper Boho", badgeType: "logo" },
      { mediaUrl: "/braids5.jpeg", caption: "Short Boho Braids", altText: "Short boho braids", overlayText: "Short Boho", badgeType: "logo" },
      { mediaUrl: "/braids7.jpeg", caption: "Knotless Curly Ends", altText: "Knotless curly ends", overlayText: "Knotless", badgeType: "logo" },
      { mediaUrl: "/braids9.jpeg", caption: "Feed-in Braids", altText: "Feed-in braids", overlayText: "Feed-in", badgeType: "logo" },
      { mediaUrl: "/braids10.jpeg", caption: "Classic Box Braids", altText: "Classic box braids", overlayText: "Box Braids", badgeType: "logo" },
      { mediaUrl: "/fulani2.jpeg", caption: "Fulani Braids", altText: "Fulani braids style", overlayText: "Fulani", badgeType: "logo" },
      { mediaUrl: "/fulani.jpeg", caption: "Fulani Braids", altText: "Fulani braids", overlayText: "Fulani Style", badgeType: "logo" },
      { mediaUrl: "/stich4.jpeg", caption: "Stitch Braids", altText: "Stitch braids", overlayText: "Stitch Braids", badgeType: "logo" },
      { mediaUrl: "/stitchbraids2.jpeg", caption: "Stitch Braids", altText: "Stitch braids style", overlayText: "Stitch Style", badgeType: "logo" },
      { mediaUrl: "/stitchbraids.jpeg", caption: "Stitch Braids", altText: "Stitch braids", overlayText: "Stitch", badgeType: "logo" },
      { mediaUrl: "/knotless.jpeg", caption: "Knotless Braids", altText: "Knotless braids", overlayText: "Knotless", badgeType: "logo" },
      { mediaUrl: "/hairpeace.jpeg", caption: "Braids with Hair Piece", altText: "Braids with hair piece", overlayText: "Hair Piece", badgeType: "logo" },
    ],
  },
  {
    slug: "natural-hairstyles",
    name: "Natural Hairstyles",
    section: "salon",
    sortOrder: 2,
    items: [
      { mediaUrl: "/twist.jpeg", caption: "Natural Twist", altText: "Natural twist", overlayText: "Natural Twist", badgeType: "logo" },
      { mediaUrl: "/naturaltwist.jpeg", caption: "Natural Twist", altText: "Natural twist style", overlayText: "Twist Out", badgeType: "logo" },
      { mediaUrl: "/gelponytail.jpeg", caption: "Gel Ponytail", altText: "Gel ponytail", overlayText: "Gel Ponytail", badgeType: "logo" },
      { mediaUrl: "/ponytailx.jpg", caption: "Ponytail", altText: "Ponytail hairstyle", overlayText: "Ponytail" },
    ],
  },
  {
    slug: "kids-hairstyles",
    name: "Kids Hairstyles",
    section: "salon",
    sortOrder: 3,
    items: [
      { mediaUrl: "/kidhairstyle.jpeg", caption: "Kids Braids", altText: "Kids braids", overlayText: "Kids Braids", badgeType: "logo" },
      { mediaUrl: "/kidhairstyle2.jpeg", caption: "Kids Braids", altText: "Kids braided style", overlayText: "Kids Style", badgeType: "logo" },
      { mediaUrl: "/kidbraids.jpeg", caption: "Kids Braids", altText: "Kids braids", overlayText: "Kids Braids", badgeType: "logo" },
      { mediaUrl: "/kidbraids1.jpeg", caption: "Kids Braids", altText: "Kids braids style", overlayText: "Kids Braids", badgeType: "logo" },
      { mediaUrl: "/kidstyle3.jpeg", caption: "Kids Braids", altText: "Kids hairstyle", overlayText: "Kids Style", badgeType: "logo" },
      { mediaUrl: "/kidstyle5.jpeg", caption: "Kids Braids", altText: "Kids braided hairstyle", overlayText: "Kids Braids", badgeType: "logo" },
      { mediaUrl: "/kidstyle.jpeg", caption: "Kids Braids", altText: "Kids hairstyle", overlayText: "Kids Look", badgeType: "logo" },
      { mediaUrl: "/kidstyle10.jpeg", caption: "Kids Braids", altText: "Kids braids", overlayText: "Kids Braids", badgeType: "logo" },
    ],
  },
  {
    slug: "nails-manicure",
    name: "Nails & Manicure",
    section: "salon",
    sortOrder: 4,
    items: [
      { mediaUrl: "/goldennails.jpeg", caption: "Chrome Nails", altText: "Chrome gold nails", overlayText: "Chrome Nails", badgeType: "logo" },
      { mediaUrl: "/nails.jpeg", caption: "Chrome Nails", altText: "Nail art", overlayText: "Nail Art", badgeType: "logo" },
      { mediaUrl: "/nails5.jpeg", caption: "Chrome Nails", altText: "Chrome nails", overlayText: "Chrome", badgeType: "logo" },
      { mediaUrl: "/nails3.jpeg", caption: "Chrome Nails", altText: "Nail design", overlayText: "Nail Design", badgeType: "logo" },
      { mediaUrl: "/nails11.png", caption: "Acrylic Nails", altText: "Acrylic nails", overlayText: "Acrylic", badgeType: "logo" },
      { mediaUrl: "/nails12.png", caption: "Gel Nails", altText: "Gel nails", overlayText: "Gel Nails", badgeType: "logo" },
      { mediaUrl: "/nails13.png", caption: "Nail Art", altText: "Nail art design", overlayText: "Nail Art", badgeType: "logo" },
      { mediaUrl: "/nails14.png", caption: "Nail Design", altText: "Nail design", overlayText: "Design", badgeType: "logo" },
    ],
  },
  {
    slug: "pedicure-manicure",
    name: "Pedicure & Manicure",
    section: "salon",
    sortOrder: 5,
    layout: "static",
    items: [
      { mediaUrl: "/pedicurepic.jpeg", caption: "Pedicure", altText: "Pedicure service", overlayText: "Pedicure", badgeType: "logo" },
      { mediaUrl: "/pedicure.mp4", caption: "Pedicure Session", altText: "Pedicure service video", overlayText: "Pedicure Session", badgeType: "logo", mediaType: "video" },
    ],
  },
  {
    slug: "makeup",
    name: "Makeup",
    section: "salon",
    sortOrder: 6,
    items: [
      { mediaUrl: "/makeup.jpeg", caption: "Makeup", altText: "Makeup application", overlayText: "Makeup", badgeType: "logo" },
    ],
  },
  {
    slug: "hair-treatment",
    name: "Hair Treatment",
    section: "salon",
    sortOrder: 7,
    items: [
      { mediaUrl: "/steampod.jpeg", caption: "Steampod Treatment", altText: "Steampod hair treatment", overlayText: "Steampod", badgeType: "logo" },
      { mediaUrl: "/hairtreatment.jpg", caption: "Hair Treatment", altText: "Hair treatment", overlayText: "Hairwash and Massage", badgeType: "logo" },
    ],
  },
  {
    slug: "facial-treatment",
    name: "Facial Treatment",
    section: "salon",
    sortOrder: 8,
    layout: "media",
    items: [
      { mediaUrl: "/facial.mp4", caption: "Facial Treatment", altText: "Facial treatment", overlayText: "Facial Treatment", badgeType: "logo", mediaType: "video" },
    ],
  },
  {
    slug: "wig-installation",
    name: "Wig Installation",
    section: "salon",
    sortOrder: 9,
    layout: "static",
    items: [
      { mediaUrl: "/installation.jpeg", caption: "Wig Installation", altText: "Wig installation", overlayText: "Installation", badgeType: "logo" },
    ],
  },
];

const STATIC_TIMESTAMP = new Date(0);

function buildStaticCategory(category: GalleryCatalogCategory): GalleryCategoryWithItems {
  const categoryId = `catalog-${category.slug}`;

  return {
    id: categoryId,
    slug: category.slug,
    name: category.name,
    section: category.section,
    sortOrder: category.sortOrder,
    layout: category.layout ?? "grid",
    isActive: true,
    createdAt: STATIC_TIMESTAMP,
    updatedAt: STATIC_TIMESTAMP,
    items: category.items.map((item, index) => ({
      id: `${categoryId}-item-${index}`,
      categoryId,
      mediaUrl: item.mediaUrl,
      caption: item.caption ?? null,
      altText: item.altText ?? null,
      overlayText: item.overlayText ?? null,
      badgeType: item.badgeType ?? null,
      mediaType: item.mediaType ?? "image",
      sortOrder: index,
      isActive: true,
      createdAt: STATIC_TIMESTAMP,
      updatedAt: STATIC_TIMESTAMP,
    })),
  };
}

export function getStaticGalleryBySection(section: "barbershop" | "salon"): GalleryCategoryWithItems[] {
  return GALLERY_CATALOG.filter((category) => category.section === section).map(buildStaticCategory);
}
