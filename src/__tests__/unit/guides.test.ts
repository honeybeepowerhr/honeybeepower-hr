import { describe, it, expect } from 'vitest'
import { locales } from '@/features/i18n/config'
import { GUIDES, GUIDE_REDIRECTS, getGuides, type GuideBlock } from '@/lib/guides-data'

const textOf = (b: GuideBlock): string => (b.type === 'list' ? b.items.join(' ') : b.text)

describe('Vodiči: osam tekstova bez slika', () => {
  it('ima osam vodiča s jedinstvenim adresama', () => {
    expect(GUIDES).toHaveLength(8)
    expect(new Set(GUIDES.map((g) => g.slug)).size).toBe(8)
  })

  it('nijedan vodič nema sliku', () => {
    for (const l of locales) {
      for (const g of getGuides(l)) {
        expect(g, `${g.slug} ${l}`).not.toHaveProperty('image')
        expect(g, `${g.slug} ${l}`).not.toHaveProperty('imageAlt')
      }
    }
  })

  it('svaki vodič ima sadržaj na svih pet jezika, pitanja i izvore', () => {
    for (const hr of getGuides('hr')) {
      for (const l of locales) {
        const g = getGuides(l).find((x) => x.slug === hr.slug)!
        expect(g.title.length, `${hr.slug} ${l}`).toBeGreaterThan(5)
        expect(g.lead.length, `${hr.slug} ${l}`).toBeGreaterThan(40)
        expect(g.body.length, `${hr.slug} ${l}`).toBe(hr.body.length)
        expect(g.faq.length, `${hr.slug} ${l}`).toBeGreaterThanOrEqual(2)
        expect(g.sources.length, `${hr.slug} ${l}`).toBeGreaterThan(0)
        // Prijevod ne smije ostati hrvatski tekst (osim u imenima proizvoda).
        if (l !== 'hr') expect(g.lead, `${hr.slug} ${l}`).not.toBe(hr.lead)
      }
    }
  })

  it('hrvatski tekst koristi decimalni zarez, a ne točku', () => {
    for (const g of getGuides('hr')) {
      const all = [g.lead, ...g.body.map(textOf), ...g.faq.map((f) => `${f.q} ${f.a}`)].join(' ')
      expect(all, g.slug).not.toMatch(/\d\.\d/)
    }
  })

  it('bez neodobrenih tvrdnji i usporedbi', () => {
    const banned = /sprje[čc]ava gr[čc]e|ne izaziva mu[čc]ninu|idealan glikemijski|bolji od|maltodekstrin|hrvatski brend|dom[aā]ći med/i
    for (const l of locales) {
      for (const g of getGuides(l)) {
        const all = [g.title, g.lead, ...g.body.map(textOf), ...g.faq.map((f) => `${f.q} ${f.a}`)].join(' ')
        expect(all, `${g.slug} ${l}`).not.toMatch(banned)
      }
    }
  })

  it('poveznice vode na postojeće adrese', () => {
    const allowed = new Set(['/proizvodi/energetski-gelovi', '/proizvodi/izotonicki-napitci', '/proizvodi/whey-proteini', '/oporavak-nakon-treninga'])
    for (const g of getGuides('hr')) {
      for (const b of g.body) if (b.type === 'link') expect(allowed.has(b.href), `${g.slug} ${b.href}`).toBe(true)
    }
  })

  it('stare adrese vodiča preusmjeravaju na postojeće vodiče', () => {
    const slugs = new Set(GUIDES.map((g) => g.slug))
    for (const target of Object.values(GUIDE_REDIRECTS)) expect(slugs.has(target), target).toBe(true)
  })
})
