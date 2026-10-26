'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'

export const CONSENT_KEY = 'hbp_cookie_consent'
export const OPEN_COOKIE_SETTINGS_EVENT = 'open_cookie_settings'

/**
 * Privola za kolačiće. Traka stoji na vrhu stranice, u toku sadržaja,
 * pa ništa ne prekriva. Analitika se učitava tek nakon „Prihvati sve”.
 */
export function ConsentBanner() {
  const t = useTranslations('consent')
  const locale = useLocale()
  const prefix = locale === 'hr' ? '' : `/${locale}`
  const [show, setShow] = useState(false)

  useEffect(() => {
    try {
      if (localStorage.getItem(CONSENT_KEY) === null) setShow(true)
    } catch {
      setShow(true)
    }
    const reopen = () => {
      setShow(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, reopen)
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, reopen)
  }, [])

  const decide = useCallback((value: 'granted' | 'denied') => {
    try {
      localStorage.setItem(CONSENT_KEY, value)
    } catch {
      /* privatni način: odluka vrijedi do zatvaranja kartice */
    }
    setShow(false)
    window.dispatchEvent(new Event('consent_updated'))
  }, [])

  if (!show) return null

  return (
    <section aria-label={t('label')} className="on-ink">
      <div className="frame flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between md:gap-8">
        <p className="t-body measure">
          {t('text')}{' '}
          <Link href={`${prefix}/politika-privatnosti`} className="link">
            {t('more')}
          </Link>
        </p>
        <div className="flex shrink-0 gap-2">
          <button type="button" onClick={() => decide('denied')} className="btn btn-ghost min-h-11 px-4">
            {t('necessary')}
          </button>
          <button type="button" onClick={() => decide('granted')} className="btn btn-honey min-h-11 px-4">
            {t('acceptAll')}
          </button>
        </div>
      </div>
    </section>
  )
}
