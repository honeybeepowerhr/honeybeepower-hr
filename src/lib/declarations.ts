import type { Locale } from '@/types'

/**
 * Podaci prepisani s deklaracija na poleđini pakiranja
 * (public/images/products/*-zadnja.png) i iz redizajn/podaci-deklaracije.json.
 * Ovo je jedini izvor nutritivnih podataka, sastava i upozorenja na stranici.
 * `null` znači da podatak nedostaje: prikazuje se kao [UPIŠI: …].
 * Prijevodi (en, de, sl, pl) čekaju provjeru izvornih govornika.
 */

export type L10n = Record<Locale, string>

export interface NutritionValues {
  energyKj: number
  energyKcal: number
  fat: number
  saturatedFat?: number | null
  carbohydrates: number
  sugars: number
  fibre?: number | null
  protein: number
  salt: number
  magnesiumMg?: number
  potassiumMg?: number
  sodiumMg?: number
}

export interface Declaration {
  /** Slug pojedinačnog proizvoda; paketi od 10 pokazuju na isti zapis. */
  slug: string
  kind: 'gel' | 'isotonic' | 'whey'
  flavour: L10n
  /** Boja okusa za polja na stranicama proizvoda. */
  flavourColor: string
  /** Pozadina iza fotografije kad fotografija ima vlastitu (bijelu) pozadinu. */
  photoField?: string
  backImage: string | null
  ingredients: L10n | null
  servingGrams: number
  per100g: NutritionValues
  perServing: NutritionValues | null
  allergens: L10n | null
  source: 'deklaracija' | 'prezentacija'
}

/* ------------------------------------------------------------------ */
/* Zajedničko za sve gelove (s deklaracije)                             */
/* ------------------------------------------------------------------ */

export const GEL_NAME_ON_LABEL = 'Honey Bee Power Prirodna energetska krema'
export const GEL_NET_GRAMS = 40
/** Količina kofeina po gelu nije navedena na deklaraciji. */
export const GEL_CAFFEINE_MG: number | null = null

export const GEL_APPROVED_CLAIM: L10n = {
  hr: 'Ugljikohidrati pridonose oporavku normalne funkcije mišića (kontrakcije) nakon vrlo intenzivnog i/ili dugotrajnog fizičkog vježbanja koje dovodi do umora mišića i trošenja zaliha glikogena u poprečnoprugastom mišiću. Koristan učinak dobiva se uzimanjem ugljikohidrata iz svih izvora, pri ukupnom uzimanju 4 g po kg tjelesne težine, u dozama, unutar prva 4 sata i najkasnije 6 sati nakon vrlo intenzivnog i/ili dugotrajnog fizičkog vježbanja koje dovodi do umora mišića i iskorištavanja zaliha glikogena u poprečnoprugastom mišiću.',
  en: 'Carbohydrates contribute to the recovery of normal muscle function (contraction) after highly intensive and/or long-lasting physical exercise leading to muscle fatigue and the depletion of glycogen stores in skeletal muscle. The beneficial effect is obtained with the consumption of carbohydrates, from all sources, at a total intake of 4 g per kg body weight, at doses, within the first 4 hours and no later than 6 hours following highly intensive and/or long-lasting physical exercise leading to muscle fatigue and the depletion of glycogen stores in skeletal muscle.',
  de: 'Kohlenhydrate tragen zur Wiederherstellung der normalen Muskelfunktion (Kontraktion) nach höchst intensiver und/oder langer körperlicher Betätigung bei, die zu Muskelermüdung und zur Erschöpfung der Glykogenspeicher im Skelettmuskel führt. Die positive Wirkung stellt sich bei Verzehr von Kohlenhydraten aus allen Quellen in einer Gesamtmenge von 4 g je kg Körpergewicht in Dosen innerhalb der ersten 4 Stunden und spätestens 6 Stunden nach höchst intensiver und/oder langer körperlicher Betätigung ein, die zu Muskelermüdung und zur Erschöpfung der Glykogenspeicher im Skelettmuskel führt.',
  sl: 'Ogljikovi hidrati prispevajo k obnovitvi normalnega delovanja mišic (krčenje) po zelo intenzivni in/ali dolgotrajni telesni vadbi, ki vodi do utrujenosti mišic in izčrpanja zalog glikogena v skeletnih mišicah. Ugoden učinek se doseže z uživanjem ogljikovih hidratov iz vseh virov v skupni količini 4 g na kg telesne mase, v odmerkih, v prvih 4 urah in najpozneje 6 ur po zelo intenzivni in/ali dolgotrajni telesni vadbi, ki vodi do utrujenosti mišic in izčrpanja zalog glikogena v skeletnih mišicah.',
  pl: 'Węglowodany przyczyniają się do przywrócenia prawidłowej funkcji mięśni (skurczu) po bardzo intensywnym lub długotrwałym wysiłku fizycznym prowadzącym do zmęczenia mięśni i wyczerpania zapasów glikogenu w mięśniach szkieletowych. Korzystne działanie występuje w przypadku spożycia węglowodanów ze wszystkich źródeł w łącznej ilości 4 g na kg masy ciała, w dawkach, w ciągu pierwszych 4 godzin i nie później niż 6 godzin po bardzo intensywnym lub długotrwałym wysiłku fizycznym prowadzącym do zmęczenia mięśni i wyczerpania zapasów glikogenu w mięśniach szkieletowych.',
}

