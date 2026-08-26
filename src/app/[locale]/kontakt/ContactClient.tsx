'use client'

import React from 'react'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import { useTranslations } from 'next-intl'
import ContactForm from '@/components/contact/ContactForm'
import { PresentationDownload } from '@/components/common/PresentationDownload'
import { WhatsAppIcon, FacebookIcon, InstagramIcon, TikTokIcon } from '@/components/ui/SocialIcons'

const SOCIAL_LINKS = [
  {
    key: 'whatsapp',
    href: 'https://wa.me/385977097962',
    icon: WhatsAppIcon,
    label: '+385 97 709 7962',
  },
  {
    key: 'facebook',
    href: 'https://www.facebook.com/profile.php?id=61556227986574',
    icon: FacebookIcon,
    label: 'Honey Bee Power',
  },
  {
    key: 'instagram',
    href: 'https://www.instagram.com/planet__bio/',
    icon: InstagramIcon,
    label: '@planet__bio',
  },
  {
    key: 'tiktok',
    href: 'https://www.tiktok.com/@honeybeepowerhrvatska',
    icon: TikTokIcon,
    label: '@honeybeepowerhrvatska',
  },
]

export default function ContactClient() {
  const t = useTranslations('contactPage')

  return (
    <div className="py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <span className="text-amber-600 font-bold text-sm uppercase tracking-wider">{t('badge')}</span>
          <h1 className="text-4xl font-black text-gray-900 mt-1">{t('title')}</h1>
          <p className="text-gray-600 mt-2">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-amber-50/50 p-8 rounded-3xl border border-amber-200 space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Planet Bio d.o.o.</h2>

            <div className="space-y-4 text-sm text-gray-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>{t('addressTitle')}:</strong><br />
                  Krndijska ulica 4, 31500 Našice, Hrvatska
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-amber-600 flex-shrink-0" />
                <div>
                  <strong>{t('phoneTitle')}:</strong><br />
                  <a href="tel:+385977097962" className="hover:underline text-amber-900">+385 977 097 962</a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>{t('emailTitle')}:</strong><br />
                  <a href="mailto:info@planetbio.hr" className="hover:underline text-amber-900">info@planetbio.hr</a>
                  <br />
                  <a href="mailto:srdanrebic2101@gmail.com" className="hover:underline text-amber-900">srdanrebic2101@gmail.com</a>
                  <span className="block text-xs text-gray-500">{t('emailB2BNote')}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-amber-600 flex-shrink-0" />
                <div>
                  <strong>{t('hoursTitle')}:</strong><br />
                  Pon - Pet: 08:00 - 16:00h
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-amber-200/70">
              <strong className="text-sm text-gray-900">{t('socialTitle')}</strong>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SOCIAL_LINKS.map(({ key, href, icon: Icon, label }) => (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-amber-200 text-sm font-semibold text-gray-700 hover:text-amber-700 hover:border-amber-400 transition-colors"
                  >
                    <Icon className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <span className="truncate">{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <ContactForm />
        </div>

        <PresentationDownload className="mt-8" />
      </div>
    </div>
  )
}
