import Image from 'next/image'
import {
  FLAVOURS,
  SHAKER_IMAGE,
  flavourColor,
  type BundleOption,
  type BundleSlot,
  type FlavourKind,
  type Selection,
} from '@/lib/bundles-data'

/** Položaji ćelija u jedinicama širine ćelije (šiljasti vrh, okomiti razmak 0,866). */
const LAYOUT: Record<number, Array<[number, number]>> = {
  1: [[0, 0]],
  2: [[0, 0], [1, 0]],
  3: [[0.5, 0], [0, 0.866], [1, 0.866]],
  4: [[0.5, 0], [0, 0.866], [1, 0.866], [0.5, 1.732]],
}

const HEX = '50,1.5 98.5,29.5 98.5,86 50,114 1.5,86 1.5,29.5'

/** Izrezani proizvodi u ćeliji: odabrani okusi, najviše tri, najzastupljeniji u sredini. */
function cutouts(kind: FlavourKind, selection: Selection) {
  const present = FLAVOURS[kind]
    .map((f) => ({ f, n: selection[kind]?.[f.id] ?? 0 }))
    .filter((x) => x.n > 0)
    .sort((a, b) => b.n - a.n)
    .slice(0, 3)
  if (present.length === 0) return { items: [], color: '#ffffff' }
  const color = flavourColor(kind, present[0].f.id)
  const big = kind === 'gel' ? 112 : 100
  const small = kind === 'gel' ? 94 : 80
  const spread = kind === 'gel' ? 0.22 : 0.24
  const items =
    present.length === 1
      ? [{ f: present[0].f, s: big, r: kind === 'gel' ? -2 : 3, tx: 0 }]
      : present.length === 2
        ? [
            { f: present[1].f, s: small, r: -9, tx: -spread },
            { f: present[0].f, s: big * 0.92, r: 8, tx: spread },
          ]
        : [
            { f: present[1].f, s: small, r: -11, tx: -spread },
            { f: present[2].f, s: small, r: 11, tx: spread },
            { f: present[0].f, s: big, r: -2, tx: 0 },
          ]
  return { items, color }
}

/** Košnica paketa: svaka ćelija je jedna stavka i prikazuje proizvode u odabranim okusima. */
export function BundleVisual({ option, selection }: { option: BundleOption; selection: Selection }) {
  const slots = option.slots
  const pos = LAYOUT[slots.length] ?? LAYOUT[4]
  const cols = Math.max(...pos.map((p) => p[0])) + 1
  const rows = Math.max(...pos.map((p) => p[1])) + 1.1547

  return (
    <ul className="bvis" style={{ ['--cols' as string]: cols, ['--rows' as string]: rows }} aria-hidden="true">
      {slots.map((slot: BundleSlot, i) => {
        const [x, y] = pos[i]
        const isFlavour = slot.kind === 'gel' || slot.kind === 'iso'
        const cut = isFlavour ? cutouts(slot.kind as FlavourKind, selection) : null
        const whey = slot.kind === 'whey' ? FLAVOURS.whey.find((f) => (selection.whey?.[f.id] ?? 0) > 0) ?? FLAVOURS.whey[0] : null
        const field = cut ? cut.color : slot.kind === 'shirt' ? '#e0224f' : '#ffffff'

        return (
          <li key={slot.kind} className="hive-cell" style={{ ['--x' as string]: x, ['--y' as string]: y, ['--i' as string]: i }}>
            <div className="hive-link">
              <svg className="hive-outline" viewBox="0 0 100 115.47">
                <polygon points={HEX} fill="none" stroke="#1d2048" strokeWidth="3" strokeLinejoin="round" />
              </svg>
              <span className="hive-hex" style={{ background: field }}>
                {whey && <Image key={whey.id} src={whey.image} alt="" fill sizes="220px" className="swap-in object-contain p-[6%]" />}
                {slot.kind === 'shaker' && <Image src={SHAKER_IMAGE} alt="" fill sizes="220px" className="object-contain p-[6%]" />}
                {slot.kind === 'shirt' && (
                  <svg viewBox="0 0 100 100" className="absolute inset-[22%] h-[56%] w-[56%]">
                    <path d="M30 12 10 24l8 16 10-5v53h44V35l10 5 8-16-20-12c-4 8-36 8-40 0Z" fill="#ffffff" stroke="#1d2048" strokeWidth="3" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              {cut?.items.map((it) => (
                <Image
                  key={`${slot.kind}-${it.f.id}`}
                  src={it.f.image}
                  alt=""
                  width={Math.round(1000 * it.f.ratio)}
                  height={1000}
                  sizes="160px"
                  className="hive-img swap-in"
                  style={{ ['--s' as string]: `${it.s}%`, ['--r' as string]: `${it.r}deg`, ['--tx' as string]: `calc(var(--w) * ${it.tx})`, aspectRatio: String(it.f.ratio) }}
                />
              ))}
              {slot.count > 1 && <span className="bvis-badge">× {slot.count}</span>}
            </div>
          </li>
        )
      })}
    </ul>
  )
}
