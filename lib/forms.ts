import type { FormTemplate } from "./form-fields";

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

export const FORM_CATEGORIES: FormCategory[] = [
  {
    id: "bfp",
    name: { en: "Bureau of Fire Protection", fil: "Bureau of Fire Protection" },
    shortName: "BFP",
    description: {
      en: "Fire safety evaluation and fire station applications.",
      fil: "Fire safety evaluation at fire station applications.",
    },
    icon: "flame",
    office: { en: "Bureau of Fire Protection (BFP)", fil: "Bureau of Fire Protection (BFP)" },
  },
  {
    id: "bplo",
    name: { en: "Business Permits & Licensing", fil: "Business Permits at Licensing" },
    shortName: "BPLO",
    description: {
      en: "Business permit applications, renewals, and amendments.",
      fil: "Mga aplikasyon, renewal, at amendment ng business permit.",
    },
    icon: "briefcase",
    office: { en: "Business Permits and Licensing Office (BPLO)", fil: "Business Permits and Licensing Office (BPLO)" },
  },
  {
    id: "ccr",
    name: { en: "City Civil Registry", fil: "City Civil Registry" },
    shortName: "CCR",
    description: {
      en: "Birth, death, marriage certificates, CENOMAR, and civil registry services.",
      fil: "Birth, death, marriage certificates, CENOMAR, at civil registry services.",
    },
    icon: "file-text",
    office: { en: "City Civil Registry (CCR)", fil: "City Civil Registry (CCR)" },
  },
  {
    id: "clo",
    name: { en: "City Legal Office", fil: "City Legal Office" },
    shortName: "CLO",
    description: {
      en: "Affidavits, contracts, and legal document requests.",
      fil: "Mga affidavit, kontrata, at legal document requests.",
    },
    icon: "scale",
    office: { en: "City Legal Office (CLO)", fil: "City Legal Office (CLO)" },
  },
  {
    id: "cpdo",
    name: { en: "City Planning & Development", fil: "City Planning at Development" },
    shortName: "CPDO",
    description: {
      en: "Zoning certifications, subdivision approvals, and land use applications.",
      fil: "Zoning certifications, subdivision approvals, at land use applications.",
    },
    icon: "map",
    office: { en: "City Planning and Development Office (CPDO)", fil: "City Planning and Development Office (CPDO)" },
  },
  {
    id: "obo",
    name: { en: "Building Official", fil: "Building Official" },
    shortName: "OBO",
    description: {
      en: "Building permits, occupancy certificates, and ancillary construction permits.",
      fil: "Building permits, occupancy certificates, at ancillary construction permits.",
    },
    icon: "building-2",
    office: { en: "Office of Building Official (OBO)", fil: "Office of Building Official (OBO)" },
  },
  {
    id: "osca",
    name: { en: "Senior Citizens Affairs", fil: "Senior Citizens Affairs" },
    shortName: "OSCA",
    description: {
      en: "Senior citizen ID and benefits registration.",
      fil: "Senior citizen ID at benefits registration.",
    },
    icon: "heart-handshake",
    office: { en: "Office of Senior Citizen Affairs (OSCA)", fil: "Office of Senior Citizen Affairs (OSCA)" },
  },
  {
    id: "pdao",
    name: { en: "Disability Affairs", fil: "Disability Affairs" },
    shortName: "PDAO",
    description: {
      en: "Persons with disability ID registration and assistance programs.",
      fil: "PWD ID registration at assistance programs.",
    },
    icon: "accessibility",
    office: { en: "Persons with Disability Affairs Office (PDAO)", fil: "Persons with Disability Affairs Office (PDAO)" },
  },
];

const PDF = "https://www.cityofimus.gov.ph/docs/Downloadable%20Forms";

