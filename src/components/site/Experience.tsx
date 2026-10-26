'use client'

import dynamic from 'next/dynamic'

/** Učitava se tek nakon prvog iscrtavanja: ne renderira ništa, pa nema poslužiteljskog HTML-a. */
export const Experience = dynamic(() => import('./ExperienceImpl'), { ssr: false })
