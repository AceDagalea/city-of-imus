import { disclosurePdfUrl, disclosurePageUrl } from "./disclosure-url";
import type { ResolutionEntry, TableDisclosureItem } from "./full-disclosure";

export const RESOLUTION_ENTRIES: ResolutionEntry[] = [
  { id: "res-05-2025-56", number: "SP RESOLUTION 05-2025-56", date: "April 10, 2025", title: "Annual Barangay Youth Investment Program — Barangay Poblacion I-C", description: "A RESOLUTION APPROVING THE FINALIZED ANNUAL BARANGAY YOUTH INVESTMENT PROGRAM (ABYIP) FOR CALENDAR YEAR 2025 AND THE AMENDED COMPREHENSIVE BARANGAY YOUTH DEVELOPMENT PLAN (CBYDP) FOR CY 2024-2026 OF BARANGAY POBLACION I-C, CITY OF IMUS, CAVITE" },
  { id: "res-05-2025-55", number: "SP RESOLUTION 05-2025-55", date: "April 10, 2025", title: "Relief Prepositioning Agreement with DSWD", description: "A RESOLUTION AUTHORIZING HONORABLE CITY MAYOR ALEX L. ADVINCULA TO ENTER INTO AND SIGN A RELIEF PREPOSITIONING AGREEMENT BETWEEN THE CITY GOVERNMENT OF IMUS AND DEPARTMENT OF SOCIAL WELFARE AND DEVELOPMENT (DSWD) FIELD OFFICE IV-A." },
  { id: "res-05-2025-52", number: "SP RESOLUTION 05-2025-52", date: "April 3, 2025", title: "Annual Barangay Budgets 2025", description: "A RESOLUTION APPROVING THE ANNUAL BUDGET FOR CALENDAR YEAR 2025 OF BARANGAYS PALICO II, TANZANG LUMA V, MALAGASANG I-F, AND BAYAN LUMA IV, CITY OF IMUS, CAVITE." },
  { id: "res-05-2025-51", number: "SP RESOLUTION 05-2025-51", date: "April 3, 2025", title: "Disposal of Unserviceable Vehicles", description: "A RESOLUTION AUTHORIZING HONORABLE CITY MAYOR ALEX L. ADVINCULA TO ENTER INTO AND SIGN A DEED OF ABSOLUTE SALE BETWEEN THE CITY GOVERNMENT OF IMUS AND RJD METAL TRADING RELATIVE TO THE DISPOSAL OF SIXTEEN (16) UNSERVICEABLE USED VEHICLES." },
  { id: "res-05-2025-50", number: "SP RESOLUTION 05-2025-50", date: "April 3, 2025", title: "Child Protection MOA with UP-PGH", description: "A RESOLUTION AUTHORIZING HONORABLE CITY MAYOR ALEX L. ADVINCULA TO ENTER INTO AND SIGN A MEMORANDUM OF AGREEMENT WITH UP-PGH CPU AND CHILD PROTECTION NETWORK FOUNDATION INC. RELATIVE TO STRENGTHENING THE ENFORCEMENT OF THE RIGHTS OF CHILDREN." },
  { id: "res-05-2025-49", number: "SP RESOLUTION 05-2025-49", date: "April 3, 2025", title: "ONI Blood Service Facility MOA", description: "A RESOLUTION AUTHORIZING HONORABLE CITY MAYOR ALEX L. ADVINCULA TO ENTER INTO AND SIGN A MEMORANDUM OF AGREEMENT WITH LAS PIÑAS GENERAL HOSPITAL RELATIVE TO THE LATTER'S BLOOD SERVICE FACILITY." },
  { id: "res-05-2025-48", number: "SP RESOLUTION 05-2025-48", date: "April 2, 2025", title: "SK Annual Budgets 2025", description: "A RESOLUTION APPROVING VARIOUS BARANGAY SANGGUNIANG KABATAAN (SK) ANNUAL BUDGET FOR CALENDAR YEAR 2025." },
  { id: "res-05-2025-47", number: "SP RESOLUTION 05-2025-47", date: "April 2, 2025", title: "Various Barangay Annual Budgets 2025", description: "A RESOLUTION APPROVING THE ANNUAL BUDGET FOR VARIOUS BARANGAYS IN THE CITY OF IMUS, CAVITE FOR THE CALENDAR YEAR 2025." },
  { id: "res-05-2025-46", number: "SP RESOLUTION 05-2025-46", date: "March 25, 2025", title: "ABYIP — Barangays Bayan Luma V and Malagasang I-F", description: "A RESOLUTION APPROVING THE FINALIZED ANNUAL BARANGAY YOUTH INVESTMENT PROGRAM (ABYIP) FOR CY 2025 AND THE AMENDED CBYDP FOR CY 2024-2026 OF BARANGAYS BAYAN LUMA V AND MALAGASANG I-F." },
  { id: "res-05-2025-45", number: "SP RESOLUTION 05-2025-45", date: "March 20, 2025", title: "Vermosa X Phase I Development Permit", description: "A RESOLUTION APPROVING THE REQUEST OF AYALA LAND INC. FOR THE DEVELOPMENT PERMIT OF THEIR PROPOSED SUBDIVISION PROJECT, VERMOSA X PHASE I, LOCATED AT BARANGAY PASONG BUAYA I, CITY OF IMUS, CAVITE." },
  { id: "res-05-2025-44", number: "SP RESOLUTION 05-2025-44", date: "March 20, 2025", title: "Deed of Donation — Homemark, Inc.", description: "A RESOLUTION AUTHORIZING HONORABLE CITY MAYOR ALEX L. ADVINCULA TO ENTER INTO AND SIGN A DEED OF DONATION AND ACCEPTANCE WITH HOMEMARK, INC." },
  { id: "res-05-2025-42", number: "SP RESOLUTION 05-2025-42", date: "March 20, 2025", title: "Internship MOA with Cavite State University", description: "A RESOLUTION AUTHORIZING HONORABLE CITY MAYOR ALEX L. ADVINCULA TO ENTER INTO AND SIGN A MEMORANDUM OF AGREEMENT WITH CAVITE STATE UNIVERSITY RELATIVE TO THE LATTER'S INTERNSHIP PROGRAM." },
  { id: "res-05-2025-38", number: "SP RESOLUTION 05-2025-38", date: "March 10, 2025", title: "Medical Assistance MOA — DOH CHD IV-A", description: "A RESOLUTION AUTHORIZING HONORABLE CITY MAYOR ALEX L. ADVINCULA TO ENTER INTO AND SIGN A MEMORANDUM OF AGREEMENT WITH DOH-CHD IV-A AND OSPITAL NG IMUS FOR MEDICAL ASSISTANCE TO INDIGENT PATIENTS." },
  { id: "res-05-2025-37", number: "SP RESOLUTION 05-2025-37", date: "March 3, 2025", title: "Wheelchair Donation from PAGCOR", description: "A RESOLUTION AUTHORIZING CITY MAYOR ALEX L. ADVINCULA TO ENTER INTO AND SIGN A DEED OF DONATION AND ACCEPTANCE WITH PAGCOR RELATIVE TO THE DONATION OF TWENTY (20) WHEELCHAIRS." },
];

