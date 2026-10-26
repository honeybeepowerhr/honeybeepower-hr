import Link from 'next/link'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { SectionMotion } from '@/components/site/SectionMotion'

/** Gdje kupiti: dok nema potvrđenih prodajnih mjesta, kupuje se izravno od distributera. */
export default function WhereToBuyClient() {
  const t = useTranslations('whereToBuyPage')
  const locale = useLocale()
  const prefix = locale === 'hr' ? '' : `/${locale}`
  const steps = [t('step1'), t('step2'), t('step3'), t('step4')]

  return (
    <>
      <SectionMotion />
      <section className="grid-12 items-stretch" aria-labelledby="gdje-title">
        <div className="frame col-span-12 flex flex-col justify-end gap-6 py-12 md:col-span-6">
          <h1 id="gdje-title" className="t-display">{t('title')}</h1>
          <p className="t-lead measure">{t('subtitle')}</p>
        </div>
        <div className="relative col-span-12 min-h-[50svh] bg-white md:col-span-6">
          <Image src="/images/products-web/paketgelnaranca-new.webp" alt={t('photoAlt')} fill priority sizes="(min-width: 768px) 50vw, 100vw" className="object-contain p-[8%]" data-product-image />
        </div>
      </section>

      <section className="on-ink" aria-labelledby="kako-title">
        <div className="frame grid-12 gap-y-10 py-20 md:py-28">
          <h2 id="kako-title" className="t-head col-span-12 md:col-span-5">{t('howTitle')}</h2>
          <ol className="col-span-12 space-y-6 md:col-span-7">
            {steps.map((s, i) => (
              <li key={i} data-reveal className="grid grid-cols-[3rem_1fr] items-baseline gap-4 text-[length:var(--text-lead)] leading-[1.3]">
                <span aria-hidden="true" className="font-medium tabular">{i + 1}.</span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="frame section" aria-labelledby="mjesta-title">
        <div className="grid-12 gap-y-8">
          <h2 id="mjesta-title" className="t-head col-span-12 md:col-span-5">{t('shopsTitle')}</h2>
          <div className="col-span-12 md:col-span-7">
            <p className="text-[length:var(--text-lead)] leading-[1.3]">{t('shopsText')}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href={`${prefix}/proizvodi`} className="btn btn-honey">{t('ctaProducts')}</Link>
              <Link href={`${prefix}/b2b`} className="btn btn-ghost">{t('ctaB2b')}</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
