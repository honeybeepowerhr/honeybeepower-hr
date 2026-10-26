import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import type { Locale } from '@/types'

/** „The idea again, inverted”: za klubove i trgovine, obrnute boje. */
export async function ClubsCta({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'home.clubs' })
  const prefix = locale === 'hr' ? '' : `/${locale}`

  return (
    <section aria-labelledby="klubovi-title" className="on-ink" id="klubovi">
      <div className="frame flex min-h-[80svh] flex-col justify-between gap-16 py-16 md:min-h-[90svh] md:py-20">
        <h2 id="klubovi-title" data-reveal className="t-display max-w-[11ch] text-[length:var(--text-display)] leading-[0.9]">
          {t('title')}
        </h2>
        <div className="grid-12 items-end gap-y-8">
          <p data-reveal className="col-span-12 t-lead md:col-span-6">
            {t('sentence')}
          </p>
          <div data-reveal className="col-span-12 md:col-span-4 md:col-start-9 md:justify-self-end">
            <Link href={`${prefix}/b2b`} className="btn btn-honey w-full md:w-auto">
              {t('cta')}
              <span className="btn-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
