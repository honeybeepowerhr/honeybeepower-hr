import type { Locale } from '@/types'
import type { L10n } from '@/lib/declarations'

/**
 * Sadržaj stranica proizvoda po vrsti (gel, izotonik, whey). Samo činjenice
 * iz redizajn/podaci-deklaracije.json i službenog cjenika; što nedostaje
 * Prijevodi čekaju provjeru.
 */

export type ProductKind = 'gel' | 'isotonic' | 'whey'

export interface FaqItem {
  q: L10n
  a: L10n
}

export const SPORTS = [
  { slug: 'trcanje', name: { hr: 'Trčanje', en: 'Running', de: 'Laufen', sl: 'Tek', pl: 'Bieganie' } },
  { slug: 'biciklizam', name: { hr: 'Biciklizam', en: 'Cycling', de: 'Radsport', sl: 'Kolesarjenje', pl: 'Kolarstwo' } },
  { slug: 'triatlon', name: { hr: 'Triatlon', en: 'Triathlon', de: 'Triathlon', sl: 'Triatlon', pl: 'Triathlon' } },
  { slug: 'planinarenje', name: { hr: 'Planinarenje', en: 'Hiking', de: 'Wandern', sl: 'Pohodništvo', pl: 'Turystyka górska' } },
  { slug: 'teretana', name: { hr: 'Teretana', en: 'Gym', de: 'Fitnessstudio', sl: 'Fitnes', pl: 'Siłownia' } },
  { slug: 'ekipni-sportovi', name: { hr: 'Ekipni sportovi', en: 'Team sports', de: 'Mannschaftssport', sl: 'Ekipni športi', pl: 'Sporty drużynowe' } },
] as const

export type SportSlug = (typeof SPORTS)[number]['slug']

export const SPORTS_BY_KIND: Record<ProductKind, SportSlug[]> = {
  gel: ['trcanje', 'biciklizam', 'triatlon', 'planinarenje', 'ekipni-sportovi'],
  isotonic: ['trcanje', 'biciklizam', 'triatlon', 'planinarenje', 'ekipni-sportovi'],
  whey: ['teretana', 'ekipni-sportovi', 'trcanje', 'biciklizam'],
}

export const KIND_LABEL: Record<ProductKind, L10n> = {
  gel: { hr: 'Energetski gel', en: 'Energy gel', de: 'Energiegel', sl: 'Energijski gel', pl: 'Żel energetyczny' },
  isotonic: { hr: 'Izotonični napitak', en: 'Isotonic drink', de: 'Isotonisches Getränk', sl: 'Izotonični napitek', pl: 'Napój izotoniczny' },
  whey: { hr: 'Whey protein', en: 'Whey protein', de: 'Whey Protein', sl: 'Whey protein', pl: 'Białko serwatkowe' },
}

export const KIND_CATEGORY: Record<ProductKind, string> = {
  gel: 'energetski-gelovi',
  isotonic: 'izotonicki-napitci',
  whey: 'whey-proteini',
}

export function kindForCategory(category: string): ProductKind {
  if (category === 'izotonicki-napitci') return 'isotonic'
  if (category === 'whey-proteini') return 'whey'
  return 'gel'
}

const T = (hr: string, en: string, de: string, sl: string, pl: string): L10n => ({ hr, en, de, sl, pl })

