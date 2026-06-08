export const SITE_URL = "https://www.cityofimus.gov.ph";
export const LOGO_URL = "/images/imus-logo.png";
export const LOGO_REMOTE_URL = `${SITE_URL}/Media/Logo_City_Government_of_Imus.png`;
export const SEAL_URL = `${SITE_URL}/Media/imus_logo.png`;

export const BRAND_COLORS = {
  navy: "#1A3668",
  green: "#39A843",
  red: "#C8102E",
  accent: "#39A843",
} as const;
export const MAYOR_PHOTO_URL = `${SITE_URL}/Media/MayorStanding.png`;
export const HERO_IMAGE_URL = `${SITE_URL}/Media/newcityhall.jpg`;
export const HERO_VIDEO_URL = `${SITE_URL}/Media/Banner/2026CongratsAthletes1.mp4`;
export const HERO_FALLBACK_URL = `${SITE_URL}/Media/newcityhall.jpg`;

export const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15458.59370753627!2d120.90208883955074!3d14.389741800000023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397d31670229361%3A0x92deb97a2f2bb219!2sNew%20Imus%20City%20Hall!5e0!3m2!1sen!2sus!4v1658285201747!5m2!1sen!2sus";

export const HERO_TAGLINE = {
  en: "City of Imus, City of Hope",
  fil: "Lungsod ng Imus, Lungsod ng Pag-Asa",
};

export const HERO_SUBTITLE = {
  en: "The model city in the region — governed with integrity and transparency, committed to delivering efficient public service for every Imuseño. AAngat ang Imus.",
  fil: "Ang modelong lungsod sa rehiyon — pinamamahalaan nang may integridad at transparency, nakatuon sa epektibong serbisyong pampubliko para sa bawat Imuseño. AAngat ang Imus.",
};

export const CONTACT = {
  address: "Imus Boulevard, Brgy. Malagasang I-G, City of Imus, Cavite",
  hours: "Monday to Thursday, 7:00 AM – 6:00 PM",
  mainLines: ["(046) 888 9910", "(046) 888 9912"],
  emergency: "(046) 888 9911",
  facebook: "https://www.facebook.com/CityofImus",
  facebookTourism: "https://www.facebook.com/ImusCityTourism",
  youtubeId: "xGNOCWXM9pM",
  eboss: "https://egovcityofimus.ph/ebpls/",
  email: "cityofimus@cavite.gov.ph",
  twitter: "https://twitter.com/CityofImus",
};

export const POPULAR_SEARCHES = [
  { label: { en: "Jobs", fil: "Jobs" }, href: "/full-disclosure/job-opportunities" },
  { label: { en: "Scholarships", fil: "Scholarships" }, href: "/news" },
  { label: { en: "Birth Certificate", fil: "Birth Certificate" }, href: "/forms" },
];

export const UPCOMING_EVENTS = [
  {
    id: "1",
    date: "2026-06-12",
    title: { en: "Flag Day Celebration", fil: "Pagdiriwang ng Araw ng Watawat" },
    time: "8:00 AM",
    location: { en: "City Government Center", fil: "City Government Center" },
    href: "/news",
  },
  {
    id: "2",
    date: "2026-06-19",
    title: { en: "Independence Day Program", fil: "Programa sa Araw ng Kalayaan" },
    time: "7:00 AM",
    location: { en: "Imus City Plaza", fil: "Imus City Plaza" },
    href: "/news",
  },
  {
    id: "3",
    date: "2026-06-28",
    title: { en: "City Health Fair", fil: "City Health Fair" },
    time: "9:00 AM – 3:00 PM",
    location: { en: "Ospital ng Imus", fil: "Ospital ng Imus" },
    href: "/contact#hotlines",
  },
];

