import pastMayorsData from "@/lib/generated/past-mayors.json";
import { SITE_URL } from "@/lib/constants";
import type { LocalizedString } from "@/lib/i18n";

export interface PastMayorEntry {
  name: string | null;
  status: string | null;
  year: string;
}

export const PAST_MAYORS = pastMayorsData as PastMayorEntry[];

export const PAST_MAYORS_HERO = {
  title: { en: "Past Mayors", fil: "Mga Dating Mayor" },
  subtitle: {
    en: "A record of municipal and city leaders who have served Imus through the years.",
    fil: "Talaan ng mga pinuno ng munisipyo at lungsod na naglingkod sa Imus sa mga nakaraang taon.",
  },
} as const satisfies Record<string, LocalizedString>;

export const PAST_MAYORS_IMAGE = `${SITE_URL}/Media/LIST%20OF%20MAYORS.png`;

export const PAST_MAYORS_SOURCE = "Source: CPDO";
