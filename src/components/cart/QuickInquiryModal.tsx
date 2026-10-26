'use client'

import { useState, useId, useCallback, type ChangeEvent, type FormEvent } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import * as Dialog from '@radix-ui/react-dialog'
import {
  validateInquiryForm,
  defaultInquiryValues,
  type InquiryFieldErrors,
} from '@/features/inquiry/schema'
import { buildWhatsAppMessage, buildWhatsAppUrl } from '@/features/inquiry/whatsapp'
import { trackWhatsAppClick } from '@/lib/analytics/gtm'
import type { CartItem, InquiryChannel, InquiryFormValues } from '@/types'

interface QuickInquiryModalProps {
  open: boolean
  channel: InquiryChannel
  items: CartItem[]
  onClose: () => void
  onSuccess: () => void
}

export function QuickInquiryModal({ open, channel, items, onClose, onSuccess }: QuickInquiryModalProps) {
  const t = useTranslations('quickInquiry')
  const locale = useLocale()
  const privacyHref = `${locale === 'hr' ? '' : `/${locale}`}/politika-privatnosti`
  const [shakeKey, setShakeKey] = useState(0)

  const uid = useId()
  const id = useCallback((field: string) => `${uid}-${field}`, [uid])

  const [values, setValues] = useState<InquiryFormValues>(defaultInquiryValues)
  const [errors, setErrors] = useState<InquiryFieldErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleChange = useCallback(
    (field: keyof InquiryFormValues) => (e: ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value
      setValues((prev) => ({ ...prev, [field]: val }))
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    },
    [],
  )

  const resetAndClose = useCallback(() => {
    setValues(defaultInquiryValues)
    setErrors({})
    setSubmitError(null)
    setSubmitted(false)
    onClose()
  }, [onClose])

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const newErrors = validateInquiryForm(values)
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors)
        setShakeKey((k) => k + 1)
        const firstKey = Object.keys(newErrors)[0]
        document.getElementById(id(firstKey))?.focus()
        return
      }

      const payload = {
        channel,
        customer: { fullName: values.fullName.trim(), phone: values.phone.trim() },
        items: items.map((item) => ({
          name: item.name,
          variantLabel: item.variantLabel,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          imageSrc: item.imageSrc,
        })),
      }

      if (channel === 'whatsapp') {
        // Open WhatsApp synchronously (before any await) so browsers don't
        // treat it as an unsolicited popup and block it.
        const message = buildWhatsAppMessage({
          fullName: payload.customer.fullName,
          phone: payload.customer.phone,
          items: payload.items,
        })
        window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer')
        trackWhatsAppClick('cart')

        // Best-effort record for the owner's dashboard — the WhatsApp
        // message itself is the real notification, so failures here are silent.
        fetch('/api/inquiry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }).catch(() => {})

        setSubmitted(true)
        onSuccess()
        return
      }

      setSubmitError(null)
      setIsSubmitting(true)
      try {
        const res = await fetch('/api/inquiry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          throw new Error(data.error || t('errorSend'))
        }
        setSubmitted(true)
        onSuccess()
      } catch (err) {
        setSubmitError(err instanceof Error ? err.message : t('errorSend'))
      } finally {
        setIsSubmitting(false)
      }
    },
    [values, channel, items, id, onSuccess, t],
  )

  return (
    <Dialog.Root open={open} onOpenChange={(isOpen) => { if (!isOpen) resetAndClose() }}>
      <Dialog.Portal>
        <Dialog.Overlay className="overlay z-[55]" />
        <Dialog.Content className="dialog">
          {submitted ? (
            <div role="status" className="space-y-4">
              <Dialog.Title className="t-head text-[length:var(--text-sub)]">{t('successTitle')}</Dialog.Title>
              <Dialog.Description className="t-body">
                {channel === 'whatsapp' ? t('successMessageWhatsapp') : t('successMessageEmail', { phone: values.phone })}
              </Dialog.Description>
              <button type="button" onClick={resetAndClose} className="btn">
                {t('close')}
              </button>
            </div>
          ) : (
            <>
              <Dialog.Title className="t-head text-[length:var(--text-sub)]">
                {channel === 'whatsapp' ? t('titleWhatsapp') : t('titleEmail')}
              </Dialog.Title>
              <Dialog.Description className="mt-3 t-body">
                {channel === 'whatsapp' ? t('introWhatsapp') : t('introEmail')}
              </Dialog.Description>

              <form onSubmit={handleSubmit} noValidate className={`mt-6 space-y-5 ${shakeKey ? 'shake' : ''}`} key={shakeKey}>
                {(['fullName', 'phone'] as const).map((field) => (
                  <div key={field} className="flex flex-col gap-2">
                    <label htmlFor={id(field)} className="t-body font-medium">
                      {field === 'fullName' ? t('fullNameLabel') : t('phoneLabel')}
                    </label>
                    <input
                      id={id(field)}
                      name={field}
                      type={field === 'phone' ? 'tel' : 'text'}
                      autoComplete={field === 'phone' ? 'tel' : 'name'}
                      inputMode={field === 'phone' ? 'tel' : undefined}
                      value={values[field]}
                      onChange={handleChange(field)}
                      required
                      aria-invalid={!!errors[field]}
                      aria-describedby={errors[field] ? `${id(field)}-error` : undefined}
                      className="field-input"
                    />
                    {errors[field] && (
                      <p id={`${id(field)}-error`} className="t-small font-medium text-[color:var(--color-alert)]">
                        {field === 'fullName' ? t('errorName') : t('errorPhone')}
                      </p>
                    )}
                  </div>
                ))}

                {submitError && (
                  <p role="alert" className="t-small font-medium text-[color:var(--color-alert)]">
                    {submitError}
                  </p>
                )}

                <p className="t-small">
                  {t('privacy')}{' '}
                  <a href={privacyHref} className="link" target="_blank" rel="noopener">
                    {t('privacyLink')}
                  </a>
                </p>

                <div className="flex flex-wrap gap-2">
                  <button type="submit" disabled={isSubmitting} aria-disabled={isSubmitting} className="btn btn-honey grow">
                    {isSubmitting ? t('sending') : channel === 'whatsapp' ? t('submitWhatsapp') : t('submitEmail')}
                  </button>
                  <Dialog.Close className="btn btn-ghost">{t('cancel')}</Dialog.Close>
                </div>
              </form>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
