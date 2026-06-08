import type { LocalizedString } from "@/lib/i18n";
import { CONTACT, HOTLINES, HERO_IMAGE_URL, MAP_EMBED_URL, SEAL_URL } from "@/lib/constants";

export { MAP_EMBED_URL };

export const CONTACT_HERO = {
  subtitle: {
    en: "We're here to help. Reach out to us for inquiries, assistance, and feedback.",
    fil: "Nandito kami para tumulong. Makipag-ugnayan sa amin para sa mga katanungan, tulong, at feedback.",
  },
  image: HERO_IMAGE_URL,
};

export const CONTACT_OFFICE_HOURS: LocalizedString[] = [
  {
    en: "Monday to Thursday: 7:00 AM – 6:00 PM",
    fil: "Lunes hanggang Huwebes: 7:00 AM – 6:00 PM",
  },
  {
    en: "Friday: 7:00 AM – 5:00 PM",
    fil: "Biyernes: 7:00 AM – 5:00 PM",
  },
];

export interface ContactAction {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  cta: LocalizedString;
  href: string;
  icon: "feedback" | "report" | "info" | "directory";
  accent: "green" | "blue" | "teal" | "violet";
}

export const CONTACT_ACTIONS: ContactAction[] = [
  {
    id: "feedback",
    title: { en: "Send Feedback", fil: "Magpadala ng Feedback" },
    description: {
      en: "Share your thoughts and suggestions to help us improve our services.",
      fil: "Ibahagi ang inyong mga saloobin at mungkahi upang mapabuti ang aming mga serbisyo.",
    },
    cta: { en: "Send Feedback", fil: "Magpadala ng Feedback" },
    href: `mailto:${CONTACT.email}?subject=Feedback%20-%20City%20of%20Imus`,
    icon: "feedback",
    accent: "green",
  },
  {
    id: "report",
    title: { en: "Report an Issue", fil: "Mag-ulat ng Isyu" },
    description: {
      en: "Report concerns about city services, infrastructure, or public safety.",
      fil: "Mag-ulat ng mga alalahanin tungkol sa serbisyo, imprastraktura, o kaligtasan.",
    },
    cta: { en: "Report Now", fil: "Mag-ulat Ngayon" },
    href: "/contact#hotlines",
    icon: "report",
    accent: "blue",
  },
  {
    id: "info",
    title: { en: "Request Information", fil: "Humiling ng Impormasyon" },
    description: {
      en: "Request official documents, data, or information from city offices.",
      fil: "Humiling ng opisyal na dokumento, datos, o impormasyon mula sa mga tanggapan.",
    },
    cta: { en: "Submit Request", fil: "Mag-submit ng Request" },
    href: `mailto:${CONTACT.email}?subject=Information%20Request%20-%20City%20of%20Imus`,
    icon: "info",
    accent: "teal",
  },
  {
    id: "directory",
    title: { en: "Contact Directory", fil: "Direktoryo ng Kontak" },
    description: {
      en: "Browse department contacts and service hotlines across the city government.",
      fil: "Tingnan ang mga kontak ng departamento at hotline ng pamahalaang lungsod.",
    },
    cta: { en: "View Directory", fil: "Tingnan ang Direktoryo" },
    href: "/contact#hotlines",
    icon: "directory",
    accent: "violet",
  },
];

export interface FeaturedHotline {
  id: string;
  name: LocalizedString;
  numbers: string[];
  logo?: string;
}

/** Five featured departments shown in the mockup grid. */
export const FEATURED_HOTLINES: FeaturedHotline[] = [
  {
    id: "city-gov",
    name: { en: "City Government of Imus", fil: "Pamahalaang Lungsod ng Imus" },
    numbers: ["(046) 888 9910", "(046) 888 9912", "(046) 888 9911"],
    logo: SEAL_URL,
  },
  {
    id: "cdrrmo",
    name: { en: "CDRRMO", fil: "CDRRMO" },
    numbers: ["(046) 472-2618", "(046) 472-2623", "(046) 472-2625", "0919-069-1703"],
    logo: SEAL_URL,
  },
  {
    id: "health",
    name: { en: "Imus City Health Office", fil: "Imus City Health Office" },
    numbers: ["419-8300 to 07"],
    logo: SEAL_URL,
  },
  {
    id: "pnp",
    name: { en: "Imus City Police Station", fil: "Imus City Police Station" },
    numbers: ["0998-598-5601"],
    logo: SEAL_URL,
  },
  {
    id: "bfp",
    name: { en: "BFP Imus", fil: "BFP Imus" },
    numbers: ["970-5161", "416-3032", "0915-528-3256"],
    logo: SEAL_URL,
  },
];

export const CONTACT_CTA = {
  title: {
    en: "Can't find what you're looking for?",
    fil: "Hindi mahanap ang hinahanap ninyo?",
  },
  subtitle: {
    en: "Our team is ready to assist you with your concerns.",
    fil: "Handa ang aming team na tumulong sa inyong mga alalahanin.",
  },
  cta: { en: "Go to Contact Directory", fil: "Pumunta sa Direktoryo" },
  href: "/contact#hotlines",
};

/** Remaining hotlines below the featured grid. */
export function getAdditionalHotlines() {
  const coveredIds = new Set(["city-gov", "cdrrmo", "ospital", "pnp", "bfp"]);
  return HOTLINES.filter((h) => !coveredIds.has(h.id));
}
