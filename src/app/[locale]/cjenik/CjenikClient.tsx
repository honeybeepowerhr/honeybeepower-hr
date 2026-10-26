'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { LEGAL_ENTITY, CJENIK_ITEMS, getLatestUpdateTimestamp, get30DayArchiveList } from '@/lib/cjenik-data'

/**
 * Službeni digitalni cjenik (zakonska obveza): pretraga, kategorije, arhiva
 * od 30 dana, strojno čitljivi XML i CSV te ispis. Novi izgled, iste funkcije.
 */
export function CjenikClient() {
  const t = useTranslations('cjenik')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedArchiveDate, setSelectedArchiveDate] = useState<string>('')

  const timestampInfo = useMemo(() => getLatestUpdateTimestamp(), [])
  const archiveList = useMemo(() => get30DayArchiveList(), [])

  const categories = useMemo(() => Array.from(new Set(CJENIK_ITEMS.map((i) => i.vrsta))), [])

  const filteredItems = useMemo(() => {
    const query = searchQuery.toLowerCase().trim()
    return CJENIK_ITEMS.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.vrsta === selectedCategory
      if (!query) return matchesCategory
      return (
        matchesCategory &&
        (item.naziv.toLowerCase().includes(query) ||
          item.barkod.includes(query) ||
          item.okus.toLowerCase().includes(query) ||
          item.vrsta.toLowerCase().includes(query))
      )
    })
  }, [searchQuery, selectedCategory])

  const chip = (active: boolean) => `min-h-11 px-4 ${active ? 'bg-ink text-ground' : 'shadow-[inset_0_0_0_2px_currentColor]'}`

  return (
    <div className="print:bg-white">
      <section className="frame grid-12 gap-y-8 pb-10 pt-10" aria-labelledby="cjenik-title">
        <div className="col-span-12 lg:col-span-7">
          <h1 id="cjenik-title" className="t-display">{t('title')}</h1>
          <p className="mt-6 t-lead measure">{t('subtitle')}</p>
        </div>
        <div className="col-span-12 flex flex-wrap items-end gap-2 lg:col-span-5 lg:justify-end print:hidden">
          <a href="/api/cjenik/xml?download=1" download="cjenik-planetbio-aktualan.xml" className="btn btn-honey min-h-12">{t('downloadXml')}</a>
          <a href="/api/cjenik/csv?download=1" download="cjenik-planetbio-aktualan.csv" className="btn min-h-12">{t('downloadCsv')}</a>
          <button type="button" onClick={() => window.print()} className="btn btn-ghost min-h-12">{t('printPdf')}</button>
        </div>
      </section>

      <section className="on-ink print:bg-white print:text-black" aria-label={t('entityHeader')}>
        <dl className="frame grid gap-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
          <div><dt className="t-small">{t('entityHeader')}</dt><dd className="mt-1 t-body font-medium">{LEGAL_ENTITY.nazivTvrtke}</dd></div>
          <div><dt className="t-small">{t('addressHeader')}</dt><dd className="mt-1 t-body font-medium">{LEGAL_ENTITY.adresa}, {LEGAL_ENTITY.postanskiBroj} {LEGAL_ENTITY.grad}</dd></div>
          <div><dt className="t-small">OIB · MB</dt><dd className="mt-1 t-body font-medium tabular">{LEGAL_ENTITY.oib} · {LEGAL_ENTITY.maticniBroj}</dd></div>
          <div><dt className="t-small">{t('anchorDateHeader')}</dt><dd className="mt-1 t-body font-medium">{LEGAL_ENTITY.referentniDatumSidrenja}</dd></div>
        </dl>
        <div className="frame flex flex-col gap-3 pb-10 md:flex-row md:items-center md:justify-between">
          <p className="t-body">
            <span className="font-medium">{t('updatedBanner', { time: timestampInfo.lastUpdatedFormatted })}</span>{' '}
            <span className="t-small">{t('nextUpdateNotice', { time: timestampInfo.nextUpdateFormatted })}</span>
          </p>
          <p className="flex gap-4 t-small print:hidden">
            <Link href="/cjenik.xml" target="_blank" className="link">{t('directXmlUrl')}</Link>
            <Link href="/cjenik.csv" target="_blank" className="link">{t('directCsvUrl')}</Link>
          </p>
        </div>
      </section>

      <section className="frame py-12 print:py-4" aria-label={t('title')}>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between print:hidden">
          <div className="flex w-full flex-col gap-2 md:w-96">
            <label htmlFor="cjenik-search" className="t-small">{t('searchPlaceholder')}</label>
            <input id="cjenik-search" type="search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="field-input" />
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label={t('colCategory')}>
            <button type="button" aria-pressed={selectedCategory === 'all'} onClick={() => setSelectedCategory('all')} className={chip(selectedCategory === 'all')}>
              {t('allProductsTab', { count: CJENIK_ITEMS.length })}
            </button>
            {categories.map((cat) => (
              <button key={cat} type="button" aria-pressed={selectedCategory === cat} onClick={() => setSelectedCategory(cat)} className={chip(selectedCategory === cat)}>
                {cat} ({CJENIK_ITEMS.filter((i) => i.vrsta === cat).length})
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[820px] border-collapse text-left t-body tabular print:min-w-full">
            <thead>
              <tr className="border-b-2 border-current">
                <th scope="col" className="py-3 pr-3 font-medium">{t('colRb')}</th>
                <th scope="col" className="py-3 pr-3 font-medium">{t('colName')}</th>
                <th scope="col" className="py-3 pr-3 font-medium print:hidden"><span className="sr-only">{t('colImage')}</span></th>
                <th scope="col" className="py-3 pr-3 font-medium">{t('colCategory')}</th>
                <th scope="col" className="py-3 pr-3 font-medium">{t('colFlavor')}</th>
                <th scope="col" className="py-3 pr-3 font-medium">{t('colPackaging')}</th>
                <th scope="col" className="py-3 pr-3 font-medium">{t('colBarcode')}</th>
                <th scope="col" className="py-3 pr-3 text-right font-medium">{t('colCurrentPrice')}</th>
                <th scope="col" className="py-3 text-right font-medium">{t('colAnchorPrice')} ({LEGAL_ENTITY.referentniDatumSidrenja})</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.length === 0 ? (
                <tr><td colSpan={9} className="py-12 text-center">{t('noResults', { query: searchQuery })}</td></tr>
              ) : (
                filteredItems.map((item) => (
                  <tr key={item.barkod} className="border-b border-current/15">
                    <td className="py-3 pr-3">{item.rb}</td>
                    <td className="py-3 pr-3 font-medium">{item.naziv}</td>
                    <td className="py-2 pr-3 print:hidden">
                      <Image src={item.slika} alt="" width={44} height={44} className="h-11 w-11 object-contain" />
                    </td>
                    <td className="py-3 pr-3">{item.vrsta}</td>
                    <td className="py-3 pr-3">{item.okus}</td>
                    <td className="py-3 pr-3">{item.pakiranje}</td>
                    <td className="py-3 pr-3 t-small">{item.barkod}</td>
                    <td className="py-3 pr-3 text-right font-medium">{item.aktualnaCijena.toFixed(2).replace('.', ',')} €</td>
                    <td className="py-3 text-right">{item.sidrenaCijena.toFixed(2).replace('.', ',')} €</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="field-surface print:hidden" aria-labelledby="arhiva-title">
        <div className="frame grid-12 gap-y-6 py-14">
          <div className="col-span-12 md:col-span-6">
            <h2 id="arhiva-title" className="font-[family-name:var(--font-display)] text-[length:var(--text-sub)] font-extrabold">{t('archiveTitle')}</h2>
            <p className="mt-3 t-body measure">{t('archiveText')}</p>
          </div>
          <div className="col-span-12 flex flex-col gap-2 md:col-span-5 md:col-start-8">
            <label htmlFor="archive-select" className="t-small">{t('archiveLabel')}</label>
            <select id="archive-select" value={selectedArchiveDate} onChange={(e) => setSelectedArchiveDate(e.target.value)} className="field-input">
              <option value="">{t('archiveCurrent', { time: timestampInfo.lastUpdatedFormatted })}</option>
              {archiveList.map((entry) => (
                <option key={entry.dateIso} value={entry.dateIso}>
                  {entry.dateFormatted}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="frame py-14 print:hidden" aria-labelledby="napomene-title">
        <h2 id="napomene-title" className="font-[family-name:var(--font-display)] text-[length:var(--text-sub)] font-extrabold">{t('legalTitle')}</h2>
        <p className="mt-4 max-w-[62ch] t-body">{t('legalText')}</p>
      </section>
    </div>
  )
}
