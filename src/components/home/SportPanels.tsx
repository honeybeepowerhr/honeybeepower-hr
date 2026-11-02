import { getTranslations } from 'next-intl/server'
import type { Locale } from '@/types'

const PANELS = [
  { key: 'run', cls: 'field-honey' },
  { key: 'fight', cls: 'theme-dark' },
  { key: 'play', cls: 'theme-raspberry' },
] as const

/**
 * Tri ploče u bojama proizvoda, s jednim glagolom po ploči: bez fotografija,
 * jer je tekst sam dovoljan.
 */
export async function SportPanels({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'home.sport' })

  return (
    <section aria-label={t('label')} id="sport">
      {PANELS.map((p) => (
        <div key={p.key} className={`relative grid min-h-[56svh] place-items-center overflow-hidden border-y-2 border-[color:var(--color-ink)] px-[var(--gutter)] py-16 ${p.cls}`} style={p.cls === 'theme-dark' ? { background: 'var(--color-ground)' } : undefined} data-panel>
          <h2 className="t-display text-center text-[length:var(--text-mega)]" data-verb>
            {t(`${p.key}.verb`)}
          </h2>
          <p className="absolute bottom-[var(--gutter)] left-[var(--gutter)] max-w-[36ch] t-body font-medium">
            {t(`${p.key}.caption`)}
          </p>
        </div>
      ))}
    </section>
  )
}
