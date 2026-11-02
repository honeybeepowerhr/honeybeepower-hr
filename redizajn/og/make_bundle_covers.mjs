// Naslovne slike paketa: stvarne fotografije proizvoda u šesterokutnim ćelijama (kao košnica na naslovnici).
// Pokretanje iz korijena projekta: node redizajn/og/make_bundle_covers.mjs
// Izlaz: public/images/bundles/<slug>.webp (900 × 900)
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const SRC = (f) => path.join(ROOT, 'public/images/products-web', `${f}.webp`)
const OUT = path.join(ROOT, 'public/images/bundles')
fs.mkdirSync(OUT, { recursive: true })

const NAVY = '#1d2048'
const HONEY = '#ffb800'
const SIZE = 900

// Položaji ćelija u jedinicama širine ćelije (šiljasti vrh, okomiti razmak 0,866).
const LAYOUT = {
  1: [[0, 0]],
  2: [[0, 0], [1, 0]],
  3: [[0.5, 0], [0, 0.866], [1, 0.866]],
  4: [[0.5, 0], [0, 0.866], [1, 0.866], [0.5, 1.732]],
}

const BUNDLES = {
  'mali-paket': ['iso2', 'shaker'],
  'protein-paket': ['whey', 'shaker'],
  'srednji-paket': ['iso1', 'whey', 'shaker'],
  'gel-paket-30': ['gel'],
  'veliki-paket': ['gel', 'iso1', 'whey', 'shaker'],
  'paket-iznenadenja': ['gel', 'whey', 'shaker', 'shirt'],
}

const png64 = async (file) => `data:image/png;base64,${(await sharp(SRC(file)).png().toBuffer()).toString('base64')}`
const dims = async (file) => {
  const m = await sharp(SRC(file)).metadata()
  return m.width / m.height
}

async function pic(file) {
  return { href: await png64(file), ratio: await dims(file) }
}

const P = {}
for (const f of ['gellimun-prednja', 'gelnaranca-prednja', 'gelmalina-prednja', 'isolimun-prednja', 'isonaranca-prednja', 'proteincokolada700g', 'shaker']) {
  P[f] = await pic(f)
}

const hexPoints = (x, y, w) => {
  const h = w * 1.1547
  return `${x + w / 2},${y} ${x + w},${y + h * 0.25} ${x + w},${y + h * 0.75} ${x + w / 2},${y + h} ${x},${y + h * 0.75} ${x},${y + h * 0.25}`
}

/** Izrezan proizvod: visina u jedinicama w, središte u ćeliji, nagib u stupnjevima. */
function cutout(p, cx, cy, hUnits, w, rot = 0, dx = 0) {
  const h = hUnits * w
  const wd = h * p.ratio
  const x = cx + dx * w - wd / 2
  const y = cy - h * 0.52
  return `<image href="${p.href}" x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${wd.toFixed(1)}" height="${h.toFixed(1)}" transform="rotate(${rot} ${(x + wd / 2).toFixed(1)} ${(y + h / 2).toFixed(1)})" preserveAspectRatio="xMidYMid meet" filter="url(#sh)"/>`
}

