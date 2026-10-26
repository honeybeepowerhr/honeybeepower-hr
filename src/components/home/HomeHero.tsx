import Link from 'next/link'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import type { Locale } from '@/types'

/**
 * Uvod: rečenica preko cijele širine, fotografija meda stoji u njoj
 * (smjer „Sentence with a photo strip”).
 */
export async function HomeHero({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'home.hero' })
  const prefix = locale === 'hr' ? '' : `/${locale}`

  return (
    <section aria-labelledby="hero-title" className="frame relative flex min-h-[calc(100svh-var(--header-h))] flex-col justify-center pb-10 pt-6">
      <h1
        id="hero-title"
        data-hero-title
        className="t-display hero-sentence"
      >
        <span data-hero-word>{t('before')}</span>
        <span
          data-hero-strip
          aria-hidden="true"
          className="sentence-strip"
        >
          <Image
            src="/images/found/sace.jpg"
            alt=""
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover object-[50%_45%]"
          />
        </span>
        <span data-hero-word>{t('after')}</span>
      </h1>

      <div className="mt-10 grid-12 items-end gap-y-8 md:mt-14">
        <p data-hero-lead className="col-span-12 t-lead measure md:col-span-7">
          {t('lead')}
        </p>
        <div data-hero-actions className="col-span-12 flex flex-wrap items-center gap-x-8 gap-y-4 md:col-span-5 md:justify-end">
          <Link href={`${prefix}/proizvodi`} className="btn btn-honey">
            {t('cta')}
            <span className="btn-arrow" aria-hidden="true">→</span>
          </Link>
          <Link href="#oporavak" className="link t-body font-medium">
            {t('secondary')}
          </Link>
        </div>
      </div>
    </section>
  )
}
