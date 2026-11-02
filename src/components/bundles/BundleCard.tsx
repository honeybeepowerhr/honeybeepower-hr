import Link from 'next/link'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import type { Locale } from '@/types'
import { cardLines, lowestPriceEur, type Bundle } from '@/lib/bundles-data'
import { formatEur } from '@/lib/prices'

/** Kartica paketa: naslovna slika, sadržaj, cijena paketa i poziv na odabir okusa. */
export async function BundleCard({ bundle, locale, priority = false }: { bundle: Bundle; locale: Locale; priority?: boolean }) {
  const t = await getTranslations({ locale, namespace: 'bundles' })
  const prefix = locale === 'hr' ? '' : `/${locale}`
  const name = bundle.name[locale]
  const multi = bundle.options.length > 1

  return (
    <article className="card pack-card" data-tilt="4">
      <div className="pack-cover">
        <Image
          src={bundle.cover}
          alt={t('coverAlt', { name })}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 80vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h3 className="font-[family-name:var(--font-display)] text-[length:var(--text-sub)] font-extrabold leading-[1.1] tracking-[-0.015em]">
          <Link href={`${prefix}/paketi/${bundle.slug}`} className="after:absolute after:inset-0 after:z-10">
            {name}
          </Link>
        </h3>
        <ul className="mt-3 space-y-1 t-small text-muted">
          {cardLines(bundle, locale).map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <div className="mt-auto flex items-end justify-between gap-3 pt-6">
          <p className="font-[family-name:var(--font-display)] text-[length:var(--text-lead)] font-black leading-[1.1] tabular">
            {multi && <span className="mr-1.5 t-small font-medium text-muted">{t('from')}</span>}
            {formatEur(lowestPriceEur(bundle), locale)}
          </p>
          <span className="btn btn-ghost min-h-11 px-4 t-small" aria-hidden="true">
            {t('cta')}
            <span className="btn-arrow">→</span>
          </span>
        </div>
      </div>
    </article>
  )
}
