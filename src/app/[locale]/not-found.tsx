import Link from 'next/link'

/** 404: velika brojka, jedna rečenica, dva puta dalje. */
export default function NotFound() {
  return (
    <section className="frame flex min-h-[70svh] flex-col justify-center gap-8 py-16" aria-labelledby="nf-title">
      <p aria-hidden="true" className="font-[family-name:var(--font-display)] text-[length:var(--text-mega)] font-black leading-[0.8] tracking-[-0.04em]">404</p>
      <h1 id="nf-title" className="t-head">Stranica nije pronađena</h1>
      <p className="t-lead measure">Adresa ne postoji ili je premještena. Page not found.</p>
      <div className="flex flex-wrap gap-3">
        <Link href="/proizvodi" className="btn btn-honey">Proizvodi</Link>
        <Link href="/" className="btn btn-ghost">Naslovnica</Link>
      </div>
    </section>
  )
}
