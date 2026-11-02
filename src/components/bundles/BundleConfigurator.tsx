'use client'

import { useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import type { Locale } from '@/types'
import { useCartStore } from '@/features/cart/store'
import { GEL_CAFFEINE_SOURCE, GEL_WARNING } from '@/lib/declarations'
import { formatEur } from '@/lib/prices'
import { inkOn } from '@/lib/images'
import {
  FLAVOURS,
  KIND_LABEL,
  defaultSelection,
  detailLines,
  evenSplit,
  flavourColor,
  flavourName,
  getBundle,
  getOption,
  hasKind,
  isSelectionComplete,
  selectedCount,
  variantId,
  type BundleOption,
  type FlavourKind,
  type Selection,
} from '@/lib/bundles-data'
import { BundleVisual } from '@/components/bundles/BundleVisual'

/**
 * Odabir okusa i dodavanje paketa u upit. Gel i izotonik mogu biti sortirani (više okusa),
 * zbroj mora odgovarati broju komada u paketu; ostalo je jedan odabir.
 */
export default function BundleConfigurator({ slug }: { slug: string }) {
  const bundle = getBundle(slug)!
  const t = useTranslations('bundles')
  const tp = useTranslations('productPage')
  const locale = useLocale() as Locale
  const addItem = useCartStore((s) => s.addItem)
  const openCart = useCartStore((s) => s.openCart)

  const [optionId, setOptionId] = useState(bundle.options[0].id)
  const option = getOption(bundle, optionId)
  const [selection, setSelection] = useState<Selection>(() => defaultSelection(bundle.options[0]))
  const [packs, setPacks] = useState(1)
  const [added, setAdded] = useState(false)

  const complete = isSelectionComplete(option, selection)
  const price = option.priceEur

  const switchOption = (next: BundleOption) => {
    const fresh = defaultSelection(next)
    // odabir se zadržava za vrste koje su i u novoj izvedbi s istim brojem komada
    for (const slot of next.slots) {
      const old = option.slots.find((s) => s.kind === slot.kind)
      if (old && old.count === slot.count && (slot.kind === 'whey' || slot.kind === 'iso' || slot.kind === 'gel') && selection[slot.kind]) {
        fresh[slot.kind] = selection[slot.kind]
      }
    }
    setOptionId(next.id)
    setSelection(fresh)
    setAdded(false)
  }

  const setKind = (kind: FlavourKind, next: Record<string, number>) => {
    setSelection((s) => ({ ...s, [kind]: next }))
    setAdded(false)
  }

  const step = (kind: FlavourKind, id: string, delta: number, count: number) => {
    const cur = selection[kind] ?? {}
    const total = selectedCount(selection, kind)
    const n = cur[id] ?? 0
    if (delta > 0 && total >= count) return
    if (delta < 0 && n <= 0) return
    setKind(kind, { ...cur, [id]: n + delta })
  }

  const add = () => {
    if (!complete) return
    addItem({
      productId: `bundle-${bundle.slug}`,
      variantId: variantId(option, selection),
      name: bundle.name[locale],
      slug: bundle.slug,
      imageSrc: bundle.cover,
      variantLabel: option.label?.[locale] ?? '',
      details: detailLines(option, selection, locale),
      unitPrice: Math.round(option.priceEur * 100),
      quantity: packs,
    })
    setAdded(true)
    openCart()
  }

  return (
    <div className="grid-12 gap-y-10">
      <div className="col-span-12 lg:col-span-6">
        <div className="relative isolate overflow-hidden rounded-[var(--radius)] border-2 border-[color:var(--color-ink)] bg-[color:var(--color-honey)] px-4 py-10 shadow-[0_6px_0_var(--color-ink)] lg:sticky lg:top-24 lg:py-14">
          <div aria-hidden="true" className="hex-bg absolute inset-0 -z-10 opacity-80" />
          <BundleVisual option={option} selection={selection} />
        </div>
      </div>

      <div className="col-span-12 space-y-6 lg:col-span-6">
        {bundle.options.length > 1 && (
          <fieldset>
            <legend className="eyebrow">{t('optionTitle')}</legend>
            <div role="radiogroup" aria-label={t('optionTitle')} className="mt-3 grid gap-3 sm:grid-cols-2">
              {bundle.options.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  role="radio"
                  aria-checked={o.id === optionId}
                  onClick={() => switchOption(o)}
                  className="flavour-chip justify-between rounded-[var(--radius-sm)]! py-3"
                >
                  <span>{o.label?.[locale]}</span>
                  <span className="tabular">{formatEur(o.priceEur, locale)}</span>
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {option.slots.map((slot) => {
          const label = KIND_LABEL[slot.kind][locale]
          if (slot.kind === 'shaker' || slot.kind === 'shirt') {
            return (
              <section key={slot.kind} className="card flex items-center justify-between gap-4 px-5 py-4">
                <h3 className="font-[family-name:var(--font-display)] text-[length:var(--text-lead)] font-extrabold leading-[1.1]">{label}</h3>
                <span className="eyebrow">{t('included')}</span>
              </section>
            )
          }
          const kind = slot.kind as FlavourKind
          const total = selectedCount(selection, kind)
          const left = slot.count - total
          return (
            <section key={slot.kind} className="card px-5 py-5" aria-labelledby={`slot-${slot.kind}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 id={`slot-${slot.kind}`} className="font-[family-name:var(--font-display)] text-[length:var(--text-lead)] font-extrabold leading-[1.1]">
                  {label}
                  {slot.count > 1 && <span className="ml-2 text-[color:var(--color-honey-text)]">× {slot.count}</span>}
                </h3>
                {slot.count > 1 && (
                  <p className={`t-small font-semibold tabular ${left === 0 ? 'text-muted' : 'text-[color:var(--color-alert)]'}`} aria-live="polite">
                    {left === 0 ? t('complete') : left > 0 ? t('remaining', { count: left }) : ''} · {t('chosen', { count: total, total: slot.count })}
                  </p>
                )}
              </div>

              {slot.count === 1 ? (
                <div role="radiogroup" aria-labelledby={`slot-${slot.kind}`} className="mt-4 flex flex-wrap gap-2.5">
                  {FLAVOURS[kind].map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      role="radio"
                      aria-checked={(selection[kind]?.[f.id] ?? 0) === 1}
                      onClick={() => setKind(kind, Object.fromEntries(FLAVOURS[kind].map((x) => [x.id, x.id === f.id ? 1 : 0])))}
                      className="flavour-chip"
                      style={{ ['--chip' as string]: flavourColor(kind, f.id), ['--chip-ink' as string]: inkOn(flavourColor(kind, f.id)) }}
                    >
                      <span className="flavour-dot" aria-hidden="true" />
                      {flavourName(kind, f.id, locale)}
                    </button>
                  ))}
                </div>
              ) : (
                <>
                  <ul className="mt-4 divide-y divide-[color:var(--color-line)]">
                    {FLAVOURS[kind].map((f) => {
                      const n = selection[kind]?.[f.id] ?? 0
                      const name = flavourName(kind, f.id, locale)
                      return (
                        <li key={f.id} className="flex items-center justify-between gap-3 py-2.5">
                          <span className="flex items-center gap-3 font-semibold">
                            <span className="flavour-dot" style={{ ['--chip' as string]: flavourColor(kind, f.id) }} aria-hidden="true" />
                            {name}
                          </span>
                          <span className="flex items-center gap-2" role="group" aria-label={name}>
                            <button type="button" className="step-btn" onClick={() => step(kind, f.id, -1, slot.count)} disabled={n <= 0} aria-label={t('decrease', { name })}>
                              −
                            </button>
                            <output className="min-w-[2.5ch] text-center font-[family-name:var(--font-display)] text-[length:var(--text-lead)] font-extrabold tabular" aria-live="polite">
                              <span key={n} className="number-pop">{n}</span>
                            </output>
                            <button type="button" className="step-btn" onClick={() => step(kind, f.id, 1, slot.count)} disabled={total >= slot.count} aria-label={t('increase', { name })}>
                              +
                            </button>
                          </span>
                        </li>
                      )
                    })}
                  </ul>
                  <button type="button" className="link mt-3 t-small font-semibold" title={t('mixTitle')} onClick={() => setKind(kind, evenSplit(kind, slot.count))}>
                    {t('mix')}
                  </button>
                </>
              )}
            </section>
          )
        })}

        <section className="card px-5 py-5" aria-label={t('price')}>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">{t('price')}</p>
              <p className="mt-1 font-[family-name:var(--font-display)] text-[length:var(--text-head)] font-black leading-[1.05] tabular">
                {formatEur(price * packs, locale)}
              </p>
              {packs > 1 && <p className="t-small text-muted tabular">{packs} × {formatEur(price, locale)}</p>}
            </div>
            <div className="flex items-center gap-2" role="group" aria-label={t('packQty')}>
              <button type="button" className="step-btn" onClick={() => setPacks((n) => Math.max(1, n - 1))} disabled={packs <= 1} aria-label={tp('decrease')}>
                −
              </button>
              <output className="min-w-[2.5ch] text-center font-[family-name:var(--font-display)] text-[length:var(--text-lead)] font-extrabold tabular" aria-live="polite">
                <span key={packs} className="number-pop">{packs}</span>
              </output>
              <button type="button" className="step-btn" onClick={() => setPacks((n) => Math.min(99, n + 1))} aria-label={tp('increase')}>
                +
              </button>
            </div>
          </div>

          <button type="button" onClick={add} disabled={!complete} className="btn btn-honey mt-5 w-full">
            {t('addToCart')}
            <span className="btn-arrow" aria-hidden="true">→</span>
          </button>
          <p className="mt-3 t-small" aria-live="polite">
            {added ? t('added') : !complete ? t('incomplete') : ''}
          </p>
          <p className="mt-2 t-small text-muted">{tp('orderNote')}</p>
        </section>

        {(hasKind(option, 'whey') || hasKind(option, 'gel')) && (
          <div className="space-y-2 t-small text-muted">
            {hasKind(option, 'whey') && <p>{t('wheyNote')}</p>}
            {hasKind(option, 'gel') && (
              <p>
                {GEL_CAFFEINE_SOURCE[locale]} {GEL_WARNING[locale]}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
