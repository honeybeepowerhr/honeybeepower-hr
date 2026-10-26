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
  hr: 'Kontakt Honey Bee Power, distributer Planet Bio: Krndijska 4, Našice. Telefon +385 97 709 7962, e-mail info@planetbio.hr, ponedjeljak–petak 8–16 h.',
  en: 'Contact Honey Bee Power, distributor Planet Bio: Krndijska 4, Našice, Croatia. Phone +385 97 709 7962, e-mail info@planetbio.hr, Mon–Fri 8 am–4 pm.',
  de: 'Kontakt Honey Bee Power, Vertrieb Planet Bio: Krndijska 4, Našice, Kroatien. Telefon +385 97 709 7962, E-Mail info@planetbio.hr, Mo–Fr 8–16 Uhr.',
  sl: 'Kontakt Honey Bee Power, distributer Planet Bio: Krndijska 4, Našice. Telefon +385 97 709 7962, e-pošta info@planetbio.hr, pon–pet 8–16.',
  pl: 'Kontakt Honey Bee Power, dystrybutor Planet Bio: Krndijska 4, Našice. Telefon +385 97 709 7962, e-mail info@planetbio.hr, pon–pt 8–16.',
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  return pageMetadata({
    locale,
    path: '/kontakt',
    title: TITLES[locale] ?? TITLES.hr,
    description: DESCRIPTIONS[locale] ?? DESCRIPTIONS.hr,
    image: '/images/og/kontakt.jpg',
  })
}

export default async function ContactPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Honey Bee Power', url: localeUrl(locale, '/') },
    { name: 'Kontakt', url: localeUrl(locale, '/kontakt') },
  ])

  return (
    <>
      <JsonLd schema={breadcrumbSchema} />
      <ContactClient />
    </>
  )
}
