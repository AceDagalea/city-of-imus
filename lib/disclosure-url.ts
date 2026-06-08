import { SITE_URL } from "./constants";

/** Build an absolute PDF/document URL from a cityofimus.gov.ph path. */
export function disclosurePdfUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${encodeURI(normalized).replace(/#/g, "%23")}`;
}

export function disclosurePageUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}
