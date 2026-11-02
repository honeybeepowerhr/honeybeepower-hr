import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import type { Locale } from '@/types'

/** „Na stazi”: kratka najava, a fotografije su u galeriji. */
export async function TrackGallery({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'home.track' })
  const tg = await getTranslations({ locale, namespace: 'gallery' })
  const prefix = locale === 'hr' ? '' : `/${locale}`

  return (
    <section aria-labelledby="staza-title" id="na-stazi" className="theme-raspberry frame py-20 md:py-28">
      <div className="grid-12 items-end gap-y-8">
        <h2 id="staza-title" className="t-display col-span-12 text-[length:var(--text-display)] leading-[1.04] lg:col-span-7">
          <span className="block">{t('line1')}</span>
          <span className="block text-[color:var(--color-honey-text)]">{t('line2')}</span>
        </h2>
        <div className="col-span-12 lg:col-span-5">
          <p className="t-lead max-w-[34ch]">{t('sentence')}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={`${prefix}/galerija`} className="btn btn-honey">
              {tg('open')}
              <span className="btn-arrow" aria-hidden="true">→</span>
            </Link>
            <Link href={`${prefix}/dogadaji`} className="btn btn-ghost">
              {t('more')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
