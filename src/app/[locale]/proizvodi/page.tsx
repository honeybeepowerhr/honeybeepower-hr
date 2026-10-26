import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import type { Locale } from '@/types'
import { REAL_PRODUCTS } from '@/lib/products-data'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildBreadcrumbSchema } from '@/lib/seo/schemas'
import { pageMetadata, localeUrl } from '@/lib/seo/site'
import { formatNumber, getDeclaration, isGelPack, photoFieldFor, WHEY_PROTEIN_PER_33G } from '@/lib/declarations'
import { formatEur, officialPriceEur } from '@/lib/prices'
import { inkOn, webImage } from '@/lib/images'
import { KIND_LABEL, SPORTS, SPORTS_BY_KIND, kindForCategory, l } from '@/lib/product-content'
import { CatalogueList, type CatalogueItem } from '@/components/product/CatalogueList'
import { SectionMotion } from '@/components/site/SectionMotion'

export const revalidate = 3600

const TITLES: Record<Locale, string> = {
  hr: 'Energetski gelovi, izotonik i whey protein',
  en: 'Energy gels, isotonic drinks and whey protein',
  de: 'Energiegels, isotonische Getränke und Whey',
  sl: 'Energijski geli, izotonik in whey protein',
  pl: 'Żele energetyczne, izotoniki i białko whey',
}

const DESCRIPTIONS: Record<Locale, string> = {
  hr: 'Energetski gelovi od meda, izotonični napitci i whey protein Honey Bee Power. Cijene iz službenog cjenika, filtar po vrsti i sportu, narudžba na upit.',
  en: 'Honey Bee Power honey energy gels, isotonic drinks and whey protein. Prices from the official price list, filter by type and sport, order by enquiry.',
  de: 'Honey Bee Power Energiegels aus Honig, isotonische Getränke und Whey Protein. Preise laut Preisliste, Filter nach Art und Sport, Bestellung per Anfrage.',
  sl: 'Energijski geli iz medu, izotonični napitki in whey protein Honey Bee Power. Cene iz uradnega cenika, filter po vrsti in športu, naročilo s povpraševanjem.',
  pl: 'Żele energetyczne z miodu, napoje izotoniczne i białko Honey Bee Power. Ceny z oficjalnego cennika, filtr według rodzaju i sportu, zamówienie przez zapytanie.',
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  return pageMetadata({
    locale,
    path: '/proizvodi',
    title: TITLES[locale] ?? TITLES.hr,
    description: DESCRIPTIONS[locale] ?? DESCRIPTIONS.hr,
    image: '/images/og/proizvodi.jpg',
  })
}

export default async function ProizvodiPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'productPage' })
  const prefix = locale === 'hr' ? '' : `/${locale}`

  const items: CatalogueItem[] = REAL_PRODUCTS.map((p) => {
    const kind = kindForCategory(p.category)
    const d = getDeclaration(p.slug)
    const field = photoFieldFor(d)
    const price = officialPriceEur(p.slug)
    const figure =
      kind === 'gel' && d?.perServing
        ? `${formatNumber(d.perServing.carbohydrates, locale)} g`
        : kind === 'isotonic'
          ? `${formatNumber(13.5, locale)} g`
          : `${formatNumber(Math.round((WHEY_PROTEIN_PER_33G[p.slug] ?? 22) * 10) / 10, locale)} g`
    return {
      slug: p.slug,
      href: `${prefix}/proizvodi/${p.slug}`,
      kind,
      title: (p.name[locale] ?? p.name.hr).replace(/^Honey Bee Power\s+/, ''),
      subtitle: `${l(KIND_LABEL[kind], locale)}${isGelPack(p.slug) ? ' · 10 × 40 g' : ''}`,
      figure,
      figureLabel: kind === 'gel' ? t('carbsGel') : kind === 'isotonic' ? t('carbsIso') : t('proteinWhey'),
      price: price !== null ? formatEur(price, locale) : null,
      image: webImage(p.mainImage.asset._ref),
      field,
      ink: inkOn(field),
      sports: SPORTS_BY_KIND[kind],
    }
  })

  return (
    <>
      <JsonLd
        schema={buildBreadcrumbSchema([
          { name: 'Honey Bee Power', url: localeUrl(locale, '/') },
          { name: t('catalogueTitle'), url: localeUrl(locale, '/proizvodi') },
        ])}
      />
      <SectionMotion />
      <section className="frame grid-12 gap-y-6 pb-12 pt-10 md:pb-16" aria-labelledby="catalogue-title">
        <h1 id="catalogue-title" className="t-display col-span-12 lg:col-span-6">{t('catalogueTitle')}</h1>
        <p className="col-span-12 self-end t-lead lg:col-span-6">{t('catalogueLead')}</p>
      </section>
      <CatalogueList
        items={items}
        kinds={(['gel', 'isotonic', 'whey'] as const).map((k) => ({ id: k, label: l(KIND_LABEL[k], locale) }))}
        sports={SPORTS.map((s) => ({ slug: s.slug, label: s.name[locale] }))}
      />
      <div className="h-24" />
    </>
  )
}
