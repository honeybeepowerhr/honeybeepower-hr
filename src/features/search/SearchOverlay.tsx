'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import * as Dialog from '@radix-ui/react-dialog'
import { useLocale, useTranslations } from 'next-intl'
import { REAL_PRODUCTS } from '@/lib/products-data'
import { getGuides } from '@/lib/guides-data'
import { SPORTS } from '@/lib/product-content'
import type { Locale } from '@/types'

interface SearchOverlayProps {
  isOpen: boolean
  onClose: () => void
}

/** Pretraga proizvoda, vodiča, sportova i stranica (bez poslužitelja). */
export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('')
  const t = useTranslations('search')
  const tNav = useTranslations('nav')
  const locale = (useLocale() || 'hr') as Locale
  const prefix = locale === 'hr' ? '' : `/${locale}`

  const items = useMemo(
    () => [
      ...REAL_PRODUCTS.map((p) => ({ id: p._id, title: (p.name[locale] || p.name.hr).replace(/^Honey Bee Power\s+/, ''), category: t('product'), url: `${prefix}/proizvodi/${p.slug}` })),
      ...getGuides(locale).map((g) => ({ id: g.slug, title: g.title, category: t('guide'), url: `${prefix}/vodici/${g.slug}` })),
      ...SPORTS.map((s) => ({ id: s.slug, title: s.name[locale], category: tNav('sport'), url: `${prefix}/sport/${s.slug}` })),
      { id: 'recovery', title: tNav('recovery'), category: t('page'), url: `${prefix}/oporavak-nakon-treninga` },
      { id: 'b2b', title: tNav('clubs'), category: t('page'), url: `${prefix}/b2b` },
      { id: 'cjenik', title: tNav('priceList'), category: t('page'), url: `${prefix}/cjenik` },
      { id: 'faq', title: tNav('faq'), category: t('page'), url: `${prefix}/faq` },
      { id: 'kontakt', title: tNav('contact'), category: t('page'), url: `${prefix}/kontakt` },
    ],
    [locale, prefix, t, tNav],
  )

  const q = query.toLowerCase().trim()
  const results = q ? items.filter((i) => i.title.toLowerCase().includes(q)) : []

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => { if (!open) { setQuery(''); onClose() } }}>
      <Dialog.Portal>
        <Dialog.Overlay className="overlay" />
        <Dialog.Content className="dialog dialog-top" aria-describedby={undefined}>
          <Dialog.Title className="sr-only">{t('ariaLabel')}</Dialog.Title>
          <div className="flex items-center gap-3">
            <label htmlFor="site-search" className="sr-only">{t('placeholder')}</label>
            <input
              id="site-search"
              type="search"
              autoFocus
              placeholder={t('placeholder')}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="field-input"
            />
            <Dialog.Close className="link min-h-11 px-1 t-body font-medium">{t('closeLabel')}</Dialog.Close>
          </div>
          <div className="mt-6 max-h-[56svh] overflow-y-auto" aria-live="polite">
            {!q ? (
              <p className="t-small">{t('hint')}</p>
            ) : results.length === 0 ? (
              <p className="t-body">{t('noResults', { query })}</p>
            ) : (
              <ul className="space-y-1">
                {results.map((r) => (
                  <li key={r.id}>
                    <Link href={r.url} onClick={onClose} className="group flex items-baseline justify-between gap-4 bg-surface px-4 py-3 transition-colors hover:bg-ink hover:text-ground">
                      <span className="t-body font-medium">{r.title}</span>
                      <span className="t-small">{r.category}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