export const GEL_DIRECTIONS: L10n = {
  hr: 'Uzeti 1 obrok (40 g) nakon vježbanja ili fizičkog napora. Proizvod je namijenjen odraslim osobama koje su vrlo intenzivno ili dugotrajno fizički vježbale, što je dovelo do umora mišića i trošenja zaliha glikogena u poprečnoprugastom mišiću.',
  en: 'Take 1 serving (40 g) after exercise or physical exertion. The product is intended for adults who have done very intensive or long-lasting physical exercise that has led to muscle fatigue and the depletion of glycogen stores in skeletal muscle.',
  de: '1 Portion (40 g) nach dem Training oder nach körperlicher Anstrengung einnehmen. Das Produkt ist für Erwachsene bestimmt, die sehr intensiv oder lange körperlich trainiert haben, was zu Muskelermüdung und zur Erschöpfung der Glykogenspeicher im Skelettmuskel geführt hat.',
  sl: 'Zaužijte 1 obrok (40 g) po vadbi ali telesnem naporu. Izdelek je namenjen odraslim, ki so zelo intenzivno ali dolgotrajno telesno vadili, kar je privedlo do utrujenosti mišic in izčrpanja zalog glikogena v skeletnih mišicah.',
  pl: 'Spożyć 1 porcję (40 g) po ćwiczeniach lub wysiłku fizycznym. Produkt przeznaczony jest dla osób dorosłych po bardzo intensywnym lub długotrwałym wysiłku fizycznym, który doprowadził do zmęczenia mięśni i wyczerpania zapasów glikogenu w mięśniach szkieletowych.',
}

export const GEL_WARNING: L10n = {
  hr: 'Ne preporučuje se osobama osjetljivim na kofein, trudnicama, dojiljama i djeci.',
  en: 'Not recommended for people sensitive to caffeine, pregnant or breastfeeding women, or children.',
  de: 'Nicht empfohlen für koffeinempfindliche Personen, Schwangere, Stillende und Kinder.',
  sl: 'Ni priporočljivo za osebe, občutljive na kofein, nosečnice, doječe matere in otroke.',
  pl: 'Nie zaleca się osobom wrażliwym na kofeinę, kobietom w ciąży, karmiącym piersią oraz dzieciom.',
}

export const GEL_CAFFEINE_SOURCE: L10n = {
  hr: 'Sadrži kofein iz ekstrakta sjemenki guarane.',
  en: 'Contains caffeine from guarana seed extract.',
  de: 'Enthält Koffein aus Guaranasamenextrakt.',
  sl: 'Vsebuje kofein iz izvlečka semen guarane.',
  pl: 'Zawiera kofeinę z ekstraktu z nasion guarany.',
}

export const BALANCED_DIET_NOTE: L10n = {
  hr: 'Važno je pridržavati se uravnotežene i raznovrsne prehrane i zdravog načina života.',
  en: 'It is important to follow a varied and balanced diet and a healthy lifestyle.',
  de: 'Wichtig sind eine abwechslungsreiche und ausgewogene Ernährung und eine gesunde Lebensweise.',
  sl: 'Pomembna sta uravnotežena in raznolika prehrana ter zdrav način življenja.',
  pl: 'Ważne jest stosowanie zróżnicowanej i zbilansowanej diety oraz zdrowego trybu życia.',
}

