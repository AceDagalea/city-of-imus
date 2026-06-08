import { BARANGAY_OPTIONS } from "./barangays";

export type FieldType =
  | "text"
  | "email"
  | "tel"
  | "textarea"
  | "select"
  | "date"
  | "number"
  | "file"
  | "checkbox";

export interface FormField {
  id: string;
  label: { en: string; fil: string };
  type: FieldType;
  required?: boolean;
  placeholder?: { en: string; fil: string };
  options?: { value: string; label: { en: string; fil: string } }[];
  helpText?: { en: string; fil: string };
}

export const BARANGAY_FIELD: FormField = {
  id: "barangay",
  label: { en: "Barangay", fil: "Barangay" },
  type: "select",
  required: true,
  placeholder: { en: "Select your barangay", fil: "Select your barangay" },
  options: BARANGAY_OPTIONS,
};

export const APPLICANT_FIELDS: FormField[] = [
  {
    id: "lastName",
    label: { en: "Last Name", fil: "Apelyido" },
    type: "text",
    required: true,
  },
  {
    id: "firstName",
    label: { en: "First Name", fil: "Pangalan" },
    type: "text",
    required: true,
  },
  {
    id: "middleName",
    label: { en: "Middle Name / Initial", fil: "Gitnang Pangalan" },
    type: "text",
  },
  {
    id: "email",
    label: { en: "Email Address", fil: "Email Address" },
    type: "email",
    required: true,
  },
  {
    id: "phone",
    label: { en: "Contact Number", fil: "Numero ng Telepono" },
    type: "tel",
    required: true,
  },
  {
    id: "address",
    label: { en: "Complete Address", fil: "Kumpletong Address" },
    type: "textarea",
    required: true,
  },
  BARANGAY_FIELD,
];

export const AFFIDAVIT_FIELDS: FormField[] = [
  ...APPLICANT_FIELDS,
  {
    id: "civilStatus",
    label: { en: "Civil Status", fil: "Katayuang Sibil" },
    type: "select",
    required: true,
    options: [
      { value: "single", label: { en: "Single", fil: "Walang Asawa" } },
      { value: "married", label: { en: "Married", fil: "May Asawa" } },
      { value: "widowed", label: { en: "Widowed", fil: "Balo" } },
      { value: "separated", label: { en: "Separated", fil: "Hiwalay" } },
    ],
  },
  {
    id: "statement",
    label: { en: "Statement / Facts", fil: "Pahayag / Mga Katotohanan" },
    type: "textarea",
    required: true,
    placeholder: {
      en: "Describe the facts of your affidavit in detail...",
      fil: "Ilarawan ang mga katotohanan ng inyong affidavit...",
    },
  },
  {
    id: "purpose",
    label: { en: "Purpose of Affidavit", fil: "Layunin ng Affidavit" },
    type: "text",
    required: true,
  },
  {
    id: "validId",
    label: { en: "Valid ID (upload)", fil: "Valid ID (i-upload)" },
    type: "file",
    required: true,
    helpText: {
      en: "Upload a clear copy of your government-issued ID (JPG, PNG, or PDF, max 5MB).",
      fil: "Mag-upload ng malinaw na kopya ng inyong government ID.",
    },
  },
];

export const BUSINESS_PERMIT_FIELDS: FormField[] = [
  ...APPLICANT_FIELDS,
  {
    id: "businessName",
    label: { en: "Business Name", fil: "Pangalan ng Negosyo" },
    type: "text",
    required: true,
  },
  {
    id: "businessType",
    label: { en: "Type of Business", fil: "Uri ng Negosyo" },
    type: "select",
    required: true,
    options: [
      { value: "sole", label: { en: "Sole Proprietorship", fil: "Sole Proprietorship" } },
      { value: "partnership", label: { en: "Partnership", fil: "Partnership" } },
      { value: "corporation", label: { en: "Corporation", fil: "Corporation" } },
      { value: "cooperative", label: { en: "Cooperative", fil: "Cooperative" } },
    ],
  },
  {
    id: "tin",
    label: { en: "Tax Identification Number (TIN)", fil: "Tax Identification Number (TIN)" },
    type: "text",
    required: true,
  },
  {
    id: "businessAddress",
    label: { en: "Business Address", fil: "Address ng Negosyo" },
    type: "textarea",
    required: true,
  },
  {
    id: "permitType",
    label: { en: "Permit Type", fil: "Uri ng Permit" },
    type: "select",
    required: true,
    options: [
      { value: "new", label: { en: "New Business Permit", fil: "Bagong Business Permit" } },
      { value: "renew", label: { en: "Renewal", fil: "Renewal" } },
      { value: "amendment", label: { en: "Amendment", fil: "Amendment" } },
    ],
  },
  {
    id: "dtiSec",
    label: { en: "DTI/SEC Registration (upload)", fil: "DTI/SEC Registration" },
    type: "file",
    required: true,
  },
];

