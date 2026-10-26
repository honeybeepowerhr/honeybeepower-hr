import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import type { Locale } from '@/types'
import { SPORT_PAGES, SOURCES, getSportPage } from '@/lib/sports-data'
import { KIND_CATEGORY, KIND_LABEL, SPORTS, l } from '@/lib/product-content'
import { pageMetadata, localeUrl } from '@/lib/seo/site'
import { buildBreadcrumbSchema, buildFAQPageSchema } from '@/lib/seo/schemas'
import { JsonLd } from '@/components/seo/JsonLd'
import { FaqList } from '@/components/site/FaqList'
import { SectionMotion } from '@/components/site/SectionMotion'

export const revalidate = 3600

const L = {
  sport: { hr: 'Sport', en: 'Sport', de: 'Sport', sl: 'Šport', pl: 'Sport' },
  products: { hr: 'Proizvodi za ovaj sport', en: 'Products for this sport', de: 'Produkte für diesen Sport', sl: 'Izdelki za ta šport', pl: 'Produkty do tego sportu' },
  calcTitle: { hr: 'Koliko ugljikohidrata za oporavak?', en: 'How much carbohydrate for recovery?', de: 'Wie viele Kohlenhydrate zur Erholung?', sl: 'Koliko ogljikovih hidratov za obnovo?', pl: 'Ile węglowodanów na regenerację?' },
  calcText: { hr: 'Upiši tjelesnu težinu i vidi koliko ugljikohidrata trebaš u prva 4 sata nakon napora, prema uvjetu iz odobrene tvrdnje.', en: 'Enter your body weight and see how much carbohydrate you need in the first 4 hours after exercise, following the condition of the authorised claim.', de: 'Körpergewicht eingeben und sehen, wie viele Kohlenhydrate du in den ersten 4 Stunden nach der Belastung brauchst, gemäß der zugelassenen Angabe.', sl: 'Vpiši telesno maso in poglej, koliko ogljikovih hidratov potrebuješ v prvih 4 urah po naporu, po pogoju odobrene trditve.', pl: 'Wpisz masę ciała i zobacz, ile węglowodanów potrzebujesz w ciągu 4 godzin po wysiłku, zgodnie z warunkiem dopuszczonego oświadczenia.' },
  calcCta: { hr: 'Izračunaj oporavak', en: 'Calculate recovery', de: 'Erholung berechnen', sl: 'Izračunaj obnovo', pl: 'Oblicz regenerację' },
  faq: { hr: 'Česta pitanja', en: 'Questions', de: 'Häufige Fragen', sl: 'Pogosta vprašanja', pl: 'Częste pytania' },
  sources: { hr: 'Izvori', en: 'Sources', de: 'Quellen', sl: 'Viri', pl: 'Źródła' },
  other: { hr: 'Drugi sportovi', en: 'Other sports', de: 'Andere Sportarten', sl: 'Drugi športi', pl: 'Inne sporty' },
  note: { hr: 'Ovo je opća smjernica, a ne medicinski ni prehrambeni savjet. Novu prehranu prvo isprobaj na treningu.', en: 'This is general guidance, not medical or nutritional advice. Try new food in training first.', de: 'Dies ist eine allgemeine Orientierung, keine medizinische oder Ernährungsberatung. Neues zuerst im Training testen.', sl: 'To je splošna smernica in ne zdravniški ali prehranski nasvet. Novo prehrano najprej preizkusi na treningu.', pl: 'To ogólna wskazówka, a nie porada medyczna ani żywieniowa. Nowe jedzenie najpierw sprawdź na treningu.' },
} satisfies Record<string, Record<Locale, string>>

export function generateStaticParams() {
  return SPORT_PAGES.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params
  const page = getSportPage(slug)
  if (!page) return {}
  return pageMetadata({
    locale,
    path: `/sport/${slug}`,
    title: l(page.metaTitle, locale),
    description: l(page.metaDescription, locale),
    image: page.image,
  })
}

