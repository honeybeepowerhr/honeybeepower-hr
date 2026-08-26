import type { Metadata, Viewport } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Barlow_Condensed, Inter } from 'next/font/google'
import { locales } from '@/features/i18n/config'
import type { Locale } from '@/types'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { CartPanel } from '@/components/cart/CartPanel'
import { AmbientBackground } from '@/components/ui/AmbientBackground'
import { ScrollProgress } from '@/components/motion/ScrollProgress'
import '../globals.css'

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin', 'latin-ext'],
  weight: ['700', '800', '900'],
  variable: '--font-barlow-condensed',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://honeybeepower.hr'
const DEFAULT_DESCRIPTION =
  'Energetski gelovi i izotonični napitci na bazi 100% prirodnog cvjetnog meda. Bez sukraloze, bez umjetnih aditiva.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: '%s | Honey Bee Power',
    default: 'Honey Bee Power – Prirodna sportska prehrana',
  },
  description: DEFAULT_DESCRIPTION,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    title: 'Honey Bee Power – Prirodna sportska prehrana',
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    siteName: 'Honey Bee Power',
    type: 'website',
    images: [{ url: `${SITE_URL}/images/logo.png`, width: 1200, height: 630, alt: 'Honey Bee Power' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Honey Bee Power – Prirodna sportska prehrana',
    description: DEFAULT_DESCRIPTION,
    images: [`${SITE_URL}/images/logo.png`],
  },
  icons: {
    icon: '/images/logo.png',
  },
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params

  if (!locales.includes(locale as Locale)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale} className={`${barlowCondensed.variable} ${inter.variable}`}>
      <head>
        {/* GTM placeholder — aktivira se u koraku 13 */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `<!-- GTM will be loaded here in step 13 -->`,
            }}
          />
        )}
      </head>
      <body className="font-inter bg-[#fffaf0] text-charcoal antialiased relative">
        <NextIntlClientProvider messages={messages}>
          {/* Scroll progress bar */}
          <ScrollProgress />
          {/* Global soft ambient background */}
          <AmbientBackground />
          {/* Sticky header */}
          <Header />
          {/* Page content */}
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          {/* Footer */}
          <Footer />
          {/* Slide-over cart drawer */}
          <CartPanel />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
