'use client'

import React from 'react'

interface MarqueeProps {
  children: React.ReactNode
  className?: string
  trackClassName?: string
  /** Seconds for one full loop. Lower = faster. */
  durationSeconds?: number
}

export function Marquee({ children, className, trackClassName, durationSeconds = 24 }: MarqueeProps) {
  return (
    <div className={`motion-marquee ${className ?? ''}`}>
      <div
        className={`motion-marquee-track ${trackClassName ?? ''}`}
        style={{ ['--marquee-duration' as string]: `${durationSeconds}s` }}
      >
        {children}
        {children}
      </div>
    </div>
  )
}
