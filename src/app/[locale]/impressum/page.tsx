import type { Metadata } from 'next'
import type { Locale } from '@/types'
import { pageMetadata, localeUrl } from '@/lib/seo/site'
import { buildBreadcrumbSchema } from '@/lib/seo/schemas'
import { JsonLd } from '@/components/seo/JsonLd'
import ImpressumClient from './ImpressumClient'

const TITLES: Record<Locale, string> = {
  hr: 'Impressum',
  en: 'Legal Notice',
  de: 'Impressum',
  sl: 'Impresum',
  pl: 'Nota Prawna',
}

const DESCRIPTIONS: Record<Locale, string> = {
  hr: 'Impressum: Planet Bio, obrt za usluge iz Našica, distributer Honey Bee Power proizvoda za Hrvatsku. Adresa, OIB, matični broj i kontakt.',
  en: 'Legal notice: Planet Bio, a sole-trader business in Našice and distributor of Honey Bee Power products for Croatia. Address, tax ID and contact.',
  de: 'Impressum: Planet Bio, Gewerbebetrieb in Našice und Vertriebspartner für Honey Bee Power Produkte in Kroatien. Anschrift, Steuernummer und Kontakt.',
  sl: 'Impresum: Planet Bio, obrt iz Našic, distributer izdelkov Honey Bee Power za Hrvaško. Naslov, davčna številka in kontakt.',
  pl: 'Nota prawna: Planet Bio, działalność gospodarcza z Našic, dystrybutor produktów Honey Bee Power w Chorwacji. Adres, NIP i kontakt.',
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  return pageMetadata({
    locale,
    path: '/impressum',
    title: TITLES[locale] ?? TITLES.hr,
    description: DESCRIPTIONS[locale] ?? DESCRIPTIONS.hr,
  })
}

export default async function ImpressumPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Početna', url: localeUrl(locale, '/') },
    { name: 'Impressum', url: localeUrl(locale, '/impressum') },
  ])

  return (
    <>
      <JsonLd schema={breadcrumbSchema} />
      <ImpressumClient />
    </>
  )
}
