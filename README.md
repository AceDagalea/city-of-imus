# City of Imus — Government Website Proposal

A modern redesign proposal for the [City Government of Imus](https://www.cityofimus.gov.ph) website, built with Next.js 14, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Icons:** Lucide React

## Features

- **Home** — Hero, announcements, news & events, mayor's message, tourism CTA, city hall map
- **Digital Services** (`/forms`) — Browse services by category, online form submission, application tracking
- **Full Disclosure** (`/full-disclosure`) — Financial reports, executive orders, ordinances, resolutions, bids & awards, BanAAg, GAD Database, and more with PDF-derived thumbnails
- **About Imus** — City profile, history, mayor, departments, barangay officials
- **Contact** — Office hours, emergency hotlines, map, and department directory
- **Tourism & News** — Local attractions and city updates

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### First-time setup (after cloning)

The database file (`prisma/dev.db`) and `.env` are **not** in Git. Every new clone needs these steps once:

```bash
# 1. Install dependencies (also runs `prisma generate` via postinstall)
npm install

# 2. Create local environment file
cp .env.local.example .env
# On Windows PowerShell:
#   Copy-Item .env.local.example .env

# 3. Set AUTH_SECRET in .env (required for login). Generate one with:
#   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
# Replace the "replace-me" value in .env with the output.

# 4. Create the SQLite database and seed the admin account
npm run db:setup
```

Then start the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or the next available port if 3000 is in use).

### Default login (after `npm run db:seed`)

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@imus.gov.ph` | `ChangeMe@2026` |

Citizens can self-register at `/register` (verification link is printed in the terminal — email is stubbed in local dev).

If login fails with **“@prisma/client did not initialize yet”**, run:

```bash
npx prisma generate
npm run db:setup
```

### Production build

```bash
npm run build
npm start
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Run production server |
| `npm run lint` | Run ESLint |
| `npm run generate:banaag` | Generate BanAAg PDF pages and thumbnails |
| `npm run generate:gad` | Generate GAD Database PDF pages and thumbnails |
| `npm run generate:departments` | Regenerate department data |
| `npm run generate:government` | Regenerate government page content |

## Project Structure

```
app/                  # Next.js App Router pages
components/           # React components (home, forms, contact, full-disclosure, etc.)
lib/                  # Data, constants, i18n, and generated JSON catalogs
public/               # Static assets (images, PDF previews, thumbnails)
scripts/              # Content generation and scraping utilities
```

## Brand Colors

| Name | Hex |
|------|-----|
| Navy | `#1A3668` |
| Green | `#39A843` |
| Red | `#C8102E` |

## License

Private project — City of Imus government website proposal.
