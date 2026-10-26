import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Check, ArrowLeft } from 'lucide-react'
import { REAL_PRODUCTS, PRODUCT_CATEGORIES } from '@/lib/products-data'
import type { Locale } from '@/types'
import ProductAddToCartButton from './ProductAddToCartButton'
import ProductImageGallery from './ProductImageGallery'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildProductSchema, buildBreadcrumbSchema } from '@/lib/seo/schemas'
import { pageMetadata, localeUrl } from '@/lib/seo/site'
import { getDeclaration } from '@/lib/declarations'
import GelDeclaration from './GelDeclaration'

export const revalidate = 60

const KNOWN_CATEGORIES = PRODUCT_CATEGORIES

const CATEGORY_DESCRIPTIONS: Record<string, Record<Locale, string>> = {
  'energetski-gelovi': {
    hr: 'Energetski gelovi od 40 g s tri ili četiri sastojka: višecvjetni med (91–95,5 %), liofilizirano voće, ekstrakt sjemenki guarane i morska sol. Bez sukraloze i umjetnih boja.',
    en: '40 g energy gels with three or four ingredients: multifloral honey (91–95.5%), freeze-dried fruit, guarana seed extract and sea salt. No sucralose, no artificial colours.',
    de: 'Energiegels à 40 g mit drei oder vier Zutaten: Mehrblütenhonig (91–95,5 %), gefriergetrocknete Früchte, Guaranasamenextrakt und Meersalz. Ohne Sucralose und künstliche Farbstoffe.',
    sl: 'Energijski geli po 40 g s tremi ali štirimi sestavinami: večcvetni med (91–95,5 %), liofilizirano sadje, izvleček semen guarane in morska sol. Brez sukraloze in umetnih barvil.',
    pl: 'Żele energetyczne 40 g z trzema lub czterema składnikami: miód wielokwiatowy (91–95,5%), liofilizowane owoce, ekstrakt z nasion guarany i sól morska. Bez sukralozy i sztucznych barwników.',
  },
  'izotonicki-napitci': {
    hr: 'Izotonični napitci u prahu, okusi limun i naranča. Posuda od 500 g ili vrećica od 15 g; 13,5 g ugljikohidrata u porciji od 15 g.',
    en: 'Instant isotonic drink powders in lemon and orange. 500 g tub or 15 g sachet; 13.5 g of carbohydrate per 15 g serving.',
    de: 'Isotonische Instant-Getränkepulver mit Zitrone und Orange. 500-g-Dose oder 15-g-Beutel; 13,5 g Kohlenhydrate pro 15-g-Portion.',
    sl: 'Instant izotonični napitki v prahu z okusom limone in pomaranče. Embalaža 500 g ali vrečka 15 g; 13,5 g ogljikovih hidratov v 15-gramskem obroku.',
    pl: 'Instant napoje izotoniczne w proszku o smaku cytrynowym i pomarańczowym. Opakowanie 500 g lub saszetka 15 g; 13,5 g węglowodanów w porcji 15 g.',
  },
  'whey-proteini': {
    hr: 'Whey protein sa sušenim medom (6 %) i stevijom, okusi lješnjak-čokolada, banana-vanilija i jagoda-šlag. Posuda od 700 g. Sadrži mlijeko.',
    en: 'Whey protein with dried honey (6%) and stevia in hazelnut-chocolate, banana-vanilla and strawberry-cream. 700 g tub. Contains milk.',
    de: 'Whey Protein mit getrocknetem Honig (6 %) und Stevia in Haselnuss-Schokolade, Banane-Vanille und Erdbeere-Sahne. 700-g-Dose. Enthält Milch.',
    sl: 'Whey protein s sušenim medom (6 %) in stevio, okusi lešnik-čokolada, banana-vanilija in jagoda-smetana. Embalaža 700 g. Vsebuje mleko.',
    pl: 'Białko serwatkowe z suszonym miodem (6%) i stewią, smaki orzech laskowy z czekoladą, banan z wanilią i truskawka ze śmietaną. Opakowanie 700 g. Zawiera mleko.',
  },
}

interface PageProps {
  params: Promise<{ locale: Locale; slug: string }>
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const categorySlugs = Object.keys(KNOWN_CATEGORIES).map((slug) => ({ slug }))
  const productSlugs = REAL_PRODUCTS.map((p) => ({ slug: p.slug }))
  return [...categorySlugs, ...productSlugs]
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params
  const currentLocale = locale || 'hr'

  if (KNOWN_CATEGORIES[slug]) {
    const catName = KNOWN_CATEGORIES[slug][currentLocale] ?? KNOWN_CATEGORIES[slug].hr
    const catDesc = CATEGORY_DESCRIPTIONS[slug]?.[currentLocale] ?? CATEGORY_DESCRIPTIONS[slug]?.hr ?? catName
    return pageMetadata({
      locale: currentLocale,
      path: `/proizvodi/${slug}`,
      title: catName,
      description: catDesc,
    })
  }

