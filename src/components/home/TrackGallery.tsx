import Link from 'next/link'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import type { Locale } from '@/types'

/**
 * „Prints dropped on the headline”, prilagođeno kućnom pravilu da ništa ne
 * prekriva naslov: fotografije s događaja „bačene” su uz naslov, zakrenute.
 */
export async function TrackGallery({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'home.track' })
  const prefix = locale === 'hr' ? '' : `/${locale}`

  return (
    <section aria-labelledby="staza-title" id="na-stazi" className="field-surface overflow-hidden">
      <div className="frame grid min-h-[100svh] grid-cols-1 items-center gap-y-24 py-20 md:grid-cols-[1fr_auto_1fr] md:gap-x-[3vw] md:py-24">
        <figure data-print className="print-card hover:rotate-0 mx-auto w-[64vw] -rotate-6 md:mx-0 md:w-full md:max-w-[22vw] md:justify-self-end md:-translate-y-[12%]">
          <Image
            src="/images/events-web/event-11.jpg"
            alt={t('photo1')}
            width={800}
            height={1067}
            sizes="(min-width: 768px) 22vw, 64vw"
            className="aspect-[3/4] w-full object-cover"
          />
          <figcaption className="mt-2 t-small">{t('caption1')}</figcaption>
        </figure>

        <h2 id="staza-title" className="t-display text-center text-[length:var(--text-mega)] leading-[0.82]">
          <span className="block">{t('line1')}</span>
          <span className="block">{t('line2')}</span>
        </h2>

        <div className="flex flex-col items-center gap-10 md:items-start md:gap-12">
          <figure data-print className="print-card hover:rotate-0 w-[58vw] rotate-[5deg] md:w-full md:max-w-[20vw] md:translate-y-[10%]">
            <Image
              src="/images/events-web/event-20.jpg"
              alt={t('photo2')}
              width={800}
              height={1067}
              sizes="(min-width: 768px) 20vw, 58vw"
              className="aspect-[3/4] w-full object-cover object-top"
            />
            <figcaption className="mt-2 t-small">{t('caption2')}</figcaption>
          </figure>
        </div>
      </div>

      <div className="frame grid-12 gap-y-6 pb-16">
        <p className="col-span-12 t-body measure md:col-span-6">
          {t('sentence')}{' '}
          <Link href={`${prefix}/dogadaji`} className="link font-medium">
            {t('more')}
          </Link>
        </p>
        <ul className="col-span-12 grid grid-cols-3 gap-2 md:col-span-6" aria-label={t('moreLabel')}>
          {[
            { src: '/images/events-web/event-10.jpg', alt: t('photo3') },
            { src: '/images/events-web/event-9.jpg', alt: t('photo4') },
            { src: '/images/events-web/event-16.jpg', alt: t('photo5') },
          ].map((p) => (
            <li key={p.src} className="relative aspect-square overflow-hidden">
              <Image src={p.src} alt={p.alt} fill sizes="(min-width: 768px) 16vw, 32vw" className="object-cover" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