export default async function SportPage({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const { locale, slug } = await params
  const page = getSportPage(slug)
  if (!page) notFound()
  const prefix = locale === 'hr' ? '' : `/${locale}`
  const title = l(page.title, locale)

  return (
    <article>
      <JsonLd
        schema={buildBreadcrumbSchema([
          { name: 'Honey Bee Power', url: localeUrl(locale, '/') },
          { name: L.sport[locale], url: localeUrl(locale, `/sport/${slug}`) },
          { name: title, url: localeUrl(locale, `/sport/${slug}`) },
        ])}
      />
      <JsonLd schema={buildFAQPageSchema(page.faq.map((f, i) => ({ _key: String(i), question: f.q, answer: f.a })), locale)} />
      <SectionMotion />

      <header className="grid-12 items-stretch">
        <div className="frame col-span-12 flex flex-col justify-end gap-8 py-12 md:col-span-6 md:py-16">
          <p className="t-small">
            <Link href={prefix || '/'} className="hover:underline">Honey Bee Power</Link> / {L.sport[locale]}
          </p>
          <h1 className="t-display">{title}</h1>
          <p className="t-lead measure">{l(page.lead, locale)}</p>
        </div>
        <div className="relative col-span-12 min-h-[56svh] overflow-hidden bg-surface md:col-span-6 md:min-h-[calc(100svh-var(--header-h))]">
          <Image
            src={page.image}
            alt={l(page.imageAlt, locale)}
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
            style={{ objectPosition: page.imagePosition ?? '50% 50%' }}
            data-product-image
          />
        </div>
      </header>

      {page.sections.map((s, i) => (
        <section
          key={i}
          className={i === 1 ? 'on-ink' : ''}
          aria-labelledby={`sekcija-${i}`}
        >
          <div className={`frame grid-12 gap-y-6 ${i === 1 ? 'py-20 md:py-28' : 'section'}`}>
            <h2 id={`sekcija-${i}`} data-reveal className={`t-head col-span-12 ${i % 2 ? 'md:col-span-6 md:col-start-7 md:order-last' : 'md:col-span-5'}`}>
              {l(s.title, locale)}
            </h2>
            <p data-reveal className={`col-span-12 text-[length:var(--text-lead)] leading-[1.3] ${i % 2 ? 'md:col-span-6' : 'md:col-span-7'}`}>
              {l(s.body, locale)}
            </p>
          </div>
        </section>
      ))}

      <section className="field-surface" aria-labelledby="kalkulator-title">
        <div className="frame grid-12 items-end gap-y-8 py-20">
          <div className="col-span-12 md:col-span-8">
            <h2 id="kalkulator-title" className="t-head">{L.calcTitle[locale]}</h2>
            <p className="mt-6 t-body measure">{L.calcText[locale]}</p>
          </div>
          <div className="col-span-12 md:col-span-4 md:justify-self-end">
            <Link href={`${prefix}/oporavak-nakon-treninga`} className="btn btn-honey">
              {L.calcCta[locale]} <span className="btn-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="frame section" aria-labelledby="proizvodi-title">
        <h2 id="proizvodi-title" className="t-head">{L.products[locale]}</h2>
        <ul className="mt-10 flex flex-wrap gap-x-10 gap-y-3">
          {page.products.map((k) => (
            <li key={k}>
              <Link
                href={`${prefix}/proizvodi/${KIND_CATEGORY[k]}`}
                className="font-[family-name:var(--font-display)] text-[length:var(--text-sub)] font-extrabold underline decoration-[0.06em] underline-offset-[0.14em] hover:decoration-honey"
              >
                {l(KIND_LABEL[k], locale)}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="frame section pt-0" aria-labelledby="faq-sport">
        <FaqList id="faq-sport" title={L.faq[locale]} items={page.faq.map((f) => ({ q: l(f.q, locale), a: l(f.a, locale) }))} />
      </section>

      <footer className="frame grid-12 gap-y-8 pb-24">
        <div className="col-span-12 md:col-span-7">
          <h2 className="t-body font-medium">{L.sources[locale]}</h2>
          <ol className="mt-3 list-decimal space-y-1 pl-5 t-small">
            {SOURCES.map((s) => (
              <li key={s.url}>
                <a href={s.url} className="link" rel="noopener" target="_blank">{s.label}</a>
              </li>
            ))}
          </ol>
          <p className="mt-6 t-small">{L.note[locale]}</p>
        </div>
        <nav aria-label={L.other[locale]} className="col-span-12 md:col-span-5">
          <h2 className="t-body font-medium">{L.other[locale]}</h2>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 t-body">
            {SPORTS.filter((s) => s.slug !== slug).map((s) => (
              <li key={s.slug}><Link href={`${prefix}/sport/${s.slug}`} className="link">{s.name[locale]}</Link></li>
            ))}
          </ul>
        </nav>
      </footer>
    </article>
  )
}
