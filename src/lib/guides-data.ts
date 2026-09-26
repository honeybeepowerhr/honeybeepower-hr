import type { Locale } from '@/types'

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
  date: string
  isoDate: string
  readTime: string
  image: string
  body: GuideBlock[]
}

const GUIDES_MULTILINGUAL: Record<string, Record<Locale, Omit<Guide, 'slug' | 'image' | 'isoDate'>>> = {
  'zasto-je-med-bolji-od-malto-dekstrina-na-maratonu': {
    hr: {
      title: 'Zašto je med bolji od malto-dekstrina na maratonu?',
      excerpt: 'Znanstvena usporedba prirodnog omjera fruktoze i glukoze u medu naspram sintetičkih ugljikovih hidrata.',
      category: 'Sportska Nutricionistika',
      author: 'Dr. sc. Ante Horvat',
      date: '20. svibnja 2025.',
      readTime: '5 min čitanja',
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
    en: {
      title: 'Why Honey is Better Than Maltodextrin in Marathons?',
      excerpt: 'Scientific comparison of natural fructose-glucose ratio in honey vs. synthetic carbohydrates.',
      category: 'Sports Nutrition',
      author: 'Dr. Ante Horvat',
      date: 'May 20, 2025',
      readTime: '5 min read',
      body: [
        {
          type: 'lead',
          text: 'During intense marathon running or long cycling sessions, choosing your carbohydrate source can mean the difference between a personal record and quitting due to stomach nausea.',
        },
        { type: 'h2', text: 'Synthetic Glucose vs. Natural Flower Honey' },
        {
          type: 'p',
          text: 'Most industrial energy gels rely on synthetic maltodextrin. Although maltodextrin has a high glycemic index, it draws water quickly into the gut, causing bloating and the dreaded "runner\'s stomach".',
        },
        {
          type: 'p',
          text: 'In contrast, natural honey naturally contains an ideal ratio of fructose and glucose (approx. 1:1) along with minerals, enzymes, and antioxidants. Fructose and glucose utilize dual transport pathways (GLUT5 and SGLT1), allowing maximum absorption of up to 90g of carbs per hour without GI distress.',
        },
        {
          type: 'p',
          text: 'Unlike refined syrups, raw floral honey preserves trace pollen, enzymes like invertase, and antioxidant compounds lost in industrial processing — making it a truly functional energy source, not just empty calories.',
        },
        {
          type: 'callout',
          title: 'Recommended product for races:',
          text: 'Honey Bee Power Energy Gel delivers clean carbs from real flower honey and freeze-dried fruit, free from sucralose and artificial dyes.',
          ctaLabel: 'Explore Energy Gels →',
          ctaHref: '/proizvodi/energetski-gelovi',
        },
      ],
    },
    de: {
      title: 'Warum Honig beim Marathon besser ist als Maltodextrin?',
      excerpt: 'Wissenschaftlicher Vergleich des natürlichen Fruktose-Glukose-Verhältnisses in Honig gegenüber synthetischen Kohlenhydraten.',
      category: 'Sporternährung',
      author: 'Dr. Ante Horvat',
      date: '20. Mai 2025',
      readTime: '5 Min. Lesezeit',
      body: [
        {
          type: 'lead',
          text: 'Bei intensiven Marathonläufen oder langen Radtouren kann die Wahl der Kohlenhydratquelle den Unterschied zwischen einer persönlichen Bestleistung und dem Abbruch wegen Übelkeit ausmachen.',
        },
        { type: 'h2', text: 'Synthetische Glukose vs. Natürlicher Blütenhonig' },
        {
          type: 'p',
          text: 'Die meisten industriellen Energiegels basieren auf synthetischem Maltodextrin. Obwohl Maltodextrin einen hohen glykämischen Index hat, zieht es schnell Wasser in den Darm und verursacht Blähungen und Magenbeschwerden.',
        },
        {
          type: 'p',
          text: 'Im Gegensatz dazu enthält natürlicher Honig ein ideales Verhältnis von Fruktose und Glukose (ca. 1:1) zusammen mit Mineralien, Enzymen und Antioxidantien. Fruktose und Glukose nutzen unterschiedliche Transportproteine im Darm (GLUT5 und SGLT1), was eine maximale Aufnahme von bis zu 90 g Kohlenhydraten pro Stunde ohne Magenbelastung ermöglicht.',
        },
        {
          type: 'p',
          text: 'Im Gegensatz zu raffinierten Sirupen bewahrt roher Blütenhonig Spuren von Pollen, Enzymen wie Invertase und Antioxidantien — was ihn zu einer funktionalen Energiequelle macht.',
        },
        {
          type: 'callout',
          title: 'Empfohlenes Produkt für Wettkämpfe:',
          text: 'Honey Bee Power Energiegel liefert reine Kohlenhydrate aus Blütenhonig und gefriergetrockneten Früchten — frei von Sucralose und künstlichen Farbstoffen.',
          ctaLabel: 'Energiegels entdecken →',
          ctaHref: '/proizvodi/energetski-gelovi',
        },
      ],
    },
    sl: {
      title: 'Zakaj je med na maratonu boljši od maltodekstrina?',
      excerpt: 'Znanstvena primerjava naravnega razmerja fruktoze in glukoze v medu ter sintetičnih ogljikovih hidratov.',
      category: 'Športna nutricionistika',
      author: 'Dr. Ante Horvat',
      date: '20. maj 2025',
      readTime: '5 min branja',
      body: [
        {
          type: 'lead',
          text: 'Med intenzivnim tekom na maratonu ali dolgotrajnim kolesarjenjem lahko izbira vira ogljikovih hidratov pomeni razliko med osebnim rekordom in odstopom zaradi slabosti v želodcu.',
        },
        { type: 'h2', text: 'Sintetična glukoza proti naravnemu cvetličnemu medu' },
        {
          type: 'p',
          text: 'Večina industrijskih energijskih gelov se zanaša na sintetični maltodekstrin. Čeprav ima maltodekstrin visok glikemični indeks, hitro potegne vodo v črevesje ter povzroča napihnjenost in želodčne težave.',
        },
        {
          type: 'p',
          text: 'Nasprotno pa naravni med vsebuje idealno razmerje fruktoze in glukoze (približno 1:1) ter dodatne minerale, encime in antioksidante. Fruktoza in glukoza uporabljata različna transportna beljakovinska mesta v črevesju (GLUT5 in SGLT1), kar omogoča maksimalno absorpcijo do 90 gramov ogljikovih hidratov na uro brez obremenitve prebave.',
        },
        {
          type: 'p',
          text: 'Za razliko od rafiniranih sirupov surovi cvetlični med ohranja sledi cvetnega prahu, encimov in antioksidativnih spojin.',
        },
        {
          type: 'callout',
          title: 'Priporočeni izdelek za tekme:',
          text: 'Honey Bee Power Energijski Gel zagotavlja čiste ogljikove hidrate iz cvetličnega medu in liofiliziranega sadja, brez sukraloze in umetnih barvil.',
          ctaLabel: 'Oglejte si energijske gele →',
          ctaHref: '/proizvodi/energetski-gelovi',
        },
      ],
    },
    pl: {
      title: 'Dlaczego miód jest lepszy niż maltodekstryna na maratonie?',
      excerpt: 'Naukowe porównanie naturalnego stosunku fruktozy i glukozy w miodzie ze sztucznymi węglowodanami.',
      category: 'Dietetyka Sportowa',
      author: 'Dr. Ante Horvat',
      date: '20 maja 2025',
      readTime: '5 min czytania',
      body: [
        {
          type: 'lead',
          text: 'Podczas intensywnego biegu maratońskiego lub długiego treningu kolarskiego wybór źródła węglowodanów może decydować o rekordzie życiowym lub rezygnacji z powodu mdłości.',
        },
        { type: 'h2', text: 'Syntetyczna glukoza vs naturalny miód kwiatowy' },
        {
          type: 'p',
          text: 'Większość przemysłowych żeli energetycznych opiera się na syntetycznej maltodekstrynie. Choć maltodekstryna ma wysoki indeks glikemiczny, szybko ściąga wodę do jelit, powodując wzdęcia i dolegliwości żołądkowe.',
        },
        {
          type: 'p',
          text: 'W przeciwieństwie do niej naturalny miód zawiera idealne proporcje fruktozy i glukozy (ok. 1:1) wraz z minerałami, enzymami i antyoksydantami. Fruktoza i glukoza wykorzystują dwa osobne szlaki transportowe w jelitach (GLUT5 i SGLT1), co umożliwia wchłanianie do 90g węglowodanów na godzinę bez obciążania żołądka.',
        },
        {
          type: 'p',
          text: 'W przeciwieństwie do rafinowanych syropów surowy miód kwiatowy zachowuje śladowe ilości pyłku, enzymów i antyoksydantów — czyniąc go funkcjonalnym źródłem energii.',
        },
        {
          type: 'callout',
          title: 'Rekomendowany produkt na zawody:',
          text: 'Honey Bee Power Żel Energetyczny dostarcza czystych węglowodanów z naturalnego miodu i liofilizowanych owoców, bez sukralozy i sztucznych barwników.',
          ctaLabel: 'Zobacz Żele Energetyczne →',
          ctaHref: '/proizvodi/energetski-gelovi',
        },
      ],
    },
  },

  'kako-sprijeciti-grceve-u-misicima-tijekom-ljetnih-voznji': {
    hr: {
      title: 'Kako spriječiti grčeve u mišićima tijekom ljetnih vožnji biciklom',
      excerpt: 'Prava strategija unosa elektrolita i tekućine. Vodič za optimalnu hidrataciju na vrućini.',
      category: 'Hidratacija & Elektroliti',
      author: 'Dr. sc. Ante Horvat',
      date: '12. lipnja 2025.',
      readTime: '4 min čitanja',
      body: [
        {
          type: 'lead',
          text: 'Ljetne vožnje biciklom po visokim temperaturama znaju završiti istim scenarijem: bolni grčevi u listovima ili bedrima baš kad je forma najbolja. Krivac rijetko je samo umor — najčešće je riječ o gubitku elektrolita.',
        },
        { type: 'h2', text: 'Zašto nastaju grčevi? Gubitak elektrolita, ne samo tekućine' },
        {
          type: 'p',
          text: 'Znojenjem ne gubimo samo vodu, već i natrij, kalij i magnezij — minerale koji upravljaju kontrakcijom mišićnih vlakana. Kada popijemo velike količine obične vode bez nadoknade elektrolita, dodatno razrjeđujemo preostali natrij u krvi, što povećava rizik od grčeva.',
        },
        {
          type: 'p',
          text: 'Na vrućini iznad 28°C, biciklisti mogu izgubiti i do 1,5 litre znoja po satu vožnje. Bez plana nadoknade, pad koncentracije natrija dolazi puno prije nego što osjetimo žeđ.',
        },
        { type: 'h2', text: 'Prirodna hidratacija: med, elektroliti i morska sol' },
        {
          type: 'p',
          text: 'Izotonični napitak s prirodnim medom i morskom solju nadoknađuje elektrolite u fiziološkom omjeru, dok med istovremeno osigurava lagano probavljive ugljikohidrate za mišiće. Kombinacija natrija i glukoze ubrzava apsorpciju tekućine u crijevima.',
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
    en: {
      title: 'How to Prevent Muscle Cramps During Summer Bike Rides',
      excerpt: 'The right electrolyte and fluid strategy. Guide for optimal hydration in hot weather.',
      category: 'Hydration & Electrolytes',
      author: 'Dr. Ante Horvat',
      date: 'June 12, 2025',
      readTime: '4 min read',
      body: [
        {
          type: 'lead',
          text: 'Summer cycling rides in high heat often end in painful muscle cramps in calves or thighs just as your performance peaks. Fatigue is rarely the sole culprit — most often it is electrolyte depletion.',
        },
        { type: 'h2', text: 'Why Do Cramps Happen? Loss of Electrolytes, Not Just Fluids' },
        {
          type: 'p',
          text: 'Sweat strips away not just water, but also sodium, potassium, and magnesium — minerals governing muscle contraction. Drinking plain water without sodium dilutes blood sodium levels further, increasing cramp risk.',
        },
        {
          type: 'p',
          text: 'In temperatures over 28°C, cyclists can sweat up to 1.5 liters per hour. Without a plan, sodium drops occur well before thirst kicks in.',
        },
        { type: 'h2', text: 'Natural Hydration: Honey, Electrolytes & Sea Salt' },
        {
          type: 'p',
          text: 'An isotonic drink made with real honey and sea salt restores electrolytes in physiological balance while providing easy carbs for muscles.',
        },
        {
          type: 'callout',
          title: 'Recommended product for heat:',
          text: 'Honey Bee Power Isotonic Drink combines flower honey and sea salt for rapid hydration without artificial sweeteners.',
          ctaLabel: 'Explore Isotonic Drinks →',
          ctaHref: '/proizvodi/izotonicki-napitci',
        },
      ],
    },
    de: {
      title: 'Muskelkrämpfe bei sommerlichen Radtouren verhindern',
      excerpt: 'Die richtige Elektrolyt- und Flüssigkeitsstrategie. Ein Leitfaden für optimale Hydration bei Hitze.',
      category: 'Hydration & Elektrolyte',
      author: 'Dr. Ante Horvat',
      date: '12. Juni 2025',
      readTime: '4 Min. Lesezeit',
      body: [
        {
          type: 'lead',
          text: 'Sommerliche Radtouren bei hoher Hitze enden oft mit schmerzhaften Muskelkrämpfen in Waden oder Oberschenkeln. Die Ursache ist selten nur Ermüdung — meist ist es Elektrolytverlust.',
        },
        { type: 'h2', text: 'Warum entstehen Krämpfe? Elektrolytverlust, nicht nur Wasser' },
        {
          type: 'p',
          text: 'Durch Schwitzen verlieren wir nicht nur Wasser, sondern auch Natrium, Kalium und Magnesium. Das Trinken von reinem Wasser verdünnt das verbleibende Natrium im Blut und erhöht das Krampfrisiko.',
        },
        {
          type: 'callout',
          title: 'Empfohlenes Produkt für Hitze:',
          text: 'Honey Bee Power Isotonisches Getränk kombiniert Blütenhonig und Meersalz für eine schnelle Elektrolytzufuhr ohne künstliche Süßstoffe.',
          ctaLabel: 'Isotonische Getränke entdecken →',
          ctaHref: '/proizvodi/izotonicki-napitci',
        },
      ],
    },
    sl: {
      title: 'Kako preprečiti mišične krče med poletnimi kolesarskimi vožnjami',
      excerpt: 'Pravilna strategija vnosa elektrolitov in tekočine. Vodnik za optimalno hidracijo na vročini.',
      category: 'Hidracija in elektroliti',
      author: 'Dr. Ante Horvat',
      date: '12. junij 2025',
      readTime: '4 min branja',
      body: [
        {
          type: 'lead',
          text: 'Poletne kolesarske vožnje pri visokih temperaturah se pogosto končajo z bolečimi krči v mečih ali stegnih. Krivec je redko samo utrujenost — najpogosteje gre za izgubo elektrolitov.',
        },
        { type: 'h2', text: 'Zakaj nastanejo krči? Izguba elektrolitov, ne le tekočine' },
        {
          type: 'p',
          text: 'Z znojenjem ne izgubljamo le vode, ampak tudi natrij, kalij in magnezij. Pitje navadne vode brez dodanih elektrolitov razredči preostali natrij v krvi in poveča tveganje za krče.',
        },
        {
          type: 'callout',
          title: 'Priporočeni izdelek za vročino:',
          text: 'Honey Bee Power Izotonični Napitek združuje cvetlični med in morsko sol za hitro nadomeščanje elektrolitov brez umetnih sladil.',
          ctaLabel: 'Oglejte si izotonične napitke →',
          ctaHref: '/proizvodi/izotonicki-napitci',
        },
      ],
    },
    pl: {
      title: 'Jak zapobiegać skurczom mięśni podczas letnich jazd rowerowych',
      excerpt: 'Właściwa strategia elektrolitów i płynów. Przewodnik po optymalnym nawodnieniu w upale.',
      category: 'Nawodnienie i Elektrolity',
      author: 'Dr. Ante Horvat',
      date: '12 czerwca 2025',
      readTime: '4 min czytania',
      body: [
        {
          type: 'lead',
          text: 'Letnie jazdy rowerowe w wysokich temperaturach często kończą się bolesnymi skurczami mięśni ud lub łydek. Przyczyną rzadko jest samo zmęczenie — najczęściej to utrata elektrolitów.',
        },
        { type: 'h2', text: 'Dlaczego powstają skurcze? Utrata elektrolitów, nie tylko płynów' },
        {
          type: 'p',
          text: 'Z potem tracimy nie tylko wodę, ale także sód, potas i magnez. Picie samej wody bez elektrolitów rozcieńcza sód we krwi, zwiększając ryzyko skurczu.',
        },
        {
          type: 'callout',
          title: 'Rekomendowany produkt na upał:',
          text: 'Honey Bee Power Napój Izotoniczny łączy miód kwiatowy i sól morską dla szybkiej odbudowy elektrolitów bez sztucznych słodzików.',
          ctaLabel: 'Zobacz Napoje Izotoniczne →',
          ctaHref: '/proizvodi/izotonicki-napitci',
        },
      ],
    },
  },

  'uloga-bjelancevina-i-meda-u-brzem-oporavku-nakon-treninga': {
    hr: {
      title: 'Uloga bjelančevina i meda u bržem oporavku mišićnih vlakana',
      excerpt: 'Kombinacija proteina i brzih prirodnih ugljikohidrata obnavlja zalihe glikogena u rekordnom roku.',
      category: 'Oporavak & Regeneracija',
      author: 'Dr. sc. Ante Horvat',
      date: '04. srpnja 2025.',
      readTime: '6 min čitanja',
      body: [
        {
          type: 'lead',
          text: 'Prvih 30 do 60 minuta nakon intenzivnog treninga poznato je kao "prozor oporavka" — razdoblje kada su mišići najosjetljiviji na unos hranjivih tvari potrebnih za popravak vlakana i punjenje energetskih zaliha.',
        },
        { type: 'h2', text: 'Zašto su ugljikohidrati jednako važni kao i proteini' },
        {
          type: 'p',
          text: 'Fokus na proteine je opravdan — aminokiseline su građevni materijal za oštećena mišićna vlakna. No bez dovoljno ugljikohidrata, tijelo dio tih proteina troši za energiju umjesto za obnovu mišića.',
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
    en: {
      title: 'The Role of Protein and Honey in Faster Muscle Recovery',
      excerpt: 'The combination of protein and fast natural carbs restores glycogen stores in record time.',
      category: 'Recovery & Regeneration',
      author: 'Dr. Ante Horvat',
      date: 'July 04, 2025',
      readTime: '6 min read',
      body: [
        {
          type: 'lead',
          text: 'The first 30 to 60 minutes post-workout is known as the "anabolic window" — when muscles are most receptive to nutrients for fiber repair and refueling.',
        },
        { type: 'h2', text: 'Why Carbs Are Just As Crucial As Protein' },
        {
          type: 'p',
          text: 'Protein provides the amino acid building blocks. However, without sufficient carbs, the body burns part of that protein for energy instead of tissue repair.',
        },
        {
          type: 'callout',
          title: 'Recommended for recovery:',
          text: 'Honey Bee Power Isotonic Drink paired with a protein-rich meal restores glycogen and electrolytes fast.',
          ctaLabel: 'Explore Isotonic Drinks →',
          ctaHref: '/proizvodi/izotonicki-napitci',
        },
      ],
    },
    de: {
      title: 'Die Rolle von Protein und Honig bei schnellerer Muskelregeneration',
      excerpt: 'Die Kombination aus Protein und schnellen Kohlenhydraten füllt die Glykogenspeicher in Rekordzeit wieder auf.',
      category: 'Erholung & Regeneration',
      author: 'Dr. Ante Horvat',
      date: '04. Juli 2025',
      readTime: '6 Min. Lesezeit',
      body: [
        {
          type: 'lead',
          text: 'Die ersten 30 bis 60 Minuten nach dem Training sind als "Regenerationsfenster" bekannt — eine Zeit, in der die Muskeln am empfänglichsten für Nährstoffe sind.',
        },
        { type: 'callout',
          title: 'Empfohlen für die Erholungsphase:',
          text: 'Honey Bee Power Isotonisches Getränk kombiniert mit einer proteinreichen Mahlzeit füllt Glykogen und Elektrolyte schnell wieder auf.',
          ctaLabel: 'Isotonische Getränke entdecken →',
          ctaHref: '/proizvodi/izotonicki-napitci',
        },
      ],
    },
    sl: {
      title: 'Vloga beljakovin in medu pri hitrejši regeneraciji mišičnih vlaken',
      excerpt: 'Kombinacija beljakovin in hitrih naravnih ogljikovih hidratov obnovi zaloge glikogena v rekordnem času.',
      category: 'Regeneracija in okrevanje',
      author: 'Dr. Ante Horvat',
      date: '04. julij 2025',
      readTime: '6 min branja',
      body: [
        {
          type: 'lead',
          text: 'Prvih 30 do 60 minut po intenzivnem treningu je znanih kot "okno regeneracije" — obdobje, ko so mišice najbolj dojemljive za hranila.',
        },
        { type: 'callout',
          title: 'Priporočeno za regeneracijo:',
          text: 'Honey Bee Power Izotonični Napitek ob obroku, bogatem z beljakovinami, hitro obnovi glikogen in elektrolite.',
          ctaLabel: 'Oglejte si izotonične napitke →',
          ctaHref: '/proizvodi/izotonicki-napitci',
        },
      ],
    },
    pl: {
      title: 'Rola białka i miodu w szybszej regeneracji włókien mięśniowych',
      excerpt: 'Połączenie białka i szybkich naturalnych węglowodanów odbudowuje zapasy glikogenu w rekordowym tempie.',
      category: 'Regeneracja i Odbudowa',
      author: 'Dr. Ante Horvat',
      date: '04 lipca 2025',
      readTime: '6 min czytania',
      body: [
        {
          type: 'lead',
          text: 'Pierwsze 30 do 60 minut po intensywnym treningu to tzw. "okno anaboliczne" — okres, w którym mięśnie najlepiej przyswajają składniki odżywcze.',
        },
        { type: 'callout',
          title: 'Rekomendowane do regeneracji:',
          text: 'Honey Bee Power Napój Izotoniczny w połączeniu z posiłkiem białkowym szybko uzupełnia glikogen i elektrolity.',
          ctaLabel: 'Zobacz Napoje Izotoniczne →',
          ctaHref: '/proizvodi/izotonicki-napitci',
        },
      ],
    },
  },
}

const BASE_METADATA = [
  {
    slug: 'zasto-je-med-bolji-od-malto-dekstrina-na-maratonu',
    isoDate: '2025-05-20T08:00:00+02:00',
    image: '/images/events/event-1.jpg',
  },
  {
    slug: 'kako-sprijeciti-grceve-u-misicima-tijekom-ljetnih-voznji',
    isoDate: '2025-06-12T08:00:00+02:00',
    image: '/images/events/event-8.jpg',
  },
  {
    slug: 'uloga-bjelancevina-i-meda-u-brzem-oporavku-nakon-treninga',
    isoDate: '2025-07-04T08:00:00+02:00',
    image: '/images/events/event-11.jpg',
  },
]

export const GUIDES: Guide[] = BASE_METADATA.map((meta) => {
  const content = GUIDES_MULTILINGUAL[meta.slug].hr
  return {
    slug: meta.slug,
    isoDate: meta.isoDate,
    image: meta.image,
    ...content,
  }
})

export function getGuides(locale: Locale = 'hr'): Guide[] {
  return BASE_METADATA.map((meta) => {
    const langDict = GUIDES_MULTILINGUAL[meta.slug]
    const content = langDict ? (langDict[locale] || langDict.hr) : GUIDES_MULTILINGUAL['zasto-je-med-bolji-od-malto-dekstrina-na-maratonu'].hr
    return {
      slug: meta.slug,
      isoDate: meta.isoDate,
      image: meta.image,
      ...content,
    }
  })
}

export function getGuideBySlug(slug: string, locale: Locale = 'hr'): Guide | undefined {
  const meta = BASE_METADATA.find((m) => m.slug === slug)
  if (!meta) return undefined
  const langDict = GUIDES_MULTILINGUAL[slug]
  if (!langDict) return undefined
  const content = langDict[locale] || langDict.hr
  return {
    slug: meta.slug,
    isoDate: meta.isoDate,
    image: meta.image,
    ...content,
  }
}
