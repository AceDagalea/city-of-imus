import { z } from "zod";

/**
 * Zod schema describing a single LGU (Local Government Unit) tenant.
 *
 * This is the authoritative runtime + compile-time contract for every
 * `config/tenants/*.config.ts` file. `config/tenant.config.ts` validates the
 * active tenant against this schema at startup and throws if a required field
 * is missing or malformed.
 *
 * NOTE: the exported `tenantConfig` value keeps the *precise* literal types of
 * the source config object (see `config/tenant.config.ts`). This schema — and
 * the `TenantConfig` type inferred from it — is intentionally kept structural
 * so that a config object with narrower literal types still satisfies it.
 */

const zLocalized = z.object({
  en: z.string(),
  fil: z.string(),
});

const zLink = z.object({
  label: zLocalized,
  href: z.string(),
  external: z.boolean().optional(),
});

const zFooterColumn = z.object({
  title: zLocalized,
  links: z.array(zLink),
});

export const tenantConfigSchema = z.object({
  // ── Identity ────────────────────────────────────────────────────────────
  lguType: z.enum(["city", "municipality", "province"]),
  lguName: zLocalized,
  province: z.string(),
  region: z.string(),
  psgcCode: z.string(),
  motto: zLocalized,

  // ── Feature flags (let a small LGU disable modules it doesn't need) ──────
  modules: z.object({
    fullDisclosure: z.boolean(),
    tourism: z.boolean(),
    banaag: z.boolean(),
    gadDatabase: z.boolean(),
    jobPortal: z.boolean(),
  }),

  // ── Branding (layered on top of the national design system) ─────────────
  brand: z.object({
    primary: z.string(),
    secondary: z.string(),
    accent: z.string(),
    logoUrl: z.string(),
    logoRemoteUrl: z.string(),
    sealUrl: z.string(),
    colors: z.object({
      navy: z.string(),
      green: z.string(),
      red: z.string(),
      accent: z.string(),
    }),
  }),

  // ── Leadership ──────────────────────────────────────────────────────────
  executive: z.object({
    title: zLocalized,
    name: z.string(),
    photoUrl: z.string(),
  }),

  // ── Contact / office info ───────────────────────────────────────────────
  contact: z.object({
    address: z.string(),
    hours: z.string(),
    mainLines: z.array(z.string()),
    emergency: z.string(),
    facebook: z.string(),
    facebookTourism: z.string(),
    youtubeId: z.string(),
    eboss: z.string(),
    email: z.string(),
    twitter: z.string(),
  }),

  // ── Site-wide media / embeds ────────────────────────────────────────────
  siteUrl: z.string(),
  mapEmbedUrl: z.string(),
  // Freedom of Information portal URL (national default: https://www.foi.gov.ph).
  foiUrl: z.string(),
  hero: z.object({
    imageUrl: z.string(),
    videoUrl: z.string(),
    fallbackUrl: z.string(),
    tagline: zLocalized,
    subtitle: zLocalized,
  }),

  // ── Navigation & footer chrome ──────────────────────────────────────────
  navItems: z.array(
    z.object({
      label: zLocalized,
      href: z.string(),
      children: z.array(zLink),
    })
  ),
  footerColumns: z.object({
    government: zFooterColumn,
    transparency: zFooterColumn,
    resources: zFooterColumn,
  }),
  quickAccess: z.array(
    z.object({
      icon: z.string(),
      label: zLocalized,
      href: z.string(),
    })
  ),
  popularSearches: z.array(zLink),

  // ── Homepage content ────────────────────────────────────────────────────
  cityStats: z.array(
    z.object({
      value: z.number(),
      label: zLocalized,
      suffix: z.string(),
      decimals: z.number().optional(),
    })
  ),
  landmarks: z.array(
    z.object({
      title: zLocalized,
      address: z.string(),
      image: z.string(),
    })
  ),
  announcements: z.array(
    z.object({
      id: z.string(),
      title: zLocalized,
      excerpt: zLocalized,
      date: z.string(),
      image: z.string(),
      href: z.string(),
      external: z.boolean().optional(),
      featured: z.boolean().optional(),
    })
  ),
  newsItems: z.array(
    z.object({
      id: z.string(),
      date: z.string(),
      title: zLocalized,
      excerpt: zLocalized,
      image: z.string(),
      href: z.string(),
      external: z.boolean().optional(),
      featured: z.boolean().optional(),
    })
  ),
  upcomingEvents: z.array(
    z.object({
      id: z.string(),
      date: z.string(),
      title: zLocalized,
      time: z.string(),
      location: zLocalized,
      href: z.string(),
    })
  ),
  hotlines: z.array(
    z.object({
      id: z.string(),
      icon: z.string(),
      name: zLocalized,
      numbers: z.array(z.object({ label: z.string(), number: z.string() })),
    })
  ),
  serviceAudiences: z.array(
    z.object({
      id: z.string(),
      label: zLocalized,
      image: z.string(),
      href: z.string(),
      icon: z.string(),
      external: z.boolean().optional(),
    })
  ),
  serviceCategories: z.array(
    z.object({
      id: z.string(),
      title: zLocalized,
      services: z.array(
        z.object({
          icon: z.string(),
          title: zLocalized,
          description: zLocalized,
          href: z.string(),
          external: z.boolean().optional(),
          featured: z.boolean().optional(),
        })
      ),
    })
  ),

  // ── Services / requests module ──────────────────────────────────────────
  // Offices == the old FORM_CATEGORIES; forms == the old CITY_FORMS.
  offices: z.array(
    z.object({
      id: z.string(),
      name: zLocalized,
      shortName: z.string(),
      description: zLocalized,
      icon: z.string(),
      office: zLocalized,
    })
  ),
  forms: z.array(
    z.object({
      id: z.string(),
      slug: z.string(),
      name: zLocalized,
      description: zLocalized,
      categoryId: z.string(),
      pdfUrl: z.string(),
      mode: z.enum(["online", "download", "requirements"]),
      template: z.string().optional(),
      relatedSlug: z.string().optional(),
      processingDays: z.string().optional(),
    })
  ),

  // ── Digital-services page config ────────────────────────────────────────
  mostRequestedSlugs: z.array(z.string()),
  popularServiceSearches: z.array(z.string()),
  audienceTabs: z
    .array(
      z.object({
        id: z.string(),
        label: z.string(),
        icon: z.string(),
        categoryIds: z.array(z.string()).readonly(),
      })
    )
    .readonly(),
});

export type TenantConfig = z.infer<typeof tenantConfigSchema>;
