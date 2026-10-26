'use client'

import { useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { useCartStore } from '@/features/cart/store'
import type { Locale, ProductSummary, Variant } from '@/types'

interface Props {
  product: ProductSummary
  variant: Variant
  /** Cijena za upit u centima (iz službenog cjenika kad postoji). */
  unitPrice: number
  variantLabel: string
  imageSrc: string
}

/** Dodavanje u upit (košarica se šalje WhatsAppom ili e-mailom). */
export default function ProductAddToCartButton({ product, variant, unitPrice, variantLabel, imageSrc }: Props) {
  const t = useTranslations('productPage')
  const locale = (useLocale() as Locale) || 'hr'
  const addItem = useCartStore((s) => s.addItem)
  const openCart = useCartStore((s) => s.openCart)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const add = () => {
    addItem({
      productId: product._id,
      variantId: variant._key,
      name: product.name[locale] ?? product.name.hr,
      slug: product.slug,
      imageSrc,
      variantLabel,
      unitPrice,
      quantity,
    })
    setAdded(true)
    openCart()
  }

  return (
    <div>
      <div className="flex flex-wrap items-stretch gap-3">
        <div className="flex items-stretch" role="group" aria-label={t('quantity')}>
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity <= 1}
            aria-label={t('decrease')}
            className="grid w-12 place-items-center text-2xl font-medium rounded-full shadow-[inset_0_0_0_1.5px_var(--color-line)] transition-transform active:scale-95 disabled:opacity-40"
          >
            −
          </button>
          <output
            aria-live="polite"
            className="grid min-w-14 place-items-center px-2 font-[family-name:var(--font-display)] text-[length:var(--text-sub)] font-extrabold leading-none tabular"
          >
            <span key={quantity} className="number-pop">{quantity}</span>
          </output>
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.min(999, q + 1))}
            aria-label={t('increase')}
            className="grid w-12 place-items-center text-2xl font-medium rounded-full shadow-[inset_0_0_0_1.5px_var(--color-line)] transition-transform active:scale-95"
          >
            +
          </button>
        </div>
        <button type="button" onClick={add} className="btn btn-honey grow sm:grow-0">
          {t('addToCart')}
          <span className="btn-arrow" aria-hidden="true">→</span>
        </button>
      </div>
      <p className="mt-3 t-small" aria-live="polite">
        {added ? t('added') : ''}
      </p>
    </div>
  )
}
