import Link from 'next/link'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import type { Locale } from '@/types'
import type { L10n } from '@/lib/declarations'
import { REAL_PRODUCTS } from '@/lib/products-data'
import { formatNumber, getDeclaration, isGelPack, photoFieldFor, WHEY_PROTEIN_PER_33G } from '@/lib/declarations'
import { formatEur, officialPriceEur, officialPriceFor } from '@/lib/prices'
import { webImage, inkOn } from '@/lib/images'
import { PRODUCT_FAQ, SPORTS, SPORTS_BY_KIND, kindForCategory, l } from '@/lib/product-content'
import { FaqList } from '@/components/site/FaqList'

const T = (hr: string, en: string, de: string, sl: string, pl: string): L10n => ({ hr, en, de, sl, pl })

export const CATEGORY_COPY: Record<string, { title: L10n; lead: L10n; meta: L10n; image: string; column: L10n }> = {
  'energetski-gelovi': {
    title: T('Energetski gelovi', 'Energy gels', 'Energiegels', 'Energijski geli', 'Żele energetyczne'),
    lead: T(
      'Tri okusa, gel od 40 g. Višecvjetni med (91–95,5 %), liofilizirano voće, ekstrakt sjemenki guarane i, kod limuna i naranče, morska sol. Prema deklaraciji uzima se 1 obrok nakon vježbanja ili napora.',
      'Three flavours, a 40 g gel. Multifloral honey (91–95.5%), freeze-dried fruit, guarana seed extract and, in lemon and orange, sea salt. According to the label, take 1 serving after exercise or exertion.',
      'Drei Sorten, ein 40-g-Gel. Mehrblütenhonig (91–95,5 %), gefriergetrocknete Früchte, Guaranasamenextrakt und bei Zitrone und Orange Meersalz. Laut Etikett 1 Portion nach dem Training oder der Belastung.',
      'Trije okusi, gel 40 g. Večcvetni med (91–95,5 %), liofilizirano sadje, izvleček semen guarane in pri limoni in pomaranči morska sol. Po deklaraciji se uživa 1 obrok po vadbi ali naporu.',
      'Trzy smaki, żel 40 g. Miód wielokwiatowy (91–95,5%), liofilizowane owoce, ekstrakt z nasion guarany i, w cytrynowym i pomarańczowym, sól morska. Według etykiety 1 porcja po ćwiczeniach lub wysiłku.',
    ),
    meta: T(
      'Energetski gelovi od 40 g od višecvjetnog meda i liofiliziranog voća: limun, naranča, malina. 29–32,8 g ugljikohidrata, 1,80 € po vrećici.',
      '40 g energy gels made from multifloral honey and freeze-dried fruit: lemon, orange, raspberry. 29–32.8 g carbohydrate, €1.80 per sachet.',
      'Energiegels à 40 g aus Mehrblütenhonig und gefriergetrockneten Früchten: Zitrone, Orange, Himbeere. 29–32,8 g Kohlenhydrate, 1,80 € pro Beutel.',
      'Energijski geli 40 g iz večcvetnega medu in liofiliziranega sadja: limona, pomaranča, malina. 29–32,8 g ogljikovih hidratov, 1,80 € na vrečko.',
      'Żele energetyczne 40 g z miodu wielokwiatowego i liofilizowanych owoców: cytryna, pomarańcza, malina. 29–32,8 g węglowodanów, 1,80 € za saszetkę.',
    ),
    image: '/images/hero/product-showcase-poster.jpg',
    column: T('Ugljikohidrata u 40 g', 'Carbohydrate in 40 g', 'Kohlenhydrate in 40 g', 'Ogljikovi hidrati v 40 g', 'Węglowodany w 40 g'),
  },
  'izotonicki-napitci': {
    title: T('Izotonični napitci', 'Isotonic drinks', 'Isotonische Getränke', 'Izotonični napitki', 'Napoje izotoniczne'),
    lead: T(
      'Prah za napitak u posudi od 500 g ili vrećici od 15 g, okusi limun i naranča. Na 100 g praha 90 g ugljikohidrata, od toga 5,5 g šećera.',
      'Drink powder in a 500 g tub or a 15 g sachet, lemon and orange. Per 100 g of powder, 90 g carbohydrate, of which 5.5 g sugars.',
      'Getränkepulver in der 500-g-Dose oder im 15-g-Beutel, Zitrone und Orange. Pro 100 g Pulver 90 g Kohlenhydrate, davon 5,5 g Zucker.',
      'Prašek za napitek v embalaži 500 g ali vrečki 15 g, okusa limona in pomaranča. Na 100 g praška 90 g ogljikovih hidratov, od tega 5,5 g sladkorjev.',
      'Proszek do napoju w opakowaniu 500 g lub saszetce 15 g, cytryna i pomarańcza. Na 100 g proszku 90 g węglowodanów, w tym 5,5 g cukrów.',
    ),
    meta: T(
      'Izotonični napitak u prahu Honey Bee Power, limun i naranča: 500 g za 8,00 €, vrećica od 15 g za 1,60 €. 13,5 g ugljikohidrata u porciji.',
      'Honey Bee Power isotonic drink powder, lemon and orange: 500 g for €8.00, 15 g sachet for €1.60. 13.5 g carbohydrate per serving.',
      'Honey Bee Power isotonisches Getränkepulver, Zitrone und Orange: 500 g für 8,00 €, 15-g-Beutel für 1,60 €. 13,5 g Kohlenhydrate pro Portion.',
      'Izotonični napitek v prahu Honey Bee Power, limona in pomaranča: 500 g za 8,00 €, vrečka 15 g za 1,60 €. 13,5 g ogljikovih hidratov v obroku.',
      'Napój izotoniczny w proszku Honey Bee Power, cytryna i pomarańcza: 500 g za 8,00 €, saszetka 15 g za 1,60 €. 13,5 g węglowodanów w porcji.',
    ),
    image: '/images/products-web/honeybeepoweriso_lemon.webp',
    column: T('Ugljikohidrata u 15 g', 'Carbohydrate in 15 g', 'Kohlenhydrate in 15 g', 'Ogljikovi hidrati v 15 g', 'Węglowodany w 15 g'),
  },
  'whey-proteini': {
    title: T('Whey proteini', 'Whey protein', 'Whey Protein', 'Whey beljakovine', 'Białko serwatkowe'),
    lead: T(
      'Whey protein sa sušenim medom (6 %) i stevijom, tri okusa, posuda od 700 g ili vrećica od 33 g. Oko 22 g proteina u porciji. Sadrži mlijeko.',
      'Whey protein with dried honey (6%) and stevia, three flavours, 700 g tub or 33 g sachet. About 22 g of protein per serving. Contains milk.',
      'Whey Protein mit getrocknetem Honig (6 %) und Stevia, drei Sorten, 700-g-Dose oder 33-g-Beutel. Etwa 22 g Protein pro Portion. Enthält Milch.',
      'Whey protein s sušenim medom (6 %) in stevio, trije okusi, embalaža 700 g ali vrečka 33 g. Približno 22 g beljakovin v obroku. Vsebuje mleko.',
      'Białko serwatkowe z suszonym miodem (6%) i stewią, trzy smaki, opakowanie 700 g lub saszetka 33 g. Około 22 g białka w porcji. Zawiera mleko.',
    ),
    meta: T(
      'Whey protein Honey Bee Power sa sušenim medom i stevijom: lješnjak-čokolada, banana-vanilija, jagoda-šlag. 700 g za 38,00 €. Sadrži mlijeko.',
      'Honey Bee Power whey protein with dried honey and stevia: hazelnut-chocolate, banana-vanilla, strawberry-cream. 700 g for €38.00. Contains milk.',
      'Honey Bee Power Whey Protein mit getrocknetem Honig und Stevia: Haselnuss-Schokolade, Banane-Vanille, Erdbeere-Sahne. 700 g für 38,00 €.',
      'Whey protein Honey Bee Power s sušenim medom in stevio: lešnik-čokolada, banana-vanilija, jagoda-smetana. 700 g za 38,00 €. Vsebuje mleko.',
      'Białko Honey Bee Power z suszonym miodem i stewią: orzech z czekoladą, banan z wanilią, truskawka ze śmietaną. 700 g za 38,00 €.',
    ),
    image: '/images/products-web/proteincokolada700g.webp',
    column: T('Proteina u 33 g', 'Protein in 33 g', 'Protein in 33 g', 'Beljakovine v 33 g', 'Białko w 33 g'),
  },
}

