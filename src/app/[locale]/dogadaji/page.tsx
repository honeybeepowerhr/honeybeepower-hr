import Link from 'next/link'
import type { Locale } from '@/types'
import { pageMetadata, localeUrl } from '@/lib/seo/site'
import { buildBreadcrumbSchema } from '@/lib/seo/schemas'
import { JsonLd } from '@/components/seo/JsonLd'
import { SectionMotion } from '@/components/site/SectionMotion'

export const revalidate = 3600

type T5 = Record<Locale, string>

const C = {
  title: { hr: 'Događaji', en: 'Events', de: 'Veranstaltungen', sl: 'Dogodki', pl: 'Wydarzenia' },
  metaTitle: { hr: 'Događaji: Honey Bee Power na utrkama', en: 'Events: Honey Bee Power at races', de: 'Veranstaltungen: Honey Bee Power bei Rennen', sl: 'Dogodki: Honey Bee Power na tekmah', pl: 'Wydarzenia: Honey Bee Power na zawodach' },
  meta: { hr: 'Honey Bee Power na utrkama, treninzima i utakmicama: promo pult na Vukovarskom maratonu i fotografije s događaja. Popis događaja s datumima uskoro.', en: 'Honey Bee Power at races, training sessions and matches: a promo stand at the Vukovar marathon and photos from events. Dated event list coming soon.', de: 'Honey Bee Power bei Rennen, Trainings und Spielen: Promostand beim Vukovar-Marathon und Fotos. Terminliste folgt.', sl: 'Honey Bee Power na tekmah, treningih in srečanjih: stojnica na vukovarskem maratonu in fotografije. Seznam z datumi kmalu.', pl: 'Honey Bee Power na zawodach, treningach i meczach: stoisko na maratonie w Vukovarze i zdjęcia. Lista z datami wkrótce.' },
  lead: { hr: 'Promo pult na Vukovarskom maratonu, treninzi i utakmice. Fotografije su s naših događaja.', en: 'A promo stand at the Vukovar marathon, training sessions and matches. The photos are from our events.', de: 'Ein Promostand beim Vukovar-Marathon, Trainings und Spiele. Die Fotos stammen von unseren Veranstaltungen.', sl: 'Stojnica na vukovarskem maratonu, treningi in tekme. Fotografije so z naših dogodkov.', pl: 'Stoisko na maratonie w Vukovarze, treningi i mecze. Zdjęcia pochodzą z naszych wydarzeń.' },
  upcoming: { hr: 'Sljedeći događaji', en: 'Upcoming events', de: 'Nächste Termine', sl: 'Prihodnji dogodki', pl: 'Najbliższe wydarzenia' },
  empty: { hr: 'Popis događaja s datumima i mjestima objavit ćemo čim bude potvrđen. Organiziraš utrku ili turnir? Javi nam se.', en: 'We will publish a list of events with dates and places as soon as it is confirmed. Organising a race or tournament? Get in touch.', de: 'Eine Liste mit Daten und Orten veröffentlichen wir, sobald sie bestätigt ist. Du organisierst ein Rennen oder Turnier? Melde dich.', sl: 'Seznam dogodkov z datumi in kraji objavimo, ko bo potrjen. Organiziraš tekmo ali turnir? Oglasi se.', pl: 'Listę wydarzeń z datami i miejscami opublikujemy, gdy zostanie potwierdzona. Organizujesz bieg lub turniej? Odezwij się.' },
  contact: { hr: 'Kontakt', en: 'Contact', de: 'Kontakt', sl: 'Kontakt', pl: 'Kontakt' },
  gallery: { hr: 'Fotografije', en: 'Photos', de: 'Fotos', sl: 'Fotografije', pl: 'Zdjęcia' },
  galleryText: { hr: 'Fotografije s utrka, treninga i promo pultova skupljene su u galeriji.', en: 'Photos from races, training sessions and promo stands are collected in the gallery.', de: 'Fotos von Rennen, Trainings und Promoständen findest du in der Galerie.', sl: 'Fotografije s tekmovanj, treningov in promocijskih stojnic so zbrane v galeriji.', pl: 'Zdjęcia z zawodów, treningów i stoisk promocyjnych są zebrane w galerii.' },
  galleryCta: { hr: 'Otvori galeriju', en: 'Open the gallery', de: 'Galerie öffnen', sl: 'Odpri galerijo', pl: 'Otwórz galerię' },
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

      <section className="frame grid-12 gap-y-6 pb-12 pt-10 md:pb-16" aria-labelledby="dogadaji-title">
        <h1 id="dogadaji-title" className="t-display col-span-12 lg:col-span-6">{C.title[locale]}</h1>
        <p className="col-span-12 self-end t-lead lg:col-span-6">{C.lead[locale]}</p>
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
        <div className="grid-12 items-end gap-y-6">
          <h2 id="galerija-title" className="t-head col-span-12 lg:col-span-7">{C.gallery[locale]}</h2>
          <div className="col-span-12 lg:col-span-5">
            <p className="t-body max-w-[38ch] text-muted">{C.galleryText[locale]}</p>
            <Link href={`${prefix}/galerija`} className="btn btn-honey mt-6">
              {C.galleryCta[locale]}
              <span className="btn-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
