import { CONTACT } from "@/lib/constants";
import type { LocalizedString } from "@/lib/i18n";

/** Promotional video — https://www.youtube.com/watch?v=ROTO4QJJyso&t=75s */
export const INVEST_VIDEO = {
  id: "ROTO4QJJyso",
  startSeconds: 75,
} as const;

export const INVEST_SECTION = {
  title: { en: "Why Invest in Imus?", fil: "Bakit Mag-invest sa Imus?" },
  subtitle: {
    en: "One of the Philippines' most economically dynamic and business-friendly cities.",
    fil: "Isa sa pinakamakinarya at business-friendly na lungsod sa Pilipinas.",
  },
  cta: { en: "Start Your Business", fil: "Simulan ang Negosyo" },
  ctaHref: CONTACT.eboss,
} as const satisfies Record<string, LocalizedString | string>;

export const INVEST_PARAGRAPHS = [
  {
    en: "The City of Imus is recognized as one of the country's most Economically Dynamic Component Cities.",
    fil: "Kilala ang Lungsod ng Imus bilang isa sa pinakamakinarya na Component Cities sa bansa.",
  },
  {
    en: "Geographically located in the Northeastern part of Cavite, Imus is politically subdivided into 97 barangays. Being a highly urbanized city, Imus takes effective and aggressive strides for technological progressions, earning the distinction as one of the most Competitive Cities at the national level.",
    fil: "Matatagpuan sa hilagang-silangan ng Cavite, ang Imus ay nahahati sa 97 barangay. Bilang highly urbanized city, aktibo ang Imus sa teknolohikal na pag-unlad at kinikilala bilang isa sa pinaka-competitive na lungsod sa pambansang antas.",
  },
  {
    en: "The investment climate in the City has attracted multiple investors, both foreign and local. These investments create new jobs, provide high revenue taxes, serve as vehicles for new technologies, and boost earnings from exports.",
    fil: "Ang investment climate ng lungsod ay nakahikayat ng maraming mamumuhunan, lokal man o dayuhan. Lumilikha ang mga ito ng trabaho, nagbibigay ng mataas na buwis, nagdadala ng bagong teknolohiya, at nagpapalakas ng kita mula sa export.",
  },
  {
    en: "Big corporations such as Liwayway Corporation, San Miguel-Yamamura Asia Corporation, and EDS Manufacturing Incorporated-Yazaki have continuously operated in the City. Likewise, several shopping malls have emerged such as Robinsons Place Imus, The District, S&R Membership Shopping, CityMall, Shopwise, Lotus Mall, Puregold, and SM Center Imus.",
    fil: "Malalaking korporasyon tulad ng Liwayway Corporation, San Miguel-Yamamura Asia Corporation, at EDS Manufacturing Incorporated-Yazaki ang patuloy na nag-ooperate sa lungsod. Sumulpot din ang mga shopping mall tulad ng Robinsons Place Imus, The District, S&R Membership Shopping, CityMall, Shopwise, Lotus Mall, Puregold, at SM Center Imus.",
  },
  {
    en: "Committed to supporting its economic enterprises, Imus continues to provide businesses, particularly micro, small, and medium enterprises (MSMEs), with apt learning resources to sustain operations in the new normal with the conduct of talks, trainings, and workshops such as the Imus Seminars of Emerging Entrepreneurs (iSEE), Imus City Business Summit, Business Cliniquing, Business Expo, and E-Talakayan.",
    fil: "Bilang suporta sa mga negosyo, lalo na sa micro, small, and medium enterprises (MSMEs), nag-aalok ang Imus ng talks, trainings, at workshops tulad ng Imus Seminars of Emerging Entrepreneurs (iSEE), Imus City Business Summit, Business Cliniquing, Business Expo, at E-Talakayan.",
  },
] as LocalizedString[];

export const INVEST_PLATFORMS = [
  {
    en: "Business One-Stop Shop (BOSS), which offers ease and convenience for the application and renewal of business permits;",
    fil: "Business One-Stop Shop (BOSS), para sa madali at maginhawang aplikasyon at renewal ng business permits;",
  },
  {
    en: "Go Negosyo Center, which provides a direct link between entrepreneurs and the Department of Trade and Industry (DTI) for business consultations and registration; and",
    fil: "Go Negosyo Center, na nag-uugnay sa mga negosyante at Department of Trade and Industry (DTI) para sa konsultasyon at rehistro; at",
  },
  {
    en: 'Implementing the "Ease of Doing Business Act" which helps simplify business procedures.',
    fil: 'Pagpapatupad ng "Ease of Doing Business Act" na nagpapasimple ng mga proseso ng negosyo.',
  },
] as LocalizedString[];

export const INVEST_CLOSING = {
  en: "The influx of investors who have chosen Imus as their home is a concrete testament that the City's business policies have successfully created and sustained a business-friendly environment, earning Imus City the distinction as one of the most Business Friendly Cities in the Philippines.",
  fil: "Ang pagdagsa ng mga mamumuhunang piniling ang Imus bilang tahanan ay patunay na matagumpay na lumikha at nagpanatili ang mga patakaran ng lungsod ng business-friendly na kapaligiran, kaya kinikilala ang Imus bilang isa sa pinaka Business Friendly Cities sa Pilipinas.",
};
