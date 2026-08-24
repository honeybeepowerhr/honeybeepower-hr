import type { Metadata } from 'next'
import type { Locale } from '@/types'
import { locales, defaultLocale } from '@/features/i18n/config'

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://honeybeepower.hr').replace(/\/$/, '')

export const SITE_NAME = 'Honey Bee Power'

const OG_LOCALE_MAP: Record<Locale, string> = {
  hr: 'hr_HR',
  en: 'en_US',
  de: 'de_DE',
  sl: 'sl_SI',
  pl: 'pl_PL',
}

/**
 * Locale-prefixed path per the `as-needed` middleware scheme: the default
 * locale (hr) is served with no prefix, all others get `/{locale}`.
 */
export function localeHref(locale: Locale, path: string): string {
  const clean = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`
  const prefix = locale === defaultLocale ? '' : `/${locale}`
  return `${prefix}${clean}` || '/'
}

export function absoluteUrl(path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${clean}`
}

export function localeUrl(locale: Locale, path: string): string {
  return absoluteUrl(localeHref(locale, path))
}

/**
 * Self-referencing canonical (each locale canonicalizes to itself, never to hr)
 * plus the full hreflang cluster for a locale-neutral path such as
 * "/proizvodi/foo" or "/".
 */
export function buildAlternates(path: string, locale: Locale): Metadata['alternates'] {
  const languages: Record<string, string> = {}
  for (const l of locales) {
    languages[l] = localeUrl(l, path)
  }
  languages['x-default'] = localeUrl(defaultLocale, path)

  return {
    canonical: localeUrl(locale, path),
    languages,
  }
}

interface PageMetadataInput {
  locale: Locale
  path: string
  /** Bare page title — the root layout's title.template appends " | Honey Bee Power". */
  title: string
  description: string
  /** Absolute or root-relative image path. Defaults to the brand logo. */
  image?: string
  noIndex?: boolean
}

/**
 * Builds a full Metadata object (title, description, canonical + hreflang,
 * Open Graph, Twitter Card) for a page. `title` should be the bare,
 * page-specific title with no manual brand suffix — the root layout template
 * takes care of that for the <title> tag. OG/Twitter titles don't go through
 * that template, so this helper appends the brand there explicitly.
 */
export function pageMetadata({
  locale,
  path,
  title,
  description,
  image,
  noIndex,
}: PageMetadataInput): Metadata {
  const brandedTitle = `${title} | ${SITE_NAME}`
  const imageUrl = absoluteUrl(image ?? '/images/logo.png')

  return {
    title,
    description,
    alternates: buildAlternates(path, locale),
    openGraph: {
      title: brandedTitle,
      description,
      url: localeUrl(locale, path),
      siteName: SITE_NAME,
      locale: OG_LOCALE_MAP[locale],
      type: 'website',
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: brandedTitle,
      description,
      images: [imageUrl],
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  }
}
