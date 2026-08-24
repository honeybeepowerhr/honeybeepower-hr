import type { Metadata } from 'next'
import type { Locale } from '@/types'
import { pageMetadata, localeUrl } from '@/lib/seo/site'
import { buildBreadcrumbSchema } from '@/lib/seo/schemas'
import { JsonLd } from '@/components/seo/JsonLd'
import { FAQS } from './faq-data'
import FAQClient from './FAQClient'

const TITLES: Record<Locale, string> = {
  hr: 'Često Postavljana Pitanja',
  en: 'Frequently Asked Questions',
  de: 'Häufig Gestellte Fragen',
  sl: 'Pogosta Vprašanja',
  pl: 'Najczęściej Zadawane Pytania',
}

const DESCRIPTIONS: Record<Locale, string> = {
  hr: 'Odgovori na najčešća pitanja o Honey Bee Power proizvodima — sastojcima, dostavi i korištenju energetskih gelova i izotoničnih napitaka.',
  en: 'Answers to frequently asked questions about Honey Bee Power products — ingredients, delivery, and how to use our energy gels and isotonic drinks.',
  de: 'Antworten auf häufig gestellte Fragen zu Honey Bee Power Produkten — Zutaten, Lieferung und Anwendung unserer Energiegels und isotonischen Getränke.',
  sl: 'Odgovori na pogosta vprašanja o izdelkih Honey Bee Power — sestavinah, dostavi in uporabi energijskih gelov ter izotoničnih napitkov.',
  pl: 'Odpowiedzi na najczęstsze pytania o produktach Honey Bee Power — składnikach, dostawie i sposobie użycia żeli energetycznych i napojów izotonicznych.',
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  return pageMetadata({
    locale,
    path: '/faq',
    title: TITLES[locale] ?? TITLES.hr,
    description: DESCRIPTIONS[locale] ?? DESCRIPTIONS.hr,
  })
}

export default async function FAQPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Početna', url: localeUrl(locale, '/') },
    { name: 'FAQ', url: localeUrl(locale, '/faq') },
  ])

  return (
    <>
      <JsonLd schema={faqSchema} />
      <JsonLd schema={breadcrumbSchema} />
      <FAQClient />
    </>
  )
}
