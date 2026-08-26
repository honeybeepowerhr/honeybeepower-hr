'use client'

import React from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Reveal } from '@/components/motion/Reveal'
import { Marquee } from '@/components/motion/Marquee'

interface Partner {
  key: string
  name: string
  src: string
  featured?: boolean
}

const PARTNERS: Partner[] = [
  { key: 'oktal', name: 'Oktal Pharm', src: '/images/partners/oktal-pharm.jpg', featured: true },
  { key: 'nexe', name: 'RK NEXE', src: '/images/partners/rk-nexe.png' },
  { key: 'zrk-brod', name: 'ŽRK Brod', src: '/images/partners/zrk-brod.jpg' },
  { key: 'kbk-impact', name: 'KBK Impact Našice', src: '/images/partners/kbk-impact.png' },
  { key: 'ab-sport', name: 'AB Sport', src: '/images/partners/ab-sport.png' },
  { key: 'event-sport-hub', name: 'Event Sport Hub', src: '/images/partners/event-sport-hub.jpg' },
]

const FEATURED = PARTNERS.find((p) => p.featured)!
const REST = PARTNERS.filter((p) => !p.featured)

interface PartnerLogosProps {
  variant?: 'full' | 'compact'
  className?: string
  /** Show the section heading badge. Defaults to true for "full", false for "compact". */
  showHeading?: boolean
}

export function PartnerLogos({ variant = 'full', className = '', showHeading }: PartnerLogosProps) {
  const t = useTranslations('socialProof')
  const heading = showHeading ?? variant === 'full'

  if (variant === 'compact') {
    return (
      <Marquee className={className} durationSeconds={26}>
        <div className="flex items-center gap-3 pr-3">
          {PARTNERS.map((partner) => (
            <div
              key={partner.key}
              title={partner.name}
              className={[
                'relative h-12 w-24 sm:h-14 sm:w-28 rounded-xl bg-white/95 border overflow-hidden flex-shrink-0',
                partner.featured ? 'border-amber-400 ring-1 ring-amber-400/40' : 'border-white/10',
              ].join(' ')}
            >
              <Image src={partner.src} alt={partner.name} fill className="object-contain p-2" />
            </div>
          ))}
        </div>
      </Marquee>
    )
  }

  return (
    <div className={className}>
      {heading && (
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6 text-center">
          {t('partnersBadge')}
        </p>
      )}

      {/* Featured partner — Oktal Pharm gets top billing */}
      <Reveal variant="scale" className="max-w-xs mx-auto mb-8">
        <div className="relative rounded-3xl bg-white border-2 border-amber-400 shadow-lg shadow-amber-100 px-8 py-6 flex flex-col items-center gap-3 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
          <span className="absolute -top-3 px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-[10px] font-bold uppercase tracking-widest shadow-sm">
            {t('keyPartnerBadge')}
          </span>
          <div className="relative h-16 w-40 mt-1">
            <Image src={FEATURED.src} alt={FEATURED.name} fill className="object-contain" />
          </div>
          <span className="text-sm font-bold text-gray-800 tracking-wide">{FEATURED.name}</span>
        </div>
      </Reveal>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 max-w-4xl mx-auto">
        {REST.map((partner, i) => (
          <Reveal key={partner.key} delay={i * 70}>
            <div className="group rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 p-4 flex flex-col items-center gap-2">
              <div className="relative h-14 w-full grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100 transition-all duration-300">
                <Image src={partner.src} alt={partner.name} fill className="object-contain" />
              </div>
              <span className="text-[11px] font-semibold text-gray-500 text-center leading-tight">
                {partner.name}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
