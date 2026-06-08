"use client";

import { useState, type FormEvent } from "react";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import type { FormField } from "@/lib/form-fields";
import { t } from "@/lib/i18n";

interface DynamicFormProps {
  fields: FormField[];
  formSlug: string;
  formName: string;
}

export default function DynamicForm({ fields, formSlug, formName }: DynamicFormProps) {
  const { language } = useLanguage();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [referenceNo, setReferenceNo] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    formData.append("formSlug", formSlug);
    formData.append("formName", formName);

    try {
      const res = await fetch("/api/forms/submit", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");
      setReferenceNo(data.referenceNo);
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "An error occurred");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-xl bg-green-50 p-8 text-center">
        <CheckCircle className="mx-auto h-12 w-12 text-green-600" />
        <h3 className="mt-4 text-xl font-bold text-green-800">
          {language === "fil" ? "Matagumpay na Na-submit!" : "Successfully Submitted!"}
        </h3>
        <p className="mt-2 text-green-700">
          {language === "fil" ? "Reference Number:" : "Reference Number:"}{" "}
          <strong className="font-mono">{referenceNo}</strong>
        </p>
        <p className="mt-4 text-sm text-green-600">
          {language === "fil"
            ? "Makakatanggap kayo ng confirmation sa inyong email. Pakidala ang reference number sa City Hall kung kinakailangan."
            : "You will receive a confirmation email. Please bring your reference number to City Hall if required."}
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 rounded-full bg-imus-navy px-6 py-2 text-sm text-white hover:bg-imus-navyDark focus-ring"
        >
          {language === "fil" ? "Mag-submit ng Isa Pa" : "Submit Another"}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {fields.map((field) => (
        <div key={field.id}>
          <label htmlFor={field.id} className="mb-1.5 block text-sm font-medium text-imus-navy">
            {t(field.label, language)}
            {field.required && <span className="text-imus-red"> *</span>}
          </label>

          {field.type === "textarea" ? (
            <textarea
              id={field.id}
              name={field.id}
              required={field.required}
              rows={4}
              placeholder={field.placeholder ? t(field.placeholder, language) : undefined}
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm transition-colors focus:border-imus-navy focus:outline-none focus:ring-2 focus:ring-imus-navy/20"
            />
          ) : field.type === "select" ? (
            <select
              id={field.id}
              name={field.id}
              required={field.required}
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-imus-navy focus:outline-none focus:ring-2 focus:ring-imus-navy/20"
            >
              <option value="">{language === "fil" ? "Pumili..." : "Select..."}</option>
              {field.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {t(opt.label, language)}
                </option>
              ))}
            </select>
          ) : field.type === "checkbox" ? (
            <label className="flex items-center gap-2">
              <input
                id={field.id}
                name={field.id}
                type="checkbox"
                required={field.required}
                className="h-4 w-4 rounded border-gray-300 text-imus-navy focus:ring-imus-green"
              />
              <span className="text-sm text-gray-600">
                {field.placeholder ? t(field.placeholder, language) : t(field.label, language)}
              </span>
            </label>
          ) : field.type === "file" ? (
            <input
              id={field.id}
              name={field.id}
              type="file"
              required={field.required}
              accept=".pdf,.jpg,.jpeg,.png"
              className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm file:mr-4 file:rounded-full file:border-0 file:bg-imus-navy file:px-4 file:py-1 file:text-sm file:text-white"
            />
          ) : (
            <input
              id={field.id}
              name={field.id}
              type={field.type}
              required={field.required}
              placeholder={field.placeholder ? t(field.placeholder, language) : undefined}
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm transition-colors focus:border-imus-navy focus:outline-none focus:ring-2 focus:ring-imus-navy/20"
            />
          )}

          {field.helpText && (
            <p className="mt-1 text-xs text-gray-500">{t(field.helpText, language)}</p>
          )}
        </div>
      ))}

      <div className="rounded-lg bg-imus-gray p-4">
        <label className="flex items-start gap-2">
          <input
            name="agreement"
            type="checkbox"
            required
            className="mt-0.5 h-4 w-4 rounded border-gray-300 text-imus-navy focus:ring-imus-green"
          />
          <span className="text-sm text-gray-600">
            {language === "fil"
              ? "Pinatutunayan ko na ang lahat ng impormasyon ay totoo at tama. Sumasang-ayon ako sa Data Privacy Act ng 2012."
              : "I certify that all information provided is true and correct. I agree to the Data Privacy Act of 2012."}
          </span>
        </label>
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle className="h-5 w-5 shrink-0" />
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-imus-green px-8 py-3 font-semibold text-imus-navy transition-colors hover:bg-imus-greenDark disabled:opacity-60 focus-ring sm:w-auto"
      >
        {status === "submitting" && <Loader2 className="h-5 w-5 animate-spin" />}
        {language === "fil" ? "I-submit ang Aplikasyon" : "Submit Application"}
      </button>
    </form>
  );
}
