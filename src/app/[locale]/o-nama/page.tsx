import Link from 'next/link'
import Image from 'next/image'
import type { Locale } from '@/types'
import { pageMetadata, localeUrl } from '@/lib/seo/site'
import { buildBreadcrumbSchema } from '@/lib/seo/schemas'
import { JsonLd } from '@/components/seo/JsonLd'
import { SectionMotion } from '@/components/site/SectionMotion'
import { LEGAL_ENTITY } from '@/lib/cjenik-data'
import { MANUFACTURER } from '@/lib/declarations'

export const revalidate = 3600

type T5 = Record<Locale, string>

const C = {
  title: { hr: 'Naša priča', en: 'Our story', de: 'Unsere Geschichte', sl: 'Naša zgodba', pl: 'Nasza historia' },
  metaTitle: { hr: 'Naša priča: od Baranówa do Našica', en: 'Our story: from Baranów to Našice', de: 'Unsere Geschichte: von Baranów nach Našice', sl: 'Naša zgodba: od Baranówa do Našic', pl: 'Nasza historia: z Baranowa do Našic' },
  meta: {
    hr: 'Honey Bee Power proizvodi P.P.H. APIMAR iz Baranówa u Poljskoj, od meda s poljskih pčelinjaka. Planet Bio iz Našica je distributer za Hrvatsku.',
    en: 'Honey Bee Power is made by P.P.H. APIMAR in Baranów, Poland, from honey from Polish apiaries. Planet Bio in Našice is the distributor for Croatia.',
    de: 'Honey Bee Power wird von P.P.H. APIMAR in Baranów (Polen) aus Honig polnischer Imkereien hergestellt. Planet Bio aus Našice vertreibt in Kroatien.',
    sl: 'Honey Bee Power izdeluje P.P.H. APIMAR iz Baranówa na Poljskem iz medu s poljskih čebelnjakov. Planet Bio iz Našic je distributer za Hrvaško.',
    pl: 'Honey Bee Power produkuje P.P.H. APIMAR z Baranowa z miodu z polskich pasiek. Planet Bio z Našic jest dystrybutorem w Chorwacji.',
  },
  lead: {
    hr: 'Honey Bee Power je brend poljskog proizvođača. Mi smo Planet Bio, mali obrt iz Našica, i te proizvode donosimo u Hrvatsku.',
    en: 'Honey Bee Power is a brand of a Polish producer. We are Planet Bio, a small business in Našice, and we bring those products to Croatia.',
    de: 'Honey Bee Power ist eine Marke eines polnischen Herstellers. Wir sind Planet Bio, ein kleiner Betrieb aus Našice, und bringen die Produkte nach Kroatien.',
    sl: 'Honey Bee Power je blagovna znamka poljskega proizvajalca. Mi smo Planet Bio, majhna obrt iz Našic, in te izdelke prinašamo na Hrvaško.',
    pl: 'Honey Bee Power to marka polskiego producenta. My jesteśmy Planet Bio, małą firmą z Našic, i sprowadzamy te produkty do Chorwacji.',
  },
  makerTitle: { hr: 'Proizvođač', en: 'Producer', de: 'Hersteller', sl: 'Proizvajalec', pl: 'Producent' },
  makerText: {
    hr: 'Gelove, izotonike i whey proizvodi P.P.H. APIMAR iz Baranówa u Poljskoj. Gelovi su od višecvjetnog meda s poljskih pčelinjaka, uz liofilizirano voće, ekstrakt guarane i morsku sol; na pakiranju izotonika piše „Poljski proizvod”. Više o proizvođaču na honeybeepower.pl.',
    en: 'The gels, isotonic drinks and whey are made by P.P.H. APIMAR in Baranów, Poland. The gels are made from multifloral honey from Polish apiaries, with freeze-dried fruit, guarana extract and sea salt; the isotonic pack says “Polish product”. More about the producer at honeybeepower.pl.',
    de: 'Gels, isotonische Getränke und Whey stellt P.P.H. APIMAR in Baranów (Polen) her. Die Gels bestehen aus Mehrblütenhonig polnischer Imkereien, gefriergetrockneten Früchten, Guaranaextrakt und Meersalz; auf der Isotonic-Packung steht „Polnisches Produkt“. Mehr unter honeybeepower.pl.',
    sl: 'Gele, izotonike in whey izdeluje P.P.H. APIMAR iz Baranówa na Poljskem. Geli so iz večcvetnega medu s poljskih čebelnjakov, z liofiliziranim sadjem, izvlečkom guarane in morsko soljo; na embalaži izotonika piše „Poljski izdelek”. Več o proizvajalcu na honeybeepower.pl.',
    pl: 'Żele, izotoniki i whey produkuje P.P.H. APIMAR z Baranowa. Żele powstają z miodu wielokwiatowego z polskich pasiek, z liofilizowanymi owocami, ekstraktem z guarany i solą morską; na opakowaniu izotoniku widnieje „Produkt polski”. Więcej na honeybeepower.pl.',
  },
  usTitle: { hr: 'Distributer za Hrvatsku', en: 'Distributor for Croatia', de: 'Vertrieb in Kroatien', sl: 'Distributer za Hrvaško', pl: 'Dystrybutor w Chorwacji' },
  usText: {
    hr: 'Planet Bio je obrt iz Našica. Proizvode držimo u skladištu u Krndijskoj 4 i šaljemo ih po Hrvatskoj, obično za 1–3 radna dana nakon potvrde narudžbe. Na promo pultu bili smo i na Vukovarskom maratonu.',
    en: 'Planet Bio is a small business in Našice. We keep the products in our warehouse at Krndijska 4 and ship them across Croatia, usually within 1–3 working days of order confirmation. We also had a promo stand at the Vukovar marathon.',
    de: 'Planet Bio ist ein Gewerbebetrieb aus Našice. Wir lagern die Produkte in der Krndijska 4 und versenden sie in ganz Kroatien, meist innerhalb von 1–3 Werktagen nach Bestätigung. Beim Vukovar-Marathon waren wir mit einem Promostand dabei.',
    sl: 'Planet Bio je obrt iz Našic. Izdelke hranimo v skladišču na Krndijski 4 in jih pošiljamo po Hrvaški, običajno v 1–3 delovnih dneh po potrditvi naročila. S stojnico smo bili tudi na vukovarskem maratonu.',
    pl: 'Planet Bio to firma z Našic. Produkty trzymamy w magazynie przy Krndijska 4 i wysyłamy je po Chorwacji, zwykle w ciągu 1–3 dni roboczych od potwierdzenia zamówienia. Mieliśmy też stoisko na maratonie w Vukovarze.',
  },
  orderTitle: { hr: 'Kako se naručuje', en: 'How ordering works', de: 'So wird bestellt', sl: 'Kako naročiš', pl: 'Jak zamawiać' },
  orderText: {
    hr: 'Na stranici nema plaćanja. Složiš upit, pošalješ ga WhatsAppom ili e-mailom, a mi se javimo s potvrdom, cijenom dostave i načinom plaćanja (pouzeće ili virman). Klubovi i trgovine šalju B2B upit.',
    en: 'There is no payment on the website. You put together an enquiry, send it by WhatsApp or e-mail, and we reply with a confirmation, the shipping cost and payment options (cash on delivery or bank transfer). Clubs and shops send a B2B enquiry.',
    de: 'Auf der Website wird nichts bezahlt. Du stellst eine Anfrage zusammen und sendest sie per WhatsApp oder E-Mail; wir melden uns mit Bestätigung, Versandkosten und Zahlungsart (Nachnahme oder Überweisung). Vereine und Geschäfte senden eine B2B-Anfrage.',
    sl: 'Na strani ni plačila. Sestaviš povpraševanje, ga pošlješ prek WhatsAppa ali e-pošte, mi pa se oglasimo s potrditvijo, ceno dostave in načinom plačila (po povzetju ali z nakazilom). Klubi in trgovine pošljejo B2B povpraševanje.',
    pl: 'Na stronie nie ma płatności. Składasz zapytanie, wysyłasz je przez WhatsApp lub e-mail, a my odpowiadamy z potwierdzeniem, kosztem dostawy i formą płatności (za pobraniem lub przelewem). Kluby i sklepy wysyłają zapytanie B2B.',
  },
  archive: { hr: 'Arhivske slike poljskih pčelinjaka: slika Aleksandra Augustynowicza „Na pčelinjaku” (1905.) i fotografija pčelinjaka u Łomiankama kraj Varšave (1939.).', en: 'Archive images of Polish apiaries: Aleksander Augustynowicz’s painting “At the apiary” (1905) and a photograph of an apiary in Łomianki near Warsaw (1939).', de: 'Archivbilder polnischer Bienenstände: Aleksander Augustynowicz’ Gemälde „Am Bienenstand“ (1905) und ein Foto aus Łomianki bei Warschau (1939).', sl: 'Arhivski podobi poljskih čebelnjakov: slika Aleksandra Augustynowicza „Na čebelnjaku” (1905) in fotografija čebelnjaka v Łomiankih pri Varšavi (1939).', pl: 'Archiwalne obrazy polskich pasiek: obraz Aleksandra Augustynowicza „Na pasiece” (1905) i zdjęcie pasieki w Łomiankach pod Warszawą (1939).' },
  paintingAlt: { hr: 'Slika drvenih košnica u cvjetnom vrtu', en: 'Painting of wooden hives in a flowering garden', de: 'Gemälde von Holzbeuten in einem blühenden Garten', sl: 'Slika lesenih panjev v cvetočem vrtu', pl: 'Obraz drewnianych uli w kwitnącym ogrodzie' },
  photoAlt: { hr: 'Crno-bijela fotografija košnica u voćnjaku', en: 'Black-and-white photograph of hives in an orchard', de: 'Schwarzweißfoto von Bienenstöcken im Obstgarten', sl: 'Črno-bela fotografija panjev v sadovnjaku', pl: 'Czarno-białe zdjęcie uli w sadzie' },
  products: { hr: 'Pogledaj proizvode', en: 'See the products', de: 'Produkte ansehen', sl: 'Oglej si izdelke', pl: 'Zobacz produkty' },
  b2b: { hr: 'Za klubove i trgovine', en: 'For clubs and shops', de: 'Für Vereine und Geschäfte', sl: 'Za klube in trgovine', pl: 'Dla klubów i sklepów' },
} satisfies Record<string, T5>

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  return pageMetadata({ locale, path: '/o-nama', title: C.metaTitle[locale], description: C.meta[locale], image: '/images/found/na-pcelinjaku-1905.jpg' })
}

