import Link from 'next/link'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import type { Locale, ProductSummary } from '@/types'
import { REAL_PRODUCTS } from '@/lib/products-data'
import {
  BALANCED_DIET_NOTE,
  GEL_APPROVED_CLAIM,
  GEL_CAFFEINE_MG,
  GEL_CAFFEINE_SOURCE,
  GEL_DIRECTIONS,
  GEL_STORAGE,
  GEL_WARNING,
  MANUFACTURER,
  WHEY_PROTEIN_PER_33G,
  formatNumber,
  getDeclaration,
  isGelPack,
  singleSlugFor,
  type NutritionValues,
  photoFieldFor,
  sizeLabel,
} from '@/lib/declarations'
import { formatEur, officialPriceEur } from '@/lib/prices'
import { webImage, inkOn } from '@/lib/images'
import { KIND_LABEL, PACK_TEXT, PRODUCT_FAQ, SPORTS, SPORTS_BY_KIND, kindForCategory, l } from '@/lib/product-content'
import { officialPriceFor } from '@/lib/prices'
import { FaqList } from '@/components/site/FaqList'
import ProductAddToCartButton from '@/app/[locale]/proizvodi/[slug]/ProductAddToCartButton'
import ProductStage, { type StageOrb } from '@/components/product/ProductStage'
import ProductStickyBuy from '@/components/product/ProductStickyBuy'
import { CompositionDonut } from '@/components/product/CompositionDonut'
import LabelZoom from '@/components/product/LabelZoom'
import { SHARES } from '@/lib/gel-shares'
import { IMAGE_RATIOS } from '@/lib/image-ratios'

/** Za svaki slučaj uklanja ostatke oznaka za nedostajuće podatke iz teksta. */
function withTodo(text: string) {
  return text.replace(/\s*\[UPIŠI:[^\]]*\]/g, '')
}

const flavourOf = (p: ProductSummary) => p.variants[0]?.flavour ?? ''

