"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Download } from "lucide-react";
import FormApplicationTemplate from "@/components/forms/digital/FormApplicationTemplate";
import MultiStepForm from "@/components/forms/digital/MultiStepForm";
import { getFormBySlug, getCategoryById } from "@/lib/forms";
import { TEMPLATE_FIELDS } from "@/lib/form-fields";
import { CONTACT } from "@/lib/constants";
import { t } from "@/lib/i18n";

export default function FormSubmissionPage() {
  const params = useParams();
  const slug = params.slug as string;
  const form = getFormBySlug(slug);
  const [draftSavedAt, setDraftSavedAt] = useState<string | null>(null);

  if (!form) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center bg-tenant-gray px-4">
        <h1 className="text-2xl font-bold text-tenant-navy">Form Not Found</h1>
        <Link href="/forms" className="mt-4 text-tenant-red hover:underline">
          ← Back to Forms
        </Link>
      </div>
    );
  }

  if (form.mode !== "online" || !form.template) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center bg-tenant-gray px-4">
        <h1 className="text-2xl font-bold text-tenant-navy">{t(form.name)}</h1>
        <p className="mt-2 text-gray-600">This form is available for download only.</p>
        <a
          href={form.pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-tenant-navy px-6 py-3 text-white hover:bg-tenant-navyDark"
        >
          <Download className="h-5 w-5" />
          Download PDF
        </a>
        <Link href="/forms" className="mt-4 text-tenant-red hover:underline">
          ← Back to Forms
        </Link>
      </div>
    );
  }

  const category = getCategoryById(form.categoryId);
  const fields = TEMPLATE_FIELDS[form.template];
  const isEboss = form.slug === "business-permit-application";

  return (
    <FormApplicationTemplate
      form={form}
      category={category}
      fields={fields}
      draftSavedAt={draftSavedAt}
    >
      {isEboss && (
        <div className="mb-5 rounded-xl border-2 border-tenant-green bg-tenant-green/10 p-5">
          <p className="text-sm text-tenant-navy">
            For business permits, we recommend using the eBOSS portal for faster processing.
          </p>
          <a
            href={CONTACT.eboss}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block rounded-lg bg-tenant-green px-6 py-2.5 text-sm font-semibold text-tenant-navy hover:bg-tenant-greenDark focus-ring"
          >
            Go to eBOSS Portal
          </a>
        </div>
      )}
      <MultiStepForm
        fields={fields}
        formSlug={form.slug}
        formName={form.name.en}
        onDraftSaved={setDraftSavedAt}
      />
    </FormApplicationTemplate>
  );
}
