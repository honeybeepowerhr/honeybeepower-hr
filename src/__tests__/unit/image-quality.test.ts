import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

/**
 * Cloudflare (OpenNext) odbija svaki zahtjev /_next/image s kvalitetom koja nije na popisu
 * `images.qualities` u next.config.ts (odgovor 400, slika se ne prikaže). Zato svaka
 * kvaliteta u `quality={…}` mora biti na tom popisu.
 */
function readAll(dir: string): string[] {
  const out: string[] = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...readAll(full))
    else if (entry.name.endsWith('.tsx')) out.push(fs.readFileSync(full, 'utf8'))
  }
  return out
}

describe('Kvaliteta slika (next/image)', () => {
  const config = fs.readFileSync(path.join(process.cwd(), 'next.config.ts'), 'utf8')
  const m = config.match(/qualities:\s*\[([^\]]*)\]/)
  const allowed = m ? m[1].split(',').map((v) => Number(v.trim())).filter(Boolean) : [75]

  it('zadana kvaliteta 75 je dopuštena', () => {
    expect(allowed).toContain(75)
  })

  it('svaka kvaliteta u kodu je na popisu images.qualities', () => {
    const used = new Set<number>()
    for (const text of readAll(path.join(process.cwd(), 'src'))) {
      for (const match of text.matchAll(/\bquality=\{(\d+)\}/g)) used.add(Number(match[1]))
    }
    for (const q of used) expect(allowed, `quality={${q}} nije u images.qualities`).toContain(q)
  })
})
