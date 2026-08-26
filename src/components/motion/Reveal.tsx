'use client'

import React, { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface RevealProps {
  children: React.ReactNode
  className?: string
  /** Extra transition-delay in ms, for staggering siblings. */
  delay?: number
  /** 'up' fades + rises (default), 'scale' also grows in from 0.94. */
  variant?: 'up' | 'scale'
  as?: 'div' | 'li'
}

export function Reveal({ children, className, delay = 0, variant = 'up', as = 'div' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold: 0.18 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const Tag = as
  return (
    <Tag
      ref={ref as never}
      className={cn(
        'motion-reveal',
        variant === 'scale' && 'motion-reveal-scale',
        inView && 'motion-in-view',
        className,
      )}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined }}
    >
      {children}
    </Tag>
  )
}
