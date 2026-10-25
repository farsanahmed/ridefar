/**
 * Brand constants. Single source of truth for contact details and navigation.
 * Anything user-facing that repeats across the site lives here.
 */

export const site = {
  name: "RIDEFAR",
  legalName: "RIDEFAR",
  tagline: "RIDE FURTHER. RIDE BETTER.",
  description:
    "Bicycle parts and accessories for Kenya. Delivery across Kenya. M-Pesa payments accepted.",
  phone: "+254 731 480 504",
  phoneHref: "tel:+254731480504",
  whatsappHref: "https://wa.me/254731480504",
  email: "ridefar.ke@gmail.com",
  instagram: "https://instagram.com/ridefar.ke",
  tiktok: "https://tiktok.com/@ridefar.ke",
  socialHandle: "@ridefar.ke",
  address: {
    line1: "Mavueni",
    line2: "Kilifi",
    country: "Kenya",
  },
  currency: "KSh",
  currencyCode: "KES",
} as const;

export type NavItem = {
  href: string;
  label: string;
  icon: "home" | "shop" | "wishlist" | "orders" | "account";
};

/** Mobile bottom navigation — 5 items, fixed to the bottom of the viewport. */
export const bottomNav: NavItem[] = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/shop", label: "Shop", icon: "shop" },
  { href: "/wishlist", label: "Wishlist", icon: "wishlist" },
  { href: "/orders", label: "Orders", icon: "orders" },
  { href: "/account", label: "Account", icon: "account" },
];

/** Desktop header navigation. */
export const topNav: { href: string; label: string }[] = [
  { href: "/shop", label: "Shop" },
  { href: "/shop?category=mtb-parts", label: "MTB" },
  { href: "/shop?category=brakes", label: "Brakes" },
  { href: "/shop?category=safety-gear", label: "Safety" },
  { href: "/shop?category=tools-maintenance", label: "Tools" },
  { href: "/#why-ridefar", label: "Why RIDEFAR" },
];

export type CategorySlug =
  | "bicycle-parts"
  | "mtb-parts"
  | "brakes"
  | "drivetrain"
  | "wheels-tyres"
  | "accessories"
  | "safety-gear"
  | "tools-maintenance";

/**
 * The eight shop categories. The database is the source of truth for products;
 * this list drives the homepage grid and the shop filters, and it is the seed
 * reference for the `categories` table created in Phase 2.
 */
export const categoryList: {
  slug: CategorySlug;
  name: string;
  blurb: string;
  art: ArtKind;
}[] = [
  {
    slug: "bicycle-parts",
    name: "Bicycle Parts",
    blurb: "Brakes, hubs, cables and fittings for road and commuter bikes.",
    art: "chainring",
  },
  {
    slug: "mtb-parts",
    name: "MTB Parts",
    blurb: "Forks, shocks, cranks and kit built for trails and dust.",
    art: "fork",
  },
  {
    slug: "brakes",
    name: "Brakes",
    blurb: "Disc rotors, pads, levers and hydraulic overhaul kits.",
    art: "rotor",
  },
  {
    slug: "drivetrain",
    name: "Drivetrain",
    blurb: "Chainrings, cassettes, derailleurs and chain spares.",
    art: "cassette",
  },
  {
    slug: "wheels-tyres",
    name: "Wheels & Tyres",
    blurb: "Rims, spokes, inner tubes and tubeless setups.",
    art: "wheel",
  },
  {
    slug: "accessories",
    name: "Accessories",
    blurb: "Bottles, bags, pumps, racks and riding essentials.",
    art: "bottle",
  },
  {
    slug: "safety-gear",
    name: "Safety Gear",
    blurb: "Helmets, lights, reflective kit and gloves.",
    art: "helmet",
  },
  {
    slug: "tools-maintenance",
    name: "Tools & Maintenance",
    blurb: "Torque tools, chain tools, lubes and workshop supplies.",
    art: "wrench",
  },
];

/**
 * Technical line-art used for category and product artwork.
 */
export type ArtKind =
  | "chainring"
  | "fork"
  | "rotor"
  | "cassette"
  | "wheel"
  | "bottle"
  | "helmet"
  | "wrench"
  | "generic";

export const policies = [
  { slug: "terms", title: "Terms & Conditions" },
  { slug: "privacy", title: "Privacy Policy" },
  { slug: "shipping", title: "Shipping & Delivery" },
  { slug: "returns", title: "Returns & Refunds" },
  { slug: "faq", title: "FAQ" },
] as const;
