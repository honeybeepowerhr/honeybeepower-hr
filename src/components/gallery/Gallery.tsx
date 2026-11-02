'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

export interface GalleryItem {
  id: string
  /** slika za mrežu (optimizira ih Next.js) */
  src: string
  /** veća slika za prikaz preko cijelog zaslona */
  full: string
  alt: string
  w: number
  h: number
  /** pozadina za izrezane proizvode; bez nje je fotografija */
  bg?: string
}

export interface GalleryTab {
  id: string
  label: string
  items: GalleryItem[]
}

/**
 * Galerija: kartice (fotografije s događaja, proizvodi), mreža i prikaz preko cijelog zaslona
 * sa strelicama, tipkama ← → i Esc, te povlačenjem prsta na mobitelu.
 */
export default function Gallery({ tabs }: { tabs: GalleryTab[] }) {
  const t = useTranslations('gallery')
  const [tabId, setTabId] = useState(tabs[0].id)
  const [open, setOpen] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)
  const trigger = useRef<HTMLElement | null>(null)
  const closeBtn = useRef<HTMLButtonElement>(null)
  const touchX = useRef<number | null>(null)

  const tab = tabs.find((x) => x.id === tabId) ?? tabs[0]
  const items = tab.items
  const current = open !== null ? items[open] : null

  useEffect(() => setMounted(true), [])

  const show = useCallback((i: number) => setOpen((i + items.length) % items.length), [items.length])
  const close = useCallback(() => {
    setOpen(null)
    trigger.current?.focus()
  }, [])

  useEffect(() => {
    if (open === null) return
    document.body.style.overflow = 'hidden'
    closeBtn.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowRight') show(open + 1)
      else if (e.key === 'ArrowLeft') show(open - 1)
    }
    window.addEventListener('keydown', onKey)
    // susjedne slike učitavaju se unaprijed
    for (const d of [1, -1]) {
      const n = items[(open + d + items.length) % items.length]
      const img = new window.Image()
      img.src = n.full
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, items, show, close])

  return (
    <>
      <div role="tablist" aria-label={t('title')} className="flex flex-wrap gap-2">
        {tabs.map((x) => (
          <button
            key={x.id}
            type="button"
            role="tab"
            aria-selected={x.id === tabId}
            onClick={() => {
              setTabId(x.id)
              setOpen(null)
            }}
            className="flavour-chip"
            style={{ ['--chip' as string]: 'var(--color-honey)' }}
          >
            {x.label}
            <span className="t-small tabular opacity-70">{x.items.length}</span>
          </button>
        ))}
      </div>

      {tab.id === 'events' ? (
        <ul className="mt-10 columns-2 gap-3 md:columns-3 lg:columns-4 [&>li]:mb-3">
          {items.map((it, i) => (
            <li key={it.id} className="break-inside-avoid">
              <button
                type="button"
                onClick={(e) => {
                  trigger.current = e.currentTarget
                  setOpen(i)
                }}
                aria-label={`${t('view')}: ${it.alt}`}
                className="photo group block w-full cursor-zoom-in border-2 border-[color:var(--color-ink)]"
              >
                <Image src={it.src} alt={it.alt} width={it.w} height={it.h} sizes="(min-width: 1024px) 24vw, (min-width: 768px) 32vw, 48vw" className="h-auto w-full" />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {items.map((it, i) => (
            <li key={it.id}>
              <button
                type="button"
                onClick={(e) => {
                  trigger.current = e.currentTarget
                  setOpen(i)
                }}
                aria-label={`${t('view')}: ${it.alt}`}
                className="photo group relative block aspect-square w-full cursor-zoom-in border-2 border-[color:var(--color-ink)]"
                style={{ background: it.bg }}
              >
                <Image src={it.src} alt={it.alt} fill sizes="(min-width: 1024px) 24vw, (min-width: 768px) 32vw, 48vw" className="object-contain p-[8%]" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {current &&
        mounted &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={current.alt}
            data-lenis-prevent
            className="gallery-view"
            onClick={close}
            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchX.current === null) return
              const dx = e.changedTouches[0].clientX - touchX.current
              touchX.current = null
              if (Math.abs(dx) > 50) show((open as number) + (dx < 0 ? 1 : -1))
            }}
          >
            <button ref={closeBtn} type="button" onClick={close} className="btn btn-honey gallery-close">
              {t('close')}
            </button>
            <button
              type="button"
              className="gallery-nav gallery-prev"
              aria-label={t('prev')}
              onClick={(e) => {
                e.stopPropagation()
                show((open as number) - 1)
              }}
            >
              ←
            </button>
            <button
              type="button"
              className="gallery-nav gallery-next"
              aria-label={t('next')}
              onClick={(e) => {
                e.stopPropagation()
                show((open as number) + 1)
              }}
            >
              →
            </button>
            <figure className="gallery-figure" onClick={(e) => e.stopPropagation()}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img key={current.id} src={current.full} alt={current.alt} className="gallery-img" style={current.bg ? { background: current.bg, padding: '2rem' } : undefined} />
              <figcaption className="mt-4 text-center t-small text-[#fff2cf]">
                {current.alt} · <span className="tabular">{(open as number) + 1} / {items.length}</span>
              </figcaption>
            </figure>
          </div>,
          document.body,
        )}
    </>
  )
}
