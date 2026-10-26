import type { Metadata } from 'next'
import type { Locale } from '@/types'
import { pageMetadata } from '@/lib/seo/site'
import { getLegalDoc } from '@/lib/legal-data'
import { LegalPage } from '@/components/site/LegalPage'

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  const { doc } = getLegalDoc('politika-privatnosti', locale)
  return pageMetadata({ locale, path: '/politika-privatnosti', title: doc.title, description: doc.metaDescription })
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  return <LegalPage slug="politika-privatnosti" locale={locale} />
}
