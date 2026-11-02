import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import type { Locale } from '@/types'
import { EVENT_KINDS, EVENT_PHOTOS } from '@/lib/gallery-data'
import { IMAGE_RATIOS } from '@/lib/image-ratios'
import { KIND_LABEL } from '@/lib/bundles-data'
import { getDeclaration } from '@/lib/declarations'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildBreadcrumbSchema } from '@/lib/seo/schemas'
import { pageMetadata, localeUrl } from '@/lib/seo/site'
import Gallery, { type GalleryItem } from '@/components/gallery/Gallery'
import { SectionMotion } from '@/components/site/SectionMotion'

export const revalidate = 3600

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'gallery' })
  return pageMetadata({ locale, path: '/galerija', title: t('metaTitle'), description: t('metaDescription'), image: '/images/og/dogadaji.jpg' })
}

const web = (file: string) => `/images/products-web/${file}.webp`
const ratio = (file: string) => IMAGE_RATIOS[web(file)] ?? 1

export default async function GalleryPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'gallery' })
  const tp = await getTranslations({ locale, namespace: 'productPage' })

  const events: GalleryItem[] = EVENT_PHOTOS.map((p) => ({
    id: `event-${p.n}`,
    src: `/images/events-web/event-${p.n}.jpg`,
    full: `/images/events-web/event-${p.n}.jpg`,
    alt: EVENT_KINDS[p.kind][locale],
    w: p.w,
    h: p.h,
  }))

  const front = (kind: 'gel' | 'iso' | 'whey', slug: string, file: string): GalleryItem => {
    const d = getDeclaration(slug)
    const label = KIND_LABEL[kind][locale]
    return { id: file, src: web(file), full: web(file), alt: `${label}: ${d?.flavour[locale] ?? ''}`, w: Math.round(1000 * ratio(file)), h: 1000, bg: d?.flavourColor ?? '#ffffff' }
  }
  const back = (slug: string, file: string): GalleryItem => {
    const d = getDeclaration(slug)
    return {
      id: file,
      src: web(file),
      full: web(`${file}-xl`),
      alt: tp('backAlt', { name: `${KIND_LABEL[slug.includes('izotonicki') ? 'iso' : 'gel'][locale]}, ${d?.flavour[locale] ?? ''}` }),
      w: Math.round(1000 * ratio(file)),
      h: 1000,
      bg: '#ffffff',
    }
  }

  const products: GalleryItem[] = [
    front('gel', 'honey-bee-power-energy-gel-limun', 'gellimun-prednja'),
    front('gel', 'honey-bee-power-energy-gel-naranca', 'gelnaranca-prednja'),
    front('gel', 'honey-bee-power-energy-gel-malina', 'gelmalina-prednja'),
    front('iso', 'honey-bee-power-izotonicki-napitak-limun', 'isolimun-prednja-v3'),
    front('iso', 'honey-bee-power-izotonicki-napitak-naranca', 'isonaranca-prednja-v3'),
    front('whey', 'honey-bee-power-whey-protein-ljesnjak-cokolada-700g', 'proteincokolada700g-v3'),
    front('whey', 'honey-bee-power-whey-protein-banana-vanilija-700g', 'proteinbanana700g-v3'),
    front('whey', 'honey-bee-power-whey-protein-jagoda-slag-700g', 'proteinjagodaslag700g-v3'),
    { id: 'shaker', src: web('shaker'), full: web('shaker'), alt: KIND_LABEL.shaker[locale], w: 698, h: 698, bg: '#ffffff' },
    back('honey-bee-power-energy-gel-limun', 'gellimun-zadnja'),
    back('honey-bee-power-energy-gel-naranca', 'gelnaranca-zadnja'),
    back('honey-bee-power-energy-gel-malina', 'gelmalina-zadnja'),
    back('honey-bee-power-izotonicki-napitak-limun', 'isolimun-zadnja'),
    back('honey-bee-power-izotonicki-napitak-naranca', 'isonaranca-zadnja'),
  ]

  return (
    <>
      <JsonLd
        schema={buildBreadcrumbSchema([
          { name: 'Honey Bee Power', url: localeUrl(locale, '/') },
          { name: t('title'), url: localeUrl(locale, '/galerija') },
        ])}
      />
      <SectionMotion />
      <section className="frame grid-12 gap-y-6 pb-8 pt-10" aria-labelledby="galerija-title">
        <h1 id="galerija-title" className="t-display col-span-12 lg:col-span-6">{t('title')}</h1>
        <p className="col-span-12 self-end t-lead lg:col-span-6">{t('lead')}</p>
      </section>
      <section className="frame pb-24" aria-label={t('title')}>
        <Gallery
          tabs={[
            { id: 'events', label: t('events'), items: events },
            { id: 'products', label: t('products'), items: products },
          ]}
        />
      </section>
    </>
  )
}
