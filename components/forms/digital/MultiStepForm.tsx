"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Save,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import type { FormField } from "@/lib/form-fields";
import { groupFieldsIntoSteps } from "@/lib/form-steps";
import { t } from "@/lib/i18n";
import FormStepper from "@/components/forms/digital/FormStepper";
import FormFieldInput from "@/components/forms/digital/FormFieldInput";

interface MultiStepFormProps {
  fields: FormField[];
  formSlug: string;
  formName: string;
  onDraftSaved?: (savedAt: string) => void;
}

function formatDraftTime(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins === 1) return "1 minute ago";
  if (mins < 60) return `${mins} minutes ago`;
  return new Date(iso).toLocaleString();
}

export default function MultiStepForm({
  fields,
  formSlug,
  formName,
  onDraftSaved,
}: MultiStepFormProps) {
  const steps = groupFieldsIntoSteps(fields);
  const [currentStep, setCurrentStep] = useState(0);
  const [values, setValues] = useState<Record<string, string>>({});
  const [files, setFiles] = useState<Record<string, File | null>>({});
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [referenceNo, setReferenceNo] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const draftKey = `form-draft-${formSlug}`;
  const step = steps[currentStep];
  const isReview = step?.id === "review";
  const isLastStep = currentStep === steps.length - 1;

  useEffect(() => {
    try {
      const raw = localStorage.getItem(draftKey);
      if (raw) {
        const parsed = JSON.parse(raw) as { values: Record<string, string>; savedAt: string };
        setValues(parsed.values ?? {});
        onDraftSaved?.(formatDraftTime(parsed.savedAt));
      }
    } catch {
      /* ignore */
    }
  }, [draftKey, onDraftSaved]);

  const saveDraft = useCallback(() => {
    const savedAt = new Date().toISOString();
    localStorage.setItem(draftKey, JSON.stringify({ values, savedAt }));
    onDraftSaved?.(formatDraftTime(savedAt));
  }, [draftKey, values, onDraftSaved]);

  const handleChange = (id: string, value: string) => {
    setValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (id: string, file: File | null) => {
    setFiles((prev) => ({ ...prev, [id]: file }));
  };

  useEffect(() => {
    const timer = setTimeout(saveDraft, 800);
    return () => clearTimeout(timer);
  }, [values, saveDraft]);

  const validateStep = (): boolean => {
    if (isReview) return agreed;
    for (const field of step.fields) {
      if (field.required && field.type !== "file" && !values[field.id]?.trim()) {
        return false;
      }
      if (field.required && field.type === "file" && !files[field.id]) {
        return false;
      }
    }
    return true;
  };

  const goNext = () => {
    if (!validateStep()) {
      setErrorMsg("Please complete all required fields before continuing.");
      return;
    }
    setErrorMsg("");
    setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const goBack = () => {
    setErrorMsg("");
    setCurrentStep((s) => Math.max(s - 1, 0));
  };

  const handleSubmit = async () => {
    if (!agreed) {
      setErrorMsg("Please agree to the Data Privacy Act before submitting.");
      return;
    }
    setStatus("submitting");
    setErrorMsg("");

    const formData = new FormData();
    formData.append("formSlug", formSlug);
    formData.append("formName", formName);
    formData.append("agreement", "true");
    Object.entries(values).forEach(([k, v]) => formData.append(k, v));
    Object.entries(files).forEach(([k, f]) => {
      if (f) formData.append(k, f);
    });

    try {
      const res = await fetch("/api/forms/submit", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");
      setReferenceNo(data.referenceNo);
      setStatus("success");
      localStorage.removeItem(draftKey);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "An error occurred");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center shadow-card">
        <CheckCircle className="mx-auto h-12 w-12 text-green-600" />
        <h3 className="mt-4 text-xl font-bold text-green-800">Successfully Submitted!</h3>
        <p className="mt-2 text-green-700">
          Reference Number: <strong className="font-mono">{referenceNo}</strong>
        </p>
        <p className="mt-4 text-sm text-green-600">
          Save your reference number to track your application. You may visit City Hall if follow-up is required.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/forms#track"
            className="rounded-lg bg-imus-navy px-6 py-2.5 text-sm font-semibold text-white hover:bg-imus-navyDark focus-ring"
          >
            Track Application
          </Link>
          <Link
            href="/forms"
            className="rounded-lg border-2 border-imus-navy px-6 py-2.5 text-sm font-semibold text-imus-navy hover:bg-imus-gray focus-ring"
          >
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  const allFields = fields.filter((f) => f.type !== "checkbox");

  return (
    <div className="space-y-5">
      <FormStepper steps={steps} currentStep={currentStep} />

      <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-card md:p-8">
        <p className="text-sm font-medium text-imus-red">
          Step {currentStep + 1} of {steps.length}
        </p>
        <h2 className="mt-1 font-heading text-2xl font-bold text-imus-navy">{step.title}</h2>
        <p className="mt-2 text-sm text-gray-500">{step.description}</p>

        {isReview ? (
          <div className="mt-6 space-y-4">
            <dl className="divide-y divide-gray-100 rounded-lg border border-gray-100">
              {allFields.map((field) => (
                <div key={field.id} className="grid gap-1 px-4 py-3 sm:grid-cols-3">
                  <dt className="text-sm font-medium text-gray-500">{t(field.label)}</dt>
                  <dd className="text-sm text-imus-navy sm:col-span-2">
                    {field.type === "file"
                      ? files[field.id]?.name ?? values[field.id] ?? "—"
                      : values[field.id] || "—"}
                  </dd>
                </div>
              ))}
            </dl>
            <label className="flex items-start gap-3 rounded-lg bg-imus-gray p-4">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-imus-navy focus:ring-imus-navy"
              />
              <span className="text-sm text-gray-600">
                I certify that all information provided is true and correct. I agree to the Data
                Privacy Act of 2012.
              </span>
            </label>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-4">
            {step.fields.map((field) => (
              <FormFieldInput
                key={field.id}
                field={field}
                value={values[field.id] ?? ""}
                onChange={handleChange}
                onFileChange={handleFileChange}
                fileName={files[field.id]?.name}
              />
            ))}
          </div>
        )}

        {errorMsg && (
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {errorMsg}
          </div>
        )}

        <div className="mt-8 flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
          {currentStep === 0 ? (
            <Link
              href="/forms"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-600 transition-colors hover:bg-imus-gray focus-ring"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Forms
            </Link>
          ) : (
            <button
              type="button"
              onClick={goBack}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-600 transition-colors hover:bg-imus-gray focus-ring"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
          )}

          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={saveDraft}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-imus-navy transition-colors hover:bg-imus-gray focus-ring"
            >
              <Save className="h-4 w-4" />
              Save as Draft
            </button>
            {isLastStep ? (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={status === "submitting"}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-imus-navy px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-imus-navyDark disabled:opacity-60 focus-ring"
              >
                {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" />}
                Submit Application
              </button>
            ) : (
              <button
                type="button"
                onClick={goNext}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-imus-navy px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-imus-navyDark focus-ring"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
