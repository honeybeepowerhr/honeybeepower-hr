'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

/**
 * Animacijski sloj stranice.
 * - ulazak dijelova sekcija ([data-reveal]) jednom, kad uđu na zaslon
 * - trake sastava rastu slijeva, fotografije s događaja ulaze odozdo
 * - fotografije u pločama sporta lagano se pomiču uz skrolanje
 * Sadržaj je vidljiv i bez JavaScripta; sve se preskače uz „smanji pokrete”.
 */
export function SectionMotionImpl() {
  useGSAP(() => {
    const main = document.getElementById('main-content')
    if (!main) return
    const mm = gsap.matchMedia()

    // Uvod i glavna fotografija proizvoda ulaze čistim CSS-om (bez čekanja na skripte).
    // Ostalo se inicijalizira kad je preglednik slobodan, da ne drži prvo iscrtavanje.
    const run = () => mm.add('(prefers-reduced-motion: no-preference)', () => {
      const vh = window.innerHeight
      const below = (el: Element) => el.getBoundingClientRect().top > vh * 0.92

      // 2. Ulazak dijelova sekcija, samo za ono što je ispod prvog zaslona.
      //    Uz označene elemente ([data-reveal]) ulaze i naslovi, odlomci, retci i slike sekcija.
      const skip = '[data-reveal] *, [data-panel] *, [data-hero-title] *, #poledina *, details *, header *, [data-no-reveal], [data-no-reveal] *'
      const auto = gsap.utils
        .toArray<HTMLElement>('section h2, section h3, section > div > p, section li, section figure, section tr, article h2, article p', main)
        .filter((el) => !el.matches(skip) && !el.closest('[data-reveal]'))
      const strip = gsap.utils.toArray<HTMLElement>('#kontakt-podnozje > a > span')
      const reveal = [...gsap.utils.toArray<HTMLElement>('[data-reveal]', main), ...auto, ...strip].filter(below)
      gsap.set(reveal, { y: 28, opacity: 0 })
      ScrollTrigger.batch(reveal, {
        start: 'top 88%',
        once: true,
        onEnter: (batch) => gsap.to(batch, { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out', stagger: 0.08, overwrite: true }),
      })

      // 3. Trake sastava rastu slijeva
      gsap.utils.toArray<HTMLElement>('[data-bar-segment]', main).forEach((seg, i) => {
        gsap.from(seg, {
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 1.1,
          ease: 'expo.out',
          delay: (i % 4) * 0.12,
          scrollTrigger: { trigger: seg, start: 'top 90%', once: true },
        })
      })

      // 4. Fotografije s događaja ulaze odozdo, jedna po jedna
      gsap.utils.toArray<HTMLElement>('[data-print]', main).forEach((el, i) => {
        gsap.from(el, {
          y: 56,
          opacity: 0,
          scale: 0.96,
          duration: 0.9,
          delay: (i % 3) * 0.08,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        })
      })

      // 5. Slika u pokretu: ploče sporta
      gsap.utils.toArray<HTMLElement>('[data-panel]', main).forEach((panel) => {
        const img = panel.querySelector('[data-panel-image]')
        if (!img) return
        gsap.fromTo(img, { scale: 1.14, yPercent: -4 }, {
          scale: 1,
          yPercent: 4,
          ease: 'none',
          scrollTrigger: { trigger: panel, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
        })
        const verb = panel.querySelector('[data-verb]')
        if (verb) gsap.from(verb, { yPercent: 60, opacity: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: panel, start: 'top 60%', once: true } })
      })

      // 6. Sličice u izjavi o sastavu
      const thumbs = gsap.utils.toArray<HTMLElement>('[data-thumb]', main)
      if (thumbs.length) {
        gsap.from(thumbs, {
          scale: 0,
          duration: 0.7,
          ease: 'back.out(1.8)',
          stagger: 0.12,
          scrollTrigger: { trigger: thumbs[0], start: 'top 85%', once: true },
        })
      }
    })

    const idle = (
      window.requestIdleCallback
        ? (cb: () => void) => window.requestIdleCallback(cb, { timeout: 1200 })
        : (cb: () => void) => window.setTimeout(cb, 300)
    )(run)

    // Fontovi i slike mijenjaju visine, pa se pozicije preračunaju kad se učitaju.
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    document.fonts?.ready.then(refresh).catch(() => {})
    return () => {
      window.removeEventListener('load', refresh)
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle as number)
      else window.clearTimeout(idle as number)
      mm.revert()
    }
  })

  return null
}
