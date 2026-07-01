import type { FormTemplate } from "./form-fields";
import { tenantConfig } from "@/config/tenant.config";

export type FormMode = "online" | "download" | "requirements";

export interface CityForm {
  id: string;
  slug: string;
  name: { en: string; fil: string };
  description: { en: string; fil: string };
  categoryId: string;
  pdfUrl: string;
  mode: FormMode;
  template?: FormTemplate;
  /** For requirements docs — links to the online application form */
  relatedSlug?: string;
  processingDays?: string;
}

export interface FormCategory {
  id: string;
  name: { en: string; fil: string };
  shortName: string;
  description: { en: string; fil: string };
  icon: string;
  office: { en: string; fil: string };
}

/** Form categories (offices) for the active tenant. */
export const FORM_CATEGORIES: FormCategory[] = tenantConfig.offices;

/** All request/download forms for the active tenant. */
export const CITY_FORMS: CityForm[] = tenantConfig.forms;

export function getFormBySlug(slug: string): CityForm | undefined {
  return CITY_FORMS.find((f) => f.slug === slug);
}

export function getFormsByCategory(categoryId: string): CityForm[] {
  return CITY_FORMS.filter((f) => f.categoryId === categoryId);
}

export function getOnlineForms(): CityForm[] {
  return CITY_FORMS.filter((f) => f.mode === "online");
}

export function getCategoryById(id: string): FormCategory | undefined {
  return FORM_CATEGORIES.find((c) => c.id === id);
}

export function searchForms(query: string): CityForm[] {
  const q = query.toLowerCase().trim();
  if (!q) return CITY_FORMS;
  return CITY_FORMS.filter(
    (f) =>
      f.name.en.toLowerCase().includes(q) ||
      f.name.fil.toLowerCase().includes(q) ||
      f.description.en.toLowerCase().includes(q) ||
      f.categoryId.includes(q)
  );
}
