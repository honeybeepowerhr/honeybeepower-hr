import Link from 'next/link'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import type { Locale } from '@/types'
import { GEL_DECLARATIONS } from '@/lib/declarations'
import { HexFieldLoader } from '@/components/home/HexFieldLoader'

/** Okusi na vrećicama, redom kako stoje u uvodu (srednja je glavna). */
const POUCHES = [
  { slug: 'honey-bee-power-energy-gel-malina', src: '/images/products-web/gelmalina-prednja.webp', w: 778, tone: '#d6264a', rotate: '-9deg', shift: '2.5rem' },
  { slug: 'honey-bee-power-energy-gel-naranca', src: '/images/products-web/gelnaranca-prednja.webp', w: 795, tone: '#f5901f', rotate: '0deg', shift: '0rem' },
  { slug: 'honey-bee-power-energy-gel-limun', src: '/images/products-web/gellimun-prednja.webp', w: 748, tone: '#f6d92a', rotate: '9deg', shift: '2.5rem' },
] as const

/**
 * Uvod: „Gel od meda.” velikim slovima, riječ „meda.” ispunjena fotografijom
 * saća; tri vrećice gela svijetle u okusima, a ispod su tri brojke s deklaracije.
 */
export async function HomeHero({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'home.hero' })
  const prefix = locale === 'hr' ? '' : `/${locale}`

  const stats = [
    { value: t('statHoneyValue'), label: t('statHoney') },
    { value: t('statCarbsValue'), label: t('statCarbs') },
    { value: t('statIngredientsValue'), label: t('statIngredients') },
  ]

  return (
    <section aria-labelledby="hero-title" className="hero">
      <HexFieldLoader />
      <div className="frame grid-12 min-h-[calc(100svh-var(--header-h))] items-center gap-y-10 pb-10 pt-8 lg:pb-14">
        <div data-parallax="-0.1" className="col-span-12 lg:col-span-7">
          <h1
            id="hero-title"
            data-hero-title
            className="t-display text-[length:clamp(3.75rem,1.2rem+9.2vw,9.25rem)] leading-[0.88]"
          >
            <span className="rise block">{t('before')}</span>
            <span
              className="rise honeycomb-text block pb-[0.08em]"
              style={{ ['--honeycomb' as string]: 'url(/images/found/sace-tekst.webp)', ['--d' as string]: '90ms' }}
            >
              {t('after')}
            </span>
          </h1>

          <p className="rise mt-8 t-lead max-w-[34ch] text-muted" style={{ ['--d' as string]: '200ms' }}>
            {t('lead')}
          </p>

          <div className="rise mt-8 flex flex-wrap items-center gap-x-6 gap-y-4" style={{ ['--d' as string]: '280ms' }}>
            <Link href={`${prefix}/proizvodi`} className="btn btn-honey">
              {t('cta')}
              <span className="btn-arrow" aria-hidden="true">→</span>
            </Link>
            <Link href="#oporavak" className="btn btn-ghost">
              {t('secondary')}
            </Link>
          </div>
        </div>

        <ul
          aria-label={t('pouchesLabel')}
          data-parallax="0.22"
          className="relative col-span-12 mx-auto flex w-full max-w-[34rem] items-end justify-center lg:col-span-5 lg:max-w-none"
        >
          {POUCHES.map((p, i) => (
            <li
              key={p.slug}
              className={`rise-y ${i === 1 ? 'relative z-10 w-[36%]' : 'relative w-[31%] -mx-[2%]'}`}
              style={{ rotate: p.rotate, translate: `0 ${p.shift}`, ['--d' as string]: `${i === 1 ? 0 : 90}ms` }}
            >
              <span
                aria-hidden="true"
                className="absolute inset-[-22%] -z-10 rounded-full opacity-40"
                style={{ background: `radial-gradient(closest-side, ${p.tone}, transparent)` }}
              />
              <Link href={`${prefix}/proizvodi/${p.slug}`} data-tilt className="pouch-link block">
                <Image
                  src={p.src}
                  alt={`Honey Bee Power, ${GEL_DECLARATIONS.find((d) => d.slug === p.slug)?.flavour[locale] ?? ''}`}
                  width={p.w}
                  height={1600}
                  priority={i === 1}
                  sizes="(min-width: 1024px) 14vw, 30vw"
                  className="pouch h-auto w-full"
                />
              </Link>
            </li>
          ))}
        </ul>

        <dl className="col-span-12 mt-2 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:mt-6">
          {stats.map((s) => (
            <div key={s.label} className="rise rounded-[var(--radius-sm)] border border-[color:var(--color-line)] bg-[color:var(--color-surface)] px-5 py-4" style={{ ['--d' as string]: '360ms' }}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="flex items-baseline gap-3">
                <span className="font-[family-name:var(--font-display)] text-[length:var(--text-sub)] font-extrabold leading-none tracking-[-0.04em] text-[color:var(--color-honey)] tabular">
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
