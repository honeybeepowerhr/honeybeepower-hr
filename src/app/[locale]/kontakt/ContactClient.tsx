import { useTranslations } from 'next-intl'
import ContactForm from '@/components/contact/ContactForm'
import { LEGAL_ENTITY } from '@/lib/cjenik-data'

const MAP_QUERY = encodeURIComponent('Krndijska 4, 31500 Našice, Hrvatska')

/** Kontakt: telefon i e-mail kao glavni elementi, obrazac i adresa skladišta. */
export default function ContactClient() {
  const t = useTranslations('contactPage')

  return (
    <>
      <section className="frame pb-14 pt-10" aria-labelledby="kontakt-title">
        <h1 id="kontakt-title" className="t-display">{t('title')}</h1>
        <p className="mt-6 t-lead measure">{t('subtitle')}</p>
      </section>

      <section className="on-ink" aria-label={t('phoneTitle')}>
        <div className="frame py-14 md:py-20">
          <a href="tel:+385977097962" className="block whitespace-nowrap font-[family-name:var(--font-display)] text-[length:min(11vw,var(--text-display))] font-black leading-[0.9] tracking-[-0.035em] hover:underline decoration-[0.06em]">
            +385 97 709 7962
          </a>
          <a href="mailto:info@planetbio.hr" className="mt-4 block font-[family-name:var(--font-display)] text-[length:var(--text-sub)] font-extrabold hover:underline">
            info@planetbio.hr
          </a>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 t-body">
            <li><a className="link" href="https://wa.me/385977097962" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
            <li><a className="link" href="https://www.instagram.com/planet__bio/" target="_blank" rel="noopener noreferrer">Instagram @planet__bio</a></li>
            <li><a className="link" href="https://www.tiktok.com/@honeybeepowerhrvatska" target="_blank" rel="noopener noreferrer">TikTok @honeybeepowerhrvatska</a></li>
            <li><a className="link" href="https://www.facebook.com/profile.php?id=61556227986574" target="_blank" rel="noopener noreferrer">Facebook</a></li>
          </ul>
        </div>
      </section>

      <section className="frame section" aria-labelledby="poruka-title">
        <div className="grid-12 gap-y-12">
          <div className="col-span-12 space-y-8 lg:col-span-4">
            <h2 id="poruka-title" className="t-head">{t('formTitle')}</h2>
            <dl className="space-y-5 t-body">
              <div>
                <dt className="t-small">{t('addressTitle')}</dt>
                <dd className="mt-1 font-medium">{LEGAL_ENTITY.nazivTvrtke}<br />{LEGAL_ENTITY.adresa}, {LEGAL_ENTITY.postanskiBroj} {LEGAL_ENTITY.grad}</dd>
              </div>
              <div>
                <dt className="t-small">{t('hoursTitle')}</dt>
                <dd className="mt-1 font-medium">{t('hours')}</dd>
              </div>
              <div>
                <dt className="t-small">{t('mapTitle')}</dt>
                <dd className="mt-1 flex flex-wrap gap-x-4">
                  <a className="link" href={`https://www.openstreetmap.org/search?query=${MAP_QUERY}`} target="_blank" rel="noopener noreferrer">OpenStreetMap</a>
                  <a className="link" href={`https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`} target="_blank" rel="noopener noreferrer">Google Maps</a>
                </dd>
              </div>
            </dl>
          </div>
          <div className="col-span-12 lg:col-span-7 lg:col-start-6">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}
