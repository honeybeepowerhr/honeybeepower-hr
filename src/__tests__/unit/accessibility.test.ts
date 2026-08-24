import { describe, it, expect } from 'vitest'
import React from 'react'
import { JsonLd } from '@/components/seo/JsonLd'

describe('Unit & Accessibility — Component Integrity Checks', () => {
  it('renders JsonLd as a script tag containing the serialized schema', () => {
    const el = JsonLd({ schema: { '@context': 'https://schema.org', '@type': 'Thing' } })
    expect(el).not.toBeNull()
    expect(React.isValidElement(el)).toBe(true)
    expect(el?.type).toBe('script')
    expect(el?.props.dangerouslySetInnerHTML.__html).toContain('"@type":"Thing"')
  })

  it('renders nothing when no schema is provided', () => {
    const el = JsonLd({})
    expect(el).toBeNull()
  })
})