export const CIVIL_REGISTRY_FIELDS: FormField[] = [
  ...APPLICANT_FIELDS,
  {
    id: "requestType",
    label: { en: "Document Requested", fil: "Hinihinging Dokumento" },
    type: "select",
    required: true,
    options: [
      { value: "birth", label: { en: "Birth Certificate", fil: "Birth Certificate" } },
      { value: "death", label: { en: "Death Certificate", fil: "Death Certificate" } },
      { value: "marriage", label: { en: "Marriage Certificate", fil: "Marriage Certificate" } },
      { value: "cenomar", label: { en: "CENOMAR", fil: "CENOMAR" } },
      { value: "late-registration", label: { en: "Late Registration", fil: "Late Registration" } },
      { value: "marriage-license", label: { en: "Marriage License", fil: "Marriage License" } },
    ],
  },
  {
    id: "subjectName",
    label: { en: "Name on Document", fil: "Pangalan sa Dokumento" },
    type: "text",
    required: true,
  },
  {
    id: "dateOfEvent",
    label: { en: "Date of Birth/Event", fil: "Petsa ng Kapanganakan/Kaganapan" },
    type: "date",
  },
  {
    id: "purpose",
    label: { en: "Purpose", fil: "Layunin" },
    type: "text",
    required: true,
  },
  {
    id: "validId",
    label: { en: "Valid ID (upload)", fil: "Valid ID" },
    type: "file",
    required: true,
  },
];

export const BUILDING_PERMIT_FIELDS: FormField[] = [
  ...APPLICANT_FIELDS,
  {
    id: "ownerName",
    label: { en: "Owner Name", fil: "Pangalan ng May-ari" },
    type: "text",
    required: true,
  },
  {
    id: "projectLocation",
    label: { en: "Project Location", fil: "Lokasyon ng Proyekto" },
    type: "textarea",
    required: true,
  },
  {
    id: "projectType",
    label: { en: "Type of Project", fil: "Uri ng Proyekto" },
    type: "select",
    required: true,
    options: [
      { value: "new", label: { en: "New Construction", fil: "Bagong Konstruksyon" } },
      { value: "extension", label: { en: "Extension", fil: "Extension" } },
      { value: "fence", label: { en: "Fence", fil: "Bakod" } },
      { value: "solar", label: { en: "Solar Panel Installation", fil: "Solar Panel Installation" } },
      { value: "occupancy", label: { en: "Certificate of Occupancy", fil: "Certificate of Occupancy" } },
      { value: "completion", label: { en: "Certificate of Completion", fil: "Certificate of Completion" } },
    ],
  },
  {
    id: "floorArea",
    label: { en: "Total Floor Area (sq.m.)", fil: "Kabuuang Floor Area (sq.m.)" },
    type: "number",
    required: true,
  },
  {
    id: "estimatedCost",
    label: { en: "Estimated Building Cost (PHP)", fil: "Tinatayang Gastos (PHP)" },
    type: "number",
    required: true,
  },
  {
    id: "plans",
    label: { en: "Building Plans (upload)", fil: "Building Plans" },
    type: "file",
    required: true,
    helpText: {
      en: "Upload signed and sealed architectural/structural plans (PDF).",
      fil: "I-upload ang signed at sealed na mga plano (PDF).",
    },
  },
];

export const ANCILLARY_PERMIT_FIELDS: FormField[] = [
  ...APPLICANT_FIELDS,
  {
    id: "permitCategory",
    label: { en: "Permit Category", fil: "Kategorya ng Permit" },
    type: "select",
    required: true,
    options: [
      { value: "electrical", label: { en: "Electrical", fil: "Electrical" } },
      { value: "plumbing", label: { en: "Plumbing", fil: "Plumbing" } },
      { value: "mechanical", label: { en: "Mechanical", fil: "Mechanical" } },
      { value: "sanitary", label: { en: "Sanitary", fil: "Sanitary" } },
      { value: "sign", label: { en: "Sign", fil: "Sign" } },
      { value: "electronics", label: { en: "Electronics", fil: "Electronics" } },
      { value: "fencing", label: { en: "Fencing", fil: "Fencing" } },
      { value: "architectural", label: { en: "Architectural", fil: "Architectural" } },
      { value: "civil-structural", label: { en: "Civil/Structural", fil: "Civil/Structural" } },
    ],
  },
  {
    id: "buildingPermitNo",
    label: { en: "Building Permit Number (if applicable)", fil: "Building Permit Number" },
    type: "text",
  },
  {
    id: "projectLocation",
    label: { en: "Project Location", fil: "Lokasyon ng Proyekto" },
    type: "textarea",
    required: true,
  },
  {
    id: "professionalName",
    label: { en: "Design Professional Name", fil: "Pangalan ng Design Professional" },
    type: "text",
    required: true,
  },
  {
    id: "prcLicense",
    label: { en: "PRC License Number", fil: "PRC License Number" },
    type: "text",
    required: true,
  },
];

