import { describe, it, expect } from 'vitest'
import { CJENIK_ITEMS } from '@/lib/cjenik-data'

describe('Službeni cjenik (ispravljen po vlasniku)', () => {
  const price = (vrsta: string, pakiranje: string) =>
    [...new Set(CJENIK_ITEMS.filter((i) => i.vrsta === vrsta && i.pakiranje === pakiranje).map((i) => i.aktualnaCijena))]

  it('aktualne cijene: gel 2,00, izotonik 500 g 8,00, izotonik 15 g 1,40, whey 700 g 39,00, šejker 9,00', () => {
    expect(price('Energetski gel', '40 g')).toEqual([2])
    expect(price('Instant izotonik', '500 g')).toEqual([8])
    expect(price('Instant izotonik', '15 g')).toEqual([1.4])
    expect(price('Proteinski prah', '700 g')).toEqual([39])
    expect(price('Shaker', '700 ml')).toEqual([9])
  })

  it('malih proteina od 33 g više nema u ponudi', () => {
    expect(CJENIK_ITEMS.some((i) => i.vrsta === 'Proteinski prah' && i.pakiranje === '33 g')).toBe(false)
    expect(CJENIK_ITEMS).toHaveLength(11)
  })

  it('redni brojevi su uzastopni, a barkodovi jedinstveni', () => {
    expect(CJENIK_ITEMS.map((i) => i.rb)).toEqual(CJENIK_ITEMS.map((_, i) => i + 1))
    expect(new Set(CJENIK_ITEMS.map((i) => i.barkod)).size).toBe(CJENIK_ITEMS.length)
  })
})
