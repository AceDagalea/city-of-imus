import type { LucideIcon } from "lucide-react";
import {
  BadgeDollarSign,
  BookOpen,
  Briefcase,
  Eye,
  FileCheck,
  Gavel,
  Landmark,
  Newspaper,
  Package,
  ScrollText,
  Users,
} from "lucide-react";
import banaagData from "./generated/banaag.json";
import bidsDocs from "./generated/bids-docs.json";
import disposalDocs from "./generated/disposal-docs.json";
import eoDocs from "./generated/executive-orders-docs.json";
import financialDocs from "./generated/financial-docs.json";
import gadData from "./generated/gad.json";
import jobsDocs from "./generated/jobs-docs.json";
import lgfDocs from "./generated/lgf-docs.json";
import {
  getOrdinancesByRange,
  getResolutionsByArchive,
  isAvailableOrdinance,
  ORDINANCE_RANGES,
  RESOLUTION_ARCHIVE_OPTIONS,
  type OrdinanceEntry,
} from "./disclosure-generated";
import type { ResolutionEntry } from "./full-disclosure";

export interface GridDocument {
  id: string;
  title: string;
  badge: string;
  datePosted: string;
  year: string;
  pdfUrl?: string;
  thumbnail?: string;
  pages?: string[];
}

export interface GridSectionConfig {
  id: string;
  icon: LucideIcon;
  title: { en: string; fil: string };
  subtitle: { en: string; fil: string };
  searchPlaceholder: { en: string; fil: string };
  readLabel: { en: string; fil: string };
  groupLabel: { en: string; fil: string };
  pageSize?: number;
  categoryFilter?: boolean;
  yearTabs?: { param: string; options: { value: string; label: string }[] };
  archiveTabs?: { param: string; options: { value: string; label: string }[] };
}

export const GRID_PAGE_SIZE = 8;

export type ThumbnailFit = "cover" | "contain" | "icon";

/** Fixed thumbnail area height — keeps cards uniform across sections. */
export const GRID_THUMBNAIL_HEIGHT = "h-52";

export function getThumbnailFit(sectionId: string): ThumbnailFit {
  if (sectionId === "banaag" || sectionId === "gad-database") return "cover";
  if (sectionId === "ordinances" || sectionId === "resolutions") return "icon";
  return "contain";
}

export function showBadgeOnThumbnail(sectionId: string): boolean {
  return sectionId === "banaag" || sectionId === "gad-database";
}

const BADGE_STYLES: Record<string, string> = {
  Health: "bg-emerald-100 text-emerald-800",
  Demography: "bg-blue-100 text-blue-800",
  Education: "bg-violet-100 text-violet-800",
  CSWDO: "bg-orange-100 text-orange-800",
  OSCA: "bg-imus-navy/10 text-imus-navy",
  PDAO: "bg-teal-100 text-teal-800",
  Publication: "bg-imus-green/15 text-imus-greenDark",
  Procurement: "bg-blue-100 text-blue-800",
  Financial: "bg-emerald-100 text-emerald-800",
  "Disaster Management": "bg-orange-100 text-orange-800",
  "Social Services": "bg-violet-100 text-violet-800",
};

export function getBadgeStyle(badge: string): string {
  return BADGE_STYLES[badge] ?? "bg-imus-navy/10 text-imus-navy";
}

function normalizeDoc(item: {
  id: string;
  title: string;
  badge?: string;
  category?: string;
  datePosted: string;
  year?: string;
  pdfUrl?: string;
  thumbnail?: string;
  pages?: string[];
}): GridDocument {
  const year = item.year ?? item.datePosted.match(/\d{4}/)?.[0] ?? item.datePosted;
  return {
    id: item.id,
    title: item.title,
    badge: item.badge ?? item.category ?? "",
    datePosted: item.datePosted,
    year: String(year),
    pdfUrl: item.pdfUrl,
    thumbnail: item.thumbnail ?? item.pages?.[0],
    pages: item.pages,
  };
}

