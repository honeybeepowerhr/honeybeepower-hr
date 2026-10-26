import { CJENIK_ITEMS } from '@/lib/cjenik-data'
import type { Locale } from '@/types'

/**
 * Cijene na stranici dolaze samo iz službenog cjenika (CJENIK_ITEMS).
 * Proizvod kojeg nema u cjeniku (paketi od 10, paket izotonika sa shakerom)
 * nema cijenu: prikazuje se „Cijena na upit”.
 */
const SLUG_TO_CJENIK: Record<string, { vrsta: string; okus?: string; pakiranje: string }> = {
  'honey-bee-power-energy-gel-limun': { vrsta: 'Energetski gel', okus: 'LIMUN', pakiranje: '40 g' },
  'honey-bee-power-energy-gel-naranca': { vrsta: 'Energetski gel', okus: 'NARANČA', pakiranje: '40 g' },
  'honey-bee-power-energy-gel-malina': { vrsta: 'Energetski gel', okus: 'MALINA', pakiranje: '40 g' },
  'honey-bee-power-izotonicki-napitak-limun': { vrsta: 'Instant izotonik', okus: 'LIMUN', pakiranje: '500 g' },
  'honey-bee-power-izotonicki-napitak-naranca': { vrsta: 'Instant izotonik', okus: 'NARANČA', pakiranje: '500 g' },
  'honey-bee-power-whey-protein-ljesnjak-cokolada-700g': { vrsta: 'Proteinski prah', okus: 'LJEŠNJAK-ČOKOLADA', pakiranje: '700 g' },
  'honey-bee-power-whey-protein-banana-vanilija-700g': { vrsta: 'Proteinski prah', okus: 'BANANA-VANILIJA', pakiranje: '700 g' },
  'honey-bee-power-whey-protein-jagoda-slag-700g': { vrsta: 'Proteinski prah', okus: 'JAGODA-ŠLAG', pakiranje: '700 g' },
}

/** Cijena iz cjenika u eurima ili null ako je proizvod nema. */
export function officialPriceEur(slug: string): number | null {
  const key = SLUG_TO_CJENIK[slug]
  if (!key) return null
  const item = CJENIK_ITEMS.find(
    (i) => i.vrsta === key.vrsta && i.pakiranje === key.pakiranje && (!key.okus || i.okus === key.okus),
  )
  return item ? item.aktualnaCijena : null
}

/** Cijena iz cjenika za drugo pakiranje istog okusa (npr. vrećica 15 g, 33 g). */
export function officialPriceFor(vrsta: string, okus: string, pakiranje: string): number | null {
  const item = CJENIK_ITEMS.find((i) => i.vrsta === vrsta && i.okus === okus && i.pakiranje === pakiranje)
  return item ? item.aktualnaCijena : null
}

export function formatEur(value: number, locale: Locale): string {
  const tag = { hr: 'hr-HR', en: 'en-IE', de: 'de-DE', sl: 'sl-SI', pl: 'pl-PL' }[locale]
  return new Intl.NumberFormat(tag, { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 }).format(value)
}
