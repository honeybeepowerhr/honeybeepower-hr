import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/features/i18n/request.ts')

// Trajna preusmjeravanja (301) za promijenjene adrese, za hr (bez prefiksa) i ostale jezike.
const LOCALE_PREFIXES = ['', '/en', '/de', '/sl', '/pl']
const MOVED: Array<[string, string]> = [
  ['/aktivnosti', '/dogadaji'],
  ['/sportasi', '/dogadaji'],
  ['/vodici/zasto-je-med-bolji-od-malto-dekstrina-na-maratonu', '/vodici/med-ili-energetski-gel'],
  ['/vodici/kako-sprijeciti-grceve-u-misicima-tijekom-ljetnih-voznji', '/vodici/sto-piti-na-ljetnoj-voznji'],
  ['/vodici/uloga-bjelancevina-i-meda-u-brzem-oporavku-nakon-treninga', '/vodici/protein-nakon-treninga'],
  ['/koliko-gelova-trebam', '/oporavak-nakon-treninga'],
]

const nextConfig: NextConfig = {
  async redirects() {
    return LOCALE_PREFIXES.flatMap((prefix) =>
      MOVED.map(([from, to]) => ({ source: `${prefix}${from}`, destination: `${prefix}${to}`, statusCode: 301 as const })),
    )
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
}

export default withNextIntl(nextConfig)

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
