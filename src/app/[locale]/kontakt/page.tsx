import type { Metadata } from 'next'
import type { Locale } from '@/types'
import { pageMetadata, localeUrl } from '@/lib/seo/site'
import { buildBreadcrumbSchema } from '@/lib/seo/schemas'
import { JsonLd } from '@/components/seo/JsonLd'
import ContactClient from './ContactClient'

const TITLES: Record<Locale, string> = {
  hr: 'Kontakt',
  en: 'Contact',
  de: 'Kontakt',
  sl: 'Kontakt',
  pl: 'Kontakt',
}

const DESCRIPTIONS: Record<Locale, string> = {
  hr: 'Kontaktirajte Honey Bee Power — Krndijska ulica 4, Našice. Tel: +385 977 097 962, email: info@planetbio.hr. Radno vrijeme pon-pet 08-16h.',
  en: 'Contact Honey Bee Power — Krndijska ulica 4, Našice, Croatia. Phone: +385 977 097 962, email: info@planetbio.hr. Open Mon-Fri 08:00-16:00.',
  de: 'Kontaktieren Sie Honey Bee Power — Krndijska ulica 4, Našice, Kroatien. Tel: +385 977 097 962, E-Mail: info@planetbio.hr. Mo-Fr 08:00-16:00 Uhr.',
  sl: 'Kontaktirajte Honey Bee Power — Krndijska ulica 4, Našice, Hrvaška. Tel: +385 977 097 962, e-pošta: info@planetbio.hr. Pon-pet 08.00-16.00.',
  pl: 'Skontaktuj się z Honey Bee Power — Krndijska ulica 4, Našice, Chorwacja. Tel: +385 977 097 962, e-mail: info@planetbio.hr. Pon-pt 08:00-16:00.',
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  return pageMetadata({
    locale,
    path: '/kontakt',
    title: TITLES[locale] ?? TITLES.hr,
    description: DESCRIPTIONS[locale] ?? DESCRIPTIONS.hr,
  })
}

export default async function ContactPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Početna', url: localeUrl(locale, '/') },
    { name: 'Kontakt', url: localeUrl(locale, '/kontakt') },
  ])

  return (
    <>
      <JsonLd schema={breadcrumbSchema} />
      <ContactClient />
    </>
  )
}
