import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import type { Locale } from '@/types'
import { pageMetadata, localeUrl } from '@/lib/seo/site'
import { buildBreadcrumbSchema } from '@/lib/seo/schemas'
import { JsonLd } from '@/components/seo/JsonLd'
import { FaqList } from '@/components/site/FaqList'
import { SectionMotion } from '@/components/site/SectionMotion'
import { PRODUCT_FAQ, l } from '@/lib/product-content'
import { formatEur, officialPriceFor } from '@/lib/prices'

export const revalidate = 3600

const C = {
  title: { hr: 'Česta pitanja', en: 'Questions', de: 'Häufige Fragen', sl: 'Pogosta vprašanja', pl: 'Częste pytania' },
  meta: {
    hr: 'Odgovori o Honey Bee Power gelovima, kofeinu, izotoniku i wheyju, narudžbi na upit, dostavi iz Našica i suradnji s klubovima. Samo podaci s deklaracija.',
    en: 'Answers about Honey Bee Power gels, caffeine, isotonic drinks and whey, ordering by enquiry, shipping from Našice and club partnerships.',
    de: 'Antworten zu Honey Bee Power Gels, Koffein, Isotonic und Whey, Bestellung per Anfrage, Versand aus Našice und Vereinen.',
    sl: 'Odgovori o gelih Honey Bee Power, kofeinu, izotoniku in whey proteinu, naročilu s povpraševanjem, dostavi iz Našic in klubih.',
    pl: 'Odpowiedzi o żelach Honey Bee Power, kofeinie, izotoniku i whey, zamawianiu, dostawie z Našic i współpracy z klubami.',
  },
  general: { hr: 'Narudžba i dostava', en: 'Ordering and shipping', de: 'Bestellung und Versand', sl: 'Naročilo in dostava', pl: 'Zamówienie i dostawa' },
  gel: { hr: 'Energetski gel', en: 'Energy gel', de: 'Energiegel', sl: 'Energijski gel', pl: 'Żel energetyczny' },
  iso: { hr: 'Izotonični napitak', en: 'Isotonic drink', de: 'Isotonisches Getränk', sl: 'Izotonični napitek', pl: 'Napój izotoniczny' },
  whey: { hr: 'Whey protein', en: 'Whey protein', de: 'Whey Protein', sl: 'Whey protein', pl: 'Białko serwatkowe' },
} satisfies Record<string, Record<Locale, string>>

function todo(text: string) {
  return text.split(/(\[UPIŠI:[^\]]*\])/g).map((p, i) => (p.startsWith('[UPIŠI') ? <span key={i} className="todo">{p}</span> : p))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  return pageMetadata({ locale, path: '/faq', title: `${C.title[locale]} · Honey Bee Power`, description: C.meta[locale] })
}

export default async function FaqPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'home.faq' })
  const isoPrice = officialPriceFor('Instant izotonik', 'LIMUN', '15 g')
  const wheyPrice = officialPriceFor('Proteinski prah', 'LJEŠNJAK-ČOKOLADA', '33 g')

  const general = [4, 5, 6].map((i) => ({ q: t(`q${i}`), a: t.markup(`a${i}`, { todo: (c) => c }) }))
  const groups = [
    { id: 'faq-narudzba', title: C.general[locale], items: general.map((f) => ({ q: f.q, a: <>{todo(f.a)}</>, plain: f.a })) },
    ...(['gel', 'isotonic', 'whey'] as const).map((k) => ({
      id: `faq-${k}`,
      title: C[k === 'isotonic' ? 'iso' : k][locale],
      items: PRODUCT_FAQ[k].map((f) => {
        const a = l(f.a, locale).replace('{price}', formatEur((k === 'isotonic' ? isoPrice : wheyPrice) ?? 0, locale))
        return { q: l(f.q, locale), a: <>{todo(a)}</>, plain: a }
      }),
    })),
  ]

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: groups.flatMap((g) => g.items.map((i) => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: i.plain } }))),
  }

  return (
    <>
      <JsonLd schema={schema} />
      <JsonLd schema={buildBreadcrumbSchema([
        { name: 'Honey Bee Power', url: localeUrl(locale, '/') },
        { name: C.title[locale], url: localeUrl(locale, '/faq') },
      ])} />
      <SectionMotion />
      <section className="frame grid-12 gap-y-6 pb-8 pt-10">
        <h1 className="t-display col-span-12 lg:col-span-6">{C.title[locale]}</h1>
        <p className="col-span-12 self-end t-lead lg:col-span-6">{C.meta[locale]}</p>
      </section>
      {groups.map((g, i) => (
        <section key={g.id} className={`frame ${i % 2 ? 'field-surface' : ''} py-16 md:py-24`} aria-labelledby={g.id}>
          <FaqList id={g.id} title={g.title} items={g.items} />
        </section>
      ))}
    </>
  )
}
