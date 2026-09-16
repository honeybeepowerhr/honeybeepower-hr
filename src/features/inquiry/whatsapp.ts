// ============================================================
// Builds the pre-filled WhatsApp message for a cart inquiry.
// Pure functions — no price shown to the customer, quantities
// and variants only.
// ============================================================

import type { InquiryItem } from '@/types'

/** Company WhatsApp number, digits only (no +, no spaces) — matches Footer.tsx. */
export const WHATSAPP_NUMBER = '385977097962'

interface WhatsAppMessageInput {
  fullName: string
  phone: string
  items: Pick<InquiryItem, 'name' | 'variantLabel' | 'quantity'>[]
}

export function buildWhatsAppMessage({ fullName, phone, items }: WhatsAppMessageInput): string {
  const itemLines = items
    .map((item) => `• ${item.name}${item.variantLabel ? ` (${item.variantLabel})` : ''} × ${item.quantity}`)
    .join('\n')

  return [
    'Pozdrav, zanima me ponuda za:',
    itemLines,
    '',
    `Ime i prezime: ${fullName}`,
    `Telefon: ${phone}`,
  ].join('\n')
}

export function buildWhatsAppUrl(message: string, number: string = WHATSAPP_NUMBER): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}
