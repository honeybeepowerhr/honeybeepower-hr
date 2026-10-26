import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'
import { REAL_PRODUCTS } from '@/lib/products-data'
import { CJENIK_ITEMS, LEGAL_ENTITY } from '@/lib/cjenik-data'
import { buildProductSchema, buildOrganizationSchema } from '@/lib/seo/schemas'
import { DECLARATIONS, GEL_DECLARATIONS, getDeclaration } from '@/lib/declarations'

const SRC = path.join(process.cwd(), 'src')

function readAll(dir: string, exts: string[]): Array<{ file: string; text: string }> {
  const out: Array<{ file: string; text: string }> = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name === '__tests__') continue
      out.push(...readAll(full, exts))
    } else if (exts.some((e) => entry.name.endsWith(e))) {
      out.push({ file: full, text: fs.readFileSync(full, 'utf8') })
    }
  }
  return out
}

const SOURCES = readAll(SRC, ['.ts', '.tsx', '.json'])

describe('Bez lažnih ocjena', () => {
  it('nijedan proizvod nema averageRating ni reviewCount', () => {
    for (const p of REAL_PRODUCTS) {
      expect(p).not.toHaveProperty('averageRating')
      expect(p).not.toHaveProperty('reviewCount')
    }
  })

  it('Product JSON-LD nema AggregateRating ni Review', () => {
    for (const p of REAL_PRODUCTS) {
      const schema = buildProductSchema(p, 'hr')
      expect(schema).not.toHaveProperty('aggregateRating')
      expect(schema).not.toHaveProperty('review')
    }
  })
})

describe('Pravni podaci', () => {
  it('Organization koristi naziv obrta iz LEGAL_ENTITY', () => {
    const org = buildOrganizationSchema('https://honeybeepowerhr.com')
    expect(org.legalName).toBe(LEGAL_ENTITY.nazivTvrtke)
  })

  it('nema primjera OIB-a i MBS-a, d.o.o. ni osobne Gmail adrese', () => {
    for (const { file, text } of SOURCES) {
      expect(text, file).not.toMatch(/12345678901|030123456/)
      expect(text, file).not.toMatch(/Planet Bio d\.o\.o\./)
      expect(text, file).not.toMatch(/@gmail\.com/)
    }
  })
})

describe('Podrijetlo', () => {
  it('nigdje ne piše hrvatski brend ni domaći med', () => {
    const banned = [
      /hrvatsk\w* brend/i,
      /domać\w* (cvjetn\w* )?med/i,
      /domać\w* pčelinjac/i,
      /croatian brand/i,
      /kroatische marke/i,
      /chorwacka marka/i,
      /hrvaška blagovna/i,
      /domač\w* (cvetlič\w* )?med/i,
      /heimisch\w* (Blüten)?honig/i,
      /local (wild)?flower honey/i,
    ]
    for (const { file, text } of SOURCES) {
      for (const re of banned) expect(text, `${file} ${re}`).not.toMatch(re)
    }
  })
})

describe('Cijene i deklaracije', () => {
  it('pojedinačni gelovi i izotonik 500 g imaju cijenu iz službenog cjenika', () => {
    const gelPrice = Math.round(CJENIK_ITEMS.find((i) => i.vrsta === 'Energetski gel')!.aktualnaCijena * 100)
    const isoPrice = Math.round(CJENIK_ITEMS.find((i) => i.pakiranje === '500 g')!.aktualnaCijena * 100)
    for (const p of REAL_PRODUCTS) {
      if (p.category === 'energetski-gelovi' && !p.slug.endsWith('paket-10')) expect(p.basePrice).toBe(gelPrice)
      if (p.category === 'izotonicki-napitci' && !p.slug.includes('paket')) expect(p.basePrice).toBe(isoPrice)
    }
  })

  it('svaki gel ima deklaraciju sa sastavom i porcijom od 40 g', () => {
    expect(GEL_DECLARATIONS).toHaveLength(3)
    for (const d of GEL_DECLARATIONS) {
      expect(d.ingredients?.hr).toMatch(/ekstrakt sjemenki guarane/)
      expect(d.servingGrams).toBe(40)
      expect(d.perServing?.carbohydrates).toBeGreaterThanOrEqual(29)
      expect(d.perServing?.carbohydrates).toBeLessThanOrEqual(32.8)
    }
    expect(getDeclaration('honey-bee-power-energy-gel-malina')?.ingredients?.hr).not.toMatch(/sol/)
  })

  it('paket od 10 gelova koristi deklaraciju pojedinačnog gela', () => {
    expect(getDeclaration('honey-bee-power-energy-gel-naranca-paket-10')?.slug).toBe('honey-bee-power-energy-gel-naranca')
  })

  it('whey navodi steviju i mlijeko', () => {
    for (const d of DECLARATIONS.filter((x) => x.kind === 'whey')) {
      expect(d.ingredients?.hr).toMatch(/stevija/)
      expect(d.allergens?.hr).toBe('mlijeko')
    }
  })
})
