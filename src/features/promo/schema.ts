// ============================================================
// Promo code validation — standalone, not tied to any checkout
// flow. Kept separate from the (removed) Stripe checkout code
// since it's self-contained and still covered by tests.
// ============================================================

export interface PromoResult {
  valid: boolean
  discountPercent: number
  label: string
}

const PROMO_CODES: Record<string, PromoResult> = {
  WELCOME10: { valid: true, discountPercent: 10, label: '-10%' },
}

export function validatePromoCode(code: string): PromoResult {
  const upper = code.trim().toUpperCase()
  return PROMO_CODES[upper] ?? { valid: false, discountPercent: 0, label: '' }
}
