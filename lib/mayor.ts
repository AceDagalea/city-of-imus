import { MAYOR_PHOTO_URL, SITE_URL } from "@/lib/constants";
import type { LocalizedString } from "@/lib/i18n";
import {
  GraduationCap,
  HardHat,
  HeartPulse,
  Landmark,
  Leaf,
  Shield,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";

/** Formal portrait used on cityofimus.gov.ph/city_mayor.html */
export const MAYOR_PROFILE_PHOTO =
  `${SITE_URL}/City%20Officials%202022/Formal/Mayor%20AA%2016x20%20v3.jpg`;

/** Fallback standing photo used on the homepage */
export const MAYOR_STANDING_PHOTO = MAYOR_PHOTO_URL;

export const MAYOR_DISPLAY_NAME = 'Hon. Alex "AA" L. Advincula';

export const MAYOR_TAGLINE = {
  en: "A leader committed to transparency, accountability, and progress for every Imuseño.",
  fil: "Isang lider na nakatuon sa transparency, accountability, at pag-unlad para sa bawat Imuseño.",
};

export const MAYOR_TERM = {
  years: { en: "2025 – 2028", fil: "2025 – 2028" },
  label: { en: "2nd Term", fil: "Ikalawang Termino" },
  officeLabel: { en: "Term of Office", fil: "Termino ng Paglilingkod" },
};

/** Full biography from https://www.cityofimus.gov.ph/city_mayor.html */
export const MAYOR_BIO_PARAGRAPHS: LocalizedString[] = [
  {
    en: 'Alex Lacson Advincula, popularly known as "AA," represents transparency and accountable governance. He was born on December 28, 1969 to Leticia Lacson and Anastacio Advincula in Tanzang Luma, Imus, Cavite.',
    fil: 'Si Alex Lacson Advincula, kilala bilang "AA," ay kumakatawan sa transparency at accountable na pamamahala. Ipinanganak noong Disyembre 28, 1969 kina Leticia Lacson at Anastacio Advincula sa Tanzang Luma, Imus, Cavite.',
  },
  {
    en: "He finished his primary education at the Tanzang Luma Elementary School in 1982 and his secondary education at the Imus Institute in 1986. In college, he took up a Bachelor of Science in Criminology degree at De La Salle University–Dasmariñas from 1986 to 1988. In December 2014, he finished his Bachelor of Science in Entrepreneurial Management degree at the Polytechnic University of the Philippines–Open University System.",
    fil: "Natapos niya ang elementarya sa Tanzang Luma Elementary School noong 1982 at sekundarya sa Imus Institute noong 1986. Sa kolehiyo, kumuha siya ng Bachelor of Science in Criminology sa De La Salle University–Dasmariñas mula 1986 hanggang 1988. Noong Disyembre 2014, natapos niya ang Bachelor of Science in Entrepreneurial Management sa Polytechnic University of the Philippines–Open University System.",
  },
  {
    en: "AA is a former Municipal Councilor, Board Member, and Representative of the Third District of Cavite. During his term as Congressman, Advincula brought progressive programs and projects for the growth and development of Imus. Among these are the establishment of Ospital ng Imus, the first public hospital in the City, the construction of the City of Imus Grandstand, and the relocation of the Imus Land Transportation Office into a modern building, making it the second biggest satellite office of the agency.",
    fil: "Si AA ay dating Municipal Councilor, Board Member, at Kinatawan ng Third District ng Cavite. Sa kanyang termino bilang Kongresista, nagdala si Advincula ng mga progresibong programa at proyekto para sa pag-unlad ng Imus. Kabilang dito ang pagtatatag ng Ospital ng Imus, ang unang pampublikong ospital sa Lungsod, ang pagtatayo ng City of Imus Grandstand, at ang paglipat ng Imus Land Transportation Office sa isang modernong gusali.",
  },
  {
    en: "In 2022, AA won as the City Mayor of Imus for the first time in his political career. Through his Five-point agenda, he plans to introduce more programs and projects to further improve the lives of every Imuseño.",
    fil: "Noong 2022, nanalo si AA bilang Punong Lungsod ng Imus sa unang pagkakataon sa kanyang karera sa politika. Sa pamamagitan ng kanyang Five-point agenda, plano niyang magpakilala ng mas maraming programa at proyekto para mapabuti ang buhay ng bawat Imuseño.",
  },
  {
    en: "In 2025, AA won his second term, a clear reflection of the continued trust and confidence of the Imuseño in his leadership. From his original 5-point agenda during his first term, AA expanded his vision into an 8-point agenda, demonstrating a broader and more inclusive direction for the city. AA remains committed to delivering genuine and lasting change that uplifts lives and builds a better future for the City of Imus.",
    fil: "Noong 2025, nanalo muli si AA para sa kanyang ikalawang termino, isang malinaw na pagpapakita ng patuloy na tiwala ng mga Imuseño sa kanyang pamumuno. Mula sa orihinal na 5-point agenda sa unang termino, pinalawak ni AA ang kanyang bisyon sa 8-point agenda. Nananatiling nakatuon si AA sa paghahatid ng tunay at pangmatagalang pagbabago para sa Lungsod ng Imus.",
  },
];

export const MAYOR_AGENDA_INTRO = {
  title: { en: "Eight-Point Agenda", fil: "Eight-Point Agenda" },
  subtitle: {
    en: "Guided by his Eight-point agenda, Mayor AA is committed to making progress in Imus and making it one of Cavite's finest cities.",
    fil: "Sa pamamagitan ng Eight-point agenda, nakatuon si Mayor AA sa pag-unlad ng Imus at pagiging isa sa pinakamahusay na lungsod sa Cavite.",
  },
};

export interface MayorAgendaItem {
  id: string;
  label: LocalizedString;
  icon: LucideIcon;
}

export const MAYOR_AGENDA_ITEMS: MayorAgendaItem[] = [
  { id: "health", label: { en: "Health", fil: "Kalusugan" }, icon: HeartPulse },
  { id: "education", label: { en: "Education", fil: "Edukasyon" }, icon: GraduationCap },
  {
    id: "infrastructure",
    label: { en: "Infrastructure Development", fil: "Infrastructure Development" },
    icon: HardHat,
  },
  {
    id: "peace",
    label: { en: "Peace and Order & Public Safety", fil: "Peace and Order & Public Safety" },
    icon: Shield,
  },
  {
    id: "economic",
    label: { en: "Economic Development", fil: "Economic Development" },
    icon: TrendingUp,
  },
  { id: "governance", label: { en: "Good Governance", fil: "Good Governance" }, icon: Landmark },
  { id: "social", label: { en: "Social Services", fil: "Social Services" }, icon: Users },
  {
    id: "environment",
    label: {
      en: "Environment and Disaster Risk Reduction Resilience",
      fil: "Environment and Disaster Risk Reduction Resilience",
    },
    icon: Leaf,
  },
];

export const MAYOR_GOVERNMENT_CTA = {
  title: { en: "City Government", fil: "Pamahalaang Lungsod" },
  body: {
    en: "Learn about the City Council, departments, and offices that serve Imuseños every day.",
    fil: "Alamin ang tungkol sa Sangguniang Panlungsod, mga departamento, at tanggapan na naglilingkod sa mga Imuseño araw-araw.",
  },
  link: { en: "Explore Government", fil: "Tuklasin ang Pamahalaan" },
};
