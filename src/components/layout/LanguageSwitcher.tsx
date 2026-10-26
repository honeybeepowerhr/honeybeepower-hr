'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import { locales, localeNames } from '@/features/i18n/config'
import type { Locale } from '@/types'
import { cn } from '@/lib/utils'

interface LanguageSwitcherProps {
  className?: string
  tone?: 'ground' | 'ink'
  /** `menu`: jedan gumb s padajućim popisom (zaglavlje); `inline`: svi jezici u retku (izbornik na mobitelu) */
  variant?: 'menu' | 'inline'
}

/** Poveznice na isti sadržaj na drugom jeziku (hr bez prefiksa). */
export default function LanguageSwitcher({ className, tone = 'ground', variant = 'inline' }: LanguageSwitcherProps) {
  const locale = useLocale() as Locale
  const pathname = usePathname() || '/'
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLDivElement>(null)

  const stripped = (() => {
    for (const l of locales) {
      if (l === 'hr') continue
      if (pathname.startsWith(`/${l}/`)) return pathname.slice(l.length + 1)
      if (pathname === `/${l}`) return '/'
    }
    return pathname
  })()

  const hrefFor = (l: Locale) => (l === 'hr' ? stripped : `/${l}${stripped === '/' ? '' : stripped}`)
  const choose = (l: Locale) => {
    document.cookie = `NEXT_LOCALE=${l}; path=/; max-age=31536000; SameSite=Lax`
    setOpen(false)
  }

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  if (variant === 'menu') {
    return (
      <div ref={root} className={cn('relative', className)}>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-haspopup="true"
          aria-label={`Jezik / Language: ${localeNames[locale]}`}
          className="inline-flex h-11 items-center gap-1.5 rounded-full px-3.5 font-semibold text-ink transition-colors hover:bg-white/10"
        >
          <span>{locale}</span>
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" className={cn('transition-transform duration-300', open && 'rotate-180')}>
            <path d="M2 4.5 6 8.5l4-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {open && (
          <ul
            aria-label="Jezik / Language"
            className="absolute right-0 top-[calc(100%+0.5rem)] z-50 min-w-[11rem] overflow-hidden rounded-2xl border border-[color:var(--color-line)] bg-[color:var(--color-surface)] p-1.5 shadow-[0_24px_60px_-12px_rgb(0_0_0/0.8)]"
          >
            {locales.map((l) => (
              <li key={l}>
                <Link
                  href={hrefFor(l)}
                  hrefLang={l}
                  lang={l}
                  onClick={() => choose(l)}
                  aria-current={l === locale ? 'true' : undefined}
                  className={cn(
                    'flex items-center justify-between gap-6 rounded-xl px-3.5 py-2.5 transition-colors',
                    l === locale ? 'bg-[color:var(--color-honey)] font-semibold text-[color:var(--color-honey-ink)]' : 'text-ink hover:bg-white/10',
                  )}
                >
                  <span>{localeNames[l]}</span>
                  <span className="t-small opacity-60">{l}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }

  return (
    <ul aria-label="Jezik / Language" className={cn('flex flex-wrap items-center gap-2', className)}>
      {locales.map((l) => (
        <li key={l}>
          <Link
            href={hrefFor(l)}
            hrefLang={l}
            lang={l}
            onClick={() => choose(l)}
            aria-label={localeNames[l]}
            aria-current={l === locale ? 'true' : undefined}
            className={cn(
              'grid h-11 min-w-12 place-items-center rounded-full px-3 font-semibold transition-colors',
              l === locale
                ? tone === 'ink'
                  ? 'bg-[color:var(--color-honey)] text-[color:var(--color-honey-ink)]'
                  : 'bg-ink text-ground'
                : 'border border-[color:var(--color-line)] text-ink hover:bg-white/10',
            )}
          >
            {l}
          </Link>
        </li>
      ))}
    </ul>
  )
}
