import Link from 'next/link'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import type { Locale } from '@/types'

/** „Na stazi”: mozaik pravih fotografija s događaja uz naslov. */
export async function TrackGallery({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'home.track' })
  const prefix = locale === 'hr' ? '' : `/${locale}`

  const photos = [
    { src: '/images/events-web/event-11.jpg', alt: t('photo1'), caption: t('caption1'), cls: 'col-span-6 row-span-2 md:col-span-4 md:row-span-2', pos: '50% 40%', ratio: 'aspect-[3/4] md:aspect-auto' },
    { src: '/images/events-web/event-20.jpg', alt: t('photo2'), caption: t('caption2'), cls: 'col-span-6 md:col-span-4', pos: '50% 20%', ratio: 'aspect-[4/3]' },
    { src: '/images/events-web/event-10.jpg', alt: t('photo3'), caption: '', cls: 'col-span-6 md:col-span-4', pos: '50% 50%', ratio: 'aspect-[4/3]' },
    { src: '/images/events-web/event-9.jpg', alt: t('photo4'), caption: '', cls: 'col-span-6 md:col-span-4', pos: '50% 50%', ratio: 'aspect-[4/3]' },
    { src: '/images/events-web/event-16.jpg', alt: t('photo5'), caption: '', cls: 'col-span-6 md:col-span-4', pos: '50% 50%', ratio: 'aspect-[4/3]' },
  ] as const

  return (
    <section aria-labelledby="staza-title" id="na-stazi" className="frame section">
      <div className="grid-12 items-end gap-y-6">
        <h2 id="staza-title" className="t-display col-span-12 text-[length:var(--text-display)] leading-[1.04] md:col-span-7">
          <span className="block">{t('line1')}</span>
          <span className="block text-[color:var(--color-honey)]">{t('line2')}</span>
        </h2>
        <p className="col-span-12 t-body measure text-muted md:col-span-5">
          {t('sentence')}{' '}
          <Link href={`${prefix}/dogadaji`} className="link font-medium text-ink">
            {t('more')}
          </Link>
        </p>
      </div>

      <ul className="mt-12 grid grid-cols-12 gap-3 md:mt-16 md:gap-4" aria-label={t('moreLabel')}>
        {photos.map((p, i) => (
          <li key={p.src} data-print data-parallax={i % 2 ? '0.14' : '-0.06'} className={`photo ${p.cls}`}>
            <figure className={`relative h-full ${p.ratio}`}>
              <Image src={p.src} alt={p.alt} fill sizes="(min-width: 768px) 33vw, 50vw" className="object-cover" style={{ objectPosition: p.pos }} />
              {p.caption && (
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ground/85 to-transparent px-4 pb-3 pt-10 t-small text-ink">
                  {p.caption}
                </figcaption>
              )}
            </figure>
          </li>
        ))}
      </ul>
    </section>
  )
}
