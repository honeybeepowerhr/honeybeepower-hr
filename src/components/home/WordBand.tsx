'use client'

import React, { useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'

const REPEATS = 6

export function WordBand() {
  const t = useTranslations('wordBand')
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    let lastY = window.scrollY
    let timer: ReturnType<typeof setTimeout>

    function onScroll() {
      const dy = window.scrollY - lastY
      lastY = window.scrollY
      const skew = Math.max(-9, Math.min(9, dy * 0.6))
      el!.style.transition = 'none'
      el!.style.transform = `skewY(${skew}deg)`
      clearTimeout(timer)
      timer = setTimeout(() => {
        el!.style.transition = ''
        el!.style.transform = 'skewY(0deg)'
      }, 100)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(timer)
    }
  }, [])

  const words = Array.from({ length: REPEATS }).flatMap((_, i) => [
    { text: t('word1'), fill: true, key: `w1-${i}` },
    { text: t('word2'), fill: false, key: `w2-${i}` },
  ])

  return (
    <div ref={ref} className="motion-wordband py-6 sm:py-8" aria-hidden="true">
      <div className="motion-marquee-track" style={{ ['--marquee-duration' as string]: '16s' }}>
        {[...words, ...words].map((w, i) => (
          <span
            key={`${w.key}-${i}`}
            className={`motion-wordband-word text-[52px] sm:text-[88px] lg:text-[130px] px-6 sm:px-9${w.fill ? ' is-fill' : ''}`}
          >
            {w.text}
          </span>
        ))}
      </div>
    </div>
  )
}
