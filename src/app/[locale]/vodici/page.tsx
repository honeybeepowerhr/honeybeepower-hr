import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import type { Locale } from '@/types'
import { pageMetadata } from '@/lib/seo/site'
import { GUIDES } from '@/lib/guides-data'

export const revalidate = 300 // ISR revalidate every 5 mins

const TITLES: Record<Locale, string> = {
  hr: 'Vodiči i Savjeti za Sportske Performanse',
  en: 'Guides & Tips for Sports Performance',
  de: 'Ratgeber & Tipps für sportliche Leistung',
  sl: 'Vodniki in Nasveti za Športne Dosežke',
  pl: 'Poradniki i Porady dla Sportowców',
}

const DESCRIPTIONS: Record<Locale, string> = {
  hr: 'Stručni članci o prehrani na maratonima, hidrataciji za bicikliste i oporavku mišića uz pomoć prirodnog meda.',
  en: 'Expert articles on marathon fueling, cyclist hydration, and muscle recovery with the help of natural honey.',
  de: 'Fachartikel über Marathon-Ernährung, Hydration für Radfahrer und Muskelregeneration mit natürlichem Honig.',
  sl: 'Strokovni članki o prehrani na maratonih, hidraciji za kolesarje in okrevanju mišic z naravnim medom.',
  pl: 'Eksperckie artykuły o odżywianiu na maratonie, nawodnieniu kolarzy i regeneracji mięśni dzięki naturalnemu miodowi.',
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  return pageMetadata({
    locale,
    path: '/vodici',
    title: TITLES[locale] ?? TITLES.hr,
    description: DESCRIPTIONS[locale] ?? DESCRIPTIONS.hr,
    image: GUIDES[0]?.image,
  })
}

export default function BlogListingPage() {
  const t = useTranslations('guidesPage')

  return (
    <div className="py-12 md:py-16 bg-gray-50/50">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-xs text-gray-500 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:underline">Početna</Link>
          <span>/</span>
          <span className="font-semibold text-gray-900">{t('badge')}</span>
        </nav>

        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-amber-600 font-bold text-sm uppercase tracking-wider">{t('badge')}</span>
          <h1 className="text-4xl font-extrabold text-gray-900 mt-1">
            {t('title')}
          </h1>
          <p className="text-gray-600 mt-3 text-base">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {GUIDES.map((article) => (
            <article
              key={article.slug}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-video w-full bg-gray-100">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h2 className="text-xl font-bold text-gray-900 hover:text-amber-600 transition-colors leading-snug">
                    <Link href={`/vodici/${article.slug}`}>{article.title}</Link>
                  </h2>

                  <p className="text-sm text-gray-600 mt-3 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/vodici/${article.slug}`}
                  className="inline-flex items-center text-amber-600 font-bold text-sm hover:underline"
                >
                  {t('readMore')}
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  )
}
