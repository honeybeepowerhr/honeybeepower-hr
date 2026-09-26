import { NextRequest, NextResponse } from 'next/server'
import { generateCjenikXml } from '@/lib/cjenik-data'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const dateParam = searchParams.get('date') ?? undefined
  const isDownload = searchParams.get('download') === '1'

  const xmlContent = generateCjenikXml(dateParam)
  const filename = dateParam ? `cjenik-planetbio-${dateParam}.xml` : `cjenik-planetbio-aktualan.xml`

  const headers = new Headers({
    'Content-Type': 'application/xml; charset=utf-8',
    'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
  })

  if (isDownload) {
    headers.set('Content-Disposition', `attachment; filename="${filename}"`)
  } else {
    headers.set('Content-Disposition', `inline; filename="${filename}"`)
  }

  return new NextResponse(xmlContent, {
    status: 200,
    headers,
  })
}
