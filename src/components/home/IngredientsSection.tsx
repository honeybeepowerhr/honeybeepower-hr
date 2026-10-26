import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import type { Locale } from '@/types'
import { GEL_DECLARATIONS, GEL_WARNING, formatNumber } from '@/lib/declarations'

/** Riječ i sličica ostaju u istom retku, s interpunkcijom iza sličice. */
function Thumb({ word, src, position = '50% 50%', after = '' }: { word: React.ReactNode; src: string; position?: string; after?: string }) {
  return (
    <span className="whitespace-nowrap">
      {word}
      <span className="inline-thumb" data-thumb aria-hidden="true">
        <Image src={src} alt="" width={160} height={110} sizes="96px" style={{ objectPosition: position }} />
      </span>
      {after}
    </span>
  )
}

/** Udjeli sastojaka s deklaracije, po okusu (zbroj je 100 %). */
const SHARES: Record<string, Array<{ key: 'honey' | 'fruit' | 'guarana' | 'salt'; pct: number }>> = {
  'honey-bee-power-energy-gel-naranca': [
    { key: 'honey', pct: 95.5 },
    { key: 'fruit', pct: 3 },
    { key: 'guarana', pct: 1 },
    { key: 'salt', pct: 0.5 },
  ],
  'honey-bee-power-energy-gel-limun': [
    { key: 'honey', pct: 94.5 },
    { key: 'fruit', pct: 4 },
    { key: 'guarana', pct: 1 },
    { key: 'salt', pct: 0.5 },
  ],
  'honey-bee-power-energy-gel-malina': [
    { key: 'honey', pct: 91 },
    { key: 'fruit', pct: 8 },
    { key: 'guarana', pct: 1 },
  ],
}

const SEGMENT_BG: Record<string, string> = {
  honey: 'var(--color-honey)',
  guarana: '#5a1d14',
  salt: '#ffffff',
}

export async function IngredientsSection({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'home.ingredients' })

  return (
    <section aria-labelledby="sastav-title" className="frame section" id="sastav">
      <div className="grid-12 gap-y-10">
        <h2 id="sastav-title" data-reveal className="t-head col-span-12 md:col-span-5">
          {t('title')}
        </h2>
        <p data-reveal className="col-span-12 font-[family-name:var(--font-display)] text-[length:var(--text-lead)] font-semibold leading-[1.22] tracking-[-0.005em] md:col-span-7">
          {t.rich('statement', {
            honey: (w) => <Thumb word={w} src="/images/found/med-zlica.jpg" position="50% 40%" />,
            fruit: (w) => <Thumb word={w} src="/images/found/naranca.jpg" position="40% 45%" after="," />,
            guarana: (w) => <Thumb word={w} src="/images/found/guarana.jpg" position="60% 72%" />,
            salt: (w) => <Thumb word={w} src="/images/found/sol.jpg" position="20% 85%" after="." />,
          })}
        </p>
      </div>

      <div className="mt-20 md:mt-28">
        <h3 className="sr-only">{t('barsTitle')}</h3>
        <ul className="space-y-10 md:space-y-12">
          {GEL_DECLARATIONS.map((d) => {
            const shares = SHARES[d.slug]
            return (
              <li key={d.slug} data-reveal>
                <div className="flex items-baseline justify-between gap-4">
                  <p className="font-[family-name:var(--font-display)] text-[length:var(--text-sub)] font-extrabold leading-none tracking-[-0.025em]">
                    {d.flavour[locale]}
                  </p>
                  <p className="t-body tabular">
                    {t('carbs', { value: formatNumber(d.perServing!.carbohydrates, locale) })}
                  </p>
                </div>
                <div
                  className="mt-3 flex h-14 w-full overflow-hidden md:h-20"
                  role="img"
                  aria-label={shares
                    .map((s) => `${t(`part.${s.key}`)} ${formatNumber(s.pct, locale)} %`)
                    .join(', ')}
                >
                  {shares.map((s) => (
                    <span
                      key={s.key}
                      data-bar-segment
                      className="h-full origin-left"
                      style={{
                        width: `${s.pct}%`,
                        minWidth: s.pct < 2 ? '0.5rem' : undefined,
                        background: s.key === 'fruit' ? d.flavourColor : SEGMENT_BG[s.key],
                      }}
                    />
                  ))}
                </div>
                <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-1 t-body tabular" aria-hidden="true">
                  {shares.map((s) => (
                    <li key={s.key}>
                      <span className="font-medium">{formatNumber(s.pct, locale)} %</span>{' '}
                      {s.key === 'fruit' ? t('fruitOf', { fruit: d.flavour[locale].toLowerCase() }) : t(`part.${s.key}`)}
                    </li>
                  ))}
                  {!shares.some((s) => s.key === 'salt') && <li>{t('noSalt')}</li>}
                </ul>
              </li>
            )
          })}
        </ul>
        <p className="mt-12 t-body measure font-medium" data-reveal>
          {t('caffeineNote')} {GEL_WARNING[locale]}
        </p>
      </div>
    </section>
  )
}
