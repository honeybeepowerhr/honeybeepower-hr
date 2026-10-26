'use client'

import Link from 'next/link'
import { useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import { locales, localeNames } from '@/features/i18n/config'
import type { Locale } from '@/types'
import { cn } from '@/lib/utils'

interface LanguageSwitcherProps {
  className?: string
  tone?: 'ground' | 'ink'
}

/** Poveznice na isti sadržaj na drugom jeziku (hr bez prefiksa). */
export default function LanguageSwitcher({ className, tone = 'ground' }: LanguageSwitcherProps) {
  const locale = useLocale() as Locale
  const pathname = usePathname() || '/'

  const stripped = (() => {
    for (const l of locales) {
      if (l === 'hr') continue
      if (pathname.startsWith(`/${l}/`)) return pathname.slice(l.length + 1)
      if (pathname === `/${l}`) return '/'
    }
    return pathname
  })()

  const hrefFor = (l: Locale) => (l === 'hr' ? stripped : `/${l}${stripped === '/' ? '' : stripped}`)

  return (
    <ul aria-label="Jezik / Language" className={cn('flex items-center', className)}>
      {locales.map((l) => (
        <li key={l}>
          <Link
            href={hrefFor(l)}
            hrefLang={l}
            lang={l}
            onClick={() => {
              document.cookie = `NEXT_LOCALE=${l}; path=/; max-age=31536000; SameSite=Lax`
            }}
            aria-label={localeNames[l]}
            aria-current={l === locale ? 'true' : undefined}
            className={cn(
              'grid h-11 min-w-9 place-items-center rounded-full px-1.5 t-small font-semibold uppercase transition-colors',
              l === locale
                ? tone === 'ink'
                  ? 'bg-honey text-honey-ink'
                  : 'bg-ink text-ground'
                : 'text-muted hover:text-ink',
            )}
          >
            {l}
          </Link>
        </li>
      ))}
    </ul>
  )
}