export const HOTLINES = [
  {
    id: "city-gov",
    icon: "building" as const,
    name: { en: "City Government of Imus", fil: "Pamahalaang Lungsod ng Imus" },
    numbers: [
      { label: "Main Line", number: "(046) 888 9910" },
      { label: "Main Line", number: "(046) 888 9912" },
      { label: "Emergency", number: "(046) 888 9911" },
    ],
  },
  {
    id: "cdrrmo",
    icon: "shield" as const,
    name: { en: "CDRRMO", fil: "CDRRMO" },
    numbers: [
      { label: "Office", number: "(046) 472-2618" },
      { label: "Office", number: "(046) 472-2623" },
      { label: "Office", number: "(046) 472-2625" },
      { label: "Mobile", number: "0919-069-1703" },
    ],
  },
  {
    id: "bfp",
    icon: "flame" as const,
    name: { en: "Bureau of Fire Protection", fil: "Bureau of Fire Protection" },
    numbers: [
      { label: "Hotline", number: "970-5161" },
      { label: "Hotline", number: "416-3032" },
      { label: "Mobile", number: "0915-528-3256" },
    ],
  },
  {
    id: "ospital",
    icon: "heart-pulse" as const,
    name: { en: "Ospital ng Imus", fil: "Ospital ng Imus" },
    numbers: [{ label: "Main", number: "419-8300 to 07" }],
  },
  {
    id: "molab",
    icon: "microscope" as const,
    name: { en: "City Molecular Laboratory", fil: "City Molecular Laboratory" },
    numbers: [{ label: "Office", number: "853-3364" }],
  },
  {
    id: "pnp",
    icon: "shield-check" as const,
    name: { en: "Imus PNP", fil: "Imus PNP" },
    numbers: [{ label: "Hotline", number: "0998-598-5601" }],
  },
];

export const CITY_STATS = [
  { value: 539743, label: { en: "Population", fil: "Populasyon" }, suffix: "" },
  { value: 97, label: { en: "Barangays", fil: "Barangay" }, suffix: "" },
  { value: 130814, label: { en: "Households", fil: "Sambahayan" }, suffix: "" },
  { value: 4.24, label: { en: "Population Growth Rate", fil: "Rate ng Paglago ng Populasyon" }, suffix: "%", decimals: 2 },
  { value: 101.56, label: { en: "Persons/sq.km", fil: "Tao/sq.km" }, suffix: "", decimals: 2 },
];

export const LANDMARKS = [
  {
    title: { en: "City Government Center", fil: "City Government Center" },
    address: "Imus Boulevard, Brgy. Malagasang I-G, City of Imus, Cavite",
    image: `${SITE_URL}/Media/newcityhall.jpg`,
  },
  {
    title: { en: "Battle of Imus Monument", fil: "Monumento ng Labanan sa Imus" },
    address: "Imus, Cavite",
    image: `${SITE_URL}/Media/battleofimus.jpg`,
  },
  {
    title: { en: "Ospital ng Imus", fil: "Ospital ng Imus" },
    address: "Imus, Cavite",
    image: `${SITE_URL}/Media/ospital.jpg`,
  },
  {
    title: { en: "LTO Office", fil: "Tanggapan ng LTO" },
    address: "Imus, Cavite",
    image: `${SITE_URL}/Media/lto.jpg`,
  },
];

export const NAV_ITEMS = [
  { label: { en: "Home", fil: "Home" }, href: "/", children: [] },
  { label: { en: "About Imus", fil: "Tungkol sa Imus" }, href: "/about", children: [] },
  {
    label: { en: "Government", fil: "Pamahalaan" },
    href: "/about/government",
    children: [
      { label: { en: "Mayor's Office", fil: "Tanggapan ng Mayor" }, href: "/about/mayor" },
      { label: { en: "City Council", fil: "Sangguniang Panlungsod" }, href: "/about/government#council" },
      { label: { en: "Departments", fil: "Mga Departamento" }, href: "/about/departments" },
    ],
  },
  {
    label: { en: "Services", fil: "Serbisyo" },
    href: "/forms",
    children: [
      { label: { en: "All Services", fil: "Lahat ng Serbisyo" }, href: "/forms" },
      { label: { en: "eBOSS Portal", fil: "eBOSS Portal" }, href: CONTACT.eboss, external: true },
    ],
  },
  {
    label: { en: "Transparency", fil: "Transparency" },
    href: "/full-disclosure",
    children: [
      { label: { en: "Full Disclosure", fil: "Full Disclosure" }, href: "/full-disclosure" },
      { label: { en: "Bids & Awards", fil: "Bids & Awards" }, href: "/full-disclosure/bids-awards" },
    ],
  },
  {
    label: { en: "News & Events", fil: "Balita at Kaganapan" },
    href: "/news",
    children: [],
  },
  { label: { en: "Contact Us", fil: "Makipag-ugnayan" }, href: "/contact", children: [] },
];