export const RESOLUTION_ARCHIVES = [
  { label: "5th Term 2024", href: disclosurePageUrl("/resolutions_2024.html") },
  { label: "5th Term 2023", href: disclosurePageUrl("/resolutions_2023.html") },
  { label: "5th Term 2022", href: disclosurePageUrl("/resolutions_5th2022.html") },
  { label: "4th Term 2022", href: disclosurePageUrl("/resolutions_4th2022.html") },
  { label: "2020", href: disclosurePageUrl("/resolutions_2020.html") },
  { label: "4th Term 2019", href: disclosurePageUrl("/resolutions_4th2019.html") },
  { label: "3rd Term 2019", href: disclosurePageUrl("/resolutions_3rd2019.html") },
  { label: "2018", href: disclosurePageUrl("/resolutions_2018.html") },
  { label: "2017", href: disclosurePageUrl("/resolutions_2017.html") },
  { label: "2016", href: disclosurePageUrl("/resolutions_2016.html") },
  { label: "2015", href: disclosurePageUrl("/resolutions_2015.html") },
  { label: "2014", href: disclosurePageUrl("/resolutions_2014.html") },
  { label: "2013", href: disclosurePageUrl("/resolutions_2013.html") },
  { label: "2012", href: disclosurePageUrl("/resolutions_2012.html") },
  { label: "2011", href: disclosurePageUrl("/resolutions_2011.html") },
  { label: "2010", href: disclosurePageUrl("/resolutions_2010.html") },
  { label: "2009", href: disclosurePageUrl("/resolutions_2009.html") },
  { label: "2008", href: disclosurePageUrl("/resolutions_2008.html") },
  { label: "2007", href: disclosurePageUrl("/resolutions_2007.html") },
  { label: "2006", href: disclosurePageUrl("/resolutions_2006.html") },
  { label: "2005", href: disclosurePageUrl("/resolutions_2005.html") },
  { label: "2003–2004", href: disclosurePageUrl("/resolutions_2003-2004.html") },
  { label: "2001–2002", href: disclosurePageUrl("/resolutions_2001-2002.html") },
  { label: "1996–2000", href: disclosurePageUrl("/resolutions_1996-2000.html") },
  { label: "1991–1995", href: disclosurePageUrl("/resolutions_1991-1995.html") },
  { label: "1986–1990", href: disclosurePageUrl("/resolutions_1986-1990.html") },
  { label: "1980–1985", href: disclosurePageUrl("/resolutions_1980-1985.html") },
];

