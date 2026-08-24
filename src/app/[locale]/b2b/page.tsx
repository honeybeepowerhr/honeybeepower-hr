import type { Metadata } from 'next'
import type { Locale } from '@/types'
import { pageMetadata, localeUrl } from '@/lib/seo/site'
import { buildBreadcrumbSchema } from '@/lib/seo/schemas'
import { JsonLd } from '@/components/seo/JsonLd'
import B2BClient from './B2BClient'

const TITLES: Record<Locale, string> = {
  hr: 'B2B Partner Program',
  en: 'B2B Partner Program',
  de: 'B2B-Partnerprogramm',
  sl: 'B2B Partnerski Program',
  pl: 'Program Partnerski B2B',
}

const DESCRIPTIONS: Record<Locale, string> = {
  hr: 'Postanite B2B partner Honey Bee Power — atraktivni popusti na količinu, brza dostava iz Našica i marketing podrška za trgovine, teretane i klubove.',
  en: 'Become a Honey Bee Power B2B partner — attractive volume discounts, fast delivery from Croatia, and marketing support for shops, gyms and clubs.',
  de: 'Werden Sie Honey Bee Power B2B-Partner — attraktive Mengenrabatte, schnelle Lieferung aus Kroatien und Marketingunterstützung für Shops und Fitnessstudios.',
  sl: 'Postanite B2B partner Honey Bee Power — ugodni popusti na količino, hitra dostava iz Hrvaške in marketinška podpora za trgovine in klube.',
  pl: 'Zostań partnerem B2B Honey Bee Power — atrakcyjne rabaty ilościowe, szybka dostawa z Chorwacji i wsparcie marketingowe dla sklepów i klubów.',
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  return pageMetadata({
    locale,
    path: '/b2b',
    title: TITLES[locale] ?? TITLES.hr,
    description: DESCRIPTIONS[locale] ?? DESCRIPTIONS.hr,
  })
}

export default async function B2BPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Početna', url: localeUrl(locale, '/') },
    { name: 'B2B', url: localeUrl(locale, '/b2b') },
  ])

  return (
    <>
      <JsonLd schema={breadcrumbSchema} />
      <B2BClient />
    </>
  )
}
