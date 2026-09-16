import React from 'react'
import type { Metadata } from 'next'
import type { Locale } from '@/types'
import { pageMetadata } from '@/lib/seo/site'

const TITLES: Record<Locale, string> = {
  hr: 'Povrat i Reklamacije',
  en: 'Returns & Complaints',
  de: 'Rückgabe & Reklamationen',
  sl: 'Vračila in Reklamacije',
  pl: 'Zwroty i Reklamacje',
}

const DESCRIPTIONS: Record<Locale, string> = {
  hr: 'Informacije o povratu i reklamacijama za Honey Bee Power proizvode — zbog prirode prehrambenih proizvoda povrat nakon otvaranja nije moguć.',
  en: 'Returns and complaints information for Honey Bee Power products — due to the nature of food products, returns are not possible once opened.',
  de: 'Informationen zu Rückgabe und Reklamationen für Honey Bee Power Produkte — aufgrund der Art der Lebensmittel ist eine Rückgabe nach dem Öffnen nicht möglich.',
  sl: 'Informacije o vračilu in reklamacijah za izdelke Honey Bee Power — zaradi narave živilskih izdelkov vračilo po odprtju ni mogoče.',
  pl: 'Informacje o zwrotach i reklamacjach produktów Honey Bee Power — ze względu na charakter produktów spożywczych zwrot po otwarciu nie jest możliwy.',
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
        <h1 className="text-3xl font-black text-gray-900">Povrat i Reklamacije</h1>

        <p>
          Narudžbe na ovoj stranici nisu klasična online kupnja s trenutnim plaćanjem — nakon vašeg upita iz košarice (putem WhatsAppa ili e-maila) osobno vas kontaktiramo s ponudom, konačnom cijenom i dogovorom oko dostave i plaćanja.
        </p>

        <h2 className="text-lg font-bold text-gray-900 pt-4">Povrat robe nije moguć</h2>
        <p>
          Naši proizvodi su prehrambeni dodaci prehrani koji se, zbog zdravstvenih i higijenskih razloga, ne mogu vratiti niti zamijeniti nakon što je pakiranje otvoreno. Povrat neotvorenog i neoštećenog proizvoda moguć je isključivo uz prethodni dogovor s nama.
        </p>

        <h2 className="text-lg font-bold text-gray-900 pt-4">Reklamacije</h2>
        <p>
          Ako ste zaprimili oštećen, neispravan ili pogrešno isporučen proizvod, javite nam se odmah po primitku na{' '}
          <a href="mailto:info@planetbio.hr" className="text-amber-600 hover:underline">info@planetbio.hr</a> ili putem WhatsAppa, uz fotografiju proizvoda i broj upita. Rješavamo reklamacije o našem trošku u najkraćem mogućem roku.
        </p>
      </div>
    </div>
  )
}
