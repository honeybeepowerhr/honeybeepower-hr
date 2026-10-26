import type { Locale } from '@/types'

/**
 * Vodiči. Autor je „Honey Bee Power” dok klijent ne potvrdi stvarnog autora.
 * Samo opće smjernice s izvorima i podaci s deklaracija; bez neodobrenih
 * zdravstvenih tvrdnji i bez usporedbi s konkurencijom. Tekstove treba
 * pregledati nutricionist; prijevodi čekaju provjeru izvornih govornika.
 *
 * Stari vodiči (preusmjereni trajno, 301, u next.config.ts):
 *  zasto-je-med-bolji-od-malto-dekstrina-na-maratonu → med-ili-energetski-gel
 *  kako-sprijeciti-grceve-u-misicima-tijekom-ljetnih-voznji → sto-piti-na-ljetnoj-voznji
 *  uloga-bjelancevina-i-meda-u-brzem-oporavku-nakon-treninga → protein-nakon-treninga
 */

export type GuideBlock =
  | { type: 'h2'; text: string }
  | { type: 'p'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'link'; text: string; href: string }

export interface GuideSource {
  label: string
  url: string
}

export interface Guide {
  slug: string
  title: string
  excerpt: string
  lead: string
  author: string
  isoUpdated: string
  readMinutes: number
  image: string
  imageAlt: string
  body: GuideBlock[]
  faq: Array<{ q: string; a: string }>
  sources: GuideSource[]
}

type GuideText = Omit<Guide, 'slug' | 'isoUpdated' | 'image' | 'readMinutes' | 'author' | 'sources'>

const SRC = {
  acsm: { label: 'Thomas DT, Erdman KA, Burke LM. Nutrition and Athletic Performance. Med Sci Sports Exerc. 2016;48(3):543–568.', url: 'https://doi.org/10.1249/MSS.0000000000000852' },
  fluids: { label: 'Sawka MN i sur. Exercise and Fluid Replacement. Med Sci Sports Exerc. 2007;39(2):377–390.', url: 'https://doi.org/10.1249/mss.0b013e31802ca597' },
  claims: { label: 'Uredba Komisije (EU) br. 432/2012 o dopuštenim zdravstvenim tvrdnjama.', url: 'https://eur-lex.europa.eu/legal-content/HR/TXT/?uri=CELEX:32012R0432' },
  honey: { label: 'Direktiva Vijeća 2001/110/EZ o medu (sastav meda).', url: 'https://eur-lex.europa.eu/legal-content/HR/TXT/?uri=CELEX:32001L0110' },
  caffeine: { label: 'EFSA NDA Panel. Scientific Opinion on the safety of caffeine. EFSA Journal 2015;13(5):4102.', url: 'https://doi.org/10.2903/j.efsa.2015.4102' },
  protein: { label: 'Jäger R i sur. ISSN Position Stand: protein and exercise. J Int Soc Sports Nutr. 2017;14:20.', url: 'https://doi.org/10.1186/s12970-017-0177-8' },
}

const META = [
  { slug: 'kada-uzeti-energetski-gel', isoUpdated: '2026-10-26', image: '/images/events-web/event-23.jpg', sources: [SRC.claims, SRC.acsm, SRC.caffeine] },
  { slug: 'med-ili-energetski-gel', isoUpdated: '2026-10-26', image: '/images/found/med-zlica.jpg', sources: [SRC.honey, SRC.acsm, SRC.claims] },
  { slug: 'sto-piti-na-ljetnoj-voznji', isoUpdated: '2026-10-26', image: '/images/events-web/event-20.jpg', sources: [SRC.fluids, SRC.acsm] },
  { slug: 'protein-nakon-treninga', isoUpdated: '2026-10-26', image: '/images/products-web/proteinbanana700g.webp', sources: [SRC.acsm, SRC.protein] },
] as const

