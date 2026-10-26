export interface FaqEntry {
  q: string
  a: React.ReactNode
}

/**
 * „Wide heading, indented questions”: <details> bez crta; otvoreni red dobiva
 * polje u tonu podloge. Radi bez JavaScripta.
 */
export function FaqList({
  id,
  title,
  items,
  headingLevel = 'h2',
}: {
  id: string
  title: string
  items: FaqEntry[]
  headingLevel?: 'h1' | 'h2'
}) {
  const Heading = headingLevel
  return (
    <div className="grid-12 gap-y-12 md:gap-y-20">
      <Heading id={id} data-reveal className="t-head col-span-12 md:col-span-10">
        {title}
      </Heading>
      <div className="col-span-12 space-y-3 md:col-span-8 md:col-start-5">
        {items.map((item) => (
          <details key={item.q} className="faq-item group -mx-[var(--gutter)] px-[var(--gutter)] open:bg-surface md:mx-[-1.5rem] md:px-6" data-reveal>
            <summary className="flex items-start justify-between gap-6 py-5 font-[family-name:var(--font-text)] text-[length:var(--text-lead)] font-medium leading-snug">
              <span>{item.q}</span>
              <svg
                className="faq-chevron mt-1 h-6 w-6 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                aria-hidden="true"
              >
                <path d="M5 9l7 7 7-7" strokeLinecap="square" />
              </svg>
            </summary>
            <div className="max-w-[56ch] pb-6 t-body">{item.a}</div>
          </details>
        ))}
      </div>
    </div>
  )
}