  const product = REAL_PRODUCTS.find((p) => p.slug === slug)
  if (product) {
    const prodName = product.name[currentLocale] ?? product.name.hr
    const prodDesc = product.shortDescription[currentLocale] ?? product.shortDescription.hr
    return pageMetadata({
      locale: currentLocale,
      path: `/proizvodi/${slug}`,
      title: prodName,
      description: prodDesc,
      image: product.mainImage.asset._ref,
    })
  }

  return pageMetadata({
    locale: currentLocale,
    path: `/proizvodi/${slug}`,
    title: 'Proizvod nije pronađen',
    description: 'Honey Bee Power — natural honey-based sports nutrition.',
    noIndex: true,
  })
}

export default async function ProductOrCategoryPage({ params }: PageProps) {
  const { locale, slug } = await params
  const currentLocale: Locale = locale || 'hr'
  const prefix = currentLocale === 'hr' ? '' : `/${currentLocale}`

  // Labels dictionary
  const LABELS = {
    backToAll: {
      hr: 'Natrag na sve proizvode',
      en: 'Back to all products',
      de: 'Zurück zu allen Produkten',
      sl: 'Nazaj na vse izdelke',
      pl: 'Wróć do wszystkich produktów',
    },
    allProducts: {
      hr: 'Svi proizvodi',
      en: 'All products',
      de: 'Alle Produkte',
      sl: 'Vsi izdelki',
      pl: 'Wszystkie produkty',
    },
    details: {
      hr: 'Detalji',
      en: 'Details',
      de: 'Details',
      sl: 'Podrobnosti',
      pl: 'Szczegóły',
    },
    reviews: {
      hr: 'recenzija',
      en: 'reviews',
      de: 'Bewertungen',
      sl: 'ocen',
      pl: 'recenzji',
    },
    feature1: {
      hr: 'Višecvjetni med (91–95,5 %)',
      en: 'Multifloral honey (91–95.5%)',
      de: 'Mehrblütenhonig (91–95,5 %)',
      sl: 'Večcvetni med (91–95,5 %)',
      pl: 'Miód wielokwiatowy (91–95,5%)',
    },
    feature2: {
      hr: 'Bez sukraloze i umjetnih boja',
      en: 'No sucralose, no artificial colours',
      de: 'Ohne Sucralose und künstliche Farbstoffe',
      sl: 'Brez sukraloze in sintetičnih barvil',
      pl: 'Bez sukralozy i syntetycznych barwników',
    },
    feature3: {
      hr: 'Liofilizirano voće',
      en: 'Freeze-dried fruit',
      de: 'Gefriergetrocknete Früchte',
      sl: 'Liofilizirano sadje',
      pl: 'Owoce liofilizowane',
    },
    gelBadge: {
      hr: 'Energetski Gel',
      en: 'Energy Gel',
      de: 'Energie-Gel',
      sl: 'Energetski gel',
      pl: 'Żel energetyczny',
    },
    isoBadge: {
      hr: 'Izotonični Napitak',
      en: 'Isotonic Drink',
      de: 'Isotonisches Getränk',
      sl: 'Izotonični napitek',
      pl: 'Napój izotoniczny',
    },
    wheyBadge: {
      hr: 'Whey Protein',
      en: 'Whey Protein',
      de: 'Molkenprotein',
      sl: 'Whey beljakovina',
      pl: 'Białko serwatkowe',
    },
    wheyFeature1: {
      hr: 'Sušeni med (6 %) i stevija',
      en: 'Dried honey (6%) and stevia',
      de: 'Getrockneter Honig (6 %) und Stevia',
      sl: 'Sušen med (6 %) in stevia',
      pl: 'Suszony miód (6%) i stewia',
    },
    wheyFeature2: {
      hr: 'Oko 22 g proteina u porciji od 33 g',
      en: 'About 22 g of protein per 33 g serving',
      de: 'Etwa 22 g Protein pro 33-g-Portion',
      sl: 'Približno 22 g beljakovin v 33-gramskem obroku',
      pl: 'Około 22 g białka w porcji 33 g',
    },
    wheyFeature3: {
      hr: 'Sadrži mlijeko (alergen)',
      en: 'Contains milk (allergen)',
      de: 'Enthält Milch (Allergen)',
      sl: 'Vsebuje mleko (alergen)',
      pl: 'Zawiera mleko (alergen)',
    },
  }

  // 1. If it's a category page
  if (KNOWN_CATEGORIES[slug]) {
    const categoryName = KNOWN_CATEGORIES[slug][currentLocale] ?? KNOWN_CATEGORIES[slug].hr
    const categoryProducts = REAL_PRODUCTS.filter((p) => p.category === slug)
    const breadcrumbSchema = buildBreadcrumbSchema([
      { name: 'Početna', url: localeUrl(currentLocale, '/') },
      { name: LABELS.allProducts[currentLocale], url: localeUrl(currentLocale, '/proizvodi') },
      { name: categoryName, url: localeUrl(currentLocale, `/proizvodi/${slug}`) },
    ])

    return (
      <div className="py-12 bg-white relative z-10">
        <JsonLd schema={breadcrumbSchema} />
        <div className="container mx-auto px-4 max-w-7xl">
          <Link href={`${prefix}/proizvodi`} className="inline-flex items-center text-sm font-bold text-amber-600 hover:underline mb-4">
            <ArrowLeft className="w-4 h-4 mr-1" /> {LABELS.backToAll[currentLocale]}
          </Link>
          <h1 className="text-4xl font-black text-gray-900 mb-2 font-heading">{categoryName}</h1>
          <p className="text-gray-600 mb-8 font-sans font-medium">Honey Bee Power — {categoryName}.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryProducts.map((prod) => {
              const prodName = prod.name[currentLocale] ?? prod.name.hr
              const prodDesc = prod.shortDescription[currentLocale] ?? prod.shortDescription.hr

              return (
                <div key={prod._id} className="relative bg-white rounded-3xl border border-amber-200 p-5 shadow-sm hover:shadow-xl transition-all">
                  <Link
                    href={`${prefix}/proizvodi/${prod.slug}`}
                    className="absolute inset-0 z-10 rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                  >
                    <span className="sr-only">Pogledaj: {prodName}</span>
                  </Link>
                  <div className="relative aspect-square mb-4 bg-amber-50 rounded-2xl overflow-hidden">
                    <Image src={prod.mainImage.asset._ref} alt={prodName} fill className="object-contain p-4" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 font-heading mb-2">{prodName}</h3>
                  <p className="text-sm text-gray-600 mb-4">{prodDesc}</p>
                  <div className="flex items-center justify-end font-extrabold text-lg text-gray-900">
                    <span className="relative z-20 px-4 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs uppercase font-extrabold">
                      {LABELS.details[currentLocale]}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // 2. Find product
  const product = REAL_PRODUCTS.find((p) => p.slug === slug)
  if (!product) {
    notFound()
  }

  const prodName = product.name[currentLocale] ?? product.name.hr
  const prodDesc = product.shortDescription[currentLocale] ?? product.shortDescription.hr
  const variant = product.variants[0]

  const categoryName = KNOWN_CATEGORIES[product.category]?.[currentLocale] ?? product.category
  const isWhey = product.category === 'whey-proteini'
  const categoryBadge =
    product.category === 'energetski-gelovi'
      ? LABELS.gelBadge
      : isWhey
        ? LABELS.wheyBadge
        : LABELS.isoBadge
  const isGel = product.category === 'energetski-gelovi'
  // Izotonik: sastav još nije potvrđen, pa bez popisa značajki.
  const features = isWhey
    ? [LABELS.wheyFeature1, LABELS.wheyFeature2, LABELS.wheyFeature3]
    : isGel
      ? [LABELS.feature1, LABELS.feature2, LABELS.feature3]
      : []
  const declaration = isGel ? getDeclaration(product.slug) : undefined
  const productSchema = buildProductSchema(product, currentLocale)
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Početna', url: localeUrl(currentLocale, '/') },
    { name: LABELS.allProducts[currentLocale], url: localeUrl(currentLocale, '/proizvodi') },
    { name: categoryName, url: localeUrl(currentLocale, `/proizvodi/${product.category}`) },
    { name: prodName, url: localeUrl(currentLocale, `/proizvodi/${product.slug}`) },
  ])

  return (
    <div className="py-12 bg-white relative z-10">
      <JsonLd schema={productSchema} />
      <JsonLd schema={breadcrumbSchema} />
      <div className="container mx-auto px-4 max-w-6xl">
        <Link href={`${prefix}/proizvodi`} className="inline-flex items-center text-sm font-bold text-amber-600 hover:underline mb-6">
          <ArrowLeft className="w-4 h-4 mr-1.5" /> {LABELS.allProducts[currentLocale]}
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-white p-6 sm:p-10 rounded-3xl border border-amber-200 shadow-xl">
          {/* Image gallery */}
          <ProductImageGallery
            images={
              product.imageGallery && product.imageGallery.length > 0
                ? product.imageGallery.map((img) => ({
                    src: img.asset._ref,
                    alt: img.alt || prodName,
                  }))
                : [{ src: product.mainImage.asset._ref, alt: prodName }]
            }
          />

          {/* Details */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
              {categoryBadge[currentLocale]}
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 font-heading leading-tight">
              {prodName}
            </h1>



            <p className="text-base text-gray-700 font-sans leading-relaxed">
              {prodDesc}
            </p>

            <div className="space-y-2 pt-2 border-t border-amber-100 text-sm font-semibold text-gray-800">
              {features.map((feature) => (
                <div key={feature.en} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>{feature[currentLocale]}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <ProductAddToCartButton product={product} variant={variant} />
            </div>
          </div>
        </div>

        {declaration && <GelDeclaration declaration={declaration} locale={currentLocale} />}
      </div>
    </div>
  )
}
