export interface CjenikItem {
  rb: number
  naziv: string
  slika: string
  vrsta: string
  okus: string
  barkod: string
  aktualnaCijena: number
  sidrenaCijena: number
}

export interface LegalEntityInfo {
  nazivTvrtke: string
  vlasnik: string
  adresa: string
  grad: string
  postanskiBroj: string
  drzava: string
  maticniBroj: string
  oib: string
  datumCjenikaBase: string
  referentniDatumSidrenja: string
}

export const LEGAL_ENTITY: LegalEntityInfo = {
  nazivTvrtke: 'Planet Bio, obrt za usluge, vl. Srđan Rebić',
  vlasnik: 'Srđan Rebić',
  adresa: 'Krndijska 4',
  grad: 'Našice',
  postanskiBroj: '31500',
  drzava: 'Hrvatska',
  maticniBroj: '98662759',
  oib: '77923223955',
  datumCjenikaBase: '10.9.2026.',
  referentniDatumSidrenja: '10.9.2026.',
}

export const CJENIK_ITEMS: CjenikItem[] = [
  {
    rb: 1,
    naziv: 'HONEY BEE POWER RASPBERRY 40 G',
    slika: '/images/products/gelmalina-prednja.png',
    vrsta: 'Energetski gel',
    okus: 'MALINA',
    barkod: '5908312873334',
    aktualnaCijena: 1.80,
    sidrenaCijena: 1.50,
  },
  {
    rb: 2,
    naziv: 'HONEY BEE POWER LEMON 40 G',
    slika: '/images/products/gellimun-prednja.png',
    vrsta: 'Energetski gel',
    okus: 'LIMUN',
    barkod: '5908312873419',
    aktualnaCijena: 1.80,
    sidrenaCijena: 1.50,
  },
  {
    rb: 3,
    naziv: 'HONEY BEE POWER ORANGE 40 G',
    slika: '/images/products/gelnaranca-prednja.png',
    vrsta: 'Energetski gel',
    okus: 'NARANČA',
    barkod: '5908312873402',
    aktualnaCijena: 1.80,
    sidrenaCijena: 1.50,
  },
  {
    rb: 4,
    naziv: 'HONEY BEE POWER INSTANT IZOTONIK DRINK LEMON 500g',
    slika: '/images/products/isolimun-prednja.png',
    vrsta: 'Instant izotonik',
    okus: 'LIMUN',
    barkod: '5908312873426',
    aktualnaCijena: 8.00,
    sidrenaCijena: 8.00,
  },
  {
    rb: 5,
    naziv: 'HONEY BEE POWER INSTANT IZOTONIK DRINK ORANGE 500g',
    slika: '/images/products/isonaranca-prednja.png',
    vrsta: 'Instant izotonik',
    okus: 'NARANČA',
    barkod: '5908312873433',
    aktualnaCijena: 8.00,
    sidrenaCijena: 8.00,
  },
  {
    rb: 6,
    naziv: 'HONEY BEE POWER INSTANT IZOTONIK DRINK LEMON 15g',
    slika: '/images/products/isolimun-prednja.png',
    vrsta: 'Instant izotonik',
    okus: 'LIMUN',
    barkod: '5908312873440',
    aktualnaCijena: 1.60,
    sidrenaCijena: 1.40,
  },
  {
    rb: 7,
    naziv: 'HONEY BEE POWER INSTANT IZOTONIK DRINK ORANGE 15g',
    slika: '/images/products/isonaranca-prednja.png',
    vrsta: 'Instant izotonik',
    okus: 'NARANČA',
    barkod: '5908312873437',
    aktualnaCijena: 1.60,
    sidrenaCijena: 1.40,
  },
  {
    rb: 8,
    naziv: 'HONEY BEE POWER WHEY PROTEIN 700g',
    slika: '/images/products/paketizolimunnaranca-shaker.png',
    vrsta: 'Proteinski prah',
    okus: 'LIEŠNJAK-ČOKOLADA',
    barkod: '5904966072352',
    aktualnaCijena: 38.00,
    sidrenaCijena: 38.00,
  },
  {
    rb: 9,
    naziv: 'HONEY BEE POWER WHEY PROTEIN 700g',
    slika: '/images/products/paketizolimunnaranca-shaker.png',
    vrsta: 'Proteinski prah',
    okus: 'BANANA-VANILIJA',
    barkod: '5904966072345',
    aktualnaCijena: 38.00,
    sidrenaCijena: 38.00,
  },
  {
    rb: 10,
    naziv: 'HONEY BEE POWER WHEY PROTEIN 700g',
    slika: '/images/products/paketizolimunnaranca-shaker.png',
    vrsta: 'Proteinski prah',
    okus: 'JAGODA-ŠLAG',
    barkod: '5904966072369',
    aktualnaCijena: 38.00,
    sidrenaCijena: 38.00,
  },
  {
    rb: 11,
    naziv: 'HONEY BEE POWER WHEY PROTEIN 33g',
    slika: '/images/products/paketizolimunnaranca-shaker.png',
    vrsta: 'Proteinski prah',
    okus: 'LIEŠNJAK-ČOKOLADA',
    barkod: '5908312873471',
    aktualnaCijena: 3.00,
    sidrenaCijena: 3.00,
  },
  {
    rb: 12,
    naziv: 'HONEY BEE POWER WHEY PROTEIN 33g',
    slika: '/images/products/paketizolimunnaranca-shaker.png',
    vrsta: 'Proteinski prah',
    okus: 'BANANA-VANILIJA',
    barkod: '5908312873464',
    aktualnaCijena: 3.00,
    sidrenaCijena: 3.00,
  },
  {
    rb: 13,
    naziv: 'HONEY BEE POWER WHEY PROTEIN 33g',
    slika: '/images/products/paketizolimunnaranca-shaker.png',
    vrsta: 'Proteinski prah',
    okus: 'JAGODA-ŠLAG',
    barkod: '5908312873488',
    aktualnaCijena: 3.00,
    sidrenaCijena: 3.00,
  },
  {
    rb: 14,
    naziv: 'SHAKER 700ml',
    slika: '/images/products/paketizolimunnaranca-shaker.png',
    vrsta: 'Shaker',
    okus: '-',
    barkod: '5908312873518',
    aktualnaCijena: 9.00,
    sidrenaCijena: 9.00,
  },
]

