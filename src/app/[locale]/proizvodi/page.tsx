import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import type { Locale } from '@/types'
import CatalogueGrid from '@/components/product/CatalogueGrid'
import { REAL_PRODUCTS } from '@/lib/products-data'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildBreadcrumbSchema } from '@/lib/seo/schemas'
import { pageMetadata, localeUrl } from '@/lib/seo/site'

export const revalidate = 60

const TITLES: Record<Locale, string> = {
  hr: 'Svi Proizvodi',
  en: 'All Products',
  de: 'Alle Produkte',
  sl: 'Vsi Izdelki',
  pl: 'Wszystkie Produkty',
}

const DESCRIPTIONS: Record<Locale, string> = {
  hr: 'Pregledaj kompletnu ponudu Honey Bee Power proizvoda — energetski gelovi i izotonični napitci na bazi 100% prirodnog cvjetnog meda, bez sukraloze.',
  en: 'Browse the full Honey Bee Power range — energy gels and isotonic drinks made with 100% natural flower honey, no sucralose.',
  de: 'Entdecke das gesamte Honey Bee Power Sortiment — Energiegels und isotonische Getränke aus 100% natürlichem Blütenhonig, ohne Sucralose.',
  sl: 'Oglejte si celotno ponudbo Honey Bee Power — energijski geli in izotonični napitki na osnovi 100 % naravnega cvetličnega medu.',
  pl: 'Zobacz pełną ofertę Honey Bee Power — żele energetyczne i napoje izotoniczne na bazie 100% naturalnego miodu kwiatowego.',
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  return pageMetadata({
    locale,
    path: '/proizvodi',
    title: TITLES[locale] ?? TITLES.hr,
    description: DESCRIPTIONS[locale] ?? DESCRIPTIONS.hr,
  })
}

interface ProizvodiPageProps {
  params: Promise<{ locale: Locale }>
}

export default async function ProizvodiPage({ params }: ProizvodiPageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'catalogue' })

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Početna', url: localeUrl(locale, '/') },
    { name: t('heading'), url: localeUrl(locale, '/proizvodi') },
  ])

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl relative z-10 space-y-8">
      <JsonLd schema={breadcrumbSchema} />
      <div>
        <h1 className="text-4xl sm:text-5xl font-black mb-3 font-heading uppercase tracking-wide text-gray-900">
          {t('heading')}
        </h1>
        <p className="text-lg text-gray-600 font-sans font-medium">
          {t('subtitle')}
        </p>
      </div>

      <CatalogueGrid products={REAL_PRODUCTS} locale={locale} />
    </div>
  )
}