export const GEL_STORAGE: L10n = {
  hr: 'Na sobnoj temperaturi (do 25 °C). Proizvod treba čuvati od dohvata male djece.',
  en: 'Store at room temperature (up to 25 °C). Keep out of reach of young children.',
  de: 'Bei Raumtemperatur (bis 25 °C) lagern. Außerhalb der Reichweite von kleinen Kindern aufbewahren.',
  sl: 'Hraniti pri sobni temperaturi (do 25 °C). Shranjujte nedosegljivo majhnim otrokom.',
  pl: 'Przechowywać w temperaturze pokojowej (do 25 °C). Przechowywać w miejscu niedostępnym dla małych dzieci.',
}

/* ------------------------------------------------------------------ */
/* Proizvođač i distributer                                             */
/* ------------------------------------------------------------------ */

export const MANUFACTURER = {
  name: 'P.P.H. „APIMAR” – Marzanna Marcinkowska',
  address: 'ul. Południowa 21A, 24-105 Baranów, Poljska',
  web: 'https://honeybeepower.pl',
}

/* ------------------------------------------------------------------ */
/* Deklaracije po proizvodu                                             */
/* ------------------------------------------------------------------ */

const MILK: L10n = { hr: 'mlijeko', en: 'milk', de: 'Milch', sl: 'mleko', pl: 'mleko' }

const WHEY_INGREDIENTS: L10n = {
  hr: 'whey protein (91–92 %), sušeni med (6 %), stevija, guma arabika',
  en: 'whey protein (91–92%), dried honey (6%), stevia, gum arabic',
  de: 'Molkenprotein (91–92 %), getrockneter Honig (6 %), Stevia, Gummi arabicum',
  sl: 'sirotkine beljakovine (91–92 %), sušen med (6 %), stevia, arabski gumi',
  pl: 'białko serwatkowe (91–92%), suszony miód (6%), stewia, guma arabska',
}

