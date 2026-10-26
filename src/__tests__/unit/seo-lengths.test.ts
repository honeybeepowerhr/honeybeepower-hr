import { describe, it, expect } from 'vitest'
import { locales } from '@/features/i18n/config'
import { SPORT_PAGES } from '@/lib/sports-data'
import { getGuides } from '@/lib/guides-data'
import { getLegalDoc, type LegalSlug } from '@/lib/legal-data'
import { CATEGORY_COPY } from '@/components/product/CategoryPage'
import { REAL_PRODUCTS } from '@/lib/products-data'
import { officialPriceEur } from '@/lib/prices'

const SUFFIX = ' | Honey Bee Power'

describe('SEO: naslovi do 60 znakova (sa sufiksom), opisi do 155', () => {
  it('stranice sporta', () => {
    for (const p of SPORT_PAGES) {
      for (const l of locales) {
        expect((p.metaTitle[l] + SUFFIX).length, `${p.slug} ${l}`).toBeLessThanOrEqual(60)
        expect(p.metaDescription[l].length, `${p.slug} ${l}`).toBeLessThanOrEqual(155)
      }
    }
  })

  it('kategorije proizvoda', () => {
    for (const [slug, c] of Object.entries(CATEGORY_COPY)) {
      for (const l of locales) {
        expect((c.title[l] + SUFFIX).length, `${slug} ${l}`).toBeLessThanOrEqual(60)
        expect(c.meta[l].length, `${slug} ${l}`).toBeLessThanOrEqual(155)
      }
    }
  })

  it('vodiči imaju naslov koji stane u 60 znakova', () => {
    for (const l of locales) {
      for (const g of getGuides(l)) {
        expect((g.title + SUFFIX).length, `${g.slug} ${l}`).toBeLessThanOrEqual(60)
        expect(g.sources.length, g.slug).toBeGreaterThan(0)
        expect(g.author).toBe('Honey Bee Power')
      }
    }
  })

  it('pravne stranice', () => {
    const slugs: LegalSlug[] = ['uvjeti-koristenja', 'politika-privatnosti', 'dostava-i-placanje', 'pravo-na-povrat']
    for (const s of slugs) {
      for (const l of locales) {
        const { doc } = getLegalDoc(s, l)
        expect((doc.title + SUFFIX).length).toBeLessThanOrEqual(60)
        expect(doc.metaDescription.length, `${s} ${l}`).toBeLessThanOrEqual(155)
      }
    }
  })

  it('cijene u kategorijama i cjeniku se slažu (gel 1,80 €, izotonik 8,00 €, whey 38,00 €)', () => {
    expect(officialPriceEur('honey-bee-power-energy-gel-naranca')).toBe(1.8)
    expect(officialPriceEur('honey-bee-power-izotonicki-napitak-limun')).toBe(8)
    expect(officialPriceEur('honey-bee-power-whey-protein-banana-vanilija-700g')).toBe(38)
    expect(CATEGORY_COPY['energetski-gelovi'].meta.hr).toContain('1,80 €')
    expect(CATEGORY_COPY['izotonicki-napitci'].meta.hr).toContain('8,00 €')
    expect(CATEGORY_COPY['whey-proteini'].meta.hr).toContain('38,00 €')
  })

  it('paketi bez cijene u cjeniku nemaju službenu cijenu', () => {
    for (const p of REAL_PRODUCTS.filter((x) => x.slug.endsWith('paket-10') || x.slug.endsWith('shaker'))) {
      expect(officialPriceEur(p.slug)).toBeNull()
    }
  })
})
