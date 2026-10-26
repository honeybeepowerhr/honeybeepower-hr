import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { JsonLd } from '@/components/seo/JsonLd'
import type { Locale } from '@/types'
import { SITE_URL, buildAlternates } from '@/lib/seo/site'
import { buildOrganizationSchema, buildWebsiteSchema } from '@/lib/seo/schemas'
import { HomeHero } from '@/components/home/HomeHero'
import { IngredientTicker } from '@/components/home/IngredientTicker'
import { IngredientsSection } from '@/components/home/IngredientsSection'
import { BackLabelShowcase } from '@/components/home/BackLabelShowcase'
import { ProductLinesSection } from '@/components/home/ProductLinesSection'
import { SportPanels } from '@/components/home/SportPanels'
import { StorySection } from '@/components/home/StorySection'
import { TrackGallery } from '@/components/home/TrackGallery'
import { PriceListSection } from '@/components/home/PriceListSection'
import { ClubsCta } from '@/components/home/ClubsCta'
import { RecoveryCalculator } from '@/components/site/RecoveryCalculator'
import { FaqList } from '@/components/site/FaqList'
import { SectionMotion } from '@/components/site/SectionMotion'

export const revalidate = 3600

const COPY: Record<Locale, { title: string; description: string }> = {
  hr: {
    title: 'Honey Bee Power: energetski gel od meda',
    description:
      'Energetski gelovi od višecvjetnog meda i liofiliziranog voća, izotonični napitci i whey protein. Proizvođač APIMAR (Poljska), distributer za Hrvatsku Planet Bio.',
  },
  en: {
    title: 'Honey Bee Power: honey-based energy gels',
    description:
      'Energy gels made from multifloral honey and freeze-dried fruit, isotonic drinks and whey protein. Made by APIMAR (Poland), distributed in Croatia by Planet Bio.',
  },
  de: {
    title: 'Honey Bee Power: Energiegel aus Honig',
    description:
      'Energiegels aus Mehrblütenhonig und gefriergetrockneten Früchten, isotonische Getränke und Whey Protein. Hersteller APIMAR (Polen), Vertrieb in Kroatien: Planet Bio.',
  },
  sl: {
    title: 'Honey Bee Power: energijski gel iz medu',
    description:
      'Energijski geli iz večcvetnega medu in liofiliziranega sadja, izotonični napitki in whey protein. Proizvajalec APIMAR (Poljska), distributer za Hrvaško Planet Bio.',
  },
  pl: {
    title: 'Honey Bee Power: żel energetyczny z miodu',
    description:
      'Żele energetyczne z miodu wielokwiatowego i liofilizowanych owoców, napoje izotoniczne i białko serwatkowe. Producent APIMAR (Polska), dystrybutor w Chorwacji Planet Bio.',
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale }
  const copy = COPY[locale] ?? COPY.hr

  return {
    title: { absolute: copy.title },
    description: copy.description,
    alternates: buildAlternates('/', locale),
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: `${SITE_URL}${locale === 'hr' ? '' : `/${locale}`}`,
      siteName: 'Honey Bee Power',
      type: 'website',
      images: [{ url: `${SITE_URL}/images/og/naslovnica.jpg`, width: 1200, height: 630, alt: copy.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: copy.title,
      description: copy.description,
      images: [`${SITE_URL}/images/og/naslovnica.jpg`],
    },
  }
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const locale = raw as Locale
  const t = await getTranslations({ locale, namespace: 'home' })
  const organizationSchema = buildOrganizationSchema(SITE_URL)
  const websiteSchema = buildWebsiteSchema(SITE_URL)

  const faq = [1, 2, 3, 4, 5, 6].map((i) => ({
    q: t(`faq.q${i}`),
    a: t.rich(`faq.a${i}`, { todo: (chunks) => <span className="todo">{chunks}</span> }),
    plain: t.markup(`faq.a${i}`, { todo: (chunks) => chunks }),
  }))
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.plain },
    })),
  }

  return (
    <>
      <JsonLd schema={organizationSchema} />
      <JsonLd schema={websiteSchema} />
      <JsonLd schema={faqSchema} />
      <SectionMotion />

      <HomeHero locale={locale} />
      <IngredientTicker locale={locale} />
      <IngredientsSection locale={locale} />
      <BackLabelShowcase
        titleStart={t('back.titleStart')}
        titleEnd={t('back.titleEnd')}
        caption={t('back.caption')}
        stageLabels={[t('back.stage1'), t('back.stage2'), t('back.stage3')]}
        imageAlt={t('back.imageAlt')}
      />
      <ProductLinesSection locale={locale} />
      <SportPanels locale={locale} />
      <section id="oporavak" aria-labelledby="oporavak-title" className="frame section">
        <div className="on-ink overflow-hidden rounded-[2rem] border border-[color:var(--color-line)] px-5 py-12 md:px-12 md:py-16">
          <RecoveryCalculator headingId="oporavak-title" heading={t('recovery.title')} />
        </div>
      </section>
      <StorySection locale={locale} />
      <TrackGallery locale={locale} />
      <PriceListSection locale={locale} />
      <ClubsCta locale={locale} />
      <section className="frame section" aria-labelledby="pitanja-title">
        <FaqList id="pitanja-title" title={t('faq.title')} items={faq} />
      </section>
    </>
  )
}