export const CITY_FORMS: CityForm[] = [
  // BFP
  {
    id: "bfp-fire-station",
    slug: "fire-station-application",
    name: { en: "Fire Station Application Form", fil: "Fire Station Application Form" },
    description: {
      en: "Apply for fire safety evaluation clearance and fire station services.",
      fil: "Mag-apply para sa fire safety evaluation clearance.",
    },
    categoryId: "bfp",
    pdfUrl: `${PDF}/Fire-Station-Application-Form-with-Claim-Stub.pdf`,
    mode: "online",
    template: "fire-safety",
    processingDays: "5–10 business days",
  },

  // BPLO
  {
    id: "bplo-unified",
    slug: "business-permit-application",
    name: { en: "Unified Business Permit Application", fil: "Unified Business Permit Application" },
    description: {
      en: "Apply for a new business permit, renewal, or amendment online.",
      fil: "Mag-apply ng bagong business permit, renewal, o amendment online.",
    },
    categoryId: "bplo",
    pdfUrl: `${PDF}/BPLO_requirements/UNIFIED%20APPLICATION%20FORM%20FOR%20BUSINESS%20PERMIT_20250731.pdf`,
    mode: "online",
    template: "business-permit",
    processingDays: "3–5 business days",
  },
  {
    id: "bplo-req-new",
    slug: "requirements-new-business-permit",
    name: { en: "Requirements — New Business Permit", fil: "Requirements — Bagong Business Permit" },
    description: { en: "Checklist of documents for new business permit applications.", fil: "Checklist ng mga dokumento para sa bagong business permit." },
    categoryId: "bplo",
    pdfUrl: `${PDF}/BPLO_requirements/CHECKLIST%20OF%20REQUIREMENTS_%20NEW%2020250731.pdf`,
    mode: "requirements",
    relatedSlug: "business-permit-application",
  },
  {
    id: "bplo-req-renew",
    slug: "requirements-renew-business-permit",
    name: { en: "Requirements — Business Permit Renewal", fil: "Requirements — Renewal ng Business Permit" },
    description: { en: "Checklist of documents for business permit renewal.", fil: "Checklist ng mga dokumento para sa renewal." },
    categoryId: "bplo",
    pdfUrl: `${PDF}/BPLO_requirements/CHECKLIST%20OF%20REQUIREMENTS_RENEW%2020250731.pdf`,
    mode: "requirements",
    relatedSlug: "business-permit-application",
  },
  {
    id: "bplo-req-amend",
    slug: "requirements-amendment-business-permit",
    name: { en: "Requirements — Amendment of Business Permit", fil: "Requirements — Amendment ng Business Permit" },
    description: { en: "Checklist for amending an existing business permit.", fil: "Checklist para sa amendment ng business permit." },
    categoryId: "bplo",
    pdfUrl: `${PDF}/BPLO_Requirements_for_Amendment_of_Business_Permit_2023.pdf`,
    mode: "requirements",
    relatedSlug: "business-permit-application",
  },
  {
    id: "bplo-unified-back",
    slug: "business-permit-form-back",
    name: { en: "Business Permit Form (Back Page)", fil: "Business Permit Form (Back Page)" },
    description: { en: "Back page of the unified business permit application form.", fil: "Back page ng unified business permit form." },
    categoryId: "bplo",
    pdfUrl: `${PDF}/BPLO_requirements/UNIFIED%20APPLICATION%20FORM%20FOR%20NEW%20BUSINESS%20PERMIT_Back%2020230503REVISED.pdf`,
    mode: "download",
    relatedSlug: "business-permit-application",
  },

  // CCR
  {
    id: "ccr-civil-registry",
    slug: "civil-registry-application",
    name: { en: "Civil Registry Document Request", fil: "Civil Registry Document Request" },
    description: {
      en: "Request birth, death, marriage certificates, CENOMAR, late registration, or marriage license.",
      fil: "Humiling ng birth, death, marriage certificates, CENOMAR, late registration, o marriage license.",
    },
    categoryId: "ccr",
    pdfUrl: `${PDF}/NSO-Application-of-Birth.pdf`,
    mode: "online",
    template: "civil-registry",
    processingDays: "3–7 business days",
  },
  {
    id: "ccr-late-reg",
    slug: "late-registration",
    name: { en: "Application for Late Registration", fil: "Application for Late Registration" },
    description: { en: "Register a delayed birth, marriage, or death record.", fil: "Magparehistro ng naantalang birth, marriage, o death record." },
    categoryId: "ccr",
    pdfUrl: `${PDF}/Application-for-Late-Registration.pdf`,
    mode: "online",
    template: "civil-registry",
    relatedSlug: "civil-registry-application",
  },
  {
    id: "ccr-marriage-license",
    slug: "marriage-license",
    name: { en: "Application for Marriage License", fil: "Application for Marriage License" },
    description: { en: "Apply for a marriage license at the City Civil Registry.", fil: "Mag-apply ng marriage license sa City Civil Registry." },
    categoryId: "ccr",
    pdfUrl: `${PDF}/Application-for-Marriage-License-Form-02-12-2024.pdf`,
    mode: "online",
    template: "civil-registry",
    relatedSlug: "civil-registry-application",
  },
  {
    id: "ccr-cenomar",
    slug: "cenomar-application",
    name: { en: "CENOMAR Application", fil: "CENOMAR Application" },
    description: { en: "Certificate of No Marriage Record application.", fil: "Certificate of No Marriage Record application." },
    categoryId: "ccr",
    pdfUrl: `${PDF}/NSO-Application-for-CENOMAR.pdf`,
    mode: "download",
    relatedSlug: "civil-registry-application",
  },
  {
    id: "ccr-birth",
    slug: "birth-certificate-application",
    name: { en: "Birth Certificate Application", fil: "Birth Certificate Application" },
    description: { en: "Request a copy of a birth certificate.", fil: "Humiling ng kopya ng birth certificate." },
    categoryId: "ccr",
    pdfUrl: `${PDF}/NSO-Application-of-Birth.pdf`,
    mode: "download",
    relatedSlug: "civil-registry-application",
  },
  {
    id: "ccr-death",
    slug: "death-certificate-application",
    name: { en: "Death Certificate Application", fil: "Death Certificate Application" },
    description: { en: "Request a copy of a death certificate.", fil: "Humiling ng kopya ng death certificate." },
    categoryId: "ccr",
    pdfUrl: `${PDF}/NSO-Application-for-Death.pdf`,
    mode: "download",
    relatedSlug: "civil-registry-application",
  },
  {
    id: "ccr-marriage-cert",
    slug: "marriage-certificate-application",
    name: { en: "Marriage Certificate Application", fil: "Marriage Certificate Application" },
    description: { en: "Request a copy of a marriage certificate.", fil: "Humiling ng kopya ng marriage certificate." },
    categoryId: "ccr",
    pdfUrl: `${PDF}/NSO-Application-for-Marriage.pdf`,
    mode: "download",
    relatedSlug: "civil-registry-application",
  },

  // CLO — Affidavits (consolidated online)
  {
    id: "clo-affidavit",
    slug: "affidavit-application",
    name: { en: "Affidavit Application", fil: "Affidavit Application" },
    description: {
      en: "Submit affidavits online: Loss, Denial, Support, No Income, Quitclaim, and more.",
      fil: "Mag-submit ng affidavit online: Loss, Denial, Support, No Income, Quitclaim, at iba pa.",
    },
    categoryId: "clo",
    pdfUrl: `${PDF}/Affidavit-of-Loss.pdf`,
    mode: "online",
    template: "affidavit",
    processingDays: "1–3 business days",
  },
  ...[
    ["Affidavit of Denial", "Affidavit-of-Denial"],
    ["Affidavit of Dissistance", "Affidavit-of-Dissistance"],
    ["Affidavit of Free State", "Affidavit-of-Free-State"],
    ["Affidavit of Loss", "Affidavit-of-Loss"],
    ["Affidavit of No Income", "Affidavit-of-No-Income"],
    ["Affidavit of Non-Operation", "Affidavit-of-Non-Operation"],
    ["Affidavit of Publication", "Affidavit-of-Publication"],
    ["Affidavit of Quitclaim", "Affidavit-of-Quitclaim"],
    ["Affidavit of Reconciliation of Birth Data", "Affidavit-of-Reconciliation-of-Birth-Data"],
    ["Affidavit of Support", "Affidavit-of-Support"],
    ["Affidavit of Vehicular Accident", "Affidavit-of-Vehicular-Accident"],
  ].map(([name, file], i) => ({
    id: `clo-aff-${i}`,
    slug: file.toLowerCase().replace(/affidavit-of-/, "affidavit-"),
    name: { en: name, fil: name },
    description: { en: `Download the ${name} template or apply online.`, fil: `I-download ang ${name} template o mag-apply online.` },
    categoryId: "clo",
    pdfUrl: `${PDF}/${file}.pdf`,
    mode: "download" as FormMode,
    relatedSlug: "affidavit-application",
  })),
  {
    id: "clo-legal-docs",
    slug: "legal-document-application",
    name: { en: "Legal Document Application", fil: "Legal Document Application" },
    description: { en: "Contract of Lease, Deed of Sale of Motor Vehicle, and other legal documents.", fil: "Contract of Lease, Deed of Sale, at iba pang legal documents." },
    categoryId: "clo",
    pdfUrl: `${PDF}/Contract-of-Lease.pdf`,
    mode: "online",
    template: "legal-document",
    processingDays: "3–5 business days",
  },
  {
    id: "clo-lease",
    slug: "contract-of-lease",
    name: { en: "Contract of Lease", fil: "Contract of Lease" },
    description: { en: "Download or submit a contract of lease online.", fil: "I-download o mag-submit ng contract of lease online." },
    categoryId: "clo",
    pdfUrl: `${PDF}/Contract-of-Lease.pdf`,
    mode: "download",
    relatedSlug: "legal-document-application",
  },
  {
    id: "clo-deed-sale",
    slug: "deed-of-sale-motor-vehicle",
    name: { en: "Deed of Sale of Motor Vehicle", fil: "Deed of Sale of Motor Vehicle" },
    description: { en: "Download or submit a deed of sale for motor vehicles.", fil: "I-download o mag-submit ng deed of sale para sa motor vehicle." },
    categoryId: "clo",
    pdfUrl: `${PDF}/Deed-of-Sale-of-Motor-Vehicle.pdf`,
    mode: "download",
    relatedSlug: "legal-document-application",
  },

  // CPDO
  {
    id: "cpdo-zoning",
    slug: "zoning-application",
    name: { en: "Zoning & Land Use Application", fil: "Zoning at Land Use Application" },
    description: {
      en: "Zoning certification, zoning application, subdivision approval, and parking affidavit.",
      fil: "Zoning certification, zoning application, subdivision approval, at parking affidavit.",
    },
    categoryId: "cpdo",
    pdfUrl: `${PDF}/CPDO_ZONING%20Application%20Form%20(aa).pdf`,
    mode: "online",
    template: "zoning",
    processingDays: "7–15 business days",
  },
  {
    id: "cpdo-parking",
    slug: "affidavit-of-parking",
    name: { en: "Affidavit of Parking", fil: "Affidavit of Parking" },
    description: { en: "Parking affidavit for zoning and land use compliance.", fil: "Parking affidavit para sa zoning compliance." },
    categoryId: "cpdo",
    pdfUrl: `${PDF}/CPDO_affidavit%20of%20parking%20form(aa).pdf`,
    mode: "download",
    relatedSlug: "zoning-application",
  },
  {
    id: "cpdo-subdivision",
    slug: "subdivision-approval",
    name: { en: "Final Approval of Subdivision", fil: "Final Approval of Subdivision" },
    description: { en: "Application for final approval of a subdivision project.", fil: "Application para sa final approval ng subdivision." },
    categoryId: "cpdo",
    pdfUrl: `${PDF}/CPDO_APPLICATION%20FOR%20FINAL%20APPROVAL%20OF%20SUBDIVISION(aa).pdf`,
    mode: "download",
    relatedSlug: "zoning-application",
  },
  {
    id: "cpdo-zoning-cert",
    slug: "zoning-certification",
    name: { en: "Zoning Certification", fil: "Zoning Certification" },
    description: { en: "Request a zoning certification for your property.", fil: "Humiling ng zoning certification para sa inyong property." },
    categoryId: "cpdo",
    pdfUrl: `${PDF}/CPDO_Application%20for%20Zoning%20Certification%20Form(aa).pdf`,
    mode: "download",
    relatedSlug: "zoning-application",
  },

  // OBO
  {
    id: "obo-building-permit",
    slug: "building-permit-application",
    name: { en: "Unified Building Permit Application", fil: "Unified Building Permit Application" },
    description: {
      en: "Apply for building permits for new construction, extension, fence, or solar installation.",
      fil: "Mag-apply ng building permit para sa bagong konstruksyon, extension, fence, o solar.",
    },
    categoryId: "obo",
    pdfUrl: `${PDF}/OBO/2025%2002%20Unified%20Application%20Form%20for%20Building%20Permit%20Imus.pdf`,
    mode: "online",
    template: "building-permit",
    processingDays: "10–20 business days",
  },
  {
    id: "obo-req-list",
    slug: "building-permit-requirements",
    name: { en: "Building Permit Requirements", fil: "Building Permit Requirements" },
    description: { en: "Complete list of requirements for building permit application.", fil: "Kumpletong listahan ng requirements para sa building permit." },
    categoryId: "obo",
    pdfUrl: `${PDF}/LIST-OF-REQUIREMENTS-FOR-BUILDING-PERMIT-APPLICATION-MAY-2022.pdf`,
    mode: "requirements",
    relatedSlug: "building-permit-application",
  },
  {
    id: "obo-req-new",
    slug: "requirements-new-construction",
    name: { en: "Requirements — New Construction", fil: "Requirements — Bagong Konstruksyon" },
    description: { en: "Document checklist for new construction projects.", fil: "Checklist ng dokumento para sa bagong konstruksyon." },
    categoryId: "obo",
    pdfUrl: `${PDF}/REQUIREMENTS-NEW-CONSTRUCTION.pdf`,
    mode: "requirements",
    relatedSlug: "building-permit-application",
  },
  {
    id: "obo-req-ext",
    slug: "requirements-extension-fence",
    name: { en: "Requirements — Extension & Fence", fil: "Requirements — Extension at Fence" },
    description: { en: "Document checklist for extension and fencing projects.", fil: "Checklist para sa extension at fencing." },
    categoryId: "obo",
    pdfUrl: `${PDF}/REQUIREMENTS-EXTENSION-AND-FENCE.pdf`,
    mode: "requirements",
    relatedSlug: "building-permit-application",
  },
  {
    id: "obo-req-solar",
    slug: "requirements-solar-panel",
    name: { en: "Requirements — Solar Panel Installation", fil: "Requirements — Solar Panel Installation" },
    description: { en: "Document checklist for solar panel installations.", fil: "Checklist para sa solar panel installation." },
    categoryId: "obo",
    pdfUrl: `${PDF}/Requirements-for-Solar-Panel-Installation.pdf`,
    mode: "requirements",
    relatedSlug: "building-permit-application",
  },
  {
    id: "obo-occupancy",
    slug: "certificate-of-occupancy",
    name: { en: "Certificate of Occupancy", fil: "Certificate of Occupancy" },
    description: { en: "Apply for a certificate of occupancy after construction completion.", fil: "Mag-apply ng certificate of occupancy pagkatapos ng konstruksyon." },
    categoryId: "obo",
    pdfUrl: `${PDF}/OBO/2025%2001%20Unified%20Application%20Form%20for%20Certificate%20of%20Occupancy.pdf`,
    mode: "online",
    template: "building-permit",
    relatedSlug: "building-permit-application",
  },
  {
    id: "obo-ancillary",
    slug: "ancillary-permit-application",
    name: { en: "Ancillary Permit Application", fil: "Ancillary Permit Application" },
    description: {
      en: "Electrical, plumbing, mechanical, sanitary, sign, electronics, fencing, architectural, and civil/structural permits.",
      fil: "Electrical, plumbing, mechanical, sanitary, sign, electronics, fencing, architectural, at civil/structural permits.",
    },
    categoryId: "obo",
    pdfUrl: `${PDF}/OBO/2025%2003%20Electrical%20Permit%20(front).pdf`,
    mode: "online",
    template: "ancillary-permit",
    processingDays: "5–10 business days",
  },
  ...[
    ["Electrical Permit", "OBO/2025%2003%20Electrical%20Permit%20(front)"],
    ["Plumbing Permit", "OBO/2025%2004%20Plumbing%20Permit%20(front)"],
    ["Mechanical Permit", "OBO/2025%2005%20Mechanical%20Permit%20(front)"],
    ["Sanitary Permit", "OBO/2025%2007%20Sanitary%20Permit%20(front)"],
    ["Sign Permit", "Sign-Permit-front"],
    ["Electronics Permit", "OBO/2025%2006%20Electronics%20Permit%20(front)"],
    ["Fencing Permit", "OBO/2025%2012%20Fencing%20Permit%20(front)"],
    ["Architectural Permit", "OBO/2025%20Architectural%20Permit%20Form%20Imus"],
    ["Civil/Structural Permit", "OBO/2025%20Civil%20Structural%20Permit%20Form%20Imus"],
    ["Certificate of Completion", "OBO/2025%2002%20Certificate%20of%20Completion%20(front)"],
    ["Affidavit of Estimated Value", "AFFIDAVIT-OF-ESTIMATED-VALUE-OF-BUILDING"],
    ["Evaluation Sheet", "Evaluation-Sheet"],
  ].map(([name, path], i) => ({
    id: `obo-dl-${i}`,
    slug: path.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, ""),
    name: { en: name, fil: name },
    description: { en: `Download the ${name} form or apply online.`, fil: `I-download ang ${name} form o mag-apply online.` },
    categoryId: "obo",
    pdfUrl: `${PDF}/${path}.pdf`,
    mode: "download" as FormMode,
    relatedSlug: path.includes("Electrical") || path.includes("Plumbing") || path.includes("Mechanical") || path.includes("Sanitary") || path.includes("Sign") || path.includes("Electronics") || path.includes("Fencing") || path.includes("Architectural") || path.includes("Civil")
      ? "ancillary-permit-application"
      : "building-permit-application",
  })),

  // OSCA
  {
    id: "osca-app",
    slug: "osca-application",
    name: { en: "OSCA Application Form", fil: "OSCA Application Form" },
    description: {
      en: "Register for a Senior Citizen ID and access benefits and programs.",
      fil: "Magparehistro para sa Senior Citizen ID at mga benepisyo.",
    },
    categoryId: "osca",
    pdfUrl: `${PDF}/OSCA_FORM_2024_January_2024.pdf`,
    mode: "online",
    template: "osca",
    processingDays: "3–5 business days",
  },

  // PDAO
  {
    id: "pdao-app",
    slug: "pdao-application",
    name: { en: "PDAO Application Form", fil: "PDAO Application Form" },
    description: {
      en: "Register for a PWD ID and access disability assistance programs.",
      fil: "Magparehistro para sa PWD ID at disability assistance programs.",
    },
    categoryId: "pdao",
    pdfUrl: `${PDF}/PDAO/APPLICATION%20FORM%20as%20of%20AUG2025%20ver.%206.pdf`,
    mode: "online",
    template: "pdao",
    processingDays: "5–7 business days",
  },
  {
    id: "pdao-req1",
    slug: "pdao-requirements-1",
    name: { en: "PDAO Requirements (Set 1)", fil: "PDAO Requirements (Set 1)" },
    description: { en: "List of requirements for PWD ID application.", fil: "Listahan ng requirements para sa PWD ID." },
    categoryId: "pdao",
    pdfUrl: `${PDF}/PDAO/pdao%20requirements%201.jpg`,
    mode: "requirements",
    relatedSlug: "pdao-application",
  },
  {
    id: "pdao-req2",
    slug: "pdao-requirements-2",
    name: { en: "PDAO Requirements (Set 2)", fil: "PDAO Requirements (Set 2)" },
    description: { en: "Additional requirements for PWD ID application.", fil: "Karagdagang requirements para sa PWD ID." },
    categoryId: "pdao",
    pdfUrl: `${PDF}/PDAO/pdao_requirements_April1.jpg`,
    mode: "requirements",
    relatedSlug: "pdao-application",
  },
];

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
