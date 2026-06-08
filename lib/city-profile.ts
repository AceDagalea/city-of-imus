import { ABOUT_GLANCE_STATS } from "@/lib/about";
import { SITE_URL } from "@/lib/constants";
import type { LocalizedString } from "@/lib/i18n";

export const CITY_PROFILE_HERO = {
  title: { en: "City Profile", fil: "Profile ng Lungsod" },
  subtitle: {
    en: "Discover the Flag Capital of the Philippines — its people, heritage, and path toward progress.",
    fil: "Tuklasin ang Flag Capital of the Philippines — ang mga tao, pamana, at landas patungo sa pag-unlad.",
  },
};

export const CITY_PROFILE_IMAGE = `${SITE_URL}/Media/IMUS%20PLAZA%20%26%20CATHEDRAL%20AERIAL-2.jpg`;

export const CITY_PROFILE_TAGLINE = {
  en: [
    "A new beginning, a new Imus.",
    "A public service that is people-centered. A government that listens and acts on the needs of every Imuseño.",
    "Committing to sincerity and truthfulness while igniting the spirit of community where no one gets left behind.",
    "Together, we can transform this city, your home, toward real progress.",
  ],
  fil: [
    "Isang bagong simula, isang bagong Imus.",
    "Serbisyong publiko na nakatuon sa mamamayan. Pamahalaang nakikinig at kumikilos sa pangangailangan ng bawat Imuseño.",
    "Nakatuon sa katapatan at pagiging tapat habang pinapasigla ang diwa ng komunidad kung saan walang maiiwan.",
    "Sama-sama, maaari nating baguhin ang lungsod na ito, ang inyong tahanan, patungo sa tunay na pag-unlad.",
  ],
} as const satisfies Record<string, readonly string[]>;

export const CITY_PROFILE_PARAGRAPHS = [
  {
    en: "The City of Imus is the de jure capital of the Province of Cavite. Under the Recollects, it became an independent municipality in 1795. In October 2009, Republic Act 9727 reapportioned Cavite into seven districts making Imus the Third Legislative District.",
    fil: "Ang Lungsod ng Imus ay ang de jure na kabisera ng Lalawigan ng Cavite. Sa ilalim ng mga Recollect, naging independiyenteng munisipalidad ito noong 1795. Noong Oktubre 2009, ang Republic Act 9727 ay nagbahagi muli ng Cavite sa pitong distrito at ginawang Imus ang Third Legislative District.",
  },
  {
    en: "On 12 April 2012, Republic Act 10161 was enacted into law, converting the Municipality of Imus into a City. The people of Imus ratified this later on through a plebiscite on 30 June 2012.",
    fil: "Noong 12 Abril 2012, ang Republic Act 10161 ay naisabatas, na nag-convert sa Munisipalidad ng Imus bilang Lungsod. Pinagtibay ito ng mga Imuseño sa pamamagitan ng plebisito noong 30 Hunyo 2012.",
  },
  {
    en: "The city's rich history is evident in its various heritage sites—the Imus Cathedral, Imus City Plaza, and Imus Heritage Site.",
    fil: "Ang mayamang kasaysayan ng lungsod ay makikita sa iba't ibang heritage site—ang Imus Cathedral, Imus City Plaza, at Imus Heritage Site.",
  },
  {
    en: 'It was also the site of two momentous Katipunero victories during the Philippine Revolution against Spain—The Battle of Imus and the Battle of Alapan, where the first Philippine flag was unfurled and raised, making Imus the "Flag Capital of the Philippines".',
    fil: 'Ito rin ang pinangyarihan ng dalawang makasaysayang tagumpay ng mga Katipunero sa Rebolusyong Pilipino laban sa Espanya—ang Labanan ng Imus at Labanan ng Alapan, kung saan unang inilunsad ang watawat ng Pilipinas, na ginawang Imus ang "Flag Capital of the Philippines".',
  },
] as LocalizedString[];

export const CITY_PROFILE_VISION = {
  en: "The model city in the region, with secured and healthy citizenry, living in a smart, green and sustainable environment in a technology-driven economy, governed with integrity and transparency.",
  fil: "Ang modelong lungsod sa rehiyon, may ligtas at malusog na mamamayan, naninirahan sa matalino, berde at napapanatiling kapaligiran sa technology-driven na ekonomiya, pinamamahalaan nang may integridad at transparency.",
};

export const CITY_PROFILE_MISSION = {
  en: "The City Government of Imus is committed to delivering a transparent, reliable, and efficient public service that is proactive to the needs of its people while actively pursuing development for a dynamic and unified Imus.",
  fil: "Ang Pamahalaang Lungsod ng Imus ay nakatuon sa paghahatid ng transparent, maaasahan, at mahusay na serbisyong publiko na proactive sa pangangailangan ng mga tao habang aktibong isinusulong ang pag-unlad para sa dynamic at nagkakaisang Imus.",
};

export { ABOUT_GLANCE_STATS as CITY_PROFILE_STATS };
