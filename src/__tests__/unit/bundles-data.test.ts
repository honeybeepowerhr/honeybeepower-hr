import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'
import { locales } from '@/features/i18n/config'
import { officialPriceFor, sellingPriceEur } from '@/lib/prices'
import {
  BUNDLES,
  FLAVOURS,
  cardLines,
  defaultSelection,
  detailLines,
  evenSplit,
  getBundle,
  getOption,
  isSelectionComplete,
  KIND_UNIT,
  selectedCount,
  variantId,
} from '@/lib/bundles-data'
import { getDeclaration } from '@/lib/declarations'

describe('Paketi: podaci iz PRODAJNI_PAKETI.docx', () => {
  it('cijene paketa odgovaraju dokumentu', () => {
    const price = (slug: string, option?: string) => getOption(getBundle(slug)!, option).priceEur
    expect(price('veliki-paket')).toBe(76)
    expect(price('srednji-paket')).toBe(56)
    expect(price('mali-paket')).toBe(25)
    expect(price('gel-paket-30')).toBe(60)
    expect(price('protein-paket')).toBe(48)
    expect(price('paket-iznenadenja', 'gel')).toBe(88)
    expect(price('paket-iznenadenja', 'iso')).toBe(64)
  })

  it('sadržaj paketa: broj komada po stavki', () => {
    const counts = (slug: string, option?: string) =>
      Object.fromEntries(getOption(getBundle(slug)!, option).slots.map((s) => [s.kind, s.count]))
    expect(counts('veliki-paket')).toEqual({ gel: 10, iso: 1, whey: 1, shaker: 1 })
    expect(counts('srednji-paket')).toEqual({ iso: 1, whey: 1, shaker: 1 })
    expect(counts('mali-paket')).toEqual({ iso: 2, shaker: 1 })
    expect(counts('gel-paket-30')).toEqual({ gel: 30 })
    expect(counts('protein-paket')).toEqual({ whey: 1, shaker: 1 })
    expect(counts('paket-iznenadenja', 'gel')).toEqual({ gel: 20, whey: 1, shaker: 1, shirt: 1 })
    expect(counts('paket-iznenadenja', 'iso')).toEqual({ iso: 2, whey: 1, shaker: 1, shirt: 1 })
  })

  it('svaki paket ima jedinstven slug, naslovnu sliku i naziv na svim jezicima', () => {
    expect(new Set(BUNDLES.map((b) => b.slug)).size).toBe(BUNDLES.length)
    for (const b of BUNDLES) {
      expect(fs.existsSync(path.join(process.cwd(), 'public', b.cover)), b.slug).toBe(true)
      for (const l of locales) expect(b.name[l].length, `${b.slug} ${l}`).toBeGreaterThan(2)
    }
  })

  it('okusi se uzimaju iz deklaracija i imaju fotografije', () => {
    for (const kind of ['gel', 'iso', 'whey'] as const) {
      for (const f of FLAVOURS[kind]) {
        expect(getDeclaration(f.slug), f.slug).toBeDefined()
        expect(fs.existsSync(path.join(process.cwd(), 'public', f.image)), f.image).toBe(true)
      }
    }
  })
})

