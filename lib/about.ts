import { CONTACT, HERO_IMAGE_URL, NEWS_ITEMS, SITE_URL } from "@/lib/constants";
import type { LocalizedString } from "@/lib/i18n";

export const ABOUT_HERO_IMAGE = `${SITE_URL}/Media/Carousel_BattleOfImus.jpg`;

export const ABOUT_SIDEBAR_LINKS = [
  {
    id: "our-city",
    label: { en: "Our City", fil: "Ating Lungsod" },
    href: "/about",
    icon: "home" as const,
  },
  {
    id: "government",
    label: { en: "The City Government", fil: "Pamahalaang Lungsod" },
    href: "/about/government",
    icon: "landmark" as const,
  },
  {
    id: "departments",
    label: { en: "Departments & Offices", fil: "Mga Departamento at Tanggapan" },
    href: "/about/departments",
    icon: "building" as const,
  },
  {
    id: "osca",
    label: { en: "Directory (OSCA)", fil: "Directory (OSCA)" },
    href: "/forms/osca-application",
    icon: "users" as const,
  },
  {
    id: "invest",
    label: { en: "Invest in Imus", fil: "Mag-invest sa Imus" },
    href: CONTACT.eboss,
    external: true as const,
    icon: "briefcase" as const,
  },
  {
    id: "news",
    label: { en: "News & Updates", fil: "Balita at Updates" },
    href: "/news",
    icon: "newspaper" as const,
  },
];

export const ABOUT_QUICK_LINKS = [
  {
    id: "profile",
    label: { en: "City Profile (Full Report)", fil: "Profile ng Lungsod (Buong Ulat)" },
    description: {
      en: "View detailed information and statistics about Imus City.",
      fil: "Tingnan ang detalyadong impormasyon at estadistika tungkol sa Lungsod ng Imus.",
    },
    href: "/about/profile",
    icon: "file-text" as const,
  },
  {
    id: "transparency",
    label: { en: "Transparency Seal", fil: "Transparency Seal" },
    description: {
      en: "Explore our commitment to transparency, accountability, and good governance.",
      fil: "Tuklasin ang aming pangako sa transparency, accountability, at mabuting pamamahala.",
    },
    href: "/full-disclosure",
    icon: "shield" as const,
  },
  {
    id: "ordinances",
    label: { en: "Local Laws & Ordinances", fil: "Mga Batas at Ordinansa" },
    description: {
      en: "Browse local ordinances, resolutions, and city regulations.",
      fil: "Mag-browse ng mga ordinansa, resolusyon, at regulasyon ng lungsod.",
    },
    href: "/full-disclosure/ordinances",
    icon: "scale" as const,
  },
];

export const ABOUT_INTRO = {
  title: { en: "A Fast-Growing City with a Heart", fil: "Isang Mabilis na Lumalagong Lungsod na may Puso" },
  paragraphs: [
    {
      en: "The City of Imus is a landlocked city in Cavite, proudly known as the Flag Capital of the Philippines — where the historic Battle of Imus took place in 1891. From its revolutionary heritage to today's modern City Government Center, Imus blends rich culture, history, and genuine Imuseño hospitality.",
      fil: "Ang Lungsod ng Imus ay isang landlocked na lungsod sa Cavite, kilala bilang Flag Capital of the Philippines — kung saan naganap ang makasaysayang Labanan ng Imus noong 1891. Mula sa pamana ng rebolusyon hanggang sa modernong City Government Center, pinagsasama ng Imus ang mayamang kultura, kasaysayan, at hospitality ng mga Imuseño.",
    },
    {
      en: "Welcome to the City of Imus! Explore our official website where we showcase our commitment to good governance and transparency. Here you'll find essential information about our programs, services, and projects aligned with our mission — AAngat ang Imus.",
      fil: "Maligayang pagdating sa Lungsod ng Imus! Tuklasin ang aming opisyal na website kung saan ipinapakita ang aming pangako sa mabuting pamamahala at transparency. Makikita rito ang mahahalagang impormasyon tungkol sa aming mga programa, serbisyo, at proyekto — AAngat ang Imus.",
    },
  ] as LocalizedString[],
};

export const ABOUT_GLANCE_STATS = [
  {
    value: 539743,
    decimals: 0,
    suffix: "",
    label: { en: "Population", fil: "Populasyon" },
    sublabel: { en: "as of 2020 Census", fil: "ayon sa Census 2020" },
    icon: "users" as const,
  },
  {
    value: 101.56,
    decimals: 2,
    suffix: "",
    label: { en: "Population Density", fil: "Densidad ng Populasyon" },
    sublabel: { en: "persons per sq. km", fil: "tao bawat sq. km" },
    icon: "map" as const,
  },
  {
    value: 130814,
    decimals: 0,
    suffix: "",
    label: { en: "Households", fil: "Sambahayan" },
    sublabel: { en: "estimated number of households", fil: "tinatayang bilang ng sambahayan" },
    icon: "home" as const,
  },
  {
    value: 4.24,
    decimals: 2,
    suffix: "%",
    label: { en: "Population Growth Rate", fil: "Rate ng Paglago ng Populasyon" },
    sublabel: { en: "(2015–2020)", fil: "(2015–2020)" },
    icon: "trending" as const,
  },
  {
    value: 97,
    decimals: 0,
    suffix: "",
    label: { en: "Barangays", fil: "Barangay" },
    sublabel: { en: "across Imus City", fil: "sa buong Lungsod ng Imus" },
    icon: "building" as const,
  },
];

