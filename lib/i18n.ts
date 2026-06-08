export type Language = "en" | "fil";

export type LocalizedString = {
  en: string;
  fil: string;
};

export function t(text: LocalizedString, _lang?: Language): string {
  return text.en;
}

export const STRINGS = {
  tagline: { en: "Flag Capital of the Philippines", fil: "Flag Capital of the Philippines" },
  motto: { en: "AAngat ang Imus", fil: "AAngat ang Imus" },
  cityName: { en: "City of Imus", fil: "Lungsod ng Imus" },
  heroTitle: { en: "Welcome to the City of Imus", fil: "Maligayang Pagdating sa Lungsod ng Imus" },
  exploreServices: { en: "Explore Services", fil: "Tuklasin ang mga Serbisyo" },
  cityNews: { en: "City News", fil: "Balita ng Lungsod" },
  announcements: { en: "Announcements & News", fil: "Mga Anunsyo at Balita" },
  readMore: { en: "Read more", fil: "Basahin pa" },
  cityStatistics: { en: "City Statistics", fil: "Estadistika ng Lungsod" },
  mayorMessage: { en: "Mayor's Message", fil: "Mensahe ng Punong Lungsod" },
  mayorName: { en: 'Alex "AA" L. Advincula', fil: 'Alex "AA" L. Advincula' },
  mayorTitle: { en: "City Mayor", fil: "Punong Lungsod" },
  learnMore: { en: "Learn More", fil: "Alamin Pa" },
  landmarks: { en: "Key Landmarks & Attractions", fil: "Mga Pangunahing Palatandaan" },
  visitUs: { en: "Visit us", fil: "Bisitahin kami" },
  vision: { en: "Vision", fil: "Bisyon" },
  mission: { en: "Mission", fil: "Misyon" },
  visionText: {
    en: "The model city in the region, with secured and healthy citizenry, living in a smart, green and sustainable environment in a technology-driven economy, governed with integrity and transparency.",
    fil: "Ang modelong lungsod sa rehiyon, na may ligtas at malusog na mamamayan, naninirahan sa smart, green at sustainable na kapaligiran sa technology-driven na ekonomiya, pinamamahalaan nang may integridad at transparency.",
  },
  missionText: {
    en: "The City Government of Imus is committed to delivering a transparent, reliable, and efficient public service that is proactive to the needs of its people while actively pursuing development for a dynamic and progressive city.",
    fil: "Ang Pamahalaang Lungsod ng Imus ay nakatuon sa paghahatid ng transparent, maaasahan, at epektibong serbisyong pampubliko na proactive sa mga pangangailangan ng mamamayan habang aktibong isinusulong ang pag-unlad para sa isang dynamic at progresibong lungsod.",
  },
  stayConnected: { en: "Stay Connected", fil: "Manatiling Konektado" },
  findUs: { en: "Find Us", fil: "Hanapin Kami" },
  mayorQuote: {
    en: "Welcome to the City of Imus! Explore our official website where we showcase our commitment to good governance and transparency. Here you'll find essential information, services, and updates for every Imuseño. AAngat ang Imus!",
    fil: "Maligayang pagdating sa Lungsod ng Imus! Tuklasin ang aming opisyal na website kung saan ipinapakita ang aming pangako sa mabuting pamamahala at transparency. AAngat ang Imus!",
  },
  skipToContent: { en: "Skip to main content", fil: "Lumaktaw sa pangunahing nilalaman" },
  search: { en: "Search", fil: "Maghanap" },
  emergency911: { en: "Emergency: 911", fil: "Emergency: 911" },
  servicesTitle: { en: "City Services", fil: "Mga Serbisyo ng Lungsod" },
  servicesSubtitle: {
    en: "Find the services you need, organized by category.",
    fil: "Hanapin ang mga serbisyong kailangan mo, naka-organize ayon sa kategorya.",
  },
  hotlinesTitle: { en: "Emergency & Hotlines", fil: "Emergency at Hotlines" },
  hotlinesSubtitle: {
    en: "Important contact numbers for emergencies and city services.",
    fil: "Mahahalagang numero ng kontak para sa emergency at mga serbisyo ng lungsod.",
  },
  printPage: { en: "Print this page", fil: "I-print ang pahinang ito" },
  footerDescription: {
    en: "Official website of the City of Imus, Cavite — Flag Capital of the Philippines. AAngat ang Imus.",
    fil: "Opisyal na website ng Lungsod ng Imus, Cavite — Flag Capital of the Philippines. AAngat ang Imus.",
  },
  siteMap: { en: "Site Map", fil: "Site Map" },
  governmentLinks: { en: "Government Links", fil: "Mga Link ng Pamahalaan" },
  contactHotlines: { en: "Contact & Hotlines", fil: "Kontak at Hotlines" },
  emergencyHotlines: { en: "Emergency Hotlines", fil: "Emergency Hotlines" },
  copyright: { en: "City of Imus. All rights reserved.", fil: "Lungsod ng Imus. Lahat ng karapatan ay nakalaan." },
  maintainedBy: { en: "Maintained by the City Information Office", fil: "Pinapanatili ng City Information Office" },
  aboutTitle: { en: "About the City of Imus", fil: "Tungkol sa Lungsod ng Imus" },
  newsTitle: { en: "City News & Announcements", fil: "Balita at Anunsyo ng Lungsod" },
};
