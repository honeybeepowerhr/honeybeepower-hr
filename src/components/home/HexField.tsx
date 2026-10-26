'use client'

import { useEffect, useRef } from 'react'

/**
 * Saće u pozadini uvoda: mreža šesterokuta koja svijetli oko pokazivača.
 * Bez miša (mobitel) svjetlo samo lutaju po polju. Crta se samo dok je vidljivo.
 */
export default function HexField() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const R = 34
    const dx = R * Math.sqrt(3)
    const dy = R * 1.5
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    let w = 0
    let h = 0
    let raf = 0
    let visible = true
    let lastMove = -1e9
    const m = { x: -9999, y: -9999, tx: -9999, ty: -9999 }

    const resize = () => {
      const r = canvas.getBoundingClientRect()
      w = r.width
      h = r.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const hex = (x: number, y: number) => {
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const a = Math.PI / 6 + (i * Math.PI) / 3
        const px = x + R * 0.9 * Math.cos(a)
        const py = y + R * 0.9 * Math.sin(a)
        if (i) ctx.lineTo(px, py)
        else ctx.moveTo(px, py)
      }
      ctx.closePath()
    }

    const draw = (t: number) => {
      raf = 0
      if (!visible) return
      // Bez nedavnog pokreta miša svjetlo lagano luta po polju.
      if (t - lastMove > 2200) {
        m.tx = w * (0.62 + 0.28 * Math.sin(t / 2600))
        m.ty = h * (0.5 + 0.32 * Math.sin(t / 1900 + 1.3))
      }
      m.x += (m.tx - m.x) * 0.1
      m.y += (m.ty - m.y) * 0.1
      ctx.clearRect(0, 0, w, h)
      ctx.lineWidth = 1
      for (let row = 0; row * dy < h + R; row++) {
        for (let col = -1; col * dx < w + R; col++) {
          const x = col * dx + (row % 2 ? dx / 2 : 0)
          const y = row * dy
          const d = Math.hypot(x - m.x, y - m.y)
          const near = Math.max(0, 1 - d / 240)
          const wave = ((Math.sin(t / 1700 + x * 0.011 + y * 0.009) + 1) / 2) * 0.05
          if (near > 0.03) {
            ctx.fillStyle = `rgba(255,183,27,${(near * near * 0.2).toFixed(3)})`
            hex(x, y)
            ctx.fill()
          }
          ctx.strokeStyle = `rgba(255,183,27,${(0.04 + wave + near * 0.5).toFixed(3)})`
          hex(x, y)
          ctx.stroke()
        }
      }
      if (!reduce) raf = requestAnimationFrame(draw)
    }

    const start = () => {
      if (!raf) raf = requestAnimationFrame(draw)
    }
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      m.tx = e.clientX - r.left
      m.ty = e.clientY - r.top
      lastMove = performance.now()
    }
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
    })
    resize()
    io.observe(canvas)
    window.addEventListener('resize', resize)
    if (!reduce) window.addEventListener('pointermove', onMove, { passive: true })
    start()
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 h-full w-full" />
}
