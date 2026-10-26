import { getTranslations } from 'next-intl/server'
import type { Locale } from '@/types'

const KEYS = ['honey', 'fruit', 'guarana', 'salt'] as const

/**
 * Traka sastojaka koja klizi ispod uvoda. Isti popis ponovljen je dvaput
 * da petlja bude neprekinuta; kopija je skrivena od čitača zaslona.
 */
export async function IngredientTicker({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'home.ingredients' })
  const items = [...KEYS, ...KEYS]

  return (
    <div className="overflow-hidden border-y border-[color:var(--color-line)] bg-[color:var(--color-honey)] py-4 text-[color:var(--color-honey-ink)]" data-no-reveal>
      <p className="sr-only">{KEYS.map((k) => t(`part.${k}`)).join(', ')}</p>
      <div className="ticker" aria-hidden="true">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center">
            {items.map((k, i) => (
              <li
                key={`${k}-${i}`}
                className="flex items-center whitespace-nowrap font-[family-name:var(--font-display)] text-[length:var(--text-sub)] font-extrabold leading-none tracking-[-0.04em]"
              >
                {t(`part.${k}`)}
                <span className="mx-[0.7em] inline-block h-[0.55em] w-[0.5em] bg-current opacity-80" style={{ clipPath: 'polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%)' }} />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
