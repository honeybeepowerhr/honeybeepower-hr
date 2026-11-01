'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenisInstance: Lenis | null = null

/**
 * Doživljaj stranice: glatko skrolanje (Lenis), svjetlo koje prati miš,
 * magnetski gumbi, 3D nagib kartica i svjetlo na karticama. Sve se isključuje
 * uz „smanji pokrete”, a pokazivački efekti rade samo uz miš (ne na dodir).
 */
export default function ExperienceImpl() {
  const pathname = usePathname()

  // Nova stranica uvijek počinje na vrhu, bez trzaja glatkog skrolanja.
  useEffect(() => {
    lenisInstance?.scrollTo(0, { immediate: true, force: true })
  }, [pathname])

  // Košnica u uvodu: svaka ćelija ima svoju dubinu pa se micanjem miša razmiču kao slojevi.
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const hive = document.querySelector<HTMLElement>('[data-hive]')
    if (!hive || reduce || !fine) return
    const cells = Array.from(hive.querySelectorAll<HTMLElement>('[data-depth]'))
    const setters = cells.map((el) => ({
      el,
      depth: Number(el.dataset.depth) || 1,
      x: gsap.quickTo(el, 'x', { duration: 0.9, ease: 'power3' }),
      y: gsap.quickTo(el, 'y', { duration: 0.9, ease: 'power3' }),
    }))
    const onMove = (e: PointerEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5
      const ny = e.clientY / window.innerHeight - 0.5
      for (const s of setters) {
        s.x(nx * s.depth * -34)
        s.y(ny * s.depth * -26)
      }
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [pathname])

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (reduce) return
    const cleanups: Array<() => void> = []

    // 1. Glatko skrolanje, sinkronizirano s GSAP-om
    const lenis = new Lenis({ lerp: 0.085, smoothWheel: true, anchors: true })
    lenisInstance = lenis
    document.documentElement.classList.add('lenis-on')
    const onScroll = () => ScrollTrigger.update()
    lenis.on('scroll', onScroll)
    const tick = (t: number) => lenis.raf(t * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    // Dok je otvorena ladica, dijalog ili izbornik, stranica iza ne smije se micati.
    const syncLock = () => {
      const locked = document.body.hasAttribute('data-scroll-locked') || document.body.style.overflow === 'hidden'
      if (locked) lenis.stop()
      else lenis.start()
    }
    const mo = new MutationObserver(syncLock)
    mo.observe(document.body, { attributes: true, attributeFilter: ['style', 'data-scroll-locked'] })
    cleanups.push(() => {
      mo.disconnect()
      gsap.ticker.remove(tick)
      lenis.off('scroll', onScroll)
      lenis.destroy()
      lenisInstance = null
      document.documentElement.classList.remove('lenis-on')
    })

    if (fine) {
      // 2. Svjetlo koje prati miš
      const glow = document.createElement('div')
      glow.className = 'cursor-glow'
      glow.setAttribute('aria-hidden', 'true')
      document.body.appendChild(glow)
      const gx = gsap.quickTo(glow, 'x', { duration: 0.6, ease: 'power3' })
      const gy = gsap.quickTo(glow, 'y', { duration: 0.6, ease: 'power3' })

      // Pčelica kasni za pokazivačem i naginje se u smjeru kretanja
      const bee = document.createElement('div')
      bee.className = 'bee'
      bee.setAttribute('aria-hidden', 'true')
      bee.innerHTML =
        '<svg viewBox="0 0 48 40" width="38" height="32"><g class="bee-wing"><ellipse cx="24" cy="10" rx="9" ry="6" transform="rotate(-28 24 10)" fill="#fff" fill-opacity=".9" stroke="#1d2048" stroke-width="1.6"/></g><g class="bee-wing"><ellipse cx="31" cy="9" rx="9" ry="6" transform="rotate(-8 31 9)" fill="#fff" fill-opacity=".8" stroke="#1d2048" stroke-width="1.6"/></g><clipPath id="bee-body"><ellipse cx="25" cy="24" rx="15" ry="10.5"/></clipPath><ellipse cx="25" cy="24" rx="15" ry="10.5" fill="#ffb800"/><g clip-path="url(#bee-body)" fill="#1d2048"><rect x="17" y="10" width="4.5" height="30"/><rect x="26" y="10" width="4.5" height="30"/></g><ellipse cx="25" cy="24" rx="15" ry="10.5" fill="none" stroke="#1d2048" stroke-width="2.4"/><path d="M10 24 4 24" stroke="#1d2048" stroke-width="2.6" stroke-linecap="round"/><circle cx="41" cy="22" r="6.4" fill="#1d2048"/><circle cx="43" cy="20.5" r="1.7" fill="#fff"/></svg>'
      document.body.appendChild(bee)
      const beeX = gsap.quickTo(bee, 'x', { duration: 1.15, ease: 'power3' })
      const beeY = gsap.quickTo(bee, 'y', { duration: 1.15, ease: 'power3' })
      const beeR = gsap.quickTo(bee, 'rotation', { duration: 0.8, ease: 'power2' })
      let lastX = 0

      let magnet: HTMLElement | null = null
      let tilt: HTMLElement | null = null

      const resetMagnet = () => {
        if (magnet) magnet.style.translate = ''
        magnet = null
      }
      const resetTilt = () => {
        if (tilt) gsap.to(tilt, { rotateX: 0, rotateY: 0, duration: 0.7, ease: 'power3.out', overwrite: 'auto' })
        tilt = null
      }

      const onMove = (e: PointerEvent) => {
        glow.dataset.on = '1'
        bee.dataset.on = '1'
        gx(e.clientX)
        gy(e.clientY)
        beeX(e.clientX + 26)
        beeY(e.clientY + 22)
        beeR(Math.max(-24, Math.min(24, (e.clientX - lastX) * 1.2)))
        lastX = e.clientX
        const target = e.target as Element | null
        if (!target?.closest) return

        // 3. Magnetski gumbi
        const m = target.closest<HTMLElement>('.btn, [data-magnetic]')
        if (m !== magnet) resetMagnet()
        if (m && !m.hasAttribute('disabled')) {
          magnet = m
          const r = m.getBoundingClientRect()
          const dx = e.clientX - (r.left + r.width / 2)
          const dy = e.clientY - (r.top + r.height / 2)
          m.style.translate = `${(dx * 0.22).toFixed(1)}px ${(dy * 0.32).toFixed(1)}px`
        }

        // 4. Nagib kartica i svjetlo na karticama
        const tl = target.closest<HTMLElement>('[data-tilt]')
        if (tl !== tilt) resetTilt()
        if (tl) {
          tilt = tl
          const r = tl.getBoundingClientRect()
          const px = (e.clientX - r.left) / r.width - 0.5
          const py = (e.clientY - r.top) / r.height - 0.5
          const deg = Number(tl.dataset.tilt) || 12
          gsap.to(tl, { rotateY: px * deg, rotateX: -py * deg, transformPerspective: 900, duration: 0.5, ease: 'power3.out', overwrite: 'auto' })
        }
        const card = target.closest<HTMLElement>('.card')
        if (card) {
          const r = card.getBoundingClientRect()
          card.style.setProperty('--mx', `${e.clientX - r.left}px`)
          card.style.setProperty('--my', `${e.clientY - r.top}px`)
        }
      }
      const onLeave = () => {
        glow.dataset.on = ''
        bee.dataset.on = ''
        resetMagnet()
        resetTilt()
      }
      window.addEventListener('pointermove', onMove, { passive: true })
      document.documentElement.addEventListener('pointerleave', onLeave)
      cleanups.push(() => {
        window.removeEventListener('pointermove', onMove)
        document.documentElement.removeEventListener('pointerleave', onLeave)
        glow.remove()
        bee.remove()
      })
    }

    return () => cleanups.forEach((fn) => fn())
  }, [])

  return null
}