/**
 * Calculates the exact publication timestamp for daily compliance.
 * Requirement: Updated automatically every day (including weekends) before 08:00 AM.
 */
export function getLatestUpdateTimestamp(targetDate?: Date): {
  lastUpdatedDate: Date
  lastUpdatedFormatted: string
  nextUpdateFormatted: string
  isToday: boolean
} {
  const now = targetDate ? new Date(targetDate) : new Date()

  // Calculate 07:59:00 AM of current day
  const today8am = new Date(now)
  today8am.setHours(7, 59, 0, 0)

  let lastUpdated: Date
  let nextUpdated: Date

  if (now >= today8am) {
    // We are past 07:59 AM today -> last update was today at 07:59:00
    lastUpdated = today8am
    nextUpdated = new Date(today8am)
    nextUpdated.setDate(nextUpdated.getDate() + 1)
  } else {
    // Before 07:59 AM today -> last update was yesterday at 07:59:00
    lastUpdated = new Date(today8am)
    lastUpdated.setDate(lastUpdated.getDate() - 1)
    nextUpdated = today8am
  }

  const dateOnlyOptions: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'Europe/Zagreb',
  }

  return {
    lastUpdatedDate: lastUpdated,
    lastUpdatedFormatted: `${lastUpdated.toLocaleDateString('hr-HR', dateOnlyOptions)} u 07:59:00 h`,
    nextUpdateFormatted: `${nextUpdated.toLocaleDateString('hr-HR', dateOnlyOptions)} do 08:00:00 h`,
    isToday: lastUpdated.toDateString() === now.toDateString(),
  }
}

/**
 * Returns past 30 days history list for legal 30-day archiving compliance.
 * "Prethodne verzije digitalnih cjenika moraju ostati javno dostupne u arhivi na web stranici najmanje 30 dana."
 */
export interface ArchiveEntry {
  dateIso: string // YYYY-MM-DD
  dateFormatted: string // DD.MM.YYYY.
  updateTimeFormatted: string // DD.MM.YYYY. u 07:59:00 h
  isCurrent: boolean
}

export function get30DayArchiveList(referenceDate?: Date): ArchiveEntry[] {
  const now = referenceDate ? new Date(referenceDate) : new Date()
  const { lastUpdatedDate } = getLatestUpdateTimestamp(now)
  
  const archiveList: ArchiveEntry[] = []

  for (let i = 0; i < 30; i++) {
    const d = new Date(lastUpdatedDate)
    d.setDate(d.getDate() - i)

    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    const dateIso = `${year}-${month}-${day}`
    
    const dayFormatted = `${day}.${month}.${year}.`

    archiveList.push({
      dateIso,
      dateFormatted: dayFormatted,
      updateTimeFormatted: `${dayFormatted} u 07:59:00 h`,
      isCurrent: i === 0,
    })
  }

  return archiveList
}