export async function ProductDetail({ product, locale }: { product: ProductSummary; locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'productPage' })
  const tIng = await getTranslations({ locale, namespace: 'home.ingredients' })
  const prefix = locale === 'hr' ? '' : `/${locale}`
  const kind = kindForCategory(product.category)
  const decl = getDeclaration(product.slug)
  const isPack = isGelPack(product.slug)
  const name = product.name[locale] ?? product.name.hr
  const shortName = name.replace(/^Honey Bee Power\s+/, '')
  const variant = product.variants[0]

  // Cijena samo iz službenog cjenika; paketi bez cijene u cjeniku dobivaju [UPIŠI].
  const price = officialPriceEur(product.slug)
  const unitPriceCents = price !== null ? Math.round(price * 100) : 0

  // Glavna brojka po porciji.
  const figure =
    kind === 'gel' && decl?.perServing
      ? { value: `${formatNumber(decl.perServing.carbohydrates, locale)} g`, label: t('carbsGel') }
      : kind === 'isotonic'
        ? { value: `${formatNumber(13.5, locale)} g`, label: t('carbsIso') }
        : kind === 'whey'
          ? { value: `${formatNumber(Math.round((WHEY_PROTEIN_PER_33G[product.slug] ?? 22) * 10) / 10, locale)} g`, label: t('proteinWhey') }
          : null

  const field = photoFieldFor(decl)
  const fieldInk = inkOn(field)
  const front = webImage(product.mainImage.asset._ref)
  const back = decl?.backImage ?? null
  const ratio = IMAGE_RATIOS[front] ?? (kind === 'gel' ? 0.497 : 1)
  const flavourWord = decl ? decl.flavour[locale] : flavourOf(product)
  const shares = kind === 'gel' ? SHARES[isPack ? singleSlugFor(product.slug) : product.slug] : undefined

  // Sastojci koji lebde oko gela (fotografije sastojaka; svaki okus ima svoje voće, malina je bez soli).
  const fruitPhoto: Record<string, string> = { limun: '/images/found/limun.jpg', naranca: '/images/found/naranca.jpg', malina: '/images/found/malina.jpg' }
  const fruitKey = Object.keys(fruitPhoto).find((k) => product.slug.includes(k))
  const orbs: StageOrb[] = shares
    ? [
        { src: '/images/found/med-zlica.jpg', label: tIng('part.honey'), x: 15, y: 24, depth: 54, size: 96, delay: 700 },
        ...(fruitKey ? [{ src: fruitPhoto[fruitKey], label: tIng('part.fruit'), x: 85, y: 30, depth: 40, size: 86, delay: 850 }] : []),
        { src: '/images/found/guarana.jpg', label: tIng('part.guarana'), x: 21, y: 72, depth: 64, size: 80, delay: 1000 },
        ...(shares.some((x) => x.key === 'salt') ? [{ src: '/images/found/sol.jpg', label: tIng('part.salt'), x: 87, y: 76, depth: 46, size: 72, delay: 1150 }] : []),
      ]
    : []

  // Ostali okusi i pakiranja iste vrste.
  const siblings = REAL_PRODUCTS.filter((p) => p.category === product.category && p.slug !== product.slug)

  // Nutritivna tablica.
  const rows = (v: NutritionValues | null | undefined) => v
  const per100 = decl?.per100g
  const perServ = rows(decl?.perServing)
  const servingGrams = decl?.servingGrams ?? 40
  const computedServing =
    !perServ && per100 && kind === 'isotonic'
      ? ({
          energyKj: Math.round(per100.energyKj * 0.15),
          energyKcal: Math.round(per100.energyKcal * 0.15),
          fat: 0,
          carbohydrates: Math.round(per100.carbohydrates * 15) / 100,
          sugars: Math.round(per100.sugars * 15) / 100,
          protein: Math.round(per100.protein * 15) / 100,
          salt: Math.round(per100.salt * 15) / 100,
          magnesiumMg: per100.magnesiumMg !== undefined ? Math.round(per100.magnesiumMg * 15) / 100 : undefined,
          potassiumMg: per100.potassiumMg !== undefined ? Math.round(per100.potassiumMg * 15) / 100 : undefined,
          sodiumMg: per100.sodiumMg !== undefined ? Math.round(per100.sodiumMg * 15) / 100 : undefined,
        } as NutritionValues)
      : null
  const serving: NutritionValues | null = perServ ?? computedServing
  const g = (v: number | undefined | null) => (v === undefined || v === null ? '—' : `${formatNumber(v, locale)} g`)
  const mg = (v: number | undefined | null) => (v === undefined || v === null ? '—' : `${formatNumber(v, locale)} mg`)
  const nutritionRows: Array<[string, string, string]> = per100
    ? [
        [t('energy'), `${per100.energyKj} kJ / ${per100.energyKcal} kcal`, serving ? `${serving.energyKj} kJ / ${serving.energyKcal} kcal` : '—'],
        [t('fat'), g(per100.fat), serving ? g(serving.fat) : '—'],
        ...(per100.saturatedFat !== undefined ? [[t('saturated'), g(per100.saturatedFat), serving ? g(serving.saturatedFat ?? 0) : '—'] as [string, string, string]] : []),
        [t('carbs'), g(per100.carbohydrates), serving ? g(serving.carbohydrates) : '—'],
        [t('sugars'), g(per100.sugars), serving ? g(serving.sugars) : '—'],
        ...(per100.fibre !== undefined && per100.fibre !== null ? [[t('fibre'), g(per100.fibre), serving ? g(serving.fibre ?? 0) : '—'] as [string, string, string]] : []),
        [t('protein'), g(per100.protein), serving ? g(serving.protein) : kind === 'whey' ? g(WHEY_PROTEIN_PER_33G[product.slug]) : '—'],
        [t('salt'), g(per100.salt), serving ? g(serving.salt) : '—'],
        ...(per100.magnesiumMg !== undefined
          ? ([
              [t('magnesium'), mg(per100.magnesiumMg), serving ? mg(serving.magnesiumMg) : '—'],
              [t('potassium'), mg(per100.potassiumMg), serving ? mg(serving.potassiumMg) : '—'],
              [t('sodium'), mg(per100.sodiumMg), serving ? mg(serving.sodiumMg) : '—'],
            ] as Array<[string, string, string]>)
          : []),
      ]
    : []

  const faq = PRODUCT_FAQ[kind].map((f) => {
    const smallPrice =
      kind === 'isotonic'
        ? officialPriceFor('Instant izotonik', flavourOf(product).toUpperCase().includes('NARAN') ? 'NARANČA' : 'LIMUN', '15 g')
        : kind === 'whey'
          ? officialPriceFor('Proteinski prah', 'LJEŠNJAK-ČOKOLADA', '33 g')
          : null
    const answer = l(f.a, locale).replace('{price}', smallPrice !== null ? formatEur(smallPrice, locale) : '')
    return { q: l(f.q, locale), a: <>{withTodo(answer)}</> }
  })

  const ingredientCount = decl?.ingredients ? decl.ingredients.hr.split(',').length : 0

  return (
    <article>
      {/* 1. Naziv, glavna brojka, cijena, upit */}
      <section className="grid-12" aria-labelledby="product-title">
        <div className="frame col-span-12 flex flex-col justify-between gap-10 py-10 md:col-span-6 md:py-14">
          <nav aria-label={t('breadcrumb')} className="t-small">
            <ol className="flex flex-wrap gap-x-2">
              <li><Link href={prefix || '/'} className="hover:underline">{t('home')}</Link> /</li>
              <li><Link href={`${prefix}/proizvodi`} className="hover:underline">{t('products')}</Link> /</li>
              <li><Link href={`${prefix}/proizvodi/${product.category}`} className="hover:underline">{l(KIND_LABEL[kind], locale)}</Link></li>
            </ol>
          </nav>

          <div>
            <h1 id="product-title" className="t-head max-w-[14ch]">{shortName}</h1>
            <p className="mt-4 t-body">
              {l(KIND_LABEL[kind], locale)} · {decl ? decl.flavour[locale] : flavourOf(product)} ·{' '}
              {sizeLabel(variant.size)}
            </p>
          </div>

          {figure && (
            <div>
              <p className="foil-text font-[family-name:var(--font-display)] text-[length:var(--text-mega)] font-black leading-[1.02] tracking-[-0.02em] tabular">
                {figure.value}
              </p>
              <p className="mt-3 t-lead">{figure.label}</p>
            </div>
          )}

          <div className="space-y-6" id="buy-box">
            {price !== null ? (
              <div className="flex flex-wrap items-baseline gap-x-3">
                <p className="font-[family-name:var(--font-display)] text-[length:var(--text-sub)] font-extrabold tabular">{formatEur(price, locale)}</p>
                <p className="t-body">{t('priceFromList')}</p>
              </div>
            ) : (
              <p className="t-body">{t('pricePending')}</p>
            )}
            <ProductAddToCartButton
              product={product}
              variant={variant}
              unitPrice={unitPriceCents}
              variantLabel={`${decl ? decl.flavour[locale] : flavourOf(product)} · ${sizeLabel(variant.size)}`}
              imageSrc={front}
            />
            <p className="t-small measure">{t('orderNote')}</p>
          </div>
        </div>

        <div className="col-span-12 md:col-span-6">
          <ProductStage
            src={front}
            alt={t('frontAlt', { name: shortName })}
            ratio={ratio}
            field={field}
            ink={fieldInk}
            word={flavourWord}
            orbs={orbs}
          />
        </div>
      </section>

      {/* Drugi okusi i pakiranja */}
      {siblings.length > 0 && (
        <nav aria-label={t('otherOptions')} className="frame pt-10">
          <ul className="flex flex-wrap gap-2">
            {siblings.map((s) => {
              const d = getDeclaration(s.slug)
              const label = `${d ? d.flavour[locale] : flavourOf(s)}${isGelPack(s.slug) ? ` · ${t('pack10')}` : ''}${s.slug.includes('shaker') ? ' · 2 × 500 g + shaker' : ''}`
              return (
                <li key={s.slug}>
                  <Link
                    href={`${prefix}/proizvodi/${s.slug}`}
                    className="inline-flex min-h-11 items-center gap-2 px-4 rounded-full shadow-[inset_0_0_0_1.5px_var(--color-line)] transition-colors hover:bg-ink hover:text-ground"
                  >
                    {d && <span aria-hidden="true" className="h-3 w-3 rounded-full" style={{ background: d.flavourColor }} />}
                    {label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      )}

      {isPack && (
        <section className="frame section" aria-label={t('pack10')}>
          <p className="max-w-[40ch] text-[length:var(--text-lead)] leading-[1.25]">{l(PACK_TEXT, locale)}</p>
          <Link href={`${prefix}/proizvodi/${singleSlugFor(product.slug)}`} className="link mt-6 inline-block t-body font-medium">
            {t('single')} →
          </Link>
        </section>
      )}

      {/* 2. Sastav i nutritivna tablica */}
      <section className="frame section" aria-labelledby="sastav-title">
        <div className="grid-12 gap-y-12">
          <div className="col-span-12 lg:col-span-7">
            <h2 id="sastav-title" className="t-head">
              {decl?.ingredients && kind !== 'isotonic' ? t('ingredientsTitle', { count: ingredientCount }) : t('ingredientsTitleIso')}
            </h2>
            {decl?.ingredients && (
              <p className="mt-8 max-w-[38ch] font-[family-name:var(--font-display)] text-[length:var(--text-lead)] font-semibold leading-[1.25]">
                {decl.ingredients[locale]}
              </p>
            )}
            {shares && decl && (
              <div className="mt-10">
                <CompositionDonut
                  shares={shares}
                  fruitColor={decl.flavourColor}
                  labels={{ honey: tIng('part.honey'), fruit: tIng('part.fruit'), guarana: tIng('part.guarana'), salt: tIng('part.salt') }}
                  fruitLabel={tIng('fruitOf', { fruit: decl.flavour[locale].toLowerCase() })}
                  centerValue={`${formatNumber(shares[0].pct, locale)} %`}
                  centerLabel={tIng('part.honey')}
                  ariaLabel={t('compositionLabel')}
                  formatPct={(n) => `${formatNumber(n, locale)} %`}
                />
              </div>
            )}
            {kind === 'gel' && <p className="mt-6 t-body">{GEL_CAFFEINE_SOURCE[locale]}</p>}
            {decl?.allergens && (
              <p className="mt-6 t-body">
                <strong className="font-medium">{t('allergensTitle')}:</strong> {decl.allergens[locale]}
              </p>
            )}

            {nutritionRows.length > 0 && (
              <div className="mt-14">
                <h3 className="font-[family-name:var(--font-display)] text-[length:var(--text-sub)] font-extrabold">{t('nutritionTitle')}</h3>
                <table className="mt-6 w-full max-w-2xl text-left t-body tabular">
                  <thead>
                    <tr className="border-b-2 border-current">
                      <th scope="col" className="py-2 pr-4"><span className="sr-only">{t('nutritionTitle')}</span></th>
                      <th scope="col" className="py-2 pr-4 font-medium">{t('per100')}</th>
                      <th scope="col" className="py-2 font-medium">{t('perServing', { grams: kind === 'whey' ? 33 : servingGrams })}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {nutritionRows.map(([label, a, b]) => (
                      <tr key={label} className="border-b border-current/20">
                        <th scope="row" className="py-2 pr-4 font-normal">{label}</th>
                        <td className="py-2 pr-4">{a}</td>
                        <td className="py-2">{b}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="mt-3 t-small">
                  {decl?.source === 'prezentacija' ? t('sourcePresentation') : t('sourceLabel')}
                  {computedServing ? ` ${t('computed')}` : ''}
                </p>
              </div>
            )}
          </div>

          {back && (
            <div className="col-span-12 sm:col-span-8 sm:col-start-3 lg:col-span-4 lg:col-start-9">
              <LabelZoom src={back} alt={t('backAlt', { name: shortName })} hint={t('zoomHint')} openLabel={t('zoomOpen')} closeLabel={t('zoomClose')} />
            </div>
          )}
        </div>
      </section>

      {/* 3. Kofein i upozorenje (gel) */}
      {kind === 'gel' && (
        <section className="on-ink" aria-labelledby="kofein-title">
          <div className="frame grid-12 gap-y-10 py-20 md:py-28">
            <h2 id="kofein-title" className="t-display col-span-12 md:col-span-5">{t('caffeineTitle')}</h2>
            <div className="col-span-12 space-y-8 md:col-span-7">
              <p className="text-[length:var(--text-lead)] leading-[1.25]">
                <strong className="font-medium">{t('warningTitle')}:</strong> {GEL_WARNING[locale]}
              </p>
              <p className="t-body">
                {GEL_CAFFEINE_SOURCE[locale]}
                {GEL_CAFFEINE_MG !== null ? ` ${t('caffeineAmount')}: ${GEL_CAFFEINE_MG} mg` : ''}
              </p>
              <p className="t-body">
                <strong className="font-medium">{t('storageTitle')}:</strong> {GEL_STORAGE[locale]}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* 4. Način primjene i odobrena tvrdnja (gel) / priprema (izotonik) */}
      {kind === 'gel' && (
        <section className="frame section" aria-labelledby="primjena-title">
          <div className="grid-12 gap-y-10">
            <h2 id="primjena-title" className="t-head col-span-12 md:col-span-5">{t('directionsTitle')}</h2>
            <div className="col-span-12 md:col-span-7">
              <p className="t-body">{t('directionsLead')}</p>
              <p className="mt-3 text-[length:var(--text-lead)] leading-[1.25]">{GEL_DIRECTIONS[locale]}</p>
              <h3 className="mt-12 t-body font-medium">{t('claimTitle')}</h3>
              <p className="mt-2 t-body measure">{GEL_APPROVED_CLAIM[locale]}</p>
              <p className="mt-4 t-small">{BALANCED_DIET_NOTE[locale]}</p>
              <Link href={`${prefix}/oporavak-nakon-treninga`} className="btn btn-ghost mt-10">
                {t('calcLink')}
                <span className="btn-arrow" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 5. Za koji sport */}
      <section className="field-surface" aria-labelledby="sport-title">
        <div className="frame py-20 md:py-28">
          <h2 id="sport-title" className="t-head">{t('sportsTitle')}</h2>
          <ul className="mt-10 flex flex-wrap gap-3">
            {SPORTS.filter((s) => SPORTS_BY_KIND[kind].includes(s.slug)).map((s) => (
              <li key={s.slug}>
                <Link href={`${prefix}/sport/${s.slug}`} className="sport-pill">
                  {s.name[locale]}
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6. Česta pitanja */}
      <section className="frame section" aria-labelledby="faq-title">
        <FaqList id="faq-title" title={t('faqTitle')} items={faq} />
      </section>

      {/* 7. Povezani proizvodi */}
      <section className="frame pb-24" aria-labelledby="related-title">
        <h2 id="related-title" className="t-head">{t('relatedTitle')}</h2>
        <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">
          {related(product).map((p) => {
            const d = getDeclaration(p.slug)
            const pr = officialPriceEur(p.slug)
            return (
              <li key={p.slug}>
                <Link href={`${prefix}/proizvodi/${p.slug}`} data-tilt="5" className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius)] shadow-[0_24px_50px_-24px_rgb(0_0_0/0.8)]" style={{ background: photoFieldFor(d) }}>
                    <Image
                      src={webImage(p.mainImage.asset._ref)}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 22vw, 45vw"
                      className="object-contain p-[10%] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                    />
                  </div>
                  <p className="mt-3 t-body font-medium group-hover:underline">{(p.name[locale] ?? p.name.hr).replace(/^Honey Bee Power\s+/, '')}</p>
                  <p className="t-small tabular">{pr !== null ? formatEur(pr, locale) : ''}</p>
                </Link>
              </li>
            )
          })}
        </ul>
        <p className="mt-16 t-small">{t('madeBy', { maker: `${MANUFACTURER.name}, ${MANUFACTURER.address}` })}</p>
      </section>
      <ProductStickyBuy
        product={product}
        variant={variant}
        unitPrice={unitPriceCents}
        variantLabel={`${flavourWord} · ${sizeLabel(variant.size)}`}
        imageSrc={front}
        title={shortName}
        priceLabel={price !== null ? formatEur(price, locale) : ''}
        color={field}
        anchorId="buy-box"
      />
    </article>
  )
}

/** Dva druga okusa iste vrste i po jedan proizvod druge vrste. */
function related(product: ProductSummary): ProductSummary[] {
  const same = REAL_PRODUCTS.filter((p) => p.category === product.category && p.slug !== product.slug && !isGelPack(p.slug) && !p.slug.includes('shaker')).slice(0, 2)
  const others = ['energetski-gelovi', 'izotonicki-napitci', 'whey-proteini']
    .filter((c) => c !== product.category)
    .map((c) => REAL_PRODUCTS.find((p) => p.category === c && !isGelPack(p.slug) && !p.slug.includes('shaker'))!)
  return [...same, ...others].filter(Boolean).slice(0, 4)
}
