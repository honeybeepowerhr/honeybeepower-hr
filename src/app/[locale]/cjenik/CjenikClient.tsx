'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  FileCode,
  FileSpreadsheet,
  Download,
  Printer,
  Search,
  CheckCircle2,
  Clock,
  Calendar,
  AlertTriangle,
  Info,
  ShieldCheck,
  Building2,
  FileText,
  ExternalLink,
  ChevronDown,
  RefreshCw,
} from 'lucide-react'
import {
  LEGAL_ENTITY,
  CJENIK_ITEMS,
  getLatestUpdateTimestamp,
  get30DayArchiveList,
  CjenikItem,
} from '@/lib/cjenik-data'

export function CjenikClient() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedArchiveDate, setSelectedArchiveDate] = useState<string>('')
  const [showArchive, setShowArchive] = useState(false)
  const [showLegalNotes, setShowLegalNotes] = useState(false)

  // Calculate live daily timestamp compliance info
  const timestampInfo = useMemo(() => getLatestUpdateTimestamp(), [])
  const archiveList = useMemo(() => get30DayArchiveList(), [])

  // Categories list
  const categories = useMemo(() => {
    const set = new Set<string>()
    CJENIK_ITEMS.forEach((item) => set.add(item.vrsta))
    return Array.from(set)
  }, [])

  // Filtered items based on search and category
  const filteredItems = useMemo(() => {
    return CJENIK_ITEMS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.vrsta === selectedCategory
      
      const query = searchQuery.toLowerCase().trim()
      if (!query) return matchesCategory

      const matchesSearch =
        item.naziv.toLowerCase().includes(query) ||
        item.barkod.includes(query) ||
        item.okus.toLowerCase().includes(query) ||
        item.vrsta.toLowerCase().includes(query)

      return matchesCategory && matchesSearch
    })
  }, [searchQuery, selectedCategory])

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print()
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-10 px-4 sm:px-6 lg:px-8 print:bg-white print:text-slate-900 print:py-0 print:px-0">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* ── Top Legal Notice & Entity Header ── */}
        <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-sm print:border-none print:shadow-none print:p-0 print:bg-transparent">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-700/80 print:border-slate-300">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-3 print:hidden">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                Službeni i legalni digitalni cjenik RH
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight print:text-slate-900">
                CIJENIK PROIZVODA
              </h1>
              <p className="text-slate-400 text-sm mt-1 print:text-slate-600">
                Planet Bio, obrt za usluge | Usklađeno s obvezom isticanja sidrene cijene i digitalne objave
              </p>
            </div>

            {/* Print & Machine-Readable Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 print:hidden">
              <a
                href="/api/cjenik/xml?download=1"
                download="cjenik-planetbio-aktualan.xml"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-lg hover:shadow-amber-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                title="Preuzmi cjenik u strojno čitljivom .XML formatu"
              >
                <FileCode className="w-4 h-4" />
                Preuzmi .XML
              </a>

              <a
                href="/api/cjenik/csv?download=1"
                download="cjenik-planetbio-aktualan.csv"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-all shadow-lg hover:shadow-emerald-600/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                title="Preuzmi cjenik u strojno čitljivom .CSV formatu"
              >
                <FileSpreadsheet className="w-4 h-4" />
                Preuzmi .CSV
              </a>

              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold text-xs sm:text-sm transition-all border border-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                title="Ispiši ili spremi cjenik kao PDF"
              >
                <Printer className="w-4 h-4" />
                Ispiši / PDF
              </button>
            </div>
          </div>

          {/* Legal Entity Credentials Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 text-xs sm:text-sm">
            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/50 print:bg-slate-50 print:border-slate-200">
              <span className="text-slate-400 block text-xs font-medium uppercase tracking-wider mb-1 print:text-slate-500">
                Pravna Osoba / Obrt
              </span>
              <span className="font-bold text-white print:text-slate-900">
                {LEGAL_ENTITY.nazivTvrtke}
              </span>
            </div>

            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/50 print:bg-slate-50 print:border-slate-200">
              <span className="text-slate-400 block text-xs font-medium uppercase tracking-wider mb-1 print:text-slate-500">
                Sjedište i Adresa
              </span>
              <span className="font-semibold text-slate-200 print:text-slate-800">
                {LEGAL_ENTITY.adresa}, {LEGAL_ENTITY.postanskiBroj} {LEGAL_ENTITY.grad}
              </span>
            </div>

            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/50 print:bg-slate-50 print:border-slate-200">
              <span className="text-slate-400 block text-xs font-medium uppercase tracking-wider mb-1 print:text-slate-500">
                OIB & Matični Broj
              </span>
              <span className="font-mono text-slate-200 print:text-slate-800">
                OIB: <strong className="text-white print:text-slate-900">{LEGAL_ENTITY.oib}</strong> | MB: {LEGAL_ENTITY.maticniBroj}
              </span>
            </div>

            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/50 print:bg-slate-50 print:border-slate-200">
              <span className="text-slate-400 block text-xs font-medium uppercase tracking-wider mb-1 print:text-slate-500">
                Referentni Datum Sidrenja
              </span>
              <span className="font-bold text-amber-400 print:text-slate-900">
                {LEGAL_ENTITY.referentniDatumSidrenja}
              </span>
            </div>
          </div>
        </div>

        {/* ── Daily Update Timestamp Banner ── */}
        <div className="bg-gradient-to-r from-emerald-950/70 via-slate-800 to-slate-800 border border-emerald-500/30 rounded-2xl p-5 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4 print:hidden">
          <div className="flex items-start sm:items-center gap-3">
            <div className="relative flex-shrink-0 mt-1 sm:mt-0">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-white text-sm sm:text-base">
                  Ažurirano: {timestampInfo.lastUpdatedFormatted}
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  DNEVNO AKTIVAN CJENIK
                </span>
              </div>
              <p className="text-slate-400 text-xs mt-0.5">
                Sljedeće obvezno automatsko ažuriranje: <strong className="text-slate-200">{timestampInfo.nextUpdateFormatted}</strong> (svakodnevno do 08:00h ujutro).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end border-t md:border-t-0 border-slate-700/80 pt-3 md:pt-0">
            <Link
              href="/cjenik.xml"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-4"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Izravan URL cjenik.xml
            </Link>
            <Link
              href="/cjenik.csv"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-semibold underline underline-offset-4"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Izravan URL cjenik.csv
            </Link>
          </div>
        </div>

        {/* ── Search & Filter Controls ── */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 sm:p-6 shadow-md space-y-4 print:hidden">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Pretraži naziv, okus, vrsta ili barkod..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white bg-slate-800 px-1.5 py-0.5 rounded"
                >
                  Poništi
                </button>
              )}
            </div>

            {/* Quick Category Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  selectedCategory === 'all'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                    : 'bg-slate-900/60 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60'
                }`}
              >
                Svi proizvodi ({CJENIK_ITEMS.length})
              </button>

              {categories.map((cat) => {
                const count = CJENIK_ITEMS.filter((i) => i.vrsta === cat).length
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                      selectedCategory === cat
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                        : 'bg-slate-900/60 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60'
                    }`}
                  >
                    {cat} ({count})
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── Main Legal Price Table ── */}
        <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl shadow-xl overflow-hidden print:border-slate-300 print:shadow-none print:rounded-none">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[768px] print:min-w-full">
              <thead>
                <tr className="bg-slate-900/90 border-b border-slate-700 text-slate-300 text-xs font-semibold uppercase tracking-wider print:bg-slate-100 print:text-slate-900 print:border-slate-300">
                  <th scope="col" className="py-4 px-4 w-12 text-center">r.b.</th>
                  <th scope="col" className="py-4 px-4">Naziv Proizvoda</th>
                  <th scope="col" className="py-4 px-3 w-20 text-center print:hidden">Slika</th>
                  <th scope="col" className="py-4 px-4">Vrsta Proizvoda</th>
                  <th scope="col" className="py-4 px-4">Okus Proizvoda</th>
                  <th scope="col" className="py-4 px-4 font-mono">Barkod Proizvoda</th>
                  <th scope="col" className="py-4 px-4 text-right">
                    Aktualna Cijena <br />
                    <span className="text-[10px] text-amber-400 font-normal lowercase print:text-slate-600">(po komadu EUR)</span>
                  </th>
                  <th scope="col" className="py-4 px-4 text-right bg-amber-500/10 border-l border-amber-500/20 print:bg-slate-50 print:border-slate-300">
                    Sidrena Cijena <br />
                    <span className="text-[10px] text-amber-400 font-semibold lowercase print:text-slate-600">(10.9.2026. EUR)</span>
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-700/60 text-sm print:divide-slate-200 print:text-slate-900">
                {filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-400">
                      Nije pronađen nijedan proizvod koji odgovara pretrazi "{searchQuery}".
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((item, idx) => (
                    <tr
                      key={item.barkod + idx}
                      className="hover:bg-slate-700/40 transition-colors group print:hover:bg-transparent"
                    >
                      {/* r.b. */}
                      <td className="py-4 px-4 text-center font-mono text-slate-400 text-xs font-semibold print:text-slate-600">
                        {item.rb}
                      </td>

                      {/* Naziv */}
                      <td className="py-4 px-4 font-bold text-white group-hover:text-amber-400 transition-colors print:text-slate-900">
                        {item.naziv}
                      </td>

                      {/* Slika */}
                      <td className="py-2 px-3 text-center print:hidden">
                        <div className="w-12 h-12 relative mx-auto bg-slate-900 rounded-lg p-1 border border-slate-700/60 overflow-hidden flex items-center justify-center">
                          <Image
                            src={item.slika}
                            alt={item.naziv}
                            width={48}
                            height={48}
                            className="object-contain max-h-full max-w-full"
                          />
                        </div>
                      </td>

                      {/* Vrsta */}
                      <td className="py-4 px-4 text-slate-300 font-medium print:text-slate-800">
                        <span className="inline-block px-2.5 py-1 rounded-md text-xs font-medium bg-slate-900/80 border border-slate-700 print:bg-transparent print:border-none print:p-0">
                          {item.vrsta}
                        </span>
                      </td>

                      {/* Okus */}
                      <td className="py-4 px-4 text-slate-300 font-medium print:text-slate-800">
                        {item.okus}
                      </td>

                      {/* Barkod */}
                      <td className="py-4 px-4 font-mono text-xs text-slate-400 print:text-slate-700">
                        {item.barkod}
                      </td>

                      {/* Aktualna Cijena */}
                      <td className="py-4 px-4 text-right font-bold text-white text-base print:text-slate-900">
                        {item.aktualnaCijena.toFixed(2).replace('.', ',')} €
                      </td>

                      {/* Sidrena Cijena */}
                      <td className="py-4 px-4 text-right font-bold text-amber-400 text-base bg-amber-500/5 border-l border-amber-500/20 print:bg-slate-50 print:text-slate-900 print:border-slate-300">
                        <span className="inline-flex items-center justify-end gap-1">
                          {item.sidrenaCijena.toFixed(2).replace('.', ',')} €
                          <span className="text-[10px] font-normal text-amber-300/80 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20 print:hidden">
                            Sidrena
                          </span>
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer Summary */}
          <div className="bg-slate-900/90 px-6 py-4 border-t border-slate-700 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2 print:border-slate-300 print:bg-transparent print:text-slate-700">
            <div>
              Prikazano <strong>{filteredItems.length}</strong> od <strong>{CJENIK_ITEMS.length}</strong> službenih artikala na cjeniku.
            </div>
            <div>
              Valuta plaćanja: <strong>EUR (€)</strong> | Svoje cijene redovito ažuriramo svaki dan do 08:00h.
            </div>
          </div>
        </div>

        {/* ── 30-Day Legal Archive Section ── */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl print:hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-700/80">
            <div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold text-white">
                  Javna Arhiva Digitalnih Cjenika (Zadnjih 30 Dana)
                </h3>
              </div>
              <p className="text-slate-400 text-xs mt-1">
                Zakonska obveza javne arhive: Sve prethodne dnevne verzije digitalnih cjenika ostaju dostupne najmanje 30 dana.
              </p>
            </div>

            <button
              onClick={() => setShowArchive(!showArchive)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-semibold text-xs transition-all border border-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <Clock className="w-4 h-4 text-amber-400" />
              {showArchive ? 'Sakrij arhivu' : 'Prikaži svih 30 dana'}
              <ChevronDown className={`w-4 h-4 transition-transform ${showArchive ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Quick Date Selector */}
          <div className="mt-4 flex flex-col sm:flex-row items-center gap-4">
            <label htmlFor="archive-select" className="text-xs font-medium text-slate-300 whitespace-nowrap">
              Odaberi povijesni datum cjenika:
            </label>
            <select
              id="archive-select"
              value={selectedArchiveDate}
              onChange={(e) => setSelectedArchiveDate(e.target.value)}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="">-- Trenutačno važeći cjenik ({timestampInfo.lastUpdatedFormatted}) --</option>
              {archiveList.map((entry) => (
                <option key={entry.dateIso} value={entry.dateIso}>
                  {entry.dateFormatted} (Verzija objavljena u 07:59:00 h) {entry.isCurrent ? '— [Danas]' : ''}
                </option>
              ))}
            </select>

            {selectedArchiveDate && (
              <div className="flex items-center gap-2">
                <a
                  href={`/api/cjenik/xml?date=${selectedArchiveDate}&download=1`}
                  download={`cjenik-planetbio-${selectedArchiveDate}.xml`}
                  className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-xs font-semibold transition-all inline-flex items-center gap-1.5"
                >
                  <FileCode className="w-3.5 h-3.5" />
                  Preuzmi XML ({selectedArchiveDate})
                </a>
                <a
                  href={`/api/cjenik/csv?date=${selectedArchiveDate}&download=1`}
                  download={`cjenik-planetbio-${selectedArchiveDate}.csv`}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition-all inline-flex items-center gap-1.5"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  Preuzmi CSV ({selectedArchiveDate})
                </a>
              </div>
            )}
          </div>

          {/* Full Archive Grid (Collapsible) */}
          {showArchive && (
            <div className="mt-6 pt-6 border-t border-slate-700/80">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {archiveList.map((entry) => (
                  <div
                    key={entry.dateIso}
                    className={`p-3 rounded-xl border text-xs space-y-2 transition-all ${
                      entry.isCurrent
                        ? 'bg-amber-500/10 border-amber-500/40 text-amber-200'
                        : 'bg-slate-900/60 border-slate-700/70 hover:border-slate-500 text-slate-300'
                    }`}
                  >
                    <div className="font-bold font-mono text-white flex items-center justify-between">
                      <span>{entry.dateFormatted}</span>
                      {entry.isCurrent && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-500 text-slate-950 font-bold">
                          Aktivno
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Objavljeno: 07:59h
                    </div>
                    <div className="flex items-center gap-2 pt-1 border-t border-slate-700/50">
                      <a
                        href={`/api/cjenik/xml?date=${entry.dateIso}&download=1`}
                        className="text-amber-400 hover:text-amber-300 hover:underline text-[11px] font-semibold"
                        title="XML preuzimanje"
                      >
                        .XML
                      </a>
                      <span className="text-slate-600">|</span>
                      <a
                        href={`/api/cjenik/csv?date=${entry.dateIso}&download=1`}
                        className="text-emerald-400 hover:text-emerald-300 hover:underline text-[11px] font-semibold"
                        title="CSV preuzimanje"
                      >
                        .CSV
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Legal & Regulatory Compliance Callout ── */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl print:hidden">
          <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowLegalNotes(!showLegalNotes)}>
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-amber-400" />
              <div>
                <h4 className="text-base font-bold text-white">
                  Pravne napomene i zakonski okvir o digitalnom cjeniku RH
                </h4>
                <p className="text-slate-400 text-xs">
                  Pročitajte detaljne legalne odredbe o obvezi isticanja sidrene cijene i strojno čitljivih cjenika.
                </p>
              </div>
            </div>
            <button className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold">
              {showLegalNotes ? 'Sakrij detalje' : 'Prikaži pravne upute'}
            </button>
          </div>

          {showLegalNotes && (
            <div className="mt-6 pt-6 border-t border-slate-700/80 text-xs sm:text-sm text-slate-300 leading-relaxed space-y-4">
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200">
                <h5 className="font-bold mb-1 text-amber-300 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Obveza isticanja "sidrene" cijene u RH od 1. listopada 2026.
                </h5>
                <p>
                  Obveza isticanja sidrene (dodatne) cijene u Republici Hrvatskoj proširuje se na sve proizvode u maloprodaji s početkom primjene od 1. listopada 2026. godine. Sidrenom cijenom smatra se ona cijena koja je za pojedini proizvod vrijedila na referentni dan <strong>10. rujna 2026. godine</strong>.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-700">
                  <h6 className="font-bold text-white mb-1">Tehnički Format</h6>
                  <p className="text-slate-400 text-xs">
                    Cjenik se mora objaviti u strojno čitljivom digitalnom obliku – isključivo u <strong>.XML</strong> ili <strong>.CSV</strong> formatu. Običan PDF ili slika ne zadovoljavaju zakonsku formu.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-700">
                  <h6 className="font-bold text-white mb-1">Dinamika Ažuriranja</h6>
                  <p className="text-slate-400 text-xs">
                    Trgovci na malo dužni su objaviti i redovito ažurirati svoje cjenike u digitalnom obliku svakog dana najkasnije do <strong>8:00 sati ujutro</strong>.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-700">
                  <h6 className="font-bold text-white mb-1">Povijest Podataka (30 Dana)</h6>
                  <p className="text-slate-400 text-xs">
                    Prethodne verzije digitalnih cjenika moraju ostati javno dostupne u arhivi na web stranici najmanje 30 dana radi inspekcijskog nadzora.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-slate-400">
                <p className="font-semibold text-slate-300 mb-1">
                  Nadzor i kaznene odredbe Državnog inspektorata:
                </p>
                <p>
                  Nadzor nad provođenjem odluka obavlja Tržišna inspekcija Državnog inspektorata RH. Zakon o iznimnim mjerama kontrole cijena za nepridržavanje pravila definira novčane kazne:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Pravne osobe: od 3.000 € do 30.000 €</li>
                  <li>Obrtnici i samostalne djelatnosti: od 1.000 € do 20.000 €</li>
                  <li>Odgovorne osobe u pravnim osobama: od 1.000 € do 4.000 €</li>
                </ul>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
