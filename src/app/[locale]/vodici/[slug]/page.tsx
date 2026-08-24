import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildBreadcrumbSchema } from '@/lib/seo/schemas'
import { pageMetadata, localeUrl, SITE_URL } from '@/lib/seo/site'
import { GUIDES, getGuideBySlug, type GuideBlock } from '@/lib/guides-data'
import type { Locale } from '@/types'

export const revalidate = 300 // ISR revalidate every 5 mins

interface PageProps {
  params: Promise<{ locale: Locale; slug: string }>
}

export function generateStaticParams(): { slug: string }[] {
  return GUIDES.map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params
  const guide = getGuideBySlug(slug)

  if (!guide) {
    return pageMetadata({
      locale,
      path: `/vodici/${slug}`,
      title: 'Vodič nije pronađen',
      description: 'Traženi vodič ne postoji.',
      noIndex: true,
    })
  }

  return pageMetadata({
    locale,
    path: `/vodici/${guide.slug}`,
    title: guide.title,
    description: guide.excerpt,
    image: guide.image,
  })
}

function GuideBlockRenderer({ block }: { block: GuideBlock }) {
  switch (block.type) {
    case 'lead':
      return <p className="text-lg font-medium text-gray-900">{block.text}</p>
    case 'h2':
      return <h2 className="text-2xl font-bold text-gray-900 mt-8">{block.text}</h2>
    case 'p':
      return <p>{block.text}</p>
    case 'callout':
      return (
        <div className="p-6 bg-amber-50 rounded-2xl border border-amber-200 my-8">
          <h3 className="text-lg font-bold text-amber-900 mb-2">{block.title}</h3>
          <p className="text-sm text-amber-800 mb-4">{block.text}</p>
          <Link
            href={block.ctaHref}
            className="inline-flex items-center px-4 py-2 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs hover:bg-amber-600 transition"
          >
            {block.ctaLabel}
          </Link>
        </div>
      )
    default:
      return null
  }
}

export default async function GuideDetailPage({ params }: PageProps) {
  const { locale, slug } = await params
  const guide = getGuideBySlug(slug)

  if (!guide) {
    notFound()
  }

  const prefix = locale === 'hr' ? '' : `/${locale}`

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.excerpt,
    image: [`${SITE_URL}${guide.image}`],
    datePublished: guide.isoDate,
    dateModified: guide.isoDate,
    author: [{ '@type': 'Person', name: guide.author }],
    publisher: { '@id': `${SITE_URL}/#organization` },
    mainEntityOfPage: localeUrl(locale, `/vodici/${guide.slug}`),
  }

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Početna', url: localeUrl(locale, '/') },
    { name: 'Vodiči', url: localeUrl(locale, '/vodici') },
    { name: guide.title, url: localeUrl(locale, `/vodici/${guide.slug}`) },
  ])

  return (
    <article className="py-12 md:py-16 bg-white">
      <JsonLd schema={articleSchema} />
      <JsonLd schema={breadcrumbSchema} />

      <div className="container mx-auto px-4 max-w-3xl">

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-xs text-gray-500 mb-8 flex items-center gap-2">
          <Link href={`${prefix}/`} className="hover:underline">Početna</Link>
          <span>/</span>
          <Link href={`${prefix}/vodici`} className="hover:underline">Vodiči</Link>
          <span>/</span>
          <span className="font-semibold text-gray-900 truncate max-w-[200px]">{guide.title}</span>
        </nav>

        <header className="mb-8">
          <div className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-2">
            {guide.category}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
            {guide.title}
          </h1>
          <div className="flex items-center gap-4 text-xs text-gray-500 mt-4 pb-6 border-b border-gray-100">
            <span>Autor: {guide.author}</span>
            <span>•</span>
            <span>{guide.date}</span>
            <span>•</span>
            <span>{guide.readTime}</span>
          </div>
        </header>

        <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-8 bg-gray-100 shadow-md">
          <Image
            src={guide.image}
            alt={guide.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6 font-sans">
          {guide.body.map((block, i) => (
            <GuideBlockRenderer key={i} block={block} />
          ))}
        </div>

      </div>
    </article>
  )
}
