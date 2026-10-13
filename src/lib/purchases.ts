// Marigold Plus — in-app purchases via RevenueCat.
//
// Products (App Store Connect):
//   com.okanberk.marigold.plus.monthly — auto-renewing monthly subscription (7-day free trial)
//   com.okanberk.marigold.pass         — one-time "Pregnancy Pass" (non-consumable, lifetime)
// RevenueCat: entitlement "plus", offering "default" with $rc_monthly + $rc_lifetime.
//
// The public SDK key is not a secret (it ships in every app binary); it is
// read from app.json → expo.extra.revenueCatIosKey or EXPO_PUBLIC_REVENUECAT_IOS_KEY.
// When no key is configured (dev builds, web previews) everything degrades to
// "not purchasable" without crashing.

import { Platform } from 'react-native';
import Constants from 'expo-constants';
import Purchases, {
  CustomerInfo,
  LOG_LEVEL,
  PurchasesOffering,
  PurchasesPackage,
  PURCHASES_ERROR_CODE,
} from 'react-native-purchases';
import { useAppStore } from '@/store/useAppStore';

export const ENTITLEMENT_ID = 'plus';
export const PRODUCT_MONTHLY = 'com.okanberk.marigold.plus.monthly';
export const PRODUCT_PASS = 'com.okanberk.marigold.pass';

const extra = (Constants.expoConfig?.extra ?? {}) as Record<string, unknown>;
const IOS_KEY =
  (process.env.EXPO_PUBLIC_REVENUECAT_IOS_KEY as string | undefined) ||
  (typeof extra.revenueCatIosKey === 'string' ? (extra.revenueCatIosKey as string) : '');

let configured = false;

export const purchasesAvailable = (): boolean => Platform.OS === 'ios' && !!IOS_KEY;

function applyCustomerInfo(info: CustomerInfo) {
  const ent = info.entitlements.active[ENTITLEMENT_ID];
  useAppStore.getState().setPremium({
    active: !!ent,
    productId: ent?.productIdentifier ?? null,
    expiresAt: ent?.expirationDate ? new Date(ent.expirationDate).getTime() : null,
    checkedAt: Date.now(),
  });
}

export async function configurePurchases(): Promise<void> {
  if (configured || !purchasesAvailable()) return;
  try {
    if (__DEV__) Purchases.setLogLevel(LOG_LEVEL.WARN);
    // Anonymous app user id — Marigold has no accounts.
    Purchases.configure({ apiKey: IOS_KEY });
    configured = true;
    Purchases.addCustomerInfoUpdateListener(applyCustomerInfo);
    const info = await Purchases.getCustomerInfo();
    applyCustomerInfo(info);
  } catch (e) {
    if (__DEV__) console.warn('[purchases] configure failed', e);
  }
}

export type PlusPackages = {
  monthly?: PurchasesPackage;
  pass?: PurchasesPackage;
  offering?: PurchasesOffering | null;
};

export async function loadPackages(): Promise<PlusPackages> {
  if (!purchasesAvailable()) return {};
  await configurePurchases();
  try {
    const offerings = await Purchases.getOfferings();
    const offering = offerings.current ?? offerings.all.default ?? null;
    if (!offering) return { offering: null };
    const pkgs = offering.availablePackages;
    const monthly =
      offering.monthly ?? pkgs.find((p) => p.product.identifier === PRODUCT_MONTHLY);
    const pass = offering.lifetime ?? pkgs.find((p) => p.product.identifier === PRODUCT_PASS);
    return { monthly, pass, offering };
  } catch (e) {
    if (__DEV__) console.warn('[purchases] offerings failed', e);
    return {};
  }
}

export type PurchaseResult = { ok: true } | { ok: false; cancelled?: boolean; message?: string };

export async function buy(pkg: PurchasesPackage): Promise<PurchaseResult> {
  try {
    const { customerInfo } = await Purchases.purchasePackage(pkg);
    applyCustomerInfo(customerInfo);
    return { ok: !!customerInfo.entitlements.active[ENTITLEMENT_ID] };
  } catch (e: any) {
    if (e?.userCancelled || e?.code === PURCHASES_ERROR_CODE.PURCHASE_CANCELLED_ERROR) {
      return { ok: false, cancelled: true };
    }
    return { ok: false, message: e?.message };
  }
}

export async function restore(): Promise<PurchaseResult & { active?: boolean }> {
  if (!purchasesAvailable()) return { ok: false };
  try {
    await configurePurchases();
    const info = await Purchases.restorePurchases();
    applyCustomerInfo(info);
    const active = !!info.entitlements.active[ENTITLEMENT_ID];
    return { ok: true, active };
  } catch (e: any) {
    return { ok: false, message: e?.message };
  }
}

/** Opens Apple's subscription management sheet (or the web fallback). */
export async function manageSubscription(): Promise<void> {
  try {
    await Purchases.showManageSubscriptions();
  } catch {
    // ignored — the Settings screen also links to the App Store page
  }
}

export function usePlus(): boolean {
  return useAppStore((s) => s.premium.active);
}
