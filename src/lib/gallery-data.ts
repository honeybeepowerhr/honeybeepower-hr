import type { Locale } from '@/types'

type T5 = Record<Locale, string>

/** Opisi fotografija s događaja (vlastite fotografije; dopuštenje za objavu potvrđuje vlasnik). */
export const EVENT_KINDS = {
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
} satisfies Record<string, T5>

/** Dimenzije su stvarne dimenzije datoteka u public/images/events-web. */
export const EVENT_PHOTOS: Array<{ n: number; kind: keyof typeof EVENT_KINDS; w: number; h: number }> = [
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
