import React from 'react'
import type { Metadata } from 'next'
import type { Locale } from '@/types'
import { pageMetadata } from '@/lib/seo/site'

const TITLES: Record<Locale, string> = {
  hr: 'Pravo na Povrat i Reklamacije',
  en: 'Returns & Refunds',
  de: 'Widerruf & Rückgabe',
  sl: 'Pravica do Vračila',
  pl: 'Zwroty i Reklamacje',
}

const DESCRIPTIONS: Record<Locale, string> = {
  hr: 'Upute i uvjeti za jednostrani raskid ugovora i povrat robe u roku 14 dana kod Honey Bee Power narudžbi.',
  en: 'Instructions and terms for contract withdrawal and returns within 14 days for Honey Bee Power orders.',
  de: 'Anleitung und Bedingungen für Widerruf und Rückgabe innerhalb von 14 Tagen bei Honey Bee Power Bestellungen.',
  sl: 'Navodila in pogoji za odstop od pogodbe in vračilo blaga v 14 dneh za naročila Honey Bee Power.',
  pl: 'Instrukcje i warunki odstąpienia od umowy oraz zwrotu towaru w ciągu 14 dni dla zamówień Honey Bee Power.',
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  return pageMetadata({
    locale,
    path: '/pravo-na-povrat',
    title: TITLES[locale] ?? TITLES.hr,
    description: DESCRIPTIONS[locale] ?? DESCRIPTIONS.hr,
  })
}

export default function ReturnsPage() {
  return (
    <div className="py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-3xl space-y-6 text-gray-700 text-sm leading-relaxed">
        <h1 className="text-3xl font-black text-gray-900">Pravo na Povrat i Reklamacije</h1>

        <p>
          Sukladno Zakonu o zaštiti potrošača, kupac ima pravo na jednostrani raskid ugovora u roku od 14 dana od dana preuzimanja paketa, bez navođenja razloga.
        </p>

        <h2 className="text-lg font-bold text-gray-900 pt-4">Uvjeti za Povrat</h2>
        <p>
          Proizvod mora biti u originalnoj, neoštećenoj ambalaži i neotvoren (zbog zdravstvenih i higijenskih razloga prehrambenih artikala).
        </p>

        <h2 className="text-lg font-bold text-gray-900 pt-4">Postupak Povrata</h2>
        <ol className="list-decimal pl-5 space-y-1">
          <li>Pošaljite obavijest o povratu na email: info@planetbio.hr</li>
          <li>Zakirajte artikl i pošaljite ga na adresu: Planet Bio d.o.o., Krndijska ulica 4, 31500 Našice</li>
          <li>Nakon zaprimanja i pregleda artikla, izvršit ćemo povrat sredstava u roku od 7 radnih dana.</li>
        </ol>
      </div>
    </div>
  )
}