export const BIDS_AWARDS_ITEMS: TableDisclosureItem[] = [
  { id: "bid-26-053a", reference: "GF-G (CSWDO-GAD)26-053A", title: "PURCHASE OF CHILD DEVELOPMENT BOOKS FOR SCHOOL YEAR 2026-2027", datePosted: "2026", pdfUrl: disclosurePdfUrl("/FULL DISCLOSURE/Bids and Awards/GF-G-26-051-53.pdf") },
  { id: "bid-26-051a", reference: "GF-G (OCM)26-051A", title: "PURCHASE OF CAMERAS AND ACCESSORIES — CITY INFORMATION OFFICER", datePosted: "2026", pdfUrl: disclosurePdfUrl("/FULL DISCLOSURE/Bids and Awards/GF-G-26-051-53.pdf") },
  { id: "bid-26-052", reference: "GF-G (CDRRMO)-26-052", title: "PURCHASE OF DRRM RESCUE TOOL AND RELATED EQUIPMENT", datePosted: "2026", pdfUrl: disclosurePdfUrl("/FULL DISCLOSURE/Bids and Awards/GF-G-26-050-053.pdf") },
  { id: "bid-26-050", reference: "GF-G (OCM-POPS)-26-050", title: "PURCHASE AND INSTALLATION OF CCTV HARDWARE, SOFTWARE AND LICENSES FOR IMUS COMMAND CENTER", datePosted: "2026", pdfUrl: disclosurePdfUrl("/FULL DISCLOSURE/Bids and Awards/GF-G-26-050-053.pdf") },
  { id: "bid-26-046", reference: "INFR-SEF (LSB)-26-046", title: "REHABILITATION AND REPAIR OF ELECTRICAL SYSTEM AT MALAGASANG I ELEMENTARY SCHOOL", datePosted: "2026", pdfUrl: disclosurePdfUrl("/FULL DISCLOSURE/Bids and Awards/INFR-SEF (LSB)-26-043-046.pdf") },
  { id: "bid-26-045", reference: "INFR-SEF (LSB)-26-045", title: "REHABILITATION AND REPAIR OF ELECTRICAL SYSTEM AT GEN. TOMAS MASCARDO NATIONAL HIGH SCHOOL", datePosted: "2026", pdfUrl: disclosurePdfUrl("/FULL DISCLOSURE/Bids and Awards/INFR-SEF (LSB)-26-043-046.pdf") },
  { id: "bid-26-044-inf", reference: "INFR-SEF (OCM-POPS)-26-044", title: "IMPROVEMENT OF PERIMETER FENCE (BALAY SILANGAN) AT ALAPAN II-B", datePosted: "2026", pdfUrl: disclosurePdfUrl("/FULL DISCLOSURE/Bids and Awards/INFR-SEF (LSB)-26-043-046.pdf") },
  { id: "bid-26-043", reference: "INFR-SEF (LSB)-26-043", title: "CONVERSION OF SCHOOL BUILDING TO INCLUSIVE LEARNING RESOURCE CENTER AT IMUS PILOT ELEMENTARY SCHOOL", datePosted: "2026", pdfUrl: disclosurePdfUrl("/FULL DISCLOSURE/Bids and Awards/INFR-SEF (LSB)-26-043-046.pdf") },
  { id: "bid-np-ss-2", reference: "Announcement", title: "Invitation for Negotiated Procurement SAGIP SAKA 2nd Posting", datePosted: "2026", pdfUrl: disclosurePdfUrl("/FULL DISCLOSURE/Bids and Awards/INVITATION TO NEGOTIATED NP-SS.pdf") },
  { id: "bid-np-ss", reference: "Announcement", title: "Invitation for Negotiated Procurement SAGIP SAKA", datePosted: "2026", pdfUrl: disclosurePdfUrl("/FULL DISCLOSURE/Bids and Awards/Invitation for Negotiated Procurement SAGIP SAKA.pdf") },
  { id: "bid-26-045-tires", reference: "GF/TF-G (OCM/CDRRMO/BFP/PNP)-26-045", title: "PURCHASE OF TIRES FOR VARIOUS VEHICLES OF THE CITY OF IMUS", datePosted: "2026", pdfUrl: disclosurePdfUrl("/FULL DISCLOSURE/Bids and Awards/GF-26-42-45.pdf") },
  { id: "bid-26-044-med", reference: "TF-G (ONI)-26-044", title: "PURCHASE OF MEDICAL SUPPLIES FOR OSPITAL NG IMUS FOR THE YEAR 2026", datePosted: "2026", pdfUrl: disclosurePdfUrl("/FULL DISCLOSURE/Bids and Awards/GF-26-42-45.pdf") },
  { id: "bid-26-043-rabies", reference: "GF-G (OCV)-26-043", title: "PURCHASE OF ANTI-RABIES VACCINE FOR PETS IN THE CITY OF IMUS", datePosted: "2026", pdfUrl: disclosurePdfUrl("/FULL DISCLOSURE/Bids and Awards/GF-26-42-45.pdf") },
  { id: "bid-26-042-bags", reference: "GF-G (CICPC)-26-042", title: "PURCHASE OF SCHOOL BAGS AND SCHOOL SUPPLIES FOR PUBLIC ELEMENTARY STUDENTS", datePosted: "2026", pdfUrl: disclosurePdfUrl("/FULL DISCLOSURE/Bids and Awards/GF-26-42-45.pdf") },
  { id: "bid-26-041-rice", reference: "TF-G (OCM)-26-041", title: "PURCHASE OF RICE FOR INDIGENT FAMILIES — BIGAY BIGAS SA MASA", datePosted: "2026", pdfUrl: disclosurePdfUrl("/FULL DISCLOSURE/Bids and Awards/TF-G-OCM-26-041.pdf") },
  { id: "bid-26-042-bfp", reference: "INFR-TF (BFP)-26-042", title: "IMPROVEMENT OF BFP BUILDING, MALAGASANG II-C", datePosted: "2026", pdfUrl: disclosurePdfUrl("/FULL DISCLOSURE/Bids and Awards/INFR-26-36-42.pdf") },
  { id: "bid-26-041-mph", reference: "INFR-CDF (OCE)-26-041", title: "CONSTRUCTION OF MULTI PURPOSE HALL AT MALAGASANG II-C", datePosted: "2026", pdfUrl: disclosurePdfUrl("/FULL DISCLOSURE/Bids and Awards/INFR-26-36-42.pdf") },
  { id: "bid-26-040", reference: "INFR-CDF (OCE)-26-040", title: "CONSTRUCTION OF MULTIPURPOSE HALL AT MALAGASANG I-F", datePosted: "2026", pdfUrl: disclosurePdfUrl("/FULL DISCLOSURE/Bids and Awards/INFR-26-36-42.pdf") },
  { id: "bid-26-032a", reference: "INFR-CDF (OCE)-26-032A", title: "IMPROVEMENT AND UPGRADING OF ROAD AT MALAGASANG I-G", datePosted: "2026", pdfUrl: disclosurePdfUrl("/FULL DISCLOSURE/Bids and Awards/INFR-26-022A-32A.pdf") },
];

