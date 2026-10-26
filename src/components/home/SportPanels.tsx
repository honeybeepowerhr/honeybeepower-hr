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
        <div key={p.key} className="relative h-[92svh] min-h-[32rem] overflow-hidden bg-ground" data-panel>
          <Image
            src={p.image}
            alt={t(`${p.key}.alt`)}
            fill
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: p.position }}
            data-panel-image
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(10_8_6/0.35),rgb(10_8_6/0.1)_40%,rgb(10_8_6/0.75))]" aria-hidden="true" />
          <div className="absolute inset-0">
            <div className="sticky top-1/2 -translate-y-1/2 px-[var(--gutter)] text-center">
              <h2 className="t-display text-ink text-[length:var(--text-mega)] drop-shadow-[0_8px_40px_rgb(0_0_0/0.45)]" data-verb>
                {t(`${p.key}.verb`)}
              </h2>
            </div>
          </div>
          <p className="absolute bottom-[var(--gutter)] left-[var(--gutter)] max-w-[36ch] rounded-[var(--radius-sm)] border border-[color:var(--color-line)] bg-ground/70 px-5 py-3 t-body text-ink backdrop-blur-md">
            {t(`${p.key}.caption`)}
          </p>
        </div>
      ))}
    </section>
  )
}
