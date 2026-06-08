import { disclosurePdfUrl } from "./disclosure-url";
import type { DisclosureDocument, ResolutionEntry, TableDisclosureItem } from "./full-disclosure";

export type { ResolutionEntry };

import eoData from "./generated/executive-orders.json";
import resData from "./generated/resolutions.json";
import bidsData from "./generated/bids-awards.json";
import ordData from "./generated/ordinances.json";

type RawEo = {
  id: string;
  title: string;
  postedDate: string;
  year: number;
  pdfPath: string;
  number: string;
};

type RawRes = {
  id: string;
  number: string;
  date: string;
  title: string;
  description: string;
};

type RawBid = {
  id: string;
  reference: string;
  title: string;
  datePosted: string;
  pdfPath: string;
};

type RawOrd = {
  id: string;
  number: string;
  title: string;
  enacted: string;
  approved: string;
};

export interface OrdinanceEntry {
  id: string;
  number: string;
  title: string;
  enacted: string;
  approved: string;
}

export const EXECUTIVE_ORDER_YEARS = [2026, 2025, 2024, 2023, 2022] as const;

export const RESOLUTION_ARCHIVE_OPTIONS = [
  { id: "current", label: "5th Term 2025" },
  { id: "2024", label: "5th Term 2024" },
  { id: "2023", label: "5th Term 2023" },
  { id: "5th-2022", label: "5th Term 2022" },
  { id: "4th-2022", label: "4th Term 2022" },
  { id: "2020", label: "2020" },
  { id: "2019-4th", label: "4th Term 2019" },
  { id: "2019-3rd", label: "3rd Term 2019" },
  { id: "2018", label: "2018" },
  { id: "2017", label: "2017" },
  { id: "2016", label: "2016" },
  { id: "2015", label: "2015" },
  { id: "2014", label: "2014" },
  { id: "2013", label: "2013" },
  { id: "2012", label: "2012" },
  { id: "2011", label: "2011" },
  { id: "2010", label: "2010" },
  { id: "2009", label: "2009" },
  { id: "2008", label: "2008" },
  { id: "2007", label: "2007" },
  { id: "2006", label: "2006" },
  { id: "2005", label: "2005" },
  { id: "2003-2004", label: "2003–2004" },
  { id: "2001-2002", label: "2001–2002" },
  { id: "1996-2000", label: "1996–2000" },
  { id: "1991-1995", label: "1991–1995" },
  { id: "1986-1990", label: "1986–1990" },
  { id: "1980-1985", label: "1980–1985" },
] as const;

export const ORDINANCE_RANGES = [
  { id: "2011-2024", label: "2011 – 2024", description: "City ordinances from 2011 to present" },
  { id: "1919-2010", label: "1919 – 2010", description: "Historical city ordinances archive" },
] as const;

function mapEo(items: RawEo[]): DisclosureDocument[] {
  return items.map((item) => ({
    id: item.id,
    title: item.title,
    pdfUrl: disclosurePdfUrl(item.pdfPath),
    postedDate: item.postedDate,
    year: item.year,
    category: `EO ${item.number}`,
  }));
}

function mapRes(items: RawRes[]): ResolutionEntry[] {
  return items.map((item) => ({
    id: item.id,
    number: item.number,
    date: item.date,
    title: item.title,
    description: item.description,
  }));
}

function mapBids(items: RawBid[]): TableDisclosureItem[] {
  return items.map((item) => ({
    id: item.id,
    reference: item.reference,
    title: item.title,
    datePosted: item.datePosted,
    pdfUrl: disclosurePdfUrl(item.pdfPath),
  }));
}

function mapOrd(items: RawOrd[]): OrdinanceEntry[] {
  return items.map((item) => ({
    id: item.id,
    number: item.number,
    title: item.title,
    enacted: item.enacted,
    approved: item.approved,
  }));
}

/** Exclude table header rows and other placeholder entries from scraped ordinance data. */
export function isAvailableOrdinance(item: OrdinanceEntry): boolean {
  const number = item.number.trim();
  const title = item.title.trim();
  const enacted = item.enacted.trim();
  const approved = item.approved.trim();

  if (!number || !title) return false;
  if (/^ordinance no\.?$/i.test(number) && /^subject$/i.test(title)) return false;
  if (/^ordinance no\.?$/i.test(number)) return false;
  if (/^subject$/i.test(title)) return false;
  if (/^date enacted$/i.test(enacted) || /^date approved$/i.test(approved)) return false;

  return true;
}

function filterAvailableOrdinances(items: OrdinanceEntry[]): OrdinanceEntry[] {
  return items.filter(isAvailableOrdinance);
}

function asArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? value : [];
}

const eoByYear = eoData as Record<string, unknown>;
const resByArchive = resData as Record<string, unknown>;
const ordByRange = ordData as Record<string, unknown>;

export function getExecutiveOrdersByYear(year: number): DisclosureDocument[] {
  return mapEo(asArray<RawEo>(eoByYear[String(year)]));
}

export function getExecutiveOrderYearCounts(): Record<number, number> {
  return EXECUTIVE_ORDER_YEARS.reduce(
    (acc, year) => {
      acc[year] = getExecutiveOrdersByYear(year).length;
      return acc;
    },
    {} as Record<number, number>
  );
}

export function getResolutionsByArchive(archiveId: string): ResolutionEntry[] {
  return mapRes(asArray<RawRes>(resByArchive[archiveId]));
}

export function getBidsAwardsItems(): TableDisclosureItem[] {
  return mapBids(bidsData as RawBid[]);
}

export function getOrdinancesByRange(rangeId: string): OrdinanceEntry[] {
  return filterAvailableOrdinances(mapOrd(asArray<RawOrd>(ordByRange[rangeId])));
}

export function getOrdinanceRangeCounts(): Record<string, number> {
  return ORDINANCE_RANGES.reduce(
    (acc, range) => {
      acc[range.id] = getOrdinancesByRange(range.id).length;
      return acc;
    },
    {} as Record<string, number>
  );
}

export function searchOrdinances(items: OrdinanceEntry[], query: string): OrdinanceEntry[] {
  const q = query.toLowerCase().trim();
  if (!q) return items;
  return items.filter(
    (item) =>
      item.number.toLowerCase().includes(q) ||
      item.title.toLowerCase().includes(q) ||
      item.enacted.toLowerCase().includes(q) ||
      item.approved.toLowerCase().includes(q)
  );
}