const TEXT: Record<string, Record<Locale, GuideText>> = {
  'kada-uzeti-energetski-gel': {
    hr: {
      title: 'Kada uzeti energetski gel?',
      excerpt: 'Što kaže deklaracija Honey Bee Power gela, što kažu opće smjernice za ugljikohidrate i zašto je važno upozorenje za kofein.',
      lead: 'Na pitanje „kada uzeti gel” postoje dva odgovora: što piše na pakiranju konkretnog gela i što opće smjernice kažu o ugljikohidratima u sportu. Za Honey Bee Power gel prvi odgovor je jasan.',
      imageAlt: 'Muškarac u majici Honey Bee Power drži energetski gel',
      body: [
        { type: 'h2', text: 'Što piše na deklaraciji' },
        { type: 'p', text: 'Deklaracija Honey Bee Power gela kaže: uzeti 1 obrok (40 g) nakon vježbanja ili fizičkog napora. Proizvod je namijenjen odraslima koji su vrlo intenzivno ili dugotrajno vježbali, što je dovelo do umora mišića i trošenja zaliha glikogena.' },
        { type: 'p', text: 'Uz to stoji odobrena zdravstvena tvrdnja: ugljikohidrati pridonose oporavku normalne funkcije mišića nakon takvog napora, uz ukupno 4 g ugljikohidrata po kilogramu tjelesne težine iz svih izvora, u dozama, u prva 4 sata i najkasnije 6 sati.' },
        { type: 'link', text: 'Izračunaj koliko ugljikohidrata trebaš za oporavak', href: '/oporavak-nakon-treninga' },
        { type: 'h2', text: 'Što kažu opće smjernice' },
        { type: 'p', text: 'Opće smjernice sportske prehrane navode 30–60 g ugljikohidrata na sat za napore od oko 1 do 2,5 sata i do 90 g na sat za dulje napore, iz bilo kojeg izvora (Thomas i sur., 2016). Upotrebu Honey Bee Power gela tijekom napora provjeravamo s proizvođačem; dok je ne potvrdi, ne preporučujemo je.' },
        { type: 'h2', text: 'Kofein' },
        { type: 'p', text: 'Gel sadrži 1 % ekstrakta sjemenki guarane, a guarana sadrži kofein. Prema deklaraciji, gel se ne preporučuje osobama osjetljivim na kofein, trudnicama, dojiljama i djeci. Količinu kofeina po gelu potvrđujemo s proizvođačem.' },
      ],
      faq: [
        { q: 'Mogu li uzeti dva gela odjednom?', a: 'Deklaracija navodi 1 obrok od 40 g nakon napora. Ostatak ugljikohidrata za oporavak uzmi iz hrane i napitaka.' },
        { q: 'Treba li gel piti s vodom?', a: 'Deklaracija to ne navodi. Uz napor i oporavak ionako treba piti dovoljno tekućine.' },
      ],
    },
    en: {
      title: 'When to take an energy gel?',
      excerpt: 'What the Honey Bee Power gel label says, what general carbohydrate guidance says, and why the caffeine warning matters.',
      lead: 'There are two answers to “when do I take a gel”: what the pack of that particular gel says, and what general guidance says about carbohydrate in sport. For the Honey Bee Power gel, the first answer is clear.',
      imageAlt: 'A man in a Honey Bee Power shirt holding an energy gel',
      body: [
        { type: 'h2', text: 'What the label says' },
        { type: 'p', text: 'The Honey Bee Power gel label says: take 1 serving (40 g) after exercise or physical exertion. The product is intended for adults who have done very intensive or long-lasting exercise leading to muscle fatigue and glycogen depletion.' },
        { type: 'p', text: 'It also carries an authorised health claim: carbohydrates contribute to the recovery of normal muscle function after such exercise, with a total of 4 g of carbohydrate per kilogram of body weight from all sources, in doses, within the first 4 hours and no later than 6 hours.' },
        { type: 'link', text: 'Calculate how much carbohydrate you need for recovery', href: '/oporavak-nakon-treninga' },
        { type: 'h2', text: 'What general guidance says' },
        { type: 'p', text: 'General sports nutrition guidance lists 30–60 g of carbohydrate per hour for efforts of about 1 to 2.5 hours and up to 90 g per hour for longer efforts, from any source (Thomas et al., 2016). We are checking use of the Honey Bee Power gel during exercise with the producer; until they confirm it, we do not recommend it.' },
        { type: 'h2', text: 'Caffeine' },
        { type: 'p', text: 'The gel contains 1% guarana seed extract, and guarana contains caffeine. According to the label, the gel is not recommended for people sensitive to caffeine, pregnant or breastfeeding women, or children. We are confirming the caffeine content per gel with the producer.' },
      ],
      faq: [
        { q: 'Can I take two gels at once?', a: 'The label states 1 serving of 40 g after exercise. Take the rest of your recovery carbohydrate from food and drinks.' },
        { q: 'Should I drink water with the gel?', a: 'The label does not say. You need enough fluid during exercise and recovery anyway.' },
      ],
    },
    de: {
      title: 'Wann nimmt man ein Energiegel?',
      excerpt: 'Was auf dem Etikett des Honey Bee Power Gels steht, was allgemeine Empfehlungen zu Kohlenhydraten sagen und warum der Koffeinhinweis wichtig ist.',
      lead: 'Auf die Frage „wann nimmt man ein Gel“ gibt es zwei Antworten: was auf der Packung dieses Gels steht und was allgemeine Empfehlungen zu Kohlenhydraten im Sport sagen. Für das Honey Bee Power Gel ist die erste Antwort klar.',
      imageAlt: 'Mann im Honey Bee Power Shirt mit einem Energiegel',
      body: [
        { type: 'h2', text: 'Was auf dem Etikett steht' },
        { type: 'p', text: 'Auf dem Etikett steht: 1 Portion (40 g) nach dem Training oder der Belastung einnehmen. Das Produkt ist für Erwachsene nach sehr intensiver oder langer Belastung mit Muskelermüdung und Glykogenentleerung bestimmt.' },
        { type: 'p', text: 'Dazu kommt eine zugelassene Angabe: Kohlenhydrate tragen nach solcher Belastung zur Wiederherstellung der normalen Muskelfunktion bei, bei insgesamt 4 g Kohlenhydraten pro Kilogramm Körpergewicht aus allen Quellen, in Dosen, in den ersten 4 Stunden und spätestens nach 6 Stunden.' },
        { type: 'link', text: 'Kohlenhydrate zur Erholung berechnen', href: '/oporavak-nakon-treninga' },
        { type: 'h2', text: 'Was allgemeine Empfehlungen sagen' },
        { type: 'p', text: 'Allgemeine Empfehlungen nennen 30–60 g Kohlenhydrate pro Stunde für Belastungen von etwa 1 bis 2,5 Stunden und bis zu 90 g pro Stunde für längere, aus beliebiger Quelle (Thomas et al., 2016). Die Einnahme des Honey Bee Power Gels während der Belastung klären wir mit dem Hersteller und empfehlen sie bis zur Bestätigung nicht.' },
        { type: 'h2', text: 'Koffein' },
        { type: 'p', text: 'Das Gel enthält 1 % Guaranasamenextrakt, und Guarana enthält Koffein. Laut Etikett wird es koffeinempfindlichen Personen, Schwangeren, Stillenden und Kindern nicht empfohlen. Den Koffeingehalt pro Gel klären wir mit dem Hersteller.' },
      ],
      faq: [
        { q: 'Kann ich zwei Gels auf einmal nehmen?', a: 'Das Etikett nennt 1 Portion zu 40 g nach der Belastung. Den Rest der Kohlenhydrate aus Essen und Getränken nehmen.' },
        { q: 'Muss ich Wasser dazu trinken?', a: 'Das Etikett sagt dazu nichts. Genug Flüssigkeit braucht man bei Belastung und Erholung ohnehin.' },
      ],
    },
    sl: {
      title: 'Kdaj vzeti energijski gel?',
      excerpt: 'Kaj piše na deklaraciji gela Honey Bee Power, kaj pravijo splošne smernice za ogljikove hidrate in zakaj je opozorilo za kofein pomembno.',
      lead: 'Na vprašanje „kdaj vzeti gel” sta dva odgovora: kaj piše na embalaži tega gela in kaj splošne smernice pravijo o ogljikovih hidratih v športu. Za gel Honey Bee Power je prvi odgovor jasen.',
      imageAlt: 'Moški v majici Honey Bee Power drži energijski gel',
      body: [
        { type: 'h2', text: 'Kaj piše na deklaraciji' },
        { type: 'p', text: 'Deklaracija pravi: zaužijte 1 obrok (40 g) po vadbi ali telesnem naporu. Izdelek je namenjen odraslim po zelo intenzivni ali dolgotrajni vadbi, ki je privedla do utrujenosti mišic in izčrpanja glikogena.' },
        { type: 'p', text: 'Ob tem je odobrena zdravstvena trditev: ogljikovi hidrati prispevajo k obnovitvi normalnega delovanja mišic po takem naporu, ob skupno 4 g ogljikovih hidratov na kilogram telesne mase iz vseh virov, v odmerkih, v prvih 4 urah in najpozneje v 6 urah.' },
        { type: 'link', text: 'Izračunaj, koliko ogljikovih hidratov potrebuješ za obnovo', href: '/oporavak-nakon-treninga' },
        { type: 'h2', text: 'Kaj pravijo splošne smernice' },
        { type: 'p', text: 'Splošne smernice navajajo 30–60 g ogljikovih hidratov na uro za napore od približno 1 do 2,5 ure in do 90 g na uro za daljše, iz katerega koli vira (Thomas in sod., 2016). Uporabo gela Honey Bee Power med naporom preverjamo pri proizvajalcu in je do potrditve ne priporočamo.' },
        { type: 'h2', text: 'Kofein' },
        { type: 'p', text: 'Gel vsebuje 1 % izvlečka semen guarane, guarana pa vsebuje kofein. Po deklaraciji ni priporočljiv za osebe, občutljive na kofein, nosečnice, doječe matere in otroke. Količino kofeina na gel preverjamo pri proizvajalcu.' },
      ],
      faq: [
        { q: 'Ali lahko vzamem dva gela naenkrat?', a: 'Deklaracija navaja 1 obrok po 40 g po naporu. Preostanek ogljikovih hidratov vzemi iz hrane in napitkov.' },
        { q: 'Ali moram gel piti z vodo?', a: 'Deklaracija tega ne navaja. Dovolj tekočine pa med naporom in obnovo potrebuješ tako ali tako.' },
      ],
    },
    pl: {
      title: 'Kiedy przyjąć żel energetyczny?',
      excerpt: 'Co mówi etykieta żelu Honey Bee Power, co mówią ogólne wskazówki dotyczące węglowodanów i dlaczego ważne jest ostrzeżenie o kofeinie.',
      lead: 'Na pytanie „kiedy przyjąć żel” są dwie odpowiedzi: co podaje opakowanie danego żelu i co mówią ogólne wskazówki o węglowodanach w sporcie. Dla żelu Honey Bee Power pierwsza odpowiedź jest jasna.',
      imageAlt: 'Mężczyzna w koszulce Honey Bee Power trzyma żel energetyczny',
      body: [
        { type: 'h2', text: 'Co jest na etykiecie' },
        { type: 'p', text: 'Etykieta mówi: spożyć 1 porcję (40 g) po ćwiczeniach lub wysiłku fizycznym. Produkt jest przeznaczony dla dorosłych po bardzo intensywnym lub długotrwałym wysiłku prowadzącym do zmęczenia mięśni i wyczerpania glikogenu.' },
        { type: 'p', text: 'Jest też dopuszczone oświadczenie zdrowotne: węglowodany przyczyniają się do przywrócenia prawidłowej funkcji mięśni po takim wysiłku, przy łącznym spożyciu 4 g węglowodanów na kilogram masy ciała ze wszystkich źródeł, w dawkach, w ciągu pierwszych 4 godzin i najpóźniej 6 godzin.' },
        { type: 'link', text: 'Oblicz, ile węglowodanów potrzebujesz na regenerację', href: '/oporavak-nakon-treninga' },
        { type: 'h2', text: 'Co mówią ogólne wskazówki' },
        { type: 'p', text: 'Ogólne wskazówki podają 30–60 g węglowodanów na godzinę przy wysiłku trwającym około 1–2,5 godziny i do 90 g na godzinę przy dłuższym, z dowolnego źródła (Thomas i in., 2016). Stosowanie żelu Honey Bee Power w trakcie wysiłku sprawdzamy u producenta i do potwierdzenia go nie zalecamy.' },
        { type: 'h2', text: 'Kofeina' },
        { type: 'p', text: 'Żel zawiera 1% ekstraktu z nasion guarany, a guarana zawiera kofeinę. Według etykiety nie zaleca się go osobom wrażliwym na kofeinę, kobietom w ciąży, karmiącym piersią i dzieciom. Zawartość kofeiny w żelu potwierdzamy u producenta.' },
      ],
      faq: [
        { q: 'Czy mogę przyjąć dwa żele naraz?', a: 'Etykieta podaje 1 porcję 40 g po wysiłku. Resztę węglowodanów na regenerację weź z jedzenia i napojów.' },
        { q: 'Czy żel trzeba popić wodą?', a: 'Etykieta tego nie podaje. Płynów i tak potrzebujesz podczas wysiłku i regeneracji.' },
      ],
    },
  },
  'med-ili-energetski-gel': {
    hr: {
      title: 'Med ili energetski gel?',
      excerpt: 'Što je u medu, što je u Honey Bee Power gelu i po čemu se razlikuju: sastav s deklaracije, pakiranje od 40 g i upozorenje za kofein.',
      lead: 'Honey Bee Power gel je 91–95,5 % višecvjetni med. Zašto onda ne ponijeti obični med? Razlika je u onome što je dodano, u pakiranju i u tome što piše na deklaraciji.',
      imageAlt: 'Staklenka meda i drvena žlica s medom',
      body: [
        { type: 'h2', text: 'Što je u medu' },
        { type: 'p', text: 'Med je prirodni proizvod pčela i, prema europskim propisima o medu, većinom se sastoji od fruktoze i glukoze, uz vodu i male količine drugih tvari. Sastav se razlikuje od meda do meda, ovisno o cvjetovima.' },
        { type: 'h2', text: 'Što je u gelu' },
        { type: 'p', text: 'Gel naranča ima višecvjetni med 95,5 %, liofilizirani plod naranče 3 %, ekstrakt sjemenki guarane 1 % i morsku sol 0,5 %. Limun ima 94,5 % meda i 4 % limuna, a malina 91 % meda, 8 % maline i nema soli. U 40 g je 29–32,8 g ugljikohidrata, ovisno o okusu.' },
        { type: 'list', items: ['Odmjerena količina od 40 g s nutritivnom tablicom na poleđini', 'Liofilizirano voće za okus', 'Ekstrakt guarane, koji sadrži kofein', 'Vrećica koju je lakše nositi nego staklenku'] },
        { type: 'h2', text: 'Na što paziti' },
        { type: 'p', text: 'Zbog guarane gel se ne preporučuje osobama osjetljivim na kofein, trudnicama, dojiljama i djeci. Obični med kofein nema. Prema deklaraciji gel se uzima nakon napora, kao dio ugljikohidrata za oporavak.' },
        { type: 'link', text: 'Pogledaj energetske gelove', href: '/proizvodi/energetski-gelovi' },
      ],
      faq: [
        { q: 'Je li gel isto što i med?', a: 'Ne posve. Med čini 91–95,5 % gela; ostalo su liofilizirano voće, ekstrakt guarane i, kod limuna i naranče, morska sol.' },
        { q: 'Ima li gel dodani šećer ili sukralozu?', a: 'Ne. Na deklaraciji su samo navedeni sastojci, bez sukraloze i umjetnih boja.' },
      ],
    },
    en: {
      title: 'Honey or an energy gel?',
      excerpt: 'What is in honey, what is in the Honey Bee Power gel and how they differ: ingredients from the label, a 40 g pack and the caffeine warning.',
      lead: 'The Honey Bee Power gel is 91–95.5% multifloral honey. So why not just take ordinary honey? The difference lies in what is added, in the pack and in what the label says.',
      imageAlt: 'A jar of honey and a wooden honey dipper',
      body: [
        { type: 'h2', text: 'What is in honey' },
        { type: 'p', text: 'Honey is a natural product of bees and, under the EU honey rules, consists mostly of fructose and glucose, with water and small amounts of other substances. Composition varies from honey to honey depending on the flowers.' },
        { type: 'h2', text: 'What is in the gel' },
        { type: 'p', text: 'The orange gel contains multifloral honey 95.5%, freeze-dried orange 3%, guarana seed extract 1% and sea salt 0.5%. Lemon has 94.5% honey and 4% lemon; raspberry 91% honey, 8% raspberry and no salt. 40 g contain 29–32.8 g of carbohydrate, depending on flavour.' },
        { type: 'list', items: ['A measured 40 g serving with a nutrition table on the back', 'Freeze-dried fruit for flavour', 'Guarana extract, which contains caffeine', 'A sachet that is easier to carry than a jar'] },
        { type: 'h2', text: 'What to watch for' },
        { type: 'p', text: 'Because of the guarana, the gel is not recommended for people sensitive to caffeine, pregnant or breastfeeding women, or children. Ordinary honey has no caffeine. According to the label the gel is taken after exercise, as part of recovery carbohydrate.' },
        { type: 'link', text: 'See the energy gels', href: '/proizvodi/energetski-gelovi' },
      ],
      faq: [
        { q: 'Is the gel the same as honey?', a: 'Not quite. Honey makes up 91–95.5% of the gel; the rest is freeze-dried fruit, guarana extract and, in lemon and orange, sea salt.' },
        { q: 'Does the gel contain added sugar or sucralose?', a: 'No. The label lists only the ingredients above, with no sucralose or artificial colours.' },
      ],
    },
    de: {
      title: 'Honig oder Energiegel?',
      excerpt: 'Was im Honig steckt, was im Honey Bee Power Gel steckt und worin sie sich unterscheiden: Zutaten laut Etikett, 40-g-Beutel und Koffeinhinweis.',
      lead: 'Das Honey Bee Power Gel besteht zu 91–95,5 % aus Mehrblütenhonig. Warum also nicht einfach Honig mitnehmen? Der Unterschied liegt in den Zutaten, der Packung und dem Etikett.',
      imageAlt: 'Honigglas und hölzerner Honiglöffel',
      body: [
        { type: 'h2', text: 'Was im Honig steckt' },
        { type: 'p', text: 'Honig ist ein Naturprodukt der Bienen und besteht laut EU-Honigrichtlinie überwiegend aus Fruktose und Glukose, dazu Wasser und kleine Mengen anderer Stoffe. Die Zusammensetzung hängt von den Blüten ab.' },
        { type: 'h2', text: 'Was im Gel steckt' },
        { type: 'p', text: 'Das Orangengel enthält Mehrblütenhonig 95,5 %, gefriergetrocknete Orange 3 %, Guaranasamenextrakt 1 % und Meersalz 0,5 %. Zitrone hat 94,5 % Honig und 4 % Zitrone, Himbeere 91 % Honig, 8 % Himbeere und kein Salz. 40 g enthalten je nach Sorte 29–32,8 g Kohlenhydrate.' },
        { type: 'list', items: ['Abgemessene 40 g mit Nährwerttabelle auf der Rückseite', 'Gefriergetrocknete Früchte für den Geschmack', 'Guaranaextrakt, der Koffein enthält', 'Ein Beutel ist leichter zu tragen als ein Glas'] },
        { type: 'h2', text: 'Worauf achten' },
        { type: 'p', text: 'Wegen der Guarana wird das Gel koffeinempfindlichen Personen, Schwangeren, Stillenden und Kindern nicht empfohlen. Normaler Honig enthält kein Koffein. Laut Etikett wird das Gel nach der Belastung eingenommen, als Teil der Kohlenhydrate zur Erholung.' },
        { type: 'link', text: 'Energiegels ansehen', href: '/proizvodi/energetski-gelovi' },
      ],
      faq: [
        { q: 'Ist das Gel dasselbe wie Honig?', a: 'Nicht ganz. Honig macht 91–95,5 % aus; der Rest sind gefriergetrocknete Früchte, Guaranaextrakt und bei Zitrone und Orange Meersalz.' },
        { q: 'Enthält das Gel Zuckerzusatz oder Sucralose?', a: 'Nein. Auf dem Etikett stehen nur die genannten Zutaten, ohne Sucralose und künstliche Farbstoffe.' },
      ],
    },
    sl: {
      title: 'Med ali energijski gel?',
      excerpt: 'Kaj je v medu, kaj je v gelu Honey Bee Power in v čem se razlikujeta: sestava z deklaracije, pakiranje 40 g in opozorilo za kofein.',
      lead: 'Gel Honey Bee Power je 91–95,5 % večcvetni med. Zakaj torej ne vzeti navadnega medu? Razlika je v dodanih sestavinah, embalaži in v tem, kar piše na deklaraciji.',
      imageAlt: 'Kozarec medu in lesena žlica za med',
      body: [
        { type: 'h2', text: 'Kaj je v medu' },
        { type: 'p', text: 'Med je naravni proizvod čebel in je po evropskih predpisih o medu večinoma iz fruktoze in glukoze, z vodo in majhnimi količinami drugih snovi. Sestava je odvisna od cvetov.' },
        { type: 'h2', text: 'Kaj je v gelu' },
        { type: 'p', text: 'Gel pomaranča ima večcvetni med 95,5 %, liofilizirano pomarančo 3 %, izvleček semen guarane 1 % in morsko sol 0,5 %. Limona ima 94,5 % medu in 4 % limone, malina 91 % medu, 8 % maline in brez soli. 40 g vsebuje 29–32,8 g ogljikovih hidratov, odvisno od okusa.' },
        { type: 'list', items: ['Odmerjenih 40 g s hranilno tabelo na hrbtni strani', 'Liofilizirano sadje za okus', 'Izvleček guarane, ki vsebuje kofein', 'Vrečka, ki jo je lažje nositi kot kozarec'] },
        { type: 'h2', text: 'Na kaj paziti' },
        { type: 'p', text: 'Zaradi guarane gel ni priporočljiv za osebe, občutljive na kofein, nosečnice, doječe matere in otroke. Navaden med kofeina nima. Po deklaraciji se gel uživa po naporu, kot del ogljikovih hidratov za obnovo.' },
        { type: 'link', text: 'Oglej si energijske gele', href: '/proizvodi/energetski-gelovi' },
      ],
      faq: [
        { q: 'Ali je gel isto kot med?', a: 'Ne povsem. Med predstavlja 91–95,5 % gela; preostalo so liofilizirano sadje, izvleček guarane in pri limoni in pomaranči morska sol.' },
        { q: 'Ali gel vsebuje dodan sladkor ali sukralozo?', a: 'Ne. Na deklaraciji so le navedene sestavine, brez sukraloze in umetnih barvil.' },
      ],
    },
    pl: {
      title: 'Miód czy żel energetyczny?',
      excerpt: 'Co jest w miodzie, co jest w żelu Honey Bee Power i czym się różnią: skład z etykiety, opakowanie 40 g i ostrzeżenie o kofeinie.',
      lead: 'Żel Honey Bee Power to w 91–95,5% miód wielokwiatowy. Dlaczego więc nie zabrać zwykłego miodu? Różnica tkwi w dodatkach, opakowaniu i tym, co podaje etykieta.',
      imageAlt: 'Słoik miodu i drewniana łyżka do miodu',
      body: [
        { type: 'h2', text: 'Co jest w miodzie' },
        { type: 'p', text: 'Miód to naturalny produkt pszczół i według unijnych przepisów o miodzie składa się głównie z fruktozy i glukozy, z wodą i niewielkimi ilościami innych substancji. Skład zależy od kwiatów.' },
        { type: 'h2', text: 'Co jest w żelu' },
        { type: 'p', text: 'Żel pomarańczowy zawiera miód wielokwiatowy 95,5%, liofilizowaną pomarańczę 3%, ekstrakt z nasion guarany 1% i sól morską 0,5%. Cytrynowy ma 94,5% miodu i 4% cytryny, malinowy 91% miodu, 8% maliny i nie ma soli. 40 g zawiera 29–32,8 g węglowodanów, zależnie od smaku.' },
        { type: 'list', items: ['Odmierzone 40 g z tabelą wartości na odwrocie', 'Liofilizowane owoce dla smaku', 'Ekstrakt z guarany, zawierający kofeinę', 'Saszetka łatwiejsza do noszenia niż słoik'] },
        { type: 'h2', text: 'Na co uważać' },
        { type: 'p', text: 'Z powodu guarany żelu nie zaleca się osobom wrażliwym na kofeinę, kobietom w ciąży, karmiącym piersią i dzieciom. Zwykły miód nie zawiera kofeiny. Według etykiety żel przyjmuje się po wysiłku, jako część węglowodanów na regenerację.' },
        { type: 'link', text: 'Zobacz żele energetyczne', href: '/proizvodi/energetski-gelovi' },
      ],
      faq: [
        { q: 'Czy żel to to samo co miód?', a: 'Nie do końca. Miód stanowi 91–95,5% żelu; reszta to liofilizowane owoce, ekstrakt z guarany i, w cytrynowym i pomarańczowym, sól morska.' },
        { q: 'Czy żel zawiera dodany cukier lub sukralozę?', a: 'Nie. Na etykiecie są tylko wymienione składniki, bez sukralozy i sztucznych barwników.' },
      ],
    },
  },
  'sto-piti-na-ljetnoj-voznji': {
    hr: {
      title: 'Što piti na ljetnoj vožnji biciklom',
      excerpt: 'Koliko tekućine na vrućini, kako izmjeriti koliko gubiš znojenjem i što piše na deklaraciji Honey Bee Power izotonika.',
      lead: 'Ljeti se na biciklu znoji više nego što se čini, jer vjetar suši kožu. Količina tekućine nije ista za sve, pa je najbolje izmjeriti svoju.',
      imageAlt: 'Trkač u majici Honey Bee Power',
      body: [
        { type: 'h2', text: 'Koliko piti' },
        { type: 'p', text: 'Smjernice za nadoknadu tekućine (Sawka i sur., 2007) ne daju jednu količinu za sve, nego preporučuju individualan plan: piti tako da se izbjegne veći gubitak tjelesne težine tijekom napora, ali ne piti više nego što se gubi.' },
        { type: 'h2', text: 'Kako izmjeriti svoj gubitak' },
        { type: 'list', items: ['Izvaži se prije vožnje, bez odjeće i nakon odlaska na WC', 'Zabilježi koliko si popio tijekom vožnje', 'Izvaži se nakon vožnje, obrisan od znoja', 'Razlika u težini plus popijena tekućina pokazuje približno koliko si izgubio'] },
        { type: 'h2', text: 'Izotonik' },
        { type: 'p', text: 'Honey Bee Power izotonik je prah za napitak; prema deklaraciji porcija od 15 g ima 13,5 g ugljikohidrata. Puni sastav i način pripreme potvrđujemo s pakiranja. Napitak ima malo natrija, pa ga ne predstavljamo kao nadoknadu elektrolita.' },
        { type: 'link', text: 'Pogledaj izotonične napitke', href: '/proizvodi/izotonicki-napitci' },
      ],
      faq: [
        { q: 'Mogu li piti samo vodu?', a: 'Na kraćim vožnjama obično da. Na duljim vožnjama opće smjernice navode i ugljikohidrate, iz bilo kojeg izvora (Thomas i sur., 2016).' },
        { q: 'Je li loše piti previše?', a: 'Da, piti više nego što se gubi znojenjem nije preporučljivo. Zato je korisno izmjeriti svoj gubitak.' },
      ],
    },
    en: {
      title: 'What to drink on a summer ride',
      excerpt: 'How much fluid in the heat, how to measure your own sweat loss and what the Honey Bee Power isotonic label says.',
      lead: 'In summer you sweat more on the bike than it seems, because the wind dries your skin. Fluid needs are not the same for everyone, so it is best to measure yours.',
      imageAlt: 'A runner in a Honey Bee Power shirt',
      body: [
        { type: 'h2', text: 'How much to drink' },
        { type: 'p', text: 'Fluid replacement guidance (Sawka et al., 2007) does not give one amount for everyone; it recommends an individual plan: drink to avoid larger body-weight loss during exercise, but do not drink more than you lose.' },
        { type: 'h2', text: 'How to measure your loss' },
        { type: 'list', items: ['Weigh yourself before the ride, without clothes and after using the toilet', 'Note how much you drink during the ride', 'Weigh yourself after the ride, towelled dry', 'The weight difference plus the fluid you drank roughly shows how much you lost'] },
        { type: 'h2', text: 'Isotonic drink' },
        { type: 'p', text: 'The Honey Bee Power isotonic is a drink powder; according to the label a 15 g serving has 13.5 g of carbohydrate. We are confirming the full ingredients and preparation from the pack. The drink is low in sodium, so we do not present it as electrolyte replacement.' },
        { type: 'link', text: 'See the isotonic drinks', href: '/proizvodi/izotonicki-napitci' },
      ],
      faq: [
        { q: 'Can I drink only water?', a: 'On shorter rides, usually yes. On longer rides, general guidance also lists carbohydrate, from any source (Thomas et al., 2016).' },
        { q: 'Is drinking too much bad?', a: 'Yes, drinking more than you lose through sweat is not advisable. That is why measuring your own loss helps.' },
      ],
    },
    de: {
      title: 'Was man auf einer Sommerausfahrt trinkt',
      excerpt: 'Wie viel Flüssigkeit bei Hitze, wie man den eigenen Schweißverlust misst und was auf dem Etikett des Honey Bee Power Isotonic steht.',
      lead: 'Im Sommer schwitzt man auf dem Rad mehr, als es scheint, weil der Fahrtwind die Haut trocknet. Der Bedarf ist nicht bei allen gleich, daher am besten selbst messen.',
      imageAlt: 'Ein Läufer im Honey Bee Power Shirt',
      body: [
        { type: 'h2', text: 'Wie viel trinken' },
        { type: 'p', text: 'Empfehlungen zum Flüssigkeitsersatz (Sawka et al., 2007) nennen keine Menge für alle, sondern einen individuellen Plan: so trinken, dass größere Gewichtsverluste vermieden werden, aber nicht mehr, als man verliert.' },
        { type: 'h2', text: 'Den eigenen Verlust messen' },
        { type: 'list', items: ['Vor der Fahrt ohne Kleidung und nach dem WC wiegen', 'Notieren, wie viel man unterwegs trinkt', 'Nach der Fahrt abgetrocknet wiegen', 'Gewichtsdifferenz plus Getrunkenes zeigt ungefähr den Verlust'] },
        { type: 'h2', text: 'Isotonisches Getränk' },
        { type: 'p', text: 'Das Honey Bee Power Isotonic ist ein Getränkepulver; laut Etikett hat eine 15-g-Portion 13,5 g Kohlenhydrate. Vollständige Zutaten und Zubereitung klären wir anhand der Packung. Das Getränk enthält wenig Natrium, daher bewerben wir es nicht als Elektrolytersatz.' },
        { type: 'link', text: 'Isotonische Getränke ansehen', href: '/proizvodi/izotonicki-napitci' },
      ],
      faq: [
        { q: 'Reicht nur Wasser?', a: 'Bei kürzeren Fahrten meist ja. Bei längeren nennen allgemeine Empfehlungen auch Kohlenhydrate aus beliebiger Quelle (Thomas et al., 2016).' },
        { q: 'Ist zu viel trinken schlecht?', a: 'Ja, mehr trinken als man ausschwitzt ist nicht ratsam. Deshalb hilft es, den eigenen Verlust zu messen.' },
      ],
    },
    sl: {
      title: 'Kaj piti na poletni kolesarski vožnji',
      excerpt: 'Koliko tekočine v vročini, kako izmeriti izgubo z znojenjem in kaj piše na deklaraciji izotonika Honey Bee Power.',
      lead: 'Poleti se na kolesu potiš bolj, kot se zdi, ker veter suši kožo. Potrebe po tekočini niso pri vseh enake, zato je najbolje izmeriti svoje.',
      imageAlt: 'Tekač v majici Honey Bee Power',
      body: [
        { type: 'h2', text: 'Koliko piti' },
        { type: 'p', text: 'Smernice za nadomeščanje tekočine (Sawka in sod., 2007) ne dajejo ene količine za vse, ampak priporočajo individualen načrt: piti tako, da se izogneš večji izgubi telesne mase, vendar ne več, kot izgubiš.' },
        { type: 'h2', text: 'Kako izmeriti svojo izgubo' },
        { type: 'list', items: ['Stehtaj se pred vožnjo, brez oblačil in po odhodu na stranišče', 'Zapiši, koliko popiješ med vožnjo', 'Stehtaj se po vožnji, obrisan', 'Razlika v masi in popita tekočina približno pokažeta izgubo'] },
        { type: 'h2', text: 'Izotonik' },
        { type: 'p', text: 'Izotonik Honey Bee Power je prašek za napitek; po deklaraciji ima 15-gramski obrok 13,5 g ogljikovih hidratov. Celotno sestavo in pripravo preverjamo z embalaže. Napitek ima malo natrija, zato ga ne predstavljamo kot nadomeščanje elektrolitov.' },
        { type: 'link', text: 'Oglej si izotonične napitke', href: '/proizvodi/izotonicki-napitci' },
      ],
      faq: [
        { q: 'Ali lahko pijem samo vodo?', a: 'Na krajših vožnjah običajno da. Na daljših splošne smernice navajajo tudi ogljikove hidrate iz katerega koli vira (Thomas in sod., 2016).' },
        { q: 'Ali je preveč pitja slabo?', a: 'Da, piti več, kot izgubiš z znojem, ni priporočljivo. Zato je koristno izmeriti svojo izgubo.' },
      ],
    },
    pl: {
      title: 'Co pić na letniej jeździe rowerem',
      excerpt: 'Ile płynów w upale, jak zmierzyć własną utratę potu i co mówi etykieta izotoniku Honey Bee Power.',
      lead: 'Latem na rowerze pocisz się bardziej, niż się wydaje, bo wiatr osusza skórę. Zapotrzebowanie na płyny nie jest u wszystkich takie samo, więc najlepiej zmierzyć własne.',
      imageAlt: 'Biegacz w koszulce Honey Bee Power',
      body: [
        { type: 'h2', text: 'Ile pić' },
        { type: 'p', text: 'Wskazówki dotyczące uzupełniania płynów (Sawka i in., 2007) nie podają jednej ilości dla wszystkich, lecz zalecają indywidualny plan: pić tak, by uniknąć większej utraty masy ciała, ale nie więcej, niż się traci.' },
        { type: 'h2', text: 'Jak zmierzyć własną utratę' },
        { type: 'list', items: ['Zważ się przed jazdą, bez ubrania i po toalecie', 'Zanotuj, ile pijesz podczas jazdy', 'Zważ się po jeździe, wytarty z potu', 'Różnica masy plus wypite płyny pokazuje w przybliżeniu utratę'] },
        { type: 'h2', text: 'Izotonik' },
        { type: 'p', text: 'Izotonik Honey Bee Power to proszek do napoju; według etykiety porcja 15 g ma 13,5 g węglowodanów. Pełny skład i przygotowanie sprawdzamy z opakowania. Napój ma mało sodu, więc nie przedstawiamy go jako uzupełnienia elektrolitów.' },
        { type: 'link', text: 'Zobacz napoje izotoniczne', href: '/proizvodi/izotonicki-napitci' },
      ],
      faq: [
        { q: 'Czy mogę pić tylko wodę?', a: 'Na krótszych jazdach zwykle tak. Na dłuższych ogólne wskazówki podają też węglowodany z dowolnego źródła (Thomas i in., 2016).' },
        { q: 'Czy picie za dużo szkodzi?', a: 'Tak, picie więcej, niż tracisz z potem, nie jest wskazane. Dlatego warto zmierzyć własną utratę.' },
      ],
    },
  },
  'protein-nakon-treninga': {
    hr: {
      title: 'Protein nakon treninga: koliko i kada',
      excerpt: 'Opće smjernice za protein nakon treninga, primjer za osobu od 70 kg i što je u Honey Bee Power wheyju, uključujući steviju i mlijeko.',
      lead: 'Protein nakon treninga nije magija, nego dio dnevnog unosa. Važnije je koliko ga ima kroz cijeli dan nego točna minuta nakon treninga.',
      imageAlt: 'Posuda Honey Bee Power whey proteina banana-vanilija',
      body: [
        { type: 'h2', text: 'Koliko' },
        { type: 'p', text: 'Opće smjernice za sportaše navode 1,2–2,0 g proteina po kilogramu tjelesne težine dnevno, raspoređeno u obroke od oko 0,3 g po kilogramu, nakon treninga i svakih nekoliko sati (Thomas i sur., 2016; Jäger i sur., 2017). Za osobu od 70 kg to je oko 21 g po obroku.' },
        { type: 'h2', text: 'Kada' },
        { type: 'p', text: 'Obrok s proteinom nakon treninga je praktičan, ali dnevni zbroj i raspodjela kroz dan važniji su od točnog trenutka. Ako je zadnji obrok bio nedavno, nema žurbe.' },
        { type: 'h2', text: 'Što je u Honey Bee Power wheyju' },
        { type: 'p', text: 'Prema prezentaciji proizvođača: whey protein (91–92 %), sušeni med (6 %), stevija i guma arabika. Porcija od 33 g ima oko 22 g proteina. Sadrži mlijeko. Nije zaslađen samo medom. Deklaraciju na pakiranju potvrđujemo.' },
        { type: 'link', text: 'Pogledaj whey proteine', href: '/proizvodi/whey-proteini' },
      ],
      faq: [
        { q: 'Mogu li whey uzimati ako ne podnosim mlijeko?', a: 'Whey sadrži mlijeko, koje je alergen. Ako imaš alergiju ili nepodnošljivost, posavjetuj se s liječnikom.' },
        { q: 'Je li whey zaslađen medom?', a: 'Sadrži sušeni med (6 %) i steviju.' },
      ],
    },
    en: {
      title: 'Protein after training: how much and when',
      excerpt: 'General guidance for protein after training, an example for a 70 kg person and what is in Honey Bee Power whey, including stevia and milk.',
      lead: 'Protein after training is not magic but part of your daily intake. How much you get across the day matters more than the exact minute after training.',
      imageAlt: 'A tub of Honey Bee Power banana-vanilla whey protein',
      body: [
        { type: 'h2', text: 'How much' },
        { type: 'p', text: 'General guidance for athletes lists 1.2–2.0 g of protein per kilogram of body weight per day, spread over meals of about 0.3 g per kilogram, after training and every few hours (Thomas et al., 2016; Jäger et al., 2017). For a 70 kg person that is about 21 g per meal.' },
        { type: 'h2', text: 'When' },
        { type: 'p', text: 'A protein meal after training is practical, but the daily total and how it is spread matter more than the exact moment. If your last meal was recent, there is no rush.' },
        { type: 'h2', text: 'What is in Honey Bee Power whey' },
        { type: 'p', text: 'According to the producer’s presentation: whey protein (91–92%), dried honey (6%), stevia and gum arabic. A 33 g serving has about 22 g of protein. Contains milk. It is not sweetened with honey alone. We are confirming the pack label.' },
        { type: 'link', text: 'See the whey protein', href: '/proizvodi/whey-proteini' },
      ],
      faq: [
        { q: 'Can I take whey if I do not tolerate milk?', a: 'Whey contains milk, which is an allergen. If you have an allergy or intolerance, ask your doctor.' },
        { q: 'Is the whey sweetened with honey?', a: 'It contains dried honey (6%) and stevia.' },
      ],
    },
    de: {
      title: 'Protein nach dem Training',
      excerpt: 'Allgemeine Empfehlungen für Protein nach dem Training, ein Beispiel für 70 kg und was im Honey Bee Power Whey steckt, inklusive Stevia und Milch.',
      lead: 'Protein nach dem Training ist keine Magie, sondern Teil der täglichen Zufuhr. Die Menge über den Tag zählt mehr als die genaue Minute nach dem Training.',
      imageAlt: 'Dose Honey Bee Power Whey Protein Banane-Vanille',
      body: [
        { type: 'h2', text: 'Wie viel' },
        { type: 'p', text: 'Allgemeine Empfehlungen für Sportler nennen 1,2–2,0 g Protein pro Kilogramm Körpergewicht täglich, verteilt auf Mahlzeiten von etwa 0,3 g pro Kilogramm, nach dem Training und alle paar Stunden (Thomas et al., 2016; Jäger et al., 2017). Bei 70 kg sind das etwa 21 g pro Mahlzeit.' },
        { type: 'h2', text: 'Wann' },
        { type: 'p', text: 'Eine Proteinmahlzeit nach dem Training ist praktisch, aber Tagessumme und Verteilung zählen mehr als der genaue Zeitpunkt. War die letzte Mahlzeit vor Kurzem, gibt es keine Eile.' },
        { type: 'h2', text: 'Was im Honey Bee Power Whey steckt' },
        { type: 'p', text: 'Laut Präsentation des Herstellers: Molkenprotein (91–92 %), getrockneter Honig (6 %), Stevia und Gummi arabicum. Eine 33-g-Portion hat etwa 22 g Protein. Enthält Milch. Nicht nur mit Honig gesüßt. Das Etikett wird geprüft.' },
        { type: 'link', text: 'Whey Protein ansehen', href: '/proizvodi/whey-proteini' },
      ],
      faq: [
        { q: 'Kann ich Whey nehmen, wenn ich Milch nicht vertrage?', a: 'Whey enthält Milch, ein Allergen. Bei Allergie oder Unverträglichkeit ärztlichen Rat einholen.' },
        { q: 'Ist das Whey mit Honig gesüßt?', a: 'Es enthält getrockneten Honig (6 %) und Stevia.' },
      ],
    },
    sl: {
      title: 'Beljakovine po treningu: koliko in kdaj',
      excerpt: 'Splošne smernice za beljakovine po treningu, primer za osebo s 70 kg in kaj je v whey proteinu Honey Bee Power, vključno s stevio in mlekom.',
      lead: 'Beljakovine po treningu niso čarovnija, ampak del dnevnega vnosa. Pomembnejše je, koliko jih zaužiješ čez dan, kot natančna minuta po treningu.',
      imageAlt: 'Embalaža whey proteina Honey Bee Power banana-vanilija',
      body: [
        { type: 'h2', text: 'Koliko' },
        { type: 'p', text: 'Splošne smernice za športnike navajajo 1,2–2,0 g beljakovin na kilogram telesne mase dnevno, razporejeno v obroke po približno 0,3 g na kilogram, po treningu in vsakih nekaj ur (Thomas in sod., 2016; Jäger in sod., 2017). Za osebo s 70 kg je to približno 21 g na obrok.' },
        { type: 'h2', text: 'Kdaj' },
        { type: 'p', text: 'Obrok z beljakovinami po treningu je praktičen, vendar sta dnevni seštevek in razporeditev pomembnejša od točnega trenutka. Če si nedavno jedel, se ne mudi.' },
        { type: 'h2', text: 'Kaj je v whey proteinu Honey Bee Power' },
        { type: 'p', text: 'Po predstavitvi proizvajalca: sirotkine beljakovine (91–92 %), sušen med (6 %), stevia in arabski gumi. 33-gramski obrok ima približno 22 g beljakovin. Vsebuje mleko. Ni sladkan samo z medom. Deklaracijo preverjamo.' },
        { type: 'link', text: 'Oglej si whey proteine', href: '/proizvodi/whey-proteini' },
      ],
      faq: [
        { q: 'Ali lahko uživam whey, če ne prenašam mleka?', a: 'Whey vsebuje mleko, ki je alergen. Pri alergiji ali nestrpnosti se posvetuj z zdravnikom.' },
        { q: 'Ali je whey sladkan z medom?', a: 'Vsebuje sušen med (6 %) in stevio.' },
      ],
    },
    pl: {
      title: 'Białko po treningu: ile i kiedy',
      excerpt: 'Ogólne wskazówki dotyczące białka po treningu, przykład dla osoby 70 kg i co jest w whey Honey Bee Power, w tym stewia i mleko.',
      lead: 'Białko po treningu to nie magia, lecz część dziennego spożycia. Ważniejsze jest, ile go jest w ciągu dnia, niż dokładna minuta po treningu.',
      imageAlt: 'Opakowanie białka Honey Bee Power banan z wanilią',
      body: [
        { type: 'h2', text: 'Ile' },
        { type: 'p', text: 'Ogólne wskazówki dla sportowców podają 1,2–2,0 g białka na kilogram masy ciała dziennie, rozłożone na posiłki po około 0,3 g na kilogram, po treningu i co kilka godzin (Thomas i in., 2016; Jäger i in., 2017). Dla osoby 70 kg to około 21 g na posiłek.' },
        { type: 'h2', text: 'Kiedy' },
        { type: 'p', text: 'Posiłek z białkiem po treningu jest praktyczny, ale dzienna suma i rozłożenie są ważniejsze niż dokładny moment. Jeśli niedawno jadłeś, nie ma pośpiechu.' },
        { type: 'h2', text: 'Co jest w whey Honey Bee Power' },
        { type: 'p', text: 'Według prezentacji producenta: białko serwatkowe (91–92%), suszony miód (6%), stewia i guma arabska. Porcja 33 g ma około 22 g białka. Zawiera mleko. Nie jest słodzone wyłącznie miodem. Etykietę weryfikujemy.' },
        { type: 'link', text: 'Zobacz białko whey', href: '/proizvodi/whey-proteini' },
      ],
      faq: [
        { q: 'Czy mogę brać whey, jeśli nie toleruję mleka?', a: 'Whey zawiera mleko, które jest alergenem. Przy alergii lub nietolerancji skonsultuj się z lekarzem.' },
        { q: 'Czy whey jest słodzone miodem?', a: 'Zawiera suszony miód (6%) i stewię.' },
      ],
    },
  },
}

