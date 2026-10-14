// Public URLs used in the app and on the App Store listing.
// The pages live in /docs and are served by GitHub Pages.

import type { LangCode } from '@/i18n/translations';

export const SITE_URL = 'https://riosenbeq.github.io/hamile';
export const PRIVACY_URL = `${SITE_URL}/privacy.html`;
export const TERMS_URL = `${SITE_URL}/terms.html`;
export const SUPPORT_URL = `${SITE_URL}/support.html`;

/** Bump when the Terms or Privacy Policy change in a way users must re-accept. */
export const LEGAL_VERSION = '2026-10-14';

/** The legal/support page in the user's language (English lives at the root). */
export function siteUrl(page: 'privacy' | 'terms' | 'support', lang: LangCode): string {
  return lang === 'en' ? `${SITE_URL}/${page}.html` : `${SITE_URL}/${lang}/${page}.html`;
}
export const SUPPORT_EMAIL = 'support@babybloom.kids';
/** Apple's standard licensed application end user licence agreement. */
export const APPLE_EULA_URL = 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/';

/** Filled in once the App Store record exists (numeric Apple ID). */
export const APP_STORE_ID = '6822443743';
export const appStoreReviewUrl = () =>
  APP_STORE_ID ? `itms-apps://apps.apple.com/app/id${APP_STORE_ID}?action=write-review` : SUPPORT_URL;

/** Sister app for newborn tracking (feeding, sleep, nappies). */
export const BABY_BLOOM_URL = 'https://apps.apple.com/app/id6761458828';
