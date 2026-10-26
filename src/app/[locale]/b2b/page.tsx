import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import type { Locale } from '@/types'
import { pageMetadata, localeUrl } from '@/lib/seo/site'
import { buildBreadcrumbSchema } from '@/lib/seo/schemas'
import { JsonLd } from '@/components/seo/JsonLd'
import { SectionMotion } from '@/components/site/SectionMotion'
import { CJENIK_ITEMS } from '@/lib/cjenik-data'
import B2BClient from './B2BClient'

export const revalidate = 3600

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'b2bPage' })
  return pageMetadata({ locale, path: '/b2b', title: t('metaTitle'), description: t('metaDescription'), image: '/images/events-web/event-24.jpg' })
}

export default async function B2BPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'b2bPage' })
  const tf = await getTranslations({ locale, namespace: 'flavours' })
  const products = CJENIK_ITEMS.filter((i) => i.vrsta !== 'Shaker').map((i) => ({
    id: String(i.rb),
    label: `${t(`kind.${i.vrsta === 'Energetski gel' ? 'gel' : i.vrsta === 'Instant izotonik' ? 'iso' : 'whey'}`)} · ${tf(i.okus.toLowerCase())} · ${i.pakiranje}`,
  }))

  const facts = [
    { label: t('fact1Label'), value: t('fact1') },
    { label: t('fact2Label'), value: t('fact2') },
    { label: t('fact3Label'), value: t('fact3') },
    { label: t('fact4Label'), value: t('fact4') },
  ]

  return (
    <>
      <JsonLd schema={buildBreadcrumbSchema([
        { name: 'Honey Bee Power', url: localeUrl(locale, '/') },
        { name: t('title'), url: localeUrl(locale, '/b2b') },
      ])} />
      <SectionMotion />

      <section className="on-ink" aria-labelledby="b2b-title">
        <div className="frame grid-12 gap-y-10 pb-16 pt-12 md:pb-24">
          <h1 id="b2b-title" className="t-display col-span-12 lg:col-span-8">{t('title')}</h1>
          <p className="col-span-12 t-lead lg:col-span-6">{t('subtitle')}</p>
          <dl className="col-span-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((f) => (
              <div key={f.label} className="bg-white/[0.08] p-5">
                <dt className="t-small">{f.label}</dt>
                <dd className="mt-2 t-body font-medium">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="frame section" aria-labelledby="b2b-form-title">
        <div className="grid-12 gap-y-10">
          <div className="col-span-12 lg:col-span-4">
            <h2 id="b2b-form-title" className="t-head">{t('formTitle')}</h2>
            <p className="mt-6 t-body measure">{t('formLead')}</p>
          </div>
          <div className="col-span-12 lg:col-span-7 lg:col-start-6">
            <B2BClient products={products} />
          </div>
        </div>
      </section>
    </>
  )
}
