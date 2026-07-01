# LGU Digital Services Platform — Master Plan
### From "City of Imus website" → reusable Republic of the Philippines LGU template

**Status:** Planning document for engineering reference (Cursor implementation)
**Codebase:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion
**Prepared:** July 2026

---

## 1. Goal

Convert the current single-city Imus website into a **white-label template** that any Philippine city or municipality (LGU) can deploy by changing configuration, not code. The template ships with:

1. A **national Republic of the Philippines visual system** as the default motif (flag colors, official seal conventions, Bagong Pilipinas branding placement, transparency seal) that any LGU wears "over" its own local logo/colors.
2. A **generic online request/services module** — the existing forms system generalized so any LGU can define its own offices, categories, and forms via config/data instead of hardcoded TypeScript.
3. A **user management system** with three role tiers — **Admin**, **Staff** (processing + approval), and **Citizen** — replacing the current no-auth, file-based submission flow.

This document is the reference spec. `CURSOR_PROMPT.md` (companion file) is the execution prompt that points Cursor at this document and works through it in phases.

---

## 2. Current State Audit

The existing app is a fully working Imus-only prototype with no auth and no database. Key facts that shape the migration:

| Area | Current implementation | Problem for templatization |
|---|---|---|
| Branding | `lib/constants.ts` hardcodes `SITE_URL`, colors, hero copy, mayor name/photo, hotlines, news, events, landmarks, stats | All city-specific data lives in code, not config |
| Theme colors | `tailwind.config.ts` → `imus.navy/green/red` palette | Named after Imus; no national layer; no per-tenant override |
| Services/forms | `lib/forms.ts` (`CITY_FORMS`, `FORM_CATEGORIES`), `lib/digital-services.ts` | ~90 forms hardcoded with Imus office names (BPLO, OBO, CCR, etc.) and PDF URLs pointing at `cityofimus.gov.ph` |
| Submission handling | `app/api/forms/submit/route.ts` writes JSON files to `data/submissions/*.json` on local disk, no auth, no applicant account, no status tracking beyond a generated reference number | No persistence layer, no ownership, no workflow, not multi-tenant safe (disk writes on serverless won't persist) |
| Users | None. No login, no roles, no session. | Everything needed for Admin/Staff/Citizen must be built from scratch |
| i18n | `lib/i18n.ts` — `en`/`fil` structure exists but `t()` currently always returns `.en` | Good bones, needs to actually switch on locale and be tenant-extensible |
| Content pages | `app/about`, `app/full-disclosure`, `app/news`, `app/tourism`, etc. — deeply Imus-specific (barangay officials, BanAAg, past mayors) | Needs a "core vs. optional module" split so a small municipality doesn't need BanAAg/GAD scaffolding |
| Data generation | `scripts/generate-*.mjs` scrape/build JSON from Imus-specific sources into `lib/generated/*.json` | Fine as a pattern; needs to become per-tenant data ingestion, not baked into repo |

**Bottom line:** the presentation layer (components, page structure, form UX) is reusable almost as-is. The **data** (constants, forms catalog) and the **backend** (submission storage, auth) are the two things that must be rebuilt for this to become a real template.

---

## 3. Target Architecture

### 3.1 Multi-tenancy model

Recommend **config-per-deployment**, not one shared multi-tenant database serving many cities from one running instance (simpler, matches how LGUs actually procure/host software — each city gets its own instance/subdomain, own data, own admins). This avoids cross-tenant data-leak risk entirely and is the safer default for a government system.

```
/config
  tenant.config.ts        ← single source of truth for "which city is this deployment"
  tenant.schema.ts         ← zod schema validating tenant.config.ts shape
  tenants/
    imus.config.ts         ← example: City of Imus, Cavite
    _template.config.ts    ← blank starter a new LGU copies and fills in
```

At build/deploy time, `TENANT=imus` (env var) selects which config file is bundled. One codebase, many deployable instances. If true single-instance multi-tenancy (subdomain-per-city on shared infra) is wanted later, the same config object becomes a DB-backed `Tenant` row keyed by hostname — the shape doesn't change, only where it's loaded from. Design the config object so that swap is possible later without a rewrite.

### 3.2 What moves into `tenant.config.ts`

Everything currently in `lib/constants.ts` plus new fields:

```ts
export interface TenantConfig {
  // Identity
  lguType: "city" | "municipality" | "province";
  lguName: { en: string; fil: string };       // "City of Imus"
  province: string;
  region: string;
  psgcCode: string;                            // PH Standard Geographic Code
  motto: { en: string; fil: string };

  // Branding (layered ON TOP of the national design system — see §4)
  brand: {
    primary: string;      // local accent color, replaces "imus.navy"
    secondary: string;
    accent: string;
    logoUrl: string;
    sealUrl: string;
  };

  // Contact / office info
  contact: { address: string; hours: string; mainLines: string[]; emergency: string; email: string; facebook?: string; ... };

  // Leadership
  executive: { title: { en: string; fil: string }; name: string; photoUrl: string };

  // Org structure — replaces hardcoded FORM_CATEGORIES
  offices: OfficeConfig[];

  // Feature flags — lets a small municipality turn off modules Imus has
  modules: {
    fullDisclosure: boolean;
    tourism: boolean;
    banaag: boolean;
    gadDatabase: boolean;
    jobPortal: boolean;
  };
}
```

`lib/constants.ts`, `lib/forms.ts`, `lib/digital-services.ts` stop containing data and instead become **pure functions that read from the active tenant config** (imported from `/config`). Components that currently `import { CONTACT, NAV_ITEMS } from "@/lib/constants"` don't need to change their call sites — only what's behind the import changes. This is the key move that makes the diff manageable: **keep the function signatures, swap the data source.**

### 3.3 Target folder structure (additions in bold)

```
app/
  (public)/                     # existing citizen-facing pages, unchanged in behavior
  **(auth)/**
    **login/**
    **register/**
    **verify/**
  **admin/**                    # Admin console (protected)
    dashboard/
    submissions/
    users/
    offices/
    forms-builder/
    content/
  **staff/**                    # Staff console (protected)
    queue/
    submissions/[id]/
  **citizen/**                  # Citizen self-service (protected)
    dashboard/
    applications/
    applications/[referenceNo]/
  api/
    forms/submit/                # rewritten to persist via DB, not fs
    **auth/**                    # NextAuth or custom session routes
    **admin/**
    **staff/**
config/
  tenant.config.ts
  tenants/
lib/
  **db.ts**                      # Prisma client singleton
  **auth.ts**                    # session/role helpers
  **rbac.ts**                    # permission matrix + guards
prisma/
  **schema.prisma**
  **migrations/**
```

---

## 4. National Design System — "Republic of the Philippines" motif

This becomes the **default look** of the template, applied at the shell/chrome level, with each LGU's own colors/logo layered on top per §3.2. Two things are being combined and must stay visually distinct:

- **National frame** — signals "this is an official Philippine government digital service." Consistent across every deployment.
- **Local identity** — the specific LGU's seal, name, and accent color, shown inside that frame.

### 4.1 Color system

Base the default Tailwind palette on the Philippine flag, replacing the current `imus.*` namespace with a generic `gov.*` namespace that any tenant can re-point:

| Token | Hex | Source |
|---|---|---|
| `gov.blue` | `#0038A8` | PH flag blue |
| `gov.blueDark` | `#002776` | header/footer depth |
| `gov.red` | `#CE1126` | PH flag red |
| `gov.gold` | `#FCD116` | PH flag sun/stars gold — use sparingly, as accent/divider only, never body text on white |
| `gov.white` | `#FFFFFF` | PH flag white |
| `tenant.primary` | *(from config)* | LGU's own primary — e.g. Imus keeps navy `#1A3668` |
| `tenant.secondary` | *(from config)* | LGU's own secondary — e.g. Imus green `#39A843` |

Default rule: **`gov.*` drives the outer chrome** (top utility bar, official banners, footer legal strip, seals). **`tenant.*` drives everything inside the page body** (buttons, links, cards) so each city still feels distinct. This mirrors how real PH government sites work — a consistent national top bar with the agency's own branding below it.

Update `tailwind.config.ts`:
```ts
colors: {
  gov: { blue: "#0038A8", blueDark: "#002776", red: "#CE1126", gold: "#FCD116" },
  tenant: {
    primary: "var(--tenant-primary)",
    secondary: "var(--tenant-secondary)",
    accent: "var(--tenant-accent)",
  },
}
```
Tenant colors as CSS variables (set in the root layout from `tenant.config.ts`) means no rebuild is needed to re-skin — just change the config and colors flow through automatically at runtime as well as build time.

### 4.2 Required elements (per DICT / Bagong Pilipinas government comms guidance)

Researched current official guidance (Memorandum Circular No. 24, s.2023 and 2025 agency dissemination memos; DICT's Government Website Template Design guidelines under the iGovPhil program):

1. **Bagong Pilipinas logo** — top-left placement on the header, LGU's own department/office logo placed *before* (to the left of) the Bagong Pilipinas logo when both appear together. Provide both a full-color and monochrome asset slot in `tenant.config.ts.brand`.
2. **Transparency Seal** — must be prominently displayed on the homepage and accessible from every page (footer link is acceptable site-wide, but homepage needs a visible seal/badge, not just a link). Build a `<TransparencySealBadge>` component and a `/transparency` route that's part of the core (non-optional) module set.
3. **Official seal of the LGU** — displayed alongside the national elements, not replacing them.
4. **Utility/top bar** — a slim bar above the main navbar carrying "Republic of the Philippines" (EN) / "Republika ng Pilipinas" (FIL) text, official language toggle, and accessibility controls (font size / high-contrast toggle — see §7 accessibility). The current `components/layout/UtilityBar.tsx` is the right place to build this — extend rather than replace it.
5. **Footer legal strip** — standard gov.ph-style footer block: LGU full legal name, address, official social links, Transparency Seal, FOI (Freedom of Information) link, Privacy Policy / Data Privacy Act (RA 10173) notice, and accessibility statement (RA 10754 / NCDA ICTO Joint Circular 1-2010 compliance note).

### 4.3 Typography & tone

Keep the current `Montserrat` (body/heading) + `Libre Baskerville` (display) pairing — it already reads as formal/official and needs no change. Don't introduce a third typeface.

### 4.4 What NOT to hardcode nationally

Mayor/executive photos, hero imagery, news, events, landmarks, hotlines — these stay 100% tenant-configured. The national design system is a **frame and a color/typography contract**, not content.

---

## 5. Online Services / Requests Module (generalized)

The existing `/forms` flow (`FormsPageContent`, `MultiStepForm`, `FormApplicationTemplate`, dynamic `[slug]` route) is well-built and should be **kept structurally** — the work is moving its data source and adding a real backend + workflow.

### 5.1 Data model change

`FORM_CATEGORIES` and `CITY_FORMS` (currently static arrays in `lib/forms.ts`) become:
- Seed data per tenant (`config/tenants/imus.config.ts` → `offices[]`, `forms[]`), imported at build time, **or**
- DB-backed (`Office`, `ServiceForm` tables) once the Admin "forms builder" (§6) exists, so an Admin can add a new request type without a code deploy.

Recommend starting with config-seeded (fast, matches current pattern, zero new infra) and only moving fully into the DB + admin UI in a later phase once auth/DB exist anyway.

### 5.2 Request lifecycle (new — doesn't exist today)

Today a submission is just a JSON file with a reference number and no further state. Introduce a real workflow:

```
DRAFT → SUBMITTED → UNDER_REVIEW → (NEEDS_INFO ⇄ UNDER_REVIEW) → APPROVED → READY_FOR_RELEASE → RELEASED
                                  ↘ REJECTED
```

- **Citizen** creates a request (`SUBMITTED`), can view status, respond to `NEEDS_INFO` requests, and download the released document/confirmation.
- **Staff (processing)** picks up items from a queue, verifies documents, moves `SUBMITTED → UNDER_REVIEW`, can request more info or forward for approval.
- **Staff (approving)** — same `staff` role with an `canApprove` permission (see §6.2) — makes the `APPROVED`/`REJECTED` decision, cannot originate a request on behalf of a citizen (segregation of duties).
- **Admin** sees everything, can reassign, override, and configure which offices require a two-step (process + approve) vs. single-step flow.

Every transition writes an audit row (`SubmissionEvent`: who, from-state, to-state, note, timestamp) — required for any government-facing system and cheap to add now vs. retrofitting later.

### 5.3 Submission storage

Replace `app/api/forms/submit/route.ts`'s filesystem writes with a database (see §7). File uploads move to disk-under-`/data` only in local dev; production should target object storage (S3-compatible) referenced by URL in the DB row — call this out explicitly in the Cursor prompt as a "don't block on this, stub it" item since it's infra-dependent per deployment.

---

## 6. User Management System

### 6.1 Roles

| Role | Who | Core capabilities |
|---|---|---|
| **Citizen** | Any resident/business owner creating an account | Submit requests, track status, upload/respond to document requests, view own history, manage own profile |
| **Staff** | LGU front-line employee assigned to one or more offices | See queue for their office(s) only; process (verify docs, move to under-review, request more info); if granted `canApprove`, also approve/reject. Cannot manage users or global settings |
| **Admin** | LGU IT/records officer or department head | Full access: manage users (create/deactivate staff & admin accounts, assign offices/permissions to staff), manage office/form catalog, view all submissions across offices, reporting/analytics, tenant branding config |
| *(optional, later)* **Super Admin** | Platform operator managing multiple LGU deployments | Only relevant if/when the system moves to shared multi-tenant hosting (§3.1) — not needed for v1 |

Note on "Staff for minor processing and for approval" from the request: model this as **one `staff` role plus a `canApprove` boolean/permission**, not two separate role enums. Reasoning: an LGU may want the same person to do both on a small team, or strictly separate them on a large one — a permission flag supports both without a schema change, and Admin toggles it per staff account. If you want *hard* separation enforced (never the same person processes and approves the same request), add a rule in `lib/rbac.ts`: the approving staff member cannot equal the processing staff member on a given submission.

### 6.2 Permission matrix (starting point — refine in `lib/rbac.ts`)

| Action | Citizen | Staff | Staff (+canApprove) | Admin |
|---|:---:|:---:|:---:|:---:|
| Create request | own only | – | – | – |
| View request | own only | assigned office queue | assigned office queue | all |
| Move to under-review / request info | – | ✓ | ✓ | ✓ |
| Approve / reject | – | – | ✓ | ✓ |
| Reassign request to another office/staff | – | – | – | ✓ |
| Manage users | – | – | – | ✓ |
| Manage office/form catalog | – | – | – | ✓ |
| Edit tenant branding/config | – | – | – | ✓ |

### 6.3 Auth approach

Recommend **Auth.js (NextAuth v5)** with a credentials provider (email + password) as the default, since a Philippine LGU deployment can't assume every citizen has a Google/Facebook account and needs to support one that's fully self-hosted. Structure it so **email/password is the baseline** and OAuth (Google/Facebook) can be added per-tenant as an optional extra sign-in method later — don't build citizen accounts to *depend* on a third-party identity provider.

- Password hashing: `bcrypt` (or `argon2`).
- Session: JWT session via NextAuth, role + tenant claims embedded.
- Route protection: `middleware.ts` checking `session.role` against the route group (`/admin/*`, `/staff/*`, `/citizen/*`).
- Staff/Admin accounts are **not self-registrable** — only an Admin can create them (standard practice for government back-office access). Citizen accounts self-register with email verification.
- Add a `PSA-style` identity note only if a real ID-verification requirement surfaces later (e.g., PhilSys integration) — explicitly out of scope for v1, flag as a future integration point in the doc so it isn't forgotten.

### 6.4 Data model (Prisma sketch)

```prisma
model User {
  id            String   @id @default(cuid())
  email         String   @unique
  passwordHash  String
  role          Role     @default(CITIZEN)
  canApprove    Boolean  @default(false)   // only meaningful when role = STAFF
  officeIds     String[]                    // offices this staff member is assigned to
  firstName     String
  lastName      String
  phone         String?
  isActive      Boolean  @default(true)
  createdAt     DateTime @default(now())
  submissions   Submission[] @relation("citizenSubmissions")
}

enum Role {
  CITIZEN
  STAFF
  ADMIN
}

model Submission {
  id            String   @id @default(cuid())
  referenceNo   String   @unique
  formSlug      String
  officeId      String
  citizenId     String
  citizen       User     @relation("citizenSubmissions", fields: [citizenId], references: [id])
  assignedToId  String?
  status        SubmissionStatus @default(SUBMITTED)
  fields        Json
  attachments   Attachment[]
  events        SubmissionEvent[]
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

enum SubmissionStatus {
  DRAFT
  SUBMITTED
  UNDER_REVIEW
  NEEDS_INFO
  APPROVED
  REJECTED
  READY_FOR_RELEASE
  RELEASED
}

model SubmissionEvent {
  id            String   @id @default(cuid())
  submissionId  String
  submission    Submission @relation(fields: [submissionId], references: [id])
  actorId       String
  fromStatus    SubmissionStatus?
  toStatus      SubmissionStatus
  note          String?
  createdAt     DateTime @default(now())
}

model Attachment {
  id            String   @id @default(cuid())
  submissionId  String
  submission    Submission @relation(fields: [submissionId], references: [id])
  filename      String
  url           String
  uploadedAt    DateTime @default(now())
}
```

Database: **SQLite** for local dev / small-municipality single-instance deployments (zero infra, fits the "template" goal — a small town shouldn't need to stand up Postgres), **Postgres** for larger LGUs or shared hosting. Prisma makes this a one-line datasource swap; call this out as a config choice per deployment in the README, not a hardcoded decision.

---

## 7. Non-functional requirements

- **Accessibility** — NCDA/ICTO Joint Circular 1-2010 requires accessible government websites (WCAG AA baseline: alt text, keyboard nav, contrast ratios, resizable text). The utility bar's font-size/contrast toggle (§4.2) is part of meeting this, not decorative.
- **Data Privacy Act (RA 10173)** — citizen accounts hold PII; the footer must link a Privacy Notice, and the DB design should support data export/deletion requests per the Act.
- **i18n** — finish wiring `lib/i18n.ts`'s `t()` to actually respect the selected language (currently always returns `.en`); keep `en`/`fil` as the default pair but structure `LocalizedString` so a tenant could add a regional language later without a type change.
- **Auditability** — every status change and every admin action on a user account should be logged (ties into `SubmissionEvent` above; add an equivalent `UserAuditLog` for account changes).

---

## 8. Phased Roadmap

| Phase | Scope | Depends on |
|---|---|---|
| **0** | Extract all Imus-specific data out of `lib/constants.ts`, `lib/forms.ts`, `lib/digital-services.ts` into `config/tenants/imus.config.ts`; introduce `TenantConfig` type + `_template.config.ts` starter | none |
| **1** | Apply national PH design system to shared chrome (`UtilityBar`, `Navbar`, `Footer`, homepage Transparency Seal) using `gov.*` tokens layered with `tenant.*` CSS vars | Phase 0 |
| **2** | Stand up Prisma + SQLite, `User`/`Submission`/`SubmissionEvent`/`Attachment` models, migrate `app/api/forms/submit/route.ts` off filesystem writes | none (parallel to 0–1) |
| **3** | Auth.js integration: citizen self-registration + login, `middleware.ts` route protection, session/role helpers in `lib/auth.ts` + `lib/rbac.ts` | Phase 2 |
| **4** | Citizen dashboard (`/citizen/*`): submit, track, respond to NEEDS_INFO, view history | Phase 3 |
| **5** | Staff console (`/staff/*`): office-scoped queue, process/approve actions respecting `canApprove` + segregation-of-duties rule | Phase 3 |
| **6** | Admin console (`/admin/*`): user management (create/deactivate/assign), office & form catalog management, tenant branding editor, submissions overview/reporting | Phase 3, 5 |
| **7** | (Optional/future) DB-backed forms builder so Admin can add new request types without code changes; object storage for attachments; PhilSys/eGov PH integration exploration | Phase 6 |

Each phase should be a separate Cursor session/PR — trying to do this in one pass risks a broken intermediate state on a codebase this size.

---

## 9. Open decisions (confirm before/while building)

1. **Hosting model** — one instance per LGU (recommended, simpler/safer) vs. shared multi-tenant instance later?
2. **Database** — SQLite (simplest, ships with the template) vs. commit to Postgres from day one?
3. **First template LGU to validate against** — keep Imus as the reference tenant, or also stub a second (smaller municipality) tenant config early to prove the abstraction actually generalizes?
4. **Citizen ID verification** — none for v1, or is a basic email+phone OTP verification required at launch?
5. **Object storage for file uploads** — acceptable to stay filesystem-based for a v1/pilot, or is S3-compatible storage a hard requirement from the start?

These are flagged in `CURSOR_PROMPT.md` as questions to raise back to you before Phase 2–3 work begins, since they affect infra choices Cursor can't decide on its own.
