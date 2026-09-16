'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Cookie } from 'lucide-react'

export const CONSENT_KEY = 'hbp_cookie_consent'
export const OPEN_COOKIE_SETTINGS_EVENT = 'open_cookie_settings'

export function ConsentBanner() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY)
    if (consent === null) {
      setShowBanner(true)
    }

    const handleReopen = () => setShowBanner(true)
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, handleReopen)
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, handleReopen)
  }, [])

  const handleAccept = useCallback(() => {
    localStorage.setItem(CONSENT_KEY, 'granted')
    setShowBanner(false)
    window.dispatchEvent(new Event('consent_updated'))
  }, [])

  const handleDecline = useCallback(() => {
    localStorage.setItem(CONSENT_KEY, 'denied')
    setShowBanner(false)
    window.dispatchEvent(new Event('consent_updated'))
  }, [])

  if (!showBanner) return null

  return (
    <div
      role="region"
      aria-label="Postavke kolačića"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 z-[60] max-w-md bg-slate-900 text-white rounded-3xl p-6 shadow-2xl border border-amber-500/20"
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl shrink-0" aria-hidden="true">🍯</span>
        <div className="space-y-2">
          <h3 className="font-heading font-black text-base uppercase tracking-wide flex items-center gap-1.5">
            <Cookie className="w-4 h-4 text-amber-400" aria-hidden="true" />
            Kolačići u igri
          </h3>
          <p className="text-xs text-gray-300 leading-relaxed">
            Koristimo kolačiće da stranica radi kako treba i da vidimo što vam se sviđa. Birate vi — sve, ili samo ono nužno za rad stranice.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-5 pt-4 border-t border-white/10">
        <button
          type="button"
          onClick={handleDecline}
          className="w-full rounded-xl border border-white/20 text-white font-bold text-xs px-4 py-2.5 hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
        >
          Samo nužni
        </button>
        <button
          type="button"
          onClick={handleAccept}
          className="w-full rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-4 py-2.5 shadow transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
        >
          Prihvati sve
        </button>
      </div>
    </div>
  )
}
