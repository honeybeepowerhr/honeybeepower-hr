import React from 'react'

type IconProps = React.SVGProps<SVGSVGElement>

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12.04 2c-5.52 0-10 4.48-10 10 0 1.77.46 3.44 1.26 4.88L2 22l5.25-1.28A9.96 9.96 0 0 0 12.04 22c5.52 0 10-4.48 10-10s-4.48-10-10-10Zm0 18.2c-1.6 0-3.13-.44-4.44-1.24l-.32-.19-3.24.79.83-3.19-.21-.33a8.16 8.16 0 0 1-1.29-4.39c0-4.55 3.7-8.25 8.25-8.25 4.55 0 8.25 3.7 8.25 8.25s-3.7 8.25-8.25 8.25Zm4.52-6.13c-.24-.12-1.44-.71-1.66-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.78.95-.14.16-.29.18-.53.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.44-1.34-1.68-.14-.24-.02-.37.11-.49.11-.11.24-.29.36-.43.12-.14.16-.24.24-.4.08-.16.04-.31-.02-.43-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.42-.55-.42h-.47c-.16 0-.43.06-.65.31s-.86.84-.86 2.05.88 2.38 1 2.54c.12.16 1.73 2.64 4.19 3.7.59.25 1.05.4 1.41.52.59.19 1.13.16 1.55.1.47-.07 1.44-.59 1.65-1.16.2-.57.2-1.05.14-1.16-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  )
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M14.5 8.5H16.5V5.3C16.16 5.25 15 5.15 13.65 5.15C10.81 5.15 8.87 6.9 8.87 10.08V12.7H5.75V16.28H8.87V22.85H12.57V16.28H15.66L16.14 12.7H12.57V10.45C12.57 9.4 12.86 8.5 14.5 8.5Z" />
    </svg>
  )
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function TikTokIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M16.5 2h-3v13.6a2.9 2.9 0 1 1-2.05-2.77V9.66a6.05 6.05 0 1 0 5.05 5.97V8.9a7.6 7.6 0 0 0 4.5 1.46V7.3a4.6 4.6 0 0 1-4.5-4.5V2Z" />
    </svg>
  )
}
