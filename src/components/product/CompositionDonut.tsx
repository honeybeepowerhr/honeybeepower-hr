import type { ShareKey } from '@/lib/gel-shares'

interface Props {
  shares: Array<{ key: ShareKey; pct: number }>
  fruitColor: string
  labels: Record<ShareKey, string>
  fruitLabel: string
  /** formatirani udio meda, npr. „95,5 %” */
  centerValue: string
  centerLabel: string
  ariaLabel: string
  formatPct: (n: number) => string
}

const R = 48
const C = 2 * Math.PI * R

const COLORS: Record<ShareKey, string> = {
  honey: 'var(--color-honey)',
  fruit: '#ffffff',
  guarana: '#c9573a',
  salt: '#f6f0e4',
}

/** Prstenasti grafikon sastava s deklaracije; segmenti se „crtaju” kad uđu na zaslon (GSAP). */
export function CompositionDonut({ shares, fruitColor, labels, fruitLabel, centerValue, centerLabel, ariaLabel, formatPct }: Props) {
  let offset = 0
  const segs = shares.map((s) => {
    const raw = (s.pct / 100) * C
    const len = Math.max(raw - 1.6, 2)
    const seg = { ...s, len, offset, color: s.key === 'fruit' ? fruitColor : COLORS[s.key] }
    offset += raw
    return seg
  })

  return (
    <div className="flex flex-wrap items-center gap-x-10 gap-y-6" data-donut>
      <div className="relative h-[13.5rem] w-[13.5rem] shrink-0" role="img" aria-label={`${ariaLabel}: ${shares.map((s) => `${s.key === 'fruit' ? fruitLabel : labels[s.key]} ${formatPct(s.pct)}`).join(', ')}`}>
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90" aria-hidden="true">
          <circle cx="60" cy="60" r={R} fill="none" stroke="rgb(246 240 228 / 0.08)" strokeWidth="13" />
          {segs.map((s) => (
            <circle
              key={s.key}
              data-donut-seg
              data-dash={`${s.len.toFixed(2)} ${(C - s.len).toFixed(2)}`}
              cx="60"
              cy="60"
              r={R}
              fill="none"
              stroke={s.color}
              strokeWidth="13"
              strokeDasharray={`${s.len.toFixed(2)} ${(C - s.len).toFixed(2)}`}
              strokeDashoffset={(-s.offset).toFixed(2)}
            />
          ))}
        </svg>
        <div className="absolute inset-0 grid place-content-center text-center">
          <p data-countup className="font-[family-name:var(--font-display)] text-[1.9rem] font-black leading-[1.1] tracking-[-0.02em] text-[color:var(--color-honey)] tabular">
            {centerValue}
          </p>
          <p className="mx-auto mt-1 max-w-[7.5rem] t-small text-muted">{centerLabel}</p>
        </div>
      </div>
      <ul className="space-y-2.5 t-body tabular" aria-hidden="true">
        {segs.map((s) => (
          <li key={s.key} className="flex items-center gap-3">
            <span className="h-3 w-3 shrink-0 rounded-full" style={{ background: s.color }} />
            <span>{s.key === 'fruit' ? fruitLabel : labels[s.key]}</span>
            <span className="ml-auto pl-4 font-semibold">{formatPct(s.pct)}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
