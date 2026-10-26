import Image from 'next/image'
import type { Locale } from '@/types'
import {
  type Declaration,
  GEL_APPROVED_CLAIM,
  GEL_CAFFEINE_SOURCE,
  GEL_DIRECTIONS,
  GEL_STORAGE,
  GEL_WARNING,
  BALANCED_DIET_NOTE,
  formatNumber,
} from '@/lib/declarations'

const L = {
  ingredients: { hr: 'Sastav', en: 'Ingredients', de: 'Zutaten', sl: 'Sestavine', pl: 'Skład' },
  nutrition: { hr: 'Nutritivne vrijednosti', en: 'Nutrition information', de: 'Nährwerte', sl: 'Hranilna vrednost', pl: 'Wartości odżywcze' },
  per100: { hr: 'na 100 g', en: 'per 100 g', de: 'pro 100 g', sl: 'na 100 g', pl: 'w 100 g' },
  perServing: { hr: 'na 40 g', en: 'per 40 g', de: 'pro 40 g', sl: 'na 40 g', pl: 'w 40 g' },
  energy: { hr: 'Energija', en: 'Energy', de: 'Energie', sl: 'Energijska vrednost', pl: 'Wartość energetyczna' },
  fat: { hr: 'Masti', en: 'Fat', de: 'Fett', sl: 'Maščobe', pl: 'Tłuszcz' },
  carbs: { hr: 'Ugljikohidrati', en: 'Carbohydrate', de: 'Kohlenhydrate', sl: 'Ogljikovi hidrati', pl: 'Węglowodany' },
  sugars: { hr: 'od kojih šećeri', en: 'of which sugars', de: 'davon Zucker', sl: 'od tega sladkorji', pl: 'w tym cukry' },
  fibre: { hr: 'Vlakna', en: 'Fibre', de: 'Ballaststoffe', sl: 'Vlaknine', pl: 'Błonnik' },
  protein: { hr: 'Bjelančevine', en: 'Protein', de: 'Eiweiß', sl: 'Beljakovine', pl: 'Białko' },
  salt: { hr: 'Sol', en: 'Salt', de: 'Salz', sl: 'Sol', pl: 'Sól' },
  directions: { hr: 'Način primjene (s deklaracije)', en: 'Directions (from the label)', de: 'Verzehrempfehlung (laut Etikett)', sl: 'Način uporabe (z deklaracije)', pl: 'Sposób użycia (z etykiety)' },
  claim: { hr: 'Odobrena zdravstvena tvrdnja', en: 'Authorised health claim', de: 'Zugelassene gesundheitsbezogene Angabe', sl: 'Odobrena zdravstvena trditev', pl: 'Dopuszczone oświadczenie zdrowotne' },
  warning: { hr: 'Upozorenje', en: 'Warning', de: 'Warnhinweis', sl: 'Opozorilo', pl: 'Ostrzeżenie' },
  storage: { hr: 'Čuvanje', en: 'Storage', de: 'Lagerung', sl: 'Shranjevanje', pl: 'Przechowywanie' },
  backAlt: { hr: 'Poleđina pakiranja s deklaracijom', en: 'Back of the pack with the label', de: 'Rückseite der Packung mit Etikett', sl: 'Hrbtna stran pakiranja z deklaracijo', pl: 'Tył opakowania z etykietą' },
} satisfies Record<string, Record<Locale, string>>

function g(value: number, locale: Locale) {
  return `${formatNumber(value, locale)} g`
}

export default function GelDeclaration({ declaration: d, locale }: { declaration: Declaration; locale: Locale }) {
  const per = d.per100g
  const srv = d.perServing
  const rows: Array<[string, string, string]> = [
    [L.energy[locale], `${per.energyKj} kJ / ${per.energyKcal} kcal`, srv ? `${srv.energyKj} kJ / ${srv.energyKcal} kcal` : '—'],
    [L.fat[locale], g(per.fat, locale), srv ? g(srv.fat, locale) : '—'],
    [L.carbs[locale], g(per.carbohydrates, locale), srv ? g(srv.carbohydrates, locale) : '—'],
    [L.sugars[locale], g(per.sugars, locale), srv ? g(srv.sugars, locale) : '—'],
    [L.fibre[locale], g(per.fibre ?? 0, locale), srv ? g(srv.fibre ?? 0, locale) : '—'],
    [L.protein[locale], g(per.protein, locale), srv ? g(srv.protein, locale) : '—'],
    [L.salt[locale], g(per.salt, locale), srv ? g(srv.salt, locale) : '—'],
  ]

  return (
    <section className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 sm:p-10 rounded-3xl border border-amber-200">
      <div className="space-y-6 text-sm text-gray-800">
        <div>
          <h2 className="text-xl font-black text-gray-900 mb-2">{L.ingredients[locale]}</h2>
          <p>{d.ingredients?.[locale]}</p>
          <p className="mt-1 text-gray-600">{GEL_CAFFEINE_SOURCE[locale]}</p>
        </div>

        <div role="note" className="p-4 rounded-xl border-2 border-red-700 bg-red-50 text-red-900">
          <strong className="block">{L.warning[locale]}</strong>
          {GEL_WARNING[locale]}
        </div>

        <div>
          <h2 className="text-xl font-black text-gray-900 mb-2">{L.nutrition[locale]}</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-300">
                <th scope="col" className="py-1.5" />
                <th scope="col" className="py-1.5 font-semibold">{L.per100[locale]}</th>
                <th scope="col" className="py-1.5 font-semibold">{L.perServing[locale]}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([label, a, b]) => (
                <tr key={label} className="border-b border-gray-100">
                  <th scope="row" className="py-1.5 font-normal">{label}</th>
                  <td className="py-1.5 tabular-nums">{a}</td>
                  <td className="py-1.5 tabular-nums">{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <h2 className="text-xl font-black text-gray-900 mb-2">{L.directions[locale]}</h2>
          <p>{GEL_DIRECTIONS[locale]}</p>
        </div>

        <div>
          <h2 className="text-base font-bold text-gray-900 mb-1">{L.claim[locale]}</h2>
          <p className="text-gray-700">{GEL_APPROVED_CLAIM[locale]}</p>
          <p className="mt-2 text-gray-600">{BALANCED_DIET_NOTE[locale]}</p>
        </div>

        <div>
          <h2 className="text-base font-bold text-gray-900 mb-1">{L.storage[locale]}</h2>
          <p className="text-gray-700">{GEL_STORAGE[locale]}</p>
        </div>
      </div>

      {d.backImage && (
        <div className="relative aspect-[3/4] w-full bg-amber-50 rounded-2xl overflow-hidden">
          <Image
            src={d.backImage}
            alt={`${L.backAlt[locale]}: ${d.flavour[locale]}`}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-contain p-4"
          />
        </div>
      )}
    </section>
  )
}
