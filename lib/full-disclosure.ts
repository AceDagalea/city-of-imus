import { SITE_URL } from "./constants";
import { getBidsAwardsItems, getExecutiveOrdersByYear } from "./disclosure-generated";
import {
  BANAAG_ITEMS,
  DISPOSAL_COMMITTEE_ITEMS,
  GAD_DATABASE_ITEMS,
  JOB_OPPORTUNITY_ITEMS,
  LOCAL_GOVERNMENT_FUND_ITEMS,
} from "./full-disclosure-data";

export interface DisclosureDocument {
  id: string;
  title: string;
  description?: string;
  pdfUrl: string;
  postedDate: string;
  year?: number;
  category?: string;
}

export interface ResolutionEntry {
  id: string;
  number: string;
  date: string;
  title: string;
  description: string;
}

export interface TableDisclosureItem {
  id: string;
  reference: string;
  title: string;
  datePosted: string;
  pdfUrl: string;
}

export interface DisclosureSection {
  id: string;
  label: { en: string; fil: string };
  description: { en: string; fil: string };
  icon: string;
  type: "documents" | "ordinances" | "resolutions" | "table";
  tableVariant?: "bids" | "jobs" | "gad" | "banaag" | "disposal" | "lgf";
}

const FD = `${SITE_URL}/FULL%20DISCLOSURE`;

export const DISCLOSURE_SECTIONS: DisclosureSection[] = [
  {
    id: "financial",
    label: { en: "Full Disclosure", fil: "Full Disclosure" },
    description: {
      en: "Financial reports, procurement plans, and fund utilization in compliance with the Full Disclosure Policy (FDP).",
      fil: "Financial reports, procurement plans, at fund utilization ayon sa Full Disclosure Policy.",
    },
    icon: "eye",
    type: "documents",
  },
  {
    id: "executive-orders",
    label: { en: "Executive Orders", fil: "Executive Orders" },
    description: {
      en: "Executive orders issued by the City Mayor of Imus.",
      fil: "Mga executive order na inilabas ng Punong Lungsod ng Imus.",
    },
    icon: "scroll-text",
    type: "documents",
  },
  {
    id: "ordinances",
    label: { en: "City Ordinances", fil: "Mga Ordinansa" },
    description: {
      en: "Local ordinances enacted by the Sangguniang Panlungsod.",
      fil: "Mga local ordinances na ipinasa ng Sangguniang Panlungsod.",
    },
    icon: "gavel",
    type: "ordinances",
  },
  {
    id: "resolutions",
    label: { en: "Resolutions", fil: "Mga Resolusyon" },
    description: {
      en: "Resolutions passed by the Imus City Council.",
      fil: "Mga resolusyon ng Sangguniang Panlungsod ng Imus.",
    },
    icon: "file-check",
    type: "resolutions",
  },
  {
    id: "bids-awards",
    label: { en: "Bids & Awards", fil: "Bids & Awards" },
    description: {
      en: "Procurement notices, bid results, and awarded contracts.",
      fil: "Mga procurement notice, bid results, at awarded contracts.",
    },
    icon: "badge-dollar-sign",
    type: "table",
    tableVariant: "bids",
  },
  {
    id: "job-opportunities",
    label: { en: "Job Opportunities", fil: "Job Opportunities" },
    description: {
      en: "Current job vacancies and career opportunities at the City Government of Imus.",
      fil: "Mga bakanteng posisyon sa Pamahalaang Lungsod ng Imus.",
    },
    icon: "briefcase",
    type: "table",
    tableVariant: "jobs",
  },
  {
    id: "gad-database",
    label: { en: "GAD Database", fil: "GAD Database" },
    description: {
      en: "Gender and Development programs, plans, accomplishment reports, and sex-disaggregated data.",
      fil: "Gender and Development programs, plans, accomplishment reports, at sex-disaggregated data.",
    },
    icon: "users",
    type: "table",
    tableVariant: "gad",
  },
  {
    id: "banaag",
    label: { en: "BanAAg", fil: "BanAAg" },
    description: {
      en: "BanAAg publication — official city government news, updates, accomplishments and stories about Imus.",
      fil: "BanAAg publication — opisyal na balita, updates, accomplishments, at mga kwento tungkol sa Imus.",
    },
    icon: "newspaper",
    type: "table",
    tableVariant: "banaag",
  },
  {
    id: "disposal-committee",
    label: { en: "Disposal Committee Invites", fil: "Disposal Committee Invites" },
    description: {
      en: "Invitations from the Committee on Disposal of unserviceable property.",
      fil: "Mga imbitasyon mula sa Committee on Disposal.",
    },
    icon: "package",
    type: "table",
    tableVariant: "disposal",
  },
  {
    id: "local-government-fund",
    label: { en: "Local Government Fund", fil: "Local Government Fund" },
    description: {
      en: "Trust fund utilization and local government support fund reports.",
      fil: "Trust fund utilization at local government support fund reports.",
    },
    icon: "landmark",
    type: "table",
    tableVariant: "lgf",
  },
];