export const PRODUCT_FAQ: Record<ProductKind, FaqItem[]> = {
  gel: [
    {
      q: T('Kada se uzima gel?', 'When do I take the gel?', 'Wann nimmt man das Gel?', 'Kdaj se gel uživa?', 'Kiedy przyjmować żel?'),
      a: T(
        'Prema deklaraciji: 1 obrok (40 g) nakon vježbanja ili fizičkog napora. Gel je namijenjen odraslima nakon vrlo intenzivnog ili dugotrajnog vježbanja.',
        'According to the label: 1 serving (40 g) after exercise or physical exertion. The gel is intended for adults after very intensive or long-lasting exercise.',
        'Laut Etikett: 1 Portion (40 g) nach dem Training oder körperlicher Anstrengung. Das Gel ist für Erwachsene nach sehr intensiver oder langer Belastung bestimmt.',
        'Po deklaraciji: 1 obrok (40 g) po vadbi ali telesnem naporu. Gel je namenjen odraslim po zelo intenzivni ali dolgotrajni vadbi.',
        'Według etykiety: 1 porcja (40 g) po ćwiczeniach lub wysiłku fizycznym. Żel jest przeznaczony dla dorosłych po bardzo intensywnym lub długotrwałym wysiłku.',
      ),
    },
    {
      q: T('Ima li gel kofeina?', 'Does the gel contain caffeine?', 'Enthält das Gel Koffein?', 'Ali gel vsebuje kofein?', 'Czy żel zawiera kofeinę?'),
      a: T(
        'Gel sadrži 1 % ekstrakta sjemenki guarane, a guarana sadrži kofein. Ne preporučuje se osobama osjetljivim na kofein, trudnicama, dojiljama i djeci.',
        'The gel contains 1% guarana seed extract, and guarana contains caffeine. Not recommended for people sensitive to caffeine, pregnant or breastfeeding women, or children.',
        'Das Gel enthält 1 % Guaranasamenextrakt, und Guarana enthält Koffein. Nicht empfohlen für koffeinempfindliche Personen, Schwangere, Stillende und Kinder.',
        'Gel vsebuje 1 % izvlečka semen guarane, guarana pa vsebuje kofein. Ni priporočljivo za osebe, občutljive na kofein, nosečnice, doječe matere in otroke.',
        'Żel zawiera 1% ekstraktu z nasion guarany, a guarana zawiera kofeinę. Nie zaleca się osobom wrażliwym na kofeinę, kobietom w ciąży, karmiącym piersią oraz dzieciom.',
      ),
    },
    {
      q: T('Imaju li svi okusi isti sastav?', 'Do all flavours have the same ingredients?', 'Haben alle Sorten dieselben Zutaten?', 'Ali imajo vsi okusi enako sestavo?', 'Czy wszystkie smaki mają ten sam skład?'),
      a: T(
        'Ne posve. Naranča: med 95,5 %, naranča 3 %, guarana 1 %, morska sol 0,5 %. Limun: med 94,5 %, limun 4 %, guarana 1 %, morska sol 0,5 %. Malina: med 91 %, malina 8 %, guarana 1 %, bez soli.',
        'Not quite. Orange: honey 95.5%, orange 3%, guarana 1%, sea salt 0.5%. Lemon: honey 94.5%, lemon 4%, guarana 1%, sea salt 0.5%. Raspberry: honey 91%, raspberry 8%, guarana 1%, no salt.',
        'Nicht ganz. Orange: Honig 95,5 %, Orange 3 %, Guarana 1 %, Meersalz 0,5 %. Zitrone: Honig 94,5 %, Zitrone 4 %, Guarana 1 %, Meersalz 0,5 %. Himbeere: Honig 91 %, Himbeere 8 %, Guarana 1 %, ohne Salz.',
        'Ne povsem. Pomaranča: med 95,5 %, pomaranča 3 %, guarana 1 %, morska sol 0,5 %. Limona: med 94,5 %, limona 4 %, guarana 1 %, morska sol 0,5 %. Malina: med 91 %, malina 8 %, guarana 1 %, brez soli.',
        'Nie do końca. Pomarańcza: miód 95,5%, pomarańcza 3%, guarana 1%, sól morska 0,5%. Cytryna: miód 94,5%, cytryna 4%, guarana 1%, sól morska 0,5%. Malina: miód 91%, malina 8%, guarana 1%, bez soli.',
      ),
    },
    {
      q: T('Ima li gel sukralozu ili umjetne boje?', 'Does the gel contain sucralose or artificial colours?', 'Enthält das Gel Sucralose oder künstliche Farbstoffe?', 'Ali gel vsebuje sukralozo ali umetna barvila?', 'Czy żel zawiera sukralozę lub sztuczne barwniki?'),
      a: T(
        'Ne. Na deklaraciji su samo višecvjetni med, liofilizirano voće, ekstrakt sjemenki guarane i (osim kod maline) morska sol.',
        'No. The label lists only multifloral honey, freeze-dried fruit, guarana seed extract and (except raspberry) sea salt.',
        'Nein. Auf dem Etikett stehen nur Mehrblütenhonig, gefriergetrocknete Früchte, Guaranasamenextrakt und (außer bei Himbeere) Meersalz.',
        'Ne. Na deklaraciji so samo večcvetni med, liofilizirano sadje, izvleček semen guarane in (razen pri malini) morska sol.',
        'Nie. Na etykiecie są tylko miód wielokwiatowy, liofilizowane owoce, ekstrakt z nasion guarany i (poza maliną) sól morska.',
      ),
    },
    {
      q: T('Kako se čuva?', 'How should it be stored?', 'Wie lagert man es?', 'Kako se shranjuje?', 'Jak przechowywać?'),
      a: T(
        'Na sobnoj temperaturi (do 25 °C), izvan dohvata male djece.',
        'At room temperature (up to 25 °C), out of reach of young children.',
        'Bei Raumtemperatur (bis 25 °C), außerhalb der Reichweite kleiner Kinder.',
        'Pri sobni temperaturi (do 25 °C), nedosegljivo majhnim otrokom.',
        'W temperaturze pokojowej (do 25 °C), w miejscu niedostępnym dla małych dzieci.',
      ),
    },
    {
      q: T('Mogu li naručiti veću količinu?', 'Can I order a larger quantity?', 'Kann ich größere Mengen bestellen?', 'Ali lahko naročim večjo količino?', 'Czy mogę zamówić większą ilość?'),
      a: T(
        'Da. Postoji paket od 10 gelova istog okusa, a klubovi i trgovine mogu poslati B2B upit s količinama.',
        'Yes. There is a pack of 10 gels of one flavour, and clubs and shops can send a B2B enquiry with quantities.',
        'Ja. Es gibt ein 10er-Paket einer Sorte, und Vereine und Geschäfte können eine B2B-Anfrage mit Mengen senden.',
        'Da. Obstaja paket 10 gelov enakega okusa, klubi in trgovine pa lahko pošljejo B2B povpraševanje s količinami.',
        'Tak. Jest zestaw 10 żeli w jednym smaku, a kluby i sklepy mogą wysłać zapytanie B2B z ilościami.',
      ),
    },
  ],
  isotonic: [
    {
      q: T('Što je u izotoniku?', 'What is in the isotonic drink?', 'Was ist im isotonischen Getränk?', 'Kaj je v izotoniku?', 'Co zawiera izotonik?'),
      a: T(
        'Prema deklaraciji 100 g praha ima 90 g ugljikohidrata, od toga 5,5 g šećera.',
        'According to the label, 100 g of powder contains 90 g of carbohydrate, of which 5.5 g sugars.',
        'Laut Etikett enthalten 100 g Pulver 90 g Kohlenhydrate, davon 5,5 g Zucker.',
        'Po deklaraciji 100 g praška vsebuje 90 g ogljikovih hidratov, od tega 5,5 g sladkorjev.',
        'Według etykiety 100 g proszku zawiera 90 g węglowodanów, w tym 5,5 g cukrów.',
      ),
    },
    {
      q: T('Koliko ugljikohidrata ima porcija?', 'How much carbohydrate is in a serving?', 'Wie viele Kohlenhydrate hat eine Portion?', 'Koliko ogljikovih hidratov ima obrok?', 'Ile węglowodanów ma porcja?'),
      a: T(
        'Porcija od 15 g ima 13,5 g ugljikohidrata (90 g na 100 g praha).',
        'A 15 g serving has 13.5 g of carbohydrate (90 g per 100 g of powder).',
        'Eine 15-g-Portion hat 13,5 g Kohlenhydrate (90 g pro 100 g Pulver).',
        '15-gramski obrok ima 13,5 g ogljikovih hidratov (90 g na 100 g praška).',
        'Porcja 15 g ma 13,5 g węglowodanów (90 g na 100 g proszku).',
      ),
    },
    {
      q: T('Postoji li manje pakiranje?', 'Is there a smaller pack?', 'Gibt es eine kleinere Packung?', 'Ali obstaja manjše pakiranje?', 'Czy jest mniejsze opakowanie?'),
      a: T(
        'Da, vrećica od 15 g, u službenom cjeniku po {price}.',
        'Yes, a 15 g sachet, listed at {price} in the official price list.',
        'Ja, ein 15-g-Beutel, laut offizieller Preisliste {price}.',
        'Da, vrečka 15 g, v uradnem ceniku po {price}.',
        'Tak, saszetka 15 g, w oficjalnym cenniku {price}.',
      ),
    },
  ],
  whey: [
    {
      q: T('Čime je whey zaslađen?', 'What sweetens the whey?', 'Womit ist das Whey gesüßt?', 'S čim je whey sladkan?', 'Czym słodzone jest whey?'),
      a: T(
        'Sušenim medom (6 %) i stevijom. Nije zaslađen samo medom.',
        'Dried honey (6%) and stevia. It is not sweetened with honey alone.',
        'Mit getrocknetem Honig (6 %) und Stevia. Es ist nicht nur mit Honig gesüßt.',
        'S sušenim medom (6 %) in stevio. Ni sladkan samo z medom.',
        'Suszonym miodem (6%) i stewią. Nie jest słodzone wyłącznie miodem.',
      ),
    },
    {
      q: T('Sadrži li alergene?', 'Does it contain allergens?', 'Enthält es Allergene?', 'Ali vsebuje alergene?', 'Czy zawiera alergeny?'),
      a: T('Da, mlijeko.', 'Yes, milk.', 'Ja, Milch.', 'Da, mleko.', 'Tak, mleko.'),
    },
    {
      q: T('Koliko proteina ima porcija?', 'How much protein is in a serving?', 'Wie viel Protein hat eine Portion?', 'Koliko beljakovin ima obrok?', 'Ile białka ma porcja?'),
      a: T(
        'Oko 22 g u porciji od 33 g (67–69 g na 100 g, ovisno o okusu). Podaci su iz prezentacije proizvođača; deklaraciju potvrđujemo.',
        'About 22 g per 33 g serving (67–69 g per 100 g, depending on flavour). Figures are from the producer’s presentation; we are confirming the label.',
        'Etwa 22 g pro 33-g-Portion (67–69 g pro 100 g, je nach Sorte). Angaben aus der Präsentation des Herstellers; das Etikett wird geprüft.',
        'Približno 22 g v 33-gramskem obroku (67–69 g na 100 g, odvisno od okusa). Podatki so iz predstavitve proizvajalca; deklaracijo preverjamo.',
        'Około 22 g w porcji 33 g (67–69 g na 100 g, zależnie od smaku). Dane z prezentacji producenta; etykietę weryfikujemy.',
      ),
    },
    {
      q: T('Postoji li manje pakiranje?', 'Is there a smaller pack?', 'Gibt es eine kleinere Packung?', 'Ali obstaja manjše pakiranje?', 'Czy jest mniejsze opakowanie?'),
      a: T(
        'Da, vrećica od 33 g, u službenom cjeniku po {price}.',
        'Yes, a 33 g sachet, listed at {price} in the official price list.',
        'Ja, ein 33-g-Beutel, laut offizieller Preisliste {price}.',
        'Da, vrečka 33 g, v uradnem ceniku po {price}.',
        'Tak, saszetka 33 g, w oficjalnym cenniku {price}.',
      ),
    },
  ],
}

/** Kratak tekst za pakete (vlastiti sadržaj, ne kopija pojedinačnog gela). */
export const PACK_TEXT: L10n = {
  hr: 'Deset gelova istog okusa u jednoj kutiji, za tjedan treninga ili za klub. Sastav, nutritivne vrijednosti i upozorenje isti su kao kod pojedinačnog gela.',
  en: 'Ten gels of one flavour in a single box, for a week of training or for a club. Ingredients, nutrition and warning are the same as for the single gel.',
  de: 'Zehn Gels einer Sorte in einer Box, für eine Trainingswoche oder für den Verein. Zutaten, Nährwerte und Warnhinweis wie beim einzelnen Gel.',
  sl: 'Deset gelov enakega okusa v eni škatli, za teden treningov ali za klub. Sestava, hranilna vrednost in opozorilo so enaki kot pri posameznem gelu.',
  pl: 'Dziesięć żeli w jednym smaku w jednym pudełku, na tydzień treningów lub dla klubu. Skład, wartości odżywcze i ostrzeżenie są takie same jak dla pojedynczego żelu.',
}

export function l(text: L10n, locale: Locale): string {
  return text[locale] ?? text.hr
}
