import { NextRequest, NextResponse } from 'next/server'
import { generateCjenikCsv } from '@/lib/cjenik-data'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const dateParam = searchParams.get('date') ?? undefined
  const isDownload = searchParams.get('download') === '1'

  const csvContent = generateCjenikCsv(dateParam)
  const filename = dateParam ? `cjenik-planetbio-${dateParam}.csv` : `cjenik-planetbio-aktualan.csv`

  const headers = new Headers({
    'Content-Type': 'text/csv; charset=utf-8',
    'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
  })

  if (isDownload) {
    headers.set('Content-Disposition', `attachment; filename="${filename}"`)
  } else {
    headers.set('Content-Disposition', `inline; filename="${filename}"`)
  }

  return new NextResponse(csvContent, {
    status: 200,
    headers,
  })
}