export const FINANCIAL_DISCLOSURE_DOCS: DisclosureDocument[] = [
  {
    id: "app-2025",
    title: "Annual Procurement Plan 2025",
    pdfUrl: `${FD}/Full%20Disclosure%20Policy/APP%202025.pdf`,
    postedDate: "2025-01-31",
    year: 2025,
    category: "Procurement",
  },
  {
    id: "soca-2024",
    title: "State of the Children Address Newsletter 2024",
    description: "State of the Children Address — LCPC Report",
    pdfUrl: `${FD}/Full%20Disclosure%20Policy/LCPC%202024.pdf`,
    postedDate: "2025-01-15",
    year: 2024,
    category: "Social Services",
  },
  {
    id: "app-2024",
    title: "Annual Procurement Plan 2024",
    pdfUrl: `${FD}/Full%20Disclosure%20Policy/APP%202024.pdf`,
    postedDate: "2024-02-02",
    year: 2024,
    category: "Procurement",
  },
  {
    id: "app-2023",
    title: "Annual Procurement Plan 2023",
    pdfUrl: `${FD}/Full%20Disclosure%20Policy/APP2023.pdf`,
    postedDate: "2023-02-14",
    year: 2023,
    category: "Procurement",
  },
  {
    id: "saob-2022",
    title: "Statement of Allotments, Obligations and Balances",
    description: "Current Legislative Appropriations as of June 30, 2022",
    pdfUrl: `${FD}/Full%20Disclosure%20Policy/SAAO%20REPORT.PDF`,
    postedDate: "2022-08-19",
    year: 2022,
    category: "Financial",
  },
  {
    id: "lgsf-drra",
    title: "LG Support Fund — Disaster Rehabilitation & Reconstruction Assistance Program",
    description: "Report on Fund Utilization and Status of Program/Project Implementation for the quarter ended March 31, 2022",
    pdfUrl: `${FD}/Full%20Disclosure%20Policy/Local-Government-Support-Fund-Disaster-Rehabilitation-and-Reconstruction-Assistance-Program.pdf`,
    postedDate: "2022-08-19",
    year: 2022,
    category: "Disaster Management",
  },
  {
    id: "blgf-q2-2022",
    title: "BLGF Statement of Receipts Q2 2022",
    description: "Bureau of Local Government Finance, Department of Finance — City of Imus",
    pdfUrl: `${FD}/Full%20Disclosure%20Policy/IMUS%20CITY-Region%20IV-A_2022-2_SRS.pdf`,
    postedDate: "2022-08-19",
    year: 2022,
    category: "Financial",
  },
  {
    id: "ndrrmf-2022",
    title: "Financial Assistance to LGUs — NDRRMF",
    description: "Report on Fund Utilization and Status of Program/Project/Activity Implementation — January 2022",
    pdfUrl: `${FD}/Full%20Disclosure%20Policy/Financial-Assistance-to-Local-Government-Units-Charge-Against-NDRRMF.pdf`,
    postedDate: "2022-08-19",
    year: 2022,
    category: "Disaster Management",
  },
];


export const DISCLOSURE_SECTION_IDS = DISCLOSURE_SECTIONS.map((s) => s.id);

export function getDocumentsForSection(sectionId: string): DisclosureDocument[] {
  switch (sectionId) {
    case "financial":
      return FINANCIAL_DISCLOSURE_DOCS;
    case "executive-orders":
      return getExecutiveOrdersByYear(2026);
    default:
      return [];
  }
}

export function getTableItemsForSection(sectionId: string): TableDisclosureItem[] {
  switch (sectionId) {
    case "bids-awards":
      return getBidsAwardsItems();
    case "job-opportunities":
      return JOB_OPPORTUNITY_ITEMS;
    case "gad-database":
      return GAD_DATABASE_ITEMS;
    case "banaag":
      return BANAAG_ITEMS;
    case "disposal-committee":
      return DISPOSAL_COMMITTEE_ITEMS;
    case "local-government-fund":
      return LOCAL_GOVERNMENT_FUND_ITEMS;
    default:
      return [];
  }
}

export function searchResolutions(items: ResolutionEntry[], query: string): ResolutionEntry[] {
  const q = query.toLowerCase().trim();
  if (!q) return items;
  return items.filter(
    (item) =>
      item.number.toLowerCase().includes(q) ||
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.date.toLowerCase().includes(q)
  );
}

export function searchTableItems(items: TableDisclosureItem[], query: string): TableDisclosureItem[] {
  const q = query.toLowerCase().trim();
  if (!q) return items;
  return items.filter(
    (item) =>
      item.reference.toLowerCase().includes(q) ||
      item.title.toLowerCase().includes(q) ||
      item.datePosted.toLowerCase().includes(q)
  );
}

export const TABLE_COLUMNS = {
  bids: [
    { key: "reference" as const, label: { en: "Reference", fil: "Reference" } },
    { key: "title" as const, label: { en: "Title", fil: "Pamagat" } },
  ],
  jobs: [
    { key: "datePosted" as const, label: { en: "Date Posted", fil: "Petsa" } },
    { key: "title" as const, label: { en: "Position Title", fil: "Posisyon" } },
  ],
  gad: [
    { key: "reference" as const, label: { en: "Category", fil: "Kategorya" } },
    { key: "title" as const, label: { en: "Document", fil: "Dokumento" } },
  ],
  banaag: [
    { key: "title" as const, label: { en: "Issue", fil: "Isyu" } },
    { key: "datePosted" as const, label: { en: "Period", fil: "Panahon" } },
  ],
  disposal: [
    { key: "reference" as const, label: { en: "Reference", fil: "Reference" } },
    { key: "title" as const, label: { en: "Title", fil: "Pamagat" } },
  ],
  lgf: [
    { key: "reference" as const, label: { en: "Reference", fil: "Reference" } },
    { key: "title" as const, label: { en: "Report", fil: "Ulat" } },
  ],
};

export function getSectionById(id: string): DisclosureSection | undefined {
  return DISCLOSURE_SECTIONS.find((s) => s.id === id);
}

export function searchDocuments(docs: DisclosureDocument[], query: string): DisclosureDocument[] {
  const q = query.toLowerCase().trim();
  if (!q) return docs;
  return docs.filter(
    (d) =>
      d.title.toLowerCase().includes(q) ||
      d.description?.toLowerCase().includes(q) ||
      d.category?.toLowerCase().includes(q)
  );
}