export const JOB_OPPORTUNITY_ITEMS: TableDisclosureItem[] = [
  {
    id: "job-2026-a",
    reference: "CGI",
    title: "LIST OF VACANT POSITIONS — City Government of Imus",
    datePosted: "May 5, 2026",
    pdfUrl: disclosurePdfUrl("/FULL DISCLOSURE/Job vacancies/Vacant Positions 05052026A.pdf"),
  },
  {
    id: "job-2026-b",
    reference: "ONI",
    title: "LIST OF VACANT POSITIONS — Ospital ng Imus",
    datePosted: "May 5, 2026",
    pdfUrl: disclosurePdfUrl("/FULL DISCLOSURE/Job vacancies/Vacant Positions 05052026B.pdf"),
  },
];

export const GAD_DATABASE_ITEMS: TableDisclosureItem[] = [
  { id: "gad-pregnant-2025", reference: "Health", title: "GAD Requested Docs on Pregnant Mothers 2025", datePosted: "2025", pdfUrl: disclosurePdfUrl("/FULL DISCLOSURE/GAD DATABASE/GAD requested Docs on Pregnant Mothers 2025.pdf") },
  { id: "gad-newsletter", reference: "Publication", title: "GAD News Letter", datePosted: "2025", pdfUrl: disclosurePdfUrl("/FULL DISCLOSURE/GAD DATABASE/GAD News Letter.pdf") },
  { id: "gad-converge", reference: "Demography", title: "List of Beneficiaries — Free CONVERGE Installation (Bida I-Konek Mo Project)", datePosted: "2025", pdfUrl: disclosurePdfUrl("/FULL DISCLOSURE/GAD DATABASE/Demography/By-Sex-Beneficiaries-of-Free-CONVERGE-Installation_BIDA-I-KONEK-MO-PROJECT.pdf") },
  { id: "gad-pop-sex", reference: "Demography", title: "Projected Population by Sex 2020–2025", datePosted: "2025", pdfUrl: disclosurePdfUrl("/FULL DISCLOSURE/GAD DATABASE/Demography/Proj Pop_n by Sex 2020-2025.pdf") },
  { id: "gad-edu-2023", reference: "Education", title: "GAD Database for Education Year 2023", datePosted: "2023", pdfUrl: disclosurePdfUrl("/FULL DISCLOSURE/GAD DATABASE/Education/2023_GAD_Education.pdf") },
  { id: "gad-maternal-2024", reference: "Health", title: "GAD Database for Maternal Care Pregnant Women Year 2024", datePosted: "2024", pdfUrl: disclosurePdfUrl("/FULL DISCLOSURE/GAD DATABASE/Health/2024_Maternal_Care_Pregnant_Women.pdf") },
  { id: "gad-cswdo-2024", reference: "CSWDO", title: "GAD Database for CSWDO Year 2024", datePosted: "2024", pdfUrl: disclosurePdfUrl("/FULL DISCLOSURE/GAD DATABASE/CSWDO/2024_CSWDO.pdf") },
  { id: "gad-osca-2025", reference: "OSCA", title: "Office of the Senior Citizens Affairs 2025", datePosted: "2025", pdfUrl: disclosurePdfUrl("/FULL DISCLOSURE/GAD DATABASE/OCM-OSCA GAD DATABASE.pdf") },
  { id: "gad-osca-2024", reference: "OSCA", title: "Office of the Senior Citizens Affairs 2024", datePosted: "2024", pdfUrl: disclosurePdfUrl("/FULL DISCLOSURE/GAD DATABASE/OSCA//2024_OSCA.pdf") },
  { id: "gad-pdao-2024", reference: "PDAO", title: "Summary Report of PWD by Type, Age and Sex-disaggregated, 2024", datePosted: "2024", pdfUrl: disclosurePdfUrl("/FULL DISCLOSURE/GAD DATABASE/PDAO/2024_PDAO.pdf") },
];

