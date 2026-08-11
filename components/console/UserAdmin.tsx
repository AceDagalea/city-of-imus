"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Search, UserPlus } from "lucide-react";
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

const AVATAR = [
  "bg-[#f0ecfb] text-[#6b46c1]",
  "bg-[#e7f6ee] text-[#1f9d55]",
  "bg-[#fdf4e3] text-[#b7791f]",
  "bg-[#eef2fb] text-[#2b57c4]",
  "bg-[#fdecea] text-[#c0392b]",
];

const fieldClass =
  "w-full rounded-[10px] border border-[#e6e9f0] bg-white px-3.5 py-2.5 text-[13.5px] text-[#141a29] outline-none transition-shadow focus:border-[#2b57c4] focus:shadow-[0_0_0_3px_rgba(43,87,196,.28)]";

function initials(first: string, last: string) {
  return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase() || "?";
}

function CreateUserForm({ offices }: { offices: OfficeOption[] }) {
  const { language } = useLanguage();
  const router = useRouter();
  const empty = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "STAFF",
    canApprove: false,
    officeIds: [] as string[],
  };
  const [form, setForm] = useState(empty);
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

  function clear() {
    setForm(empty);
    setError(null);
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
    clear();
    setBusy(false);
    router.refresh();
  }

  return (
    <div
      id="create"
      className="scroll-mt-24 overflow-hidden rounded-2xl border border-[#e6e9f0] bg-white shadow-[0_2px_6px_rgba(16,24,64,.05),0_12px_28px_rgba(16,24,64,.07)]"
    >
      <div className="flex items-center gap-3 border-b border-[#e6e9f0] px-[22px] py-[17px]">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#eaf0fc] text-[#2b57c4]">
          <Plus className="h-4 w-4" aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-base font-extrabold text-[#12275c]">{t(STRINGS.createUserTitle, language)}</h2>
          <p className="text-[12.5px] text-[#5f6a7d]">{t(STRINGS.createUserHelp, language)}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-[22px]">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label htmlFor="nu-first" className="mb-1.5 block text-[12.5px] font-bold text-[#5f6a7d]">
              {t(STRINGS.firstNameLabel, language)}
            </label>
            <input
              id="nu-first"
              required
              placeholder="Juan"
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="nu-last" className="mb-1.5 block text-[12.5px] font-bold text-[#5f6a7d]">
              {t(STRINGS.lastNameLabel, language)}
            </label>
            <input
              id="nu-last"
              required
              placeholder="Dela Cruz"
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="nu-email" className="mb-1.5 block text-[12.5px] font-bold text-[#5f6a7d]">
              {t(STRINGS.emailLabel, language)}
            </label>
            <input
              id="nu-email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="nu-pass" className="mb-1.5 block text-[12.5px] font-bold text-[#5f6a7d]">
              {t(STRINGS.passwordLabel, language)}
            </label>
            <input
              id="nu-pass"
              type="password"
              required
              minLength={8}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className={fieldClass}
            />
          </div>
        </div>

        <div className="mt-[18px] grid gap-[22px] md:grid-cols-[200px_auto_1fr] md:items-start">
          <div>
            <label htmlFor="nu-role" className="mb-1.5 block text-[12.5px] font-bold text-[#5f6a7d]">
              {t(STRINGS.roleLabel, language)}
            </label>
            <select
              id="nu-role"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className={fieldClass}
            >
              <option value="STAFF">STAFF</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>

          {form.role === "STAFF" ? (
            <label className="flex cursor-pointer items-center gap-2 pt-0 text-[13.5px] text-[#141a29] md:pt-[29px]">
              <input
                type="checkbox"
                checked={form.canApprove}
                onChange={(e) => setForm({ ...form, canApprove: e.target.checked })}
                className="h-[17px] w-[17px] accent-[#2b57c4]"
              />
              {t(STRINGS.canApproveLabel, language)}
            </label>
          ) : (
            <span />
          )}

          {form.role === "STAFF" ? (
            <div>
              <div className="mb-2 text-[12.5px] font-bold text-[#5f6a7d]">
                {t(STRINGS.assignedOffices, language)}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {offices.map((office) => {
                  const active = form.officeIds.includes(office.id);
                  return (
                    <button
                      key={office.id}
                      type="button"
                      onClick={() => toggleOffice(office.id)}
                      aria-pressed={active}
                      className={`rounded-full border px-3.5 py-1.5 text-[12px] font-bold transition-colors focus-ring ${
                        active
                          ? "border-[#12275c] bg-[#12275c] text-white"
                          : "border-[#e6e9f0] bg-white text-[#5f6a7d] hover:border-[#2b57c4] hover:text-[#2b57c4]"
                      }`}
                    >
                      {office.shortName}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="pt-[29px] text-[12.5px] italic text-[#8b95a7]">
              {t(STRINGS.allOffices, language)}
            </div>
          )}
        </div>

        {error && (
          <p role="alert" className="mt-4 rounded-[10px] bg-[#fdecea] px-3 py-2 text-sm text-[#c0392b]">
            {error}
          </p>
        )}

        <div className="mt-[22px] flex flex-wrap gap-2.5 border-t border-[#e6e9f0] pt-[18px]">
          <button
            type="submit"
            disabled={busy}
            className="inline-flex items-center gap-2 rounded-[11px] bg-[#12275c] px-[22px] py-2.5 text-[13.5px] font-bold text-white transition-colors hover:bg-[#1b3a86] focus-ring disabled:opacity-60"
          >
            <UserPlus className="h-4 w-4" aria-hidden="true" />
            {busy ? t(STRINGS.processing, language) : t(STRINGS.createAccount, language)}
          </button>
          <button
            type="button"
            onClick={clear}
            className="inline-flex items-center rounded-[10px] border border-[#e6e9f0] bg-white px-5 py-2.5 text-[13.5px] font-bold text-[#12275c] transition-colors hover:border-[#2b57c4] hover:text-[#2b57c4] focus-ring"
          >
            {t(STRINGS.clearForm, language)}
          </button>
        </div>
      </form>
    </div>
  );
}

function UserRow({
  user,
  offices,
  tone,
}: {
  user: AdminUserRow;
  offices: OfficeOption[];
  tone: string;
}) {
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
    <tr className={`border-t border-[#e6e9f0] transition-colors hover:bg-[#eef1f6] ${user.isActive ? "" : "opacity-60"}`}>
      <td className="px-[22px] py-[15px]">
        <div className="flex items-center gap-2.5">
          <span className={`inline-flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full text-xs font-extrabold ${tone}`}>
            {initials(user.firstName, user.lastName)}
          </span>
          <div>
            <span className="block text-[13.5px] font-bold text-[#141a29]">
              {user.firstName} {user.lastName}
            </span>
            <span className="block text-xs text-[#5f6a7d]">{user.email}</span>
          </div>
        </div>
      </td>
      <td className="px-[22px] py-[15px]">
        <span
          className={`inline-block rounded-full px-2.5 py-1 text-[11px] font-extrabold tracking-wide ${
            user.role === "ADMIN" ? "bg-[#f0ecfb] text-[#6b46c1]" : "bg-[#e7f6ee] text-[#1f9d55]"
          }`}
        >
          {user.role}
        </span>
      </td>
      <td className="px-[22px] py-[15px]">
        {user.role === "STAFF" ? (
          <label className="inline-flex cursor-pointer items-center gap-1.5 text-[12.5px] text-[#5f6a7d]">
            <input
              type="checkbox"
              checked={user.canApprove}
              disabled={busy || !user.isActive}
              onChange={(e) => patch({ canApprove: e.target.checked })}
              className="h-4 w-4 accent-[#1f9d55]"
            />
            {t(STRINGS.yesLabel, language)}
          </label>
        ) : (
          <span className="text-[#8b95a7]">—</span>
        )}
      </td>
      <td className="px-[22px] py-[15px]">
        {user.role === "ADMIN" ? (
          <span className="inline-block rounded-md bg-[#eef1f6] px-2 py-0.5 text-[10px] font-bold italic text-[#5f6a7d]">
            {t(STRINGS.allOffices, language)}
          </span>
        ) : (
          <div className="flex max-w-[340px] flex-wrap gap-1">
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
                  className={`rounded-md px-2 py-0.5 text-[10px] font-bold transition-colors focus-ring disabled:cursor-not-allowed ${
                    active
                      ? "bg-[#eaf0fc] text-[#2b57c4]"
                      : "bg-[#eef1f6] text-[#8b95a7] hover:bg-[#eaf0fc] hover:text-[#2b57c4]"
                  }`}
                >
                  {office.shortName}
                </button>
              );
            })}
          </div>
        )}
      </td>
      <td className="px-[22px] py-[15px]">
        <span
          className={`inline-flex items-center gap-1.5 text-[12.5px] font-bold ${
            user.isActive ? "text-[#1f9d55]" : "text-[#c0392b]"
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
          {user.isActive ? t(STRINGS.activeLabel, language) : t(STRINGS.deactivatedLabel, language)}
        </span>
      </td>
      <td className="px-[22px] py-[15px] text-right">
        {!user.isSelf && (
          <button
            type="button"
            disabled={busy}
            onClick={() => patch({ isActive: !user.isActive })}
            className={`rounded-[9px] px-3.5 py-1.5 text-xs font-bold transition-colors focus-ring disabled:opacity-60 ${
              user.isActive
                ? "bg-[#fdecea] text-[#c0392b] hover:brightness-95"
                : "bg-[#e7f6ee] text-[#1f9d55] hover:brightness-95"
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
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter((u) =>
      `${u.firstName} ${u.lastName} ${u.email}`.toLowerCase().includes(q)
    );
  }, [users, query]);

  return (
    <div className="flex flex-col gap-[22px]">
      <CreateUserForm offices={offices} />

      <div className="overflow-hidden rounded-2xl border border-[#e6e9f0] bg-white shadow-[0_2px_6px_rgba(16,24,64,.05),0_12px_28px_rgba(16,24,64,.07)]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e6e9f0] px-[22px] py-[17px]">
          <label className="flex min-w-[250px] flex-1 items-center gap-2 rounded-[11px] border border-[#e6e9f0] bg-white px-3.5 py-2 sm:max-w-sm">
            <Search className="h-4 w-4 shrink-0 text-[#8b95a7]" aria-hidden="true" />
            <span className="sr-only">{t(STRINGS.searchUsers, language)}</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t(STRINGS.searchUsers, language)}
              className="w-full border-0 bg-transparent text-[13.5px] outline-none placeholder:text-[#8b95a7]"
            />
          </label>
          <span className="text-[12.5px] text-[#5f6a7d]">
            {t(STRINGS.accountsCount, language).replace("{count}", String(filtered.length))}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] border-collapse text-left">
            <thead>
              <tr className="bg-[#fafbfe]">
                <th className="px-[22px] py-3 text-[11px] font-extrabold uppercase tracking-wide text-[#8b95a7]">
                  User
                </th>
                <th className="px-[22px] py-3 text-[11px] font-extrabold uppercase tracking-wide text-[#8b95a7]">
                  {t(STRINGS.roleLabel, language)}
                </th>
                <th className="px-[22px] py-3 text-[11px] font-extrabold uppercase tracking-wide text-[#8b95a7]">
                  {t(STRINGS.canApproveLabel, language)}
                </th>
                <th className="px-[22px] py-3 text-[11px] font-extrabold uppercase tracking-wide text-[#8b95a7]">
                  {t(STRINGS.assignedOffices, language)}
                </th>
                <th className="px-[22px] py-3 text-[11px] font-extrabold uppercase tracking-wide text-[#8b95a7]">
                  {t(STRINGS.statusLabel, language)}
                </th>
                <th className="px-[22px] py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((user, i) => (
                <UserRow key={user.id} user={user} offices={offices} tone={AVATAR[i % AVATAR.length]} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