function cellContent(kind, x, y, w, id, k = 1) {
  const h = w * 1.1547
  const cx = x + w / 2
  const cy = y + h / 2
  switch (kind) {
    case 'gel':
      return {
        field: '#ff8a1e',
        art: [
          cutout(P['gelmalina-prednja'], cx, cy, 0.92 * k, w, -11, -0.22),
          cutout(P['gellimun-prednja'], cx, cy, 0.92 * k, w, 11, 0.22),
          cutout(P['gelnaranca-prednja'], cx, cy, 1.1 * k, w, -2),
        ].join(''),
      }
    case 'iso1':
      return { field: '#ffe14a', art: cutout(P['isolimun-prednja'], cx, cy, 0.95 * k, w, 3) }
    case 'iso2':
      return {
        field: '#ffe14a',
        art: [cutout(P['isonaranca-prednja'], cx, cy, 0.7 * k, w, -5, -0.24), cutout(P['isolimun-prednja'], cx, cy, 0.7 * k, w, 5, 0.24)].join(''),
      }
    case 'whey':
    case 'shaker': {
      const p = kind === 'whey' ? P['proteincokolada700g'] : P['shaker']
      const s = w * 0.96
      return {
        field: '#ffffff',
        clip: id,
        art: `<g clip-path="url(#c${id})"><image href="${p.href}" x="${(cx - s / 2).toFixed(1)}" y="${(cy - s / 2).toFixed(1)}" width="${s.toFixed(1)}" height="${s.toFixed(1)}" preserveAspectRatio="xMidYMid meet"/></g>`,
      }
    }
    case 'shirt': {
      const s = w * 0.58
      const ox = cx - s / 2
      const oy = cy - s / 2
      return {
        field: '#e0224f',
        art: `<g transform="translate(${ox.toFixed(1)} ${oy.toFixed(1)}) scale(${(s / 100).toFixed(4)})"><path d="M30 12 10 24l8 16 10-5v53h44V35l10 5 8-16-20-12c-4 8-36 8-40 0Z" fill="#ffffff" stroke="${NAVY}" stroke-width="3" stroke-linejoin="round"/></g>`,
      }
    }
    default:
      return { field: '#ffffff', art: '' }
  }
}

for (const [slug, kinds] of Object.entries(BUNDLES)) {
  const pos = LAYOUT[kinds.length]
  const wUnits = Math.max(...pos.map((p) => p[0])) + 1
  const hUnits = Math.max(...pos.map((p) => p[1])) + 1.1547
  const w = Math.min(800 / wUnits, 800 / hUnits, 440)
  const k = kinds.length >= 3 ? 0.9 : 1
  const sw = Math.max(5, w * 0.022)
  const ox = (SIZE - wUnits * w) / 2
  const oy = (SIZE - hUnits * w) / 2 + w * 0.02

  const kScale = k
  const cells = kinds.map((k, i) => {
    const x = ox + pos[i][0] * w
    const y = oy + pos[i][1] * w
    return { k, x, y, ...cellContent(k, x, y, w, i, kScale) }
  })

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
  <defs>
    <filter id="sh" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="${(w * 0.05).toFixed(1)}" stdDeviation="${(w * 0.04).toFixed(1)}" flood-color="#000" flood-opacity="0.38"/></filter>
    <pattern id="hexbg" width="56" height="98" patternUnits="userSpaceOnUse"><path d="M28 0 56 16v34L28 66 0 50V16zM28 66v32M0 50 28 66M56 50 28 66M0 16V0M56 16V0" fill="none" stroke="${NAVY}" stroke-opacity=".1" stroke-width="1.4"/></pattern>
    ${cells.map((c, i) => `<clipPath id="c${i}"><polygon points="${hexPoints(c.x + w * 0.03 + sw / 2, c.y + w * 0.03 + sw / 2, w * 0.94 - sw)}"/></clipPath>`).join('')}
  </defs>
  <rect width="${SIZE}" height="${SIZE}" fill="${HONEY}"/>
  <rect width="${SIZE}" height="${SIZE}" fill="url(#hexbg)"/>
  ${cells.map((c) => `<polygon points="${hexPoints(c.x + w * 0.03, c.y + w * 0.03, w * 0.94)}" fill="${c.field}"/>`).join('')}
  ${cells.map((c) => `<polygon points="${hexPoints(c.x + w * 0.03, c.y + w * 0.03, w * 0.94)}" fill="none" stroke="${NAVY}" stroke-width="${sw.toFixed(1)}" stroke-linejoin="round"/>`).join('')}
  ${cells.map((c) => c.art).join('')}
</svg>`

  const file = path.join(OUT, `${slug}.webp`)
  const info = await sharp(Buffer.from(svg)).webp({ quality: 86 }).toFile(file)
  console.log(slug, `${info.width}x${info.height}`, `${Math.round(info.size / 1024)} KB`)
}
