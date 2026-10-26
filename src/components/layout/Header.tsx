'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { Search } from 'lucide-react'
import LanguageSwitcher from './LanguageSwitcher'
import type { Locale } from '@/types'
import { useCartStore } from '@/features/cart'
import { SearchOverlay } from '@/features/search/SearchOverlay'

const NAV = [
  { key: 'products', href: '/proizvodi' },
  { key: 'recovery', href: '/oporavak-nakon-treninga' },
  { key: 'guides', href: '/vodici' },
  { key: 'priceList', href: '/cjenik' },
  { key: 'clubs', href: '/b2b' },
] as const

const MORE = [
  { key: 'about', href: '/o-nama' },
  { key: 'events', href: '/dogadaji' },
  { key: 'whereToBuy', href: '/gdje-kupiti' },
  { key: 'faq', href: '/faq' },
  { key: 'contact', href: '/kontakt' },
] as const

export default function Header() {
  const t = useTranslations('nav')
  const locale = useLocale() as Locale
  const prefix = locale === 'hr' ? '' : `/${locale}`
  const pathname = usePathname()

  const items = useCartStore((s) => s.items)
  const openCart = useCartStore((s) => s.openCart)
  const count = items.reduce((sum, i) => sum + i.quantity, 0)

  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [bump, setBump] = useState(false)
  const lastCount = useRef(count)
  const menuButton = useRef<HTMLButtonElement>(null)

  // Košarica se čuva u localStorage; učitaj je nakon hidracije.
  useEffect(() => {
    void useCartStore.persist.rehydrate()
  }, [])

  // Zaglavlje je uvijek vidljivo; nakon prvog skrola postaje kompaktnije i dobiva podlogu.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Kratki odziv na broju kad se nešto doda u upit.
  useEffect(() => {
    if (count > lastCount.current) {
      setBump(true)
      const id = window.setTimeout(() => setBump(false), 320)
      lastCount.current = count
      return () => window.clearTimeout(id)
    }
    lastCount.current = count
  }, [count])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!menuOpen) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        menuButton.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  const isActive = (href: string) => {
    const full = `${prefix}${href}`
    return pathname === full || pathname.startsWith(`${full}/`)
  }

  return (
    <>
      <header
        className={`sticky top-0 z-40 border-b transition-[background-color,border-color,backdrop-filter] duration-300 ${
          scrolled || menuOpen ? 'border-[color:var(--color-line)] bg-ground/95' : 'border-transparent bg-ground/60'
        }`}
      >
        <div className={`frame flex items-center gap-2 sm:gap-4 transition-[height] duration-300 ${scrolled ? 'h-[3.75rem]' : 'h-[var(--header-h)]'}`}>
          <Link href={prefix || '/'} className="shrink-0" aria-label="Honey Bee Power, naslovnica">
            <Image src="/images/logo-white.png" alt="Honey Bee Power" width={147} height={36} priority className="h-7 w-auto sm:h-9" />
          </Link>

          <nav aria-label={t('main')} className="mx-auto hidden lg:block">
            <ul className="flex items-center gap-1 rounded-full border border-[color:var(--color-line)] bg-white/[0.04] p-1">
              {NAV.map((item) => (
                <li key={item.key}>
                  <Link
                    href={`${prefix}${item.href}`}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    className="block rounded-full px-4 py-2 font-medium text-ink/85 transition-colors hover:bg-white/10 hover:text-ink aria-[current=page]:bg-[color:var(--color-honey)] aria-[current=page]:text-[color:var(--color-honey-ink)]"
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-1 lg:ml-0">
            <LanguageSwitcher variant="menu" className="hidden md:block" />
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label={t('search')}
              className="hidden h-11 w-11 place-items-center rounded-full text-ink transition-[transform,background-color] hover:bg-white/10 active:scale-95 sm:grid"
            >
              <Search className="h-5 w-5" strokeWidth={2.25} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={openCart}
              className="btn btn-honey ml-1 min-h-11 gap-2 px-4 sm:px-5"
              aria-label={t('inquiryWithCount', { count })}
            >
              <span>{t('inquiry')}</span>
              <span
                className="tabular grid h-6 min-w-6 place-items-center rounded-full bg-[color:var(--color-honey-ink)] px-1.5 text-center text-[0.8125rem] text-[color:var(--color-honey)] transition-transform duration-300"
                style={{ transform: bump ? 'scale(1.3)' : 'none' }}
                aria-hidden="true"
              >
                {count}
              </span>
            </button>
            <button
              ref={menuButton}
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              aria-label={menuOpen ? t('close') : t('menu')}
              className="ml-0.5 inline-flex h-11 min-w-11 items-center justify-center gap-2.5 rounded-full border border-[color:var(--color-line)] px-3 font-medium text-ink transition-colors hover:bg-white/10 sm:ml-1 sm:px-4 lg:hidden"
            >
              <span aria-hidden="true" className="relative block h-3 w-5">
                <span className={`absolute left-0 h-[2px] w-5 rounded bg-current transition-all duration-300 ${menuOpen ? 'top-[5px] rotate-45' : 'top-0'}`} />
                <span className={`absolute left-0 top-[5px] h-[2px] w-5 rounded bg-current transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`absolute left-0 h-[2px] w-5 rounded bg-current transition-all duration-300 ${menuOpen ? 'top-[5px] -rotate-45' : 'top-[10px]'}`} />
              </span>
              <span className="hidden sm:inline">{menuOpen ? t('close') : t('menu')}</span>
            </button>
          </div>
        </div>
      </header>

      <div
        id="site-menu"
        hidden={!menuOpen}
        data-lenis-prevent
        className="on-ink fixed inset-x-0 bottom-0 top-[var(--header-h)] z-40 overflow-y-auto lg:hidden"
      >
        <nav aria-label={t('main')} className="frame flex min-h-full flex-col pb-8 pt-4">
          <ul>
            {NAV.map((item, i) => (
              <li key={item.key} className="border-b border-[color:var(--color-line)]">
                <Link
                  href={`${prefix}${item.href}`}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className="group flex items-center justify-between gap-4 py-4 font-[family-name:var(--font-display)] text-[length:var(--text-head)] font-extrabold leading-none tracking-[-0.04em] aria-[current=page]:text-[color:var(--color-honey)]"
                >
                  <span className="flex items-baseline gap-4">
                    <span className="t-small font-medium tabular text-muted">{String(i + 1).padStart(2, '0')}</span>
                    {t(item.key)}
                  </span>
                  <span aria-hidden="true" className="text-[0.6em] transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </li>
            ))}
          </ul>

          <ul className="mt-6 grid grid-cols-2 gap-2">
            {MORE.map((item) => (
              <li key={item.key}>
                <Link
                  href={`${prefix}${item.href}`}
                  className="flex min-h-12 items-center rounded-2xl border border-[color:var(--color-line)] px-4 font-medium text-ink/90 transition-colors hover:bg-white/10"
                >
                  {t(item.key)}
                </Link>
              </li>
            ))}
            <li>
              <button
                type="button"
                className="flex min-h-12 w-full items-center gap-2 rounded-2xl border border-[color:var(--color-line)] px-4 font-medium text-ink/90 transition-colors hover:bg-white/10"
                onClick={() => {
                  setMenuOpen(false)
                  setSearchOpen(true)
                }}
              >
                <Search className="h-4 w-4" aria-hidden="true" />
                {t('search')}
              </button>
            </li>
          </ul>

          <div className="mt-auto space-y-5 pt-10">
            <LanguageSwitcher tone="ink" />
            <p className="t-small text-muted">
              <a href="tel:+385977097962" className="link text-ink">+385 97 709 7962</a>
              {' · '}
              <a href="mailto:info@planetbio.hr" className="link text-ink">info@planetbio.hr</a>
            </p>
          </div>
        </nav>
      </div>

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