const DOC_LOADERS: Record<string, () => GridDocument[]> = {
  financial: () => (financialDocs as GridDocument[]).map(normalizeDoc),
  "executive-orders": () => (eoDocs as GridDocument[]).map(normalizeDoc),
  "bids-awards": () => (bidsDocs as GridDocument[]).map(normalizeDoc),
  "job-opportunities": () => (jobsDocs as GridDocument[]).map(normalizeDoc),
  "gad-database": () =>
    (gadData as Array<GridDocument & { category: string }>).map((item) =>
      normalizeDoc({ ...item, badge: item.category })
    ),
  banaag: () =>
    (banaagData as Array<GridDocument & { datePosted: string }>).map((item) =>
      normalizeDoc({
        ...item,
        badge: "",
        year: item.id.match(/banaag-(\d{4})/)?.[1] ?? item.datePosted.match(/\d{4}/)?.[0] ?? "2025",
      })
    ),
  "disposal-committee": () => (disposalDocs as GridDocument[]).map(normalizeDoc),
  "local-government-fund": () => (lgfDocs as GridDocument[]).map(normalizeDoc),
};

export const PDF_SECTION_IDS = Object.keys(DOC_LOADERS);

export function getGridDocuments(sectionId: string): GridDocument[] {
  const loader = DOC_LOADERS[sectionId];
  return loader ? loader() : [];
}

export function getGridDocumentById(sectionId: string, id: string): GridDocument | undefined {
  return getGridDocuments(sectionId).find((doc) => doc.id === id);
}

export function getGridHtmlUrl(sectionId: string, id: string): string {
  return `/full-disclosure/${sectionId}/${id}`;
}

export function getGridYears(items: GridDocument[]): string[] {
  return Array.from(new Set(items.map((item) => item.year))).sort((a, b) => Number(b) - Number(a));
}

export function getGridCategories(items: GridDocument[]): string[] {
  return Array.from(new Set(items.map((item) => item.badge).filter(Boolean))).sort();
}

export function searchGridDocuments(items: GridDocument[], query: string): GridDocument[] {
  const q = query.toLowerCase().trim();
  if (!q) return items;
  return items.filter(
    (item) =>
      item.title.toLowerCase().includes(q) ||
      item.badge.toLowerCase().includes(q) ||
      item.datePosted.toLowerCase().includes(q) ||
      item.year.includes(q)
  );
}

export function filterGridByYear(items: GridDocument[], year: string): GridDocument[] {
  if (!year || year === "all") return items;
  return items.filter((item) => item.year === year);
}

export function filterGridByCategory(items: GridDocument[], category: string): GridDocument[] {
  if (!category || category === "all") return items;
  return items.filter((item) => item.badge === category);
}

export function groupGridByYear(items: GridDocument[]): Record<string, GridDocument[]> {
  const grouped: Record<string, GridDocument[]> = {};
  for (const item of items) {
    if (!grouped[item.year]) grouped[item.year] = [];
    grouped[item.year].push(item);
  }
  return grouped;
}

export function paginateGrid<T>(items: T[], page: number, pageSize = GRID_PAGE_SIZE) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * pageSize;
  return {
    items: items.slice(start, start + pageSize),
    currentPage,
    totalPages,
    totalItems: items.length,
  };
}

