import { NextResponse } from 'next/server'

/**
 * POST /api/reviews
 *
 * Isključeno dok ne postoji sustav provjerenih recenzija (samo stvarni kupci,
 * opisan postupak provjere, prema Direktivi (EU) 2019/2161).
 * Validacija ostaje u src/features/reviews/schema.ts za kasnije.
 */
export async function POST(): Promise<NextResponse> {
  return NextResponse.json(
    { error: 'Recenzije trenutačno nisu dostupne.' },
    { status: 410 },
  )
}
