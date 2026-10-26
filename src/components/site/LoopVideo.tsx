'use client'

import { useEffect, useRef, useState } from 'react'

interface LoopVideoProps {
  sources: Array<{ src: string; type: string }>
  poster: string
  label: string
  pauseLabel: string
  playLabel: string
  className?: string
}

/**
 * Nijemi video u petlji s posterom. Pokreće se tek kad je na zaslonu,
 * ne pokreće se uz „smanji pokrete” i uvijek ima gumb za zaustavljanje.
 */
export function LoopVideo({ sources, poster, label, pauseLabel, playLabel, className }: LoopVideoProps) {
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const userPaused = useRef(false)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    video.muted = true
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !userPaused.current) {
          video.play().then(() => setPlaying(true)).catch(() => {})
        } else {
          video.pause()
          setPlaying(false)
        }
      },
      { threshold: 0.25 },
    )
    io.observe(video)
    return () => io.disconnect()
  }, [])

  const toggle = () => {
    const video = ref.current
    if (!video) return
    if (video.paused) {
      userPaused.current = false
      video.play().then(() => setPlaying(true)).catch(() => {})
    } else {
      userPaused.current = true
      video.pause()
      setPlaying(false)
    }
  }

  return (
    <div className={`relative overflow-hidden ${className ?? ''}`}>
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="none"
        poster={poster}
        aria-label={label}
        className="absolute inset-0 h-full w-full object-cover"
      >
        {sources.map((s) => (
          <source key={s.src} src={s.src} type={s.type} />
        ))}
      </video>
      <button
        type="button"
        onClick={toggle}
        className="btn absolute bottom-3 left-3 min-h-11 px-4 t-small"
        aria-pressed={!playing}
      >
        {playing ? pauseLabel : playLabel}
      </button>
    </div>
  )
}
