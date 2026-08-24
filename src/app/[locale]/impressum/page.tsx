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
  hr: 'Impressum — podaci o trgovačkom društvu Planet Bio d.o.o., vlasniku brenda Honey Bee Power. Adresa, OIB i kontakt podaci.',
  en: 'Legal notice — company details for Planet Bio d.o.o., owner of the Honey Bee Power brand. Registered address, tax ID and contact information.',
  de: 'Impressum — Firmenangaben zu Planet Bio d.o.o., Inhaber der Marke Honey Bee Power. Anschrift, Steuernummer und Kontaktdaten.',
  sl: 'Impresum — podatki o podjetju Planet Bio d.o.o., lastniku znamke Honey Bee Power. Naslov, davčna številka in kontaktni podatki.',
  pl: 'Nota prawna — dane spółki Planet Bio d.o.o., właściciela marki Honey Bee Power. Adres, NIP i dane kontaktowe.',
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
