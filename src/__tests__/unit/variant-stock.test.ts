import { describe, it, expect } from 'vitest'
import { isVariantInStock } from '@/lib/utils'

describe('isVariantInStock', () => {
  it('treats an omitted stock level as in stock (inquiry-only shop)', () => {
    expect(isVariantInStock({})).toBe(true)
  })

  it('treats a positive stock level as in stock', () => {
    expect(isVariantInStock({ stockLevel: 5 })).toBe(true)
  })

  it('treats a zero stock level as out of stock', () => {
    expect(isVariantInStock({ stockLevel: 0 })).toBe(false)
  })
})
