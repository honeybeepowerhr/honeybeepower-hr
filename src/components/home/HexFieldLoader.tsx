'use client'

import dynamic from 'next/dynamic'

export const HexFieldLoader = dynamic(() => import('./HexField'), { ssr: false })
