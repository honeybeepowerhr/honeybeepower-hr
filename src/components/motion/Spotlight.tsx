'use client'

import { useEffect, useRef } from 'react'

/** Cursor-follow glow. Mount inside a `position:relative` dark container. */
export function Spotlight() {
  const spotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const spot = spotRef.current
    const host = spot?.parentElement
    if (!spot || !host) return
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!fine) return

    function onMove(e: MouseEvent) {
      const r = host!.getBoundingClientRect()
      spot!.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`)
      spot!.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`)
    }
    host.addEventListener('mousemove', onMove)
    return () => host.removeEventListener('mousemove', onMove)
  }, [])

  return <div ref={spotRef} className="motion-spotlight" aria-hidden="true" />
}
