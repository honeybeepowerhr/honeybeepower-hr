import React from 'react'
import type { Metadata } from 'next'
import type { Locale } from '@/types'
import { pageMetadata } from '@/lib/seo/site'

const TITLES: Record<Locale, string> = {
  hr: 'Uvjeti Korištenja',
  en: 'Terms of Use',
  de: 'Nutzungsbedingungen',
  sl: 'Pogoji Uporabe',
  pl: 'Warunki Użytkowania',
}

const DESCRIPTIONS: Record<Locale, string> = {
  hr: 'Opći uvjeti poslovanja i korištenja web trgovine Honey Bee Power — plaćanje, dostava i odnos s kupcima.',
  en: 'General terms of business and use of the Honey Bee Power webshop — payment, delivery and customer relations.',
  de: 'Allgemeine Geschäftsbedingungen des Honey Bee Power Webshops — Zahlung, Lieferung und Kundenbeziehungen.',
  sl: 'Splošni pogoji poslovanja in uporabe spletne trgovine Honey Bee Power — plačilo, dostava in odnos s kupci.',
  pl: 'Ogólne warunki handlowe sklepu internetowego Honey Bee Power — płatność, dostawa i relacje z klientami.',
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  return pageMetadata({
    locale,
    path: '/uvjeti-koristenja',
    title: TITLES[locale] ?? TITLES.hr,
    description: DESCRIPTIONS[locale] ?? DESCRIPTIONS.hr,
  })
}

export default function TermsPage() {
  return (
    <div className="py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-3xl space-y-6 text-gray-700 leading-relaxed text-sm">
        <h1 className="text-3xl font-black text-gray-900">Uvjeti Korištenja</h1>
        <p>Datum stupanja na snagu: 1. siječnja 2025.</p>

        <h2 className="text-lg font-bold text-gray-900 pt-4">1. Opće odredbe</h2>
        <p>
          Ovi Opći uvjeti poslovanja uređuju odnos između kupca i trgovačkog društva Planet Bio d.o.o., Krndijska ulica 4, 31500 Našice za kupovinu putem webshopa honeybeepower.hr.
        </p>

        <h2 className="text-lg font-bold text-gray-900 pt-4">2. Ponuda i plaćanje</h2>
        <p>
          Konačna ponuda, cijena i način plaćanja dogovaraju se osobno nakon zaprimljenog upita. Plaćanje je moguće kreditnim/debitnim karticama, pouzećem ili bankovnom doznakom.
        </p>

        <h2 className="text-lg font-bold text-gray-900 pt-4">3. Dostava</h2>
        <p>
          Dostava se vrši na području Republike Hrvatske i Europske Unije u suradnji s kurirskim službama (HP Express, GLS, Overseas). Rok i trošak dostave dogovaraju se prilikom potvrde upita.
        </p>
      </div>
    </div>
  )
}