export const DECLARATIONS: Declaration[] = [
  {
    slug: 'honey-bee-power-energy-gel-naranca',
    kind: 'gel',
    flavour: { hr: 'Naranča', en: 'Orange', de: 'Orange', sl: 'Pomaranča', pl: 'Pomarańcza' },
    flavourColor: '#f28c1b',
    backImage: '/images/products/gelnaranca-zadnja.png',
    ingredients: {
      hr: 'višecvjetni med 95,5 %, liofilizirani plod naranče 3 %, ekstrakt sjemenki guarane 1 %, morska sol 0,5 %',
      en: 'multifloral honey 95.5%, freeze-dried orange fruit 3%, guarana seed extract 1%, sea salt 0.5%',
      de: 'Mehrblütenhonig 95,5 %, gefriergetrocknete Orangenfrucht 3 %, Guaranasamenextrakt 1 %, Meersalz 0,5 %',
      sl: 'večcvetni med 95,5 %, liofiliziran plod pomaranče 3 %, izvleček semen guarane 1 %, morska sol 0,5 %',
      pl: 'miód wielokwiatowy 95,5%, liofilizowany owoc pomarańczy 3%, ekstrakt z nasion guarany 1%, sól morska 0,5%',
    },
    servingGrams: 40,
    per100g: { energyKj: 1330, energyKcal: 318, fat: 0, carbohydrates: 78, sugars: 75, fibre: 0, protein: 0, salt: 0.25 },
    perServing: { energyKj: 532, energyKcal: 127, fat: 0, carbohydrates: 31.2, sugars: 30, fibre: 0, protein: 0, salt: 0.1 },
    allergens: null,
    source: 'deklaracija',
  },
  {
    slug: 'honey-bee-power-energy-gel-limun',
    kind: 'gel',
    flavour: { hr: 'Limun', en: 'Lemon', de: 'Zitrone', sl: 'Limona', pl: 'Cytryna' },
    flavourColor: '#f2d21b',
    backImage: '/images/products/gellimun-zadnja.png',
    ingredients: {
      hr: 'višecvjetni med 94,5 %, liofilizirani plod limuna 4 %, ekstrakt sjemenki guarane 1 %, morska sol 0,5 %',
      en: 'multifloral honey 94.5%, freeze-dried lemon fruit 4%, guarana seed extract 1%, sea salt 0.5%',
      de: 'Mehrblütenhonig 94,5 %, gefriergetrocknete Zitronenfrucht 4 %, Guaranasamenextrakt 1 %, Meersalz 0,5 %',
      sl: 'večcvetni med 94,5 %, liofiliziran plod limone 4 %, izvleček semen guarane 1 %, morska sol 0,5 %',
      pl: 'miód wielokwiatowy 94,5%, liofilizowany owoc cytryny 4%, ekstrakt z nasion guarany 1%, sól morska 0,5%',
    },
    servingGrams: 40,
    // Na deklaraciji piše 1330 kJ = 313 kcal; prepisano točno.
    per100g: { energyKj: 1330, energyKcal: 313, fat: 0, carbohydrates: 72.5, sugars: 60, fibre: 0, protein: 0, salt: 0.25 },
    perServing: { energyKj: 532, energyKcal: 125, fat: 0, carbohydrates: 29, sugars: 24, fibre: 0, protein: 0, salt: 0.1 },
    allergens: null,
    source: 'deklaracija',
  },
  {
    slug: 'honey-bee-power-energy-gel-malina',
    kind: 'gel',
    flavour: { hr: 'Malina', en: 'Raspberry', de: 'Himbeere', sl: 'Malina', pl: 'Malina' },
    flavourColor: '#c8264b',
    backImage: '/images/products/gelmalina-zadnja.png',
    ingredients: {
      hr: 'višecvjetni med 91 %, liofilizirani plod maline 8 %, ekstrakt sjemenki guarane 1 %',
      en: 'multifloral honey 91%, freeze-dried raspberry fruit 8%, guarana seed extract 1%',
      de: 'Mehrblütenhonig 91 %, gefriergetrocknete Himbeerfrucht 8 %, Guaranasamenextrakt 1 %',
      sl: 'večcvetni med 91 %, liofiliziran plod maline 8 %, izvleček semen guarane 1 %',
      pl: 'miód wielokwiatowy 91%, liofilizowany owoc maliny 8%, ekstrakt z nasion guarany 1%',
    },
    servingGrams: 40,
    per100g: { energyKj: 1390, energyKcal: 328, fat: 0, carbohydrates: 82, sugars: 77.5, fibre: 0, protein: 0, salt: 0 },
    perServing: { energyKj: 556, energyKcal: 131, fat: 0, carbohydrates: 32.8, sugars: 31, fibre: 0, protein: 0, salt: 0 },
    allergens: null,
    source: 'deklaracija',
  },
  {
    slug: 'honey-bee-power-izotonicki-napitak-limun',
    kind: 'isotonic',
    flavour: { hr: 'Limun', en: 'Lemon', de: 'Zitrone', sl: 'Limona', pl: 'Cytryna' },
    flavourColor: '#f2d21b',
    backImage: '/images/products/isolimun-zadnja.png',
    ingredients: null,
    servingGrams: 15,
    per100g: { energyKj: 1550, energyKcal: 364, fat: 0, saturatedFat: 0, carbohydrates: 90, sugars: 5.5, protein: 0.43, salt: 0.1, magnesiumMg: 34.1, potassiumMg: 45.5, sodiumMg: 7.6 },
    perServing: { energyKj: 233, energyKcal: 55, fat: 0, carbohydrates: 13.5, sugars: 0.83, protein: 0.06, salt: 0, magnesiumMg: 5.12, potassiumMg: 6.83, sodiumMg: 1.14 },
    allergens: null,
    source: 'deklaracija',
  },
  {
    slug: 'honey-bee-power-izotonicki-napitak-naranca',
    kind: 'isotonic',
    flavour: { hr: 'Naranča', en: 'Orange', de: 'Orange', sl: 'Pomaranča', pl: 'Pomarańcza' },
    flavourColor: '#f28c1b',
    backImage: '/images/products/isonaranca-zadnja.png',
    ingredients: null,
    servingGrams: 15,
    per100g: { energyKj: 1540, energyKcal: 363, fat: 0, saturatedFat: 0, carbohydrates: 90, sugars: 5.5, protein: 0.4, salt: 0.1, magnesiumMg: 27.1, potassiumMg: 31.3, sodiumMg: 14.6 },
    // Stupac za porciju na fotografiji nije čitljiv; čeka očitanje s pakiranja.
    perServing: null,
    allergens: null,
    source: 'deklaracija',
  },
  {
    slug: 'honey-bee-power-whey-protein-ljesnjak-cokolada-700g',
    kind: 'whey',
    photoField: '#ffffff',
    flavour: { hr: 'Lješnjak-čokolada', en: 'Hazelnut-chocolate', de: 'Haselnuss-Schokolade', sl: 'Lešnik-čokolada', pl: 'Orzech laskowy z czekoladą' },
    flavourColor: '#6b4226',
    backImage: null,
    ingredients: WHEY_INGREDIENTS,
    servingGrams: 33,
    per100g: { energyKj: 1660, energyKcal: 399, fat: 7.1, carbohydrates: 16.26, sugars: 5.79, protein: 67.07, salt: 0.61 },
    perServing: null,
    allergens: MILK,
    source: 'prezentacija',
  },
  {
    slug: 'honey-bee-power-whey-protein-banana-vanilija-700g',
    kind: 'whey',
    photoField: '#ffffff',
    flavour: { hr: 'Banana-vanilija', en: 'Banana-vanilla', de: 'Banane-Vanille', sl: 'Banana-vanilija', pl: 'Banan z wanilią' },
    flavourColor: '#e8c547',
    backImage: null,
    ingredients: WHEY_INGREDIENTS,
    servingGrams: 33,
    per100g: { energyKj: 1660, energyKcal: 399, fat: 7.1, carbohydrates: 16.26, sugars: 5.79, protein: 67.07, salt: 0.61 },
    perServing: null,
    allergens: MILK,
    source: 'prezentacija',
  },
  {
    slug: 'honey-bee-power-whey-protein-jagoda-slag-700g',
    kind: 'whey',
    photoField: '#ffffff',
    flavour: { hr: 'Jagoda-šlag', en: 'Strawberry-cream', de: 'Erdbeere-Sahne', sl: 'Jagoda-smetana', pl: 'Truskawka ze śmietaną' },
    flavourColor: '#e0607e',
    backImage: null,
    ingredients: WHEY_INGREDIENTS,
    servingGrams: 33,
    per100g: { energyKj: 1666, energyKcal: 400, fat: 6.7, carbohydrates: 16.43, sugars: 5.95, protein: 68.69, salt: 0.61 },
    perServing: null,
    allergens: MILK,
    source: 'prezentacija',
  },
]