export const FOOTER_COLUMNS = {
  government: {
    title: { en: "Government", fil: "Pamahalaan" },
    links: [
      { label: { en: "Mayor's Office", fil: "Tanggapan ng Mayor" }, href: "/about/mayor" },
      { label: { en: "City Council", fil: "Sangguniang Panlungsod" }, href: "/about/government#council" },
      { label: { en: "Departments", fil: "Mga Departamento" }, href: "/about/departments" },
      { label: { en: "Barangays", fil: "Barangay" }, href: `${SITE_URL}/barangay.html`, external: true },
    ],
  },
  transparency: {
    title: { en: "Transparency", fil: "Transparency" },
    links: [
      { label: { en: "Full Disclosure", fil: "Full Disclosure" }, href: "/full-disclosure" },
      { label: { en: "Bids & Awards", fil: "Bids & Awards" }, href: "/full-disclosure/bids-awards" },
      { label: { en: "Executive Orders", fil: "Executive Orders" }, href: "/full-disclosure/executive-orders" },
      { label: { en: "Ordinances", fil: "Mga Ordinansa" }, href: "/full-disclosure/ordinances" },
      { label: { en: "Resolutions", fil: "Mga Resolusyon" }, href: "/full-disclosure/resolutions" },
      { label: { en: "Job Opportunities", fil: "Job Opportunities" }, href: "/full-disclosure/job-opportunities" },
      { label: { en: "GAD Database", fil: "GAD Database" }, href: "/full-disclosure/gad-database" },
      { label: { en: "BanAAg", fil: "BanAAg" }, href: "/full-disclosure/banaag" },
      { label: { en: "Local Government Fund", fil: "Local Government Fund" }, href: "/full-disclosure/local-government-fund" },
    ],
  },
  resources: {
    title: { en: "Resources", fil: "Resources" },
    links: [
      { label: { en: "Services", fil: "Serbisyo" }, href: "/forms" },
      { label: { en: "Citizen's Charter", fil: "Citizen's Charter" }, href: `${SITE_URL}/citizen's-charter.html`, external: true },
      { label: { en: "Job Opportunities", fil: "Job Opportunities" }, href: `${SITE_URL}/job_opportunities.html`, external: true },
      { label: { en: "Tourism", fil: "Turismo" }, href: "/tourism" },
    ],
  },
};

export const QUICK_ACCESS = [
  { icon: "monitor" as const, label: { en: "Services", fil: "Serbisyo" }, href: "/forms" },
  { icon: "users" as const, label: { en: "Jobs & Careers", fil: "Jobs" }, href: "/full-disclosure/job-opportunities" },
  { icon: "file-text" as const, label: { en: "Full Disclosure", fil: "Full Disclosure" }, href: "/full-disclosure" },
  { icon: "megaphone" as const, label: { en: "Report an Issue", fil: "Mag-ulat" }, href: "/contact#hotlines" },
];

export const QUICK_SERVICES = QUICK_ACCESS;

export const ANNOUNCEMENTS = [
  {
    id: "workweek",
    title: {
      en: "Extended Four-Day Compressed Workweek",
      fil: "Pinalawig na Four-Day Compressed Workweek",
    },
    excerpt: {
      en: "EO No. 029, s. 2026 extends the Four-Day Compressed Workweek until December 25, 2026. City offices open Mon–Thu, 7:00 AM – 6:00 PM.",
      fil: "Ang EO No. 029, s. 2026 ay nagpapalawig ng Four-Day Compressed Workweek hanggang Disyembre 25, 2026.",
    },
    date: "2026-05-11",
    image: `${SITE_URL}/Media/4DayWorkweekJune2026.jpg`,
    href: `${SITE_URL}/executive_order.html`,
    external: true,
    featured: true,
  },
  {
    id: "library",
    title: { en: "Public Library Open for Reviewers", fil: "Bukas ang Library para sa mga Reviewer" },
    excerpt: {
      en: "New Imus City Public Library welcomes State Board Exam reviewers. Lower ground floor, City Government Center. Mon–Thu, 7:00 AM – 6:00 PM.",
      fil: "Malugod na binubuksan ng New Imus City Public Library ang kanilang pinto para sa mga reviewer.",
    },
    date: "2026-01-01",
    image: `${SITE_URL}/Media/library_study.jpg`,
    href: "/news",
  },
];

