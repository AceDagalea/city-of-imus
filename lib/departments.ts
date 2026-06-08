import departmentsData from "@/lib/generated/departments.json";
import { SITE_URL } from "@/lib/constants";
import type { LocalizedString } from "@/lib/i18n";

export interface DepartmentEntry {
  id: string;
  name: string;
  headOfOffice: string;
  room: string;
  floor: string;
  detailUrl: string | null;
}

export const DEPARTMENTS = departmentsData as DepartmentEntry[];

export const DEPARTMENT_PAGE_SIZE = 12;

export const DEPARTMENT_FLOOR_ORDER = [
  "All Floors",
  "2nd Floor",
  "3rd Floor",
  "4th Floor",
  "5th Floor",
  "LG Floor",
  "UG Floor",
  "Outside Office",
] as const;

export type DepartmentFloorFilter = (typeof DEPARTMENT_FLOOR_ORDER)[number];

const ICON_STYLES = [
  { bg: "bg-blue-100", color: "text-blue-600" },
  { bg: "bg-emerald-100", color: "text-emerald-600" },
  { bg: "bg-violet-100", color: "text-violet-600" },
  { bg: "bg-orange-100", color: "text-orange-600" },
  { bg: "bg-rose-100", color: "text-rose-600" },
  { bg: "bg-cyan-100", color: "text-cyan-600" },
  { bg: "bg-indigo-100", color: "text-indigo-600" },
  { bg: "bg-teal-100", color: "text-teal-600" },
];

export function getDepartmentIconStyle(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash + id.charCodeAt(i)) % ICON_STYLES.length;
  return ICON_STYLES[hash];
}

export function filterDepartments(
  items: DepartmentEntry[],
  query: string,
  floor: DepartmentFloorFilter
) {
  const q = query.trim().toLowerCase();
  return items.filter((item) => {
    const matchesFloor = floor === "All Floors" || item.floor === floor;
    if (!matchesFloor) return false;
    if (!q) return true;
    return (
      item.name.toLowerCase().includes(q) ||
      item.headOfOffice.toLowerCase().includes(q) ||
      item.room.toLowerCase().includes(q) ||
      item.floor.toLowerCase().includes(q)
    );
  });
}

export const EXPLORE_GOVERNMENT_LINKS = [
  { id: "profile", label: { en: "City Profile", fil: "Profile ng Lungsod" }, href: "/about/profile" },
  { id: "government", label: { en: "City Government", fil: "Pamahalaang Lungsod" }, href: "/about/government" },
  {
    id: "departments",
    label: { en: "Departments and Units", fil: "Mga Departamento at Yunit" },
    href: "/about/departments",
  },
  {
    id: "barangay",
    label: { en: "Barangay Officials", fil: "Mga Opisyal ng Barangay" },
    href: "/about/barangay-officials",
  },
  { id: "history", label: { en: "History", fil: "Kasaysayan" }, href: "/about/history" },
  {
    id: "past-mayors",
    label: { en: "Past Mayors", fil: "Mga Dating Mayor" },
    href: "/about/past-mayors",
  },
  { id: "mayor", label: { en: "City Mayor", fil: "Punong Lungsod" }, href: "/about/mayor" },
] as const;

export const DEPARTMENTS_HERO = {
  title: { en: "Departments and Units", fil: "Mga Departamento at Yunit" },
  subtitle: {
    en: "Explore the departments, offices, and units that work together to serve the people of Imus.",
    fil: "Tuklasin ang mga departamento, tanggapan, at yunit na nagtutulungan para maglingkod sa mga Imuseño.",
  },
};

export const DEPARTMENT_INFO = {
  whatIs: {
    title: { en: "What is a Department?", fil: "Ano ang Departamento?" },
    body: {
      en: "City departments and offices carry out programs and services for Imuseños — from permits and health to finance, engineering, and community affairs.",
      fil: "Ang mga departamento at tanggapan ng lungsod ay nagpapatupad ng mga programa at serbisyo para sa mga Imuseño — mula sa permit at kalusugan hanggang pananalapi, engineering, at community affairs.",
    },
  },
  needHelp: {
    title: { en: "Need Help?", fil: "Kailangan ng Tulong?" },
    body: {
      en: "Can't find the office you're looking for? Visit our contact directory for phone numbers and assistance.",
      fil: "Hindi mahanap ang tanggapan na hinahanap mo? Bisitahin ang aming contact directory para sa mga numero at tulong.",
    },
    cta: { en: "Go to Contact Directory", fil: "Pumunta sa Contact Directory" },
  },
} as const satisfies Record<string, Record<string, LocalizedString>>;
