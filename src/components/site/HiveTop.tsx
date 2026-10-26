/**
 * Šesterokut-gumb pri dnu zaslona: puni se medom dok skrolaš, klik vraća na vrh.
 * Čisti CSS (scroll-driven animation), pojavljuje se tek nakon prvog dijela stranice.
 */
export function HiveTop({ label }: { label: string }) {
  return (
    <a href="#main-content" className="hive-top" aria-label={label}>
      <span className="hive-top-fill" aria-hidden="true" />
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" className="hive-top-arrow">
        <path d="M12 19V5m0 0-6 6m6-6 6 6" fill="none" stroke="#140e02" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 19V5m0 0-6 6m6-6 6 6" fill="none" stroke="#f6f0e4" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  )
}