export const BANAAG_ITEMS: TableDisclosureItem[] = [
  { id: "banaag-2025-h2", reference: "2025", title: "Ang Ikalawang Anim na Buwan sa Taong 2025", datePosted: "Jul–Dec 2025", pdfUrl: disclosurePdfUrl("/FULL DISCLOSURE/BanAAg/BanAAg_2025_July_to_Dec.pdf") },
  { id: "banaag-2025-dec", reference: "2025", title: "December 2025", datePosted: "December 2025", pdfUrl: disclosurePdfUrl("/FULL DISCLOSURE/BanAAg/BanAAg_2025_Dec.pdf") },
  { id: "banaag-2025-nov", reference: "2025", title: "November 2025", datePosted: "November 2025", pdfUrl: disclosurePdfUrl("/FULL DISCLOSURE/BanAAg/BanAAg_2025_Nov.pdf") },
  { id: "banaag-2025-oct", reference: "2025", title: "October 2025", datePosted: "October 2025", pdfUrl: disclosurePdfUrl("/FULL DISCLOSURE/BanAAg/BanAAg_2025_Oct.pdf") },
  { id: "banaag-2025-sept", reference: "2025", title: "September 2025", datePosted: "September 2025", pdfUrl: disclosurePdfUrl("/FULL DISCLOSURE/BanAAg/BanAAg_2025_Sept.pdf") },
  { id: "banaag-2025-aug", reference: "2025", title: "August 2025", datePosted: "August 2025", pdfUrl: disclosurePdfUrl("/FULL DISCLOSURE/BanAAg/BanAAg_2025_August.pdf") },
  { id: "banaag-2025-jul", reference: "2025", title: "July 2025", datePosted: "July 2025", pdfUrl: disclosurePdfUrl("/FULL DISCLOSURE/BanAAg/BanAAg_2025_July.pdf") },
  { id: "banaag-2025-h1", reference: "2025", title: "Ang Unang Anim na Buwan sa Taong 2025", datePosted: "Jan–Jun 2025", pdfUrl: disclosurePdfUrl("/FULL DISCLOSURE/BanAAg/BanAAg_2025_Jan_to_Jun.pdf") },
  { id: "banaag-2025-jun", reference: "2025", title: "June 2025", datePosted: "June 2025", pdfUrl: disclosurePdfUrl("/FULL DISCLOSURE/BanAAg/BanAAg_2025_June.pdf") },
  { id: "banaag-2025-may", reference: "2025", title: "May 2025", datePosted: "May 2025", pdfUrl: disclosurePdfUrl("/FULL DISCLOSURE/BanAAg/BanAAg_2025_May.pdf") },
  { id: "banaag-2025-apr", reference: "2025", title: "April 2025", datePosted: "April 2025", pdfUrl: disclosurePdfUrl("/FULL DISCLOSURE/BanAAg/BanAAg_2025_April.pdf") },
  { id: "banaag-2025-mar", reference: "2025", title: "March 2025", datePosted: "March 2025", pdfUrl: disclosurePdfUrl("/FULL DISCLOSURE/BanAAg/BanAAg_2025_March.pdf") },
  { id: "banaag-2025-feb", reference: "2025", title: "February 2025", datePosted: "February 2025", pdfUrl: disclosurePdfUrl("/FULL DISCLOSURE/BanAAg/BanAAg_2025_Feb.pdf") },
  { id: "banaag-2025-jan", reference: "2025", title: "January 2025", datePosted: "January 2025", pdfUrl: disclosurePdfUrl("/FULL DISCLOSURE/BanAAg/BanAAg_2025_Jan.pdf") },
  { id: "banaag-2024-h2", reference: "2024", title: "Ang Ikalawang Anim na Buwan sa Taong 2024", datePosted: "Jul–Dec 2024", pdfUrl: disclosurePdfUrl("/FULL DISCLOSURE/BanAAg/BanAAg_2024_Jul_to_Dec.pdf") },
  { id: "banaag-2024-dec", reference: "2024", title: "December 2024", datePosted: "December 2024", pdfUrl: disclosurePdfUrl("/FULL DISCLOSURE/BanAAg/BanAAg_2024_December.pdf") },
  { id: "banaag-2024-nov", reference: "2024", title: "November 2024", datePosted: "November 2024", pdfUrl: disclosurePdfUrl("/FULL DISCLOSURE/BanAAg/BanAAg_2024_November.pdf") },
  { id: "banaag-2024-oct", reference: "2024", title: "October 2024", datePosted: "October 2024", pdfUrl: disclosurePdfUrl("/FULL DISCLOSURE/BanAAg/BanAAg_2024_October.pdf") },
  { id: "banaag-2024-sept", reference: "2024", title: "September 2024", datePosted: "September 2024", pdfUrl: disclosurePdfUrl("/FULL DISCLOSURE/BanAAg/BanAAg_2024_September.pdf") },
  { id: "banaag-2024-aug", reference: "2024", title: "August 2024", datePosted: "August 2024", pdfUrl: disclosurePdfUrl("/FULL DISCLOSURE/BanAAg/BanAAg_2024_August.pdf") },
];

export const DISPOSAL_COMMITTEE_ITEMS: TableDisclosureItem[] = [
  {
    id: "disposal-2026-02",
    reference: "ITBD 2026-02",
    title: "Disposal of nineteen (19) Units of Unserviceable Vehicles",
    datePosted: "2026",
    pdfUrl: disclosurePdfUrl("/FULL DISCLOSURE/Disposal-Invitations/ITBD_2026_02.pdf"),
  },
];

export const LOCAL_GOVERNMENT_FUND_ITEMS: TableDisclosureItem[] = [
  {
    id: "lgf-app-2026",
    reference: "APP 2026",
    title: "Annual Procurement Plan for FY 2026",
    datePosted: "2026",
    pdfUrl: disclosurePdfUrl("/FULL DISCLOSURE/TrustFund/Annual_Procurement_Plan_2026.pdf"),
  },
];
