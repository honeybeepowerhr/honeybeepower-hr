import React from 'react'
import type { Metadata } from 'next'
import { ActivitiesGallery } from '@/components/home/ActivitiesGallery'
import type { Locale } from '@/types'
import { pageMetadata } from '@/lib/seo/site'

const TITLES: Record<Locale, string> = {
  hr: 'Sportske Aktivnosti i Događaji',
  en: 'Sports Activities & Events',
  de: 'Sportevents & Aktivitäten',
  sl: 'Športne Aktivnosti in Dogodki',
  pl: 'Wydarzenia i Aktywności Sportowe',
}

const DESCRIPTIONS: Record<Locale, string> = {
  hr: 'Pregled utrka, maratona i biciklističkih natjecanja na kojima je prisutan Honey Bee Power tim i njegovi partneri.',
  en: 'A look at the races, marathons and cycling events where the Honey Bee Power team and partners are on the ground.',
  de: 'Ein Überblick über Läufe, Marathons und Radrennen, bei denen das Honey Bee Power Team vor Ort ist.',
  sl: 'Pregled tekov, maratonov in kolesarskih tekmovanj, na katerih sodeluje ekipa Honey Bee Power.',
  pl: 'Przegląd biegów, maratonów i zawodów kolarskich, w których uczestniczy zespół Honey Bee Power.',
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  return pageMetadata({
    locale,
    path: '/aktivnosti',
    title: TITLES[locale] ?? TITLES.hr,
    description: DESCRIPTIONS[locale] ?? DESCRIPTIONS.hr,
    image: '/images/events/event-1.jpg',
  })
}

export default function ActivitiesPage() {
  return (
    <div className="py-8">
      <ActivitiesGallery />
    </div>
  )
}
