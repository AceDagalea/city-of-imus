import { tenantConfigSchema, type TenantConfig } from "@/config/tenant.schema";
import { imusConfig } from "@/config/tenants/imus.config";

/**
 * Active tenant resolver.
 *
 * `TENANT` (env var, default "imus") selects which tenant config is bundled for
 * this deployment. The selected config is validated against `tenantConfigSchema`
 * at startup — a missing or malformed required field throws a clear error rather
 * than failing silently at render time.
 *
 * To add a new LGU: create `config/tenants/<slug>.config.ts` (copy
 * `_template.config.ts`), import it here, and register it in `TENANT_CONFIGS`.
 */
const TENANT_CONFIGS = {
  imus: imusConfig,
} as const;

type KnownTenant = keyof typeof TENANT_CONFIGS;

const requested = process.env.TENANT ?? "imus";

if (!(requested in TENANT_CONFIGS)) {
  throw new Error(
    `[tenant.config] Unknown TENANT "${requested}". Available tenants: ${Object.keys(
      TENANT_CONFIGS
    ).join(", ")}.`
  );
}

const selected = TENANT_CONFIGS[requested as KnownTenant];

const result = tenantConfigSchema.safeParse(selected);
if (!result.success) {
  const details = result.error.issues
    .map((issue) => `  - ${issue.path.join(".") || "(root)"}: ${issue.message}`)
    .join("\n");
  throw new Error(
    `[tenant.config] Invalid configuration for tenant "${requested}":\n${details}`
  );
}

/**
 * The active tenant configuration.
 *
 * Typed as the precise shape of the source config object (not the widened
 * schema type) so that every downstream re-export in `lib/*` keeps its original
 * literal types — this makes Phase 0 a zero-behaviour-change refactor.
 */
export const tenantConfig = selected;

export type { TenantConfig };
