import Link from 'next/link'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import type { Locale } from '@/types'
import { CookieSettingsLink } from '@/components/analytics/CookieSettingsLink'
import { LEGAL_ENTITY } from '@/lib/cjenik-data'
import { PHOTO_CREDITS } from '@/lib/photo-credits'

/** Podnožje: kontakt je glavni redak (smjer: „Contact as the headline”). */
export default function Footer() {
  const t = useTranslations('footer')
  const tNav = useTranslations('nav')
  const locale = useLocale() as Locale
  const prefix = locale === 'hr' ? '' : `/${locale}`
  const year = new Date().getFullYear()

  const siteLinks = [
    { label: tNav('products'), href: '/proizvodi' },
    { label: tNav('recovery'), href: '/oporavak-nakon-treninga' },
    { label: tNav('sport'), href: '/sport/trcanje' },
    { label: tNav('guides'), href: '/vodici' },
    { label: tNav('about'), href: '/o-nama' },
    { label: tNav('events'), href: '/dogadaji' },
    { label: tNav('clubs'), href: '/b2b' },
    { label: tNav('whereToBuy'), href: '/gdje-kupiti' },
    { label: tNav('faq'), href: '/faq' },
    { label: tNav('contact'), href: '/kontakt' },
  ]

  const legalLinks = [
    { label: t('priceList'), href: '/cjenik' },
    { label: t('shippingPayment'), href: '/dostava-i-placanje' },
    { label: t('returns'), href: '/pravo-na-povrat' },
    { label: t('terms'), href: '/uvjeti-koristenja' },
    { label: t('privacy'), href: '/politika-privatnosti' },
    { label: t('impressum'), href: '/impressum' },
  ]

  const social = [
    { label: 'Instagram', href: 'https://www.instagram.com/planet__bio/' },
    { label: 'TikTok', href: 'https://www.tiktok.com/@honeybeepowerhrvatska' },
    { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61556227986574' },
    { label: 'WhatsApp', href: 'https://wa.me/385977097962' },
  ]

  return (
    <footer className="on-ink" id="kontakt-podnozje">
      <div className="frame flex min-h-[90svh] flex-col pb-8 pt-10">
        <div className="grid-12 gap-y-8">
          <div className="col-span-12 md:col-span-4">
            <Image src="/images/logo-white.png" alt="Honey Bee Power" width={131} height={32} className="h-8 w-auto" />
            <p className="mt-4 t-body measure">{t('aboutText')}</p>
          </div>
          <address className="col-span-6 not-italic t-body md:col-span-3">
            {LEGAL_ENTITY.nazivTvrtke}
            <br />
            {LEGAL_ENTITY.adresa}, {LEGAL_ENTITY.postanskiBroj} {LEGAL_ENTITY.grad}
            <br />
            {t('hours')}
          </address>
          <nav aria-label={t('siteNav')} className="col-span-6 md:col-span-3">
            <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 t-body">
              {siteLinks.map((l) => (
                <li key={l.href}>
                  <Link href={`${prefix}${l.href}`} className="link decoration-transparent hover:decoration-honey">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="col-span-12 md:col-span-2 md:text-right">
            <a href="#main-content" className="link t-body">
              {t('backToTop')}
            </a>
          </div>
        </div>

        <div className="mt-auto pt-24">
          <p className="t-body text-[color:var(--color-honey)]">{t('contactLead')}</p>
          <a
            href="tel:+385977097962"
            className="mt-2 block whitespace-nowrap font-[family-name:var(--font-display)] text-[length:min(11vw,var(--text-display))] font-black leading-[0.9] tracking-[-0.035em] decoration-[0.06em] underline-offset-[0.12em] hover:underline"
          >
            +385 97 709 7962
          </a>
          <a
            href="mailto:info@planetbio.hr"
            className="mt-3 block font-[family-name:var(--font-display)] text-[length:var(--text-sub)] font-extrabold leading-none tracking-[-0.03em] decoration-[0.06em] underline-offset-[0.12em] hover:underline"
          >
            info@planetbio.hr
          </a>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 t-body">
            {social.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="link">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14 grid gap-6 t-small md:grid-cols-3 md:items-start">
          <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link href={`${prefix}${l.href}`} className="hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <CookieSettingsLink label={t('cookieSettings')} className="hover:underline" />
            </li>
          </ul>
          <details className="md:text-center">
            <summary className="cursor-pointer hover:underline">{t('photoCredits')}</summary>
            <ul className="mt-3 space-y-1 text-left">
              {PHOTO_CREDITS.map((c) => (
                <li key={c.file}>
                  <a href={c.page} className="underline" rel="noopener" target="_blank">
                    {c.title}
                  </a>
                  {c.creator ? `, ${c.creator}` : ''},{' '}
                  <a href={c.licenseUrl} className="underline" rel="noopener license" target="_blank">
                    {c.license}
                  </a>
                </li>
              ))}
            </ul>
          </details>
          <p className="md:text-right">
            {LEGAL_ENTITY.grad} {year} · {t('distributor')}
          </p>
        </div>
      </div>
    </footer>
  )
}
