import type { Metadata } from 'next'
import type { Locale } from '@/types'
import { pageMetadata, SITE_URL } from '@/lib/seo/site'
import { buildStoreSchema, buildBreadcrumbSchema } from '@/lib/seo/schemas'
import { localeUrl } from '@/lib/seo/site'
import { JsonLd } from '@/components/seo/JsonLd'
import WhereToBuyClient from './WhereToBuyClient'

const TITLES: Record<Locale, string> = {
  hr: 'Gdje Kupiti Honey Bee Power',
  en: 'Where to Buy Honey Bee Power',
  de: 'Wo gibt es Honey Bee Power zu kaufen',
  sl: 'Kje Kupiti Honey Bee Power',
  pl: 'Gdzie Kupić Honey Bee Power',
}

const DESCRIPTIONS: Record<Locale, string> = {
  hr: 'Pronađite Honey Bee Power proizvode — sjedište i prodajno mjesto u Našicama, Krndijska ulica 4. Za veleprodaju i partnerstva kontaktirajte nas izravno.',
  en: 'Find Honey Bee Power — our store and headquarters in Našice, Croatia (Krndijska ulica 4). Contact us directly for wholesale and retail partnerships.',
  de: 'Finden Sie Honey Bee Power — unser Geschäft und Hauptsitz in Našice, Kroatien (Krndijska ulica 4). Kontaktieren Sie uns für Großhandel und Partnerschaften.',
  sl: 'Poiščite Honey Bee Power — naša trgovina in sedež v Našicah, Hrvaška (Krndijska ulica 4). Za veleprodajo in partnerstva nas kontaktirajte neposredno.',
  pl: 'Znajdź Honey Bee Power — nasz sklep i siedziba w Našicach, Chorwacja (Krndijska ulica 4). W sprawie hurtu i partnerstw skontaktuj się z nami bezpośrednio.',
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  return pageMetadata({
    locale,
    path: '/gdje-kupiti',
    title: TITLES[locale] ?? TITLES.hr,
    description: DESCRIPTIONS[locale] ?? DESCRIPTIONS.hr,
  })
}

export default async function WhereToBuyPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const storeSchema = buildStoreSchema(SITE_URL)
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Početna', url: localeUrl(locale, '/') },
    { name: 'Gdje kupiti', url: localeUrl(locale, '/gdje-kupiti') },
  ])

  return (
    <>
      <JsonLd schema={storeSchema} />
      <JsonLd schema={breadcrumbSchema} />
      <WhereToBuyClient />
    </>
  )
}
