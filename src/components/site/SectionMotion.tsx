'use client'

import dynamic from 'next/dynamic'

/**
 * Animacijski sloj (GSAP) učitava se tek nakon prvog iscrtavanja:
 * ne renderira ništa, pa ne treba poslužiteljski HTML, a izvan je početnog paketa.
 */
export const SectionMotion = dynamic(
  () => import('./SectionMotionImpl').then((m) => m.SectionMotionImpl),
  { ssr: false },
)
