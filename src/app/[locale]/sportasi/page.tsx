import { redirect } from 'next/navigation'
import type { Locale } from '@/types'

export default async function SportasiPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const prefix = locale === 'hr' ? '' : `/${locale}`
  redirect(`${prefix}/aktivnosti`)
}
