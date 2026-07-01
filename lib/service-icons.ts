import {
  Store,
  Flame,
  IdCard,
  Building2,
  Map,
  Scale,
  FileText,
  Heart,
  HeartHandshake,
  Accessibility,
  HardHat,
  ScrollText,
  Baby,
  FileCheck,
  Car,
  Home,
  ClipboardList,
  Landmark,
  Users,
  Briefcase,
  type LucideIcon,
} from "lucide-react";

export type ServiceIconSize = "sm" | "md" | "lg";

export interface ServiceIconStyle {
  icon: LucideIcon;
  /** Tailwind background classes */
  bg: string;
  /** Tailwind text/icon color classes */
  color: string;
  /** Optional ring for mockup-style badge */
  ring?: string;
}

const CATEGORY_STYLES: Record<string, ServiceIconStyle> = {
  bfp: { icon: Flame, bg: "bg-red-100", color: "text-red-600", ring: "ring-red-200" },
  bplo: { icon: Store, bg: "bg-blue-100", color: "text-blue-600", ring: "ring-blue-200" },
  ccr: { icon: IdCard, bg: "bg-violet-100", color: "text-violet-600", ring: "ring-violet-200" },
  clo: { icon: Scale, bg: "bg-indigo-100", color: "text-indigo-600", ring: "ring-indigo-200" },
  cpdo: { icon: Map, bg: "bg-teal-100", color: "text-teal-600", ring: "ring-teal-200" },
  obo: { icon: HardHat, bg: "bg-orange-100", color: "text-orange-600", ring: "ring-orange-200" },
  osca: { icon: HeartHandshake, bg: "bg-tenant-green/15", color: "text-tenant-greenDark", ring: "ring-tenant-green/25" },
  pdao: { icon: Accessibility, bg: "bg-emerald-100", color: "text-emerald-600", ring: "ring-emerald-200" },
};

/** Per-form slug overrides for distinctive mini logos */
const SLUG_STYLES: Record<string, ServiceIconStyle> = {
  "business-permit-application": { icon: Store, bg: "bg-blue-100", color: "text-blue-600", ring: "ring-blue-200" },
  "fire-station-application": { icon: Flame, bg: "bg-red-100", color: "text-red-600", ring: "ring-red-200" },
  "birth-certificate-application": { icon: Baby, bg: "bg-pink-100", color: "text-pink-600", ring: "ring-pink-200" },
  "death-certificate-application": { icon: ScrollText, bg: "bg-slate-100", color: "text-slate-600", ring: "ring-slate-200" },
  "marriage-certificate-application": { icon: Heart, bg: "bg-rose-100", color: "text-rose-600", ring: "ring-rose-200" },
  "marriage-license": { icon: Heart, bg: "bg-rose-100", color: "text-rose-600", ring: "ring-rose-200" },
  "cenomar-application": { icon: FileCheck, bg: "bg-fuchsia-100", color: "text-fuchsia-600", ring: "ring-fuchsia-200" },
  "civil-registry-application": { icon: IdCard, bg: "bg-violet-100", color: "text-violet-600", ring: "ring-violet-200" },
  "late-registration": { icon: ClipboardList, bg: "bg-purple-100", color: "text-purple-600", ring: "ring-purple-200" },
  "building-permit-application": { icon: HardHat, bg: "bg-orange-100", color: "text-orange-600", ring: "ring-orange-200" },
  "certificate-of-occupancy": { icon: Building2, bg: "bg-tenant-green/15", color: "text-tenant-greenDark", ring: "ring-tenant-green/25" },
  "ancillary-permit-application": { icon: Landmark, bg: "bg-tenant-green/15", color: "text-tenant-greenDark", ring: "ring-tenant-green/25" },
  "zoning-certification": { icon: Map, bg: "bg-teal-100", color: "text-teal-600", ring: "ring-teal-200" },
  "zoning-application": { icon: Map, bg: "bg-cyan-100", color: "text-cyan-600", ring: "ring-cyan-200" },
  "subdivision-approval": { icon: Home, bg: "bg-lime-100", color: "text-lime-700", ring: "ring-lime-200" },
  "affidavit-application": { icon: Scale, bg: "bg-indigo-100", color: "text-indigo-600", ring: "ring-indigo-200" },
  "legal-document-application": { icon: FileText, bg: "bg-indigo-100", color: "text-indigo-600", ring: "ring-indigo-200" },
  "contract-of-lease": { icon: Home, bg: "bg-sky-100", color: "text-sky-600", ring: "ring-sky-200" },
  "deed-of-sale-motor-vehicle": { icon: Car, bg: "bg-gray-100", color: "text-gray-700", ring: "ring-gray-200" },
  "osca-application": { icon: HeartHandshake, bg: "bg-tenant-green/15", color: "text-tenant-greenDark", ring: "ring-tenant-green/25" },
  "pdao-application": { icon: Accessibility, bg: "bg-emerald-100", color: "text-emerald-600", ring: "ring-emerald-200" },
};