export const NEWS_ITEMS = [
  {
    id: "1",
    date: "2026-05-13",
    title: { en: "Educational Assistance para sa college students, idinaos", fil: "Educational Assistance para sa college students, idinaos" },
    excerpt: {
      en: "The City Government held an educational assistance program for college students in Imus.",
      fil: "Nagsagawa ang Pamahalaang Lungsod ng educational assistance program para sa mga college student.",
    },
    image: `${SITE_URL}/Media/News/2026_May_EducAssistanceCollegeStudents.jpg`,
    href: `${SITE_URL}/News/2026_May.html#Up_news578`,
    external: true,
    featured: true,
  },
  {
    id: "2",
    date: "2026-05-05",
    title: { en: "Pag-inspeksyon sa Imus Public Market ni Mayor AA", fil: "Pag-inspeksyon sa Imus Public Market ni Mayor AA" },
    excerpt: {
      en: "Mayor Alex Advincula inspected the Imus Public Market to ensure quality services for residents.",
      fil: "Inspeksyon ni Mayor AA sa Imus Public Market para sa de-kalidad na serbisyo.",
    },
    image: `${SITE_URL}/Media/News/2026_May_ImusPublicMarketInspection1.jpg`,
    href: `${SITE_URL}/News/2026_May.html#Up_news577`,
    external: true,
  },
  {
    id: "3",
    date: "2026-05-07",
    title: { en: "665 kalalakihang Imuseño, lumahok sa Libreng Operation Tuli", fil: "665 kalalakihang Imuseño, lumahok sa Libreng Operation Tuli" },
    excerpt: {
      en: "665 young Imuseños participated in the free Operation Tuli program of the City Government.",
      fil: "665 kabataang Imuseño ang lumahok sa Libreng Operation Tuli ng lungsod.",
    },
    image: `${SITE_URL}/Media/News/2026_May_LibrengOprationTuli1.jpg`,
    href: `${SITE_URL}/News/2026_May.html#Up_news576`,
    external: true,
  },
  {
    id: "4",
    date: "2026-03-01",
    title: { en: "3,036 ECCD learners nagsipagtapos ngayong Marso", fil: "3,036 ECCD learners nagsipagtapos" },
    excerpt: {
      en: "3,036 Early Childhood Care and Development learners graduated this March.",
      fil: "3,036 ECCD learners ang nagsipagtapos ngayong Marso.",
    },
    image: `${SITE_URL}/Media/News/2026_March_ECCDLearners.jpg`,
    href: `${SITE_URL}/News/2026_March.html#Up_news557`,
    external: true,
  },
];

export const SERVICE_AUDIENCES = [
  {
    id: "residents",
    label: { en: "For Residents", fil: "Para sa Residente" },
    image: `${SITE_URL}/Media/library_study.jpg`,
    href: "/forms",
    icon: "home",
  },
  {
    id: "business",
    label: { en: "For Businesses", fil: "Para sa Negosyo" },
    image: `${SITE_URL}/Media/EBoss/EBoss_Banner%20(1).jpg`,
    href: CONTACT.eboss,
    external: true,
    icon: "briefcase",
  },
  {
    id: "visitors",
    label: { en: "For Visitors", fil: "Para sa Bisita" },
    image: `${SITE_URL}/Media/Carousel_BattleOfImus.jpg`,
    href: CONTACT.facebookTourism,
    external: true,
    icon: "map",
  },
];

