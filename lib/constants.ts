import { tenantConfig } from "@/config/tenant.config";

/**
 * Site-wide constants.
 *
 * These are no longer literals — every value is sourced from the active tenant
 * config (`config/tenant.config.ts`). Export names and types are unchanged so
 * existing import sites keep working without modification.
 */

export const SITE_URL = tenantConfig.siteUrl;
export const LOGO_URL = tenantConfig.brand.logoUrl;
export const LOGO_REMOTE_URL = tenantConfig.brand.logoRemoteUrl;
export const SEAL_URL = tenantConfig.brand.sealUrl;

export const BRAND_COLORS = tenantConfig.brand.colors;

export const MAYOR_PHOTO_URL = tenantConfig.executive.photoUrl;
export const HERO_IMAGE_URL = tenantConfig.hero.imageUrl;
export const HERO_VIDEO_URL = tenantConfig.hero.videoUrl;
export const HERO_FALLBACK_URL = tenantConfig.hero.fallbackUrl;

export const MAP_EMBED_URL = tenantConfig.mapEmbedUrl;

export const HERO_TAGLINE = tenantConfig.hero.tagline;
export const HERO_SUBTITLE = tenantConfig.hero.subtitle;

export const CONTACT = tenantConfig.contact;

export const POPULAR_SEARCHES = tenantConfig.popularSearches;

export const UPCOMING_EVENTS = tenantConfig.upcomingEvents;

export const HOTLINES = tenantConfig.hotlines;

export const CITY_STATS = tenantConfig.cityStats;

export const LANDMARKS = tenantConfig.landmarks;

export const NAV_ITEMS = tenantConfig.navItems;

export const FOOTER_COLUMNS = tenantConfig.footerColumns;

export const QUICK_ACCESS = tenantConfig.quickAccess;

export const QUICK_SERVICES = QUICK_ACCESS;

export const ANNOUNCEMENTS = tenantConfig.announcements;

export const NEWS_ITEMS = tenantConfig.newsItems;

export const SERVICE_AUDIENCES = tenantConfig.serviceAudiences;

export const SERVICE_CATEGORIES = tenantConfig.serviceCategories;
