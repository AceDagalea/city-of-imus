"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserPlus } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { STRINGS, t } from "@/lib/i18n";

interface OfficeOption {
  id: string;
  shortName: string;
}

export interface AdminUserRow {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  canApprove: boolean;
  officeIds: string[];
  isActive: boolean;
  isSelf: boolean;
}

const inputClass =
  "w-full rounded-lg border border-gray-200 px-3 py-2 text-sm transition-colors focus:border-tenant-navy focus:outline-none focus:ring-2 focus:ring-tenant-navy/20";

function CreateUserForm({ offices }: { offices: OfficeOption[] }) {
  const { language } = useLanguage();
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "STAFF",
    canApprove: false,
    officeIds: [] as string[],
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function toggleOffice(id: string) {
    setForm((prev) => ({
      ...prev,
      officeIds: prev.officeIds.includes(id)
        ? prev.officeIds.filter((o) => o !== id)
        : [...prev.officeIds, id],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Failed to create user");
      setBusy(false);
      return;
    }
    setForm({ firstName: "", lastName: "", email: "", password: "", role: "STAFF", canApprove: false, officeIds: [] });
    setBusy(false);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl bg-white p-6 shadow-card">
      <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-tenant-navy">
        <UserPlus className="h-4 w-4" aria-hidden="true" />
        {t(STRINGS.createUserTitle, language)}
      </h2>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label htmlFor="nu-first" className="mb-1 block text-xs font-medium text-tenant-navy">
            {t(STRINGS.firstNameLabel, language)}
          </label>
          <input id="nu-first" required value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} className={inputClass} />
        </div>
        <div>
          <label htmlFor="nu-last" className="mb-1 block text-xs font-medium text-tenant-navy">
            {t(STRINGS.lastNameLabel, language)}
          </label>
          <input id="nu-last" required value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} className={inputClass} />
        </div>
        <div>
          <label htmlFor="nu-email" className="mb-1 block text-xs font-medium text-tenant-navy">
            {t(STRINGS.emailLabel, language)}
          </label>
          <input id="nu-email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} />
        </div>
        <div>
          <label htmlFor="nu-pass" className="mb-1 block text-xs font-medium text-tenant-navy">
            {t(STRINGS.passwordLabel, language)}
          </label>
          <input id="nu-pass" type="password" required minLength={8} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className={inputClass} />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-6">
        <div>
          <label htmlFor="nu-role" className="mb-1 block text-xs font-medium text-tenant-navy">
            {t(STRINGS.roleLabel, language)}
          </label>
          <select
            id="nu-role"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className={inputClass}
          >
            <option value="STAFF">STAFF</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>

        {form.role === "STAFF" && (
          <>
            <label className="flex cursor-pointer items-center gap-2 pt-4 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={form.canApprove}
                onChange={(e) => setForm({ ...form, canApprove: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-tenant-navy focus:ring-tenant-navy"
              />
              {t(STRINGS.canApproveLabel, language)}
            </label>

            <fieldset className="pt-1">
              <legend className="mb-1 text-xs font-medium text-tenant-navy">
                {t(STRINGS.assignedOffices, language)}
              </legend>
              <div className="flex flex-wrap gap-2">
                {offices.map((office) => {
                  const active = form.officeIds.includes(office.id);
                  return (
                    <button
                      key={office.id}
                      type="button"
                      onClick={() => toggleOffice(office.id)}
                      aria-pressed={active}
                      className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors focus-ring ${
                        active ? "bg-tenant-navy text-white" : "bg-tenant-gray text-tenant-navy hover:bg-tenant-sky"
                      }`}
                    >
                      {office.shortName}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          </>
        )}
      </div>

      {error && (
        <p role="alert" className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={busy}
        className="mt-5 rounded-lg bg-tenant-navy px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-tenant-navyDark focus-ring disabled:opacity-60"
      >
        {busy ? t(STRINGS.processing, language) : t(STRINGS.createAccount, language)}
      </button>
    </form>
  );
}

function UserRow({ user, offices }: { user: AdminUserRow; offices: OfficeOption[] }) {
  const { language } = useLanguage();
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function patch(payload: Record<string, unknown>) {
    setBusy(true);
    await fetch(`/api/admin/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setBusy(false);
    router.refresh();
  }

  return (
    <tr className={`border-b border-gray-50 ${user.isActive ? "" : "opacity-50"}`}>
      <td className="px-5 py-3.5">
        <p className="font-semibold text-tenant-navy">
          {user.firstName} {user.lastName}
        </p>
        <p className="text-xs text-gray-500">{user.email}</p>
      </td>
      <td className="px-5 py-3.5">
        <span
          className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
            user.role === "ADMIN" ? "bg-gov-blue/10 text-gov-blueDark" : "bg-tenant-green/15 text-tenant-greenDark"
          }`}
        >
          {user.role}
        </span>
      </td>
      <td className="px-5 py-3.5">
        {user.role === "STAFF" ? (
          <label className="flex cursor-pointer items-center gap-2 text-xs text-gray-600">
            <input
              type="checkbox"
              checked={user.canApprove}
              disabled={busy || !user.isActive}
              onChange={(e) => patch({ canApprove: e.target.checked })}
              className="h-4 w-4 rounded border-gray-300 text-tenant-navy focus:ring-tenant-navy"
            />
            {t(STRINGS.canApproveLabel, language)}
          </label>
        ) : (
          <span className="text-xs text-gray-400">—</span>
        )}
      </td>
      <td className="px-5 py-3.5">
        {user.role === "STAFF" ? (
          <div className="flex flex-wrap gap-1.5">
            {offices.map((office) => {
              const active = user.officeIds.includes(office.id);
              return (
                <button
                  key={office.id}
                  type="button"
                  disabled={busy || !user.isActive}
                  aria-pressed={active}
                  onClick={() =>
                    patch({
                      officeIds: active
                        ? user.officeIds.filter((o) => o !== office.id)
                        : [...user.officeIds, office.id],
                    })
                  }
                  className={`rounded-full px-2.5 py-0.5 text-[0.68rem] font-semibold transition-colors focus-ring disabled:cursor-not-allowed ${
                    active ? "bg-tenant-navy text-white" : "bg-tenant-gray text-tenant-navy hover:bg-tenant-sky"
                  }`}
                >
                  {office.shortName}
                </button>
              );
            })}
          </div>
        ) : (
          <span className="text-xs text-gray-400">{t(STRINGS.allOffices, language)}</span>
        )}
      </td>
      <td className="px-5 py-3.5">
        <span className={`text-xs font-semibold ${user.isActive ? "text-tenant-greenDark" : "text-tenant-red"}`}>
          {user.isActive ? t(STRINGS.activeLabel, language) : t(STRINGS.deactivatedLabel, language)}
        </span>
      </td>
      <td className="px-5 py-3.5 text-right">
        {!user.isSelf && (
          <button
            type="button"
            disabled={busy}
            onClick={() => patch({ isActive: !user.isActive })}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors focus-ring disabled:opacity-60 ${
              user.isActive
                ? "bg-red-50 text-tenant-red hover:bg-red-100"
                : "bg-tenant-green/10 text-tenant-greenDark hover:bg-tenant-green/20"
            }`}
          >
            {user.isActive ? t(STRINGS.deactivateLabel, language) : t(STRINGS.activateLabel, language)}
          </button>
        )}
      </td>
    </tr>
  );
}

export default function UserAdmin({
  users,
  offices,
}: {
  users: AdminUserRow[];
  offices: OfficeOption[];
}) {
  const { language } = useLanguage();

  return (
    <div className="space-y-6">
      <CreateUserForm offices={offices} />

      <div className="overflow-x-auto rounded-xl bg-white shadow-card">
        <table className="w-full min-w-[860px] text-left text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500">
              <th className="px-5 py-3.5">{t(STRINGS.applicantLabel, language)}</th>
              <th className="px-5 py-3.5">{t(STRINGS.roleLabel, language)}</th>
              <th className="px-5 py-3.5">{t(STRINGS.canApproveLabel, language)}</th>
              <th className="px-5 py-3.5">{t(STRINGS.assignedOffices, language)}</th>
              <th className="px-5 py-3.5">{t(STRINGS.statusLabel, language)}</th>
              <th className="px-5 py-3.5" aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <UserRow key={user.id} user={user} offices={offices} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
