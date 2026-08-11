import { tenantConfig } from "@/config/tenant.config";
import { CITY_FORMS, FORM_CATEGORIES, type CityForm } from "./forms";

export const MOST_REQUESTED_SLUGS = tenantConfig.mostRequestedSlugs;

export const POPULAR_SERVICE_SEARCHES = tenantConfig.popularServiceSearches;

export const AUDIENCE_TABS = tenantConfig.audienceTabs;

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
    requirements: form.mode === "requirements" ? "See checklist" : "3+ docs",
    fee: form.mode === "online" ? "Varies" : "See office",
  };
}

export type ServiceSort = "most-used" | "az" | "online";

export function sortForms(forms: CityForm[], sort: ServiceSort): CityForm[] {
  const list = [...forms];
  if (sort === "az") {
    return list.sort((a, b) => a.name.en.localeCompare(b.name.en));
  }
  if (sort === "online") {
    return list.sort((a, b) => {
      const ao = a.mode === "online" ? 0 : 1;
      const bo = b.mode === "online" ? 0 : 1;
      return ao - bo || a.name.en.localeCompare(b.name.en);
    });
  }
  // most-used: prioritize MOST_REQUESTED_SLUGS order, then name
  return list.sort((a, b) => {
    const ai = MOST_REQUESTED_SLUGS.indexOf(a.slug);
    const bi = MOST_REQUESTED_SLUGS.indexOf(b.slug);
    const aRank = ai === -1 ? 999 : ai;
    const bRank = bi === -1 ? 999 : bi;
    return aRank - bRank || a.name.en.localeCompare(b.name.en);
  });
}

export { FORM_CATEGORIES, CITY_FORMS };