describe('Paketi: odabir okusa', () => {
  it('početni odabir je ispunjen za svaki paket i izvedbu', () => {
    for (const b of BUNDLES) {
      for (const o of b.options) expect(isSelectionComplete(o, defaultSelection(o)), `${b.slug}/${o.id}`).toBe(true)
    }
  })

  it('gelovi se biraju isključivo u kutijama od 10 komada istog okusa', () => {
    expect(KIND_UNIT.gel).toBe(10)
    expect(evenSplit('gel', 10)).toEqual({ limun: 10, naranca: 0, malina: 0 })
    expect(evenSplit('gel', 20)).toEqual({ limun: 10, naranca: 10, malina: 0 })
    expect(evenSplit('gel', 30)).toEqual({ limun: 10, naranca: 10, malina: 10 })
    for (const count of [10, 20, 30]) {
      for (const n of Object.values(evenSplit('gel', count))) expect(n % 10).toBe(0)
    }
  })

  it('15 gelova jednog okusa ni 4 + 3 + 3 nisu valjani odabir', () => {
    const o = getOption(getBundle('gel-paket-30')!)
    const valid = (gel: Record<string, number>) => isSelectionComplete(o, { gel })
    expect(valid({ limun: 10, naranca: 10, malina: 10 })).toBe(true)
    expect(valid({ limun: 30, naranca: 0, malina: 0 })).toBe(true)
    expect(valid({ limun: 20, naranca: 0, malina: 10 })).toBe(true)
    expect(valid({ limun: 15, naranca: 15, malina: 0 })).toBe(false)
    expect(valid({ limun: 12, naranca: 9, malina: 9 })).toBe(false)
    const v10 = getOption(getBundle('veliki-paket')!)
    expect(isSelectionComplete(v10, { ...defaultSelection(v10), gel: { limun: 4, naranca: 3, malina: 3 } })).toBe(false)
    expect(isSelectionComplete(v10, { ...defaultSelection(v10), gel: { limun: 0, naranca: 10, malina: 0 } })).toBe(true)
  })

  it('izotonik i whey ostaju pojedinačni komadi', () => {
    expect(KIND_UNIT.iso).toBe(1)
    expect(KIND_UNIT.whey).toBe(1)
    expect(evenSplit('iso', 2)).toEqual({ limun: 1, naranca: 1 })
    expect(evenSplit('whey', 1)).toEqual({ cokolada: 1, banana: 0, jagoda: 0 })
  })

  it('nepotpun odabir se prepoznaje', () => {
    const o = getOption(getBundle('veliki-paket')!)
    const sel = defaultSelection(o)
    sel.gel = { limun: 0, naranca: 0, malina: 0 }
    expect(selectedCount(sel, 'gel')).toBe(0)
    expect(isSelectionComplete(o, sel)).toBe(false)
  })

  it('šifra varijante razlikuje okuse i izvedbe, a isti odabir daje istu šifru', () => {
    const o = getOption(getBundle('veliki-paket')!)
    const a = defaultSelection(o)
    const b = defaultSelection(o)
    expect(variantId(o, a)).toBe(variantId(o, b))
    b.iso = { limun: 0, naranca: 1 }
    expect(variantId(o, a)).not.toBe(variantId(o, b))
    const s = getBundle('paket-iznenadenja')!
    expect(variantId(s.options[0], defaultSelection(s.options[0]))).not.toBe(variantId(s.options[1], defaultSelection(s.options[1])))
  })

  it('opis za upit navodi okuse i količine na svim jezicima', () => {
    const o = getOption(getBundle('veliki-paket')!)
    const lines = detailLines(o, defaultSelection(o), 'hr')
    expect(lines[0]).toBe('Energetski gel 40 g × 10: Limun × 10')
    expect(lines).toContain('Šejker 700 ml')
    for (const l of locales) expect(detailLines(o, defaultSelection(o), l).length).toBe(o.slots.length)
  })

  it('kartica paketa iznenađenja spaja izvedbe s „ili”', () => {
    const lines = cardLines(getBundle('paket-iznenadenja')!, 'hr')
    expect(lines[0]).toBe('Energetski gel 40 g × 20 ili Izotonik 500 g × 2')
    expect(lines).toContain('Majica')
  })
})

describe('Paketi: poštenje cijena', () => {
  it('nijedan tekst paketa ne obećava uštedu ni popust', () => {
    const dir = path.join(process.cwd(), 'src/messages')
    for (const l of locales) {
      const text = JSON.stringify(JSON.parse(fs.readFileSync(path.join(dir, `${l}.json`), 'utf8')).bundles)
      expect(text, l).not.toMatch(/u[šs]ted|popust|discount|save|spar|rabatt|prihrani|oszcz/i)
    }
  })

  it('cijena svakog paketa jednaka je zbroju cijena stavki iz službenog cjenika (majica je uključena)', () => {
    const unit = {
      gel: officialPriceFor('Energetski gel', 'LIMUN', '40 g')!,
      iso: officialPriceFor('Instant izotonik', 'LIMUN', '500 g')!,
      whey: officialPriceFor('Proteinski prah', 'LJEŠNJAK-ČOKOLADA', '700 g')!,
      shaker: officialPriceFor('Shaker', '-', '700 ml')!,
      shirt: 0,
    }
    expect(unit).toEqual({ gel: 2, iso: 8, whey: 39, shaker: 9, shirt: 0 })
    for (const b of BUNDLES) {
      for (const o of b.options) {
        const sum = o.slots.reduce((s, slot) => s + unit[slot.kind] * slot.count, 0)
        expect(o.priceEur, `${b.slug}/${o.id}`).toBe(sum)
      }
    }
  })

  it('paket od 10 gelova košta deset puta cijena gela iz cjenika', () => {
    expect(sellingPriceEur('honey-bee-power-energy-gel-naranca-paket-10')).toBe(10 * officialPriceFor('Energetski gel', 'NARANČA', '40 g')!)
  })
})
