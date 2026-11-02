import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import type { Locale } from '@/types'
import { BUNDLES } from '@/lib/bundles-data'
import { BundleCard } from '@/components/bundles/BundleCard'

/** Gotovi paketi na naslovnici: na mobitelu klizni red, na većim zaslonima mreža. */
export async function BundlesSection({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'bundles' })
  const prefix = locale === 'hr' ? '' : `/${locale}`

  return (
    <section aria-labelledby="paketi-title" className="frame section" id="paketi">
      <div className="grid-12 items-end gap-y-6">
        <h2 id="paketi-title" data-reveal className="t-head col-span-12 lg:col-span-7">
          {t('homeTitle')}
        </h2>
        <div data-reveal className="col-span-12 flex flex-wrap items-center justify-between gap-x-6 gap-y-4 lg:col-span-5">
          <p className="t-body max-w-[34ch] text-muted">{t('homeLead')}</p>
          <Link href={`${prefix}/paketi`} className="btn btn-honey">
            {t('all')}
            <span className="btn-arrow" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      <ul
        data-lenis-prevent-x
        className="-mx-[var(--gutter)] mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--gutter)] pb-8 pt-1 [scrollbar-width:none] sm:mx-0 sm:mt-14 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-2 lg:grid-cols-3"
      >
        {BUNDLES.map((b, i) => (
          <li key={b.slug} data-reveal className="w-[78%] shrink-0 snap-center sm:w-auto">
            <BundleCard bundle={b} locale={locale} priority={i < 2} />
          </li>
        ))}
      </ul>
    </section>
  )
}
