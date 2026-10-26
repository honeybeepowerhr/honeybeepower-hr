import Link from 'next/link'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import type { Locale } from '@/types'

/** „Portrait as drop cap”: arhivska fotografija pčelinjaka kao veliko početno slovo. */
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
              <dt className="t-small">{f.label}</dt>
              <dd className="mt-1 font-medium">{f.value}</dd>
            </div>
          ))}
        </dl>

        <div className="col-span-12 lg:col-span-10" data-reveal>
          <p className="text-[length:var(--text-lead)] leading-[1.28] tracking-[-0.005em]">
            <span className="float-left mr-[0.5em] mt-[0.2em] block h-[3.66em] w-[3.66em] overflow-hidden max-sm:h-[4.9em] max-sm:w-[4.9em]">
              <Image
                src="/images/found/pcelinjak-1939.jpg"
                alt={t('photoAlt')}
                width={480}
                height={480}
                sizes="(min-width: 1024px) 200px, 120px"
                className="h-full w-full object-cover object-[60%_55%] grayscale"
              />
            </span>
            {t('p1')}
          </p>
          <p className="mt-[1.2em] clear-both text-[length:var(--text-lead)] leading-[1.28] tracking-[-0.005em] text-muted">
            {t('p2')}
          </p>
          <p className="mt-6 t-small">{t('photoCaption')}</p>
          <Link href={`${prefix}/o-nama`} className="link mt-8 inline-block t-body font-medium">
            {t('more')}
          </Link>
        </div>
      </div>
    </section>
  )
}
