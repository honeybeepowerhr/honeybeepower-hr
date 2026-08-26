'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { X, Maximize2 } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'
import type { Locale } from '@/types'

const GALLERY_IMAGES = [
  { id: 1, src: '/images/events/event-1.jpg' },
  { id: 2, src: '/images/events/event-2.jpg' },
  { id: 3, src: '/images/events/event-3.jpg' },
  { id: 4, src: '/images/events/event-4.jpg' },
  { id: 5, src: '/images/events/event-5.jpg' },
  { id: 6, src: '/images/events/event-6.jpg' },
  { id: 7, src: '/images/events/event-7.jpg' },
  { id: 8, src: '/images/events/event-8.jpg' },
  { id: 9, src: '/images/events/event-9.jpg' },
  { id: 10, src: '/images/events/event-10.jpg' },
  { id: 11, src: '/images/events/event-11.jpg' },
  { id: 12, src: '/images/events/event-12.jpg' },
  { id: 13, src: '/images/events/event-13.jpg' },
  { id: 14, src: '/images/events/event-14.jpg' },
  { id: 15, src: '/images/events/event-15.jpg' },
  { id: 16, src: '/images/events/event-16.jpg' },
  { id: 17, src: '/images/events/event-17.jpg' },
  { id: 18, src: '/images/events/event-18.jpg' },
  { id: 19, src: '/images/events/event-19.jpg' },
  { id: 20, src: '/images/events/event-20.jpg' },
  { id: 21, src: '/images/events/event-21.jpg' },
  { id: 22, src: '/images/events/event-22.jpg' },
  { id: 23, src: '/images/events/event-23.jpg' },
  { id: 24, src: '/images/events/event-24.jpg' },
  { id: 25, src: '/images/events/event-25.jpg' },
]

interface ActivitiesGalleryProps {
  /** Cap the number of photos shown (e.g. for a homepage teaser). Omit to show all. */
  limit?: number
}

export function ActivitiesGallery({ limit }: ActivitiesGalleryProps = {}) {
  const [selectedImage, setSelectedImage] = useState<(typeof GALLERY_IMAGES)[0] | null>(null)
  const t = useTranslations('activities')
  const locale = useLocale() as Locale
  const prefix = locale === 'hr' ? '' : `/${locale}`
  const images = limit ? GALLERY_IMAGES.slice(0, limit) : GALLERY_IMAGES

  return (
    <section className="py-16 bg-gray-50 border-b border-gray-100">
      <div className="container mx-auto px-4 max-w-7xl">
        <Reveal className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-amber-600 font-bold text-sm uppercase tracking-wider">
            {t('badge')}
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 mt-1">{t('title')}</h2>
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img, idx) => (
            <Reveal key={img.id} delay={(idx % 8) * 55}>
              <button
                type="button"
                onClick={() => setSelectedImage(img)}
                className="group relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-gray-200 border border-gray-200 text-left focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm"
              >
                <Image
                  src={img.src}
                  alt="Honey Bee Power događaj"
                  width={600}
                  height={450}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <Maximize2 className="w-6 h-6 drop-shadow-md" />
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        {limit && limit < GALLERY_IMAGES.length && (
          <div className="text-center mt-8">
            <Link
              href={`${prefix}/aktivnosti`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-gray-300 text-sm font-bold text-gray-800 hover:border-amber-400 hover:text-amber-700 transition-colors"
            >
              {t('viewAll')}
            </Link>
          </div>
        )}

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Prikaz slike u punoj veličini"
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="relative max-w-4xl w-full max-h-[90vh] bg-black rounded-2xl overflow-hidden border border-gray-800 shadow-2xl flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Zatvori prikaz"
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black transition border border-white/20"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative aspect-video w-full">
                <Image
                  src={selectedImage.src}
                  alt="Honey Bee Power događaj slika"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
