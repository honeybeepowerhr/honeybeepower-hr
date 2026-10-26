import type { Locale, ProductSummary } from '@/types'

/** Category taxonomy shared by the category/product route and the sitemap. */
export const PRODUCT_CATEGORIES: Record<string, Record<Locale, string>> = {
  'energetski-gelovi': {
    hr: 'Energetski Gelovi',
    en: 'Energy Gels',
    de: 'Energie-Gels',
    sl: 'Energetski geli',
    pl: 'Żele energetyczne',
  },
  'izotonicki-napitci': {
    hr: 'Izotonični Napitci',
    en: 'Isotonic Drinks',
    de: 'Isotonische Getränke',
    sl: 'Izotonični napitki',
    pl: 'Napoje izotoniczne',
  },
  'whey-proteini': {
    hr: 'Whey Proteini',
    en: 'Whey Proteins',
    de: 'Molkenprotein',
    sl: 'Whey beljakovine',
    pl: 'Białka serwatkowe',
  },
}

export const REAL_PRODUCTS: ProductSummary[] = [
  {
    _id: 'hbp-gel-lemon',
    name: {
      hr: 'Honey Bee Power Energy Gel – Limun',
      en: 'Honey Bee Power Energy Gel – Lemon',
      de: 'Honey Bee Power Energy Gel – Zitrone',
      sl: 'Honey Bee Power Energy Gel – Limona',
      pl: 'Honey Bee Power Energy Gel – Cytryna',
    },
    slug: 'honey-bee-power-energy-gel-limun',
    category: 'energetski-gelovi',
    minQuantity: 50,
    shortDescription: {
      hr: 'Energetski gel od 40 g, okus limun: višecvjetni med (94,5 %), liofilizirani plod limuna, ekstrakt sjemenki guarane i morska sol. 29 g ugljikohidrata u jednoj vrećici.',
      en: '40 g energy gel, lemon flavour: multifloral honey (94.5%), freeze-dried lemon, guarana seed extract and sea salt. 29 g of carbohydrate per sachet.',
      de: 'Energiegel 40 g, Geschmack Zitrone: Mehrblütenhonig (94,5 %), gefriergetrocknete Zitronenfrucht, Guaranasamenextrakt und Meersalz. 29 g Kohlenhydrate pro Beutel.',
      sl: 'Energijski gel 40 g, okus limona: večcvetni med (94,5 %), liofiliziran plod limone, izvleček semen guarane in morska sol. 29 g ogljikovih hidratov v eni vrečki.',
      pl: 'Żel energetyczny 40 g, smak cytryna: miód wielokwiatowy (94.5%), liofilizowany owoc cytryny, ekstrakt z nasion guarany i sól morska. 29 g węglowodanów w jednej saszetce.',
    },
    basePrice: 180,
    mainImage: {
      _type: 'image',
      asset: {
        _ref: '/images/products/gellimun-prednja.png',
        _type: 'reference',
      },
      alt: 'Honey Bee Power Energy Gel Limun',
    },
    imageGallery: [
      {
        _type: 'image',
        asset: { _ref: '/images/products/gellimun-prednja.png', _type: 'reference' },
        alt: 'Honey Bee Power Energy Gel Limun — prednja strana',
      },
      {
        _type: 'image',
        asset: { _ref: '/images/products/gellimun-zadnja.png', _type: 'reference' },
        alt: 'Honey Bee Power Energy Gel Limun — zadnja strana',
      },
    ],
    variants: [
      { _key: 'v1', flavour: 'Limun', size: '40g sachet', sku: 'HBP-GEL-LIM-40', price: 180, stockLevel: 100, minQuantity: 50 },
      { _key: 'v2', flavour: 'Limun', size: 'Paket 10x40g', sku: 'HBP-GEL-LIM-10', price: 2999, stockLevel: 45, minQuantity: 5 },
    ],
  },
  {
    _id: 'hbp-gel-lemon-pack10',
    name: {
      hr: 'Honey Bee Power Energy Gel – Limun (Paket 10 kom)',
      en: 'Honey Bee Power Energy Gel – Lemon (10 Pack)',
      de: 'Honey Bee Power Energy Gel – Zitrone (10er Pack)',
      sl: 'Honey Bee Power Energy Gel – Limona (Paket 10 kos)',
      pl: 'Honey Bee Power Energy Gel – Cytryna (Zestaw 10 szt.)',
    },
    slug: 'honey-bee-power-energy-gel-limun-paket-10',
    category: 'energetski-gelovi',
    minQuantity: 5,
    shortDescription: {
      hr: 'Paket od 10 gelova po 40 g, okus limun: višecvjetni med (94,5 %), liofilizirani plod limuna, ekstrakt sjemenki guarane i morska sol. 29 g ugljikohidrata u jednoj vrećici.',
      en: 'Pack of 10 gels, 40 g each, lemon flavour: multifloral honey (94.5%), freeze-dried lemon, guarana seed extract and sea salt. 29 g of carbohydrate per sachet.',
      de: '10er-Paket, je 40 g, Geschmack Zitrone: Mehrblütenhonig (94,5 %), gefriergetrocknete Zitronenfrucht, Guaranasamenextrakt und Meersalz. 29 g Kohlenhydrate pro Beutel.',
      sl: 'Paket 10 gelov po 40 g, okus limona: večcvetni med (94,5 %), liofiliziran plod limone, izvleček semen guarane in morska sol. 29 g ogljikovih hidratov v eni vrečki.',
      pl: 'Zestaw 10 żeli po 40 g, smak cytryna: miód wielokwiatowy (94.5%), liofilizowany owoc cytryny, ekstrakt z nasion guarany i sól morska. 29 g węglowodanów w jednej saszetce.',
    },
    basePrice: 2999,
    mainImage: {
      _type: 'image',
      asset: {
        _ref: '/images/products/paketgellimun-new.png',
        _type: 'reference',
      },
      alt: 'Honey Bee Power Energy Gel Limun (Paket 10 kom)',
    },
    imageGallery: [
      {
        _type: 'image',
        asset: { _ref: '/images/products/paketgellimun-new.png', _type: 'reference' },
        alt: 'Honey Bee Power Energy Gel Limun — paket 10 kom',
      },
    ],
    variants: [
      { _key: 'v1', flavour: 'Limun', size: 'Paket 10x40g', sku: 'HBP-GEL-LIM-10P', price: 2999, stockLevel: 80, minQuantity: 5 },
    ],
  },
  {
    _id: 'hbp-gel-orange',
    name: {
      hr: 'Honey Bee Power Energy Gel – Naranča',
      en: 'Honey Bee Power Energy Gel – Orange',
      de: 'Honey Bee Power Energy Gel – Orange',
      sl: 'Honey Bee Power Energy Gel – Pomaranča',
      pl: 'Honey Bee Power Energy Gel – Pomarańcza',
    },
    slug: 'honey-bee-power-energy-gel-naranca',
    category: 'energetski-gelovi',
    minQuantity: 50,
    shortDescription: {
      hr: 'Energetski gel od 40 g, okus naranča: višecvjetni med (95,5 %), liofilizirani plod naranče, ekstrakt sjemenki guarane i morska sol. 31,2 g ugljikohidrata u jednoj vrećici.',
      en: '40 g energy gel, orange flavour: multifloral honey (95.5%), freeze-dried orange, guarana seed extract and sea salt. 31.2 g of carbohydrate per sachet.',
      de: 'Energiegel 40 g, Geschmack Orange: Mehrblütenhonig (95,5 %), gefriergetrocknete Orangenfrucht, Guaranasamenextrakt und Meersalz. 31,2 g Kohlenhydrate pro Beutel.',
      sl: 'Energijski gel 40 g, okus pomaranča: večcvetni med (95,5 %), liofiliziran plod pomaranče, izvleček semen guarane in morska sol. 31,2 g ogljikovih hidratov v eni vrečki.',
      pl: 'Żel energetyczny 40 g, smak pomarańcza: miód wielokwiatowy (95.5%), liofilizowany owoc pomarańczy, ekstrakt z nasion guarany i sól morska. 31,2 g węglowodanów w jednej saszetce.',
    },
    basePrice: 180,
    mainImage: {
      _type: 'image',
      asset: {
        _ref: '/images/products/gelnaranca-prednja.png',
        _type: 'reference',
      },
      alt: 'Honey Bee Power Energy Gel Naranča',
    },
    imageGallery: [
      {
        _type: 'image',
        asset: { _ref: '/images/products/gelnaranca-prednja.png', _type: 'reference' },
        alt: 'Honey Bee Power Energy Gel Naranča — prednja strana',
      },
      {
        _type: 'image',
        asset: { _ref: '/images/products/gelnaranca-zadnja.png', _type: 'reference' },
        alt: 'Honey Bee Power Energy Gel Naranča — zadnja strana',
      },
    ],
    variants: [
      { _key: 'v1', flavour: 'Naranča', size: '40g sachet', sku: 'HBP-GEL-NAR-40', price: 180, stockLevel: 120, minQuantity: 50 },
      { _key: 'v2', flavour: 'Naranča', size: 'Paket 10x40g', sku: 'HBP-GEL-NAR-10', price: 2999, stockLevel: 50, minQuantity: 5 },
    ],
  },
  {
    _id: 'hbp-gel-orange-pack10',
    name: {
      hr: 'Honey Bee Power Energy Gel – Naranča (Paket 10 kom)',
      en: 'Honey Bee Power Energy Gel – Orange (10 Pack)',
      de: 'Honey Bee Power Energy Gel – Orange (10er Pack)',
      sl: 'Honey Bee Power Energy Gel – Pomaranča (Paket 10 kos)',
      pl: 'Honey Bee Power Energy Gel – Pomarańcza (Zestaw 10 szt.)',
    },
    slug: 'honey-bee-power-energy-gel-naranca-paket-10',
    category: 'energetski-gelovi',
    minQuantity: 5,
    shortDescription: {
      hr: 'Paket od 10 gelova po 40 g, okus naranča: višecvjetni med (95,5 %), liofilizirani plod naranče, ekstrakt sjemenki guarane i morska sol. 31,2 g ugljikohidrata u jednoj vrećici.',
      en: 'Pack of 10 gels, 40 g each, orange flavour: multifloral honey (95.5%), freeze-dried orange, guarana seed extract and sea salt. 31.2 g of carbohydrate per sachet.',
      de: '10er-Paket, je 40 g, Geschmack Orange: Mehrblütenhonig (95,5 %), gefriergetrocknete Orangenfrucht, Guaranasamenextrakt und Meersalz. 31,2 g Kohlenhydrate pro Beutel.',
      sl: 'Paket 10 gelov po 40 g, okus pomaranča: večcvetni med (95,5 %), liofiliziran plod pomaranče, izvleček semen guarane in morska sol. 31,2 g ogljikovih hidratov v eni vrečki.',
      pl: 'Zestaw 10 żeli po 40 g, smak pomarańcza: miód wielokwiatowy (95.5%), liofilizowany owoc pomarańczy, ekstrakt z nasion guarany i sól morska. 31,2 g węglowodanów w jednej saszetce.',
    },
    basePrice: 2999,
    mainImage: {
      _type: 'image',
      asset: {
        _ref: '/images/products/paketgelnaranca-new.png',
        _type: 'reference',
      },
      alt: 'Honey Bee Power Energy Gel Naranča (Paket 10 kom)',
    },
    imageGallery: [
      {
        _type: 'image',
        asset: { _ref: '/images/products/paketgelnaranca-new.png', _type: 'reference' },
        alt: 'Honey Bee Power Energy Gel Naranča — paket 10 kom',
      },
    ],
    variants: [
      { _key: 'v1', flavour: 'Naranča', size: 'Paket 10x40g', sku: 'HBP-GEL-NAR-10P', price: 2999, stockLevel: 80, minQuantity: 5 },
    ],
  },
  {
    _id: 'hbp-gel-raspberry',
    name: {
      hr: 'Honey Bee Power Energy Gel – Malina',
      en: 'Honey Bee Power Energy Gel – Raspberry',
      de: 'Honey Bee Power Energy Gel – Himbeere',
      sl: 'Honey Bee Power Energy Gel – Malina',
      pl: 'Honey Bee Power Energy Gel – Malina',
    },
    slug: 'honey-bee-power-energy-gel-malina',
    category: 'energetski-gelovi',
    minQuantity: 50,
    shortDescription: {
      hr: 'Energetski gel od 40 g, okus malina: višecvjetni med (91 %), liofilizirani plod maline, ekstrakt sjemenki guarane. 32,8 g ugljikohidrata u jednoj vrećici.',
      en: '40 g energy gel, raspberry flavour: multifloral honey (91%), freeze-dried raspberry, guarana seed extract. 32.8 g of carbohydrate per sachet.',
      de: 'Energiegel 40 g, Geschmack Himbeere: Mehrblütenhonig (91 %), gefriergetrocknete Himbeerfrucht, Guaranasamenextrakt. 32,8 g Kohlenhydrate pro Beutel.',
      sl: 'Energijski gel 40 g, okus malina: večcvetni med (91 %), liofiliziran plod maline, izvleček semen guarane. 32,8 g ogljikovih hidratov v eni vrečki.',
      pl: 'Żel energetyczny 40 g, smak malina: miód wielokwiatowy (91%), liofilizowany owoc maliny, ekstrakt z nasion guarany. 32,8 g węglowodanów w jednej saszetce.',
    },
    basePrice: 180,
    mainImage: {
      _type: 'image',
      asset: {
        _ref: '/images/products/gelmalina-prednja.png',
        _type: 'reference',
      },
      alt: 'Honey Bee Power Energy Gel Malina',
    },
    imageGallery: [
      {
        _type: 'image',
        asset: { _ref: '/images/products/gelmalina-prednja.png', _type: 'reference' },
        alt: 'Honey Bee Power Energy Gel Malina — prednja strana',
      },
      {
        _type: 'image',
        asset: { _ref: '/images/products/gelmalina-zadnja.png', _type: 'reference' },
        alt: 'Honey Bee Power Energy Gel Malina — zadnja strana',
      },
    ],
    variants: [
      { _key: 'v1', flavour: 'Malina', size: '40g sachet', sku: 'HBP-GEL-MAL-40', price: 180, stockLevel: 90, minQuantity: 50 },
      { _key: 'v2', flavour: 'Malina', size: 'Paket 10x40g', sku: 'HBP-GEL-MAL-10', price: 2999, stockLevel: 40, minQuantity: 5 },
    ],
  },
  {
    _id: 'hbp-gel-raspberry-pack10',
    name: {
      hr: 'Honey Bee Power Energy Gel – Malina (Paket 10 kom)',
      en: 'Honey Bee Power Energy Gel – Raspberry (10 Pack)',
      de: 'Honey Bee Power Energy Gel – Himbeere (10er Pack)',
      sl: 'Honey Bee Power Energy Gel – Malina (Paket 10 kos)',
      pl: 'Honey Bee Power Energy Gel – Malina (Zestaw 10 szt.)',
    },
    slug: 'honey-bee-power-energy-gel-malina-paket-10',
    category: 'energetski-gelovi',
    minQuantity: 5,
    shortDescription: {
      hr: 'Paket od 10 gelova po 40 g, okus malina: višecvjetni med (91 %), liofilizirani plod maline, ekstrakt sjemenki guarane. 32,8 g ugljikohidrata u jednoj vrećici.',
      en: 'Pack of 10 gels, 40 g each, raspberry flavour: multifloral honey (91%), freeze-dried raspberry, guarana seed extract. 32.8 g of carbohydrate per sachet.',
      de: '10er-Paket, je 40 g, Geschmack Himbeere: Mehrblütenhonig (91 %), gefriergetrocknete Himbeerfrucht, Guaranasamenextrakt. 32,8 g Kohlenhydrate pro Beutel.',
      sl: 'Paket 10 gelov po 40 g, okus malina: večcvetni med (91 %), liofiliziran plod maline, izvleček semen guarane. 32,8 g ogljikovih hidratov v eni vrečki.',
      pl: 'Zestaw 10 żeli po 40 g, smak malina: miód wielokwiatowy (91%), liofilizowany owoc maliny, ekstrakt z nasion guarany. 32,8 g węglowodanów w jednej saszetce.',
    },
    basePrice: 2999,
    mainImage: {
      _type: 'image',
      asset: {
        _ref: '/images/products/paketgelmalina-new.png',
        _type: 'reference',
      },
      alt: 'Honey Bee Power Energy Gel Malina (Paket 10 kom)',
    },
    imageGallery: [
      {
        _type: 'image',
        asset: { _ref: '/images/products/paketgelmalina-new.png', _type: 'reference' },
        alt: 'Honey Bee Power Energy Gel Malina — paket 10 kom',
      },
    ],
    variants: [
      { _key: 'v1', flavour: 'Malina', size: 'Paket 10x40g', sku: 'HBP-GEL-MAL-10P', price: 2999, stockLevel: 80, minQuantity: 5 },
    ],
  },
  {
    _id: 'hbp-iso-lemon',
    name: {
      hr: 'Honey Bee Power Izotonični Napitak – Limun',
      en: 'Honey Bee Power Isotonic Drink – Lemon',
      de: 'Honey Bee Power Isotonisches Getränk – Zitrone',
      sl: 'Honey Bee Power Izotonični Napitek – Limona',
      pl: 'Honey Bee Power Napój Izotoniczny – Cytryna',
    },
    slug: 'honey-bee-power-izotonicki-napitak-limun',
    category: 'izotonicki-napitci',
    minQuantity: 5,
    shortDescription: {
      hr: 'Izotonični napitak u prahu, okus limun. Posuda od 500 g; 13,5 g ugljikohidrata u porciji od 15 g.',
      en: 'Instant isotonic drink powder, lemon flavour. 500 g tub; 13.5 g of carbohydrate per 15 g serving.',
      de: 'Isotonisches Instant-Getränkepulver, Geschmack Zitrone. 500-g-Dose; 13,5 g Kohlenhydrate pro 15-g-Portion.',
      sl: 'Instant izotonični napitek v prahu, okus limona. Embalaža 500 g; 13,5 g ogljikovih hidratov v 15-gramskem obroku.',
      pl: 'Instant napój izotoniczny w proszku, smak cytryna. Opakowanie 500 g; 13,5 g węglowodanów w porcji 15 g.',
    },
    basePrice: 800,
    mainImage: {
      _type: 'image',
      asset: {
        _ref: '/images/products/isolimun-prednja.png',
        _type: 'reference',
      },
      alt: 'Honey Bee Power Izotonični Napitak Limun',
    },
    imageGallery: [
      {
        _type: 'image',
        asset: { _ref: '/images/products/isolimun-prednja.png', _type: 'reference' },
        alt: 'Honey Bee Power Izotonični Napitak Limun — prednja strana',
      },
      {
        _type: 'image',
        asset: { _ref: '/images/products/isolimun-zadnja.png', _type: 'reference' },
        alt: 'Honey Bee Power Izotonični Napitak Limun — zadnja strana',
      },
    ],
    variants: [
      { _key: 'v1', flavour: 'Limun', size: '500g posuda', sku: 'HBP-ISO-LIM-500', price: 800, stockLevel: 60, minQuantity: 5 },
    ],
  },
  {
    _id: 'hbp-iso-orange',
    name: {
      hr: 'Honey Bee Power Izotonični Napitak – Naranča',
      en: 'Honey Bee Power Isotonic Drink – Orange',
      de: 'Honey Bee Power Isotonic Drink – Orange',
      sl: 'Honey Bee Power Izotonični Napitek – Pomaranča',
      pl: 'Honey Bee Power Napój Izotoniczny – Pomarańcza',
    },
    slug: 'honey-bee-power-izotonicki-napitak-naranca',
    category: 'izotonicki-napitci',
    minQuantity: 5,
    shortDescription: {
      hr: 'Izotonični napitak u prahu, okus naranča. Posuda od 500 g; 13,5 g ugljikohidrata u porciji od 15 g.',
      en: 'Instant isotonic drink powder, orange flavour. 500 g tub; 13.5 g of carbohydrate per 15 g serving.',
      de: 'Isotonisches Instant-Getränkepulver, Geschmack Orange. 500-g-Dose; 13,5 g Kohlenhydrate pro 15-g-Portion.',
      sl: 'Instant izotonični napitek v prahu, okus pomaranča. Embalaža 500 g; 13,5 g ogljikovih hidratov v 15-gramskem obroku.',
      pl: 'Instant napój izotoniczny w proszku, smak pomarańcza. Opakowanie 500 g; 13,5 g węglowodanów w porcji 15 g.',
    },
    basePrice: 800,
    mainImage: {
      _type: 'image',
      asset: {
        _ref: '/images/products/isonaranca-prednja.png',
        _type: 'reference',
      },
      alt: 'Honey Bee Power Izotonični Napitak Naranča',
    },
    imageGallery: [
      {
        _type: 'image',
        asset: { _ref: '/images/products/isonaranca-prednja.png', _type: 'reference' },
        alt: 'Honey Bee Power Izotonični Napitak Naranča — prednja strana',
      },
      {
        _type: 'image',
        asset: { _ref: '/images/products/isonaranca-zadnja.png', _type: 'reference' },
        alt: 'Honey Bee Power Izotonični Napitak Naranča — zadnja strana',
      },
    ],
    variants: [
      { _key: 'v1', flavour: 'Naranča', size: '500g posuda', sku: 'HBP-ISO-NAR-500', price: 800, stockLevel: 75, minQuantity: 5 },
    ],
  },
  {
    _id: 'hbp-iso-duo-shaker',
    name: {
      hr: 'Honey Bee Power Izotonični Napitak – Paket Limun & Naranča + Shaker',
      en: 'Honey Bee Power Isotonic Drink – Lemon & Orange Pack + Shaker',
      de: 'Honey Bee Power Isotonisches Getränk – Zitrone & Orange Paket + Shaker',
      sl: 'Honey Bee Power Izotonični Napitek – Paket Limona & Pomaranča + Shaker',
      pl: 'Honey Bee Power Napój Izotoniczny – Zestaw Cytryna & Pomarańcza + Shaker',
    },
    slug: 'honey-bee-power-izotonicki-napitak-paket-limun-naranca-shaker',
    category: 'izotonicki-napitci',
    minQuantity: 5,
    shortDescription: {
      hr: 'Paket dva izotonična napitka u prahu, limun i naranča (2 × 500 g), uz Honey Bee Power shaker.',
      en: 'Two instant isotonic drink powders, lemon and orange (2 × 500 g), with a Honey Bee Power shaker.',
      de: 'Zwei isotonische Instant-Getränkepulver, Zitrone und Orange (2 × 500 g), mit Honey Bee Power Shaker.',
      sl: 'Dva instant izotonična napitka v prahu, limona in pomaranča (2 × 500 g), s Honey Bee Power shakerjem.',
      pl: 'Dwa instant napoje izotoniczne w proszku, cytryna i pomarańcza (2 × 500 g), z shakerem Honey Bee Power.',
    },
    basePrice: 3199,
    mainImage: {
      _type: 'image',
      asset: {
        _ref: '/images/products/paketizolimunnaranca-shaker.png',
        _type: 'reference',
      },
      alt: 'Honey Bee Power Izotonični Napitak — paket Limun & Naranča + Shaker',
    },
    imageGallery: [
      {
        _type: 'image',
        asset: { _ref: '/images/products/paketizolimunnaranca-shaker.png', _type: 'reference' },
        alt: 'Honey Bee Power Izotonični Napitak — paket Limun & Naranča + Shaker',
      },
    ],
    variants: [
      { _key: 'v1', flavour: 'Limun & Naranča', size: '2x500g posuda + Shaker', sku: 'HBP-ISO-DUO-SHK', price: 3199, stockLevel: 40, minQuantity: 5 },
    ],
  },
  {
    _id: 'hbp-whey-choc-hazelnut-700',
    name: {
      hr: 'Honey Bee Power Whey Protein – Lješnjak-čokolada (700 g)',
      en: 'Honey Bee Power Whey Protein – Hazelnut Chocolate (700 g)',
      de: 'Honey Bee Power Whey Protein – Haselnuss-Schokolade (700 g)',
      sl: 'Honey Bee Power Whey Protein – Lešnik-čokolada (700 g)',
      pl: 'Honey Bee Power Whey Protein – Czekolada z orzechami laskowymi (700 g)',
    },
    slug: 'honey-bee-power-whey-protein-ljesnjak-cokolada-700g',
    category: 'whey-proteini',
    minQuantity: 5,
    shortDescription: {
      hr: 'Whey protein sa sušenim medom (6 %) i stevijom, okus lješnjak-čokolada. Posuda od 700 g; oko 22,1 g proteina u porciji od 33 g. Sadrži mlijeko.',
      en: 'Whey protein with dried honey (6%) and stevia, hazelnut-chocolate flavour. 700 g tub; about 22.1 g of protein per 33 g serving. Contains milk.',
      de: 'Whey Protein mit getrocknetem Honig (6 %) und Stevia, Geschmack Haselnuss-Schokolade. 700-g-Dose; etwa 22,1 g Protein pro 33-g-Portion. Enthält Milch.',
      sl: 'Whey protein s sušenim medom (6 %) in stevio, okus lešnik-čokolada. Embalaža 700 g; približno 22,1 g beljakovin v 33-gramskem obroku. Vsebuje mleko.',
      pl: 'Białko serwatkowe z suszonym miodem (6%) i stewią, smak orzech laskowy z czekoladą. Opakowanie 700 g; około 22.1 g białka w porcji 33 g. Zawiera mleko.',
    },
    basePrice: 3800,
    mainImage: {
      _type: 'image',
      asset: {
        _ref: '/images/products/proteincokolada700g.png',
        _type: 'reference',
      },
      alt: 'Honey Bee Power Whey Protein Lješnjak-čokolada 700 g',
    },
    imageGallery: [
      {
        _type: 'image',
        asset: { _ref: '/images/products/proteincokolada700g.png', _type: 'reference' },
        alt: 'Honey Bee Power Whey Protein Lješnjak-čokolada 700 g',
      },
    ],
    variants: [
      { _key: 'v1', flavour: 'Lješnjak-čokolada', size: '700g posuda', sku: 'HBP-WHY-COK-700', gtin: '5904966072352', price: 3800, minQuantity: 5 },
    ],
  },
  {
    _id: 'hbp-whey-banana-vanilla-700',
    name: {
      hr: 'Honey Bee Power Whey Protein – Banana-vanilija (700 g)',
      en: 'Honey Bee Power Whey Protein – Banana Vanilla (700 g)',
      de: 'Honey Bee Power Whey Protein – Banane-Vanille (700 g)',
      sl: 'Honey Bee Power Whey Protein – Banana-vanilija (700 g)',
      pl: 'Honey Bee Power Whey Protein – Banan z wanilią (700 g)',
    },
    slug: 'honey-bee-power-whey-protein-banana-vanilija-700g',
    category: 'whey-proteini',
    minQuantity: 5,
    shortDescription: {
      hr: 'Whey protein sa sušenim medom (6 %) i stevijom, okus banana-vanilija. Posuda od 700 g; oko 22,1 g proteina u porciji od 33 g. Sadrži mlijeko.',
      en: 'Whey protein with dried honey (6%) and stevia, banana-vanilla flavour. 700 g tub; about 22.1 g of protein per 33 g serving. Contains milk.',
      de: 'Whey Protein mit getrocknetem Honig (6 %) und Stevia, Geschmack Banane-Vanille. 700-g-Dose; etwa 22,1 g Protein pro 33-g-Portion. Enthält Milch.',
      sl: 'Whey protein s sušenim medom (6 %) in stevio, okus banana-vanilija. Embalaža 700 g; približno 22,1 g beljakovin v 33-gramskem obroku. Vsebuje mleko.',
      pl: 'Białko serwatkowe z suszonym miodem (6%) i stewią, smak banan z wanilią. Opakowanie 700 g; około 22.1 g białka w porcji 33 g. Zawiera mleko.',
    },
    basePrice: 3800,
    mainImage: {
      _type: 'image',
      asset: {
        _ref: '/images/products/proteinbanana700g.png',
        _type: 'reference',
      },
      alt: 'Honey Bee Power Whey Protein Banana-vanilija 700 g',
    },
    imageGallery: [
      {
        _type: 'image',
        asset: { _ref: '/images/products/proteinbanana700g.png', _type: 'reference' },
        alt: 'Honey Bee Power Whey Protein Banana-vanilija 700 g',
      },
    ],
    variants: [
      { _key: 'v1', flavour: 'Banana-vanilija', size: '700g posuda', sku: 'HBP-WHY-BAN-700', gtin: '5904966072345', price: 3800, minQuantity: 5 },
    ],
  },
  {
    _id: 'hbp-whey-strawberry-cream-700',
    name: {
      hr: 'Honey Bee Power Whey Protein – Jagoda-šlag (700 g)',
      en: 'Honey Bee Power Whey Protein – Strawberry Cream (700 g)',
      de: 'Honey Bee Power Whey Protein – Erdbeere-Sahne (700 g)',
      sl: 'Honey Bee Power Whey Protein – Jagoda-smetana (700 g)',
      pl: 'Honey Bee Power Whey Protein – Truskawka ze śmietaną (700 g)',
    },
    slug: 'honey-bee-power-whey-protein-jagoda-slag-700g',
    category: 'whey-proteini',
    minQuantity: 5,
    shortDescription: {
      hr: 'Whey protein sa sušenim medom (6 %) i stevijom, okus jagoda-šlag. Posuda od 700 g; oko 22,7 g proteina u porciji od 33 g. Sadrži mlijeko.',
      en: 'Whey protein with dried honey (6%) and stevia, strawberry-cream flavour. 700 g tub; about 22.7 g of protein per 33 g serving. Contains milk.',
      de: 'Whey Protein mit getrocknetem Honig (6 %) und Stevia, Geschmack Erdbeere-Sahne. 700-g-Dose; etwa 22,7 g Protein pro 33-g-Portion. Enthält Milch.',
      sl: 'Whey protein s sušenim medom (6 %) in stevio, okus jagoda-smetana. Embalaža 700 g; približno 22,7 g beljakovin v 33-gramskem obroku. Vsebuje mleko.',
      pl: 'Białko serwatkowe z suszonym miodem (6%) i stewią, smak truskawka ze śmietaną. Opakowanie 700 g; około 22.7 g białka w porcji 33 g. Zawiera mleko.',
    },
    basePrice: 3800,
    mainImage: {
      _type: 'image',
      asset: {
        _ref: '/images/products/proteinjagodaslag700g.png',
        _type: 'reference',
      },
      alt: 'Honey Bee Power Whey Protein Jagoda-šlag 700 g',
    },
    imageGallery: [
      {
        _type: 'image',
        asset: { _ref: '/images/products/proteinjagodaslag700g.png', _type: 'reference' },
        alt: 'Honey Bee Power Whey Protein Jagoda-šlag 700 g',
      },
    ],
    variants: [
      { _key: 'v1', flavour: 'Jagoda-šlag', size: '700g posuda', sku: 'HBP-WHY-JAG-700', gtin: '5904966072369', price: 3800, minQuantity: 5 },
    ],
  },
]
