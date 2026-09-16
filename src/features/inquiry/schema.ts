// ============================================================
// Quick inquiry schema — manual validation for the cart's
// WhatsApp/e-mail inquiry modal. No payment, no address: the
// courier/price/payment method is all arranged personally after
// the owner gets in touch.
// ============================================================

import type { InquiryFormValues } from '@/types'

export type InquiryFieldErrors = Partial<Record<keyof InquiryFormValues, string>>

export function validateInquiryForm(
  values: Partial<InquiryFormValues>
): InquiryFieldErrors {
  const errors: InquiryFieldErrors = {}

  if (!values.fullName || values.fullName.trim().length < 2) {
    errors.fullName = 'Ime i prezime moraju imati najmanje 2 znaka.'
  }

  const digits = (values.phone ?? '').replace(/\D/g, '')
  if (digits.length < 7) {
    errors.phone = 'Unesite valjan broj telefona (najmanje 7 znamenki).'
  }

  return errors
}

export const defaultInquiryValues: InquiryFormValues = {
  fullName: '',
  phone: '',
}
