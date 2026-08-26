'use client'

import React from 'react'
import { FileText, Download } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { Reveal } from '@/components/motion/Reveal'
import { useMagnetic } from '@/components/motion/useMagnetic'
import type { Locale } from '@/types'

const PRESENTATION_FILES: Record<Locale, string> = {
  hr: '/presentations/Honey-Bee-Power-HR.pdf',
  en: '/presentations/Honey-Bee-Power-EN.pdf',
  de: '/presentations/Honey-Bee-Power-DE.pdf',
  sl: '/presentations/Honey-Bee-Power-SI.pdf',
  // No Polish deck yet — fall back to the English presentation.
  pl: '/presentations/Honey-Bee-Power-EN.pdf',
}

interface PresentationDownloadProps {
  className?: string
}

export function PresentationDownload({ className = '' }: PresentationDownloadProps) {
  const t = useTranslations('presentation')
  const locale = useLocale() as Locale
  const href = PRESENTATION_FILES[locale] ?? PRESENTATION_FILES.hr
  const magnetRef = useMagnetic<HTMLAnchorElement>()

  return (
    <Reveal
      variant="scale"
      className={`flex flex-col sm:flex-row items-center gap-5 bg-charcoal text-white rounded-3xl p-6 sm:p-8 transition-transform duration-300 hover:-translate-y-1 ${className}`}
    >
      <div className="w-14 h-14 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center flex-shrink-0">
        <FileText className="w-7 h-7" />
      </div>
      <div className="flex-1 text-center sm:text-left">
        <h3 className="text-lg font-bold">{t('title')}</h3>
        <p className="text-sm text-gray-300 mt-1">{t('subtitle')}</p>
      </div>
      <a
        ref={magnetRef}
        href={href}
        download
        className="motion-magnet inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-colors flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
      >
        <Download className="w-4 h-4" />
        {t('cta')}
      </a>
    </Reveal>
  )
}
