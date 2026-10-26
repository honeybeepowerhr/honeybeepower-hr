'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

interface Props {
  titleStart: string
  titleEnd: string
  caption: string
  stageLabels: [string, string, string]
  imageAlt: string
}

/**
 * „One frame, three distances”: poleđina gela naranča u istom okviru,
 * cijela vrećica → redak sa sastavom → nutritivna tablica.
 * Ishodišta zuma izračunata su na fotografiji poleđine (778 × 1600).
 */
const STAGES = [
  { scale: 1, origin: '50% 50%' },
  { scale: 2.1, origin: '42% 46%' },
  { scale: 3.3, origin: '67% 52%' },
] as const

export function BackLabelShowcase({ titleStart, titleEnd, caption, stageLabels, imageAlt }: Props) {
  const [stage, setStage] = useState(0)
  const markers = useRef<Array<HTMLDivElement | null>>([])

  useEffect(() => {
    const els = markers.current.filter(Boolean) as HTMLDivElement[]
    if (!els.length || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setStage(Number((e.target as HTMLElement).dataset.stage))
        }
      },
      { rootMargin: '-50% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const s = STAGES[stage]

  return (
    <section aria-labelledby="poledina-title" className="relative" id="poledina">
      <div className="relative h-[300svh]">
        {/* Nevidljive oznake koje mijenjaju kadar */}
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            ref={(el) => {
              markers.current[i] = el
            }}
            data-stage={i}
            aria-hidden="true"
            className="absolute left-0 w-px"
            style={{ top: `${i * 100}svh`, height: '100svh' }}
          />
        ))}

        <div className="sticky top-0 flex h-[100svh] flex-col items-center justify-center overflow-hidden frame">
          <h2 id="poledina-title" className="t-display relative z-10 w-full text-center text-[length:var(--text-display)]">
            <span className="block">{titleStart}</span>
            <span className="sr-only"> {titleEnd}</span>
          </h2>

          <div className="relative mt-4 grid w-full grid-cols-1 items-start md:grid-cols-[1fr_auto_1fr] md:gap-8">
            <div className="hidden md:block" />
            <div className="relative mx-auto aspect-[4/5] w-[70vw] overflow-hidden bg-surface md:w-[min(30vw,46svh)]">
              <Image
                src="/images/products/gelnaranca-zadnja.png"
                alt={imageAlt}
                fill
                sizes="(min-width: 768px) 60vw, 100vw"
                className="object-contain transition-transform duration-700 ease-[var(--ease-out-expo)] motion-reduce:transition-none"
                style={{ transform: `scale(${s.scale})`, transformOrigin: s.origin }}
              />
            </div>
            <p
              className="mt-5 t-body measure text-center md:mt-0 md:max-w-[28ch] md:text-left"
              aria-live="polite"
            >
              <span className="block font-medium">{stageLabels[stage]}</span>
              <span className="mt-2 block">{caption}</span>
            </p>
          </div>

          <p
            aria-hidden="true"
            className="t-display relative z-10 mt-3 w-full md:-mt-[0.28em] text-center text-[length:var(--text-display)]"
          >
            {titleEnd}
          </p>
        </div>
      </div>
    </section>
  )
}
