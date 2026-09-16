import { type NextRequest, NextResponse } from 'next/server'
import { validateInquiryForm } from '@/features/inquiry/schema'
import { sendEmail } from '@/lib/resend/client'
import { sanityServerClient } from '@/lib/sanity/client'
import { saveInquiryToBackup } from '@/lib/inquiries-backup'
import type { InquiryChannel, InquiryItem, InquiryRequestBody } from '@/types'

const INQUIRY_RECIPIENT = ['honeybeepower.hr@gmail.com', 'srdanrebic2101@gmail.com']

function isInquiryItem(value: unknown): value is InquiryItem {
  if (typeof value !== 'object' || value === null) return false
  const obj = value as Record<string, unknown>
  return (
    typeof obj.name === 'string' &&
    typeof obj.variantLabel === 'string' &&
    typeof obj.quantity === 'number' &&
    Number.isInteger(obj.quantity) &&
    obj.quantity > 0 &&
    typeof obj.unitPrice === 'number' &&
    obj.unitPrice >= 0 &&
    typeof obj.imageSrc === 'string'
  )
}

function validateBody(raw: unknown): { data: InquiryRequestBody } | { error: string } {
  if (typeof raw !== 'object' || raw === null) {
    return { error: 'Neispravno tijelo zahtjeva.' }
  }
  const body = raw as Record<string, unknown>

  const channel: InquiryChannel = body.channel === 'whatsapp' ? 'whatsapp' : 'email'
  const customer = body.customer as Record<string, unknown> | undefined

  const formErrors = validateInquiryForm({
    fullName: customer?.fullName as string | undefined,
    phone: customer?.phone as string | undefined,
  })

  if (Object.keys(formErrors).length > 0) {
    return { error: 'Podaci u formi nisu ispravni.' }
  }

  if (!Array.isArray(body.items) || body.items.length === 0) {
    return { error: 'Košarica mora sadržavati barem jedan artikl.' }
  }
  for (const item of body.items) {
    if (!isInquiryItem(item)) {
      return { error: 'Jedna ili više stavki košarice nisu ispravne.' }
    }
  }

  return {
    data: {
      channel,
      customer: {
        fullName: (customer!.fullName as string).trim(),
        phone: (customer!.phone as string).trim(),
      },
      notes: typeof body.notes === 'string' ? body.notes.trim() : undefined,
      items: body.items as InquiryItem[],
    },
  }
}

/**
 * POST /api/inquiry
 *
 * Receives a cart + customer name/phone as a request for a quote (no
 * payment, no address collected). Stores it as a Sanity `inquiry` document
 * so the owner can see it in Studio, and emails the owner when the customer
 * chose the e-mail channel — a WhatsApp inquiry already reaches them
 * directly via the pre-filled wa.me message, so no duplicate e-mail is sent.
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  let rawBody: unknown
  try {
    rawBody = await request.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Neispravan JSON u tijelu zahtjeva.' }, { status: 400 })
  }

  const validation = validateBody(rawBody)
  if ('error' in validation) {
    return NextResponse.json({ success: false, error: validation.error }, { status: 400 })
  }

  const { channel, customer, notes, items } = validation.data

  const orderNumber = `HBP-${Date.now()}`
  const createdAt = new Date().toISOString()

  // Save local backup copy
  saveInquiryToBackup({
    inquiryType: 'narudzba',
    orderNumber,
    status: 'novo',
    channel,
    customer,
    items,
    notes,
    createdAt,
  })

  const itemsWithKeys = items.map((item, idx) => ({
    _key: `item_${Date.now()}_${idx}_${Math.random().toString(36).substring(2, 7)}`,
    name: item.name,
    variantLabel: item.variantLabel,
    quantity: item.quantity,
    unitPrice: item.unitPrice,
    imageSrc: item.imageSrc,
  }))

  // Best-effort: save to Sanity (acts as the admin panel), but don't let a
  // Sanity outage block the email notification — that's the reliable fallback.
  let savedToSanity = true
  try {
    await sanityServerClient.create({
      _type: 'inquiry',
      inquiryType: 'narudzba',
      orderNumber,
      status: 'novo',
      channel,
      customer,
      items: itemsWithKeys,
      notes,
      createdAt,
    })
  } catch (err) {
    savedToSanity = false
    console.error('[inquiry] Failed to save inquiry to Sanity:', err)
  }

  // A WhatsApp inquiry already reached the owner as a chat message — this
  // Sanity/backup write is just a record for the dashboard, no email needed.
  if (channel === 'whatsapp') {
    return NextResponse.json({ success: true, orderNumber })
  }

  const itemsHtml = items
    .map((item) => `<li>${item.name} — ${item.variantLabel} × ${item.quantity}</li>`)
    .join('')

  const ownerEmailResult = await sendEmail({
    to: INQUIRY_RECIPIENT,
    subject: `[Upit] Novi upit za ponudu — ${orderNumber}`,
    html: `
      <h2>Novi upit za ponudu (e-mail)</h2>
      <p><strong>Broj upita:</strong> ${orderNumber}</p>
      <p><strong>Ime i prezime:</strong> ${customer.fullName}</p>
      <p><strong>Telefon:</strong> ${customer.phone}</p>
      <p><strong>Stavke:</strong></p>
      <ul>${itemsHtml}</ul>
      ${notes ? `<p><strong>Napomena:</strong></p><blockquote style="background:#f9f9f9;padding:12px;border-left:4px solid #f59e0b;">${notes}</blockquote>` : ''}
    `,
  })

  if (!savedToSanity && !ownerEmailResult.success) {
    console.error('[inquiry] Both Sanity save and owner email failed:', ownerEmailResult.error)
    return NextResponse.json(
      { success: false, error: 'Slanje upita nije uspjelo. Pokušajte ponovno.' },
      { status: 500 },
    )
  }

  return NextResponse.json({ success: true, orderNumber })
}
