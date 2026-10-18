import { describe, it, expect } from 'vitest'
import { REAL_PRODUCTS, PRODUCT_CATEGORIES } from '@/lib/products-data'
import { CJENIK_ITEMS } from '@/lib/cjenik-data'
import { locales } from '@/types'

describe('REAL_PRODUCTS — catalogue integrity', () => {
  it('assigns every product to a registered category', () => {
    for (const product of REAL_PRODUCTS) {
      expect(PRODUCT_CATEGORIES[product.category], `${product._id} → ${product.category}`).toBeDefined()
    }
  })

  it('has unique ids, slugs and SKUs', () => {
    const ids = REAL_PRODUCTS.map((p) => p._id)
    const slugs = REAL_PRODUCTS.map((p) => p.slug)
    const skus = REAL_PRODUCTS.flatMap((p) => p.variants.map((v) => v.sku))
    expect(new Set(ids).size).toBe(ids.length)
    expect(new Set(slugs).size).toBe(slugs.length)
    expect(new Set(skus).size).toBe(skus.length)
  })

  it('translates names, descriptions and categories into every locale', () => {
    for (const product of REAL_PRODUCTS) {
      for (const locale of locales) {
        expect(product.name[locale], `${product._id} name.${locale}`).toBeTruthy()
        expect(product.shortDescription[locale], `${product._id} shortDescription.${locale}`).toBeTruthy()
      }
    }
    for (const [slug, names] of Object.entries(PRODUCT_CATEGORIES)) {
      for (const locale of locales) {
        expect(names[locale], `${slug}.${locale}`).toBeTruthy()
      }
    }
  })

  it('gives every variant a positive price', () => {
    for (const product of REAL_PRODUCTS) {
      for (const variant of product.variants) {
        expect(variant.price, `${variant.sku} price`).toBeGreaterThan(0)
      }
    }
  })
})

describe('whey protein 700 g — shop listing matches the official price list', () => {
  const wheyProducts = REAL_PRODUCTS.filter((p) => p.category === 'whey-proteini')
  const cjenik700 = CJENIK_ITEMS.filter(
    (item) => item.vrsta === 'Proteinski prah' && item.pakiranje === '700 g',
  )

  it('lists one product per 700 g flavour in the price list', () => {
    expect(wheyProducts).toHaveLength(cjenik700.length)
  })

  it('uses the same barcode, image and price as the price list', () => {
    for (const item of cjenik700) {
      const product = wheyProducts.find((p) => p.variants[0].gtin === item.barkod)
      expect(product, `barcode ${item.barkod}`).toBeDefined()
      expect(product!.mainImage.asset._ref).toBe(item.slika)
      expect(product!.variants[0].price).toBe(Math.round(item.aktualnaCijena * 100))
    }
  })
})
