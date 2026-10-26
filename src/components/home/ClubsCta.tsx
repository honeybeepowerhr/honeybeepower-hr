import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import type { Locale } from '@/types'

/** Za klubove i trgovine: velika jantarna ploča, jedini svijetli blok na stranici. */
export async function ClubsCta({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'home.clubs' })
  const prefix = locale === 'hr' ? '' : `/${locale}`

  return (
    <section aria-labelledby="klubovi-title" className="frame section" id="klubovi">
      <div className="on-honey hex-bg relative overflow-hidden rounded-[2rem] px-6 py-14 md:px-14 md:py-20" style={{ backgroundImage: 'var(--hex-pattern)' }}>
        <div className="flex min-h-[26rem] flex-col justify-between gap-14 md:min-h-[32rem]">
          <h2 id="klubovi-title" data-reveal className="t-display max-w-[11ch] text-[length:var(--text-display)] leading-[1.04]">
            {t('title')}
          </h2>
          <div className="grid-12 items-end gap-y-8">
            <p data-reveal className="col-span-12 t-lead font-medium md:col-span-6">
              {t('sentence')}
            </p>
            <div data-reveal className="col-span-12 md:col-span-4 md:col-start-9 md:justify-self-end">
              <Link href={`${prefix}/b2b`} className="btn w-full md:w-auto">
                {t('cta')}
                <span className="btn-arrow" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