export const FIRE_SAFETY_FIELDS: FormField[] = [
  ...APPLICANT_FIELDS,
  {
    id: "establishmentName",
    label: { en: "Establishment Name", fil: "Pangalan ng Establishment" },
    type: "text",
    required: true,
  },
  {
    id: "establishmentType",
    label: { en: "Type of Establishment", fil: "Uri ng Establishment" },
    type: "text",
    required: true,
  },
  {
    id: "floorArea",
    label: { en: "Floor Area (sq.m.)", fil: "Floor Area (sq.m.)" },
    type: "number",
    required: true,
  },
  {
    id: "occupancy",
    label: { en: "Occupancy Type", fil: "Uri ng Occupancy" },
    type: "text",
    required: true,
  },
];

export const ZONING_FIELDS: FormField[] = [
  ...APPLICANT_FIELDS,
  {
    id: "lotOwner",
    label: { en: "Lot Owner", fil: "May-ari ng Lote" },
    type: "text",
    required: true,
  },
  {
    id: "lotLocation",
    label: { en: "Lot Location", fil: "Lokasyon ng Lote" },
    type: "textarea",
    required: true,
  },
  {
    id: "lotArea",
    label: { en: "Lot Area (sq.m.)", fil: "Sukat ng Lote (sq.m.)" },
    type: "number",
    required: true,
  },
  {
    id: "zoningRequest",
    label: { en: "Type of Request", fil: "Uri ng Kahilingan" },
    type: "select",
    required: true,
    options: [
      { value: "zoning-cert", label: { en: "Zoning Certification", fil: "Zoning Certification" } },
      { value: "zoning-app", label: { en: "Zoning Application", fil: "Zoning Application" } },
      { value: "subdivision", label: { en: "Final Approval of Subdivision", fil: "Final Approval of Subdivision" } },
      { value: "parking", label: { en: "Parking Affidavit", fil: "Parking Affidavit" } },
    ],
  },
  {
    id: "titleDoc",
    label: { en: "Title/Tax Declaration (upload)", fil: "Title/Tax Declaration" },
    type: "file",
    required: true,
  },
];

const PERSONAL_NAME_FIELDS: FormField[] = [
  {
    id: "lastName",
    label: { en: "Last Name", fil: "Apelyido" },
    type: "text",
    required: true,
    placeholder: { en: "e.g. Dela Cruz", fil: "e.g. Dela Cruz" },
  },
  {
    id: "firstName",
    label: { en: "First Name", fil: "Pangalan" },
    type: "text",
    required: true,
    placeholder: { en: "e.g. Juan", fil: "e.g. Juan" },
  },
  {
    id: "middleName",
    label: { en: "Middle Name", fil: "Gitnang Pangalan" },
    type: "text",
    placeholder: { en: "e.g. Santos", fil: "e.g. Santos" },
  },
  {
    id: "suffix",
    label: { en: "Suffix", fil: "Suffix" },
    type: "select",
    options: [
      { value: "", label: { en: "None", fil: "None" } },
      { value: "jr", label: { en: "Jr.", fil: "Jr." } },
      { value: "sr", label: { en: "Sr.", fil: "Sr." } },
      { value: "ii", label: { en: "II", fil: "II" } },
      { value: "iii", label: { en: "III", fil: "III" } },
    ],
  },
  {
    id: "nickname",
    label: { en: "Nickname", fil: "Nickname" },
    type: "text",
    placeholder: { en: "Optional", fil: "Optional" },
  },
  {
    id: "sex",
    label: { en: "Sex", fil: "Kasarian" },
    type: "select",
    required: true,
    options: [
      { value: "male", label: { en: "Male", fil: "Lalaki" } },
      { value: "female", label: { en: "Female", fil: "Babae" } },
    ],
  },
  {
    id: "birthdate",
    label: { en: "Date of Birth", fil: "Petsa ng Kapanganakan" },
    type: "date",
    required: true,
  },
  {
    id: "civilStatus",
    label: { en: "Civil Status", fil: "Katayuang Sibil" },
    type: "select",
    required: true,
    options: [
      { value: "single", label: { en: "Single", fil: "Single" } },
      { value: "married", label: { en: "Married", fil: "Married" } },
      { value: "widowed", label: { en: "Widowed", fil: "Widowed" } },
      { value: "separated", label: { en: "Separated", fil: "Separated" } },
    ],
  },
  {
    id: "nationality",
    label: { en: "Nationality", fil: "Nationality" },
    type: "select",
    required: true,
    options: [
      { value: "filipino", label: { en: "Filipino", fil: "Filipino" } },
      { value: "other", label: { en: "Other", fil: "Other" } },
    ],
  },
];

