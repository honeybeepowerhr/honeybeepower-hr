import type { FAQ, Locale, ProductSummary } from '@/types'
import { absoluteUrl } from './site'

// ---------------------------------------------------------------------------
// Product schema
// ---------------------------------------------------------------------------

/**
 * Builds a schema.org Product JSON-LD object for a given product and locale.
 *
 * No `offers`/price here on purpose — the site no longer shows a fixed
 * price to customers (request-a-quote model), and Google penalises
 * structured data that promises a price the page doesn't display.
 */
export function buildProductSchema(
  product: ProductSummary,
  locale: Locale,
): Record<string, unknown> {
  const firstVariant = product.variants[0]

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name[locale] ?? product.name.hr,
    description:
      product.shortDescription[locale] ?? product.shortDescription.hr,
    brand: {
      '@type': 'Brand',
      name: 'Honey Bee Power',
    },
  }

  // First image from gallery, fallback to mainImage — resolved to an absolute URL.
  const firstImage = product.imageGallery?.[0] ?? product.mainImage
  const imageRef = firstImage?.asset?._ref
  if (imageRef) {
    schema.image = imageRef.startsWith('http') ? imageRef : absoluteUrl(imageRef)
  }

  // SKU from first variant
  if (firstVariant?.sku) {
    schema.sku = firstVariant.sku
  }

  // GTIN if present on the first variant
  if (firstVariant?.gtin) {
    schema.gtin = firstVariant.gtin
  }

  // Aggregate rating — only when there are reviews
  if (
    typeof product.reviewCount === 'number' &&
    product.reviewCount > 0 &&
    typeof product.averageRating === 'number'
  ) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: product.averageRating.toFixed(1),
      reviewCount: product.reviewCount,
      bestRating: '5',
      worstRating: '1',
    }
  }

  return schema
}

// ---------------------------------------------------------------------------
// FAQPage schema
// ---------------------------------------------------------------------------

/**
 * Builds a schema.org FAQPage JSON-LD object from an array of FAQ entries.
 */
export function buildFAQPageSchema(
  faq: FAQ[],
  locale: Locale,
): Record<string, unknown> {
  const mainEntity = faq.map((item) => ({
    '@type': 'Question',
    name: item.question[locale] ?? item.question.hr,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer[locale] ?? item.answer.hr,
    },
  }))

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity,
  }
}

// ---------------------------------------------------------------------------
// BreadcrumbList schema
// ---------------------------------------------------------------------------

/**
 * Builds a schema.org BreadcrumbList JSON-LD object from an ordered list of
 * breadcrumb items.
 */
export function buildBreadcrumbSchema(
  items: Array<{ name: string; url: string }>,
): Record<string, unknown> {
  const itemListElement = items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  }))

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  }
}

// ---------------------------------------------------------------------------
// Organization schema
// ---------------------------------------------------------------------------

/**
 * Builds a schema.org Organization JSON-LD object for Planet Bio d.o.o.
 * Carries a stable `@id` so other schemas (WebSite, Product, Article, Store)
 * can reference this same entity instead of repeating its fields.
 */
export function buildOrganizationSchema(
  siteUrl: string,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: 'Honey Bee Power',
    legalName: 'Planet Bio d.o.o.',
    url: siteUrl,
    logo: `${siteUrl}/images/logo.png`,
    brand: {
      '@type': 'Brand',
      name: 'Honey Bee Power',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+385-977-097-962',
      contactType: 'customer service',
      email: 'info@planetbio.hr',
      areaServed: 'HR',
      availableLanguage: ['hr', 'en', 'de', 'sl', 'pl'],
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Krndijska ulica 4',
      addressLocality: 'Našice',
      postalCode: '31500',
      addressCountry: 'HR',
    },
    sameAs: [
      'https://www.instagram.com/planet__bio/',
      'https://www.facebook.com/profile.php?id=61556227986574',
      'https://www.tiktok.com/@honeybeepowerhrvatska',
    ],
  }
}

// ---------------------------------------------------------------------------
// WebSite schema
// ---------------------------------------------------------------------------

/**
 * Builds a schema.org WebSite JSON-LD object with a Sitelinks Search Box
 * action, referencing the Organization as publisher.
 */
export function buildWebsiteSchema(siteUrl: string): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Honey Bee Power',
    url: siteUrl,
    publisher: { '@id': `${siteUrl}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/proizvodi?search={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }
}

// ---------------------------------------------------------------------------
// Store / LocalBusiness schema
// ---------------------------------------------------------------------------

/**
 * Builds a schema.org Store JSON-LD object for the physical retail location,
 * used on the "gdje-kupiti" (where to buy) page to support local pack /
 * Google Maps visibility.
 */
export function buildStoreSchema(siteUrl: string): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Store',
    '@id': `${siteUrl}/#store-nasice`,
    name: 'Honey Bee Power — Planet Bio d.o.o.',
    parentOrganization: { '@id': `${siteUrl}/#organization` },
    image: `${siteUrl}/images/logo.png`,
    url: `${siteUrl}/gdje-kupiti`,
    telephone: '+385-977-097-962',
    email: 'info@planetbio.hr',
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Krndijska ulica 4',
      addressLocality: 'Našice',
      postalCode: '31500',
      addressCountry: 'HR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 45.496,
      longitude: 18.093,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '16:00',
      },
    ],
  }
}