const LABELS = {
  flavour: T('Okus', 'Flavour', 'Sorte', 'Okus', 'Smak'),
  price: T('Cijena', 'Price', 'Preis', 'Cena', 'Cena'),
  compare: T('Usporedba okusa', 'Flavours compared', 'Sorten im Vergleich', 'Primerjava okusov', 'Porównanie smaków'),
  pack: T('paket od 10', 'pack of 10', '10er-Paket', 'paket 10', 'zestaw 10'),
  guides: T('Vodiči', 'Guides', 'Ratgeber', 'Vodniki', 'Poradniki'),
  guidesLead: T('Savjeti o prehrani za trening i oporavak, s izvorima.', 'Nutrition advice for training and recovery, with sources.', 'Ernährungstipps für Training und Erholung, mit Quellen.', 'Nasveti o prehrani za trening in obnovo, z viri.', 'Porady żywieniowe na trening i regenerację, ze źródłami.'),
  sports: T('Za koji sport', 'For which sport', 'Für welchen Sport', 'Za kateri šport', 'Dla jakiego sportu'),
  faq: T('Česta pitanja', 'Questions', 'Häufige Fragen', 'Pogosta vprašanja', 'Częste pytania'),
  onEnquiry: T('[UPIŠI: cijena iz cjenika]', '[UPIŠI: price list]', '[UPIŠI: Preisliste]', '[UPIŠI: cenik]', '[UPIŠI: cennik]'),
}

