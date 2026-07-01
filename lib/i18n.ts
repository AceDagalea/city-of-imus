export type Language = "en" | "fil";

export type LocalizedString = {
  en: string;
  fil: string;
};

export function t(text: LocalizedString, lang: Language = "en"): string {
  return text[lang] ?? text.en;
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

  // ── National chrome (Republic of the Philippines design system) ──────────
  republicOfPhilippines: { en: "Republic of the Philippines", fil: "Republika ng Pilipinas" },
  language: { en: "Language", fil: "Wika" },
  english: { en: "English", fil: "Ingles" },
  filipino: { en: "Filipino", fil: "Filipino" },
  accessibility: { en: "Accessibility", fil: "Accessibility" },
  textSize: { en: "Text size", fil: "Laki ng teksto" },
  decreaseTextSize: { en: "Decrease text size", fil: "Bawasan ang laki ng teksto" },
  resetTextSize: { en: "Reset text size", fil: "I-reset ang laki ng teksto" },
  increaseTextSize: { en: "Increase text size", fil: "Palakihin ang laki ng teksto" },
  highContrast: { en: "High contrast", fil: "Mataas na kontrast" },
  toggleHighContrast: { en: "Toggle high contrast", fil: "I-toggle ang mataas na kontrast" },

  // ── Transparency seal + footer legal strip ──────────────────────────────
  transparencySeal: { en: "Transparency Seal", fil: "Transparency Seal" },
  transparencySealDesc: {
    en: "Committed to open and accountable governance.",
    fil: "Nakatuon sa bukas at may pananagutang pamamahala.",
  },
  viewTransparency: { en: "View Transparency Seal", fil: "Tingnan ang Transparency Seal" },
  freedomOfInformation: { en: "Freedom of Information", fil: "Freedom of Information" },
  privacyPolicy: { en: "Privacy Policy", fil: "Patakaran sa Privacy" },
  privacyNotice: {
    en: "This site handles personal data in accordance with the Data Privacy Act of 2012 (RA 10173).",
    fil: "Pinangangasiwaan ng site na ito ang personal na datos alinsunod sa Data Privacy Act of 2012 (RA 10173).",
  },
  accessibilityStatement: {
    en: "This website aims to conform with WCAG 2.1 AA accessibility standards for government websites.",
    fil: "Layunin ng website na ito na sumunod sa WCAG 2.1 AA accessibility standards para sa mga website ng pamahalaan.",
  },
  transparencyTitle: { en: "Transparency", fil: "Transparency" },
  transparencyIntro: {
    en: "Access the City Government's full disclosure reports, budgets, procurement, and other public accountability documents.",
    fil: "I-access ang mga full disclosure report, badyet, procurement, at iba pang dokumento ng pananagutang pampubliko ng Pamahalaang Lungsod.",
  },

  // ── Auth ─────────────────────────────────────────────────────────────────
  signIn: { en: "Sign In", fil: "Mag-sign In" },
  signOut: { en: "Sign Out", fil: "Mag-sign Out" },
  registerTitle: { en: "Create a Citizen Account", fil: "Gumawa ng Citizen Account" },
  registerSubtitle: {
    en: "Register to submit and track city service requests online.",
    fil: "Magparehistro upang magsumite at subaybayan ang mga kahilingan sa serbisyo ng lungsod online.",
  },
  loginTitle: { en: "Sign in to your account", fil: "Mag-sign in sa iyong account" },
  loginSubtitle: {
    en: "Access your applications and city services.",
    fil: "I-access ang iyong mga aplikasyon at serbisyo ng lungsod.",
  },
  emailLabel: { en: "Email address", fil: "Email address" },
  passwordLabel: { en: "Password", fil: "Password" },
  firstNameLabel: { en: "First name", fil: "Pangalan" },
  lastNameLabel: { en: "Last name", fil: "Apelyido" },
  phoneLabel: { en: "Phone (optional)", fil: "Telepono (opsyonal)" },
  createAccount: { en: "Create Account", fil: "Gumawa ng Account" },
  noAccountYet: { en: "Don't have an account?", fil: "Wala ka pang account?" },
  alreadyHaveAccount: { en: "Already have an account?", fil: "May account ka na?" },
  registerHere: { en: "Register here", fil: "Magparehistro dito" },
  signInHere: { en: "Sign in here", fil: "Mag-sign in dito" },
  invalidCredentials: {
    en: "Invalid email or password, or the account is deactivated.",
    fil: "Maling email o password, o deactivated ang account.",
  },
  processing: { en: "Processing…", fil: "Pinoproseso…" },
  verifyEmailTitle: { en: "Verify your email", fil: "I-verify ang iyong email" },
  verifyEmailSent: {
    en: "We sent a verification link to your email address. Open it to activate your account. (In local development the link is printed in the server console.)",
    fil: "Nagpadala kami ng verification link sa iyong email address. Buksan ito upang i-activate ang iyong account. (Sa local development, nakalimbag ang link sa server console.)",
  },
  verifySuccess: {
    en: "Your email has been verified. You can now sign in and submit requests.",
    fil: "Na-verify na ang iyong email. Maaari ka nang mag-sign in at magsumite ng mga kahilingan.",
  },
  verifyFailed: {
    en: "This verification link is invalid or has expired.",
    fil: "Invalid o expired na ang verification link na ito.",
  },
  verifyRequired: {
    en: "Please verify your email address before submitting a request.",
    fil: "Paki-verify muna ang iyong email address bago magsumite ng kahilingan.",
  },

  // ── Consoles (shared) ────────────────────────────────────────────────────
  referenceNo: { en: "Reference No.", fil: "Reference No." },
  serviceLabel: { en: "Service", fil: "Serbisyo" },
  statusLabel: { en: "Status", fil: "Status" },
  officeLabel: { en: "Office", fil: "Tanggapan" },
  applicantLabel: { en: "Applicant", fil: "Aplikante" },
  submittedLabel: { en: "Submitted", fil: "Naisumite" },
  updatedLabel: { en: "Last updated", fil: "Huling na-update" },
  viewLabel: { en: "View", fil: "Tingnan" },
  timelineLabel: { en: "Timeline", fil: "Timeline" },
  attachmentsLabel: { en: "Attachments", fil: "Mga Attachment" },
  detailsLabel: { en: "Submitted Information", fil: "Isinumiteng Impormasyon" },
  noteLabel: { en: "Note (optional)", fil: "Tala (opsyonal)" },
  backLabel: { en: "Back", fil: "Bumalik" },

  // ── Citizen console ──────────────────────────────────────────────────────
  citizenDashboardTitle: { en: "My Applications", fil: "Aking mga Aplikasyon" },
  citizenDashboardSubtitle: {
    en: "Track the status of your submitted requests.",
    fil: "Subaybayan ang status ng iyong mga isinumiteng kahilingan.",
  },
  newApplication: { en: "New Application", fil: "Bagong Aplikasyon" },
  noApplications: {
    en: "You haven't submitted any applications yet.",
    fil: "Wala ka pang naisusumiteng aplikasyon.",
  },
  browseServices: { en: "Browse Services", fil: "Tingnan ang mga Serbisyo" },
  respondTitle: { en: "Respond to Request for Information", fil: "Tumugon sa Kahilingan ng Impormasyon" },
  respondHelp: {
    en: "The reviewing office asked for more information. Add a reply and/or upload the requested documents.",
    fil: "Humingi ng karagdagang impormasyon ang tanggapan. Magdagdag ng tugon at/o mag-upload ng mga hinihinging dokumento.",
  },
  replyLabel: { en: "Your reply", fil: "Iyong tugon" },
  uploadDocs: { en: "Upload documents", fil: "Mag-upload ng dokumento" },
  sendResponse: { en: "Send Response", fil: "Ipadala ang Tugon" },
  responseSent: { en: "Response sent.", fil: "Naipadala ang tugon." },

  // ── Staff console ────────────────────────────────────────────────────────
  staffQueueTitle: { en: "Processing Queue", fil: "Processing Queue" },
  staffQueueSubtitle: {
    en: "Submissions for the offices assigned to you.",
    fil: "Mga isinumiteng kahilingan para sa mga tanggapang nakatalaga sa iyo.",
  },
  queueEmpty: {
    en: "No submissions in your queue.",
    fil: "Walang laman ang iyong queue.",
  },
  startReview: { en: "Start Review", fil: "Simulan ang Pagsusuri" },
  requestInfo: { en: "Request Info", fil: "Humingi ng Impormasyon" },
  approveLabel: { en: "Approve", fil: "Aprubahan" },
  rejectLabel: { en: "Reject", fil: "Tanggihan" },
  markReady: { en: "Mark Ready for Release", fil: "Markahang Handa nang Kunin" },
  markReleased: { en: "Mark Released", fil: "Markahang Nailabas" },
  segregationNotice: {
    en: "You moved this submission to review, so a different approver must decide on it.",
    fil: "Ikaw ang naglipat nito sa pagsusuri, kaya ibang approver ang dapat magpasya.",
  },
  ageLabel: { en: "Age", fil: "Tagal" },
  daysLabel: { en: "day(s)", fil: "araw" },

  // ── Admin console ────────────────────────────────────────────────────────
  adminDashboardTitle: { en: "Admin Console", fil: "Admin Console" },
  adminUsersTitle: { en: "User Management", fil: "Pamamahala ng User" },
  adminSubmissionsTitle: { en: "All Submissions", fil: "Lahat ng Isinumite" },
  adminOfficesTitle: { en: "Offices & Categories", fil: "Mga Tanggapan at Kategorya" },
  adminContentTitle: { en: "Tenant Content", fil: "Nilalaman ng Tenant" },
  createUserTitle: { en: "Create Staff / Admin Account", fil: "Gumawa ng Staff / Admin Account" },
  roleLabel: { en: "Role", fil: "Role" },
  canApproveLabel: { en: "Can approve", fil: "Maaaring mag-apruba" },
  activeLabel: { en: "Active", fil: "Aktibo" },
  deactivatedLabel: { en: "Deactivated", fil: "Deactivated" },
  deactivateLabel: { en: "Deactivate", fil: "I-deactivate" },
  activateLabel: { en: "Activate", fil: "I-activate" },
  assignedOffices: { en: "Assigned offices", fil: "Mga nakatalagang tanggapan" },
  allOffices: { en: "All offices", fil: "Lahat ng tanggapan" },
  allStatusesLabel: { en: "All statuses", fil: "Lahat ng status" },
  officesReadOnlyNote: {
    en: "Offices are currently seeded from the tenant configuration file. Full CRUD management is planned for a later phase.",
    fil: "Ang mga tanggapan ay kasalukuyang galing sa tenant configuration file. Ang buong CRUD management ay nakaplano sa susunod na phase.",
  },
  contentReadOnlyNote: {
    en: "Read-only view of the non-form tenant configuration. Editing via UI is planned for a later phase — edit config/tenants/*.config.ts to change these values.",
    fil: "Read-only na view ng tenant configuration. Ang pag-edit sa UI ay nakaplano sa susunod na phase — i-edit ang config/tenants/*.config.ts upang baguhin ang mga ito.",
  },
};
