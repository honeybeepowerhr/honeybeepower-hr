import type { Metadata } from 'next'
import type { Locale } from '@/types'
import { pageMetadata, localeUrl } from '@/lib/seo/site'
import { buildBreadcrumbSchema } from '@/lib/seo/schemas'
import { JsonLd } from '@/components/seo/JsonLd'
import { CjenikClient } from './CjenikClient'

const TITLES: Record<Locale, string> = {
  hr: 'Službeni Digitalni Cjenik | Planet Bio',
  en: 'Official Digital Price List | Planet Bio',
  de: 'Offizielle Digitale Preisliste | Planet Bio',
  sl: 'Uradni Digitalni Cenik | Planet Bio',
  pl: 'Oficjalny Cyfrowy Cennik | Planet Bio',
}

const DESCRIPTIONS: Record<Locale, string> = {
  hr: 'Službeni digitalni cjenik Planet Bio s istaknutom sidrenom cijenom i dnevnim ažuriranjem do 08:00h. Strojno čitljivi XML i CSV formati te 30-dnevna arhiva.',
  en: 'Official digital price list of Planet Bio with anchor prices and daily automatic updates before 08:00 AM. Machine-readable XML & CSV formats and 30-day archive.',
  de: 'Offizielle digitale Preisliste von Planet Bio mit Ankerpreisen und täglicher Aktualisierung bis 08:00 Uhr.',
  sl: 'Uradni digitalni cenik podjetja Planet Bio s sidrnimi cenami in dnevnimi posodobitvami do 8. ure zjutraj.',
  pl: 'Oficjalny cyfrowy cennik Planet Bio z cenami kotwicznymi i codzienną aktualizacją do godziny 08:00.',
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  return pageMetadata({
    locale,
    path: '/cjenik',
    title: TITLES[locale] ?? TITLES.hr,
    description: DESCRIPTIONS[locale] ?? DESCRIPTIONS.hr,
  })
}

export default async function CjenikPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Početna', url: localeUrl(locale, '/') },
    { name: 'Službeni cjenik', url: localeUrl(locale, '/cjenik') },
  ])

  return (
    <>
      <JsonLd schema={breadcrumbSchema} />
      <CjenikClient />
    </>
  )
}