export default async function AboutPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const prefix = locale === 'hr' ? '' : `/${locale}`

  return (
    <>
      <JsonLd schema={buildBreadcrumbSchema([
        { name: 'Honey Bee Power', url: localeUrl(locale, '/') },
        { name: C.title[locale], url: localeUrl(locale, '/o-nama') },
      ])} />
      <SectionMotion />

      <section className="frame grid-12 gap-y-8 pb-14 pt-10" aria-labelledby="prica-h1">
        <h1 id="prica-h1" className="t-display col-span-12 lg:col-span-7">{C.title[locale]}</h1>
        <p className="col-span-12 self-end t-lead lg:col-span-5">{C.lead[locale]}</p>
      </section>

      <div className="relative mx-[var(--gutter)] aspect-[16/9] overflow-hidden bg-surface md:aspect-[21/9]">
        <Image src="/images/found/na-pcelinjaku-1905.jpg" alt={C.paintingAlt[locale]} fill priority sizes="100vw" className="object-cover" data-product-image />
      </div>

      <section className="frame section" aria-labelledby="proizvodac-title">
        <div className="grid-12 gap-y-6">
          <h2 id="proizvodac-title" data-reveal className="t-head col-span-12 md:col-span-5">{C.makerTitle[locale]}</h2>
          <div data-reveal className="col-span-12 md:col-span-7">
            <p className="text-[length:var(--text-lead)] leading-[1.3]">{C.makerText[locale]}</p>
            <p className="mt-6 t-small">{MANUFACTURER.name}, {MANUFACTURER.address}</p>
          </div>
        </div>
      </section>

      <section className="on-ink" aria-labelledby="distributer-title">
        <div className="frame grid-12 gap-y-8 py-20 md:py-28">
          <div className="relative col-span-12 aspect-square md:col-span-4">
            <Image src="/images/found/pcelinjak-1939.jpg" alt={C.photoAlt[locale]} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover grayscale" />
          </div>
          <div className="col-span-12 md:col-span-7 md:col-start-6">
            <h2 id="distributer-title" data-reveal className="t-head">{C.usTitle[locale]}</h2>
            <p data-reveal className="mt-8 text-[length:var(--text-lead)] leading-[1.3]">{C.usText[locale]}</p>
            <p className="mt-6 t-small">{LEGAL_ENTITY.nazivTvrtke} · {LEGAL_ENTITY.adresa}, {LEGAL_ENTITY.postanskiBroj} {LEGAL_ENTITY.grad}</p>
          </div>
        </div>
      </section>

      <section className="frame section" aria-labelledby="narucivanje-title">
        <div className="grid-12 gap-y-6">
          <h2 id="narucivanje-title" data-reveal className="t-head col-span-12 md:col-span-6 md:col-start-7 md:order-last">{C.orderTitle[locale]}</h2>
          <div data-reveal className="col-span-12 md:col-span-6">
            <p className="text-[length:var(--text-lead)] leading-[1.3]">{C.orderText[locale]}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href={`${prefix}/proizvodi`} className="btn btn-honey">{C.products[locale]}</Link>
              <Link href={`${prefix}/b2b`} className="btn btn-ghost">{C.b2b[locale]}</Link>
            </div>
          </div>
        </div>
        <p className="mt-16 t-small measure">{C.archive[locale]}</p>
      </section>
    </>
  )
}
