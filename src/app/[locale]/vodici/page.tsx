import Link from 'next/link'
import Image from 'next/image'
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
    hr: 'Kratki vodiči o gelovima, tekućini i proteinu: što piše na deklaraciji, što kažu opće smjernice i odakle to znamo.',
    en: 'Short guides on gels, fluids and protein: what the label says, what general guidance says and where that comes from.',
    de: 'Kurze Ratgeber zu Gels, Flüssigkeit und Protein: was auf dem Etikett steht, was allgemeine Empfehlungen sagen und woher wir das wissen.',
    sl: 'Kratki vodniki o gelih, tekočini in beljakovinah: kaj piše na deklaraciji, kaj pravijo splošne smernice in od kod to vemo.',
    pl: 'Krótkie poradniki o żelach, płynach i białku: co mówi etykieta, co mówią ogólne wskazówki i skąd to wiemy.',
  },
  meta: {
    hr: 'Vodiči Honey Bee Power: kada uzeti energetski gel, med ili gel, tekućina na ljetnoj vožnji i protein nakon treninga. S izvorima i datumom ažuriranja.',
    en: 'Honey Bee Power guides: when to take an energy gel, honey or gel, fluids on a summer ride and protein after training. With sources and update dates.',
    de: 'Honey Bee Power Ratgeber: wann ein Energiegel, Honig oder Gel, Trinken im Sommer und Protein nach dem Training. Mit Quellen und Datum.',
    sl: 'Vodniki Honey Bee Power: kdaj vzeti energijski gel, med ali gel, tekočina na poletni vožnji in beljakovine po treningu. Z viri in datumom.',
    pl: 'Poradniki Honey Bee Power: kiedy żel energetyczny, miód czy żel, płyny latem i białko po treningu. Ze źródłami i datą aktualizacji.',
  },
  read: { hr: 'min čitanja', en: 'min read', de: 'Min. Lesezeit', sl: 'min branja', pl: 'min czytania' },
} satisfies Record<string, Record<Locale, string>>

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  return pageMetadata({ locale, path: '/vodici', title: C.metaTitle[locale], description: C.meta[locale], image: '/images/found/med-zlica.jpg' })
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

      <ul className="pb-24">
        {guides.map((g, i) => (
          <li key={g.slug} data-reveal className={i % 2 ? 'field-surface' : ''}>
            <Link href={`${prefix}/vodici/${g.slug}`} className="group frame grid-12 items-center gap-y-6 py-10 md:py-14">
              <span className="relative col-span-12 aspect-[16/10] overflow-hidden bg-surface md:col-span-4">
                <Image src={g.image} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]" />
              </span>
              <span className="col-span-12 md:col-span-7 md:col-start-6">
                <span className="block font-[family-name:var(--font-display)] text-[length:var(--text-sub)] font-extrabold leading-[1.02] group-hover:underline decoration-[0.06em] underline-offset-[0.12em]">
                  {g.title}
                </span>
                <span className="mt-4 block t-body measure">{g.excerpt}</span>
                <span className="mt-3 block t-small">{g.readMinutes} {C.read[locale]} · Honey Bee Power</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
