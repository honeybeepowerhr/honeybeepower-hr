import type { Locale } from '@/types'
import { getDeclaration, type L10n } from '@/lib/declarations'
import { IMAGE_RATIOS } from '@/lib/image-ratios'

/**
 * Prodajni paketi (izvor: PRODAJNI_PAKETI.docx vlasnika). Cijena je cijena paketa;
 * zbrojevi pojedinačnih stavki iz službenog cjenika nisu dio ovih podataka.
 * Okus se bira po stavki: gel i izotonik mogu biti „sortirani” (više okusa u istom paketu).
 * Prijevodi čekaju provjeru izvornih govornika.
 */

export type FlavourKind = 'gel' | 'iso' | 'whey'
export type BundleKind = FlavourKind | 'shaker' | 'shirt'

export interface Flavour {
  /** kratka oznaka u odabiru i u šifri varijante */
  id: string
  /** slug proizvoda iz kojeg se uzimaju naziv okusa i boja (deklaracija) */
  slug: string
  image: string
  /** omjer širine i visine fotografije */
  ratio: number
  /** vrsta fotografije: izrezan proizvod strši iz ćelije, fotografija s bijelom pozadinom stoji unutar nje */
  photo: 'cutout' | 'white'
}

const img = (file: string) => `/images/products-web/${file}.webp`
const ratio = (file: string) => IMAGE_RATIOS[img(file)] ?? 1

export const FLAVOURS: Record<FlavourKind, Flavour[]> = {
  gel: [
    { id: 'limun', slug: 'honey-bee-power-energy-gel-limun', image: img('gellimun-prednja'), ratio: ratio('gellimun-prednja'), photo: 'cutout' },
    { id: 'naranca', slug: 'honey-bee-power-energy-gel-naranca', image: img('gelnaranca-prednja'), ratio: ratio('gelnaranca-prednja'), photo: 'cutout' },
    { id: 'malina', slug: 'honey-bee-power-energy-gel-malina', image: img('gelmalina-prednja'), ratio: ratio('gelmalina-prednja'), photo: 'cutout' },
  ],
  iso: [
    { id: 'limun', slug: 'honey-bee-power-izotonicki-napitak-limun', image: img('isolimun-prednja'), ratio: ratio('isolimun-prednja'), photo: 'cutout' },
    { id: 'naranca', slug: 'honey-bee-power-izotonicki-napitak-naranca', image: img('isonaranca-prednja'), ratio: ratio('isonaranca-prednja'), photo: 'cutout' },
  ],
  whey: [
    { id: 'cokolada', slug: 'honey-bee-power-whey-protein-ljesnjak-cokolada-700g', image: img('proteincokolada700g'), ratio: 1, photo: 'white' },
    { id: 'banana', slug: 'honey-bee-power-whey-protein-banana-vanilija-700g', image: img('proteinbanana700g'), ratio: 1, photo: 'white' },
    { id: 'jagoda', slug: 'honey-bee-power-whey-protein-jagoda-slag-700g', image: img('proteinjagodaslag700g'), ratio: 1, photo: 'white' },
  ],
}

export const SHAKER_IMAGE = img('shaker')

/**
 * Najmanja jedinica koja se bira po okusu. Gelovi dolaze isključivo u kutijama od 10 komada istog okusa
 * (pa je moguće 10, 20 ili 30 jednog okusa, ali ne 15 ni 4 + 3 + 3); izotonik i whey su pojedinačni komadi.
 */
export const KIND_UNIT: Record<FlavourKind, number> = { gel: 10, iso: 1, whey: 1 }

/** Naziv stavke u paketu (kratko, s veličinom pakiranja s deklaracije i cjenika). */
export const KIND_LABEL: Record<BundleKind, L10n> = {
  gel: { hr: 'Energetski gel 40 g', en: 'Energy gel 40 g', de: 'Energiegel 40 g', sl: 'Energijski gel 40 g', pl: 'Żel energetyczny 40 g' },
  iso: { hr: 'Izotonik 500 g', en: 'Isotonic drink 500 g', de: 'Isotonisches Getränk 500 g', sl: 'Izotonik 500 g', pl: 'Izotonik 500 g' },
  whey: { hr: 'Whey protein 700 g', en: 'Whey protein 700 g', de: 'Whey Protein 700 g', sl: 'Whey protein 700 g', pl: 'Białko whey 700 g' },
  shaker: { hr: 'Šejker 700 ml', en: 'Shaker 700 ml', de: 'Shaker 700 ml', sl: 'Šejker 700 ml', pl: 'Shaker 700 ml' },
  shirt: { hr: 'Majica', en: 'T-shirt', de: 'T-Shirt', sl: 'Majica', pl: 'Koszulka' },
}

export interface BundleSlot {
  kind: BundleKind
  /** broj komada; gel i izotonik se dijele po okusima, ostalo je uvijek 1 */
  count: number
}

export interface BundleOption {
  id: string
  /** cijena paketa u eurima (vlasnikov popis paketa) */
  priceEur: number
  slots: BundleSlot[]
  label?: L10n
}

