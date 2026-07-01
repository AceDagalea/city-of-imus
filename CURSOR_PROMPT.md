# Cursor Prompt — LGU Digital Services Platform Template

Paste this into Cursor (Composer/Agent mode) in the project root. Do the phases **one at a time, in order**, stopping for review between phases — do not attempt all phases in a single pass.

---

## Context to give Cursor first

```
This repo is a Next.js 14 (App Router) + TypeScript + Tailwind government website,
currently built specifically for the City of Imus, Philippines. Read
SYSTEM_TEMPLATE_MASTER_PLAN.md in the repo root fully before doing anything —
it is the authoritative spec for this work. It documents the current state,
the target architecture, the Republic of the Philippines design system to apply,
the request/workflow data model, and the Admin/Staff/Citizen role system.

Goal: turn this single-city site into a reusable template any Philippine city
or municipality can deploy by editing configuration, not code, while keeping
the app fully functional for Imus (Imus becomes the reference tenant, not a
special case in the code).

Work in the phases below, one at a time. After each phase: run `npm run build`
and `npm run lint`, fix any errors, then summarize what changed and STOP for
my review before starting the next phase. Do not invent scope beyond what a
phase describes — if something looks missing or ambiguous, ask rather than guess.
```

---

## Phase 0 — Extract tenant config (do this first, it unblocks everything else)

