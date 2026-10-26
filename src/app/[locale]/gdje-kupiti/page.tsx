import type { Metadata } from 'next'
import type { Locale } from '@/types'
import { pageMetadata, SITE_URL } from '@/lib/seo/site'
import { buildStoreSchema, buildBreadcrumbSchema } from '@/lib/seo/schemas'
import { localeUrl } from '@/lib/seo/site'
import { JsonLd } from '@/components/seo/JsonLd'
import WhereToBuyClient from './WhereToBuyClient'

const TITLES: Record<Locale, string> = {
  hr: 'Gdje kupiti Honey Bee Power u Hrvatskoj',
  en: 'Where to buy Honey Bee Power in Croatia',
  de: 'Wo man Honey Bee Power in Kroatien kauft',
  sl: 'Kje kupiti Honey Bee Power na Hrvaškem',
  pl: 'Gdzie kupić Honey Bee Power w Chorwacji',
}

const DESCRIPTIONS: Record<Locale, string> = {
  hr: 'Honey Bee Power u Hrvatskoj naručuješ izravno od distributera Planet Bio iz Našica: upit na stranici, WhatsAppom ili e-mailom, dostava 1–3 radna dana.',
  en: 'In Croatia you order Honey Bee Power directly from the distributor Planet Bio in Našice: enquiry on the site, by WhatsApp or e-mail, shipping in 1–3 working days.',
  de: 'In Kroatien bestellst du Honey Bee Power direkt beim Vertriebspartner Planet Bio in Našice: Anfrage, WhatsApp oder E-Mail, Versand in 1–3 Werktagen.',
  sl: 'Na Hrvaškem Honey Bee Power naročiš neposredno pri distributerju Planet Bio iz Našic: povpraševanje, WhatsApp ali e-pošta, dostava v 1–3 delovnih dneh.',
  pl: 'W Chorwacji zamawiasz Honey Bee Power bezpośrednio u dystrybutora Planet Bio z Našic: zapytanie, WhatsApp lub e-mail, dostawa w 1–3 dni robocze.',
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  return pageMetadata({
    locale,
    path: '/gdje-kupiti',
    title: TITLES[locale] ?? TITLES.hr,
    description: DESCRIPTIONS[locale] ?? DESCRIPTIONS.hr,
  })
}

export default async function WhereToBuyPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const storeSchema = buildStoreSchema(SITE_URL)
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Honey Bee Power', url: localeUrl(locale, '/') },
    { name: TITLES[locale] ?? TITLES.hr, url: localeUrl(locale, '/gdje-kupiti') },
  ])

  return (
    <>
      <JsonLd schema={storeSchema} />
      <JsonLd schema={breadcrumbSchema} />
      <WhereToBuyClient />
    </>
  )
}
