import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import type { Locale } from '@/types'
import { GEL_DECLARATIONS, GEL_WARNING, formatNumber } from '@/lib/declarations'
import { SHARES } from '@/lib/gel-shares'
import { inkOn } from '@/lib/images'

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

const SEGMENT_BG: Record<string, string> = {
  honey: '#ffb800',
  guarana: '#5a1d14',
  salt: '#ffffff',
}

export async function IngredientsSection({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'home.ingredients' })

  return (
    <section aria-labelledby="sastav-title" className="frame section" id="sastav">
      <div className="grid-12 gap-y-8">
        <h2 id="sastav-title" data-reveal className="t-head col-span-12 md:col-span-5">
          {t('title')}
        </h2>
        <p data-reveal className="col-span-12 font-[family-name:var(--font-display)] text-[length:var(--text-lead)] font-semibold leading-[1.3] tracking-[-0.015em] text-muted md:col-span-7">
          {t.rich('statement', {
            honey: (w) => <Thumb word={<b className="font-semibold text-ink">{w}</b>} src="/images/found/med-zlica.jpg" position="50% 40%" />,
            fruit: (w) => <Thumb word={<b className="font-semibold text-ink">{w}</b>} src="/images/found/naranca.jpg" position="40% 45%" after="," />,
            guarana: (w) => <Thumb word={<b className="font-semibold text-ink">{w}</b>} src="/images/found/guarana.jpg" position="60% 72%" />,
            salt: (w) => <Thumb word={<b className="font-semibold text-ink">{w}</b>} src="/images/found/sol.jpg" position="20% 85%" after="." />,
          })}
        </p>
      </div>

      <div className="mt-14 md:mt-20">
        <h3 className="sr-only">{t('barsTitle')}</h3>
        <ul className="grid gap-4 md:grid-cols-3">
          {GEL_DECLARATIONS.map((d) => {
            const shares = SHARES[d.slug]
            return (
              <li
                key={d.slug}
                data-reveal
                data-tilt="4"
                className="card relative flex flex-col p-6 md:p-7"
                style={{ background: d.flavourColor, color: inkOn(d.flavourColor) }}
              >
                <p className="font-[family-name:var(--font-display)] text-[length:var(--text-sub)] font-extrabold leading-[1.1] tracking-[-0.02em]">
                  <span aria-hidden="true" className="mr-3 inline-block h-[0.55em] w-[0.5em] align-[0.02em] bg-current" style={{ clipPath: 'polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%)' }} />
                  {d.flavour[locale]}
                </p>
                <p data-countup className="mt-6 font-[family-name:var(--font-display)] text-[length:var(--text-head)] font-black leading-[1.04] tracking-[-0.025em] tabular">
                  {formatNumber(d.perServing!.carbohydrates, locale)}&nbsp;g
                </p>
                <p className="mt-2 t-small font-medium opacity-85">
                  {t('carbs', { value: formatNumber(d.perServing!.carbohydrates, locale) })}
                </p>
                <div
                  className="mt-7 flex h-5 w-full gap-[3px] overflow-hidden rounded-full border-2 border-[#1d2048] bg-white/60"
                  role="img"
                  aria-label={shares
                    .map((s) => `${t(`part.${s.key}`)} ${formatNumber(s.pct, locale)} %`)
                    .join(', ')}
                >
                  {shares.map((s) => (
                    <span
                      key={s.key}
                      data-bar-segment
                      className="h-full origin-left first:rounded-l-full last:rounded-r-full"
                      style={{
                        width: `${s.pct}%`,
                        minWidth: s.pct < 2 ? '0.5rem' : undefined,
                        background: s.key === 'fruit' ? '#1d2048' : SEGMENT_BG[s.key],
                      }}
                    />
                  ))}
                </div>
                <ul className="mt-5 space-y-1.5 t-small tabular" aria-hidden="true">
                  {shares.map((s) => (
                    <li key={s.key} className="flex items-baseline justify-between gap-4 border-b border-current/25 pb-1.5 last:border-0">
                      <span className="opacity-85">
                        {s.key === 'fruit' ? t('fruitOf', { fruit: d.flavour[locale].toLowerCase() }) : t(`part.${s.key}`)}
                      </span>
                      <span className="font-semibold">{formatNumber(s.pct, locale)} %</span>
                    </li>
                  ))}
                  {!shares.some((s) => s.key === 'salt') && <li className="opacity-85">{t('noSalt')}</li>}
                </ul>
              </li>
            )
          })}
        </ul>
        <p className="mt-10 t-body measure font-medium" data-reveal>
          {t('caffeineNote')} {GEL_WARNING[locale]}
        </p>
      </div>
    </section>
  )
}
