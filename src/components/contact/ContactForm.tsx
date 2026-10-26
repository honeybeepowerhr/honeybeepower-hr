'use client'

import { useId, useState } from 'react'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'

/** Kontakt obrazac; šalje na postojeći /api/contact. */
export default function ContactForm() {
  const t = useTranslations('contactPage')
  const locale = useLocale()
  const uid = useId()
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', message: '' })
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, boolean>>>({})
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)
  const [netError, setNetError] = useState<string | null>(null)
  const [shake, setShake] = useState(0)
  const id = (f: string) => `${uid}-${f}`

  const set = (f: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((p) => ({ ...p, [f]: e.target.value }))
    setErrors((p) => ({ ...p, [f]: false }))
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setNetError(null)
    const next = {
      fullName: form.fullName.trim().length < 2,
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()),
      message: form.message.trim().length < 5,
    }
    if (next.fullName || next.email || next.message) {
      setErrors(next)
      setShake((s) => s + 1)
      const first = (Object.keys(next) as Array<keyof typeof next>).find((k) => next[k])
      if (first) document.getElementById(id(first))?.focus()
      return
    }
    setSending(true)
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
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
        <p className="mt-4 t-body">{t('successText')}</p>
      </div>
    )
  }

  const input = (name: keyof typeof form, label: string, type: string, auto: string, required = true) => (
    <div className="flex flex-col gap-2">
      <label htmlFor={id(name)} className="t-body font-medium">
        {label}
        {!required && <span className="t-small font-normal"> ({t('optional')})</span>}
      </label>
      <input
        id={id(name)}
        type={type}
        autoComplete={auto}
        value={form[name]}
        onChange={set(name)}
        required={required}
        aria-invalid={!!errors[name]}
        aria-describedby={errors[name] ? `${id(name)}-err` : undefined}
        className="field-input"
      />
      {errors[name] && <p id={`${id(name)}-err`} className="t-small font-medium text-[color:var(--color-alert)]">{t(`error.${name}`)}</p>}
    </div>
  )

  return (
    <form onSubmit={submit} noValidate className={`space-y-6 ${shake ? 'shake' : ''}`} key={shake}>
      {input('fullName', t('nameLabel'), 'text', 'name')}
      <div className="grid gap-6 sm:grid-cols-2">
        {input('email', t('emailLabel'), 'email', 'email')}
        {input('phone', t('phoneLabel'), 'tel', 'tel', false)}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor={id('message')} className="t-body font-medium">{t('messageLabel')}</label>
        <textarea
          id={id('message')}
          rows={6}
          value={form.message}
          onChange={set('message')}
          required
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? `${id('message')}-err` : undefined}
          className="field-input min-h-40"
        />
        {errors.message && <p id={`${id('message')}-err`} className="t-small font-medium text-[color:var(--color-alert)]">{t('error.message')}</p>}
      </div>
      {netError && <p role="alert" className="t-body font-medium text-[color:var(--color-alert)]">{netError}</p>}
      <p className="t-small measure">
        {t('privacy')}{' '}
        <Link href={`${locale === 'hr' ? '' : `/${locale}`}/politika-privatnosti`} className="link">{t('privacyLink')}</Link>
      </p>
      <button type="submit" disabled={sending} className="btn btn-honey">{sending ? t('sending') : t('submit')}</button>
    </form>
  )
}
