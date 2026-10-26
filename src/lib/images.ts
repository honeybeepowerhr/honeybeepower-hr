/**
 * Lagane kopije fotografija proizvoda (public/images/products-web/*.webp),
 * izrađene iz izvornika u public/images/products. Izvornici ostaju.
 */
export function webImage(ref: string): string {
  const m = ref.match(/^\/images\/products\/([^/]+)\.(png|jpe?g)$/i)
  return m ? `/images/products-web/${m[1]}.webp` : ref
}

/** Tamna ili svijetla slova na polju boje okusa (WCAG kontrast). */
export function inkOn(hex: string): '#0b0b0a' | '#ffffff' {
  const n = parseInt(hex.replace('#', ''), 16)
  const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const c = v / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  const lum = 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2]
  const contrastBlack = (lum + 0.05) / 0.05
  const contrastWhite = 1.05 / (lum + 0.05)
  return contrastBlack >= contrastWhite ? '#0b0b0a' : '#ffffff'
}
