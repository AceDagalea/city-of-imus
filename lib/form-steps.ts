import type { FormField } from "./form-fields";

export interface FormStep {
  id: string;
  title: string;
  description: string;
  fields: FormField[];
}

const PERSONAL_IDS = new Set([
  "lastName",
  "firstName",
  "middleName",
  "suffix",
  "nickname",
  "sex",
  "birthdate",
  "civilStatus",
  "nationality",
  "birthplace",
  "disabilityType",
  "pwdId",
  "subjectName",
  "dateOfEvent",
  "ownerName",
  "businessName",
  "businessType",
  "tin",
]);

const CONTACT_IDS = new Set(["email", "phone"]);

const ADDRESS_IDS = new Set(["address", "barangay", "businessAddress", "projectLocation"]);

const DETAIL_IDS = new Set([
  "permitType",
  "requestType",
  "purpose",
  "projectType",
  "floorArea",
  "estimatedCost",
  "statement",
  "documentType",
  "partyDetails",
  "terms",
  "zoningType",
  "fireSafetyType",
  "occupancyType",
]);

export function groupFieldsIntoSteps(fields: FormField[]): FormStep[] {
  const assigned = new Set<string>();
  const take = (ids: Set<string>) => {
    const group = fields.filter((f) => ids.has(f.id) && f.type !== "file");
    group.forEach((f) => assigned.add(f.id));
    return group;
  };

  const personal = take(PERSONAL_IDS);
  const contact = take(CONTACT_IDS);
  const address = take(ADDRESS_IDS);

  const details = fields.filter(
    (f) =>
      !assigned.has(f.id) &&
      f.type !== "file" &&
      f.type !== "checkbox" &&
      (DETAIL_IDS.has(f.id) || !PERSONAL_IDS.has(f.id))
  );
  details.forEach((f) => assigned.add(f.id));

  const documents = fields.filter((f) => f.type === "file");
  documents.forEach((f) => assigned.add(f.id));

  const remaining = fields.filter((f) => !assigned.has(f.id) && f.type !== "checkbox");
  if (remaining.length) {
    details.push(...remaining);
  }

  const steps: FormStep[] = [];

  if (personal.length) {
    steps.push({
      id: "personal",
      title: "Personal Information",
      description: "Provide your personal details as they appear on your valid ID.",
      fields: personal,
    });
  }

  if (contact.length) {
    steps.push({
      id: "contact",
      title: "Contact Information",
      description: "How can we reach you about this application?",
      fields: contact,
    });
  }

  if (address.length) {
    steps.push({
      id: "address",
      title: "Address",
      description: "Your current residence or business address in Imus.",
      fields: address,
    });
  }

  if (details.length) {
    steps.push({
      id: "details",
      title: "Application Details",
      description: "Additional information required for your application.",
      fields: details,
    });
  }

  if (documents.length) {
    steps.push({
      id: "documents",
      title: "Requirements (Documents)",
      description: "Upload clear copies of the required documents (PDF, JPG, or PNG, max 5MB each).",
      fields: documents,
    });
  }

  steps.push({
    id: "review",
    title: "Review & Submit",
    description: "Review your information before submitting your application.",
    fields: [],
  });

  return steps;
}

/** Grid column span for mockup-style field rows */
export function getFieldColSpan(field: FormField): string {
  if (field.type === "textarea" || field.type === "file") return "sm:col-span-2";
  if (["lastName", "firstName", "middleName"].includes(field.id)) return "sm:col-span-1";
  if (field.id === "address" || field.id === "businessAddress" || field.id === "projectLocation") {
    return "sm:col-span-2";
  }
  return "sm:col-span-1";
}