export interface Bundle {
  slug: string
  name: L10n
  /** naslovna slika (public/images/bundles, redizajn/og/make_bundle_covers.mjs) */
  cover: string
  options: BundleOption[]
}

export const BUNDLES: Bundle[] = [
  {
    slug: 'mali-paket',
    name: { hr: 'Mali paket', en: 'Small pack', de: 'Kleines Paket', sl: 'Majhen paket', pl: 'Mały zestaw' },
    cover: '/images/bundles/mali-paket.webp',
    options: [{ id: 'standard', priceEur: 25, slots: [{ kind: 'iso', count: 2 }, { kind: 'shaker', count: 1 }] }],
  },
  {
    slug: 'protein-paket',
    name: { hr: 'Protein paket', en: 'Protein pack', de: 'Protein-Paket', sl: 'Protein paket', pl: 'Zestaw proteinowy' },
    cover: '/images/bundles/protein-paket.webp',
    options: [{ id: 'standard', priceEur: 48, slots: [{ kind: 'whey', count: 1 }, { kind: 'shaker', count: 1 }] }],
  },
  {
    slug: 'srednji-paket',
    name: { hr: 'Srednji paket', en: 'Medium pack', de: 'Mittleres Paket', sl: 'Srednji paket', pl: 'Średni zestaw' },
    cover: '/images/bundles/srednji-paket.webp',
    options: [{ id: 'standard', priceEur: 56, slots: [{ kind: 'iso', count: 1 }, { kind: 'whey', count: 1 }, { kind: 'shaker', count: 1 }] }],
  },
  {
    slug: 'gel-paket-30',
    name: { hr: 'Gel paket 30', en: 'Gel pack 30', de: 'Gel-Paket 30', sl: 'Gel paket 30', pl: 'Zestaw żeli 30' },
    cover: '/images/bundles/gel-paket-30.webp',
    options: [{ id: 'standard', priceEur: 60, slots: [{ kind: 'gel', count: 30 }] }],
  },
  {
    slug: 'veliki-paket',
    name: { hr: 'Veliki paket', en: 'Large pack', de: 'Großes Paket', sl: 'Veliki paket', pl: 'Duży zestaw' },
    cover: '/images/bundles/veliki-paket.webp',
    options: [
      {
        id: 'standard',
        priceEur: 76,
        slots: [{ kind: 'gel', count: 10 }, { kind: 'iso', count: 1 }, { kind: 'whey', count: 1 }, { kind: 'shaker', count: 1 }],
      },
    ],
  },
  {
    slug: 'paket-iznenadenja',
    name: { hr: 'Paket iznenađenja', en: 'Surprise pack', de: 'Überraschungspaket', sl: 'Paket presenečenja', pl: 'Zestaw niespodzianka' },
    cover: '/images/bundles/paket-iznenadenja.webp',
    options: [
      {
        id: 'gel',
        priceEur: 88,
        label: { hr: 'S 20 gelova', en: 'With 20 gels', de: 'Mit 20 Gels', sl: 'Z 20 geli', pl: 'Z 20 żelami' },
        slots: [{ kind: 'gel', count: 20 }, { kind: 'whey', count: 1 }, { kind: 'shaker', count: 1 }, { kind: 'shirt', count: 1 }],
      },
      {
        id: 'iso',
        priceEur: 64,
        label: { hr: 'S 2 izotonika', en: 'With 2 isotonic drinks', de: 'Mit 2 isotonischen Getränken', sl: 'Z 2 izotonikoma', pl: 'Z 2 izotonikami' },
        slots: [{ kind: 'iso', count: 2 }, { kind: 'whey', count: 1 }, { kind: 'shaker', count: 1 }, { kind: 'shirt', count: 1 }],
      },
    ],
  },
]

export function getBundle(slug: string): Bundle | undefined {
  return BUNDLES.find((b) => b.slug === slug)
}

export function getOption(bundle: Bundle, optionId?: string): BundleOption {
  return bundle.options.find((o) => o.id === optionId) ?? bundle.options[0]
}

export function lowestPriceEur(bundle: Bundle): number {
  return Math.min(...bundle.options.map((o) => o.priceEur))
}

export function hasKind(option: BundleOption, kind: BundleKind): boolean {
  return option.slots.some((s) => s.kind === kind)
}

// ---------------------------------------------------------------------------
// Odabir okusa
// ---------------------------------------------------------------------------

/** Po vrsti: id okusa → broj komada. Zbroj za svaku vrstu mora biti jednak broju komada u paketu. */
export type Selection = Partial<Record<FlavourKind, Record<string, number>>>

export function flavourKinds(option: BundleOption): FlavourKind[] {
  return option.slots.filter((s): s is BundleSlot & { kind: FlavourKind } => s.kind in FLAVOURS).map((s) => s.kind)
}

export function slotCount(option: BundleOption, kind: BundleKind): number {
  return option.slots.find((s) => s.kind === kind)?.count ?? 0
}