export const ABOUT_NEWS_PREVIEW = NEWS_ITEMS.slice(0, 3).map((item, index) => ({
  ...item,
  category:
    index === 0
      ? ({ en: "Announcement", fil: "Anunsyo" } as LocalizedString)
      : index === 1
        ? ({ en: "Infrastructure", fil: "Imprastraktura" } as LocalizedString)
        : ({ en: "Community", fil: "Komunidad" } as LocalizedString),
}));

export const ABOUT_HERO = {
  title: { en: "A City Built for You", fil: "Isang Lungsod na Ginawa para sa Iyo" },
  subtitle: {
    en: "Progressive. Resilient. People-centered.",
    fil: "Progresibo. Matatag. Nakatuon sa mamamayan.",
  },
};

export const GOVERNMENT_HERO = {
  title: { en: "The City Government", fil: "Pamahalaang Lungsod" },
  subtitle: {
    en: "Serving Imuseños with integrity, transparency, and accountable governance.",
    fil: "Naglilingkod sa mga Imuseño nang may integridad, transparency, at accountable na pamamahala.",
  },
};

export const MAYOR_PROFILE = {
  bio: {
    en: 'Alex Lacson Advincula, popularly known as "AA," represents transparency and accountable governance. Born in Tanzang Luma, Imus, Cavite, he served as Municipal Councilor, Board Member, and Representative of the Third District of Cavite. As Congressman, he established Ospital ng Imus, the City of Imus Grandstand, and the modern Imus LTO building. Elected City Mayor in 2022 and re-elected in 2025, Mayor AA leads Imus through an Eight-Point Agenda for health, education, infrastructure, peace and order, economic development, good governance, social services, and disaster resilience.',
    fil: 'Si Alex Lacson Advincula, kilala bilang "AA," ay kumakatawan sa transparency at accountable na pamamahala. Ipinanganak sa Tanzang Luma, Imus, Cavite, nagsilbi siya bilang Municipal Councilor, Board Member, at Kinatawan ng Third District ng Cavite. Bilang Kongresista, itinatag niya ang Ospital ng Imus, City of Imus Grandstand, at modernong gusali ng Imus LTO. Nahalal na Punong Lungsod noong 2022 at muling nahalal noong 2025, pinamumunuan ni Mayor AA ang Imus sa pamamagitan ng Eight-Point Agenda.',
  },
  agenda: [
    { en: "Health", fil: "Kalusugan" },
    { en: "Education", fil: "Edukasyon" },
    { en: "Infrastructure Development", fil: "Pag-unlad ng Imprastraktura" },
    { en: "Peace and Order & Public Safety", fil: "Kapayapaan at Kaayusan" },
    { en: "Economic Development", fil: "Pag-unlad ng Ekonomiya" },
    { en: "Good Governance", fil: "Mabuting Pamamahala" },
    { en: "Social Services", fil: "Serbisyong Panlipunan" },
    { en: "Environment & Disaster Risk Reduction", fil: "Kapaligiran at Disaster Risk Reduction" },
  ] as LocalizedString[],
};

export const COUNCIL_INFO = {
  viceMayor: {
    en: 'Homer Topacio Saquilayan "Saki"',
    fil: 'Homer Topacio Saquilayan "Saki"',
  },
  viceMayorTitle: { en: "City Vice Mayor", fil: "Bise Punong Lungsod" },
  viceMayorBio: {
    en: 'Homer Topacio Saquilayan serves as Vice Mayor of Imus City, working alongside Mayor Alex "AA" Advincula. A civil engineer by profession, he previously served as Mayor of Imus and Cavite Provincial Board Member before his election as Vice Mayor in 2022.',
    fil: 'Si Homer Topacio Saquilayan ay nagsisilbing Bise Punong Lungsod ng Imus, kasama si Mayor Alex "AA" Advincula. Isang inhinyerong sibil, nagsilbi rin siya bilang Mayor ng Imus at Board Member ng Cavite bago mahalal bilang Bise Punong Lungsod noong 2022.',
  },
  memberCount: 12,
  image: `${SITE_URL}/Media/newcityhall.jpg`,
  responsibilities: [
    {
      en: "Enacts city ordinances and resolutions for Imus",
      fil: "Nagpapatupad ng mga ordinansa at resolusyon para sa Imus",
    },
    {
      en: "Oversees legislative committees on health, finance, infrastructure, and more",
      fil: "Namamahala sa mga komite sa kalusugan, pananalapi, imprastraktura, at iba pa",
    },
    {
      en: "Works with the City Mayor to serve every Imuseño",
      fil: "Nakikipagtulungan sa Punong Lungsod para sa bawat Imuseño",
    },
  ] as LocalizedString[],
};

export { HERO_IMAGE_URL, CONTACT };
