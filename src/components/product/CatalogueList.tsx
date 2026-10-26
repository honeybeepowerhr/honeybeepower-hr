'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

export interface CatalogueItem {
  slug: string
  href: string
  kind: 'gel' | 'isotonic' | 'whey'
  title: string
  subtitle: string
  figure: string
  figureLabel: string
  price: string | null
  image: string
  field: string
  ink: string
  sports: string[]
}

interface Props {
  items: CatalogueItem[]
  kinds: Array<{ id: CatalogueItem['kind']; label: string }>
  sports: Array<{ slug: string; label: string }>
}

/**
 * Popis proizvoda s filtrom po vrsti i sportu. Odabir se čuva u adresi
 * (?vrsta=…&sport=…). Bez JavaScripta prikazuju se svi proizvodi.
 */
export function CatalogueList({ items, kinds, sports }: Props) {
  const t = useTranslations('productPage')
  const [kind, setKind] = useState<string>('')
  const [sport, setSport] = useState<string>('')

  useEffect(() => {
    const q = new URLSearchParams(window.location.search)
    setKind(q.get('vrsta') ?? '')
    setSport(q.get('sport') ?? '')
  }, [])

  useEffect(() => {
    const q = new URLSearchParams(window.location.search)
    if (kind) q.set('vrsta', kind)
    else q.delete('vrsta')
    if (sport) q.set('sport', sport)
    else q.delete('sport')
    const qs = q.toString()
    window.history.replaceState(null, '', `${window.location.pathname}${qs ? `?${qs}` : ''}`)
  }, [kind, sport])

  const visible = useMemo(
    () => items.filter((i) => (!kind || i.kind === kind) && (!sport || i.sports.includes(sport))),
    [items, kind, sport],
  )

  const chip = (active: boolean) =>
    `inline-flex min-h-11 items-center rounded-full px-5 font-medium transition-colors ${active ? 'bg-honey text-honey-ink' : 'shadow-[inset_0_0_0_1.5px_var(--color-line)] hover:bg-white/10'}`

  return (
    <div>
      <div className="frame grid gap-6 md:grid-cols-2">
        <fieldset>
          <legend className="t-small">{t('filterKind')}</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            <button type="button" aria-pressed={!kind} onClick={() => setKind('')} className={chip(!kind)}>{t('all')}</button>
            {kinds.map((k) => (
              <button key={k.id} type="button" aria-pressed={kind === k.id} onClick={() => setKind(kind === k.id ? '' : k.id)} className={chip(kind === k.id)}>
                {k.label}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="t-small">{t('filterSport')}</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            <button type="button" aria-pressed={!sport} onClick={() => setSport('')} className={chip(!sport)}>{t('allSports')}</button>
            {sports.map((s) => (
              <button key={s.slug} type="button" aria-pressed={sport === s.slug} onClick={() => setSport(sport === s.slug ? '' : s.slug)} className={chip(sport === s.slug)}>
                {s.label}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <p className="frame mt-8 t-small" aria-live="polite">
        {t('count', { count: visible.length })} · {t('countNote')}
      </p>

      {visible.length === 0 ? (
        <div className="frame py-16">
          <p className="t-lead">{t('empty')}</p>
          <button type="button" className="btn btn-ghost mt-6" onClick={() => { setKind(''); setSport('') }}>
            {t('reset')}
          </button>
        </div>
      ) : (
        <ul className="frame mt-6 space-y-3">
          {visible.map((i) => (
            <li key={i.slug} className="row-in">
              <Link
                href={i.href}
                className="group grid-12 min-h-36 items-center gap-y-3 overflow-hidden rounded-[var(--radius)] px-5 py-6 transition-transform duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 md:px-8"
                style={{ background: i.field, color: i.ink }}
              >
                <span className="relative col-span-4 aspect-square sm:col-span-2">
                  <Image src={i.image} alt="" fill sizes="(min-width: 640px) 16vw, 30vw" className="object-contain transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-105" />
                </span>
                <span className="col-span-8 sm:col-span-5">
                  <span className="block font-[family-name:var(--font-display)] text-[length:var(--text-lead)] font-extrabold leading-[1.08]">{i.title}</span>
                  <span className="mt-2 block t-body">{i.subtitle}</span>
                </span>
                <span className="col-span-7 sm:col-span-3">
                  <span className="block font-[family-name:var(--font-display)] text-[length:var(--text-sub)] font-extrabold tabular leading-[1.1]">{i.figure}</span>
                  <span className="mt-1 block t-small">{i.figureLabel}</span>
                </span>
                <span className="col-span-5 text-right t-lead tabular sm:col-span-2">
                  {i.price ?? <span className="t-small text-muted">{t('priceOnEnquiry')}</span>}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
