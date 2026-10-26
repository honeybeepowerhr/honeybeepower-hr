'use client'

import { useId, useState } from 'react'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { validateB2BForm, type B2BFormErrors } from '@/features/b2b/schema'

export interface B2BProductRow {
  id: string
  label: string
}

const TYPES = ['klub', 'teretana', 'maloprodaja', 'distributer', 'ostalo'] as const

/** B2B upit s izborom proizvoda i količina; šalje se na postojeći /api/b2b. */
export default function B2BClient({ products }: { products: B2BProductRow[] }) {
  const t = useTranslations('b2bPage')
  const locale = useLocale()
  const uid = useId()
  const [form, setForm] = useState({ companyName: '', contactPerson: '', email: '', phone: '', cooperationType: 'klub', message: '' })
  const [qty, setQty] = useState<Record<string, string>>({})
  const [errors, setErrors] = useState<B2BFormErrors>({})
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)
  const [netError, setNetError] = useState<string | null>(null)
  const [shake, setShake] = useState(0)

  const id = (f: string) => `${uid}-${f}`
  const set = (f: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((p) => ({ ...p, [f]: e.target.value }))
    setErrors((p) => ({ ...p, [f]: undefined }))
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setNetError(null)
    const lines = products
      .filter((p) => Number(qty[p.id]) > 0)
      .map((p) => `- ${p.label}: ${Number(qty[p.id])} kom`)
    const message = [form.message.trim(), lines.length ? `\nProizvodi i količine:\n${lines.join('\n')}` : ''].join('').trim()
    const payload = { ...form, message }
    const v = validateB2BForm(payload)
    if (!v.success) {
      setErrors(v.errors)
      setShake((s) => s + 1)
      const first = Object.keys(v.errors)[0]
      document.getElementById(id(first))?.focus()
      return
    }
    setSending(true)
    try {
      const res = await fetch('/api/b2b', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.success) {
        setNetError(t('errorSend'))
        return
      }
      setDone(true)
    } catch {
      setNetError(t('errorSend'))
    } finally {
      setSending(false)
    }
  }

  if (done) {
    return (
      <div role="status" className="bg-surface p-8">
        <p className="t-head text-[length:var(--text-sub)]">{t('successTitle')}</p>
        <p className="mt-4 t-body">{t('successDesc')}</p>
      </div>
    )
  }

  const field = (name: keyof typeof form, label: string, type = 'text', auto?: string) => (
    <div className="flex flex-col gap-2">
      <label htmlFor={id(name)} className="t-body font-medium">{label}</label>
      <input
        id={id(name)}
        type={type}
        autoComplete={auto}
        value={form[name]}
        onChange={set(name)}
        required
        aria-invalid={!!errors[name]}
        aria-describedby={errors[name] ? `${id(name)}-err` : undefined}
        className="field-input"
      />
      {errors[name] && <p id={`${id(name)}-err`} className="t-small font-medium text-[color:var(--color-alert)]">{t(`error.${name}`)}</p>}
    </div>
  )

  return (
    <form onSubmit={submit} noValidate className={`space-y-6 ${shake ? 'shake' : ''}`} key={shake}>
      <div className="grid gap-6 sm:grid-cols-2">
        {field('companyName', t('companyLabel'), 'text', 'organization')}
        {field('contactPerson', t('contactLabel'), 'text', 'name')}
        {field('email', t('emailLabel'), 'email', 'email')}
        {field('phone', t('phoneLabel'), 'tel', 'tel')}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={id('cooperationType')} className="t-body font-medium">{t('typeLabel')}</label>
        <select id={id('cooperationType')} value={form.cooperationType} onChange={set('cooperationType')} className="field-input">
          {TYPES.map((ty) => (
            <option key={ty} value={ty}>{t(`type.${ty}`)}</option>
          ))}
        </select>
      </div>

      <fieldset>
        <legend className="t-body font-medium">{t('productsLabel')}</legend>
        <p className="mt-1 t-small">{t('productsHint')}</p>
        <div className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2">
          {products.map((p) => (
            <label key={p.id} className="flex items-center justify-between gap-4 bg-surface px-4 py-2">
              <span className="t-body">{p.label}</span>
              <input
                type="number"
                inputMode="numeric"
                min={0}
                step={1}
                value={qty[p.id] ?? ''}
                onChange={(e) => setQty((q) => ({ ...q, [p.id]: e.target.value }))}
                className="field-input w-24 min-h-11 text-right tabular"
                aria-label={`${t('quantity')}: ${p.label}`}
              />
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-col gap-2">
        <label htmlFor={id('message')} className="t-body font-medium">{t('messageLabel')}</label>
        <textarea
          id={id('message')}
          rows={5}
          value={form.message}
          onChange={set('message')}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? `${id('message')}-err` : undefined}
          className="field-input min-h-36"
        />
        {errors.message && <p id={`${id('message')}-err`} className="t-small font-medium text-[color:var(--color-alert)]">{t('error.message')}</p>}
      </div>

      {netError && <p role="alert" className="t-body font-medium text-[color:var(--color-alert)]">{netError}</p>}

      <p className="t-small measure">
        {t('privacy')}{' '}
        <Link href={`${locale === 'hr' ? '' : `/${locale}`}/politika-privatnosti`} className="link">{t('privacyLink')}</Link>
      </p>

      <button type="submit" disabled={sending} className="btn btn-honey">
        {sending ? t('sending') : t('submitBtn')}
      </button>
    </form>
  )
}
