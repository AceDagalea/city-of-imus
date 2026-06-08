import banaagData from "./generated/banaag.json";

export interface BanaagIssue {
  id: string;
  title: string;
  datePosted: string;
  pdfUrl: string;
  thumbnail?: string;
  pages: string[];
}

const issues = banaagData as BanaagIssue[];

export function getAllBanaagIssues(): BanaagIssue[] {
  return issues;
}

export function getBanaagIssueById(id: string): BanaagIssue | undefined {
  return issues.find((issue) => issue.id === id);
}

export function getBanaagHtmlUrl(id: string): string {
  return `/full-disclosure/banaag/${id}`;
}

export function getBanaagThumbnail(issue: BanaagIssue): string {
  return issue.thumbnail ?? issue.pages[0] ?? "";
}

export function getBanaagYear(issue: BanaagIssue): string {
  const match = issue.id.match(/banaag-(\d{4})/);
  return match?.[1] ?? "2025";
}

export function getBanaagArticleCount(issue: BanaagIssue): number {
  return Math.max(issue.pages.length - 1, 1);
}

export function getBanaagCardTitle(issue: BanaagIssue): string {
  if (issue.id.endsWith("-h1") || issue.id.endsWith("-h2")) {
    return issue.title;
  }
  return issue.title;
}

export function getBanaagPublishedLabel(issue: BanaagIssue): string {
  return issue.datePosted;
}

export function getBanaagYears(): string[] {
  const years = new Set(issues.map(getBanaagYear));
  return Array.from(years).sort((a, b) => Number(b) - Number(a));
}

export function searchBanaagIssues(items: BanaagIssue[], query: string): BanaagIssue[] {
  const q = query.toLowerCase().trim();
  if (!q) return items;
  return items.filter(
    (issue) =>
      issue.title.toLowerCase().includes(q) ||
      issue.datePosted.toLowerCase().includes(q) ||
      getBanaagYear(issue).includes(q)
  );
}

export function filterBanaagByYear(items: BanaagIssue[], year: string): BanaagIssue[] {
  if (!year || year === "all") return items;
  return items.filter((issue) => getBanaagYear(issue) === year);
}

export function groupBanaagByYear(items: BanaagIssue[]): Record<string, BanaagIssue[]> {
  const grouped: Record<string, BanaagIssue[]> = {};
  for (const issue of items) {
    const year = getBanaagYear(issue);
    if (!grouped[year]) grouped[year] = [];
    grouped[year].push(issue);
  }
  return grouped;
}

export const BANAAG_PAGE_SIZE = 8;

export function paginateBanaagIssues<T>(items: T[], page: number, pageSize = BANAAG_PAGE_SIZE) {
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
