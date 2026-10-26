import { SectionMotion } from '@/components/site/SectionMotion'
import { useTranslations } from 'next-intl'
import { LEGAL_ENTITY } from '@/lib/cjenik-data'
import { MANUFACTURER } from '@/lib/declarations'
import { PHOTO_CREDITS } from '@/lib/photo-credits'

export default function ImpressumClient() {
  const t = useTranslations('legal')

  const rows: Array<[string, React.ReactNode]> = [
    [t('companyName'), LEGAL_ENTITY.nazivTvrtke],
    [t('address'), `${LEGAL_ENTITY.adresa}, ${LEGAL_ENTITY.postanskiBroj} ${LEGAL_ENTITY.grad}, ${LEGAL_ENTITY.drzava}`],
    ['OIB', LEGAL_ENTITY.oib],
    [t('registrationNumber'), LEGAL_ENTITY.maticniBroj],
    [
      t('contactDetails'),
      <>
        <a href="mailto:info@planetbio.hr" className="link">info@planetbio.hr</a> · <a href="tel:+385977097962" className="link">+385 97 709 7962</a>
      </>,
    ],
    [
      t('manufacturer'),
      <>
        {MANUFACTURER.name}, {MANUFACTURER.address} ·{' '}
        <a href={MANUFACTURER.web} className="link" rel="noopener" target="_blank">honeybeepower.pl</a>
        <br />
        {t('distributorNote')}
      </>,
    ],
  ]

  return (
    <article>
      <SectionMotion />
      <header className="frame pb-12 pt-10">
        <h1 className="t-display">{t('impressumTitle')}</h1>
      </header>
      <dl className="frame pb-16">
        {rows.map(([k, v], i) => (
          <div key={i} data-reveal className={`grid-12 gap-y-1 py-5 ${i % 2 ? 'field-surface -mx-[var(--gutter)] px-[var(--gutter)]' : ''}`}>
            <dt className="col-span-12 t-small md:col-span-4">{k}</dt>
            <dd className="col-span-12 t-lead md:col-span-8">{v}</dd>
          </div>
        ))}
      </dl>
      <section id="fotografije" className="frame pb-24" aria-labelledby="foto-title">
        <h2 id="foto-title" className="font-[family-name:var(--font-display)] text-[length:var(--text-sub)] font-extrabold">{t('photosTitle')}</h2>
        <p className="mt-3 t-body measure">{t('photosText')}</p>
        <ul className="mt-6 space-y-2 t-small">
          {PHOTO_CREDITS.map((c) => (
            <li key={c.file}>
              <a href={c.page} className="link" rel="noopener" target="_blank">{c.title}</a>
              {c.creator ? `, ${c.creator}` : ''}, <a href={c.licenseUrl} className="link" rel="noopener license" target="_blank">{c.license}</a>
            </li>
          ))}
        </ul>
        <p className="mt-10 t-small measure">{t('disclaimerNotice')}</p>
      </section>
    </article>
  )
}