export const OSCA_FIELDS: FormField[] = [
  ...PERSONAL_NAME_FIELDS,
  {
    id: "email",
    label: { en: "Email Address", fil: "Email Address" },
    type: "email",
    required: true,
  },
  {
    id: "phone",
    label: { en: "Contact Number", fil: "Numero ng Telepono" },
    type: "tel",
    required: true,
  },
  {
    id: "address",
    label: { en: "Complete Address", fil: "Kumpletong Address" },
    type: "textarea",
    required: true,
  },
  BARANGAY_FIELD,
  {
    id: "birthplace",
    label: { en: "Place of Birth", fil: "Lugar ng Kapanganakan" },
    type: "text",
    required: true,
  },
  {
    id: "validId",
    label: { en: "Valid ID & Birth Certificate (upload)", fil: "Valid ID at Birth Certificate" },
    type: "file",
    required: true,
  },
];

export const PDAO_FIELDS: FormField[] = [
  ...APPLICANT_FIELDS,
  {
    id: "birthdate",
    label: { en: "Date of Birth", fil: "Petsa ng Kapanganakan" },
    type: "date",
    required: true,
  },
  {
    id: "disabilityType",
    label: { en: "Type of Disability", fil: "Uri ng Kapansanan" },
    type: "text",
    required: true,
  },
  {
    id: "pwdId",
    label: { en: "Existing PWD ID Number (if any)", fil: "PWD ID Number (kung meron)" },
    type: "text",
  },
  {
    id: "medicalCert",
    label: { en: "Medical Certificate (upload)", fil: "Medical Certificate" },
    type: "file",
    required: true,
  },
  {
    id: "validId",
    label: { en: "Valid ID (upload)", fil: "Valid ID" },
    type: "file",
    required: true,
  },
];

export const LEGAL_DOCUMENT_FIELDS: FormField[] = [
  ...APPLICANT_FIELDS,
  {
    id: "documentType",
    label: { en: "Document Type", fil: "Uri ng Dokumento" },
    type: "select",
    required: true,
    options: [
      { value: "lease", label: { en: "Contract of Lease", fil: "Contract of Lease" } },
      { value: "deed-sale", label: { en: "Deed of Sale (Motor Vehicle)", fil: "Deed of Sale (Motor Vehicle)" } },
    ],
  },
  {
    id: "partyDetails",
    label: { en: "Other Party Details", fil: "Detalye ng Ibang Partido" },
    type: "textarea",
    required: true,
  },
  {
    id: "terms",
    label: { en: "Terms / Details", fil: "Mga Tuntunin / Detalye" },
    type: "textarea",
    required: true,
  },
];

export type FormTemplate =
  | "affidavit"
  | "business-permit"
  | "civil-registry"
  | "building-permit"
  | "ancillary-permit"
  | "fire-safety"
  | "zoning"
  | "osca"
  | "pdao"
  | "legal-document";

export const TEMPLATE_FIELDS: Record<FormTemplate, FormField[]> = {
  affidavit: AFFIDAVIT_FIELDS,
  "business-permit": BUSINESS_PERMIT_FIELDS,
  "civil-registry": CIVIL_REGISTRY_FIELDS,
  "building-permit": BUILDING_PERMIT_FIELDS,
  "ancillary-permit": ANCILLARY_PERMIT_FIELDS,
  "fire-safety": FIRE_SAFETY_FIELDS,
  zoning: ZONING_FIELDS,
  osca: OSCA_FIELDS,
  pdao: PDAO_FIELDS,
  "legal-document": LEGAL_DOCUMENT_FIELDS,
};