export const GRID_SECTION_CONFIG: Record<string, GridSectionConfig> = {
  financial: {
    id: "financial",
    icon: Eye,
    title: { en: "Full Disclosure", fil: "Full Disclosure" },
    subtitle: {
      en: "Financial reports, procurement plans, and fund utilization in compliance with the Full Disclosure Policy.",
      fil: "Financial reports, procurement plans, at fund utilization ayon sa Full Disclosure Policy.",
    },
    searchPlaceholder: { en: "Search disclosure documents...", fil: "Maghanap ng mga dokumento..." },
    readLabel: { en: "Read Document", fil: "Basahin ang Dokumento" },
    groupLabel: { en: "Documents", fil: "Mga Dokumento" },
    categoryFilter: true,
  },
  "executive-orders": {
    id: "executive-orders",
    icon: ScrollText,
    title: { en: "Executive Orders", fil: "Executive Orders" },
    subtitle: {
      en: "Executive orders issued by the City Mayor of Imus.",
      fil: "Mga executive order na inilabas ng Punong Lungsod ng Imus.",
    },
    searchPlaceholder: { en: "Search executive orders...", fil: "Maghanap ng executive orders..." },
    readLabel: { en: "Read Order", fil: "Basahin ang Order" },
    groupLabel: { en: "Orders", fil: "Mga Order" },
  },
  "bids-awards": {
    id: "bids-awards",
    icon: BadgeDollarSign,
    title: { en: "Bids & Awards", fil: "Bids & Awards" },
    subtitle: {
      en: "Procurement notices, bid results, and awarded contracts.",
      fil: "Mga procurement notice, bid results, at awarded contracts.",
    },
    searchPlaceholder: { en: "Search bids and awards...", fil: "Maghanap ng bids at awards..." },
    readLabel: { en: "Read Document", fil: "Basahin ang Dokumento" },
    groupLabel: { en: "Documents", fil: "Mga Dokumento" },
    categoryFilter: true,
  },
  "job-opportunities": {
    id: "job-opportunities",
    icon: Briefcase,
    title: { en: "Job Opportunities", fil: "Job Opportunities" },
    subtitle: {
      en: "Current job vacancies and career opportunities at the City Government of Imus.",
      fil: "Mga bakanteng posisyon sa Pamahalaang Lungsod ng Imus.",
    },
    searchPlaceholder: { en: "Search job postings...", fil: "Maghanap ng mga trabaho..." },
    readLabel: { en: "View Posting", fil: "Tingnan ang Posting" },
    groupLabel: { en: "Postings", fil: "Mga Posting" },
  },
  "gad-database": {
    id: "gad-database",
    icon: Users,
    title: { en: "GAD Database", fil: "GAD Database" },
    subtitle: {
      en: "Gender and Development programs, plans, accomplishment reports, and sex-disaggregated data.",
      fil: "Gender and Development programs, plans, accomplishment reports, at sex-disaggregated data.",
    },
    searchPlaceholder: { en: "Search GAD documents...", fil: "Maghanap ng mga dokumento ng GAD..." },
    readLabel: { en: "Read Document", fil: "Basahin ang Dokumento" },
    groupLabel: { en: "Documents", fil: "Mga Dokumento" },
    categoryFilter: true,
  },
  banaag: {
    id: "banaag",
    icon: BookOpen,
    title: { en: "BanAAg", fil: "BanAAg" },
    subtitle: {
      en: "Official city government news, updates, accomplishments and stories about Imus.",
      fil: "Opisyal na balita, updates, accomplishments, at mga kwento tungkol sa Imus.",
    },
    searchPlaceholder: { en: "Search BanAAg issues...", fil: "Maghanap ng mga isyu ng BanAAg..." },
    readLabel: { en: "Read Issue", fil: "Basahin ang Isyu" },
    groupLabel: { en: "Issues", fil: "Mga Isyu" },
  },
  "disposal-committee": {
    id: "disposal-committee",
    icon: Package,
    title: { en: "Disposal Committee Invites", fil: "Disposal Committee Invites" },
    subtitle: {
      en: "Invitations from the Committee on Disposal of unserviceable property.",
      fil: "Mga imbitasyon mula sa Committee on Disposal.",
    },
    searchPlaceholder: { en: "Search disposal invites...", fil: "Maghanap ng disposal invites..." },
    readLabel: { en: "Read Invite", fil: "Basahin ang Imbitasyon" },
    groupLabel: { en: "Invites", fil: "Mga Imbitasyon" },
  },
  "local-government-fund": {
    id: "local-government-fund",
    icon: Landmark,
    title: { en: "Local Government Fund", fil: "Local Government Fund" },
    subtitle: {
      en: "Trust fund reports and local government fund documents.",
      fil: "Mga ulat ng trust fund at local government fund.",
    },
    searchPlaceholder: { en: "Search LGF documents...", fil: "Maghanap ng LGF documents..." },
    readLabel: { en: "Read Document", fil: "Basahin ang Dokumento" },
    groupLabel: { en: "Documents", fil: "Mga Dokumento" },
  },
  ordinances: {
    id: "ordinances",
    icon: Gavel,
    title: { en: "City Ordinances", fil: "Mga Ordinansa" },
    subtitle: {
      en: "Local ordinances enacted by the Sangguniang Panlungsod.",
      fil: "Mga local ordinances na ipinasa ng Sangguniang Panlungsod.",
    },
    searchPlaceholder: { en: "Search ordinances...", fil: "Maghanap ng ordinansa..." },
    readLabel: { en: "View Ordinance", fil: "Tingnan ang Ordinansa" },
    groupLabel: { en: "Ordinances", fil: "Mga Ordinansa" },
  },
  resolutions: {
    id: "resolutions",
    icon: FileCheck,
    title: { en: "Resolutions", fil: "Mga Resolusyon" },
    subtitle: {
      en: "Resolutions passed by the Imus City Council.",
      fil: "Mga resolusyon ng Sangguniang Panlungsod ng Imus.",
    },
    searchPlaceholder: { en: "Search resolutions...", fil: "Maghanap ng resolusyon..." },
    readLabel: { en: "View Resolution", fil: "Tingnan ang Resolusyon" },
    groupLabel: { en: "Resolutions", fil: "Mga Resolusyon" },
  },
};

