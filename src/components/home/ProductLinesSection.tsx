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
    },
  ] as const

  return (
    <section aria-labelledby="proizvodi-title" className="section" id="proizvodi">
      <div className="frame grid-12 items-end gap-y-8">
        <h2 id="proizvodi-title" data-reveal className="t-display col-span-12 text-[length:var(--text-display)] lg:col-span-7">
          {t('title')}
        </h2>
        <div data-reveal className="col-span-12 sm:col-span-8 sm:col-start-5 lg:col-span-5 lg:col-start-8">
          <LoopVideo
            className="aspect-square w-full bg-surface"
            poster="/images/hero/product-showcase-poster.jpg"
            sources={[
              { src: '/videos/product-showcase.webm', type: 'video/webm' },
              { src: '/videos/product-showcase.mp4', type: 'video/mp4' },
            ]}
            label={t('videoLabel')}
            pauseLabel={t('videoPause')}
            playLabel={t('videoPlay')}
          />
        </div>
      </div>

      <ol className="mt-20 space-y-4 md:mt-28">
        {lines.map((line, i) => (
          <li key={line.key} data-reveal>
            <article className="grid-12 frame items-stretch gap-y-6">
              <div className="col-span-12 flex flex-col justify-between gap-8 py-2 md:col-span-6 md:py-8">
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-[length:var(--text-sub)] font-extrabold leading-none tracking-[-0.03em]">
                    {t(`${line.key}.name`)}
                  </h3>
                  <p className="mt-3 t-body">{t(`${line.key}.flavours`)}</p>
                </div>
                <div>
                  <p className="font-[family-name:var(--font-display)] text-[length:var(--text-display)] font-black leading-[0.88] tracking-[-0.04em] tabular">
                    {t(`${line.key}.figure`)}
                  </p>
                  <p className="mt-3 t-body">{t(`${line.key}.figureNote`)}</p>
                </div>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                  <p className="t-lead tabular font-medium">
                    {line.price !== null ? formatEur(line.price, locale) : <span className="todo">[UPIŠI: cijena]</span>}
                    <span className="ml-2 t-body font-normal">{t(`${line.key}.priceNote`)}</span>
                  </p>
                  <Link href={`${prefix}${line.href}`} className="btn btn-ghost min-h-12">
                    {t(`${line.key}.cta`)}
                    <span className="btn-arrow" aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
              <div className={`relative col-span-12 aspect-[4/3] overflow-hidden md:col-span-6 md:aspect-auto md:min-h-[min(36rem,44vw)] ${i % 2 ? 'md:order-first' : ''} ${line.field}`}>
                <Image
                  src={line.image}
                  alt={t(`${line.key}.imageAlt`)}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className={`${line.fit} transition-transform duration-700 ease-[var(--ease-out-expo)] hover:scale-[1.03]`}
                />
              </div>
            </article>
          </li>
        ))}
      </ol>
    </section>
  )
}
