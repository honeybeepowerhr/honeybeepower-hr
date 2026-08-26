'use client'

import { useEffect, useRef, useState } from 'react'

const SESSION_KEY = 'hbp-intro-seen'

export function PageIntro() {
  const [visible, setVisible] = useState(false)
  const [go, setGo] = useState(false)
  const pctRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return
      sessionStorage.setItem(SESSION_KEY, '1')
    } catch {
      // sessionStorage unavailable — just skip the intro
      return
    }

    setVisible(true)
    const start = performance.now()
    const duration = 650
    let raf = 0

    function step(ts: number) {
      const p = Math.min((ts - start) / duration, 1)
      if (pctRef.current) pctRef.current.textContent = `${Math.round(p * 100)}%`
      if (p < 1) {
        raf = requestAnimationFrame(step)
      } else {
        setTimeout(() => setGo(true), 160)
      }
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [])

  if (!visible) return null

  return (
    <div className={`motion-curtain${go ? ' is-go' : ''}`} aria-hidden="true">
      <span className="motion-curtain-label">Honey Bee Power</span>
      <div ref={pctRef} className="motion-curtain-pct">0%</div>
    </div>
  )
}
