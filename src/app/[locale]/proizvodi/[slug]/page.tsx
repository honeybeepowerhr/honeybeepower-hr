import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { REAL_PRODUCTS, PRODUCT_CATEGORIES } from '@/lib/products-data'
import type { Locale } from '@/types'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildProductSchema, buildBreadcrumbSchema, buildFAQPageSchema } from '@/lib/seo/schemas'
import { pageMetadata, localeUrl } from '@/lib/seo/site'
import { officialPriceEur } from '@/lib/prices'
import { webImage } from '@/lib/images'
import { PRODUCT_FAQ, kindForCategory, l } from '@/lib/product-content'
import { getDeclaration, formatNumber } from '@/lib/declarations'
import { ProductDetail } from '@/components/product/ProductDetail'
import { CategoryPage, CATEGORY_COPY } from '@/components/product/CategoryPage'
import { SectionMotion } from '@/components/site/SectionMotion'

export const revalidate = 3600

interface PageProps {
  params: Promise<{ locale: Locale; slug: string }>
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return [...Object.keys(PRODUCT_CATEGORIES).map((slug) => ({ slug })), ...REAL_PRODUCTS.map((p) => ({ slug: p.slug }))]
}

/** Opis za tražilice (do 155 znakova), iz činjenica s deklaracije. */
function productDescription(slug: string, locale: Locale): string {
  const product = REAL_PRODUCTS.find((p) => p.slug === slug)!
  const base = product.shortDescription[locale] ?? product.shortDescription.hr
  return base.length > 155 ? `${base.slice(0, 152).replace(/\s+\S*$/, '')}…` : base
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params
  if (PRODUCT_CATEGORIES[slug]) {
    const copy = CATEGORY_COPY[slug]
    return pageMetadata({
      locale,
      path: `/proizvodi/${slug}`,
      title: l(copy.title, locale),
      description: l(copy.meta, locale),
      image: copy.image,
    })
  }
  const product = REAL_PRODUCTS.find((p) => p.slug === slug)
  if (!product) {
    return pageMetadata({ locale, path: `/proizvodi/${slug}`, title: 'Honey Bee Power', description: 'Honey Bee Power', noIndex: true })
  }
  const decl = getDeclaration(slug)
  const name = (product.name[locale] ?? product.name.hr).replace(/^Honey Bee Power\s+/, '')
  const carbs = decl?.perServing ? ` · ${formatNumber(decl.perServing.carbohydrates, locale)} g` : ''
  return pageMetadata({
    locale,
    path: `/proizvodi/${slug}`,
    title: `${name}${carbs}`.slice(0, 60),
    description: productDescription(slug, locale),
    image: webImage(product.mainImage.asset._ref),
  })
}

export default async function ProductOrCategoryPage({ params }: PageProps) {
  const { locale, slug } = await params

  if (PRODUCT_CATEGORIES[slug]) {
    const name = l(CATEGORY_COPY[slug].title, locale)
    return (
      <>
        <JsonLd
          schema={buildBreadcrumbSchema([
            { name: 'Honey Bee Power', url: localeUrl(locale, '/') },
            { name: locale === 'hr' ? 'Proizvodi' : 'Products', url: localeUrl(locale, '/proizvodi') },
            { name, url: localeUrl(locale, `/proizvodi/${slug}`) },
          ])}
        />
        <SectionMotion />
        <CategoryPage category={slug} locale={locale} />
      </>
    )
  }

  const product = REAL_PRODUCTS.find((p) => p.slug === slug)
  if (!product) notFound()

  const kind = kindForCategory(product.category)
  const name = product.name[locale] ?? product.name.hr
  const price = officialPriceEur(product.slug)
  const productSchema = buildProductSchema(product, locale, { priceEur: price, url: localeUrl(locale, `/proizvodi/${slug}`) })
  const faqSchema = buildFAQPageSchema(
    PRODUCT_FAQ[kind].map((f, i) => ({ _key: String(i), question: f.q, answer: f.a })),
    locale,
  )

  return (
    <>
      <JsonLd schema={productSchema} />
      <JsonLd schema={faqSchema} />
      <JsonLd
        schema={buildBreadcrumbSchema([
          { name: 'Honey Bee Power', url: localeUrl(locale, '/') },
          { name: locale === 'hr' ? 'Proizvodi' : 'Products', url: localeUrl(locale, '/proizvodi') },
          { name: l(CATEGORY_COPY[product.category].title, locale), url: localeUrl(locale, `/proizvodi/${product.category}`) },
          { name, url: localeUrl(locale, `/proizvodi/${slug}`) },
        ])}
      />
      <SectionMotion />
      <ProductDetail product={product} locale={locale} />
    </>
  )
}
