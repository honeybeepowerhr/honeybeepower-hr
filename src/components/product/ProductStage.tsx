'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

export interface StageOrb {
  src: string
  label: string
  /** položaj u postocima pozornice */
  x: number
  y: number
  /** dubina paralakse u pikselima */
  depth: number
  /** promjer u pikselima */
  size: number
  delay: number
}

interface Props {
  src: string
  alt: string
  /** omjer širine i visine proizvoda */
  ratio: number
  field: string
  ink: string
  word: string
  orbs: StageOrb[]
}

/**
 * Pozornica proizvoda: boja okusa, golem naziv okusa iza proizvoda, šesterokuti i sastojci koji lebde
 * na različitim dubinama. Pomicanjem miša slojevi se razmiču, a proizvod se 3D nagiba.
 * Bez miša (mobitel) pozornica se sama lagano njiše. Uz „smanji pokrete” sve miruje.
 */
export default function ProductStage({ src, alt, ratio, field, ink, word, orbs }: Props) {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    let visible = true
    let tx = 0
    let ty = 0
    let cx = 0
    let cy = 0
    let last = -1e9

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      tx = Math.max(-1.2, Math.min(1.2, ((e.clientX - r.left) / r.width - 0.5) * 2))
      ty = Math.max(-1.2, Math.min(1.2, ((e.clientY - r.top) / r.height - 0.5) * 2))
      last = performance.now()
    }
    const tick = (t: number) => {
      raf = 0
      if (!visible) return
      if (t - last > 1800) {
        tx = Math.sin(t / 2400) * 0.55
        ty = Math.cos(t / 3100) * 0.35
      }
      cx += (tx - cx) * 0.07
      cy += (ty - cy) * 0.07
      el.style.setProperty('--mx', cx.toFixed(4))
      el.style.setProperty('--my', cy.toFixed(4))
      raf = requestAnimationFrame(tick)
    }
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible && !raf) raf = requestAnimationFrame(tick)
    })
    io.observe(el)
    window.addEventListener('pointermove', onMove, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return (
    <div
      ref={root}
      className="stage"
      style={{ ['--stage-field' as string]: field, ['--len' as string]: Math.max(5, word.length), color: ink }}
    >
      <div className="stage-layer" style={{ ['--d' as string]: '10px' }} aria-hidden="true">
        <div className="stage-hex" />
      </div>

      <div className="stage-layer" style={{ ['--d' as string]: '-34px' }} aria-hidden="true">
        <p className="stage-word" data-no-reveal>{word}</p>
      </div>

      <div className="stage-layer" style={{ ['--d' as string]: '-20px' }} aria-hidden="true">
        <span className="stage-floathex" style={{ left: '10%', top: '16%', ['--hs' as string]: '4.5rem', animationDelay: '-2s' }} />
        <span className="stage-floathex" style={{ right: '9%', top: '58%', ['--hs' as string]: '3rem', animationDelay: '-5s' }} />
        <span className="stage-floathex" style={{ left: '18%', bottom: '10%', ['--hs' as string]: '2.2rem', animationDelay: '-8s' }} />
      </div>

      <div className="stage-layer" style={{ ['--d' as string]: '30px' }}>
        <div className="stage-product-wrap">
          <div className="stage-enter">
            <div className="stage-float">
              <Image
                src={src}
                alt={alt}
                width={Math.round(1000 * ratio)}
                height={1000}
                priority
                sizes="(min-width: 768px) 40vw, 80vw"
                className="stage-img"
                style={{ aspectRatio: String(ratio) }}
              />
            </div>
          </div>
          <span className="stage-shadow" aria-hidden="true" />
        </div>
      </div>

      {orbs.map((o) => (
        <div key={o.label} className="stage-pos" style={{ left: `${o.x}%`, top: `${o.y}%`, ['--d' as string]: `${o.depth}px` }} aria-hidden="true">
          <div className="stage-orb-enter" style={{ animationDelay: `${o.delay}ms` }}>
            <div className="stage-orb" style={{ ['--s' as string]: `${o.size}px`, animationDuration: `${6 + (o.size % 5)}s` }}>
              <Image src={o.src} alt="" width={200} height={200} sizes="120px" className="stage-orb-img" />
              <span className="stage-orb-label">{o.label}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
