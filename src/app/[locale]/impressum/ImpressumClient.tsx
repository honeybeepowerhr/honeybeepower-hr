'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { LEGAL_ENTITY } from '@/lib/cjenik-data'
import { MANUFACTURER } from '@/lib/declarations'

export default function ImpressumClient() {
  const t = useTranslations('legal')

  return (
    <div className="py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-3xl space-y-6">
        <h1 className="text-3xl font-black text-gray-900">{t('impressumTitle')}</h1>

        <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200 space-y-4 text-sm text-gray-700">
          <div>
            <strong className="text-gray-900 block text-base">{t('companyName')}</strong>
            {LEGAL_ENTITY.nazivTvrtke}
          </div>

          <div>
            <strong className="text-gray-900 block">{t('address')}</strong>
            {LEGAL_ENTITY.adresa}, {LEGAL_ENTITY.postanskiBroj} {LEGAL_ENTITY.grad}, {LEGAL_ENTITY.drzava}
          </div>

          <div>
            <strong className="text-gray-900 block">{t('contactDetails')}</strong>
            E-mail: <a href="mailto:info@planetbio.hr" className="underline">info@planetbio.hr</a>
            <br />
            Tel.: <a href="tel:+385977097962" className="underline">+385 97 709 7962</a>
          </div>

          <div>
            <strong className="text-gray-900 block">{t('idData')}</strong>
            OIB: {LEGAL_ENTITY.oib}
            <br />
            {t('registrationNumber')}: {LEGAL_ENTITY.maticniBroj}
          </div>

          <div>
            <strong className="text-gray-900 block">{t('manufacturer')}</strong>
            {MANUFACTURER.name}, {MANUFACTURER.address} ·{' '}
            <a href={MANUFACTURER.web} className="underline" rel="noopener" target="_blank">
              honeybeepower.pl
            </a>
            <br />
            {t('distributorNote')}
          </div>
        </div>

        <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 font-semibold">
          {t('disclaimerNotice')}
        </div>
      </div>
    </div>
  )
}
