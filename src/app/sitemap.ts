import { MetadataRoute } from 'next'
import { locales, defaultLocale } from '@/features/i18n/config'
import type { Locale } from '@/types'
import { localeUrl } from '@/lib/seo/site'
import { REAL_PRODUCTS, PRODUCT_CATEGORIES } from '@/lib/products-data'
import { GUIDES } from '@/lib/guides-data'

interface RouteDef {
  path: string
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  priority: number
}

const productRoutes: RouteDef[] = REAL_PRODUCTS.map((p) => ({
  path: `/proizvodi/${p.slug}`,
  changeFrequency: 'weekly',
  priority: 0.85,
}))

const categoryRoutes: RouteDef[] = Object.keys(PRODUCT_CATEGORIES).map((slug) => ({
  path: `/proizvodi/${slug}`,
  changeFrequency: 'weekly',
  priority: 0.8,
}))

const guideRoutes: RouteDef[] = GUIDES.map((g) => ({
  path: `/vodici/${g.slug}`,
  changeFrequency: 'monthly',
  priority: 0.65,
}))

const staticRoutes: RouteDef[] = [
  { path: '', changeFrequency: 'daily', priority: 1.0 },
  { path: '/proizvodi', changeFrequency: 'daily', priority: 0.9 },
  { path: '/vodici', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/gdje-kupiti', changeFrequency: 'weekly', priority: 0.6 },
  { path: '/b2b', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/kontakt', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/faq', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/aktivnosti', changeFrequency: 'weekly', priority: 0.5 },
  { path: '/sportasi', changeFrequency: 'monthly', priority: 0.4 },
  { path: '/dostava-i-placanje', changeFrequency: 'monthly', priority: 0.4 },
  { path: '/pravo-na-povrat', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/politika-privatnosti', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/uvjeti-koristenja', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/impressum', changeFrequency: 'yearly', priority: 0.3 },
]

const allRoutes: RouteDef[] = [
  ...staticRoutes,
  ...categoryRoutes,
  ...productRoutes,
  ...guideRoutes,
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  const sitemapEntries: MetadataRoute.Sitemap = []

  for (const route of allRoutes) {
    const languages: Partial<Record<Locale | 'x-default', string>> = {}
    for (const locale of locales) {
      languages[locale] = localeUrl(locale, route.path)
    }
    languages['x-default'] = localeUrl(defaultLocale, route.path)

    for (const locale of locales) {
      sitemapEntries.push({
        url: localeUrl(locale, route.path),
        lastModified,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: { languages },
      })
    }
  }

  return sitemapEntries
}
