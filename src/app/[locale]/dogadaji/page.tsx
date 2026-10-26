import Link from 'next/link'
import Image from 'next/image'
import type { Locale } from '@/types'
import { pageMetadata, localeUrl } from '@/lib/seo/site'
import { buildBreadcrumbSchema } from '@/lib/seo/schemas'
import { JsonLd } from '@/components/seo/JsonLd'
import { SectionMotion } from '@/components/site/SectionMotion'

export const revalidate = 3600

type T5 = Record<Locale, string>

const KINDS: Record<string, T5> = {
  stand: { hr: 'Promo pult Honey Bee Power s proizvodima na stolu', en: 'Honey Bee Power promo stand with products on the table', de: 'Honey Bee Power Promostand mit Produkten', sl: 'Promocijska stojnica Honey Bee Power z izdelki', pl: 'Stoisko Honey Bee Power z produktami' },
  standVukovar: { hr: 'Promo pult Honey Bee Power u Vukovaru', en: 'Honey Bee Power promo stand in Vukovar', de: 'Honey Bee Power Promostand in Vukovar', sl: 'Stojnica Honey Bee Power v Vukovarju', pl: 'Stoisko Honey Bee Power w Vukovarze' },
  team: { hr: 'Sportaši s ruksacima Honey Bee Power', en: 'Athletes with Honey Bee Power bags', de: 'Sportler mit Honey Bee Power Beuteln', sl: 'Športniki z nahrbtniki Honey Bee Power', pl: 'Sportowcy z workami Honey Bee Power' },
  training: { hr: 'Trening borilačkih sportova', en: 'Combat sports training', de: 'Kampfsporttraining', sl: 'Trening borilnih športov', pl: 'Trening sportów walki' },
  runner: { hr: 'Trkač s Honey Bee Power gelom', en: 'A runner with a Honey Bee Power gel', de: 'Läufer mit Honey Bee Power Gel', sl: 'Tekač z gelom Honey Bee Power', pl: 'Biegacz z żelem Honey Bee Power' },
  shirt: { hr: 'Sportaš u majici Honey Bee Power', en: 'An athlete in a Honey Bee Power shirt', de: 'Sportler im Honey Bee Power Shirt', sl: 'Športnik v majici Honey Bee Power', pl: 'Sportowiec w koszulce Honey Bee Power' },
  products: { hr: 'Proizvodi Honey Bee Power na stolu', en: 'Honey Bee Power products on a table', de: 'Honey Bee Power Produkte auf einem Tisch', sl: 'Izdelki Honey Bee Power na mizi', pl: 'Produkty Honey Bee Power na stole' },
  handball: { hr: 'Rukometna ekipa u dresovima Honey Bee Power', en: 'A handball team in Honey Bee Power shirts', de: 'Handballmannschaft in Honey Bee Power Trikots', sl: 'Rokometna ekipa v dresih Honey Bee Power', pl: 'Drużyna piłki ręcznej w koszulkach Honey Bee Power' },
  jersey: { hr: 'Predaja dresa s brojem 26', en: 'Handing over a shirt with number 26', de: 'Übergabe eines Trikots mit der Nummer 26', sl: 'Predaja dresa s številko 26', pl: 'Przekazanie koszulki z numerem 26' },
  building: { hr: 'Dvoje ljudi ispred staklene poslovne zgrade', en: 'Two people in front of a glass office building', de: 'Zwei Personen vor einem Bürogebäude aus Glas', sl: 'Dva človeka pred stekleno poslovno stavbo', pl: 'Dwie osoby przed szklanym budynkiem' },
}

const PHOTOS: Array<{ n: number; kind: keyof typeof KINDS; w: number; h: number }> = [
  { n: 11, kind: 'standVukovar', w: 2000, h: 1500 }, { n: 12, kind: 'runner', w: 1500, h: 2000 }, { n: 24, kind: 'handball', w: 1600, h: 721 },
  { n: 4, kind: 'team', w: 1600, h: 1200 }, { n: 13, kind: 'training', w: 1600, h: 900 }, { n: 16, kind: 'standVukovar', w: 2000, h: 1500 },
  { n: 20, kind: 'shirt', w: 1500, h: 2000 }, { n: 9, kind: 'team', w: 2000, h: 1500 }, { n: 7, kind: 'products', w: 1125, h: 2000 },
  { n: 17, kind: 'standVukovar', w: 2000, h: 1500 }, { n: 23, kind: 'runner', w: 1200, h: 1600 }, { n: 5, kind: 'team', w: 1600, h: 1200 },
  { n: 14, kind: 'training', w: 900, h: 1600 }, { n: 18, kind: 'standVukovar', w: 2000, h: 1500 }, { n: 10, kind: 'team', w: 2000, h: 1500 },
  { n: 6, kind: 'training', w: 900, h: 1600 }, { n: 19, kind: 'standVukovar', w: 2000, h: 1500 }, { n: 15, kind: 'team', w: 1600, h: 1200 },
  { n: 21, kind: 'stand', w: 2000, h: 1500 }, { n: 8, kind: 'team', w: 1500, h: 2000 }, { n: 22, kind: 'stand', w: 2000, h: 1500 },
  { n: 25, kind: 'team', w: 1500, h: 2000 }, { n: 1, kind: 'jersey', w: 2000, h: 1500 }, { n: 2, kind: 'jersey', w: 2000, h: 1500 },
  { n: 3, kind: 'building', w: 2000, h: 1500 },
]

