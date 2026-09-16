'use client'

import { useState, useId, useCallback, type ChangeEvent, type FormEvent } from 'react'
import { useTranslations } from 'next-intl'
import { Mail } from 'lucide-react'
import { WhatsAppIcon } from '@/components/ui/SocialIcons'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
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
          throw new Error(data.error || 'Slanje upita nije uspjelo. Pokušajte ponovno.')
        }
        setSubmitted(true)
        onSuccess()
      } catch (err) {
        setSubmitError(err instanceof Error ? err.message : 'Slanje upita nije uspjelo. Pokušajte ponovno.')
      } finally {
        setIsSubmitting(false)
      }
    },
    [values, channel, items, id, onSuccess],
  )

  const Icon = channel === 'whatsapp' ? WhatsAppIcon : Mail

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) resetAndClose() }}>
      <DialogContent className="max-w-md bg-white border-amber-200">
        {submitted ? (
          <div role="status" className="py-4 text-center space-y-2">
            <p className="text-2xl">✅</p>
            <h2 className="text-lg font-bold text-charcoal">{t('successTitle')}</h2>
            <p className="text-sm text-gray-600">
              {channel === 'whatsapp' ? t('successMessageWhatsapp') : t('successMessageEmail', { phone: values.phone })}
            </p>
            <Button
              type="button"
              onClick={resetAndClose}
              className="mt-2 bg-amber-500 hover:bg-amber-600 text-white font-bold"
            >
              {t('close')}
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 font-heading text-xl text-charcoal">
                <Icon className="w-5 h-5 text-amber-500" aria-hidden="true" />
                {channel === 'whatsapp' ? t('titleWhatsapp') : t('titleEmail')}
              </DialogTitle>
              <DialogDescription>
                {channel === 'whatsapp' ? t('introWhatsapp') : t('introEmail')}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor={id('fullName')} className="text-sm font-medium text-charcoal">
                  {t('fullNameLabel')} <span aria-hidden="true" className="text-red-500">*</span>
                </Label>
                <Input
                  id={id('fullName')}
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  placeholder="Ana Horvat"
                  value={values.fullName}
                  onChange={handleChange('fullName')}
                  aria-required="true"
                  aria-invalid={!!errors.fullName}
                  aria-describedby={errors.fullName ? `${id('fullName')}-error` : undefined}
                  className={cn(errors.fullName && 'border-red-400 focus-visible:ring-red-400')}
                />
                {errors.fullName && (
                  <p id={`${id('fullName')}-error`} role="alert" className="text-xs text-red-600">
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor={id('phone')} className="text-sm font-medium text-charcoal">
                  {t('phoneLabel')} <span aria-hidden="true" className="text-red-500">*</span>
                </Label>
                <Input
                  id={id('phone')}
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+385 91 234 5678"
                  value={values.phone}
                  onChange={handleChange('phone')}
                  aria-required="true"
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? `${id('phone')}-error` : undefined}
                  className={cn(errors.phone && 'border-red-400 focus-visible:ring-red-400')}
                />
                {errors.phone && (
                  <p id={`${id('phone')}-error`} role="alert" className="text-xs text-red-600">
                    {errors.phone}
                  </p>
                )}
              </div>

              {submitError && (
                <p role="alert" className="text-sm text-red-600 text-center">
                  {submitError}
                </p>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                aria-disabled={isSubmitting}
                size="lg"
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold h-12 rounded-xl"
              >
                {isSubmitting
                  ? t('sending')
                  : channel === 'whatsapp'
                  ? t('submitWhatsapp')
                  : t('submitEmail')}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
