'use client'

import React from 'react'
import { useTilt } from './useTilt'
import { cn } from '@/lib/utils'

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  strength?: number
}

/** Wraps children in a div with a 3D tilt-toward-cursor hover effect. Safe to use inside .map(). */
export function TiltCard({ children, className, strength = 0.5 }: TiltCardProps) {
  const ref = useTilt<HTMLDivElement>(strength)
  return (
    <div ref={ref} className={cn('motion-tilt', className)} style={{ perspective: '1000px' }}>
      {children}
    </div>
  )
}
