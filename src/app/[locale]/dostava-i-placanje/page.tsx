import type { Metadata } from 'next'
import type { Locale } from '@/types'
import { pageMetadata, localeUrl } from '@/lib/seo/site'
import { buildBreadcrumbSchema } from '@/lib/seo/schemas'
import { JsonLd } from '@/components/seo/JsonLd'
import ShippingPaymentClient from './ShippingPaymentClient'

const TITLES: Record<Locale, string> = {
  hr: 'Dostava i Plaćanje',
  en: 'Shipping & Payment',
  de: 'Versand & Zahlung',
  sl: 'Dostava in Plačilo',
  pl: 'Dostawa i Płatność',
}

const DESCRIPTIONS: Record<Locale, string> = {
  hr: 'Načini plaćanja (kartice, pouzeće, doznaka) i rokovi dostave za narudžbe Honey Bee Power proizvoda unutar Hrvatske i regije.',
  en: 'Payment methods (card, cash on delivery, bank transfer) and delivery times for Honey Bee Power orders across Croatia and the region.',
  de: 'Zahlungsmethoden (Karte, Nachnahme, Überweisung) und Lieferzeiten für Honey Bee Power Bestellungen in Kroatien und der Region.',
  sl: 'Načini plačila (kartica, po povzetju, nakazilo) in dostavni roki za naročila Honey Bee Power po Hrvaški in regiji.',
  pl: 'Metody płatności (karta, za pobraniem, przelew) i czasy dostawy zamówień Honey Bee Power w Chorwacji i regionie.',
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  return pageMetadata({
    locale,
    path: '/dostava-i-placanje',
    title: TITLES[locale] ?? TITLES.hr,
    description: DESCRIPTIONS[locale] ?? DESCRIPTIONS.hr,
  })
}

export default async function ShippingPaymentPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Početna', url: localeUrl(locale, '/') },
    { name: 'Dostava i plaćanje', url: localeUrl(locale, '/dostava-i-placanje') },
  ])

  return (
    <>
      <JsonLd schema={breadcrumbSchema} />
      <ShippingPaymentClient />
    </>
  )
}
