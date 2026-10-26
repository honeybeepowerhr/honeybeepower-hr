import Link from 'next/link'
import type { Metadata } from 'next'
import type { Locale } from '@/types'
import { pageMetadata, localeUrl } from '@/lib/seo/site'
import { buildBreadcrumbSchema, buildFAQPageSchema } from '@/lib/seo/schemas'
import { JsonLd } from '@/components/seo/JsonLd'
import { RecoveryCalculator } from '@/components/site/RecoveryCalculator'
import { FaqList } from '@/components/site/FaqList'
import { SectionMotion } from '@/components/site/SectionMotion'
import { GEL_APPROVED_CLAIM, GEL_DIRECTIONS } from '@/lib/declarations'
import { SOURCES } from '@/lib/sports-data'

export const revalidate = 3600

type T5 = Record<Locale, string>

const C: Record<string, T5> = {
  h1: { hr: 'Oporavak nakon treninga', en: 'Recovery after training', de: 'Erholung nach dem Training', sl: 'Obnova po treningu', pl: 'Regeneracja po treningu' },
  metaTitle: { hr: 'Kalkulator: ugljikohidrati za oporavak', en: 'Calculator: carbohydrate for recovery', de: 'Rechner: Kohlenhydrate zur Erholung', sl: 'Kalkulator: ogljikovi hidrati za obnovo', pl: 'Kalkulator: węglowodany na regenerację' },
  metaDescription: {
    hr: 'Koliko ugljikohidrata trebaš nakon vrlo intenzivnog ili dugotrajnog napora: 4 g po kg u prva 4 sata. Izračun po tjelesnoj težini i udio jednog gela.',
    en: 'How much carbohydrate you need after very intensive or long exercise: 4 g per kg in the first 4 hours. Calculated by body weight, with the share of one gel.',
    de: 'Wie viele Kohlenhydrate nach sehr intensiver oder langer Belastung: 4 g pro kg in den ersten 4 Stunden. Berechnung nach Körpergewicht.',
    sl: 'Koliko ogljikovih hidratov po zelo intenzivnem ali dolgem naporu: 4 g na kg v prvih 4 urah. Izračun po telesni masi in delež enega gela.',
    pl: 'Ile węglowodanów po bardzo intensywnym lub długim wysiłku: 4 g na kg w ciągu 4 godzin. Obliczenie według masy ciała i udział jednego żelu.',
  },
  whyTitle: { hr: 'Odakle 4 g po kilogramu?', en: 'Where does 4 g per kilogram come from?', de: 'Woher kommen 4 g pro Kilogramm?', sl: 'Od kod 4 g na kilogram?', pl: 'Skąd 4 g na kilogram?' },
  whyText: {
    hr: 'Iz uvjeta odobrene zdravstvene tvrdnje za ugljikohidrate (Uredba (EU) br. 432/2012), koja stoji i na deklaraciji Honey Bee Power gela. Koristan učinak dobiva se uz ukupno 4 g ugljikohidrata po kilogramu tjelesne težine, iz svih izvora, u dozama, u prva 4 sata i najkasnije 6 sati nakon napora.',
    en: 'From the condition of the authorised health claim for carbohydrates (Regulation (EU) No 432/2012), which is also printed on the Honey Bee Power gel label. The beneficial effect is obtained with a total of 4 g of carbohydrate per kilogram of body weight, from all sources, in doses, within the first 4 hours and no later than 6 hours after exercise.',
    de: 'Aus der Bedingung der zugelassenen gesundheitsbezogenen Angabe für Kohlenhydrate (Verordnung (EU) Nr. 432/2012), die auch auf dem Etikett des Honey Bee Power Gels steht. Die Wirkung stellt sich bei insgesamt 4 g Kohlenhydraten pro Kilogramm Körpergewicht aus allen Quellen, in Dosen, in den ersten 4 Stunden und spätestens nach 6 Stunden ein.',
    sl: 'Iz pogoja odobrene zdravstvene trditve za ogljikove hidrate (Uredba (EU) št. 432/2012), ki je natisnjena tudi na deklaraciji gela Honey Bee Power. Ugoden učinek se doseže s skupno 4 g ogljikovih hidratov na kilogram telesne mase iz vseh virov, v odmerkih, v prvih 4 urah in najpozneje v 6 urah po naporu.',
    pl: 'Z warunku dopuszczonego oświadczenia zdrowotnego dla węglowodanów (rozporządzenie (UE) nr 432/2012), które widnieje też na etykiecie żelu Honey Bee Power. Korzystne działanie występuje przy łącznym spożyciu 4 g węglowodanów na kilogram masy ciała ze wszystkich źródeł, w dawkach, w ciągu pierwszych 4 godzin i najpóźniej 6 godzin po wysiłku.',
  },
  gelTitle: { hr: 'Gel je samo dio', en: 'The gel is only a part', de: 'Das Gel ist nur ein Teil', sl: 'Gel je le del', pl: 'Żel to tylko część' },
  gelText: {
    hr: 'Jedan gel od 40 g daje 29–32,8 g ugljikohidrata, ovisno o okusu. Za osobu od 70 kg to je oko 11 % potrebne količine; ostatak dolazi iz obroka i napitaka. Deklaracija gela:',
    en: 'One 40 g gel provides 29–32.8 g of carbohydrate, depending on flavour. For a 70 kg person that is about 11% of the amount needed; the rest comes from meals and drinks. The gel label says:',
    de: 'Ein 40-g-Gel liefert je nach Sorte 29–32,8 g Kohlenhydrate. Bei 70 kg sind das etwa 11 % der Menge; der Rest kommt aus Mahlzeiten und Getränken. Auf dem Etikett steht:',
    sl: 'En gel 40 g da 29–32,8 g ogljikovih hidratov, odvisno od okusa. Za osebo s 70 kg je to približno 11 % potrebne količine; preostanek pride iz obrokov in napitkov. Deklaracija gela:',
    pl: 'Jeden żel 40 g dostarcza 29–32,8 g węglowodanów, zależnie od smaku. Dla osoby 70 kg to około 11% potrzebnej ilości; reszta pochodzi z posiłków i napojów. Etykieta żelu:',
  },
  faq: { hr: 'Česta pitanja', en: 'Questions', de: 'Häufige Fragen', sl: 'Pogosta vprašanja', pl: 'Częste pytania' },
  q1: { hr: 'Vrijedi li ovo nakon svakog treninga?', en: 'Does this apply after every session?', de: 'Gilt das nach jedem Training?', sl: 'Ali to velja po vsakem treningu?', pl: 'Czy to dotyczy każdego treningu?' },
  a1: {
    hr: 'Ne. Uvjet iz tvrdnje odnosi se na vrlo intenzivno ili dugotrajno vježbanje koje dovodi do umora mišića i trošenja zaliha glikogena, na primjer dugu utrku ili naporan trening izdržljivosti.',
    en: 'No. The claim condition refers to very intensive or long-lasting exercise that leads to muscle fatigue and glycogen depletion, for example a long race or a hard endurance session.',
    de: 'Nein. Die Bedingung bezieht sich auf sehr intensive oder lange Belastung mit Muskelermüdung und Glykogenentleerung, etwa ein langes Rennen oder hartes Ausdauertraining.',
    sl: 'Ne. Pogoj trditve se nanaša na zelo intenzivno ali dolgotrajno vadbo, ki vodi do utrujenosti mišic in izčrpanja glikogena, na primer dolgo tekmo ali naporen vzdržljivostni trening.',
    pl: 'Nie. Warunek dotyczy bardzo intensywnego lub długotrwałego wysiłku prowadzącego do zmęczenia mięśni i wyczerpania glikogenu, np. długiego biegu lub ciężkiego treningu wytrzymałościowego.',
  },
  q2: { hr: 'Moram li sve pojesti odjednom?', en: 'Do I have to eat it all at once?', de: 'Muss ich alles auf einmal essen?', sl: 'Ali moram vse pojesti naenkrat?', pl: 'Czy muszę zjeść wszystko naraz?' },
  a2: {
    hr: 'Ne, u dozama. Kalkulator primjer dijeli količinu na četiri doze: odmah nakon napora te nakon 1, 2 i 3 sata.',
    en: 'No, in doses. The calculator splits the amount into four doses as an example: right after exercise and after 1, 2 and 3 hours.',
    de: 'Nein, in Dosen. Der Rechner teilt die Menge beispielhaft in vier Dosen: direkt danach sowie nach 1, 2 und 3 Stunden.',
    sl: 'Ne, v odmerkih. Kalkulator količino za primer razdeli na štiri odmerke: takoj po naporu ter po 1, 2 in 3 urah.',
    pl: 'Nie, w dawkach. Kalkulator dzieli ilość przykładowo na cztery dawki: zaraz po wysiłku oraz po 1, 2 i 3 godzinach.',
  },
  sources: { hr: 'Izvori', en: 'Sources', de: 'Quellen', sl: 'Viri', pl: 'Źródła' },
  products: { hr: 'Pogledaj gelove', en: 'See the gels', de: 'Gels ansehen', sl: 'Oglej si gele', pl: 'Zobacz żele' },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  return pageMetadata({ locale, path: '/oporavak-nakon-treninga', title: C.metaTitle[locale], description: C.metaDescription[locale], image: '/images/og/oporavak.jpg' })
}

