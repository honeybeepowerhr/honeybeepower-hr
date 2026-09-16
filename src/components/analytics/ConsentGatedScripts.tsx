'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import { shouldLoadAnalytics } from '@/features/analytics/logic'
import { CONSENT_KEY } from './ConsentBanner'

/**
 * Loads GTM / Meta Pixel / Microsoft Clarity only when BOTH the relevant
 * env var is configured AND the visitor has granted cookie consent.
 * Replaces the old dead `<!-- GTM will be loaded here -->` placeholder.
 */
export function ConsentGatedScripts() {
  const [consentGranted, setConsentGranted] = useState(false)

  useEffect(() => {
    const check = () => setConsentGranted(localStorage.getItem(CONSENT_KEY) === 'granted')
    check()
    window.addEventListener('consent_updated', check)
    return () => window.removeEventListener('consent_updated', check)
  }, [])

  if (!shouldLoadAnalytics(consentGranted)) return null

  const gtmId = process.env.NEXT_PUBLIC_GTM_ID
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID

  return (
    <>
      {gtmId && (
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
        </Script>
      )}
      {metaPixelId && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixelId}');fbq('track','PageView');`}
        </Script>
      )}
      {clarityId && (
        <Script id="ms-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script","${clarityId}");`}
        </Script>
      )}
    </>
  )
}