export const SERVICE_CATEGORIES = [
  {
    id: "business",
    title: { en: "Business & Permits", fil: "Negosyo at Permits" },
    services: [
      {
        icon: "briefcase" as const,
        title: { en: "eBOSS Online Business Permits", fil: "eBOSS Online Business Permits" },
        description: {
          en: "Apply for business permits and licenses online through the eBOSS portal.",
          fil: "Mag-apply ng business permits at licenses online sa eBOSS portal.",
        },
        href: CONTACT.eboss,
        external: true,
        featured: true,
      },
      {
        icon: "file-check" as const,
        title: { en: "Online Forms & Applications", fil: "Online Forms at Applications" },
        description: {
          en: "Submit government forms online — building permits, civil registry, affidavits, and more.",
          fil: "Mag-submit ng government forms online — building permits, civil registry, affidavits, at iba pa.",
        },
        href: "/forms",
      },
    ],
  },
  {
    id: "health",
    title: { en: "Health & Medical", fil: "Kalusugan at Medikal" },
    services: [
      {
        icon: "heart-pulse" as const,
        title: { en: "Ospital ng Imus", fil: "Ospital ng Imus" },
        description: {
          en: "City hospital providing comprehensive medical care. Call 419-8300 to 07.",
          fil: "Ospital ng lungsod na nagbibigay ng komprehensibong pangangalagang medikal.",
        },
        href: "tel:4198300",
      },
      {
        icon: "microscope" as const,
        title: { en: "City Molecular Laboratory", fil: "City Molecular Laboratory" },
        description: {
          en: "Laboratory testing services. Contact 853-3364.",
          fil: "Mga serbisyong pagsusuri sa laboratoryo. Tumawag sa 853-3364.",
        },
        href: "tel:8533364",
      },
    ],
  },
  {
    id: "safety",
    title: { en: "Public Safety", fil: "Kaligtasan ng Publiko" },
    services: [
      {
        icon: "shield" as const,
        title: { en: "CDRRMO", fil: "CDRRMO" },
        description: {
          en: "Disaster risk reduction and emergency response coordination.",
          fil: "Koordinasyon sa pagbabawas ng panganib at emergency response.",
        },
        href: "/contact#hotlines",
      },
      {
        icon: "flame" as const,
        title: { en: "Bureau of Fire Protection", fil: "Bureau of Fire Protection" },
        description: {
          en: "Fire emergency response and prevention services.",
          fil: "Serbisyong pang-emergency at pag-iwas sa sunog.",
        },
        href: "/contact#hotlines",
      },
      {
        icon: "shield-check" as const,
        title: { en: "Imus PNP", fil: "Imus PNP" },
        description: {
          en: "Philippine National Police — Imus City. Hotline: 0998-598-5601.",
          fil: "Philippine National Police — Lungsod ng Imus.",
        },
        href: "tel:09985985601",
      },
    ],
  },
  {
    id: "education",
    title: { en: "Education & Libraries", fil: "Edukasyon at Aklatan" },
    services: [
      {
        icon: "book-open" as const,
        title: { en: "Public Library", fil: "Pampublikong Aklatan" },
        description: {
          en: "Access books, resources, and educational programs at the city public library.",
          fil: "Mag-access ng mga aklat at programa sa pampublikong aklatan ng lungsod.",
        },
        href: `${SITE_URL}/library.html`,
        external: true,
      },
    ],
  },
  {
    id: "social",
    title: { en: "Social Services", fil: "Serbisyong Panlipunan" },
    services: [
      {
        icon: "users" as const,
        title: { en: "Social Welfare Services", fil: "Serbisyong Pangkapakanan" },
        description: {
          en: "Assistance programs for indigent families, seniors, and persons with disabilities.",
          fil: "Mga programang tulong para sa mga nangangailangan.",
        },
        href: "/contact",
      },
    ],
  },
  {
    id: "infrastructure",
    title: { en: "Infrastructure", fil: "Imprastraktura" },
    services: [
      {
        icon: "building-2" as const,
        title: { en: "Engineering & Public Works", fil: "Engineering at Public Works" },
        description: {
          en: "Infrastructure projects, road maintenance, and building permits.",
          fil: "Mga proyektong imprastraktura, pagpapanatili ng kalsada, at building permits.",
        },
        href: "/contact",
      },
    ],
  },
];