const SLUG_PREFIX_STYLES: { prefix: string; style: ServiceIconStyle }[] = [
  { prefix: "affidavit-", style: { icon: Scale, bg: "bg-indigo-100", color: "text-indigo-600", ring: "ring-indigo-200" } },
  { prefix: "requirements-", style: { icon: ClipboardList, bg: "bg-slate-100", color: "text-slate-600", ring: "ring-slate-200" } },
];

export const AUDIENCE_ICON_STYLES: Record<string, ServiceIconStyle> = {
  citizens: { icon: Users, bg: "bg-blue-100", color: "text-blue-600", ring: "ring-blue-200" },
  businesses: { icon: Briefcase, bg: "bg-sky-100", color: "text-sky-600", ring: "ring-sky-200" },
  construction: { icon: HardHat, bg: "bg-orange-100", color: "text-orange-600", ring: "ring-orange-200" },
  seniors: { icon: HeartHandshake, bg: "bg-tenant-green/15", color: "text-tenant-greenDark", ring: "ring-tenant-green/25" },
  safety: { icon: Flame, bg: "bg-red-100", color: "text-red-600", ring: "ring-red-200" },
};

export const POPULAR_SEARCH_ICONS: Record<string, ServiceIconStyle> = {
  "Business Permit": { icon: Store, bg: "bg-blue-100", color: "text-blue-600", ring: "ring-blue-200" },
  "Birth Certificate": { icon: Baby, bg: "bg-pink-100", color: "text-pink-600", ring: "ring-pink-200" },
  "Building Permit": { icon: HardHat, bg: "bg-orange-100", color: "text-orange-600", ring: "ring-orange-200" },
  "Fire Safety": { icon: Flame, bg: "bg-red-100", color: "text-red-600", ring: "ring-red-200" },
  "Senior Citizen ID": { icon: HeartHandshake, bg: "bg-tenant-green/15", color: "text-tenant-greenDark", ring: "ring-tenant-green/25" },
};

const SIZE_CLASSES: Record<ServiceIconSize, { box: string; icon: string }> = {
  sm: { box: "h-8 w-8", icon: "h-4 w-4" },
  md: { box: "h-11 w-11", icon: "h-5 w-5" },
  lg: { box: "h-14 w-14", icon: "h-7 w-7" },
};

export function getServiceIconStyle(slug: string, categoryId: string): ServiceIconStyle {
  if (SLUG_STYLES[slug]) return SLUG_STYLES[slug];

  const prefixMatch = SLUG_PREFIX_STYLES.find((p) => slug.startsWith(p.prefix));
  if (prefixMatch) return prefixMatch.style;

  return CATEGORY_STYLES[categoryId] ?? {
    icon: FileText,
    bg: "bg-tenant-sky",
    color: "text-tenant-navy",
    ring: "ring-tenant-skyDark",
  };
}

export function getSizeClasses(size: ServiceIconSize) {
  return SIZE_CLASSES[size];
}
