/** Udjeli sastojaka s deklaracije, po okusu (zbroj je 100 %). */
export type ShareKey = 'honey' | 'fruit' | 'guarana' | 'salt'

export const SHARES: Record<string, Array<{ key: ShareKey; pct: number }>> = {
  'honey-bee-power-energy-gel-naranca': [
    { key: 'honey', pct: 95.5 },
    { key: 'fruit', pct: 3 },
    { key: 'guarana', pct: 1 },
    { key: 'salt', pct: 0.5 },
  ],
  'honey-bee-power-energy-gel-limun': [
    { key: 'honey', pct: 94.5 },
    { key: 'fruit', pct: 4 },
    { key: 'guarana', pct: 1 },
    { key: 'salt', pct: 0.5 },
  ],
  'honey-bee-power-energy-gel-malina': [
    { key: 'honey', pct: 91 },
    { key: 'fruit', pct: 8 },
    { key: 'guarana', pct: 1 },
  ],
}
