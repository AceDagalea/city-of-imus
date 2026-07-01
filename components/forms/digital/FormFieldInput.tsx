"use client";

import { Calendar } from "lucide-react";
import type { FormField } from "@/lib/form-fields";
import { getFieldColSpan } from "@/lib/form-steps";
import { t } from "@/lib/i18n";

interface FormFieldInputProps {
  field: FormField;
  value: string;
  onChange: (id: string, value: string) => void;
  onFileChange?: (id: string, file: File | null) => void;
  fileName?: string;
}

export default function FormFieldInput({
  field,
  value,
  onChange,
  onFileChange,
  fileName,
}: FormFieldInputProps) {
  const colSpan = getFieldColSpan(field);
  const inputClass =
    "w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-tenant-navy outline-none transition-colors placeholder:text-gray-400 focus:border-tenant-navy focus:ring-2 focus:ring-tenant-navy/15";

  return (
    <div className={`col-span-2 ${colSpan}`}>
      <label htmlFor={field.id} className="mb-1.5 block text-sm font-medium text-tenant-navy">
        {t(field.label)}
        {field.required && <span className="text-tenant-red"> *</span>}
      </label>

      {field.id === "sex" && field.type === "select" && field.options ? (
        <div className="flex flex-wrap gap-4 pt-1">
          {field.options.map((opt) => (
            <label key={opt.value} className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
              <input
                type="radio"
                name={field.id}
                value={opt.value}
                checked={value === opt.value}
                onChange={(e) => onChange(field.id, e.target.value)}
                required={field.required && !value}
                className="h-4 w-4 border-gray-300 text-tenant-navy focus:ring-tenant-navy"
              />
              {t(opt.label)}
            </label>
          ))}
        </div>
      ) : field.type === "textarea" ? (
        <textarea
          id={field.id}
          value={value}
          onChange={(e) => onChange(field.id, e.target.value)}
          required={field.required}
          rows={4}
          placeholder={field.placeholder ? t(field.placeholder) : undefined}
          className={inputClass}
        />
      ) : field.type === "select" ? (
        <select
          id={field.id}
          value={value}
          onChange={(e) => onChange(field.id, e.target.value)}
          required={field.required}
          className={inputClass}
        >
          <option value="">
            {field.placeholder ? t(field.placeholder) : "Select..."}
          </option>
          {field.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {t(opt.label)}
            </option>
          ))}
        </select>
      ) : field.type === "file" ? (
        <div>
          <input
            id={field.id}
            type="file"
            required={field.required && !fileName}
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => onFileChange?.(field.id, e.target.files?.[0] ?? null)}
            className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm file:mr-4 file:rounded-full file:border-0 file:bg-tenant-navy file:px-4 file:py-1.5 file:text-sm file:font-medium file:text-white"
          />
          {fileName && <p className="mt-1 text-xs text-gray-500">Selected: {fileName}</p>}
        </div>
      ) : field.type === "date" ? (
        <div className="relative">
          <input
            id={field.id}
            type="date"
            value={value}
            onChange={(e) => onChange(field.id, e.target.value)}
            required={field.required}
            className={`${inputClass} pr-10`}
          />
          <Calendar className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        </div>
      ) : (
        <input
          id={field.id}
          type={field.type}
          value={value}
          onChange={(e) => onChange(field.id, e.target.value)}
          required={field.required}
          placeholder={field.placeholder ? t(field.placeholder) : undefined}
          className={inputClass}
        />
      )}

      {field.helpText && <p className="mt-1.5 text-xs text-gray-500">{t(field.helpText)}</p>}
    </div>
  );
}
