import type { Category, Product, Promotion } from "@/lib/types";
import { categoryList } from "@/lib/site";

/**
 * DEMO DATA — not real stock.
 *
 * Every product here is rendered with a visible "DEMO" badge so it can never
 * be mistaken for a live listing. To remove demo data from the site:
 *
 *   1. delete this file, and
 *   2. set NEXT_PUBLIC_DEMO_DATA=false in .env.local
 *
 * Demo content is used only while Supabase is not configured, so a configured
 * but empty database always renders the real empty states.
 */

export const demoProducts: Product[] = [
  {
    id: "demo-acc-0142",
    slug: "rockshox-tubeless-sealant-tape-kit",
    name: "RockShox Tubeless Sealant & Tape Kit",
    sku: "RF-ACC-0142",
    brand: "RockShox",
    description:
      "Sealant, rim tape and valves for converting tubeless-ready rims. 120ml bottle with installation tips.",
    price: 4600,
    compareAtPrice: 5400,
    stock: 18,
    rating: 4.6,
    reviewCount: 12,
    categorySlug: "bicycle-parts",
    categoryName: "Bicycle Parts",
    isDemo: true,
    art: "generic",
  },
  {
    id: "demo-mtb-0311",
    slug: "fox-38-performance-float-160mm-fork",
    name: "Fox 38 Performance Float 160mm Fork",
    sku: "RF-MTB-0311",
    brand: "Fox",
    description:
      "29er suspension fork with Float DPS damping, 110mm 15mm through-axle, tuned for trail and enduro riding.",
    price: 68000,
    compareAtPrice: null,
    stock: 4,
    rating: 4.8,
    reviewCount: 9,
    categorySlug: "mtb-parts",
    categoryName: "MTB Parts",
    isDemo: true,
    art: "fork",
  },
  {
    id: "demo-brk-0077",
    slug: "shimano-br-m6100-hydraulic-disc-brake-set",
    name: "Shimano BR-M6100 Hydraulic Disc Brake Set",
    sku: "RF-BRK-0077",
    brand: "Shimano",
    description:
      "Front and rear hydraulic disc brake set with 180mm rotors, resin pads and mineral oil hose.",
    price: 24000,
    compareAtPrice: 27500,
    stock: 9,
    rating: 4.7,
    reviewCount: 21,
    categorySlug: "brakes",
    categoryName: "Brakes",
    isDemo: true,
    art: "rotor",
  },
  {
    id: "demo-drv-0204",
    slug: "shimano-deore-rd-m6100-rear-derailleur",
    name: "Shimano Deore RD-M6100 Rear Derailleur",
    sku: "RF-DRV-0204",
    brand: "Shimano",
    description:
      "12-speed rear derailleur with Shadow RD clutch, 10-51T cassette support and Hyperglide+ shifting.",
    price: 18500,
    compareAtPrice: 21000,
    stock: 12,
    rating: 4.8,
    reviewCount: 34,
    categorySlug: "drivetrain",
    categoryName: "Drivetrain",
    isDemo: true,
    art: "cassette",
  },
  {
    id: "demo-whl-0455",
    slug: "maxxis-minion-dhf-27-5-x-2-5-tyre",
    name: "Maxxis Minion DHF 27.5 x 2.5 Tyre",
    sku: "RF-WHL-0455",
    brand: "Maxxis",
    description:
      "Dual compound downhill casing with EXO+ protection and stiff, fast-rolling knobs for loose trails.",
    price: 6400,
    compareAtPrice: null,
    stock: 26,
    rating: 4.9,
    reviewCount: 18,
    categorySlug: "wheels-tyres",
    categoryName: "Wheels & Tyres",
    isDemo: true,
    art: "wheel",
  },
  {
    id: "demo-acc-0031",
    slug: "sks-aluminium-bottle-cage",
    name: "SKS Aluminium Bottle Cage",
    sku: "RF-ACC-0031",
    brand: "SKS",
    description:
      "Lightweight 6061 alloy cage, side-load design, fits 750ml bottles and standard bottle bosses.",
    price: 1150,
    compareAtPrice: null,
    stock: 40,
    rating: 4.3,
    reviewCount: 27,
    categorySlug: "accessories",
    categoryName: "Accessories",
    isDemo: true,
    art: "bottle",
  },
  {
    id: "demo-sft-0088",
    slug: "abus-macator-mips-helmet-m",
    name: "Abus Macator MIPS Helmet — Medium",
    sku: "RF-SFT-0088",
    brand: "Abus",
    description:
      "Enduro helmet with MIPS protection, 4-position visor and deep rear coverage for trail riding.",
    price: 5800,
    compareAtPrice: 6500,
    stock: 15,
    rating: 4.6,
    reviewCount: 16,
    categorySlug: "safety-gear",
    categoryName: "Safety Gear",
    isDemo: true,
    art: "helmet",
  },
  {
    id: "demo-tls-0119",
    slug: "torque-wrench-2-40-nm-with-bits",
    name: "Torque Wrench 2–40 Nm with Bit Set",
    sku: "RF-TLS-0119",
    brand: "Precision",
    description:
      "Click-type 1/4\" torque wrench with 19 bits, calibrated for stem, bar and component bolts.",
    price: 3900,
    compareAtPrice: null,
    stock: 7,
    rating: 4.5,
    reviewCount: 11,
    categorySlug: "tools-maintenance",
    categoryName: "Tools & Maintenance",
    isDemo: true,
    art: "wrench",
  },
];

export const demoCategories: Category[] = categoryList.map((category) => ({
  id: `demo-cat-${category.slug}`,
  slug: category.slug,
  name: category.name,
  blurb: category.blurb,
  art: category.art,
  productCount: demoProducts.filter((product) => product.categorySlug === category.slug).length,
}));

export const demoPromotion: Promotion = {
  id: "demo-promo-001",
  title: "End of season service parts — up to 15% off",
  subtitle:
    "Brakes, drivetrain and tyre stock reduced while stocks last. M-Pesa accepted nationwide.",
  code: "RIDEFAR15",
  ctaLabel: "Shop the sale",
  ctaHref: "/shop?sale=true",
  isDemo: true,
};
