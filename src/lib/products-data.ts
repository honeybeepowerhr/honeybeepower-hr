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
      hr: 'Prirodni energetski gel na bazi domaćeg cvjetnog meda i prirodnog soka limuna. Brza i dugotrajna energija bez padova.',
      en: 'Natural energy gel based on local flower honey and natural lemon juice. Fast, sustained energy without sugar crashes.',
      de: 'Natürliches Energiegel auf Basis von Blütenhonig und Zitronensaft.',
      sl: 'Naravni energijski gel na osnovi cvetličnega medu in limoninega soka.',
      pl: 'Naturalny żel energetyczny na bazie lokalnego miodu kwiatowego i soku z cytryny.',
    },
    basePrice: 249,
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
      { _key: 'v1', flavour: 'Limun', size: '40g sachet', sku: 'HBP-GEL-LIM-40', price: 249, stockLevel: 100, minQuantity: 50 },
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
      hr: 'Paket od 10 komada prirodnog energetskog gela na bazi domaćeg cvjetnog meda i prirodnog soka limuna. Brza i dugotrajna energija bez padova.',
      en: 'Pack of 10 natural energy gels based on local flower honey and natural lemon juice. Fast, sustained energy without sugar crashes.',
      de: 'Paket von 10 natürlichen Energiegels auf Basis von Blütenhonig und Zitronensaft.',
      sl: 'Paket 10 naravnih energijskih gelov na osnovi cvetličnega medu in limoninega soka.',
      pl: 'Zestaw 10 naturalnych żeli energetycznych na bazie miodu kwiatowego i soku z cytryny.',
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
    averageRating: 4.9,
    reviewCount: 24,
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
      hr: 'Prirodni energetski gel s medom i sočnom cvjetnom narančom. Savršen omjer fruktoze i glukoze za maksimalnu izdržljivost.',
      en: 'Natural energy gel with honey and juicy orange. Perfect fructose to glucose ratio for endurance.',
      de: 'Natürliches Energiegel mit Honig und frischer Orange.',
      sl: 'Naravni energijski gel z medom in pomarančo.',
      pl: 'Naturalny żel energetyczny z miodem i soczystą pomarańczą.',
    },
    basePrice: 249,
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
      { _key: 'v1', flavour: 'Naranča', size: '40g sachet', sku: 'HBP-GEL-NAR-40', price: 249, stockLevel: 120, minQuantity: 50 },
      { _key: 'v2', flavour: 'Naranča', size: 'Paket 10x40g', sku: 'HBP-GEL-NAR-10', price: 2999, stockLevel: 50, minQuantity: 5 },
    ],
    averageRating: 5.0,
    reviewCount: 42,
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
      hr: 'Paket od 10 komada prirodnog energetskog gela s medom i sočnom cvjetnom narančom. Savršen omjer fruktoze i glukoze za maksimalnu izdržljivost.',
      en: 'Pack of 10 natural energy gels with honey and juicy orange. Perfect fructose to glucose ratio for endurance.',
      de: 'Paket von 10 natürlichen Energiegels mit Honig und frischer Orange.',
      sl: 'Paket 10 naravnih energijskih gelov z medom in pomarančo.',
      pl: 'Zestaw 10 naturalnych żeli energetycznych z miodem i pomarańczą.',
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
    averageRating: 5.0,
    reviewCount: 31,
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
      hr: 'Prirodni energetski gel s liofiliziranom šumskom malinom i prirodnim elektrolitima. Bez umjetnih aditiva i bez sukraloze.',
      en: 'Natural energy gel with freeze-dried wild raspberry and natural electrolytes. No artificial additives.',
      de: 'Natürliches Energiegel mit gefriergetrockneten Himbeeren.',
      sl: 'Naravni energijski gel z liofiliziranimi malinami.',
      pl: 'Naturalny żel energetyczny z liofilizowaną maliną leśną i naturalnymi elektrolitami.',
    },
    basePrice: 249,
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
      { _key: 'v1', flavour: 'Malina', size: '40g sachet', sku: 'HBP-GEL-MAL-40', price: 249, stockLevel: 90, minQuantity: 50 },
      { _key: 'v2', flavour: 'Malina', size: 'Paket 10x40g', sku: 'HBP-GEL-MAL-10', price: 2999, stockLevel: 40, minQuantity: 5 },
    ],
    averageRating: 4.8,
    reviewCount: 29,
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
      hr: 'Paket od 10 komada prirodnog energetskog gela s liofiliziranom šumskom malinom i prirodnim elektrolitima. Bez umjetnih aditiva i bez sukraloze.',
      en: 'Pack of 10 natural energy gels with freeze-dried wild raspberry and natural electrolytes. No artificial additives.',
      de: 'Paket von 10 natürlichen Energiegels mit gefriergetrockneten Himbeeren.',
      sl: 'Paket 10 naravnih energijskih gelov z liofiliziranimi malinami.',
      pl: 'Zestaw 10 naturalnych żeli energetycznych z liofilizowaną maliną leśną.',
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
    averageRating: 4.8,
    reviewCount: 19,
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
      hr: 'Prirodni izotonični napitak s medom u prahu, prirodnim limunom i morskom solju za brzu nadoknadu elektrolita.',
      en: 'Natural isotonic drink with honey powder, lemon, and sea salt for rapid electrolyte replenishment.',
      de: 'Isotonisches Getränk mit Honigpulver und Zitrone.',
      sl: 'Izotonični napitek z medom v prahu in limono.',
      pl: 'Naturalny napój izotoniczny z miodem w proszku, cytryną i solą morską.',
    },
    basePrice: 1199,
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
      { _key: 'v1', flavour: 'Limun', size: '500g posuda', sku: 'HBP-ISO-LIM-500', price: 1199, stockLevel: 60, minQuantity: 5 },
    ],
    averageRating: 4.9,
    reviewCount: 33,
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
      hr: 'Prirodni izotonični napitak s medom i prirodnom sočnom narančom. Sprječava grčeve i održava hidraciju u utrci.',
      en: 'Natural isotonic drink with honey and juicy orange. Prevents cramps and sustains hydration during races.',
      de: 'Isotonisches Getränk mit Honig und Orange.',
      sl: 'Izotonični napitek z medom in pomarančo.',
      pl: 'Naturalny napój izotoniczny z miodem i soczystą pomarańczą.',
    },
    basePrice: 1199,
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
      { _key: 'v1', flavour: 'Naranča', size: '500g posuda', sku: 'HBP-ISO-NAR-500', price: 1199, stockLevel: 75, minQuantity: 5 },
    ],
    averageRating: 5.0,
    reviewCount: 26,
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
      hr: 'Paket dva okusa prirodnog izotoničnog napitka (limun i naranča) uz Honey Bee Power shaker. Idealno za brzu nadoknadu elektrolita i hidraciju.',
      en: 'Pack of two natural isotonic drink flavours (lemon and orange) with a Honey Bee Power shaker included. Ideal for rapid electrolyte replenishment and hydration.',
      de: 'Paket aus zwei natürlichen isotonischen Getränken (Zitrone und Orange) inklusive Honey Bee Power Shaker.',
      sl: 'Paket dveh okusov naravnega izotoničnega napitka (limona in pomaranča) s Honey Bee Power shakerjem.',
      pl: 'Zestaw dwóch smaków naturalnego napoju izotonicznego (cytryna i pomarańcza) z shakerem Honey Bee Power.',
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
    averageRating: 5.0,
    reviewCount: 12,
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
      hr: 'Whey protein zaslađen medom, okus lješnjak-čokolada. Visok udio proteina, jednostavan za pripremu. Dodatak prehrani, posuda od 700 g.',
      en: 'Honey-sweetened whey protein, hazelnut chocolate flavour. High protein content, easy to prepare. Food supplement, 700 g tub.',
      de: 'Mit Honig gesüßtes Whey Protein, Geschmack Haselnuss-Schokolade. Hoher Proteingehalt, einfach zuzubereiten. Nahrungsergänzungsmittel, 700-g-Dose.',
      sl: 'Z medom sladkan whey protein z okusom lešnik-čokolada. Visoka vsebnost beljakovin, enostaven za pripravo. Prehransko dopolnilo, embalaža 700 g.',
      pl: 'Odżywka białkowa whey słodzona miodem, smak czekolady z orzechami laskowymi. Wysoka zawartość białka, łatwa w przygotowaniu. Suplement diety, opakowanie 700 g.',
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
      hr: 'Whey protein zaslađen medom, okus banana-vanilija. Visok udio proteina, jednostavan za pripremu. Dodatak prehrani, posuda od 700 g.',
      en: 'Honey-sweetened whey protein, banana vanilla flavour. High protein content, easy to prepare. Food supplement, 700 g tub.',
      de: 'Mit Honig gesüßtes Whey Protein, Geschmack Banane-Vanille. Hoher Proteingehalt, einfach zuzubereiten. Nahrungsergänzungsmittel, 700-g-Dose.',
      sl: 'Z medom sladkan whey protein z okusom banana-vanilija. Visoka vsebnost beljakovin, enostaven za pripravo. Prehransko dopolnilo, embalaža 700 g.',
      pl: 'Odżywka białkowa whey słodzona miodem, smak bananowy z wanilią. Wysoka zawartość białka, łatwa w przygotowaniu. Suplement diety, opakowanie 700 g.',
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
      hr: 'Whey protein zaslađen medom, okus jagoda-šlag. Visok udio proteina, jednostavan za pripremu. Dodatak prehrani, posuda od 700 g.',
      en: 'Honey-sweetened whey protein, strawberry and whipped cream flavour. High protein content, easy to prepare. Food supplement, 700 g tub.',
      de: 'Mit Honig gesüßtes Whey Protein, Geschmack Erdbeere mit Schlagsahne. Hoher Proteingehalt, einfach zuzubereiten. Nahrungsergänzungsmittel, 700-g-Dose.',
      sl: 'Z medom sladkan whey protein z okusom jagoda s stepeno smetano. Visoka vsebnost beljakovin, enostaven za pripravo. Prehransko dopolnilo, embalaža 700 g.',
      pl: 'Odżywka białkowa whey słodzona miodem, smak truskawkowy z bitą śmietaną. Wysoka zawartość białka, łatwa w przygotowaniu. Suplement diety, opakowanie 700 g.',
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