/** Početni odabir: više komada se dijeli ravnomjerno po okusima (asortiman), jedan komad je prvi okus. */
export function defaultSelection(option: BundleOption): Selection {
  const out: Selection = {}
  for (const kind of flavourKinds(option)) {
    const count = slotCount(option, kind)
    out[kind] = evenSplit(kind, count)
  }
  return out
}

/** Ravnomjerna raspodjela po okusima u jedinicama (kutije gelova, komadi izotonika); jedna jedinica ide prvom okusu. */
export function evenSplit(kind: FlavourKind, count: number): Record<string, number> {
  const flavours = FLAVOURS[kind]
  const unit = KIND_UNIT[kind]
  const units = Math.round(count / unit)
  const out: Record<string, number> = {}
  flavours.forEach((f, i) => {
    out[f.id] = units === 1 ? (i === 0 ? unit : 0) : (Math.floor(units / flavours.length) + (i < units % flavours.length ? 1 : 0)) * unit
  })
  return out
}

export function selectedCount(selection: Selection, kind: FlavourKind): number {
  return Object.values(selection[kind] ?? {}).reduce((a, b) => a + b, 0)
}

/** Ispunjen je kad za svaku vrstu zbroj odabranih komada odgovara paketu, a svaki okus je u cijelim jedinicama (kutije gelova). */
export function isSelectionComplete(option: BundleOption, selection: Selection): boolean {
  return flavourKinds(option).every(
    (kind) =>
      selectedCount(selection, kind) === slotCount(option, kind) &&
      Object.values(selection[kind] ?? {}).every((n) => Number.isInteger(n) && n >= 0 && n % KIND_UNIT[kind] === 0),
  )
}

/** Šifra varijante u košarici: isti paket s istim okusima spaja se u jedan redak. */
export function variantId(option: BundleOption, selection: Selection): string {
  const parts = flavourKinds(option).map((kind) => {
    const picked = FLAVOURS[kind]
      .filter((f) => (selection[kind]?.[f.id] ?? 0) > 0)
      .map((f) => `${f.id}:${selection[kind]![f.id]}`)
      .join(',')
    return `${kind}=${picked}`
  })
  return [option.id, ...parts].join('|')
}

export function flavourName(kind: FlavourKind, flavourId: string, locale: Locale): string {
  const f = FLAVOURS[kind].find((x) => x.id === flavourId)
  const d = f ? getDeclaration(f.slug) : undefined
  return d?.flavour[locale] ?? flavourId
}

export function flavourColor(kind: FlavourKind, flavourId: string): string {
  const f = FLAVOURS[kind].find((x) => x.id === flavourId)
  const d = f ? getDeclaration(f.slug) : undefined
  return d?.flavourColor ?? '#ffb800'
}

/** Retci opisa paketa za košaricu i upit, npr. „Energetski gel 40 g × 10: Limun × 4, Naranča × 3, Malina × 3”. */
export function detailLines(option: BundleOption, selection: Selection, locale: Locale): string[] {
  return option.slots.map((slot) => {
    const label = KIND_LABEL[slot.kind][locale]
    if (slot.kind === 'shaker' || slot.kind === 'shirt') return label
    const kind = slot.kind
    const picked = FLAVOURS[kind].filter((f) => (selection[kind]?.[f.id] ?? 0) > 0)
    const flavours = picked
      .map((f) => (slot.count === 1 ? flavourName(kind, f.id, locale) : `${flavourName(kind, f.id, locale)} × ${selection[kind]![f.id]}`))
      .join(', ')
    return slot.count === 1 ? `${label}: ${flavours}` : `${label} × ${slot.count}: ${flavours}`
  })
}

/** Sadržaj paketa bez okusa, za popis i opis stranice. */
export function contentsLine(option: BundleOption, locale: Locale): string {
  return option.slots.map((s) => (s.count > 1 ? `${KIND_LABEL[s.kind][locale]} × ${s.count}` : KIND_LABEL[s.kind][locale])).join(' · ')
}

const OR: Record<Locale, string> = { hr: 'ili', en: 'or', de: 'oder', sl: 'ali', pl: 'lub' }

const slotLine = (s: BundleSlot, locale: Locale) => (s.count > 1 ? `${KIND_LABEL[s.kind][locale]} × ${s.count}` : KIND_LABEL[s.kind][locale])

/**
 * Redci sadržaja za karticu: što je zajedničko svim izvedbama, a ono što se razlikuje spojeno s „ili”
 * (npr. „Energetski gel 40 g × 20 ili Izotonik 500 g × 2”).
 */
export function cardLines(bundle: Bundle, locale: Locale): string[] {
  if (bundle.options.length === 1) return bundle.options[0].slots.map((s) => slotLine(s, locale))
  const key = (s: BundleSlot) => `${s.kind}:${s.count}`
  const common = bundle.options[0].slots.filter((s) => bundle.options.every((o) => o.slots.some((x) => key(x) === key(s))))
  const variable = bundle.options.map((o) => o.slots.filter((s) => !common.some((c) => key(c) === key(s))).map((s) => slotLine(s, locale)).join(', '))
  return [variable.join(` ${OR[locale]} `), ...common.map((s) => slotLine(s, locale))]
}
