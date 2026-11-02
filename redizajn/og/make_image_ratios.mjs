// Omjeri širine i visine svih fotografija u public/images/products-web → src/lib/image-ratios.ts
// Pokretanje iz korijena projekta: node redizajn/og/make_image_ratios.mjs
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'

const DIR = path.join(process.cwd(), 'public/images/products-web')
const files = fs.readdirSync(DIR).filter((f) => f.endsWith('.webp')).sort()
const lines = []
for (const f of files) {
  const m = await sharp(path.join(DIR, f)).metadata()
  lines.push(`  "/images/products-web/${f}": ${Math.round((m.width / m.height) * 1000) / 1000}`)
}
const out = `/** Omjeri širine i visine fotografija proizvoda (public/images/products-web), za pozornicu proizvoda. */\nexport const IMAGE_RATIOS: Record<string, number> = {\n${lines.join(',\n')}\n}\n`
fs.writeFileSync(path.join(process.cwd(), 'src/lib/image-ratios.ts'), out)
console.log(files.length, 'slika')