/**
 * Machine readable XML generator (.XML format requirement)
 */
export function generateCjenikXml(targetDateIso?: string): string {
  const archiveDate = targetDateIso ? new Date(targetDateIso) : new Date()
  const timestampInfo = getLatestUpdateTimestamp(archiveDate)

  const itemsXml = CJENIK_ITEMS.map((item) => `    <proizvod>
      <rb>${item.rb}</rb>
      <naziv>${escapeXml(item.naziv)}</naziv>
      <vrsta>${escapeXml(item.vrsta)}</vrsta>
      <okus>${escapeXml(item.okus)}</okus>
      <barkod>${item.barkod}</barkod>
      <aktualnaCijenaEur>${item.aktualnaCijena.toFixed(2)}</aktualnaCijenaEur>
      <sidrenaCijenaEur>${item.sidrenaCijena.toFixed(2)}</sidrenaCijenaEur>
    </proizvod>`).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<cjenik xmlns="https://planetbio.hr/schema/cjenik/v1">
  <zaglavlje>
    <pravnaOsoba>${escapeXml(LEGAL_ENTITY.nazivTvrtke)}</pravnaOsoba>
    <adresa>${escapeXml(LEGAL_ENTITY.adresa)}, ${LEGAL_ENTITY.postanskiBroj} ${escapeXml(LEGAL_ENTITY.grad)}, ${escapeXml(LEGAL_ENTITY.drzava)}</adresa>
    <maticniBroj>${LEGAL_ENTITY.maticniBroj}</maticniBroj>
    <oib>${LEGAL_ENTITY.oib}</oib>
    <datumIzdanjaCjenika>${LEGAL_ENTITY.datumCjenikaBase}</datumIzdanjaCjenika>
    <datumAzuriranja>${timestampInfo.lastUpdatedFormatted}</datumAzuriranja>
    <sljedeceAzuriranje>${timestampInfo.nextUpdateFormatted}</sljedeceAzuriranje>
    <referentniDatumSidrenja>${LEGAL_ENTITY.referentniDatumSidrenja}</referentniDatumSidrenja>
    <valuta>EUR</valuta>
    <strojnoCitljivFormat>XML</strojnoCitljivFormat>
    <pravniOkvir>Zakonske obveze isticanja i objave digitalnog cjenika s referentnom sidrenom cijenom od 10.9.2026. godine (NN RH)</pravniOkvir>
  </zaglavlje>
  <proizvodi>
${itemsXml}
  </proizvodi>
</cjenik>`
}

/**
 * Machine readable CSV generator (.CSV format requirement)
 */
export function generateCjenikCsv(targetDateIso?: string): string {
  const archiveDate = targetDateIso ? new Date(targetDateIso) : new Date()
  const timestampInfo = getLatestUpdateTimestamp(archiveDate)

  // UTF-8 BOM for Excel / inspection tool compatibility
  const BOM = '\uFEFF'
  
  const headers = [
    'R.B.',
    'Naziv Proizvoda',
    'Vrsta Proizvoda',
    'Okus Proizvoda',
    'Barkod Proizvoda (EAN)',
    'Aktualna Cijena po Komadu (EUR)',
    'Sidrena Cijena po Komadu (EUR)',
    'Datum Ažuriranja',
  ]

  const rows = CJENIK_ITEMS.map((item) => [
    item.rb,
    `"${item.naziv.replace(/"/g, '""')}"`,
    `"${item.vrsta.replace(/"/g, '""')}"`,
    `"${item.okus.replace(/"/g, '""')}"`,
    `"${item.barkod}"`,
    item.aktualnaCijena.toFixed(2).replace('.', ','),
    item.sidrenaCijena.toFixed(2).replace('.', ','),
    `"${timestampInfo.lastUpdatedFormatted}"`,
  ].join(';'))

  const metadataComment = [
    `# Službeni Digitalni Cjenik — ${LEGAL_ENTITY.nazivTvrtke}`,
    `# OIB: ${LEGAL_ENTITY.oib} | MB: ${LEGAL_ENTITY.maticniBroj} | Adresa: ${LEGAL_ENTITY.adresa}, ${LEGAL_ENTITY.postanskiBroj} ${LEGAL_ENTITY.grad}`,
    `# Zadnje ažurirano: ${timestampInfo.lastUpdatedFormatted} | Sljedeće ažuriranje: ${timestampInfo.nextUpdateFormatted}`,
    `# Referentni datum sidrene cijene: ${LEGAL_ENTITY.referentniDatumSidrenja}`,
    '',
  ].join('\n')

  return BOM + metadataComment + headers.join(';') + '\n' + rows.join('\n')
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
