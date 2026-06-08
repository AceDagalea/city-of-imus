import gadData from "./generated/gad.json";

export interface GadDocument {
  id: string;
  title: string;
  category: string;
  datePosted: string;
  pdfUrl: string;
  thumbnail?: string;
  pages: string[];
}

const documents = gadData as GadDocument[];

export function getAllGadDocuments(): GadDocument[] {
  return documents;
}

export function getGadDocumentById(id: string): GadDocument | undefined {
  return documents.find((doc) => doc.id === id);
}

export function getGadHtmlUrl(id: string): string {
  return `/full-disclosure/gad-database/${id}`;
}

export function getGadThumbnail(doc: GadDocument): string {
  return doc.thumbnail ?? doc.pages[0] ?? "";
}

export function getGadPageCount(doc: GadDocument): number {
  return doc.pages.length;
}

export function getGadYears(): string[] {
  const years = new Set(documents.map((doc) => doc.datePosted));
  return Array.from(years).sort((a, b) => Number(b) - Number(a));
}

export function getGadCategories(): string[] {
  const categories = new Set(documents.map((doc) => doc.category));
  return Array.from(categories).sort();
}

export function searchGadDocuments(items: GadDocument[], query: string): GadDocument[] {
  const q = query.toLowerCase().trim();
  if (!q) return items;
  return items.filter(
    (doc) =>
      doc.title.toLowerCase().includes(q) ||
      doc.category.toLowerCase().includes(q) ||
      doc.datePosted.includes(q)
  );
}

export function filterGadByYear(items: GadDocument[], year: string): GadDocument[] {
  if (!year || year === "all") return items;
  return items.filter((doc) => doc.datePosted === year);
}

export function filterGadByCategory(items: GadDocument[], category: string): GadDocument[] {
  if (!category || category === "all") return items;
  return items.filter((doc) => doc.category === category);
}

export function groupGadByYear(items: GadDocument[]): Record<string, GadDocument[]> {
  const grouped: Record<string, GadDocument[]> = {};
  for (const doc of items) {
    if (!grouped[doc.datePosted]) grouped[doc.datePosted] = [];
    grouped[doc.datePosted].push(doc);
  }
  return grouped;
}

export const GAD_PAGE_SIZE = 8;

export function paginateGadDocuments<T>(items: T[], page: number, pageSize = GAD_PAGE_SIZE) {
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

export const GAD_CATEGORY_STYLES: Record<string, string> = {
  Health: "bg-emerald-100 text-emerald-800",
  Demography: "bg-blue-100 text-blue-800",
  Education: "bg-violet-100 text-violet-800",
  CSWDO: "bg-orange-100 text-orange-800",
  OSCA: "bg-imus-navy/10 text-imus-navy",
  PDAO: "bg-teal-100 text-teal-800",
  Publication: "bg-imus-green/15 text-imus-greenDark",
};