function wordsOf(t: GuideText): number {
  const text = [t.lead, ...t.body.map((b) => (b.type === 'list' ? b.items.join(' ') : b.text)), ...t.faq.map((f) => `${f.q} ${f.a}`)].join(' ')
  return text.split(/\s+/).filter(Boolean).length
}

function build(meta: (typeof META)[number], locale: Locale): Guide {
  const t = TEXT[meta.slug][locale] ?? TEXT[meta.slug].hr
  return {
    slug: meta.slug,
    isoUpdated: meta.isoUpdated,
    image: meta.image,
    author: 'Honey Bee Power',
    readMinutes: Math.max(1, Math.round(wordsOf(t) / 200)),
    sources: [...meta.sources],
    ...t,
  }
}

export const GUIDES: Guide[] = META.map((m) => build(m, 'hr'))

export function getGuides(locale: Locale = 'hr'): Guide[] {
  return META.map((m) => build(m, locale))
}

export function getGuideBySlug(slug: string, locale: Locale = 'hr'): Guide | undefined {
  const meta = META.find((m) => m.slug === slug)
  return meta ? build(meta, locale) : undefined
}

/** Stare adrese vodiča → nove (trajno preusmjeravanje). */
export const GUIDE_REDIRECTS: Record<string, string> = {
  'zasto-je-med-bolji-od-malto-dekstrina-na-maratonu': 'med-ili-energetski-gel',
  'kako-sprijeciti-grceve-u-misicima-tijekom-ljetnih-voznji': 'sto-piti-na-ljetnoj-voznji',
  'uloga-bjelancevina-i-meda-u-brzem-oporavku-nakon-treninga': 'protein-nakon-treninga',
}