export default async function RecoveryPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const prefix = locale === 'hr' ? '' : `/${locale}`
  const faq = [
    { q: C.q1[locale], a: C.a1[locale] },
    { q: C.q2[locale], a: C.a2[locale] },
  ]

  return (
    <>
      <JsonLd schema={buildBreadcrumbSchema([
        { name: 'Honey Bee Power', url: localeUrl(locale, '/') },
        { name: C.h1[locale], url: localeUrl(locale, '/oporavak-nakon-treninga') },
      ])} />
      <JsonLd schema={buildFAQPageSchema(faq.map((f, i) => ({ _key: String(i), question: { hr: f.q, en: f.q, de: f.q }, answer: { hr: f.a, en: f.a, de: f.a } })), 'hr')} />
      <SectionMotion />

      <section className="on-ink frame py-16 md:py-24" aria-labelledby="oporavak-h1">
        <RecoveryCalculator headingId="oporavak-h1" heading={C.h1[locale]} headingLevel="h1" headingClass="font-[family-name:var(--font-display)] text-[length:var(--text-sub)] font-black leading-none tracking-[-0.03em]" />
      </section>

      <section className="frame section" aria-labelledby="zasto-title">
        <div className="grid-12 gap-y-8">
          <h2 id="zasto-title" data-reveal className="t-head col-span-12 lg:col-span-5">{C.whyTitle[locale]}</h2>
          <p data-reveal className="col-span-12 text-[length:var(--text-lead)] leading-[1.3] lg:col-span-7">{C.whyText[locale]}</p>
        </div>
      </section>

      <section className="field-surface" aria-labelledby="gel-title">
        <div className="frame grid-12 gap-y-8 py-20 md:py-28">
          <h2 id="gel-title" data-reveal className="t-head col-span-12 lg:col-span-6 lg:col-start-7 lg:order-last">{C.gelTitle[locale]}</h2>
          <div data-reveal className="col-span-12 lg:col-span-6">
            <p className="text-[length:var(--text-lead)] leading-[1.3]">{C.gelText[locale]}</p>
            <blockquote className="mt-6 t-body measure">„{GEL_DIRECTIONS[locale]}”</blockquote>
            <Link href={`${prefix}/proizvodi/energetski-gelovi`} className="btn btn-ghost mt-8">
              {C.products[locale]} <span className="btn-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="frame section" aria-labelledby="oporavak-faq">
        <FaqList id="oporavak-faq" title={C.faq[locale]} items={faq} />
      </section>

      <footer className="frame pb-24">
        <h2 className="t-body font-medium">{C.sources[locale]}</h2>
        <ol className="mt-3 list-decimal space-y-1 pl-5 t-small">
          {SOURCES.map((s) => (
            <li key={s.url}><a href={s.url} className="link" rel="noopener" target="_blank">{s.label}</a></li>
          ))}
        </ol>
        <p className="mt-4 t-body measure">{GEL_APPROVED_CLAIM[locale]}</p>
      </footer>
    </>
  )
}
