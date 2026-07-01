import type { TenantConfig } from "@/config/tenant.schema";
import type { CityForm, FormCategory } from "@/lib/forms";

/**
 * ============================================================================
 * NEW LGU STARTER CONFIG
 * ============================================================================
 * Copy this file to `config/tenants/<your-lgu-slug>.config.ts`, fill in every
 * value below, then register it in `config/tenant.config.ts` and deploy with
 * `TENANT=<your-lgu-slug>`.
 *
 * Every field is required unless its type says `?` (optional). The config is
 * validated at startup against `config/tenant.schema.ts` — the app will refuse
 * to boot with a clear error if anything required is missing.
 *
 * Placeholders use "[LGU ...]" / "" / [] — replace them all.
 * ============================================================================
 */

// Offices == the departments that own request forms (was FORM_CATEGORIES).
// One entry per office; `id` is referenced by each form's `categoryId`.
const offices: FormCategory[] = [
  // {
  //   id: "bplo",
  //   name: { en: "Business Permits & Licensing", fil: "..." },
  //   shortName: "BPLO",
  //   description: { en: "...", fil: "..." },
  //   icon: "briefcase",              // lucide-react icon name
  //   office: { en: "Business Permits and Licensing Office (BPLO)", fil: "..." },
  // },
];

// Forms == every downloadable/online request (was CITY_FORMS).
// `categoryId` must match an office `id` above. `mode`: "online" | "download"
// | "requirements". `template` is only needed for "online" forms.
const forms: CityForm[] = [
  // {
  //   id: "bplo-unified",
  //   slug: "business-permit-application",
  //   name: { en: "Unified Business Permit Application", fil: "..." },
  //   description: { en: "...", fil: "..." },
  //   categoryId: "bplo",
  //   pdfUrl: "https://.../form.pdf",
  //   mode: "online",
  //   template: "business-permit",
  //   processingDays: "3–5 business days",
  // },
];

export const templateConfig = {
  // ── Identity ──────────────────────────────────────────────────────────
  lguType: "city", // "city" | "municipality" | "province"
  lguName: { en: "[LGU NAME]", fil: "[LGU NAME]" },
  province: "[PROVINCE]",
  region: "[REGION]",
  psgcCode: "", // PH Standard Geographic Code
  motto: { en: "", fil: "" },

  // ── Feature flags — turn off modules this LGU doesn't use ──────────────
  modules: {
    fullDisclosure: true,
    tourism: false,
    banaag: false,
    gadDatabase: false,
    jobPortal: false,
  },

  // ── Branding — local colors/logos layered over the national design system
  brand: {
    primary: "#000000", // local primary accent (drives buttons/links/cards)
    secondary: "#000000",
    accent: "#000000",
    logoUrl: "/images/lgu-logo.png", // local asset under /public
    logoRemoteUrl: "", // optional remote logo URL
    sealUrl: "", // official LGU seal
    colors: {
      navy: "#000000",
      green: "#000000",
      red: "#000000",
      accent: "#000000",
    },
  },

  // ── Leadership ────────────────────────────────────────────────────────
  executive: {
    title: { en: "City Mayor", fil: "Punong Lungsod" },
    name: "[EXECUTIVE NAME]",
    photoUrl: "",
  },

  // ── Contact / office info ─────────────────────────────────────────────
  contact: {
    address: "",
    hours: "",
    mainLines: [],
    emergency: "",
    facebook: "",
    facebookTourism: "",
    youtubeId: "",
    eboss: "", // online business one-stop-shop portal URL, if any
    email: "",
    twitter: "",
  },

  // ── Site-wide media / embeds ──────────────────────────────────────────
  siteUrl: "",
  foiUrl: "https://www.foi.gov.ph", // national FOI portal; override only if the LGU has its own
  mapEmbedUrl: "", // Google Maps embed URL for the city hall
  hero: {
    imageUrl: "",
    videoUrl: "",
    fallbackUrl: "",
    tagline: { en: "", fil: "" },
    subtitle: { en: "", fil: "" },
  },

  // ── Navigation & footer chrome ────────────────────────────────────────
  navItems: [],
  footerColumns: {
    government: { title: { en: "Government", fil: "Pamahalaan" }, links: [] },
    transparency: { title: { en: "Transparency", fil: "Transparency" }, links: [] },
    resources: { title: { en: "Resources", fil: "Resources" }, links: [] },
  },
  quickAccess: [],
  popularSearches: [],

  // ── Homepage content ──────────────────────────────────────────────────
  cityStats: [],
  landmarks: [],
  announcements: [],
  newsItems: [],
  upcomingEvents: [],
  hotlines: [],
  serviceAudiences: [],
  serviceCategories: [],

  // ── Services / requests module ────────────────────────────────────────
  offices,
  forms,

  // ── Digital-services page config ──────────────────────────────────────
  mostRequestedSlugs: [], // form slugs to feature on the services landing page
  popularServiceSearches: [], // quick-search chip labels
  audienceTabs: [] as const, // audience filters; each maps to office ids
} satisfies TenantConfig;
