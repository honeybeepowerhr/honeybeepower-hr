// Feature: honey-bee-power-webshop, Property 1: Page Metadata Integrity
// Validates: Requirements 1.3, 1.6, 16.1, 16.2

import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import { buildAlternates, localeUrl, SITE_URL } from '@/lib/seo/site'
import { locales } from '@/features/i18n/config'
import type { Locale } from '@/types'

/** Simple path arbitrary */
const pathArb = fc
  .tuple(
    fc.constantFrom('', 'proizvodi', 'vodici', 'b2b', 'kontakt'),
    fc.option(fc.stringMatching(/^[a-z0-9-]{3,15}$/), { nil: undefined }),
  )
  .map(([base, sub]) => (sub ? `/${base}/${sub}` : base ? `/${base}` : '/'))

const localeArb = fc.constantFrom(...locales)

describe('Property 1: Page Metadata Integrity', () => {
  /**
   * Property: buildAlternates output for any path and locale MUST contain
   * exactly 5 language alternates + 1 x-default, and a canonical URL that
   * self-references the current locale (never silently collapses to hr).
   *
   * Validates: Requirements 1.3, 1.6
   */
  it('generates a full hreflang cluster with a self-referencing canonical for any route/locale', () => {
    fc.assert(
      fc.property(pathArb, localeArb, (pathname, locale) => {
        const alternates = buildAlternates(pathname, locale as Locale)
        const languages = alternates?.languages as Record<string, string> | undefined

        expect(languages).toBeDefined()
        const keys = Object.keys(languages!)
        expect(keys).toHaveLength(locales.length + 1) // + x-default
        expect(keys).toEqual(expect.arrayContaining([...locales, 'x-default']))

        // Canonical always matches the current locale's own URL, not a fixed locale.
        expect(alternates!.canonical).toBe(localeUrl(locale as Locale, pathname))

        // Every alternate URL is absolute and lives under the site origin.
        for (const url of Object.values(languages!)) {
          expect(url.startsWith(SITE_URL)).toBe(true)
        }
      }),
      { numRuns: 100 },
    )
  })

  /**
   * Property: the default locale (hr) is served with no path prefix, while
   * every other locale is prefixed with "/{locale}" — per the middleware's
   * `localePrefix: 'as-needed'` scheme.
   */
  it('omits the locale prefix for hr and includes it for every other locale', () => {
    fc.assert(
      fc.property(pathArb, localeArb, (pathname, locale) => {
        const url = localeUrl(locale as Locale, pathname)
        const suffix = pathname === '/' ? '' : pathname

        if (locale === 'hr') {
          expect(url).toBe(`${SITE_URL}${suffix || '/'}`)
        } else {
          expect(url).toBe(`${SITE_URL}/${locale}${suffix}`)
        }
      }),
      { numRuns: 100 },
    )
  })
})
