import Link from 'next/link'
import type { Locale } from '@/types'
import { pageMetadata, localeUrl } from '@/lib/seo/site'
import { buildBreadcrumbSchema } from '@/lib/seo/schemas'
import { JsonLd } from '@/components/seo/JsonLd'
import { getGuides } from '@/lib/guides-data'
import { SectionMotion } from '@/components/site/SectionMotion'

export const revalidate = 3600

const C = {
  title: { hr: 'Vodiči', en: 'Guides', de: 'Ratgeber', sl: 'Vodniki', pl: 'Poradniki' },
  metaTitle: { hr: 'Vodiči o sportskoj prehrani s izvorima', en: 'Sports nutrition guides with sources', de: 'Ratgeber Sporternährung mit Quellen', sl: 'Vodniki o športni prehrani z viri', pl: 'Poradniki o odżywianiu w sporcie' },
  lead: {
    hr: 'Osam kratkih tekstova o gelovima, tekućini, kofeinu i proteinu: što piše na deklaraciji, što kažu opće smjernice i odakle to znamo.',
    en: 'Eight short texts on gels, fluids, caffeine and protein: what the label says, what general guidance says and where that comes from.',
    de: 'Acht kurze Texte zu Gels, Flüssigkeit, Koffein und Protein: was auf dem Etikett steht, was allgemeine Empfehlungen sagen und woher wir das wissen.',
    sl: 'Osem kratkih besedil o gelih, tekočini, kofeinu in beljakovinah: kaj piše na deklaraciji, kaj pravijo splošne smernice in od kod to vemo.',
    pl: 'Osiem krótkich tekstów o żelach, płynach, kofeinie i białku: co mówi etykieta, co mówią ogólne wskazówki i skąd to wiemy.',
  },
  meta: {
    hr: 'Vodiči Honey Bee Power: kako pročitati deklaraciju gela, kofein, oporavak, izotonik, protein i tekućina na vožnji. S izvorima i datumom ažuriranja.',
    en: 'Honey Bee Power guides: how to read a gel label, caffeine, recovery, the isotonic, protein and fluids on a ride. With sources and update dates.',
    de: 'Honey Bee Power Ratgeber: Gel-Etikett lesen, Koffein, Erholung, Isotonic, Protein und Trinken unterwegs. Mit Quellen und Datum.',
    sl: 'Vodniki Honey Bee Power: kako prebrati deklaracijo gela, kofein, obnova, izotonik, beljakovine in tekočina na vožnji. Z viri in datumom.',
    pl: 'Poradniki Honey Bee Power: jak czytać etykietę żelu, kofeina, regeneracja, izotonik, białko i płyny w trasie. Ze źródłami i datą aktualizacji.',
  },
  read: { hr: 'min čitanja', en: 'min read', de: 'Min. Lesezeit', sl: 'min branja', pl: 'min czytania' },
} satisfies Record<string, Record<Locale, string>>

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  return pageMetadata({ locale, path: '/vodici', title: C.metaTitle[locale], description: C.meta[locale], image: '/images/og/vodici.jpg' })
}

export default async function GuidesPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const prefix = locale === 'hr' ? '' : `/${locale}`
  const guides = getGuides(locale)

  return (
    <>
      <JsonLd schema={buildBreadcrumbSchema([
        { name: 'Honey Bee Power', url: localeUrl(locale, '/') },
        { name: C.title[locale], url: localeUrl(locale, '/vodici') },
      ])} />
      <SectionMotion />
      <section className="frame grid-12 gap-y-6 pb-14 pt-10" aria-labelledby="vodici-title">
        <h1 id="vodici-title" className="t-display col-span-12 lg:col-span-6">{C.title[locale]}</h1>
        <p className="col-span-12 self-end t-lead lg:col-span-6">{C.lead[locale]}</p>
      </section>

      <ol className="border-t border-[color:var(--color-line)] pb-24">
        {guides.map((g, i) => (
          <li key={g.slug} data-reveal className="border-b border-[color:var(--color-line)]">
            <Link
              href={`${prefix}/vodici/${g.slug}`}
              className="group frame grid-12 items-baseline gap-y-3 py-8 transition-colors hover:bg-[color:var(--color-surface)] md:py-10"
            >
              <span className="tabular col-span-12 font-[family-name:var(--font-display)] text-[length:var(--text-sub)] font-extrabold leading-none text-[color:var(--color-honey-text)] md:col-span-1">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="col-span-12 md:col-span-9 md:col-start-2 lg:col-span-8">
                <span className="block font-[family-name:var(--font-display)] text-[length:var(--text-lead)] font-extrabold leading-[1.1] decoration-[0.06em] underline-offset-[0.12em] group-hover:underline">
                  {g.title}
                </span>
                <span className="mt-3 block t-body measure">{g.excerpt}</span>
                <span className="mt-3 block t-small">{g.readMinutes} {C.read[locale]}</span>
              </span>
              <span aria-hidden="true" className="hidden justify-self-end text-2xl transition-transform duration-300 group-hover:translate-x-1 md:col-span-2 md:block lg:col-span-3">→</span>
            </Link>
          </li>
        ))}
      </ol>
    </>
  )
}
