import Link from 'next/link'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import type { Locale } from '@/types'
import { getDeclaration } from '@/lib/declarations'
import { HexFieldLoader } from '@/components/home/HexFieldLoader'

type CellKind = 'cutout' | 'photo'

interface Cell {
  slug: string
  type: 'gel' | 'iso' | 'whey'
  /** položaj u jedinicama širine ćelije (košnica od sedam ćelija) */
  x: number
  y: number
  src: string
  w: number
  h: number
  kind: CellKind
  field: string
  /** nagib proizvoda u ćeliji */
  rot: string
  /** koliko proizvod strši izvan šesterokuta (postotak visine ćelije) */
  size: number
  /** dubina za paralaksu miša */
  depth: number
}

/**
 * Sedam ćelija: gel naranča u sredini, oko njega ostali gelovi, izotonici i whey.
 * Proizvodi s prozirnom pozadinom (gelovi, izotonici) strše preko ruba šesterokuta;
 * whey ima fotografiju s bijelom pozadinom pa stoji unutar ćelije.
 */
const CELLS: Cell[] = [
  { slug: 'honey-bee-power-energy-gel-naranca', type: 'gel', x: 1, y: 0.866, src: '/images/products-web/gelnaranca-prednja.webp', w: 795, h: 1600, kind: 'cutout', field: 'field-orange', rot: '-3deg', size: 112, depth: 1.5 },
  { slug: 'honey-bee-power-energy-gel-malina', type: 'gel', x: 0, y: 0.866, src: '/images/products-web/gelmalina-prednja.webp', w: 778, h: 1600, kind: 'cutout', field: 'field-raspberry', rot: '-11deg', size: 100, depth: 0.9 },
  { slug: 'honey-bee-power-energy-gel-limun', type: 'gel', x: 2, y: 0.866, src: '/images/products-web/gellimun-prednja.webp', w: 748, h: 1600, kind: 'cutout', field: 'field-lemon', rot: '9deg', size: 100, depth: 0.9 },
  { slug: 'honey-bee-power-izotonicki-napitak-naranca', type: 'iso', x: 0.5, y: 0, src: '/images/products-web/isonaranca-prednja.webp', w: 1004, h: 1600, kind: 'cutout', field: 'field-orange', rot: '-5deg', size: 96, depth: 0.6 },
  { slug: 'honey-bee-power-whey-protein-ljesnjak-cokolada-700g', type: 'whey', x: 1.5, y: 0, src: '/images/products-web/proteincokolada700g.webp', w: 1080, h: 1080, kind: 'photo', field: 'bg-white', rot: '0deg', size: 100, depth: 0.5 },
  { slug: 'honey-bee-power-izotonicki-napitak-limun', type: 'iso', x: 0.5, y: 1.732, src: '/images/products-web/isolimun-prednja.webp', w: 1024, h: 1600, kind: 'cutout', field: 'field-lemon', rot: '5deg', size: 96, depth: 0.7 },
  { slug: 'honey-bee-power-whey-protein-jagoda-slag-700g', type: 'whey', x: 1.5, y: 1.732, src: '/images/products-web/proteinjagodaslag700g.webp', w: 1080, h: 1080, kind: 'photo', field: 'bg-white', rot: '0deg', size: 100, depth: 0.8 },
]

/**
 * Uvod: cijeli asortiman kao košnica. Ćelije lebde, prate miš i svaka vodi na svoj proizvod.
 */