1. Create `config/tenant.schema.ts` — a Zod schema for `TenantConfig` matching the shape in `SYSTEM_TEMPLATE_MASTER_PLAN.md` §3.2 (identity, brand, contact, executive, offices, forms, modules feature flags).
2. Create `config/tenants/imus.config.ts` — move **every** hardcoded value currently in `lib/constants.ts`, `lib/forms.ts` (`FORM_CATEGORIES`, `CITY_FORMS`), and `lib/digital-services.ts` into this file, typed against `TenantConfig`. Nothing city-specific should be left behind in `lib/`.
3. Create `config/tenants/_template.config.ts` — a copy of the Imus config with all values blanked/placeholder'd (`"[LGU NAME]"`, empty arrays, etc.) plus inline comments explaining each field, meant to be duplicated for a new city.
4. Create `config/tenant.config.ts` that reads `process.env.TENANT` (default `"imus"`) and exports the matching config object, validated through the Zod schema at startup (throw a clear error if a required field is missing).
5. Rewrite `lib/constants.ts`, `lib/forms.ts`, `lib/digital-services.ts` to **re-export data and helper functions sourced from `config/tenant.config.ts`** instead of containing literals. Keep every existing exported function name and signature identical (`getFormBySlug`, `getFormsByCategory`, `getOnlineForms`, `getCategoryById`, `searchForms`, `getMostRequestedForms`, `getFormsForAudience`, `getFormMeta`, etc.) so no component call sites need to change in this phase.
6. Add `TENANT=imus` to `.env.local.example` (create this file if it doesn't exist).
7. Verify: the site should build and look/behave **identically** to before this phase — this phase is a pure refactor, zero visual or functional change.

**Acceptance:** `grep -ri "imus" lib/constants.ts lib/forms.ts lib/digital-services.ts` returns nothing (all Imus data now lives only in `config/tenants/imus.config.ts`).

---

## Phase 1 — Apply the Republic of the Philippines design system

Reference: `SYSTEM_TEMPLATE_MASTER_PLAN.md` §4.

1. In `tailwind.config.ts`, add a `gov` color namespace (`blue #0038A8`, `blueDark #002776`, `red #CE1126`, `gold #FCD116`) alongside the existing brand colors. Add `tenant.primary/secondary/accent` as CSS-variable-backed colors (`var(--tenant-primary)` etc.) instead of hardcoded `imus.*` hex values — rename `imus.*` usages across the codebase to `tenant.*`.
2. In the root layout (`app/layout.tsx`), set `--tenant-primary`, `--tenant-secondary`, `--tenant-accent` as inline CSS custom properties sourced from `config/tenant.config.ts` brand fields, so re-skinning is a config edit, not a Tailwind rebuild.
3. Extend `components/layout/UtilityBar.tsx`: add a slim top strip above it (or as its top row) reading "Republic of the Philippines" / "Republika ng Pilipinas" per active language, using `gov.blue` background. Include the language toggle (already exists — verify it's wired to `lib/i18n.ts`) and add a basic accessibility control: font-size step (A- / A / A+) and a high-contrast toggle, both persisted in a cookie or localStorage-free React context (no `localStorage` in artifacts context doesn't apply here since this is the real app, but keep it simple — a client context provider is fine).
4. Build `components/shared/TransparencySealBadge.tsx` and place it on the homepage in a clearly visible position (not buried in the footer only). Link it to `/transparency` (route already exists at `app/transparency`).
5. Update `components/layout/Footer.tsx` to add the standard legal strip described in the master plan §4.2 point 5: LGU legal name (from tenant config), Transparency Seal link, FOI link (config-driven URL, default to `https://www.foi.gov.ph`), a Privacy Policy line referencing RA 10173, and an accessibility statement line. Pull all copy from `config/tenant.config.ts`, don't hardcode Imus text.
6. Do **not** change page layout/structure beyond the header/footer/utility-bar chrome in this phase — content pages stay as-is.

**Acceptance:** national chrome (utility bar, footer legal strip, transparency seal) is visually consistent and present on every page; Imus's own navy/green still shows through in buttons/links/cards (i.e., `tenant.*` colors, not `gov.*`, drive the page body).

---

## Phase 2 — Database layer (parallel-safe with Phase 0/1, do independently)

Reference: `SYSTEM_TEMPLATE_MASTER_PLAN.md` §6.4, §5.3.

1. Add Prisma. Default datasource: SQLite (`prisma/dev.db`), with the connection string in `.env.local` so swapping to Postgres later is a one-line change — don't hardcode SQLite-only features.
2. Create `prisma/schema.prisma` with `User`, `Role` enum, `Submission`, `SubmissionStatus` enum, `SubmissionEvent`, `Attachment` — use the exact sketch in the master plan §6.4 as the starting point, adjust field types as Prisma requires.
3. Run the initial migration, commit the generated migration folder.
4. Create `lib/db.ts` exporting a singleton `PrismaClient` (the standard Next.js dev-hot-reload-safe pattern — guard against creating multiple clients in dev).
5. Rewrite `app/api/forms/submit/route.ts`: stop writing to `data/submissions/*.json`. Instead:
   - Require an authenticated citizen session (this will initially fail until Phase 3 lands auth — that's expected and fine; wire the auth check now, stub/skip enforcement behind a `// TODO Phase 3` comment if needed to keep the route testable before auth exists).
   - Create a `Submission` row with `status: SUBMITTED`, plus one `SubmissionEvent` (`toStatus: SUBMITTED`).
   - Keep file attachments on local disk under `data/submissions/<referenceNo>/` for now (object storage is explicitly deferred per master plan §5.3/§9) but store their paths in `Attachment` rows, not just on disk.
6. Leave the existing `data/submissions/*.json` files alone (don't delete/migrate old sample data) — this phase only changes what happens going forward.

**Acceptance:** `npx prisma studio` shows a `Submission` row after a test form submit; no more new files appear under `data/submissions/*.json` after this phase (only the attachment subfolder).

---

## Phase 3 — Auth & RBAC

Reference: `SYSTEM_TEMPLATE_MASTER_PLAN.md` §6.3, §6.1, §6.2.

**Before starting this phase, confirm with me:** SQLite vs Postgres for anything beyond local dev, and whether citizen email verification is required at launch (see master plan §9, items 2 and 4). Don't guess on these.

1. Install and configure Auth.js (NextAuth v5) with a Credentials provider (email + bcrypt-hashed password) as the baseline. Structure the config so an OAuth provider could be added later without restructuring (per master plan §6.3 — email/password is the baseline, not a fallback).
2. Build `/app/(auth)/login` and `/app/(auth)/register` pages. Registration is citizen-only and self-serve; Staff/Admin accounts are never self-registrable (see step 6).
3. Create `lib/auth.ts` (session helpers: `getSession()`, `requireRole(role)`) and `lib/rbac.ts` implementing the permission matrix in master plan §6.2, including the segregation-of-duties rule: a staff member with `canApprove` cannot approve a submission they themselves moved to `UNDER_REVIEW` (compare `actorId` across `SubmissionEvent` rows for that submission).
4. Add `middleware.ts` protecting `/admin/*` (ADMIN only), `/staff/*` (STAFF/ADMIN), `/citizen/*` (CITIZEN/ADMIN), redirecting unauthenticated users to `/login`.
5. Update `app/api/forms/submit/route.ts` to properly enforce the citizen session requirement stubbed in Phase 2, and set `citizenId` on the created `Submission` from the session.
6. Seed one Admin account via a Prisma seed script (`prisma/seed.ts`) — this is the only way an Admin account should ever get created outside the app itself; document this in the seed file's comments.

**Acceptance:** unauthenticated visits to `/admin`, `/staff`, `/citizen` redirect to login; a logged-in citizen can submit a form and see it tied to their account in Prisma Studio.

---

## Phase 4 — Citizen dashboard

1. `/app/citizen/dashboard` — list the logged-in citizen's submissions with status badges.
2. `/app/citizen/applications/[referenceNo]` — detail view: current status, timeline built from `SubmissionEvent` rows, ability to respond (upload additional documents / reply) when status is `NEEDS_INFO`.
3. Reuse existing form UX components (`components/forms/digital/*`) for the "respond to needs-info" flow rather than building new ones.

**Acceptance:** a citizen can submit a request, see it appear in their dashboard, and (once staff mark it `NEEDS_INFO` via the seed/test data or Phase 5 UI) respond to it.

---

## Phase 5 — Staff console

1. `/app/staff/queue` — submissions filtered to the offices the logged-in staff member is assigned to (`User.officeIds`), grouped/sortable by status and age.
2. `/app/staff/submissions/[id]` — process actions: move to `UNDER_REVIEW`, request info (`NEEDS_INFO`), and — only if `session.user.canApprove` — approve/reject, respecting the segregation-of-duties rule from Phase 3.
3. Every action writes a `SubmissionEvent`.

**Acceptance:** a `canApprove: false` staff account cannot see or trigger approve/reject actions in the UI or the API (enforce server-side in the route handler, not just hidden in the UI).

---

## Phase 6 — Admin console

1. `/app/admin/users` — list/create/deactivate Staff and Admin accounts, assign `officeIds` and toggle `canApprove` per staff account.
2. `/app/admin/submissions` — cross-office view of all submissions with filters.
3. `/app/admin/offices` — CRUD for the office/category catalog (still config-seeded per master plan §5.1 — this phase can start as a **read-only** view of `config/tenant.config.ts` offices with a note that full CRUD is Phase 7, unless it's clear DB-backed offices are wanted sooner).
4. `/app/admin/content` — surface for editing the non-form tenant config fields (contact info, hero copy, hotlines) — again, fine to ship read-only/JSON-edit first if a full form UI is too much for one phase.

**Acceptance:** an Admin can deactivate a staff account and confirm that account can no longer log in.

---

## Phase 7 (future, not required for initial launch)

DB-backed forms builder, object storage for attachments, second reference tenant to prove the template abstraction, PhilSys/eGov PH integration exploration. Don't start this without explicit go-ahead — flag it as done-when-asked-for at the end of Phase 6.

---

## Guardrails for every phase

- Don't touch `public/banaag`, `public/disclosure-pdfs`, or the `scripts/generate-*.mjs` scrapers unless a phase explicitly calls for it — they're Imus-specific data pipelines, out of scope for the template work itself.
- Keep `en`/`fil` localization working for anything you touch — don't add new user-facing strings without both keys in `lib/i18n.ts`.
- Every new API route that mutates data must check the session/role server-side — never trust a client-side role check alone.
- If a phase's acceptance criteria can't be met without a decision only the product owner can make (see master plan §9), stop and ask instead of picking a default silently.
