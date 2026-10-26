import type { Locale } from '@/types'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildBreadcrumbSchema } from '@/lib/seo/schemas'
import { localeUrl } from '@/lib/seo/site'
import { getLegalDoc, type LegalSlug } from '@/lib/legal-data'
import { SectionMotion } from '@/components/site/SectionMotion'

const NOTE: Record<Locale, string> = {
  hr: '',
  en: 'This is a translation; the Croatian version is binding.',
  de: 'Diese Seite ist auf Englisch verfügbar; verbindlich ist die kroatische Fassung.',
  sl: 'Ta stran je na voljo v angleščini; zavezujoča je hrvaška različica.',
  pl: 'Ta strona jest dostępna po angielsku; wiążąca jest wersja chorwacka.',
}

const UPDATED: Record<Locale, string> = { hr: 'Ažurirano', en: 'Updated', de: 'Aktualisiert', sl: 'Posodobljeno', pl: 'Zaktualizowano' }

function todo(text: string) {
  return text.split(/(\[UPIŠI:[^\]]*\])/g).map((p, i) => (p.startsWith('[UPIŠI') ? <span key={i} className="todo">{p}</span> : p))
}

/** Zajednički predložak pravnih stranica: naslov lijevo, tekst desno, bez ukrasa. */
export function LegalPage({ slug, locale }: { slug: LegalSlug; locale: Locale }) {
  const { doc, fallback } = getLegalDoc(slug, locale)
  return (
    <article lang={locale === 'hr' ? 'hr' : 'en'}>
      <SectionMotion />
      <JsonLd schema={buildBreadcrumbSchema([
        { name: 'Honey Bee Power', url: localeUrl(locale, '/') },
        { name: doc.title, url: localeUrl(locale, `/${slug}`) },
      ])} />
      <header className="frame grid-12 gap-y-6 pb-12 pt-10">
        <h1 className="t-head col-span-12 lg:col-span-8">{doc.title}</h1>
        <p className="col-span-12 t-lead lg:col-span-8">{doc.intro}</p>
        <p className="col-span-12 t-small">
          {UPDATED[locale]}: <time dateTime={doc.updated}>{doc.updated.split('-').reverse().join('. ')}.</time>
          {NOTE[locale] && <> · {NOTE[locale]}</>}
        </p>
      </header>
      <div className="frame pb-24">
        {doc.sections.map((s, i) => (
          <section key={s.title} data-reveal className={`grid-12 gap-y-4 py-10 ${i % 2 ? 'field-surface -mx-[var(--gutter)] px-[var(--gutter)]' : ''}`}>
            <h2 className="col-span-12 font-[family-name:var(--font-display)] text-[length:var(--text-sub)] font-extrabold leading-[1.05] lg:col-span-5">{s.title}</h2>
            <div className="col-span-12 space-y-4 t-body lg:col-span-7 lg:col-start-6">
              {s.paragraphs.map((p, j) => <p key={j} className="measure">{todo(p)}</p>)}
              {s.list && (
                <ul className="list-disc space-y-1 pl-6 measure">
                  {s.list.map((li) => <li key={li}>{li}</li>)}
                </ul>
              )}
            </div>
          </section>
        ))}
        {fallback && <p className="mt-10 t-small">{NOTE[locale]}</p>}
      </div>
    </article>
  )
}