export async function HomeHero({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'home.hero' })
  const tp = await getTranslations({ locale, namespace: 'home.products' })
  const tn = await getTranslations({ locale, namespace: 'nav' })
  const prefix = locale === 'hr' ? '' : `/${locale}`

  const stats = [
    { value: t('statHoneyValue'), label: t('statHoney') },
    { value: t('statCarbsValue'), label: t('statCarbs') },
    { value: t('statIngredientsValue'), label: t('statIngredients') },
  ]

  return (
    <section aria-labelledby="hero-title" className="hero">
      <HexFieldLoader />
      <div className="frame grid-12 min-h-[calc(100svh-var(--header-h))] content-center items-center gap-y-8 pb-10 pt-6 lg:gap-y-6 lg:pb-14">
        <h1
          id="hero-title"
          data-hero-title
          className="t-display col-span-12 text-[length:clamp(2.75rem,0.9rem+7vw,6.6rem)] leading-[1.04] text-center lg:col-span-7 lg:row-start-1 lg:self-end lg:text-left"
        >
          <span className="rise block">{t('before')}</span>
          <span
            className="rise honeycomb-text block pb-[0.08em]"
            style={{ ['--honeycomb' as string]: 'url(/images/found/sace-tekst.webp)', ['--d' as string]: '90ms' }}
          >
            {t('after')}
          </span>
        </h1>

        <div className="order-3 col-span-12 flex flex-col items-center text-center lg:order-none lg:col-span-7 lg:row-start-2 lg:items-start lg:self-start lg:text-left">
          <p className="rise t-lead max-w-[32ch] text-ink/80" style={{ ['--d' as string]: '200ms' }}>
            {t('lead')}
          </p>
          <div className="rise mt-7 flex flex-wrap items-center justify-center gap-x-4 gap-y-4 lg:justify-start" style={{ ['--d' as string]: '280ms' }}>
            <Link href={`${prefix}/proizvodi`} className="btn btn-honey">
              {t('cta')}
              <span className="btn-arrow" aria-hidden="true">→</span>
            </Link>
            <Link href="#oporavak" className="btn btn-ghost">
              {t('secondary')}
            </Link>
          </div>
        </div>

        <div className="order-2 col-span-12 lg:order-none lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1">
          <ul aria-label={tn('products')} className="hive" data-hive>
            {CELLS.map((c, n) => {
              const d = getDeclaration(c.slug)
              const flavour = d?.flavour[locale] ?? ''
              const typeLabel = tp(`${c.type}.cta`)
              const href = `${prefix}/proizvodi/${c.slug}`
              return (
                <li key={c.slug} className="hive-cell" style={{ ['--x' as string]: c.x, ['--y' as string]: c.y, ['--i' as string]: n }}>
                  <div data-depth={c.depth} className="hive-depth">
                    <Link href={href} aria-label={`${typeLabel}: ${flavour}`} className="hive-link group">
                      <span className={`hive-hex ${c.field}`} aria-hidden="true">
                        {c.kind === 'photo' && (
                          <Image src={c.src} alt="" fill sizes="(min-width: 1024px) 14vw, 30vw" className="object-contain p-[6%]" priority={n < 3} />
                        )}
                      </span>
                      {c.kind === 'cutout' && (
                        <Image
                          src={c.src}
                          alt=""
                          width={c.w}
                          height={c.h}
                          sizes="(min-width: 1024px) 12vw, 28vw"
                          priority={n < 3}
                          className="hive-img"
                          style={{ ['--r' as string]: c.rot, ['--s' as string]: `${c.size}%` }}
                        />
                      )}
                      <span className="hive-label" aria-hidden="true">
                        <span className="opacity-70">{typeLabel}</span> {flavour}
                      </span>
                    </Link>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>

        <dl className="order-4 col-span-12 mt-2 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:mt-8">
          {stats.map((s) => (
            <div key={s.label} className="rise rounded-[var(--radius-sm)] border border-[color:var(--color-line)] bg-[color:var(--color-surface)] px-5 py-4" style={{ ['--d' as string]: '360ms' }}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="flex items-baseline gap-3">
                <span className="font-[family-name:var(--font-display)] text-[length:var(--text-sub)] font-extrabold leading-[1.1] tracking-[-0.02em] text-[color:var(--color-honey)] tabular">
                  {s.value}
                </span>
                <span className="t-small text-muted" aria-hidden="true">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
