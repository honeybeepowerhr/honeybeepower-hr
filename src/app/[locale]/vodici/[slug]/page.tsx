import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildBreadcrumbSchema, buildFAQPageSchema } from '@/lib/seo/schemas'
import { pageMetadata, localeUrl, SITE_URL, absoluteUrl } from '@/lib/seo/site'
import { GUIDES, getGuideBySlug, getGuides, type GuideBlock } from '@/lib/guides-data'
import { FaqList } from '@/components/site/FaqList'
import { SectionMotion } from '@/components/site/SectionMotion'
import type { Locale } from '@/types'

export const revalidate = 3600

const L = {
  guides: { hr: 'Vodiči', en: 'Guides', de: 'Ratgeber', sl: 'Vodniki', pl: 'Poradniki' },
  author: { hr: 'Autor', en: 'Author', de: 'Autor', sl: 'Avtor', pl: 'Autor' },
  updated: { hr: 'Ažurirano', en: 'Updated', de: 'Aktualisiert', sl: 'Posodobljeno', pl: 'Zaktualizowano' },
  read: { hr: 'min čitanja', en: 'min read', de: 'Min. Lesezeit', sl: 'min branja', pl: 'min czytania' },
  faq: { hr: 'Česta pitanja', en: 'Questions', de: 'Häufige Fragen', sl: 'Pogosta vprašanja', pl: 'Częste pytania' },
  sources: { hr: 'Izvori', en: 'Sources', de: 'Quellen', sl: 'Viri', pl: 'Źródła' },
  more: { hr: 'Još vodiča', en: 'More guides', de: 'Weitere Ratgeber', sl: 'Več vodnikov', pl: 'Więcej poradników' },
  note: { hr: 'Ovo je opća informacija, a ne medicinski ni prehrambeni savjet.', en: 'This is general information, not medical or nutritional advice.', de: 'Dies ist eine allgemeine Information, keine medizinische oder Ernährungsberatung.', sl: 'To je splošna informacija in ne zdravniški ali prehranski nasvet.', pl: 'To ogólna informacja, a nie porada medyczna ani żywieniowa.' },
} satisfies Record<string, Record<Locale, string>>

const DATE_TAG: Record<Locale, string> = { hr: 'hr-HR', en: 'en-GB', de: 'de-DE', sl: 'sl-SI', pl: 'pl-PL' }

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params
  const guide = getGuideBySlug(slug, locale)
  if (!guide) return pageMetadata({ locale, path: `/vodici/${slug}`, title: 'Honey Bee Power', description: 'Honey Bee Power', noIndex: true })
  return pageMetadata({ locale, path: `/vodici/${slug}`, title: guide.title.slice(0, 60), description: guide.excerpt.slice(0, 155), image: guide.image })
}

function Block({ block, prefix }: { block: GuideBlock; prefix: string }) {
  switch (block.type) {
    case 'h2':
      return <h2 className="mt-14 font-[family-name:var(--font-display)] text-[length:var(--text-sub)] font-extrabold leading-[1.05]">{block.text}</h2>
    case 'p':
      return <p className="mt-5">{block.text}</p>
    case 'list':
      return (
        <ul className="mt-5 list-disc space-y-2 pl-6">
          {block.items.map((i) => <li key={i}>{i}</li>)}
        </ul>
      )
    case 'link':
      return (
        <p className="mt-6">
          <Link href={`${prefix}${block.href}`} className="link font-medium">{block.text} →</Link>
        </p>
      )
  }
}

export default async function GuidePage({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const { locale, slug } = await params
  const guide = getGuideBySlug(slug, locale)
  if (!guide) notFound()
  const prefix = locale === 'hr' ? '' : `/${locale}`
  const date = new Intl.DateTimeFormat(DATE_TAG[locale], { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(guide.isoUpdated))
  const others = getGuides(locale).filter((g) => g.slug !== slug)

  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.excerpt,
    image: guide.image.startsWith('http') ? guide.image : absoluteUrl(guide.image),
    dateModified: guide.isoUpdated,
    datePublished: guide.isoUpdated,
    inLanguage: locale,
    author: { '@type': 'Organization', name: guide.author },
    publisher: { '@id': `${SITE_URL}/#organization` },
    mainEntityOfPage: localeUrl(locale, `/vodici/${slug}`),
    citation: guide.sources.map((s) => s.url),
  }

  return (
    <article>
      <JsonLd schema={article} />
      <JsonLd schema={buildBreadcrumbSchema([
        { name: 'Honey Bee Power', url: localeUrl(locale, '/') },
        { name: L.guides[locale], url: localeUrl(locale, '/vodici') },
        { name: guide.title, url: localeUrl(locale, `/vodici/${slug}`) },
      ])} />
      <JsonLd schema={buildFAQPageSchema(guide.faq.map((f, i) => ({ _key: String(i), question: { hr: f.q, en: f.q, de: f.q }, answer: { hr: f.a, en: f.a, de: f.a } })), 'hr')} />
      <SectionMotion />

      <header className="frame grid-12 gap-y-8 pb-12 pt-10 md:pb-16">
        <p className="col-span-12 t-small">
          <Link href={`${prefix}/vodici`} className="hover:underline">{L.guides[locale]}</Link> /
        </p>
        <h1 className="t-head col-span-12 lg:col-span-10">{guide.title}</h1>
        <p className="col-span-12 t-lead measure lg:col-span-8">{guide.lead}</p>
        <dl className="col-span-12 flex flex-wrap gap-x-8 gap-y-2 t-small">
          <div className="flex gap-2"><dt>{L.author[locale]}:</dt><dd className="font-medium">{guide.author}</dd></div>
          <div className="flex gap-2"><dt>{L.updated[locale]}:</dt><dd className="font-medium"><time dateTime={guide.isoUpdated}>{date}</time></dd></div>
          <div><dd>{guide.readMinutes} {L.read[locale]}</dd></div>
        </dl>
      </header>

      <div className="relative mx-[var(--gutter)] aspect-[21/9] overflow-hidden bg-surface">
        <Image src={guide.image} alt={guide.imageAlt} fill priority sizes="100vw" className="object-cover" data-product-image />
      </div>

      <div className="frame grid-12 py-16 md:py-24">
        <div className="col-span-12 t-body md:col-span-8 md:col-start-3 lg:col-span-6 lg:col-start-4">
          {guide.body.map((b, i) => <Block key={i} block={b} prefix={prefix} />)}
          <p className="mt-10 t-small">{L.note[locale]}</p>
        </div>
      </div>

      <section className="frame section pt-0" aria-labelledby="vodic-faq">
        <FaqList id="vodic-faq" title={L.faq[locale]} items={guide.faq} />
      </section>

      <footer className="field-surface">
        <div className="frame grid-12 gap-y-10 py-16">
          <div className="col-span-12 md:col-span-7">
            <h2 className="t-body font-medium">{L.sources[locale]}</h2>
            <ol className="mt-3 list-decimal space-y-1 pl-5 t-small">
              {guide.sources.map((s) => (
                <li key={s.url}><a href={s.url} className="link" rel="noopener" target="_blank">{s.label}</a></li>
              ))}
            </ol>
          </div>
          <nav className="col-span-12 md:col-span-5" aria-label={L.more[locale]}>
            <h2 className="t-body font-medium">{L.more[locale]}</h2>
            <ul className="mt-3 space-y-2">
              {others.map((g) => (
                <li key={g.slug}><Link href={`${prefix}/vodici/${g.slug}`} className="link t-body">{g.title}</Link></li>
              ))}
            </ul>
          </nav>
        </div>
      </footer>
    </article>
  )
}