const C = {
  title: { hr: 'Događaji', en: 'Events', de: 'Veranstaltungen', sl: 'Dogodki', pl: 'Wydarzenia' },
  metaTitle: { hr: 'Događaji: Honey Bee Power na utrkama', en: 'Events: Honey Bee Power at races', de: 'Veranstaltungen: Honey Bee Power bei Rennen', sl: 'Dogodki: Honey Bee Power na tekmah', pl: 'Wydarzenia: Honey Bee Power na zawodach' },
  meta: { hr: 'Honey Bee Power na utrkama, treninzima i utakmicama: promo pult na Vukovarskom maratonu i fotografije s događaja. Popis događaja s datumima uskoro.', en: 'Honey Bee Power at races, training sessions and matches: a promo stand at the Vukovar marathon and photos from events. Dated event list coming soon.', de: 'Honey Bee Power bei Rennen, Trainings und Spielen: Promostand beim Vukovar-Marathon und Fotos. Terminliste folgt.', sl: 'Honey Bee Power na tekmah, treningih in srečanjih: stojnica na vukovarskem maratonu in fotografije. Seznam z datumi kmalu.', pl: 'Honey Bee Power na zawodach, treningach i meczach: stoisko na maratonie w Vukovarze i zdjęcia. Lista z datami wkrótce.' },
  lead: { hr: 'Promo pult na Vukovarskom maratonu, treninzi i utakmice. Fotografije su s naših događaja.', en: 'A promo stand at the Vukovar marathon, training sessions and matches. The photos are from our events.', de: 'Ein Promostand beim Vukovar-Marathon, Trainings und Spiele. Die Fotos stammen von unseren Veranstaltungen.', sl: 'Stojnica na vukovarskem maratonu, treningi in tekme. Fotografije so z naših dogodkov.', pl: 'Stoisko na maratonie w Vukovarze, treningi i mecze. Zdjęcia pochodzą z naszych wydarzeń.' },
  upcoming: { hr: 'Sljedeći događaji', en: 'Upcoming events', de: 'Nächste Termine', sl: 'Prihodnji dogodki', pl: 'Najbliższe wydarzenia' },
  empty: { hr: 'Popis događaja s datumima i mjestima objavit ćemo čim bude potvrđen. Organiziraš utrku ili turnir? Javi nam se.', en: 'We will publish a list of events with dates and places as soon as it is confirmed. Organising a race or tournament? Get in touch.', de: 'Eine Liste mit Daten und Orten veröffentlichen wir, sobald sie bestätigt ist. Du organisierst ein Rennen oder Turnier? Melde dich.', sl: 'Seznam dogodkov z datumi in kraji objavimo, ko bo potrjen. Organiziraš tekmo ali turnir? Oglasi se.', pl: 'Listę wydarzeń z datami i miejscami opublikujemy, gdy zostanie potwierdzona. Organizujesz bieg lub turniej? Odezwij się.' },
  contact: { hr: 'Kontakt', en: 'Contact', de: 'Kontakt', sl: 'Kontakt', pl: 'Kontakt' },
  gallery: { hr: 'Fotografije', en: 'Photos', de: 'Fotos', sl: 'Fotografije', pl: 'Zdjęcia' },
} satisfies Record<string, T5>

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  return pageMetadata({ locale, path: '/dogadaji', title: C.metaTitle[locale], description: C.meta[locale], image: '/images/og/dogadaji.jpg' })
}

export default async function EventsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const prefix = locale === 'hr' ? '' : `/${locale}`

  return (
    <>
      <JsonLd schema={buildBreadcrumbSchema([
        { name: 'Honey Bee Power', url: localeUrl(locale, '/') },
        { name: C.title[locale], url: localeUrl(locale, '/dogadaji') },
      ])} />
      <SectionMotion />

      <section className="grid-12 items-stretch" aria-labelledby="dogadaji-title">
        <div className="frame col-span-12 flex flex-col justify-end gap-6 py-12 md:col-span-5">
          <h1 id="dogadaji-title" className="t-display">{C.title[locale]}</h1>
          <p className="t-lead">{C.lead[locale]}</p>
        </div>
        <div className="relative col-span-12 min-h-[60svh] md:col-span-7">
          <Image src="/images/events-web/event-11.jpg" alt={KINDS.standVukovar[locale]} fill priority sizes="(min-width: 768px) 58vw, 100vw" className="object-cover" data-product-image />
        </div>
      </section>

      <section className="on-ink" aria-labelledby="sljedeci-title">
        <div className="frame grid-12 gap-y-6 py-16 md:py-20">
          <h2 id="sljedeci-title" className="t-head col-span-12 md:col-span-5">{C.upcoming[locale]}</h2>
          <div className="col-span-12 md:col-span-7">
            <p className="t-lead">{C.empty[locale]}</p>
            <Link href={`${prefix}/kontakt`} className="btn btn-honey mt-8">{C.contact[locale]}</Link>
          </div>
        </div>
      </section>

      <section className="frame section" aria-labelledby="galerija-title">
        <h2 id="galerija-title" className="t-head">{C.gallery[locale]}</h2>
        <ul className="mt-12 columns-2 gap-2 md:columns-3 lg:columns-4 [&>li]:mb-2">
          {PHOTOS.map((p) => (
            <li key={p.n} className="break-inside-avoid" data-reveal>
              <figure>
                <Image
                  src={`/images/events-web/event-${p.n}.jpg`}
                  alt={KINDS[p.kind][locale]}
                  width={p.w}
                  height={p.h}
                  sizes="(min-width: 1024px) 24vw, (min-width: 768px) 32vw, 48vw"
                  className="w-full"
                />
              </figure>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
