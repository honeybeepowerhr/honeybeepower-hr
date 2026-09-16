'use client'

import { OPEN_COOKIE_SETTINGS_EVENT } from './ConsentBanner'

interface CookieSettingsLinkProps {
  label: string
  className?: string
}

/** Re-opens the cookie consent banner so a visitor can change their choice. */
export function CookieSettingsLink({ label, className }: CookieSettingsLinkProps) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT))}
      className={className}
    >
      {label}
    </button>
  )
}
