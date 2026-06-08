import barangayData from "@/lib/generated/barangay-officials.json";
import type { LocalizedString } from "@/lib/i18n";

export interface BarangayOfficial {
  barangay: string;
  captain: string;
}

export interface BarangayCluster {
  id: string;
  name: string;
  officials: BarangayOfficial[];
}

export const BARANGAY_CLUSTERS = barangayData as BarangayCluster[];

export const BARANGAY_HERO = {
  title: { en: "Barangay Officials", fil: "Mga Opisyal ng Barangay" },
  subtitle: {
    en: "Directory of barangay captains across Imus City's nine clusters.",
    fil: "Direktoryo ng mga kapitan ng barangay sa siyam na cluster ng Lungsod ng Imus.",
  },
} as const satisfies Record<string, LocalizedString>;
