'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

/**
 * Animacijski sloj stranice (smjer: „Shutter image”).
 * - glavni trenutak: fotografija u uvodnoj rečenici otvara se s ruba (clip-path),
 *   a slika se smiruje sa 1,12 na 1
 * - ulazak dijelova sekcija ([data-reveal]) jednom, kad uđu na zaslon
 * - trake sastava rastu slijeva, fotografije s događaja „padaju” na mjesto
 * - fotografije u pločama sporta lagano se pomiču uz skrolanje
 * Sadržaj je vidljiv i bez JavaScripta; sve se preskače uz „smanji pokrete”.
 */
export function SectionMotion() {
  useGSAP(() => {
    const main = document.getElementById('main-content')
    if (!main) return
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const vh = window.innerHeight
      const below = (el: Element) => el.getBoundingClientRect().top > vh * 0.92

      // 1. Uvod: riječi, zatvarač na fotografiji, rečenica ispod
      const strip = main.querySelector<HTMLElement>('[data-hero-strip]')
      if (strip) {
        const img = strip.querySelector('img')
        const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
        tl.from(main.querySelectorAll('[data-hero-word]'), { yPercent: 40, opacity: 0, duration: 0.9, stagger: 0.08 })
          .fromTo(strip, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.1 }, 0.15)
          .from(img, { scale: 1.12, duration: 1.4 }, 0.15)
          .from(main.querySelectorAll('[data-hero-lead], [data-hero-actions]'), { y: 24, opacity: 0, duration: 0.8, stagger: 0.09 }, 0.55)
      }

      // 1b. Glavna fotografija ostalih stranica otvara se istim zatvaračem
      main.querySelectorAll<HTMLElement>('[data-product-image]').forEach((el) => {
        const box = el.parentElement
        if (!box || below(box)) return
        gsap.fromTo(box, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 1.1, ease: 'expo.out', delay: 0.1 })
        gsap.from(el, { scale: 1.12, duration: 1.4, ease: 'expo.out', delay: 0.1 })
      })

      // 2. Ulazak dijelova sekcija, samo za ono što je ispod prvog zaslona
      const reveal = gsap.utils.toArray<HTMLElement>('[data-reveal]', main).filter(below)
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

      // 4. Fotografije s događaja „padaju” na mjesto
      gsap.utils.toArray<HTMLElement>('[data-print]', main).forEach((el, i) => {
        gsap.from(el, {
          y: -60,
          rotate: i % 2 ? 14 : -16,
          opacity: 0,
          duration: 1,
          ease: 'back.out(1.4)',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
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

    // Fontovi i slike mijenjaju visine, pa se pozicije preračunaju kad se učitaju.
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    document.fonts?.ready.then(refresh).catch(() => {})
    return () => {
      window.removeEventListener('load', refresh)
      mm.revert()
    }
  })

  return null
}
