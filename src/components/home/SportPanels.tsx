import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import type { Locale } from '@/types'

const PANELS = [
  { key: 'run', image: '/images/events-web/event-12.jpg', position: '50% 30%' },
  { key: 'fight', image: '/images/events-web/event-13.jpg', position: '50% 50%' },
  { key: 'play', image: '/images/events-web/event-24.jpg', position: '50% 45%' },
] as const

/**
 * „One verb at a time”: tri ploče preko cijelog zaslona s vlastitim
 * fotografijama; glagol stoji u sredini dok fotografija prolazi ispod njega.
 */
export async function SportPanels({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'home.sport' })

  return (
    <section aria-label={t('label')} id="sport">
      {PANELS.map((p) => (
        <div key={p.key} className="relative h-[100svh] overflow-hidden bg-ink" data-panel>
          <Image
            src={p.image}
            alt={t(`${p.key}.alt`)}
            fill
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: p.position }}
            data-panel-image
          />
          <div className="absolute inset-0 bg-black/45" aria-hidden="true" />
          <div className="absolute inset-0">
            <div className="sticky top-1/2 -translate-y-1/2 px-[var(--gutter)] text-center">
              <h2 className="t-display text-ground text-[length:var(--text-mega)]" data-verb>
                {t(`${p.key}.verb`)}
              </h2>
            </div>
          </div>
          <p className="absolute bottom-0 left-0 max-w-[36ch] bg-ink/80 px-[var(--gutter)] py-4 t-body text-ground">
            {t(`${p.key}.caption`)}
          </p>
        </div>
      ))}
    </section>
  )
}
