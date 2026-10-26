'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { useCartStore } from '@/features/cart/store'
import type { Locale, ProductSummary, Variant } from '@/types'

interface Props {
  product: ProductSummary
  variant: Variant
  unitPrice: number
  variantLabel: string
  imageSrc: string
  title: string
  priceLabel: string
  color: string
  /** id elementa u uvodu čijim izlaskom iz vidnog polja se traka pojavljuje */
  anchorId: string
}

/** Traka za kupnju: kad gumb u uvodu ode iz vidnog polja, na dnu zaslona ostaje mali „Dodaj u upit”. */
export default function ProductStickyBuy({ product, variant, unitPrice, variantLabel, imageSrc, title, priceLabel, color, anchorId }: Props) {
  const t = useTranslations('productPage')
  const locale = (useLocale() as Locale) || 'hr'
  const addItem = useCartStore((s) => s.addItem)
  const openCart = useCartStore((s) => s.openCart)
  const [show, setShow] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    const el = document.getElementById(anchorId)
    if (!el) return
    const io = new IntersectionObserver(([e]) => setShow(!e.isIntersecting && e.boundingClientRect.top < 0))
    io.observe(el)
    return () => io.disconnect()
  }, [anchorId])

  const add = () => {
    addItem({
      productId: product._id,
      variantId: variant._key,
      name: product.name[locale] ?? product.name.hr,
      slug: product.slug,
      imageSrc,
      variantLabel,
      unitPrice,
      quantity: 1,
    })
    openCart()
  }

  if (!mounted) return null

  return createPortal(
    <div className="sticky-buy" data-show={show ? '1' : '0'} aria-hidden={!show}>
      <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full" style={{ background: color }}>
        <Image src={imageSrc} alt="" fill sizes="48px" className="object-contain p-1" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold leading-tight">{title}</p>
        {priceLabel && <p className="t-small text-muted tabular">{priceLabel}</p>}
      </div>
      <button type="button" onClick={add} tabIndex={show ? 0 : -1} className="btn btn-honey min-h-11 shrink-0 px-5">
        {t('addToCart')}
        <span className="btn-arrow" aria-hidden="true">→</span>
      </button>
    </div>,
    document.body,
  )
}
