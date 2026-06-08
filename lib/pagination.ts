export type PaginationToken = number | "ellipsis";

/** Compact page list: 1 … 4 5 6 … 32 */
export function getPaginationPages(current: number, total: number): PaginationToken[] {
  if (total <= 1) return [1];
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: PaginationToken[] = [1];

  if (current > 3) {
    pages.push("ellipsis");
  }

  const rangeStart = Math.max(2, current - 1);
  const rangeEnd = Math.min(total - 1, current + 1);

  for (let page = rangeStart; page <= rangeEnd; page += 1) {
    pages.push(page);
  }

  if (current < total - 2) {
    pages.push("ellipsis");
  }

  pages.push(total);
  return pages;
}
