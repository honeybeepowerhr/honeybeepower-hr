import type { Metadata, Viewport } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Archivo, Figtree } from 'next/font/google'
import { locales } from '@/features/i18n/config'
import type { Locale } from '@/types'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { CartPanel } from '@/components/cart/CartPanel'
import { ConsentBanner } from '@/components/analytics/ConsentBanner'
import { CONSENT_INLINE_SCRIPT } from '@/lib/consent'
import { ConsentGatedScripts } from '@/components/analytics/ConsentGatedScripts'
import { Experience } from '@/components/site/Experience'
import { SiteIntro } from '@/components/site/SiteIntro'
import { HiveTop } from '@/components/site/HiveTop'
import '../globals.css'

// Naslovi: Archivo (varijabilna težina i širina), tekst: Figtree.
// Oba fonta s podskupom latin-ext zbog č, ć, đ, š, ž i poljskih znakova.
const archivo = Archivo({
  subsets: ['latin', 'latin-ext'],
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap',
})

const figtree = Figtree({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-figtree',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

// Uvodna animacija prikazuje se jednom po posjetu (sessionStorage); ovdje se samo bilježi je li već viđena.
const INTRO_INLINE_SCRIPT = "try{if(sessionStorage.getItem('hbp-intro'))document.documentElement.classList.add('intro-seen');else sessionStorage.setItem('hbp-intro','1')}catch(e){}"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://honeybeepowerhr.com'
const DEFAULT_DESCRIPTION =
  'Energetski gelovi od višecvjetnog meda i liofiliziranog voća, izotonični napitci i whey protein. Proizvođač APIMAR (Poljska), distributer za Hrvatsku Planet Bio.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: '%s | Honey Bee Power',
    default: 'Honey Bee Power: energetski gel od meda',
  },
  description: DEFAULT_DESCRIPTION,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    title: 'Honey Bee Power: energetski gel od meda',
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    siteName: 'Honey Bee Power',
    type: 'website',
    images: [{ url: `${SITE_URL}/images/og/naslovnica.jpg`, width: 1200, height: 630, alt: 'Honey Bee Power energetski gelovi' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Honey Bee Power: energetski gel od meda',
    description: DEFAULT_DESCRIPTION,
    images: [`${SITE_URL}/images/og/naslovnica.jpg`],
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
  const tFooter = await getTranslations({ locale, namespace: 'footer' })

  return (
    <html lang={locale} suppressHydrationWarning className={`${archivo.variable} ${figtree.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: CONSENT_INLINE_SCRIPT }} />
        <script dangerouslySetInnerHTML={{ __html: INTRO_INLINE_SCRIPT }} />
      </head>
      <body>
        <a href="#main-content" className="skip-to-content">
          {locale === 'hr' ? 'Preskoči na sadržaj' : locale === 'de' ? 'Zum Inhalt springen' : locale === 'sl' ? 'Preskoči na vsebino' : locale === 'pl' ? 'Przejdź do treści' : 'Skip to content'}
        </a>
        <SiteIntro />
        <div className="scroll-progress" aria-hidden="true" />
        <HiveTop label={tFooter('backToTop')} />
        <NextIntlClientProvider messages={messages}>
          <Experience />
          <ConsentBanner />
          <Header />
          {/* Page content */}
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          {/* Footer */}
          <Footer />
          {/* Slide-over cart drawer */}
          <CartPanel />
          <ConsentGatedScripts />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
