import Link from 'next/link'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import type { Locale } from '@/types'
import { getBundle } from '@/lib/bundles-data'

/** Traka s paketima na vrhu popisa proizvoda. */
export async function BundlesStrip({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'bundles' })
  const prefix = locale === 'hr' ? '' : `/${locale}`
  const covers = ['veliki-paket', 'srednji-paket', 'mali-paket'].map((s) => getBundle(s)!)

  return (
    <section aria-labelledby="strip-title" className="frame pb-10">
      <div className="on-ink relative overflow-hidden rounded-[var(--radius)] border-2 border-[color:var(--color-ink)] px-5 py-6 md:px-8">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-6">
          <div className="max-w-[38ch]">
            <h2 id="strip-title" className="font-[family-name:var(--font-display)] text-[length:var(--text-sub)] font-extrabold leading-[1.1] tracking-[-0.015em]">
              {t('title')}
            </h2>
            <p className="mt-2 t-body text-muted">{t('stripLead')}</p>
            <Link href={`${prefix}/paketi`} className="btn btn-honey mt-5">
              {t('stripCta')}
              <span className="btn-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
          <ul className="flex gap-3" aria-hidden="true">
            {covers.map((b) => (
              <li key={b.slug} className="relative h-24 w-24 overflow-hidden rounded-2xl border-2 border-[#fff2cf] sm:h-32 sm:w-32">
                <Image src={b.cover} alt="" fill sizes="128px" className="object-cover" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
