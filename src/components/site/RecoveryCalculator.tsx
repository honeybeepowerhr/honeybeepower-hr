'use client'

import { useId, useMemo, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import type { Locale } from '@/types'
import { GEL_APPROVED_CLAIM, GEL_DECLARATIONS, GEL_WARNING, formatNumber } from '@/lib/declarations'
import {
  DEFAULT_WEIGHT_KG,
  GUIDE_WEIGHTS,
  MAX_WEIGHT_KG,
  MIN_WEIGHT_KG,
  clampWeight,
  recoveryPlan,
} from '@/features/recovery/calc'
import { REAL_PRODUCTS } from '@/lib/products-data'
import { officialPriceEur } from '@/lib/prices'
import { useCartStore } from '@/features/cart'

interface Props {
  /** id naslova sekcije, za aria-labelledby */
  headingId: string
  heading: React.ReactNode
  headingLevel?: 'h1' | 'h2'
}

/**
 * Kalkulator oporavka (varijanta B). Unos: tjelesna težina. Prikaz: ukupni
 * ugljikohidrati (4 g/kg), doze unutar prva 4 sata i udio jednog gela.
 * Bez JavaScripta vidi se tablica smjernica ispod obrasca.
 */
export function RecoveryCalculator({ headingId, heading, headingLevel = 'h2' }: Props) {
  const t = useTranslations('calculator')
  const locale = useLocale() as Locale
  const id = useId()
  const [weight, setWeight] = useState(DEFAULT_WEIGHT_KG)
  const [raw, setRaw] = useState(String(DEFAULT_WEIGHT_KG))
  const [flavourSlug, setFlavourSlug] = useState(GEL_DECLARATIONS[0].slug)
  const [added, setAdded] = useState(false)
  const addItem = useCartStore((s) => s.addItem)
  const openCart = useCartStore((s) => s.openCart)

  const gel = GEL_DECLARATIONS.find((d) => d.slug === flavourSlug) ?? GEL_DECLARATIONS[0]
  const gelCarbs = gel.perServing!.carbohydrates
  const plan = useMemo(() => recoveryPlan(weight, gelCarbs), [weight, gelCarbs])
  const n = (v: number) => formatNumber(v, locale, 1)

  const onNumber = (value: string) => {
    setRaw(value)
    const parsed = Number(value.replace(',', '.'))
    if (Number.isFinite(parsed) && parsed >= MIN_WEIGHT_KG && parsed <= MAX_WEIGHT_KG) setWeight(Math.round(parsed))
  }

  const addGel = () => {
    const product = REAL_PRODUCTS.find((p) => p.slug === gel.slug)
    if (!product) return
    const variant = product.variants[0]
    const price = officialPriceEur(gel.slug)
    addItem({
      productId: product._id,
      variantId: variant._key,
      name: product.name[locale] ?? product.name.hr,
      slug: product.slug,
      imageSrc: product.mainImage.asset._ref,
      variantLabel: `${gel.flavour[locale]} · 40 g`,
      unitPrice: price !== null ? Math.round(price * 100) : variant.price,
      quantity: 1,
    })
    setAdded(true)
    openCart()
  }

  const Heading = headingLevel

  return (
    <div className="grid-12 gap-y-12">
      <div className="col-span-12 lg:col-span-5">
        <Heading id={headingId} className="t-display text-[length:var(--text-display)]">
          {heading}
        </Heading>
        <p className="mt-6 t-body measure">{t('intro')}</p>

        <form
          className="mt-10 space-y-8"
          onSubmit={(e) => e.preventDefault()}
          aria-describedby={`${id}-note`}
        >
          <div>
            <label htmlFor={`${id}-kg`} className="block t-body font-medium">
              {t('weightLabel')}
            </label>
            <div className="mt-3 flex items-center gap-4">
              <input
                id={`${id}-kg-range`}
                type="range"
                min={MIN_WEIGHT_KG}
                max={MAX_WEIGHT_KG}
                step={1}
                value={weight}
                onChange={(e) => {
                  setWeight(Number(e.target.value))
                  setRaw(e.target.value)
                }}
                className="range flex-1"
                aria-label={t('weightLabel')}
                aria-valuetext={`${weight} kg`}
              />
              <div className="flex items-baseline gap-1">
                <input
                  id={`${id}-kg`}
                  inputMode="decimal"
                  value={raw}
                  onChange={(e) => onNumber(e.target.value)}
                  onBlur={() => {
                    const v = clampWeight(Number(raw.replace(',', '.')))
                    setWeight(v)
                    setRaw(String(v))
                  }}
                  aria-describedby={`${id}-range-hint`}
                  className="w-[4ch] border-0 border-b-[3px] border-current bg-transparent text-center font-[family-name:var(--font-display)] text-[length:var(--text-sub)] font-extrabold leading-none tabular focus:outline-none focus-visible:border-[color:var(--color-honey)]"
                />
                <span className="t-body">kg</span>
              </div>
            </div>
            <p id={`${id}-range-hint`} className="mt-2 t-small">
              {t('rangeHint', { min: MIN_WEIGHT_KG, max: MAX_WEIGHT_KG })}
            </p>
          </div>

          <fieldset>
            <legend className="t-body font-medium">{t('flavourLabel')}</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {GEL_DECLARATIONS.map((d) => {
                const active = d.slug === flavourSlug
                return (
                  <label
                    key={d.slug}
                    className="relative flex min-h-12 cursor-pointer items-center gap-3 px-4 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-offset-2"
                    style={{
                      background: active ? d.flavourColor : 'transparent',
                      color: active && d.slug.endsWith('malina') ? '#fff' : 'inherit',
                      boxShadow: active ? 'none' : 'inset 0 0 0 2px currentColor',
                    }}
                  >
                    <input
                      type="radio"
                      name={`${id}-flavour`}
                      value={d.slug}
                      checked={active}
                      onChange={() => setFlavourSlug(d.slug)}
                      className="sr-only"
                    />
                    <span>{d.flavour[locale]}</span>
                    <span className="tabular t-small">{n(d.perServing!.carbohydrates)} g</span>
                  </label>
                )
              })}
            </div>
          </fieldset>
        </form>
      </div>

      <div className="col-span-12 max-lg:pt-16 lg:col-span-6 lg:col-start-7" aria-live="polite">
        <p className="font-[family-name:var(--font-display)] text-[length:var(--text-display)] font-black leading-[0.85] tracking-[-0.04em] tabular">
          <span key={plan.totalCarbsG} className="number-pop">{plan.totalCarbsG}</span> g
        </p>
        <p className="mt-4 t-lead">
          <span className="font-medium">{t('resultLead')}</span> {t('resultUnit')}
        </p>

        <h3 className="sr-only">{t('dosesTitle')}</h3>
        <ol className="mt-12 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {plan.doses.map((d) => (
            <li key={d.hour} className="bg-[color:var(--cell-bg,rgba(255,255,255,0.08))] p-4">
              <span className="block font-[family-name:var(--font-display)] text-[length:var(--text-sub)] font-extrabold leading-none tabular">
                <span key={`${d.hour}-${d.carbsG}`} className="number-pop">{n(d.carbsG)}</span> g
              </span>
              <span className="mt-2 block t-small">{d.hour === 0 ? t('doseNow') : t('doseAfter', { hours: d.hour })}</span>
            </li>
          ))}
        </ol>

        <p className="mt-10 t-lead measure">
          {t('gelShare', {
            flavour: gel.flavour[locale].toLowerCase(),
            grams: n(gelCarbs),
            pct: plan.gelSharePct,
          })}{' '}
          {t('restFromFood', { rest: n(plan.restCarbsG) })}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <button type="button" onClick={addGel} className="btn btn-honey">
            {t('addGel', { flavour: gel.flavour[locale].toLowerCase() })}
          </button>
          {added && <span className="t-body">{t('added')}</span>}
        </div>

        <div id={`${id}-note`} className="mt-12 space-y-4 t-small measure">
          <p>
            <strong className="font-medium">{t('claimTitle')}</strong> {GEL_APPROVED_CLAIM[locale]}
          </p>
          <p>{GEL_WARNING[locale]}</p>
          <p className="font-medium">{t('disclaimer')}</p>
        </div>
      </div>

      <div className="col-span-12">
        <details className="group" open>
          <summary className="cursor-pointer t-body font-medium underline decoration-2 underline-offset-4">
            {t('tableTitle')}
          </summary>
          <table className="mt-6 w-full max-w-3xl text-left t-body tabular">
            <caption className="sr-only">{t('tableTitle')}</caption>
            <thead>
              <tr>
                <th scope="col" className="py-2 pr-4 font-medium">{t('colWeight')}</th>
                <th scope="col" className="py-2 pr-4 font-medium">{t('colTotal')}</th>
                <th scope="col" className="py-2 font-medium">{t('colDose')}</th>
              </tr>
            </thead>
            <tbody>
              {GUIDE_WEIGHTS.map((w) => (
                <tr key={w} className="border-t border-current/25">
                  <td className="py-2 pr-4">{w} kg</td>
                  <td className="py-2 pr-4">{w * 4} g</td>
                  <td className="py-2">{t('tableDose', { grams: n(w) })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </details>
      </div>
    </div>
  )
}