/** Proteini po porciji od 33 g (iz prezentacije). */
export const WHEY_PROTEIN_PER_33G: Record<string, number> = {
  'honey-bee-power-whey-protein-ljesnjak-cokolada-700g': 22.13,
  'honey-bee-power-whey-protein-banana-vanilija-700g': 22.13,
  'honey-bee-power-whey-protein-jagoda-slag-700g': 22.66,
}

/** Paketi od 10 gelova dijele deklaraciju s pojedinačnim gelom. */
const PACK_TO_SINGLE: Record<string, string> = {
  'honey-bee-power-energy-gel-naranca-paket-10': 'honey-bee-power-energy-gel-naranca',
  'honey-bee-power-energy-gel-limun-paket-10': 'honey-bee-power-energy-gel-limun',
  'honey-bee-power-energy-gel-malina-paket-10': 'honey-bee-power-energy-gel-malina',
}

export function singleSlugFor(slug: string): string {
  return PACK_TO_SINGLE[slug] ?? slug
}

export function isGelPack(slug: string): boolean {
  return slug in PACK_TO_SINGLE
}

export function getDeclaration(slug: string): Declaration | undefined {
  const target = singleSlugFor(slug)
  return DECLARATIONS.find((d) => d.slug === target)
}

export const GEL_DECLARATIONS = DECLARATIONS.filter((d) => d.kind === 'gel')

/** Formatira broj s decimalnim zarezom za hr/de/sl/pl, točkom za en. */
export function formatNumber(value: number, locale: Locale, maxFractionDigits = 2): string {
  const tag = { hr: 'hr-HR', en: 'en-GB', de: 'de-DE', sl: 'sl-SI', pl: 'pl-PL' }[locale]
  return new Intl.NumberFormat(tag, { maximumFractionDigits: maxFractionDigits }).format(value)
}

/** Boja polja iza fotografije proizvoda. */
export function photoFieldFor(d: Declaration | undefined): string {
  return d?.photoField ?? d?.flavourColor ?? '#d9d5cd'
}

/** Oznaka pakiranja iz podataka proizvoda u obliku „40 g”, „10 × 40 g”. */
export function sizeLabel(size: string): string {
  const map: Record<string, string> = {
    '40g sachet': '40 g',
    'Paket 10x40g': '10 × 40 g',
    '500g posuda': '500 g',
    '700g posuda': '700 g',
    '2x500g posuda + Shaker': '2 × 500 g + shaker',
  }
  return map[size] ?? size
}
