import { CITY_FORMS, FORM_CATEGORIES, type CityForm } from "./forms";

export const MOST_REQUESTED_SLUGS = [
  "business-permit-application",
  "fire-station-application",
  "birth-certificate-application",
  "building-permit-application",
  "zoning-certification",
];

export const POPULAR_SERVICE_SEARCHES = [
  "Business Permit",
  "Birth Certificate",
  "Building Permit",
  "Fire Safety",
  "Senior Citizen ID",
];

export const AUDIENCE_TABS = [
  {
    id: "citizens",
    label: "For Citizens",
    icon: "users",
    categoryIds: ["ccr", "clo", "pdao"],
  },
  {
    id: "businesses",
    label: "For Businesses",
    icon: "briefcase",
    categoryIds: ["bplo"],
  },
  {
    id: "construction",
    label: "Construction",
    icon: "building-2",
    categoryIds: ["obo", "cpdo"],
  },
  {
    id: "seniors",
    label: "Senior Citizens",
    icon: "heart-handshake",
    categoryIds: ["osca"],
  },
  {
    id: "safety",
    label: "Fire & Safety",
    icon: "flame",
    categoryIds: ["bfp"],
  },
] as const;

export type AudienceTabId = (typeof AUDIENCE_TABS)[number]["id"];

export function getMostRequestedForms(): CityForm[] {
  return MOST_REQUESTED_SLUGS.map((slug) => CITY_FORMS.find((f) => f.slug === slug)).filter(
    (f): f is CityForm => Boolean(f)
  );
}

export function getFormsForAudience(audienceId: AudienceTabId): CityForm[] {
  const tab = AUDIENCE_TABS.find((t) => t.id === audienceId);
  if (!tab) return [];
  const ids = tab.categoryIds as readonly string[];
  return CITY_FORMS.filter((f) => ids.includes(f.categoryId) && f.mode !== "requirements");
}

export function getFormMeta(form: CityForm) {
  return {
    processingTime: form.processingDays ?? "Varies",
    requirements: form.mode === "requirements" ? "See checklist" : "3+ Documents",
    fee: form.mode === "online" ? "Varies" : "See office",
  };
}

export { FORM_CATEGORIES, CITY_FORMS };
