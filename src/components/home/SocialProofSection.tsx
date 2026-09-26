'use client'

import React from 'react'
import { InstagramFeed } from './InstagramFeed'
import { PartnerLogos } from '@/components/common/PartnerLogos'
import { Reveal } from '@/components/motion/Reveal'

export function SocialProofSection() {
  return (
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 max-w-7xl space-y-16">
        {/* Partner Logos */}
        <PartnerLogos />

        {/* Instagram Feed / Photos */}
        <Reveal>
          <InstagramFeed />
        </Reveal>
      </div>
    </section>
  )
}
