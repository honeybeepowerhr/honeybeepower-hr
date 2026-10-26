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
  const [hidden, setHidden] = useState(false)
  const [bump, setBump] = useState(false)
  const lastY = useRef(0)
  const lastCount = useRef(count)
  const menuButton = useRef<HTMLButtonElement>(null)

  // Košarica se čuva u localStorage; učitaj je nakon hidracije.
  useEffect(() => {
    void useCartStore.persist.rehydrate()
  }, [])

  // Zaglavlje se skriva pri skrolanju prema dolje i vraća pri skrolanju gore.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setHidden(y > 240 && y > lastY.current)
      lastY.current = y
    }
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
        className="sticky top-0 z-40 bg-ground transition-transform duration-300 ease-[var(--ease-out-quart)]"
        style={{ transform: hidden && !menuOpen ? 'translateY(-100%)' : 'none' }}
      >
        <div className="frame flex h-[var(--header-h)] items-center gap-6">
          <Link href={prefix || '/'} className="shrink-0" aria-label="Honey Bee Power, naslovnica">
            <Image src="/images/logo.png" alt="Honey Bee Power" width={147} height={36} priority className="h-8 w-auto sm:h-9" />
          </Link>

          <nav aria-label={t('main')} className="ml-auto hidden lg:block">
            <ul className="flex items-center gap-7">
              {NAV.map((item) => (
                <li key={item.key}>
                  <Link
                    href={`${prefix}${item.href}`}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    className="t-body font-medium underline-offset-[0.3em] decoration-2 hover:underline aria-[current=page]:underline"
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-1 lg:ml-6">
            <LanguageSwitcher className="hidden md:flex" />
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label={t('search')}
              className="hidden h-11 w-11 place-items-center transition-transform active:scale-95 sm:grid"
            >
              <Search className="h-5 w-5" strokeWidth={2.25} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={openCart}
              className="btn ml-1 min-h-11 px-4"
              aria-label={t('inquiryWithCount', { count })}
            >
              <span>{t('inquiry')}</span>
              <span
                className="tabular min-w-[1.5ch] text-center transition-transform duration-300"
                style={{ transform: bump ? 'scale(1.35)' : 'none' }}
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
              className="ml-1 grid h-11 min-w-11 place-items-center px-2 font-medium lg:hidden"
            >
              {menuOpen ? t('close') : t('menu')}
            </button>
          </div>
        </div>
      </header>

      <div
        id="site-menu"
        hidden={!menuOpen}
        className="on-ink fixed inset-x-0 bottom-0 top-[var(--header-h)] z-40 overflow-y-auto lg:hidden"
      >
        <nav aria-label={t('main')} className="frame flex min-h-full flex-col pb-8 pt-6">
          <ul className="space-y-1">
            {NAV.map((item) => (
              <li key={item.key}>
                <Link
                  href={`${prefix}${item.href}`}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className="block py-1 font-[family-name:var(--font-display)] text-[length:var(--text-head)] font-extrabold leading-[1.05] tracking-[-0.03em]"
                >
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-3 t-body">
            <li><Link href={`${prefix}/o-nama`} className="link">{t('about')}</Link></li>
            <li><Link href={`${prefix}/dogadaji`} className="link">{t('events')}</Link></li>
            <li><Link href={`${prefix}/faq`} className="link">{t('faq')}</Link></li>
            <li><Link href={`${prefix}/kontakt`} className="link">{t('contact')}</Link></li>
            <li>
              <button type="button" className="link" onClick={() => { setMenuOpen(false); setSearchOpen(true) }}>
                {t('search')}
              </button>
            </li>
          </ul>
          <LanguageSwitcher className="mt-auto pt-10" tone="ink" />
        </nav>
      </div>

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
