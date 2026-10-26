import Link from 'next/link'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import type { Locale } from '@/types'
import { formatEur, officialPriceEur } from '@/lib/prices'
import { LoopVideo } from '@/components/site/LoopVideo'

export async function ProductLinesSection({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'home.products' })
  const prefix = locale === 'hr' ? '' : `/${locale}`

  const lines = [
    {
      key: 'gel',
      href: '/proizvodi/energetski-gelovi',
      image: '/images/hero/product-showcase-poster.jpg',
      imageW: 1200,
      imageH: 1200,
      field: 'field-orange',
      price: officialPriceEur('honey-bee-power-energy-gel-naranca'),
      fit: 'object-cover',
      span: 'md:col-span-4',
    },
    {
      key: 'iso',
      href: '/proizvodi/izotonicki-napitci',
      image: '/images/products-web/isolimun-prednja.webp',
      imageW: 1024,
      imageH: 1600,
      field: 'field-lemon',
      price: officialPriceEur('honey-bee-power-izotonicki-napitak-limun'),
      fit: 'object-contain p-[8%]',
      span: 'md:col-span-4',
    },
    {
      key: 'whey',
      href: '/proizvodi/whey-proteini',
      image: '/images/products-web/proteincokolada700g.webp',
      imageW: 1080,
      imageH: 1080,
      field: 'bg-white',
      price: officialPriceEur('honey-bee-power-whey-protein-ljesnjak-cokolada-700g'),
      fit: 'object-contain',
      span: 'md:col-span-4',
    },
  ] as const

  return (
    <section aria-labelledby="proizvodi-title" className="frame section" id="proizvodi">
      <div className="grid-12 items-end gap-y-8">
        <h2 id="proizvodi-title" data-reveal className="t-head col-span-12 lg:col-span-8">
          {t('title')}
        </h2>
      </div>

      <ol className="mt-12 grid gap-4 md:mt-16 md:grid-cols-12">
        {lines.map((line) => (
          <li key={line.key} data-reveal data-tilt="4" className={`card group flex flex-col ${line.span}`}>
            <article className="flex h-full flex-col">
              <div className={`relative aspect-square w-full overflow-hidden ${line.field}`}>
                {line.key === 'gel' ? (
                  <LoopVideo
                    className="absolute! inset-0 h-full w-full"
                    poster="/images/hero/product-showcase-poster.jpg"
                    sources={[
                      { src: '/videos/product-showcase.webm', type: 'video/webm' },
                      { src: '/videos/product-showcase.mp4', type: 'video/mp4' },
                    ]}
                    label={t('videoLabel')}
                    pauseLabel={t('videoPause')}
                    playLabel={t('videoPlay')}
                  />
                ) : (
                  <Image
                    src={line.image}
                    alt={t(`${line.key}.imageAlt`)}
                    fill
                    sizes="(min-width: 768px) 40vw, 100vw"
                    className={`${line.fit} transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]`}
                  />
                )}
              </div>
              <div className="flex flex-col gap-6 p-6 md:p-8">
                <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-[length:var(--text-sub)] font-extrabold leading-none tracking-[-0.04em]">
                      {t(`${line.key}.name`)}
                    </h3>
                    <p className="mt-2 t-body text-muted">{t(`${line.key}.flavours`)}</p>
                  </div>
                  <p data-countup className="font-[family-name:var(--font-display)] text-[length:var(--text-head)] font-black leading-[0.9] tracking-[-0.05em] text-[color:var(--color-honey)] tabular">
                    {t(`${line.key}.figure`)}
                  </p>
                </div>
                <p className="t-small text-muted -mt-3">{t(`${line.key}.figureNote`)}</p>
                <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-[color:var(--color-line)] pt-5">
                  <p className="t-lead tabular font-semibold">
                    {line.price !== null ? formatEur(line.price, locale) : <span className="todo">[UPIŠI: cijena]</span>}
                    <span className="ml-2 t-body font-normal text-muted">{t(`${line.key}.priceNote`)}</span>
                  </p>
                  <Link href={`${prefix}${line.href}`} className="btn btn-ghost min-h-12">
                    {t(`${line.key}.cta`)}
                    <span className="btn-arrow" aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </section>
  )
}
