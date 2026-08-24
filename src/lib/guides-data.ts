// ---------------------------------------------------------------------------
// Guide / article content — single source of truth for both the /vodici
// listing page and the /vodici/[slug] detail page, so the two can never
// drift out of sync (each slug renders its own unique content).
// ---------------------------------------------------------------------------

export type GuideBlock =
  | { type: 'lead'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'p'; text: string }
  | { type: 'callout'; title: string; text: string; ctaLabel: string; ctaHref: string }

export interface Guide {
  slug: string
  title: string
  excerpt: string
  category: string
  author: string
  /** Human-readable publish date, e.g. "20. svibnja 2025." */
  date: string
  /** ISO 8601 publish date for structured data. */
  isoDate: string
  readTime: string
  image: string
  body: GuideBlock[]
}

export const GUIDES: Guide[] = [
  {
    slug: 'zasto-je-med-bolji-od-malto-dekstrina-na-maratonu',
    title: 'Zašto je med bolji od malto-dekstrina na maratonu?',
    excerpt:
      'Znanstvena usporedba prirodnog omjera fruktoze i glukoze u medu naspram sintetičkih ugljikovih hidrata.',
    category: 'Sportska Nutricionistika',
    author: 'Dr. sc. Ante Horvat',
    date: '20. svibnja 2025.',
    isoDate: '2025-05-20T08:00:00+02:00',
    readTime: '5 min čitanja',
    image: '/images/events/event-1.jpg',
    body: [
      {
        type: 'lead',
        text: 'Tijekom intenzivnog maratonskog trčanja ili dugotrajnog bicikliranja, odabir izvora ugljikohidrata može značiti razliku između osobnog rekorda i odustajanja zbog mučnine u želucu.',
      },
      { type: 'h2', text: 'Sintetička glukoza vs. Prirodni cvjetni med' },
      {
        type: 'p',
        text: 'Većina industrijskih energetskih gelova oslanja se na sintetički malto-dekstrin. Iako malto-dekstrin ima visoki glikemijski indeks, on brzo povlači vodu u crijeva, uzrokujući nadutost i poznati "runner\'s stomach".',
      },
      {
        type: 'p',
        text: 'Nasuprot tome, prirodni med prirodno sadrži idealan omjer fruktoze i glukoze (otprilike 1:1) uz dodatne minerale, enzime i antioksidanse. Fruktoza i glukoza koriste različite transportne proteine u crijevima (GLUT5 i SGLT1), što omogućuje maksimalnu apsorpciju do 90 grama ugljikohidrata po satu bez opterećenja probave.',
      },
      {
        type: 'p',
        text: 'Za razliku od rafiniranih sirupa, sirovi cvjetni med zadržava tragove peludi, enzima poput invertaze i blage antioksidativne spojeve koji se gube industrijskom preradom — što ga čini funkcionalnijim izvorom energije, ne samo "praznim" ugljikohidratom.',
      },
      {
        type: 'callout',
        title: 'Preporučeni proizvod za utrke:',
        text: 'Honey Bee Power Energy Gel pruža čiste ugljikohidrate iz cvjetnog meda uz liofilizirano voće, bez sukraloze i umjetnih boja.',
        ctaLabel: 'Pogledaj Energetske Gelove →',
        ctaHref: '/proizvodi/energetski-gelovi',
      },
    ],
  },
  {
    slug: 'kako-sprijeciti-grceve-u-misicima-tijekom-ljetnih-voznji',
    title: 'Kako spriječiti grčeve u mišićima tijekom ljetnih vožnji biciklom',
    excerpt:
      'Prava strategija unosa elektrolita i tekućine. Vodič za optimalnu hidrataciju na vrućini.',
    category: 'Hidratacija & Elektroliti',
    author: 'Dr. sc. Ante Horvat',
    date: '12. lipnja 2025.',
    isoDate: '2025-06-12T08:00:00+02:00',
    readTime: '4 min čitanja',
    image: '/images/events/event-8.jpg',
    body: [
      {
        type: 'lead',
        text: 'Ljetne vožnje biciklom po visokim temperaturama znaju završiti istim scenarijem: bolni grčevi u listovima ili bedrima baš kad je forma najbolja. Krivac rijetko je samo umor — najčešće je riječ o gubitku elektrolita.',
      },
      { type: 'h2', text: 'Zašto nastaju grčevi? Gubitak elektrolita, ne samo tekućine' },
      {
        type: 'p',
        text: 'Znojenjem ne gubimo samo vodu, već i natrij, kalij i magnezij — minerale koji upravljaju kontrakcijom mišićnih vlakana. Kada popijemo velike količine obične vode bez nadoknade elektrolita, dodatno razrjeđujemo preostali natrij u krvi, što povećava, a ne smanjuje, rizik od grčeva.',
      },
      {
        type: 'p',
        text: 'Na vrućini iznad 28°C, biciklisti mogu izgubiti i do 1,5 litre znoja po satu vožnje. Bez plana nadoknade, pad koncentracije natrija dolazi puno prije nego što osjetimo žeđ — zato je ključno piti prema planu, a ne čekati signale tijela.',
      },
      { type: 'h2', text: 'Prirodna hidratacija: med, elektroliti i morska sol' },
      {
        type: 'p',
        text: 'Izotonični napitak s prirodnim medom i morskom solju nadoknađuje elektrolite u fiziološkom omjeru, dok med istovremeno osigurava lagano probavljive ugljikohidrate za mišiće. Kombinacija natrija i glukoze također ubrzava apsorpciju tekućine u crijevima (tzv. natrij-glukoza kotransport), što znači bržu hidrataciju nego čista voda.',
      },
      {
        type: 'p',
        text: 'Praktično pravilo za duže vožnje: jedna boca izotoničnog napitka (500-750 ml) po satu umjerene do intenzivne vožnje na vrućini, uz redovite gutljaje svakih 15-ak minuta umjesto rijetkog, obilnog pijenja.',
      },
      {
        type: 'callout',
        title: 'Preporučeni proizvod za vrućinu:',
        text: 'Honey Bee Power Izotonični Napitak kombinira cvjetni med i morsku sol za brzu nadoknadu elektrolita bez umjetnih zaslađivača.',
        ctaLabel: 'Pogledaj Izotonične Napitke →',
        ctaHref: '/proizvodi/izotonicki-napitci',
      },
    ],
  },
  {
    slug: 'uloga-bjelancevina-i-meda-u-brzem-oporavku-nakon-treninga',
    title: 'Uloga bjelančevina i meda u bržem oporavku mišićnih vlakana',
    excerpt:
      'Kombinacija proteina i brzih prirodnih ugljikohidrata obnavlja zalihe glikogena u rekordnom roku.',
    category: 'Oporavak & Regeneracija',
    author: 'Dr. sc. Ante Horvat',
    date: '04. srpnja 2025.',
    isoDate: '2025-07-04T08:00:00+02:00',
    readTime: '6 min čitanja',
    image: '/images/events/event-11.jpg',
    body: [
      {
        type: 'lead',
        text: 'Prvih 30 do 60 minuta nakon intenzivnog treninga poznato je kao "prozor oporavka" — razdoblje kada su mišići najosjetljiviji na unos hranjivih tvari potrebnih za popravak vlakana i punjenje energetskih zaliha.',
      },
      { type: 'h2', text: 'Zašto su ugljikohidrati jednako važni kao i proteini' },
      {
        type: 'p',
        text: 'Fokus na proteine je opravdan — aminokiseline su građevni materijal za oštećena mišićna vlakna. No bez dovoljno ugljikohidrata, tijelo dio tih proteina troši za energiju umjesto za obnovu mišića. Zalihe glikogena, iscrpljene tijekom treninga, moraju se napuniti da bi sljedeći trening bio jednako kvalitetan.',
      },
      {
        type: 'p',
        text: 'Istraživanja sportske prehrane pokazuju da kombinacija proteina i brzih ugljikohidrata odmah nakon aktivnosti ubrzava resintezu glikogena i potiče inzulinski odgovor koji pomaže transportirati aminokiseline u mišićne stanice.',
      },
      { type: 'h2', text: 'Zašto baš med kao izvor ugljikohidrata za oporavak' },
      {
        type: 'p',
        text: 'Zahvaljujući prirodnoj kombinaciji fruktoze i glukoze, med se probavlja brzo i blago, bez naglog opterećenja probavnog sustava — idealno u trenutku kad je tijelo već umorno od treninga. Uz omiljeni izvor proteina (shake, tvrdi sir, jogurt), izotonični napitak s medom čini praktičnu kombinaciju za punjenje glikogena i nadoknadu elektrolita izgubljenih znojenjem.',
      },
      {
        type: 'p',
        text: 'Praktična preporuka: odmah nakon treninga popijte izotonični napitak s medom uz obrok bogat proteinima u sljedećih 60 minuta — jednostavna navika koja može ubrzati oporavak i smanjiti bolnost mišića sljedećeg dana.',
      },
      {
        type: 'callout',
        title: 'Preporučeno za fazu oporavka:',
        text: 'Honey Bee Power Izotonični Napitak uz obrok bogat proteinima nadoknađuje glikogen i elektrolite izgubljene tijekom treninga.',
        ctaLabel: 'Pogledaj Izotonične Napitke →',
        ctaHref: '/proizvodi/izotonicki-napitci',
      },
    ],
  },
]

export function getGuideBySlug(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug)
}
