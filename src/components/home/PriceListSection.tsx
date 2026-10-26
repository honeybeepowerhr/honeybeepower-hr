import Link from 'next/link'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import type { Locale } from '@/types'
import { CJENIK_ITEMS } from '@/lib/cjenik-data'
import { formatEur } from '@/lib/prices'

const GROUPS = [
  { vrsta: 'Energetski gel', key: 'gel' },
  { vrsta: 'Instant izotonik', key: 'iso' },
  { vrsta: 'Proteinski prah', key: 'whey' },
  { vrsta: 'Shaker', key: 'shaker' },
] as const

/** „Statement, table pushed right”: cijene iz službenog cjenika. */
export async function PriceListSection({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'home.prices' })
  const tf = await getTranslations({ locale, namespace: 'flavours' })
  const prefix = locale === 'hr' ? '' : `/${locale}`

  const flavour = (okus: string) => (okus === '-' ? '' : tf(okus.toLowerCase().replace(/[^a-zčćšđž-]/g, '')))

  return (
    <section aria-labelledby="cijene-title" className="frame section" id="cijene">
      <h2 id="cijene-title" data-reveal className="t-head max-w-[16ch]">
        {t('title')}
      </h2>

      <div className="mt-16 grid-12 gap-y-10 md:mt-24">
        <div className="relative order-last col-span-12 aspect-[4/5] self-end overflow-hidden rounded-[var(--radius)] bg-white sm:col-span-8 sm:col-start-5 md:order-none md:col-span-4 md:col-start-1">
          <Image
            src="/images/products-web/paketgelnaranca-new.webp"
            alt={t('photoAlt')}
            fill
            sizes="(min-width: 768px) 30vw, 70vw"
            className="object-contain p-[6%]"
          />
        </div>

        <p className="col-span-12 t-small md:col-span-1 md:col-start-7 md:pt-1">{t('tableLabel')}</p>

        <div className="card col-span-12 p-6 md:col-span-6 md:col-start-7 md:p-8 lg:col-span-5 lg:col-start-8">
          <table className="w-full text-left t-body tabular">
            <caption className="sr-only">{t('caption')}</caption>
            <thead className="sr-only">
              <tr>
                <th scope="col">{t('colType')}</th>
                <th scope="col">{t('colItem')}</th>
                <th scope="col">{t('colPrice')}</th>
              </tr>
            </thead>
            {GROUPS.map((g) => (
              <tbody key={g.key} className="[&+tbody>tr:first-child>*]:pt-11">
                {CJENIK_ITEMS.filter((i) => i.vrsta === g.vrsta).map((i, idx) => (
                  <tr key={i.rb}>
                    <th scope="row" className="w-[34%] py-[0.4rem] pr-4 align-top font-normal text-muted">
                      {idx === 0 ? t(`type.${g.key}`) : <span className="sr-only">{t(`type.${g.key}`)}</span>}
                    </th>
                    <td className="py-[0.4rem] pr-4 align-top">
                      {[flavour(i.okus), i.pakiranje].filter(Boolean).join(', ')}
                    </td>
                    <td className="py-[0.4rem] text-right align-top font-semibold text-[color:var(--color-honey)]">{formatEur(i.aktualnaCijena, locale)}</td>
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
          <p className="mt-8 t-small measure">{t('note')}</p>
          <Link href={`${prefix}/cjenik`} className="link mt-6 inline-block t-body font-medium">
            {t('more')} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