export function ordinanceToGrid(item: OrdinanceEntry): GridDocument {
  const year = item.number.match(/\d{4}/)?.[0] ?? item.enacted.match(/\d{4}/)?.[0] ?? "—";
  return {
    id: item.id,
    title: item.title,
    badge: item.number,
    datePosted: item.enacted || item.approved || year,
    year,
    pages: [],
  };
}

export function resolutionToGrid(item: ResolutionEntry): GridDocument {
  const year = item.date.match(/\d{4}/)?.[0] ?? "—";
  return {
    id: item.id,
    title: item.description || item.title,
    badge: item.number,
    datePosted: item.date || year,
    year,
    pages: [],
  };
}

export function getOrdinanceGridDocuments(rangeId: string): GridDocument[] {
  return getOrdinancesByRange(rangeId).filter(isAvailableOrdinance).map(ordinanceToGrid);
}

export function getResolutionGridDocuments(archiveId: string): GridDocument[] {
  return getResolutionsByArchive(archiveId).map(resolutionToGrid);
}

export function findOrdinanceById(id: string) {
  for (const range of ORDINANCE_RANGES) {
    const items = getOrdinancesByRange(range.id);
    const found = items.find((item) => item.id === id);
    if (found) return { item: found, grid: ordinanceToGrid(found) };
  }
  return undefined;
}

export function findResolutionById(id: string) {
  for (const archive of RESOLUTION_ARCHIVE_OPTIONS) {
    const items = getResolutionsByArchive(archive.id);
    const found = items.find((item) => item.id === id);
    if (found) return { item: found, grid: resolutionToGrid(found) };
  }
  return undefined;
}

export function getAllGridDocumentParams(): { section: string; id: string }[] {
  const params: { section: string; id: string }[] = [];
  for (const sectionId of PDF_SECTION_IDS) {
    for (const doc of getGridDocuments(sectionId)) {
      params.push({ section: sectionId, id: doc.id });
    }
  }
  for (const range of ORDINANCE_RANGES) {
    for (const doc of getOrdinanceGridDocuments(range.id)) {
      params.push({ section: "ordinances", id: doc.id });
    }
  }
  for (const archive of RESOLUTION_ARCHIVE_OPTIONS) {
    for (const doc of getResolutionGridDocuments(archive.id)) {
      params.push({ section: "resolutions", id: doc.id });
    }
  }
  return params;
}

export { ORDINANCE_RANGES, RESOLUTION_ARCHIVE_OPTIONS };