export async function CategoryPage({ category, locale }: { category: string; locale: Locale }) {
  const tp = await getTranslations({ locale, namespace: 'productPage' })
  const prefix = locale === 'hr' ? '' : `/${locale}`
  const copy = CATEGORY_COPY[category]
  const kind = kindForCategory(category)
  const products = REAL_PRODUCTS.filter((p) => p.category === category)
  const singles = products.filter((p) => !isGelPack(p.slug) && !p.slug.includes('shaker'))

  const figureFor = (slug: string) => {
    const d = getDeclaration(slug)
    if (kind === 'gel' && d?.perServing) return `${formatNumber(d.perServing.carbohydrates, locale)} g`
    if (kind === 'isotonic') return `${formatNumber(13.5, locale)} g`
    if (kind === 'whey') return `${formatNumber(Math.round((WHEY_PROTEIN_PER_33G[slug] ?? 22) * 10) / 10, locale)} g`
    return '—'
  }

  return (
    <>
      <section className="frame grid-12 items-end gap-y-10 pb-16 pt-10 md:pb-24" aria-labelledby="cat-title">
        <div className="col-span-12 lg:col-span-7">
          <nav aria-label={tp('breadcrumb')} className="t-small">
            <Link href={`${prefix}/proizvodi`} className="hover:underline">{tp('products')}</Link> /
          </nav>
          <h1 id="cat-title" className="t-display mt-6 max-w-[11ch]">{l(copy.title, locale)}</h1>
          <p className="mt-8 t-lead measure">{l(copy.lead, locale)}</p>
        </div>
        <div className="relative col-span-12 aspect-square overflow-hidden rounded-[var(--radius)] bg-white sm:col-span-8 sm:col-start-5 lg:col-span-5">
          <Image src={copy.image} alt="" fill priority sizes="(min-width: 1024px) 40vw, 70vw" className="object-cover" />
        </div>
      </section>

      <ul className="frame space-y-3" aria-label={l(copy.title, locale)}>
        {products.map((p) => {
          const d = getDeclaration(p.slug)
          const color = photoFieldFor(d)
          const price = officialPriceEur(p.slug)
          const pack = isGelPack(p.slug) || p.slug.includes('shaker')
          return (
            <li key={p.slug} data-reveal>
              <Link
                href={`${prefix}/proizvodi/${p.slug}`}
                className="group grid-12 min-h-36 items-center gap-y-4 overflow-hidden rounded-[var(--radius)] px-5 py-6 transition-transform duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 md:px-8"
                style={{ background: color, color: inkOn(color) }}
              >
                <span className="relative col-span-4 aspect-square sm:col-span-2">
                  <Image src={webImage(p.mainImage.asset._ref)} alt="" fill sizes="20vw" className="object-contain transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-105" />
                </span>
                <span className="col-span-8 sm:col-span-5">
                  <span className="block font-[family-name:var(--font-display)] text-[length:var(--text-lead)] font-extrabold leading-[1.08]">
                    {d ? d.flavour[locale] : (p.name[locale] ?? p.name.hr).replace(/^Honey Bee Power\s+/, '')}
                    {pack && isGelPack(p.slug) ? `, ${l(LABELS.pack, locale)}` : ''}
                  </span>
                  <span className="mt-2 block t-body">{(p.name[locale] ?? p.name.hr).replace(/^Honey Bee Power\s+/, '')}</span>
                </span>
                <span className="col-span-6 font-[family-name:var(--font-display)] text-[length:var(--text-sub)] font-extrabold tabular sm:col-span-3">
                  {figureFor(p.slug)}
                </span>
                <span className="col-span-6 text-right t-lead tabular sm:col-span-2">
                  {price !== null ? formatEur(price, locale) : <span className="todo t-small">{l(LABELS.onEnquiry, locale)}</span>}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>

      <section className="frame section" aria-labelledby="usporedba-title">
        <div className="grid-12 gap-y-10">
          <h2 id="usporedba-title" className="t-head col-span-12 md:col-span-5">{l(LABELS.compare, locale)}</h2>
          <table className="col-span-12 w-full text-left t-body tabular md:col-span-7">
            <thead>
              <tr className="border-b-2 border-current">
                <th scope="col" className="py-2 pr-4 font-medium">{l(LABELS.flavour, locale)}</th>
                <th scope="col" className="py-2 pr-4 font-medium">{l(copy.column, locale)}</th>
                <th scope="col" className="py-2 text-right font-medium">{l(LABELS.price, locale)}</th>
              </tr>
            </thead>
            <tbody>
              {singles.map((p) => {
                const d = getDeclaration(p.slug)
                const price = officialPriceEur(p.slug)
                return (
                  <tr key={p.slug} className="border-b border-current/20">
                    <th scope="row" className="py-3 pr-4 font-normal">
                      <Link href={`${prefix}/proizvodi/${p.slug}`} className="link">{d ? d.flavour[locale] : p.variants[0].flavour}</Link>
                      {d?.ingredients && kind === 'gel' && <span className="block t-small">{d.ingredients[locale]}</span>}
                    </th>
                    <td className="py-3 pr-4 align-top">{figureFor(p.slug)}</td>
                    <td className="py-3 text-right align-top">{price !== null ? formatEur(price, locale) : '—'}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="field-surface" aria-labelledby="cat-sport-title">
        <div className="frame grid-12 gap-y-8 py-20 md:py-24">
          <h2 id="cat-sport-title" className="t-head col-span-12 md:col-span-5">{l(LABELS.sports, locale)}</h2>
          <ul className="col-span-12 flex flex-wrap gap-x-8 gap-y-2 md:col-span-7">
            {SPORTS.filter((s) => SPORTS_BY_KIND[kind].includes(s.slug)).map((s) => (
              <li key={s.slug}>
                <Link href={`${prefix}/sport/${s.slug}`} className="font-[family-name:var(--font-display)] text-[length:var(--text-sub)] font-extrabold underline decoration-[0.06em] underline-offset-[0.14em]">
                  {s.name[locale]}
                </Link>
              </li>
            ))}
          </ul>
          <p className="col-span-12 t-body md:col-span-7 md:col-start-6">
            {l(LABELS.guidesLead, locale)}{' '}
            <Link href={`${prefix}/vodici`} className="link font-medium">{l(LABELS.guides, locale)} →</Link>
          </p>
        </div>
      </section>

      <section className="frame section" aria-labelledby="cat-faq-title">
        <FaqList
          id="cat-faq-title"
          title={l(LABELS.faq, locale)}
          items={PRODUCT_FAQ[kind].slice(0, 4).map((f) => ({
            q: l(f.q, locale),
            a: l(f.a, locale)
              .replace('{price}', formatEur((kind === 'isotonic' ? officialPriceFor('Instant izotonik', 'LIMUN', '15 g') : officialPriceFor('Proteinski prah', 'LJEŠNJAK-ČOKOLADA', '33 g')) ?? 0, locale))
              .split(/(\[UPIŠI:[^\]]*\])/g)
              .map((part, i) => (part.startsWith('[UPIŠI') ? <span key={i} className="todo">{part}</span> : part)),
          }))}
        />
      </section>
    </>
  )
}
