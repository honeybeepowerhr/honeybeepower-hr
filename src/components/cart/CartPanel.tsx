'use client'

import { useState } from 'react'
import Link from 'next/link'
import * as Dialog from '@radix-ui/react-dialog'
import { useLocale, useTranslations } from 'next-intl'
import type { InquiryChannel, Locale } from '@/types'
import { useCartStore } from '@/features/cart'
import { formatEur } from '@/lib/prices'
import { CartItem } from './CartItem'
import { QuickInquiryModal } from './QuickInquiryModal'

/** Ladica s upitom: popis proizvoda i slanje WhatsAppom ili e-mailom. */
export function CartPanel() {
  const t = useTranslations('cart')
  const locale = useLocale() as Locale
  const prefix = locale === 'hr' ? '' : `/${locale}`
  const { items, isOpen, closeCart, removeItem, updateQuantity, clearCart } = useCartStore()
  const [channel, setChannel] = useState<InquiryChannel | null>(null)

  const count = items.reduce((s, i) => s + i.quantity, 0)
  const subtotal = items.reduce((s, i) => s + i.unitPrice * i.quantity, 0) / 100

  return (
    <>
      <Dialog.Root open={isOpen} onOpenChange={(open) => !open && closeCart()}>
        <Dialog.Portal>
          <Dialog.Overlay className="overlay" />
          <Dialog.Content className="drawer" aria-describedby={undefined}>
            <div className="frame flex items-center justify-between py-5">
              <Dialog.Title className="t-head text-[length:var(--text-sub)]">
                {t('title')} <span className="tabular">({count})</span>
              </Dialog.Title>
              <Dialog.Close className="link min-h-11 px-1 t-body font-medium">{t('close')}</Dialog.Close>
            </div>

            {items.length === 0 ? (
              <div className="frame flex flex-1 flex-col justify-center gap-6 pb-16">
                <p className="t-lead">{t('empty')}</p>
                <p className="t-body measure">{t('emptySub')}</p>
                <Link href={`${prefix}/proizvodi`} onClick={closeCart} className="btn btn-honey self-start">
                  {t('viewProducts')}
                </Link>
              </div>
            ) : (
              <>
                <ul className="frame flex-1 space-y-2 overflow-y-auto">
                  {items.map((item) => (
                    <CartItem
                      key={`${item.productId}-${item.variantId}`}
                      item={item}
                      locale={locale}
                      onRemove={() => removeItem(item.productId, item.variantId)}
                      onUpdateQuantity={(qty) => updateQuantity(item.productId, item.variantId, qty)}
                    />
                  ))}
                </ul>
                <div className="frame space-y-4 bg-surface py-5">
                  <p className="flex items-baseline justify-between t-body">
                    <span>{t('subtotal')}</span>
                    <span className="font-medium tabular">{formatEur(subtotal, locale)}</span>
                  </p>
                  {items.some((i) => i.unitPrice === 0) && <p className="t-small">{t('partialSubtotal')}</p>}
                  <p className="t-small">{t('inquiryHint')}</p>
                  <div className="grid gap-2">
                    <button type="button" onClick={() => setChannel('whatsapp')} className="btn btn-honey">
                      {t('whatsappBtn')}
                    </button>
                    <button type="button" onClick={() => setChannel('email')} className="btn">
                      {t('emailBtn')}
                    </button>
                  </div>
                </div>
              </>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {channel && (
        <QuickInquiryModal
          open={!!channel}
          channel={channel}
          items={items}
          onClose={() => setChannel(null)}
          onSuccess={() => {
            clearCart()
            closeCart()
          }}
        />
      )}
    </>
  )
}
