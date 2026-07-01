"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import type { CityForm, FormCategory } from "@/lib/forms";
import type { FormField } from "@/lib/form-fields";
import {
  getFormFee,
  getFormHelp,
  getFormRequirements,
  getOfficeName,
} from "@/lib/form-application-meta";
import { t } from "@/lib/i18n";
import FormApplicationHero from "@/components/forms/digital/FormApplicationHero";
import FormApplicationSidebar from "@/components/forms/digital/FormApplicationSidebar";

interface FormApplicationTemplateProps {
  form: CityForm;
  category: FormCategory | undefined;
  fields: FormField[];
  children: React.ReactNode;
  draftSavedAt?: string | null;
}

export default function FormApplicationTemplate({
  form,
  category,
  children,
  draftSavedAt = null,
}: FormApplicationTemplateProps) {

  const requirements = getFormRequirements(form.template, form.categoryId);
  const fee = getFormFee(form.template);
  const help = getFormHelp(form.categoryId);

  return (
    <div id="main-content" className="bg-tenant-gray">
      <FormApplicationHero
        title={t(form.name)}
        description={t(form.description)}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Forms", href: "/forms" },
          { label: t(form.name) },
        ]}
        draftSavedAt={draftSavedAt}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <FormApplicationSidebar
              office={getOfficeName(category)}
              processingTime={form.processingDays ?? "3–5 business days"}
              requirements={requirements}
              fee={fee}
              help={help}
            />
          </div>

          <div className="lg:col-span-8">{children}</div>
        </div>
      </div>

      <Link
        href="/contact"
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-tenant-navy text-white shadow-float transition-transform hover:scale-105 focus-ring"
        aria-label="Chat with us"
      >
        <MessageCircle className="h-6 w-6" />
      </Link>
    </div>
  );
}
