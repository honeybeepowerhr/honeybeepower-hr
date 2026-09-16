'use client'

import React from 'react'
import { useTranslations } from 'next-intl'

export default function ShippingPaymentClient() {
  const t = useTranslations('legal')

  return (
    <div className="py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-3xl space-y-6 text-gray-700 text-sm leading-relaxed">
        <h1 className="text-3xl font-black text-gray-900">{t('shippingTitle')}</h1>

        <div className="p-5 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900 font-medium">
          {t('shippingNotice')}
        </div>

        <h2 className="text-lg font-bold text-gray-900 pt-4">{t('paymentMethodsTitle')}</h2>
        <p>
          Način plaćanja dogovaramo osobno nakon vašeg upita — najčešće:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Plaćanje pouzećem:</strong> gotovinom pri preuzimanju paketa od kurira.</li>
          <li><strong>Bankovna doznaka:</strong> uplata na račun Planet Bio d.o.o. prije slanja.</li>
        </ul>

        <h2 className="text-lg font-bold text-gray-900 pt-4">{t('deliveryTermsTitle')}</h2>
        <p>
          Nakon što pošaljete upit iz košarice (WhatsApp ili e-mail), javljamo se osobno u roku od 24h s rokom dostave, cijenom i načinom plaćanja. Uobičajeno vrijeme dostave nakon dogovora je 1-3 radna dana.
        </p>
      </div>
    </div>
  )
}
