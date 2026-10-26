import type { Metadata } from 'next'
import { HeroSection } from '@/components/home/HeroSection'
import { ProductLineSection } from '@/components/home/ProductLineSection'
import { WhyHBPSection } from '@/components/home/WhyHBPSection'
import { SocialProofSection } from '@/components/home/SocialProofSection'
import { ActivitiesGallery } from '@/components/home/ActivitiesGallery'
import { NewsletterSection } from '@/components/home/NewsletterSection'
import { QuizSection } from '@/components/home/QuizSection'
import { JsonLd } from '@/components/seo/JsonLd'
import { HexDivider } from '@/components/ui/HexDivider'
import type { Locale } from '@/types'
import { SITE_URL, buildAlternates } from '@/lib/seo/site'
import { buildOrganizationSchema, buildWebsiteSchema } from '@/lib/seo/schemas'

export const revalidate = 60 // ISR revalidate every 60s

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
      images: [{ url: `${SITE_URL}/images/logo.png`, width: 1200, height: 630, alt: copy.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: copy.title,
      description: copy.description,
      images: [`${SITE_URL}/images/logo.png`],
    },
  }
}

export default async function HomePage() {
  const organizationSchema = buildOrganizationSchema(SITE_URL)
  const websiteSchema = buildWebsiteSchema(SITE_URL)

  return (
    <>
      <JsonLd schema={organizationSchema} />
      <JsonLd schema={websiteSchema} />

      <HeroSection />
      <HexDivider className="py-6 bg-white" />
      <QuizSection />
      <ProductLineSection />
      <WhyHBPSection />
      <HexDivider className="py-6 bg-white" />
      <SocialProofSection />
      <ActivitiesGallery limit={8} />
      <NewsletterSection />
    </>
  )
}
