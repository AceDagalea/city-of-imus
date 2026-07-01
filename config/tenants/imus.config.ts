import type { TenantConfig } from "@/config/tenant.schema";
import type { CityForm, FormCategory, FormMode } from "@/lib/forms";

/**
 * Reference tenant: City of Imus, Cavite.
 *
 * This file is the single source of truth for every Imus-specific value that
 * used to live directly in `lib/constants.ts`, `lib/forms.ts`, and
 * `lib/digital-services.ts`. Those modules now re-export from the active tenant
 * config. To create a new LGU deployment, copy `_template.config.ts` instead of
 * editing this file.
 */

const SITE_URL = "https://www.cityofimus.gov.ph";
const PDF = "https://www.cityofimus.gov.ph/docs/Downloadable%20Forms";

// ── Offices (formerly FORM_CATEGORIES) ──────────────────────────────────────
const offices: FormCategory[] = [
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

// ── Forms (formerly CITY_FORMS) ─────────────────────────────────────────────
const forms: CityForm[] = [
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

export const imusConfig = {
  // ── Identity ──────────────────────────────────────────────────────────
  lguType: "city",
  lguName: { en: "City of Imus", fil: "Lungsod ng Imus" },
  province: "Cavite",
  region: "Region IV-A (CALABARZON)",
  psgcCode: "042108000",
  motto: { en: "AAngat ang Imus", fil: "AAngat ang Imus" },

  // ── Feature flags ─────────────────────────────────────────────────────
  modules: {
    fullDisclosure: true,
    tourism: true,
    banaag: true,
    gadDatabase: true,
    jobPortal: true,
  },

  // ── Branding ──────────────────────────────────────────────────────────
  brand: {
    primary: "#1A3668",
    secondary: "#39A843",
    accent: "#39A843",
    logoUrl: "/images/imus-logo.png",
    logoRemoteUrl: `${SITE_URL}/Media/Logo_City_Government_of_Imus.png`,
    sealUrl: `${SITE_URL}/Media/imus_logo.png`,
    colors: {
      navy: "#1A3668",
      green: "#39A843",
      red: "#C8102E",
      accent: "#39A843",
    } as const,
  },

  // ── Leadership ────────────────────────────────────────────────────────
  executive: {
    title: { en: "City Mayor", fil: "Punong Lungsod" },
    name: "Alex Advincula",
    photoUrl: `${SITE_URL}/Media/MayorStanding.png`,
  },

  // ── Contact / office info ─────────────────────────────────────────────
  contact: {
    address: "Imus Boulevard, Brgy. Malagasang I-G, City of Imus, Cavite",
    hours: "Monday to Thursday, 7:00 AM – 6:00 PM",
    mainLines: ["(046) 888 9910", "(046) 888 9912"],
    emergency: "(046) 888 9911",
    facebook: "https://www.facebook.com/CityofImus",
    facebookTourism: "https://www.facebook.com/ImusCityTourism",
    youtubeId: "xGNOCWXM9pM",
    eboss: "https://egovcityofimus.ph/ebpls/",
    email: "cityofimus@cavite.gov.ph",
    twitter: "https://twitter.com/CityofImus",
  },

  // ── Site-wide media / embeds ──────────────────────────────────────────
  siteUrl: SITE_URL,
  foiUrl: "https://www.foi.gov.ph",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15458.59370753627!2d120.90208883955074!3d14.389741800000023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397d31670229361%3A0x92deb97a2f2bb219!2sNew%20Imus%20City%20Hall!5e0!3m2!1sen!2sus!4v1658285201747!5m2!1sen!2sus",
  hero: {
    imageUrl: `${SITE_URL}/Media/newcityhall.jpg`,
    videoUrl: `${SITE_URL}/Media/Banner/2026CongratsAthletes1.mp4`,
    fallbackUrl: `${SITE_URL}/Media/newcityhall.jpg`,
    tagline: {
      en: "City of Imus, City of Hope",
      fil: "Lungsod ng Imus, Lungsod ng Pag-Asa",
    },
    subtitle: {
      en: "The model city in the region — governed with integrity and transparency, committed to delivering efficient public service for every Imuseño. AAngat ang Imus.",
      fil: "Ang modelong lungsod sa rehiyon — pinamamahalaan nang may integridad at transparency, nakatuon sa epektibong serbisyong pampubliko para sa bawat Imuseño. AAngat ang Imus.",
    },
  },

  // ── Navigation & footer chrome ────────────────────────────────────────
  navItems: [
    { label: { en: "Home", fil: "Home" }, href: "/", children: [] },
    { label: { en: "About Imus", fil: "Tungkol sa Imus" }, href: "/about", children: [] },
    {
      label: { en: "Government", fil: "Pamahalaan" },
      href: "/about/government",
      children: [
        { label: { en: "Mayor's Office", fil: "Tanggapan ng Mayor" }, href: "/about/mayor" },
        { label: { en: "City Council", fil: "Sangguniang Panlungsod" }, href: "/about/government#council" },
        { label: { en: "Departments", fil: "Mga Departamento" }, href: "/about/departments" },
      ],
    },
    {
      label: { en: "Services", fil: "Serbisyo" },
      href: "/forms",
      children: [
        { label: { en: "All Services", fil: "Lahat ng Serbisyo" }, href: "/forms" },
        { label: { en: "eBOSS Portal", fil: "eBOSS Portal" }, href: "https://egovcityofimus.ph/ebpls/", external: true },
      ],
    },
    {
      label: { en: "Transparency", fil: "Transparency" },
      href: "/full-disclosure",
      children: [
        { label: { en: "Full Disclosure", fil: "Full Disclosure" }, href: "/full-disclosure" },
        { label: { en: "Bids & Awards", fil: "Bids & Awards" }, href: "/full-disclosure/bids-awards" },
      ],
    },
    {
      label: { en: "News & Events", fil: "Balita at Kaganapan" },
      href: "/news",
      children: [],
    },
    { label: { en: "Contact Us", fil: "Makipag-ugnayan" }, href: "/contact", children: [] },
  ],
  footerColumns: {
    government: {
      title: { en: "Government", fil: "Pamahalaan" },
      links: [
        { label: { en: "Mayor's Office", fil: "Tanggapan ng Mayor" }, href: "/about/mayor" },
        { label: { en: "City Council", fil: "Sangguniang Panlungsod" }, href: "/about/government#council" },
        { label: { en: "Departments", fil: "Mga Departamento" }, href: "/about/departments" },
        { label: { en: "Barangays", fil: "Barangay" }, href: `${SITE_URL}/barangay.html`, external: true },
      ],
    },
    transparency: {
      title: { en: "Transparency", fil: "Transparency" },
      links: [
        { label: { en: "Full Disclosure", fil: "Full Disclosure" }, href: "/full-disclosure" },
        { label: { en: "Bids & Awards", fil: "Bids & Awards" }, href: "/full-disclosure/bids-awards" },
        { label: { en: "Executive Orders", fil: "Executive Orders" }, href: "/full-disclosure/executive-orders" },
        { label: { en: "Ordinances", fil: "Mga Ordinansa" }, href: "/full-disclosure/ordinances" },
        { label: { en: "Resolutions", fil: "Mga Resolusyon" }, href: "/full-disclosure/resolutions" },
        { label: { en: "Job Opportunities", fil: "Job Opportunities" }, href: "/full-disclosure/job-opportunities" },
        { label: { en: "GAD Database", fil: "GAD Database" }, href: "/full-disclosure/gad-database" },
        { label: { en: "BanAAg", fil: "BanAAg" }, href: "/full-disclosure/banaag" },
        { label: { en: "Local Government Fund", fil: "Local Government Fund" }, href: "/full-disclosure/local-government-fund" },
      ],
    },
    resources: {
      title: { en: "Resources", fil: "Resources" },
      links: [
        { label: { en: "Services", fil: "Serbisyo" }, href: "/forms" },
        { label: { en: "Citizen's Charter", fil: "Citizen's Charter" }, href: `${SITE_URL}/citizen's-charter.html`, external: true },
        { label: { en: "Job Opportunities", fil: "Job Opportunities" }, href: `${SITE_URL}/job_opportunities.html`, external: true },
        { label: { en: "Tourism", fil: "Turismo" }, href: "/tourism" },
      ],
    },
  },
  quickAccess: [
    { icon: "monitor" as const, label: { en: "Services", fil: "Serbisyo" }, href: "/forms" },
    { icon: "users" as const, label: { en: "Jobs & Careers", fil: "Jobs" }, href: "/full-disclosure/job-opportunities" },
    { icon: "file-text" as const, label: { en: "Full Disclosure", fil: "Full Disclosure" }, href: "/full-disclosure" },
    { icon: "megaphone" as const, label: { en: "Report an Issue", fil: "Mag-ulat" }, href: "/contact#hotlines" },
  ],
  popularSearches: [
    { label: { en: "Jobs", fil: "Jobs" }, href: "/full-disclosure/job-opportunities" },
    { label: { en: "Scholarships", fil: "Scholarships" }, href: "/news" },
    { label: { en: "Birth Certificate", fil: "Birth Certificate" }, href: "/forms" },
  ],

  // ── Homepage content ──────────────────────────────────────────────────
  cityStats: [
    { value: 539743, label: { en: "Population", fil: "Populasyon" }, suffix: "" },
    { value: 97, label: { en: "Barangays", fil: "Barangay" }, suffix: "" },
    { value: 130814, label: { en: "Households", fil: "Sambahayan" }, suffix: "" },
    { value: 4.24, label: { en: "Population Growth Rate", fil: "Rate ng Paglago ng Populasyon" }, suffix: "%", decimals: 2 },
    { value: 101.56, label: { en: "Persons/sq.km", fil: "Tao/sq.km" }, suffix: "", decimals: 2 },
  ],
  landmarks: [
    {
      title: { en: "City Government Center", fil: "City Government Center" },
      address: "Imus Boulevard, Brgy. Malagasang I-G, City of Imus, Cavite",
      image: `${SITE_URL}/Media/newcityhall.jpg`,
    },
    {
      title: { en: "Battle of Imus Monument", fil: "Monumento ng Labanan sa Imus" },
      address: "Imus, Cavite",
      image: `${SITE_URL}/Media/battleofimus.jpg`,
    },
    {
      title: { en: "Ospital ng Imus", fil: "Ospital ng Imus" },
      address: "Imus, Cavite",
      image: `${SITE_URL}/Media/ospital.jpg`,
    },
    {
      title: { en: "LTO Office", fil: "Tanggapan ng LTO" },
      address: "Imus, Cavite",
      image: `${SITE_URL}/Media/lto.jpg`,
    },
  ],
  announcements: [
    {
      id: "workweek",
      title: {
        en: "Extended Four-Day Compressed Workweek",
        fil: "Pinalawig na Four-Day Compressed Workweek",
      },
      excerpt: {
        en: "EO No. 029, s. 2026 extends the Four-Day Compressed Workweek until December 25, 2026. City offices open Mon–Thu, 7:00 AM – 6:00 PM.",
        fil: "Ang EO No. 029, s. 2026 ay nagpapalawig ng Four-Day Compressed Workweek hanggang Disyembre 25, 2026.",
      },
      date: "2026-05-11",
      image: `${SITE_URL}/Media/4DayWorkweekJune2026.jpg`,
      href: `${SITE_URL}/executive_order.html`,
      external: true,
      featured: true,
    },
    {
      id: "library",
      title: { en: "Public Library Open for Reviewers", fil: "Bukas ang Library para sa mga Reviewer" },
      excerpt: {
        en: "New Imus City Public Library welcomes State Board Exam reviewers. Lower ground floor, City Government Center. Mon–Thu, 7:00 AM – 6:00 PM.",
        fil: "Malugod na binubuksan ng New Imus City Public Library ang kanilang pinto para sa mga reviewer.",
      },
      date: "2026-01-01",
      image: `${SITE_URL}/Media/library_study.jpg`,
      href: "/news",
    },
  ],
  newsItems: [
    {
      id: "1",
      date: "2026-05-13",
      title: { en: "Educational Assistance para sa college students, idinaos", fil: "Educational Assistance para sa college students, idinaos" },
      excerpt: {
        en: "The City Government held an educational assistance program for college students in Imus.",
        fil: "Nagsagawa ang Pamahalaang Lungsod ng educational assistance program para sa mga college student.",
      },
      image: `${SITE_URL}/Media/News/2026_May_EducAssistanceCollegeStudents.jpg`,
      href: `${SITE_URL}/News/2026_May.html#Up_news578`,
      external: true,
      featured: true,
    },
    {
      id: "2",
      date: "2026-05-05",
      title: { en: "Pag-inspeksyon sa Imus Public Market ni Mayor AA", fil: "Pag-inspeksyon sa Imus Public Market ni Mayor AA" },
      excerpt: {
        en: "Mayor Alex Advincula inspected the Imus Public Market to ensure quality services for residents.",
        fil: "Inspeksyon ni Mayor AA sa Imus Public Market para sa de-kalidad na serbisyo.",
      },
      image: `${SITE_URL}/Media/News/2026_May_ImusPublicMarketInspection1.jpg`,
      href: `${SITE_URL}/News/2026_May.html#Up_news577`,
      external: true,
    },
    {
      id: "3",
      date: "2026-05-07",
      title: { en: "665 kalalakihang Imuseño, lumahok sa Libreng Operation Tuli", fil: "665 kalalakihang Imuseño, lumahok sa Libreng Operation Tuli" },
      excerpt: {
        en: "665 young Imuseños participated in the free Operation Tuli program of the City Government.",
        fil: "665 kabataang Imuseño ang lumahok sa Libreng Operation Tuli ng lungsod.",
      },
      image: `${SITE_URL}/Media/News/2026_May_LibrengOprationTuli1.jpg`,
      href: `${SITE_URL}/News/2026_May.html#Up_news576`,
      external: true,
    },
    {
      id: "4",
      date: "2026-03-01",
      title: { en: "3,036 ECCD learners nagsipagtapos ngayong Marso", fil: "3,036 ECCD learners nagsipagtapos" },
      excerpt: {
        en: "3,036 Early Childhood Care and Development learners graduated this March.",
        fil: "3,036 ECCD learners ang nagsipagtapos ngayong Marso.",
      },
      image: `${SITE_URL}/Media/News/2026_March_ECCDLearners.jpg`,
      href: `${SITE_URL}/News/2026_March.html#Up_news557`,
      external: true,
    },
  ],
  upcomingEvents: [
    {
      id: "1",
      date: "2026-06-12",
      title: { en: "Flag Day Celebration", fil: "Pagdiriwang ng Araw ng Watawat" },
      time: "8:00 AM",
      location: { en: "City Government Center", fil: "City Government Center" },
      href: "/news",
    },
    {
      id: "2",
      date: "2026-06-19",
      title: { en: "Independence Day Program", fil: "Programa sa Araw ng Kalayaan" },
      time: "7:00 AM",
      location: { en: "Imus City Plaza", fil: "Imus City Plaza" },
      href: "/news",
    },
    {
      id: "3",
      date: "2026-06-28",
      title: { en: "City Health Fair", fil: "City Health Fair" },
      time: "9:00 AM – 3:00 PM",
      location: { en: "Ospital ng Imus", fil: "Ospital ng Imus" },
      href: "/contact#hotlines",
    },
  ],
  hotlines: [
    {
      id: "city-gov",
      icon: "building" as const,
      name: { en: "City Government of Imus", fil: "Pamahalaang Lungsod ng Imus" },
      numbers: [
        { label: "Main Line", number: "(046) 888 9910" },
        { label: "Main Line", number: "(046) 888 9912" },
        { label: "Emergency", number: "(046) 888 9911" },
      ],
    },
    {
      id: "cdrrmo",
      icon: "shield" as const,
      name: { en: "CDRRMO", fil: "CDRRMO" },
      numbers: [
        { label: "Office", number: "(046) 472-2618" },
        { label: "Office", number: "(046) 472-2623" },
        { label: "Office", number: "(046) 472-2625" },
        { label: "Mobile", number: "0919-069-1703" },
      ],
    },
    {
      id: "bfp",
      icon: "flame" as const,
      name: { en: "Bureau of Fire Protection", fil: "Bureau of Fire Protection" },
      numbers: [
        { label: "Hotline", number: "970-5161" },
        { label: "Hotline", number: "416-3032" },
        { label: "Mobile", number: "0915-528-3256" },
      ],
    },
    {
      id: "ospital",
      icon: "heart-pulse" as const,
      name: { en: "Ospital ng Imus", fil: "Ospital ng Imus" },
      numbers: [{ label: "Main", number: "419-8300 to 07" }],
    },
    {
      id: "molab",
      icon: "microscope" as const,
      name: { en: "City Molecular Laboratory", fil: "City Molecular Laboratory" },
      numbers: [{ label: "Office", number: "853-3364" }],
    },
    {
      id: "pnp",
      icon: "shield-check" as const,
      name: { en: "Imus PNP", fil: "Imus PNP" },
      numbers: [{ label: "Hotline", number: "0998-598-5601" }],
    },
  ],
  serviceAudiences: [
    {
      id: "residents",
      label: { en: "For Residents", fil: "Para sa Residente" },
      image: `${SITE_URL}/Media/library_study.jpg`,
      href: "/forms",
      icon: "home",
    },
    {
      id: "business",
      label: { en: "For Businesses", fil: "Para sa Negosyo" },
      image: `${SITE_URL}/Media/EBoss/EBoss_Banner%20(1).jpg`,
      href: "https://egovcityofimus.ph/ebpls/",
      external: true,
      icon: "briefcase",
    },
    {
      id: "visitors",
      label: { en: "For Visitors", fil: "Para sa Bisita" },
      image: `${SITE_URL}/Media/Carousel_BattleOfImus.jpg`,
      href: "https://www.facebook.com/ImusCityTourism",
      external: true,
      icon: "map",
    },
  ],
  serviceCategories: [
    {
      id: "business",
      title: { en: "Business & Permits", fil: "Negosyo at Permits" },
      services: [
        {
          icon: "briefcase" as const,
          title: { en: "eBOSS Online Business Permits", fil: "eBOSS Online Business Permits" },
          description: {
            en: "Apply for business permits and licenses online through the eBOSS portal.",
            fil: "Mag-apply ng business permits at licenses online sa eBOSS portal.",
          },
          href: "https://egovcityofimus.ph/ebpls/",
          external: true,
          featured: true,
        },
        {
          icon: "file-check" as const,
          title: { en: "Online Forms & Applications", fil: "Online Forms at Applications" },
          description: {
            en: "Submit government forms online — building permits, civil registry, affidavits, and more.",
            fil: "Mag-submit ng government forms online — building permits, civil registry, affidavits, at iba pa.",
          },
          href: "/forms",
        },
      ],
    },
    {
      id: "health",
      title: { en: "Health & Medical", fil: "Kalusugan at Medikal" },
      services: [
        {
          icon: "heart-pulse" as const,
          title: { en: "Ospital ng Imus", fil: "Ospital ng Imus" },
          description: {
            en: "City hospital providing comprehensive medical care. Call 419-8300 to 07.",
            fil: "Ospital ng lungsod na nagbibigay ng komprehensibong pangangalagang medikal.",
          },
          href: "tel:4198300",
        },
        {
          icon: "microscope" as const,
          title: { en: "City Molecular Laboratory", fil: "City Molecular Laboratory" },
          description: {
            en: "Laboratory testing services. Contact 853-3364.",
            fil: "Mga serbisyong pagsusuri sa laboratoryo. Tumawag sa 853-3364.",
          },
          href: "tel:8533364",
        },
      ],
    },
    {
      id: "safety",
      title: { en: "Public Safety", fil: "Kaligtasan ng Publiko" },
      services: [
        {
          icon: "shield" as const,
          title: { en: "CDRRMO", fil: "CDRRMO" },
          description: {
            en: "Disaster risk reduction and emergency response coordination.",
            fil: "Koordinasyon sa pagbabawas ng panganib at emergency response.",
          },
          href: "/contact#hotlines",
        },
        {
          icon: "flame" as const,
          title: { en: "Bureau of Fire Protection", fil: "Bureau of Fire Protection" },
          description: {
            en: "Fire emergency response and prevention services.",
            fil: "Serbisyong pang-emergency at pag-iwas sa sunog.",
          },
          href: "/contact#hotlines",
        },
        {
          icon: "shield-check" as const,
          title: { en: "Imus PNP", fil: "Imus PNP" },
          description: {
            en: "Philippine National Police — Imus City. Hotline: 0998-598-5601.",
            fil: "Philippine National Police — Lungsod ng Imus.",
          },
          href: "tel:09985985601",
        },
      ],
    },
    {
      id: "education",
      title: { en: "Education & Libraries", fil: "Edukasyon at Aklatan" },
      services: [
        {
          icon: "book-open" as const,
          title: { en: "Public Library", fil: "Pampublikong Aklatan" },
          description: {
            en: "Access books, resources, and educational programs at the city public library.",
            fil: "Mag-access ng mga aklat at programa sa pampublikong aklatan ng lungsod.",
          },
          href: `${SITE_URL}/library.html`,
          external: true,
        },
      ],
    },
    {
      id: "social",
      title: { en: "Social Services", fil: "Serbisyong Panlipunan" },
      services: [
        {
          icon: "users" as const,
          title: { en: "Social Welfare Services", fil: "Serbisyong Pangkapakanan" },
          description: {
            en: "Assistance programs for indigent families, seniors, and persons with disabilities.",
            fil: "Mga programang tulong para sa mga nangangailangan.",
          },
          href: "/contact",
        },
      ],
    },
    {
      id: "infrastructure",
      title: { en: "Infrastructure", fil: "Imprastraktura" },
      services: [
        {
          icon: "building-2" as const,
          title: { en: "Engineering & Public Works", fil: "Engineering at Public Works" },
          description: {
            en: "Infrastructure projects, road maintenance, and building permits.",
            fil: "Mga proyektong imprastraktura, pagpapanatili ng kalsada, at building permits.",
          },
          href: "/contact",
        },
      ],
    },
  ],

  // ── Services / requests module ────────────────────────────────────────
  offices,
  forms,

  // ── Digital-services page config ──────────────────────────────────────
  mostRequestedSlugs: [
    "business-permit-application",
    "fire-station-application",
    "birth-certificate-application",
    "building-permit-application",
    "zoning-certification",
  ],
  popularServiceSearches: [
    "Business Permit",
    "Birth Certificate",
    "Building Permit",
    "Fire Safety",
    "Senior Citizen ID",
  ],
  audienceTabs: [
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
  ] as const,
} satisfies TenantConfig;
