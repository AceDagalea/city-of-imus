import type { FormTemplate } from "./form-fields";
import type { FormCategory } from "./forms";
import { t } from "./i18n";

export interface FormHelpContact {
  phone?: string;
  email?: string;
  liveChat?: string;
}

const TEMPLATE_REQUIREMENTS: Partial<Record<FormTemplate, string[]>> = {
  osca: [
    "PSA Birth Certificate",
    "Valid Government ID",
    "Barangay Certificate (Residency)",
  ],
  pdao: [
    "Medical Certificate",
    "Valid Government ID",
    "2×2 ID Photo",
    "Barangay Certificate",
  ],
  "civil-registry": [
    "Valid Government ID",
    "Authorization Letter (if applying for another person)",
  ],
  "business-permit": [
    "DTI/SEC Registration",
    "Barangay Clearance",
    "Valid Government ID",
  ],
  "building-permit": [
    "Signed & Sealed Building Plans",
    "Lot Title / Tax Declaration",
    "Valid Government ID",
  ],
  "fire-safety": ["Valid Government ID", "Floor Plan / Building Details"],
  zoning: ["Lot Title / Tax Declaration", "Site Plan", "Valid Government ID"],
  affidavit: ["Valid Government ID"],
  "legal-document": ["Valid Government ID", "Supporting Documents"],
  "ancillary-permit": ["Building Permit", "Valid Government ID"],
};

const TEMPLATE_FEES: Partial<Record<FormTemplate, string>> = {
  osca: "Free of Charge",
  pdao: "Free of Charge",
  affidavit: "Varies",
  "civil-registry": "Varies (see Civil Registry office)",
};

const CATEGORY_HELP: Record<string, FormHelpContact> = {
  osca: { phone: "(046) 471-0664 loc. 246", email: "osca@cityofimus.gov.ph", liveChat: "/contact" },
  pdao: { phone: "(046) 888 9910", email: "cityofimus@cavite.gov.ph", liveChat: "/contact" },
  ccr: { phone: "(046) 888 9910", email: "cityofimus@cavite.gov.ph", liveChat: "/contact" },
  bplo: { phone: "(046) 888 9910", email: "cityofimus@cavite.gov.ph", liveChat: "/contact" },
  obo: { phone: "(046) 888 9910", email: "cityofimus@cavite.gov.ph", liveChat: "/contact" },
  cpdo: { phone: "(046) 888 9910", email: "cityofimus@cavite.gov.ph", liveChat: "/contact" },
  bfp: { phone: "(046) 888 9911", email: "cityofimus@cavite.gov.ph", liveChat: "/contact" },
  clo: { phone: "(046) 888 9910", email: "cityofimus@cavite.gov.ph", liveChat: "/contact" },
};

export function getFormRequirements(template?: FormTemplate, categoryId?: string): string[] {
  if (template && TEMPLATE_REQUIREMENTS[template]) {
    return TEMPLATE_REQUIREMENTS[template]!;
  }
  return ["Valid Government ID", "Supporting Documents (as applicable)"];
}

export function getFormFee(template?: FormTemplate): string {
  if (template && TEMPLATE_FEES[template]) return TEMPLATE_FEES[template]!;
  return "Varies";
}

export function getFormHelp(categoryId: string): FormHelpContact {
  return CATEGORY_HELP[categoryId] ?? {
    phone: "(046) 888 9910",
    email: "cityofimus@cavite.gov.ph",
    liveChat: "/contact",
  };
}

export function getOfficeName(category: FormCategory | undefined): string {
  if (!category) return "City Government of Imus";
  return t(category.office);
}
