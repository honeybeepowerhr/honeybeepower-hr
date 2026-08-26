import type { Metadata } from 'next'
import { HeroSection } from '@/components/home/HeroSection'
import { WordBand } from '@/components/home/WordBand'
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
    title: 'Honey Bee Power — Prirodna Sportska Prehrana na Bazi Meda',
    description:
      'Prirodni energetski gelovi i izotonični napitci na bazi 100% cvjetnog meda — bez sukraloze i umjetnih aditiva. Hrvatski brend, proizvedeno u Poljskoj, dostava diljem regije.',
  },
  en: {
    title: 'Honey Bee Power — Natural Honey-Based Sports Nutrition',
    description:
      'Natural energy gels and isotonic drinks made with 100% flower honey — no sucralose, no artificial additives. Croatian brand, made in Poland, shipped across Europe.',
  },
  de: {
    title: 'Honey Bee Power — Natürliche Sporternährung auf Honigbasis',
    description:
      'Natürliche Energiegels und isotonische Getränke aus 100% Blütenhonig — ohne Sucralose, ohne künstliche Zusätze. Kroatische Marke, hergestellt in Polen.',
  },
  sl: {
    title: 'Honey Bee Power — Naravna Športna Prehrana na Osnovi Medu',
    description:
      'Naravni energijski geli in izotonični napitki na osnovi 100 % cvetličnega medu — brez sukraloze in umetnih dodatkov. Hrvaška blagovna znamka, izdelano na Poljskem.',
  },
  pl: {
    title: 'Honey Bee Power — Naturalne Odżywki Sportowe na Bazie Miodu',
    description:
      'Naturalne żele energetyczne i napoje izotoniczne na bazie 100% miodu kwiatowego — bez sukralozy i sztucznych dodatków. Chorwacka marka, produkowane w Polsce.',
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
      <WordBand />
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
