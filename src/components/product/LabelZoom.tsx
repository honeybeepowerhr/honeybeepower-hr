'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

interface Props {
  /** lagana statična slika za prikaz na stranici */
  src: string
  /** oštra verzija za povećalo i prikaz u punoj veličini */
  zoomSrc: string
  /** omjer širine i visine, da stranica ne skače dok se slika učitava */
  ratio: number
  alt: string
  hint: string
  openLabel: string
  closeLabel: string
}

const ZOOM = 2.6
const LENS = 190

/**
 * Deklaracija na poleđini: pod mišem se otvara povećalo, a klik otvara cijelu deklaraciju u punoj veličini
 * (sitni tekst je inače nečitljiv). Slike su statične (bez optimizatora), pa se uvijek prikazuju.
 */
export default function LabelZoom({ src, zoomSrc, ratio, alt, hint, openLabel, closeLabel }: Props) {
  const box = useRef<HTMLButtonElement>(null)
  const [lens, setLens] = useState<{ x: number; y: number; w: number } | null>(null)
  const [open, setOpen] = useState(false)
  const [zoomReady, setZoomReady] = useState(false)
  const [mounted, setMounted] = useState(false)
  const preloading = useRef(false)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  // Oštra slika za povećalo učitava se tek kad miš uđe na deklaraciju; povećalo se pokazuje kad je spremna.
  const preload = () => {
    if (preloading.current) return
    preloading.current = true
    const img = new window.Image()
    img.onload = () => setZoomReady(true)
    img.src = zoomSrc
  }

  const move = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || !box.current) return
    preload()
    const r = box.current.getBoundingClientRect()
    setLens({ x: e.clientX - r.left, y: e.clientY - r.top, w: r.width })
  }

  return (
    <figure>
      <button
        ref={box}
        type="button"
        onClick={() => setOpen(true)}
        onPointerMove={move}
        onPointerLeave={() => setLens(null)}
        aria-label={openLabel}
        className="relative block w-full cursor-zoom-in overflow-hidden rounded-[var(--radius)] border-2 border-[color:var(--color-ink)] bg-white shadow-[0_6px_0_var(--color-ink)]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} width={1000} height={Math.round(1000 / ratio)} loading="lazy" decoding="async" className="block h-auto w-full" />
        {lens && zoomReady && (
          <span
            aria-hidden="true"
            className="lens"
            style={{
              width: LENS,
              height: LENS,
              left: lens.x - LENS / 2,
              top: lens.y - LENS / 2,
              backgroundImage: `url(${zoomSrc})`,
              backgroundSize: `${lens.w * ZOOM}px auto`,
              backgroundPosition: `${-(lens.x * ZOOM - LENS / 2)}px ${-(lens.y * ZOOM - LENS / 2)}px`,
            }}
          />
        )}
      </button>
      <figcaption className="mt-4 t-small text-muted">{hint}</figcaption>

      {open &&
        mounted &&
        createPortal(
          <div role="dialog" aria-modal="true" aria-label={alt} data-lenis-prevent className="lightbox" onClick={() => setOpen(false)}>
            <button type="button" onClick={() => setOpen(false)} className="btn btn-honey lightbox-close">
              {closeLabel}
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={zoomSrc} alt={alt} className="lightbox-img" onClick={(e) => e.stopPropagation()} />
          </div>,
          document.body,
        )}
    </figure>
  )
}
