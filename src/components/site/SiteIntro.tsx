import Image from 'next/image'

/**
 * Uvodna animacija: šesterokut se puni medom, zatim se zastor podiže.
 * Čisti CSS (nestaje sam, i bez JavaScripta), jednom po posjetu (razred `intro-seen` postavlja skripta u zaglavlju).
 */
export function SiteIntro() {
  return (
    <div className="intro" aria-hidden="true">
      <div className="intro-inner">
        <svg viewBox="0 0 100 115" width="92" height="106" className="intro-hex">
          <defs>
            <clipPath id="intro-clip">
              <polygon points="50,3 95,28.5 95,86.5 50,112 5,86.5 5,28.5" />
            </clipPath>
          </defs>
          <g clipPath="url(#intro-clip)">
            <rect className="intro-fill" x="0" y="0" width="100" height="115" />
          </g>
          <polygon points="50,3 95,28.5 95,86.5 50,112 5,86.5 5,28.5" fill="none" stroke="#ffb71b" strokeWidth="2.5" strokeLinejoin="round" />
        </svg>
        <Image src="/images/logo-white.png" alt="" width={176} height={43} priority className="intro-logo" />
      </div>
    </div>
  )
}
