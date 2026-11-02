import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import type { Locale } from '@/types'

/** Naša priča: činjenice i dva odlomka teksta. */
export async function StorySection({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'home.story' })
  const prefix = locale === 'hr' ? '' : `/${locale}`

  const facts = [
    { label: t('fact1Label'), value: t('fact1') },
    { label: t('fact2Label'), value: t('fact2') },
    { label: t('fact3Label'), value: t('fact3') },
  ]

  return (
    <section aria-labelledby="prica-title" className="frame section" id="prica">
      <div className="grid-12 gap-y-10">
        <h2 id="prica-title" data-reveal className="t-head col-span-12 lg:col-span-10 lg:col-start-3">
          {t('title')}
        </h2>

        <dl className="order-last col-span-12 grid grid-cols-1 gap-6 t-body sm:grid-cols-3 lg:order-none lg:col-span-2 lg:row-span-2 lg:grid-cols-1 lg:content-start">
          {facts.map((f) => (
            <div key={f.label} data-reveal>
              <dt className="eyebrow">{f.label}</dt>
              <dd className="mt-1 font-medium">{f.value}</dd>
            </div>
          ))}
        </dl>

        <div className="col-span-12 lg:col-span-10" data-reveal>
          <p className="text-[length:var(--text-lead)] leading-[1.28] tracking-[-0.005em]">
            {t('p1')}
          </p>
          <p className="mt-[1.2em] clear-both text-[length:var(--text-lead)] leading-[1.28] tracking-[-0.005em] text-muted">
            {t('p2')}
          </p>
          <Link href={`${prefix}/o-nama`} className="link mt-8 inline-block t-body font-medium">
            {t('more')}
          </Link>
        </div>
      </div>
    </section>
  )
}
