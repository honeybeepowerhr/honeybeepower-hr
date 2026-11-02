import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import type { Locale } from '@/types'
import { BUNDLES, cardLines, getBundle, lowestPriceEur } from '@/lib/bundles-data'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildBreadcrumbSchema } from '@/lib/seo/schemas'
import { pageMetadata, localeUrl, absoluteUrl } from '@/lib/seo/site'
import { formatEur } from '@/lib/prices'
import BundleConfigurator from '@/components/bundles/BundleConfigurator'
import { BundleCard } from '@/components/bundles/BundleCard'
import { SectionMotion } from '@/components/site/SectionMotion'

export const revalidate = 3600

interface PageProps {
  params: Promise<{ locale: Locale; slug: string }>
}

export function generateStaticParams(): { slug: string }[] {
  return BUNDLES.map((b) => ({ slug: b.slug }))
}

const cut = (s: string, max = 155) => (s.length > max ? `${s.slice(0, max - 1).replace(/\s+\S*$/, '')}…` : s)

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params
  const bundle = getBundle(slug)
  if (!bundle) return pageMetadata({ locale, path: `/paketi/${slug}`, title: 'Honey Bee Power', description: 'Honey Bee Power', noIndex: true })
  const t = await getTranslations({ locale, namespace: 'bundles' })
  const multi = bundle.options.length > 1
  const price = `${multi ? `${t('from')} ` : ''}${formatEur(lowestPriceEur(bundle), locale)}`
  return pageMetadata({
    locale,
    path: `/paketi/${slug}`,
    title: bundle.name[locale].slice(0, 44),
    description: cut(`${bundle.name[locale]}: ${cardLines(bundle, locale).join(' · ')}. ${price}.`),
    image: '/images/og/proizvodi.jpg',
  })
}

export default async function BundlePage({ params }: PageProps) {
  const { locale, slug } = await params
  const bundle = getBundle(slug)
  if (!bundle) notFound()

  const t = await getTranslations({ locale, namespace: 'bundles' })
  const tp = await getTranslations({ locale, namespace: 'productPage' })
  const prefix = locale === 'hr' ? '' : `/${locale}`
  const name = bundle.name[locale]
  const url = localeUrl(locale, `/paketi/${slug}`)
  const prices = bundle.options.map((o) => o.priceEur)
  const offers =
    bundle.options.length === 1
      ? { '@type': 'Offer', price: prices[0].toFixed(2), priceCurrency: 'EUR', url, seller: { '@type': 'Organization', name: 'Planet Bio' } }
      : {
          '@type': 'AggregateOffer',
          lowPrice: Math.min(...prices).toFixed(2),
          highPrice: Math.max(...prices).toFixed(2),
          priceCurrency: 'EUR',
          offerCount: prices.length,
          url,
          seller: { '@type': 'Organization', name: 'Planet Bio' },
        }

  return (
    <>
      <JsonLd
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name,
          description: cardLines(bundle, locale).join(', '),
          image: absoluteUrl(bundle.cover),
          brand: { '@type': 'Brand', name: 'Honey Bee Power' },
          offers,
        }}
      />
      <JsonLd
        schema={buildBreadcrumbSchema([
          { name: 'Honey Bee Power', url: localeUrl(locale, '/') },
          { name: t('title'), url: localeUrl(locale, '/paketi') },
          { name, url },
        ])}
      />
      <SectionMotion />

      <section className="frame pb-8 pt-8 md:pb-10" aria-labelledby="bundle-title">
        <nav aria-label={tp('breadcrumb')} className="t-small">
          <ol className="flex flex-wrap gap-x-2">
            <li><Link href={prefix || '/'} className="hover:underline">{tp('home')}</Link> /</li>
            <li><Link href={`${prefix}/paketi`} className="hover:underline">{t('title')}</Link> /</li>
            <li aria-current="page">{name}</li>
          </ol>
        </nav>
        <div className="mt-6 grid-12 items-end gap-y-4">
          <h1 id="bundle-title" className="t-display col-span-12 lg:col-span-7">{name}</h1>
          <ul className="col-span-12 space-y-1 t-body text-muted lg:col-span-5">
            {cardLines(bundle, locale).map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="frame pb-20 md:pb-28" aria-label={t('chooseTitle')}>
        <BundleConfigurator slug={slug} />
      </section>

      <section className="frame pb-24" aria-labelledby="others-title">
        <h2 id="others-title" className="t-head">{t('others')}</h2>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BUNDLES.filter((b) => b.slug !== slug).slice(0, 3).map((b) => (
            <li key={b.slug}>
              <BundleCard bundle={b} locale={locale} />
            </li>
          ))}
        </ul>
        <Link href={`${prefix}/paketi`} className="btn btn-ghost mt-10">
          {t('back')}
          <span className="btn-arrow" aria-hidden="true">→</span>
        </Link>
      </section>
    </>
  )
}
