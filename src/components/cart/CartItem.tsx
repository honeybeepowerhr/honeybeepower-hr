'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import type { CartItem as CartItemType, Locale } from '@/types'
import { formatEur } from '@/lib/prices'

interface CartItemProps {
  item: CartItemType
  locale: Locale
  onRemove: () => void
  onUpdateQuantity: (qty: number) => void
}

export function CartItem({ item, locale, onRemove, onUpdateQuantity }: CartItemProps) {
  const t = useTranslations('cart')
  const name = item.name.replace(/^Honey Bee Power\s+/, '')

  return (
    <li className="row-in grid grid-cols-[4.5rem_1fr] gap-4 bg-surface p-3">
      <div className="relative h-[4.5rem] w-[4.5rem] bg-white">
        {item.imageSrc ? (
          <Image src={item.imageSrc} alt="" fill sizes="72px" className="object-contain p-1" />
        ) : null}
      </div>
      <div className="min-w-0">
        <p className="t-body font-medium leading-tight">{name}</p>
        <p className="t-small">{item.variantLabel}</p>
        <div className="mt-2 flex items-center justify-between gap-3">
          <div className="flex items-center" role="group" aria-label={t('quantityFor', { name })}>
            <button
              type="button"
              onClick={() => onUpdateQuantity(item.quantity - 1)}
              disabled={item.quantity <= 1}
              aria-label={t('decrease', { name })}
              className="grid h-10 w-10 place-items-center text-xl rounded-full shadow-[inset_0_0_0_1.5px_var(--color-line)] transition-transform active:scale-95 disabled:opacity-40"
            >
              −
            </button>
            <span className="min-w-10 text-center t-body font-medium tabular" aria-live="polite">
              <span key={item.quantity} className="number-pop">{item.quantity}</span>
            </span>
            <button
              type="button"
              onClick={() => onUpdateQuantity(item.quantity + 1)}
              aria-label={t('increase', { name })}
              className="grid h-10 w-10 place-items-center text-xl rounded-full shadow-[inset_0_0_0_1.5px_var(--color-line)] transition-transform active:scale-95"
            >
              +
            </button>
          </div>
          <span className="t-body tabular">{item.unitPrice > 0 ? formatEur((item.unitPrice * item.quantity) / 100, locale) : t('priceOnEnquiry')}</span>
        </div>
        <button type="button" onClick={onRemove} className="link mt-2 t-small" aria-label={`${t('remove')}: ${name}`}>
          {t('remove')}
        </button>
      </div>
    </li>
  )
}
