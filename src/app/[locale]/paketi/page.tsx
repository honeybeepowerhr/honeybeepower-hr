import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import type { Locale } from '@/types'
import { BUNDLES } from '@/lib/bundles-data'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildBreadcrumbSchema } from '@/lib/seo/schemas'
import { pageMetadata, localeUrl } from '@/lib/seo/site'
import { BundleCard } from '@/components/bundles/BundleCard'
import { SectionMotion } from '@/components/site/SectionMotion'

export const revalidate = 3600

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'bundles' })
  return pageMetadata({
    locale,
    path: '/paketi',
    title: t('metaTitle'),
    description: t('metaDescription'),
    image: '/images/og/proizvodi.jpg',
  })
}

export default async function BundlesPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'bundles' })
  const tp = await getTranslations({ locale, namespace: 'productPage' })

  return (
    <>
      <JsonLd
        schema={buildBreadcrumbSchema([
          { name: 'Honey Bee Power', url: localeUrl(locale, '/') },
          { name: t('title'), url: localeUrl(locale, '/paketi') },
        ])}
      />
      <SectionMotion />
      <section className="frame grid-12 gap-y-6 pb-10 pt-10 md:pb-14" aria-labelledby="paketi-title">
        <h1 id="paketi-title" className="t-display col-span-12 lg:col-span-6">{t('title')}</h1>
        <p className="col-span-12 self-end t-lead lg:col-span-6">{t('lead')}</p>
      </section>
      <section className="frame pb-24" aria-label={t('title')}>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BUNDLES.map((b, i) => (
            <li key={b.slug} data-reveal>
              <BundleCard bundle={b} locale={locale} priority={i < 3} />
            </li>
          ))}
        </ul>
        <p className="mt-10 max-w-[60ch] t-small text-muted">{tp('orderNote')}</p>
      </section>
    </>
  )
}
