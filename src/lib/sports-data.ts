import type { L10n } from '@/lib/declarations'
import type { ProductKind, SportSlug } from '@/lib/product-content'

/**
 * Stranice po sportu. Opće smjernice sportske prehrane navode izvor
 * (Thomas, Erdman i Burke 2016). Honey Bee Power gel preporučuje se samo kako
 * piše na deklaraciji: nakon napora. Tekstove treba pregledati nutricionist;
 * prijevodi čekaju provjeru izvornih govornika.
 */

export interface SportSection {
  title: L10n
  body: L10n
}

export interface SportPage {
  slug: SportSlug
  title: L10n
  metaTitle: L10n
  metaDescription: L10n
  lead: L10n
  image: string
  imageAlt: L10n
  imagePosition?: string
  sections: SportSection[]
  products: ProductKind[]
  faq: Array<{ q: L10n; a: L10n }>
}

const T = (hr: string, en: string, de: string, sl: string, pl: string): L10n => ({ hr, en, de, sl, pl })

export const SOURCES = [
  {
    label: 'Thomas DT, Erdman KA, Burke LM. Nutrition and Athletic Performance. Med Sci Sports Exerc. 2016;48(3):543–568.',
    url: 'https://doi.org/10.1249/MSS.0000000000000852',
  },
  {
    label: 'Uredba (EU) br. 432/2012 o utvrđivanju popisa dopuštenih zdravstvenih tvrdnji.',
    url: 'https://eur-lex.europa.eu/legal-content/HR/TXT/?uri=CELEX:32012R0432',
  },
]

const RECOVERY_GEL: SportSection = {
  title: T('Nakon napora: oporavak', 'After exercise: recovery', 'Nach der Belastung: Erholung', 'Po naporu: obnova', 'Po wysiłku: regeneracja'),
  body: T(
    'Prema deklaraciji, Honey Bee Power gel uzima se nakon vježbanja ili fizičkog napora: 1 obrok od 40 g. Odobrena tvrdnja kaže da ugljikohidrati pridonose oporavku normalne funkcije mišića nakon vrlo intenzivnog ili dugotrajnog vježbanja, uz ukupno 4 g ugljikohidrata po kilogramu tjelesne težine iz svih izvora, u dozama, u prva 4 sata (najkasnije 6 sati). Jedan gel daje 29–32,8 g; ostatak dolazi iz hrane i napitaka.',
    'According to the label, the Honey Bee Power gel is taken after exercise or physical exertion: 1 serving of 40 g. The authorised claim says carbohydrates contribute to the recovery of normal muscle function after very intensive or long-lasting exercise, with a total of 4 g of carbohydrate per kilogram of body weight from all sources, in doses, within the first 4 hours (no later than 6 hours). One gel provides 29–32.8 g; the rest comes from food and drinks.',
    'Laut Etikett wird das Honey Bee Power Gel nach dem Training oder der Belastung eingenommen: 1 Portion zu 40 g. Die zugelassene Angabe besagt, dass Kohlenhydrate zur Wiederherstellung der normalen Muskelfunktion nach sehr intensiver oder langer Belastung beitragen, bei insgesamt 4 g Kohlenhydraten pro Kilogramm Körpergewicht aus allen Quellen, in Dosen, in den ersten 4 Stunden (spätestens nach 6 Stunden). Ein Gel liefert 29–32,8 g; der Rest kommt aus Essen und Getränken.',
    'Po deklaraciji se gel Honey Bee Power uživa po vadbi ali telesnem naporu: 1 obrok po 40 g. Odobrena trditev pravi, da ogljikovi hidrati prispevajo k obnovitvi normalnega delovanja mišic po zelo intenzivni ali dolgotrajni vadbi, ob skupno 4 g ogljikovih hidratov na kilogram telesne mase iz vseh virov, v odmerkih, v prvih 4 urah (najpozneje v 6 urah). En gel da 29–32,8 g; preostanek pride iz hrane in napitkov.',
    'Według etykiety żel Honey Bee Power przyjmuje się po ćwiczeniach lub wysiłku: 1 porcja 40 g. Dopuszczone oświadczenie mówi, że węglowodany przyczyniają się do przywrócenia prawidłowej funkcji mięśni po bardzo intensywnym lub długotrwałym wysiłku, przy łącznym spożyciu 4 g węglowodanów na kilogram masy ciała ze wszystkich źródeł, w dawkach, w ciągu pierwszych 4 godzin (najpóźniej 6 godzin). Jeden żel dostarcza 29–32,8 g; reszta pochodzi z jedzenia i napojów.',
  ),
}

const DURING_GENERAL: SportSection = {
  title: T('Tijekom napora: opće smjernice', 'During exercise: general guidance', 'Während der Belastung: allgemeine Orientierung', 'Med naporom: splošne smernice', 'W trakcie wysiłku: ogólne wskazówki'),
  body: T(
    'Za napore od oko 1 do 2,5 sata opće smjernice navode 30–60 g ugljikohidrata na sat, a za dulje napore do 90 g na sat, iz bilo kojeg izvora (Thomas i sur., 2016). Za napore kraće od sat vremena ugljikohidrati tijekom napora obično nisu potrebni. Količinu i vrstu hrane uvijek prvo isprobaj na treningu.',
    'For efforts of about 1 to 2.5 hours, general guidance lists 30–60 g of carbohydrate per hour, and up to 90 g per hour for longer efforts, from any source (Thomas et al., 2016). For efforts under an hour, carbohydrate during exercise is usually not needed. Always try the amount and type of food in training first.',
    'Für Belastungen von etwa 1 bis 2,5 Stunden nennen allgemeine Empfehlungen 30–60 g Kohlenhydrate pro Stunde, für längere bis zu 90 g pro Stunde, aus beliebiger Quelle (Thomas et al., 2016). Unter einer Stunde sind Kohlenhydrate während der Belastung meist nicht nötig. Menge und Art immer zuerst im Training testen.',
    'Za napore od približno 1 do 2,5 ure splošne smernice navajajo 30–60 g ogljikovih hidratov na uro, za daljše do 90 g na uro, iz katerega koli vira (Thomas in sod., 2016). Pri naporih, krajših od ure, ogljikovi hidrati med naporom običajno niso potrebni. Količino in vrsto hrane vedno najprej preizkusi na treningu.',
    'Przy wysiłku trwającym około 1–2,5 godziny ogólne wskazówki podają 30–60 g węglowodanów na godzinę, a przy dłuższym do 90 g na godzinę, z dowolnego źródła (Thomas i in., 2016). Przy wysiłku krótszym niż godzina węglowodany w trakcie zwykle nie są potrzebne. Ilość i rodzaj jedzenia zawsze najpierw sprawdź na treningu.',
  ),
}

const CAFFEINE_FAQ = {
  q: T('Smijem li gel ako sam osjetljiv na kofein?', 'Can I take the gel if I am sensitive to caffeine?', 'Darf ich das Gel nehmen, wenn ich koffeinempfindlich bin?', 'Ali lahko uživam gel, če sem občutljiv na kofein?', 'Czy mogę przyjąć żel, jeśli jestem wrażliwy na kofeinę?'),
  a: T(
    'Ne. Gel sadrži ekstrakt sjemenki guarane, a deklaracija kaže da se ne preporučuje osobama osjetljivim na kofein, trudnicama, dojiljama i djeci.',
    'No. The gel contains guarana seed extract, and the label says it is not recommended for people sensitive to caffeine, pregnant or breastfeeding women, or children.',
    'Nein. Das Gel enthält Guaranasamenextrakt, und laut Etikett wird es koffeinempfindlichen Personen, Schwangeren, Stillenden und Kindern nicht empfohlen.',
    'Ne. Gel vsebuje izvleček semen guarane, deklaracija pa pravi, da ni priporočljiv za osebe, občutljive na kofein, nosečnice, doječe matere in otroke.',
    'Nie. Żel zawiera ekstrakt z nasion guarany, a etykieta mówi, że nie zaleca się go osobom wrażliwym na kofeinę, kobietom w ciąży, karmiącym piersią i dzieciom.',
  ),
}

const DURING_FAQ = {
  q: T('Mogu li gel uzeti tijekom utrke?', 'Can I take the gel during a race?', 'Kann ich das Gel während des Rennens nehmen?', 'Ali lahko gel uživam med tekmo?', 'Czy mogę przyjąć żel w trakcie zawodów?'),
  a: T(
    'Deklaracija gela navodi upotrebu nakon vježbanja ili napora. Upotrebu tijekom napora provjeravamo s proizvođačem i dok je on ne potvrdi, ne preporučujemo je.',
    'The gel label states use after exercise or exertion. We are checking use during exercise with the producer and do not recommend it until they confirm it.',
    'Das Etikett nennt die Einnahme nach dem Training oder der Belastung. Die Einnahme während der Belastung klären wir mit dem Hersteller und empfehlen sie bis zur Bestätigung nicht.',
    'Deklaracija gela navaja uporabo po vadbi ali naporu. Uporabo med naporom preverjamo pri proizvajalcu in je do potrditve ne priporočamo.',
    'Etykieta żelu podaje stosowanie po ćwiczeniach lub wysiłku. Stosowanie w trakcie wysiłku sprawdzamy u producenta i do potwierdzenia go nie zalecamy.',
  ),
}

export const SPORT_PAGES: SportPage[] = [
  {
    slug: 'trcanje',
    title: T('Trčanje', 'Running', 'Laufen', 'Tek', 'Bieganie'),
    metaTitle: T('Energetski gel i prehrana za trčanje', 'Energy gel and nutrition for running', 'Energiegel und Ernährung beim Laufen', 'Energijski gel in prehrana za tek', 'Żel energetyczny i odżywianie w bieganiu'),
    metaDescription: T(
      'Prehrana za 10 km, polumaraton i maraton: ugljikohidrati prije, tijekom i nakon trčanja, uz izvore. Honey Bee Power gel od meda za oporavak nakon napora.',
      'Nutrition for 10 km, half marathon and marathon: carbohydrate before, during and after running, with sources. Honey Bee Power honey gel for recovery.',
      'Ernährung für 10 km, Halbmarathon und Marathon: Kohlenhydrate vor, während und nach dem Lauf, mit Quellen. Honey Bee Power Honiggel zur Erholung.',
      'Prehrana za 10 km, polmaraton in maraton: ogljikovi hidrati pred tekom, med njim in po njem, z viri. Gel Honey Bee Power iz medu za obnovo.',
      'Odżywianie na 10 km, półmaraton i maraton: węglowodany przed, w trakcie i po biegu, ze źródłami. Żel Honey Bee Power z miodu na regenerację.',
    ),
    lead: T(
      'Na 10 km treba drugačije jesti nego na maratonu. Ovdje su opće smjernice po duljini utrke, s izvorom, i mjesto Honey Bee Power gela u tome: nakon napora, kako piše na deklaraciji.',
      'A 10 km race needs different eating from a marathon. Here is general guidance by race distance, with a source, and where the Honey Bee Power gel fits: after exercise, as the label says.',
      'Für 10 km isst man anders als für einen Marathon. Hier die allgemeine Orientierung nach Distanz, mit Quelle, und wo das Honey Bee Power Gel hingehört: nach der Belastung, wie auf dem Etikett.',
      'Za 10 km se je drugače kot za maraton. Tu so splošne smernice glede na dolžino tekme, z virom, in mesto gela Honey Bee Power: po naporu, kot piše na deklaraciji.',
      'Na 10 km je się inaczej niż na maraton. Oto ogólne wskazówki według dystansu, ze źródłem, oraz miejsce żelu Honey Bee Power: po wysiłku, jak podaje etykieta.',
    ),
    image: '/images/events-web/event-12.jpg',
    imageAlt: T('Trkač s gelom Honey Bee Power na maratonu na Cipru', 'A runner with a Honey Bee Power gel at a marathon in Cyprus', 'Läufer mit einem Honey Bee Power Gel bei einem Marathon auf Zypern', 'Tekač z gelom Honey Bee Power na maratonu na Cipru', 'Biegacz z żelem Honey Bee Power na maratonie na Cyprze'),
    imagePosition: '50% 30%',
    sections: [
      {
        title: T('Po duljini utrke', 'By race distance', 'Nach Distanz', 'Glede na dolžino', 'Według dystansu'),
        body: T(
          '10 km traje većini rekreativaca manje od sat vremena, pa je dovoljan uobičajen obrok nekoliko sati prije i voda. Polumaraton traje oko 1,5 do 2,5 sata, a maraton i dulje, pa za njih vrijede smjernice za ugljikohidrate tijekom napora. Uoči duge utrke obroci bogati ugljikohidratima pomažu napuniti zalihe glikogena.',
          'For most recreational runners 10 km takes under an hour, so a normal meal a few hours before and water are enough. A half marathon takes about 1.5 to 2.5 hours, a marathon longer, so the guidance for carbohydrate during exercise applies. Before a long race, carbohydrate-rich meals help fill glycogen stores.',
          'Für die meisten Freizeitläufer dauern 10 km unter einer Stunde; eine normale Mahlzeit einige Stunden vorher und Wasser reichen. Ein Halbmarathon dauert etwa 1,5 bis 2,5 Stunden, ein Marathon länger, daher gilt die Orientierung für Kohlenhydrate während der Belastung. Vor einem langen Rennen helfen kohlenhydratreiche Mahlzeiten, die Glykogenspeicher zu füllen.',
          'Večini rekreativcev 10 km traja manj kot uro, zato zadostujeta običajen obrok nekaj ur prej in voda. Polmaraton traja približno 1,5 do 2,5 ure, maraton dlje, zato zanje veljajo smernice za ogljikove hidrate med naporom. Pred dolgo tekmo obroki, bogati z ogljikovimi hidrati, pomagajo napolniti zaloge glikogena.',
          'Dla większości amatorów 10 km to mniej niż godzina, więc wystarczy zwykły posiłek kilka godzin wcześniej i woda. Półmaraton trwa około 1,5–2,5 godziny, maraton dłużej, więc obowiązują wskazówki dotyczące węglowodanów w trakcie wysiłku. Przed długim biegiem posiłki bogate w węglowodany pomagają uzupełnić glikogen.',
        ),
      },
      DURING_GENERAL,
      RECOVERY_GEL,
    ],
    products: ['gel', 'isotonic'],
    faq: [DURING_FAQ, CAFFEINE_FAQ],
  },
  {
    slug: 'biciklizam',
    title: T('Biciklizam', 'Cycling', 'Radsport', 'Kolesarjenje', 'Kolarstwo'),
    metaTitle: T('Prehrana za bicikliste: gel i izotonik', 'Nutrition for cyclists: gel and isotonic', 'Ernährung im Radsport: Gel und Isotonic', 'Prehrana za kolesarje: gel in izotonik', 'Odżywianie kolarzy: żel i izotonik'),
    metaDescription: T(
      'Što jesti i piti na dugoj vožnji biciklom: ugljikohidrati po satu, tekućina ljeti i oporavak nakon vožnje. Honey Bee Power gel i izotonični napitak.',
      'What to eat and drink on a long ride: carbohydrate per hour, fluids in summer and recovery after the ride. Honey Bee Power gel and isotonic drink.',
      'Was man auf langen Radtouren isst und trinkt: Kohlenhydrate pro Stunde, Flüssigkeit im Sommer und Erholung danach. Honey Bee Power Gel und Isotonic.',
      'Kaj jesti in piti na dolgi vožnji s kolesom: ogljikovi hidrati na uro, tekočina poleti in obnova po vožnji. Gel in izotonik Honey Bee Power.',
      'Co jeść i pić na długiej jeździe: węglowodany na godzinę, płyny latem i regeneracja po jeździe. Żel i napój izotoniczny Honey Bee Power.',
    ),
    lead: T(
      'Vožnja od tri ili četiri sata troši više nego što se dan prije pojede. Plan po satu vožnje, tekućina po vrućini i oporavak navečer.',
      'A three- or four-hour ride uses more than you ate the day before. A plan per hour of riding, fluids in the heat and recovery in the evening.',
      'Eine Ausfahrt von drei oder vier Stunden verbraucht mehr, als man am Vortag gegessen hat. Plan pro Fahrstunde, Flüssigkeit bei Hitze und Erholung am Abend.',
      'Vožnja treh ali štirih ur porabi več, kot pojeste dan prej. Načrt na uro vožnje, tekočina v vročini in obnova zvečer.',
      'Jazda trwająca trzy lub cztery godziny zużywa więcej, niż zjadłeś dzień wcześniej. Plan na każdą godzinę jazdy, płyny w upale i regeneracja wieczorem.',
    ),
    image: '/images/hero/product-showcase-poster.jpg',
    imageAlt: T('Tri energetska gela Honey Bee Power: malina, limun i naranča', 'Three Honey Bee Power energy gels: raspberry, lemon and orange', 'Drei Honey Bee Power Energiegels: Himbeere, Zitrone und Orange', 'Trije energijski geli Honey Bee Power: malina, limona in pomaranča', 'Trzy żele energetyczne Honey Bee Power: malina, cytryna i pomarańcza'),
    sections: [
      {
        title: T('Plan po satu vožnje', 'A plan per hour of riding', 'Plan pro Fahrstunde', 'Načrt na uro vožnje', 'Plan na godzinę jazdy'),
        body: T(
          'Na vožnjama dužim od sat vremena jedi rano i redovito, ne tek kad osjetiš glad. Opće smjernice za 1 do 2,5 sata su 30–60 g ugljikohidrata na sat, a za dulje vožnje do 90 g na sat (Thomas i sur., 2016). Raspodijeli ih na manje porcije svakih 20 do 30 minuta.',
          'On rides longer than an hour, eat early and regularly, not only when you feel hungry. General guidance for 1 to 2.5 hours is 30–60 g of carbohydrate per hour, and up to 90 g per hour for longer rides (Thomas et al., 2016). Split it into smaller portions every 20 to 30 minutes.',
          'Bei Fahrten über eine Stunde früh und regelmäßig essen, nicht erst bei Hunger. Allgemeine Orientierung für 1 bis 2,5 Stunden: 30–60 g Kohlenhydrate pro Stunde, für längere Fahrten bis zu 90 g pro Stunde (Thomas et al., 2016). In kleine Portionen alle 20 bis 30 Minuten aufteilen.',
          'Na vožnjah, daljših od ure, jej zgodaj in redno, ne šele ko si lačen. Splošne smernice za 1 do 2,5 ure so 30–60 g ogljikovih hidratov na uro, za daljše vožnje do 90 g na uro (Thomas in sod., 2016). Razdeli jih na manjše obroke vsakih 20 do 30 minut.',
          'Na jazdach dłuższych niż godzina jedz wcześnie i regularnie, nie dopiero gdy poczujesz głód. Ogólne wskazówki dla 1–2,5 godziny to 30–60 g węglowodanów na godzinę, a dla dłuższych jazd do 90 g na godzinę (Thomas i in., 2016). Podziel je na mniejsze porcje co 20–30 minut.',
        ),
      },
      {
        title: T('Tekućina po vrućini', 'Fluids in the heat', 'Flüssigkeit bei Hitze', 'Tekočina v vročini', 'Płyny w upale'),
        body: T(
          'Koliko piti ovisi o vrućini, brzini i tome koliko se znojiš; opće smjernice preporučuju individualan plan, a ne fiksnu količinu. Važi se prije i poslije vožnje da vidiš koliko tekućine gubiš. Honey Bee Power izotonik ima 13,5 g ugljikohidrata u porciji od 15 g.',
          'How much to drink depends on the heat, the pace and how much you sweat; general guidance recommends an individual plan rather than a fixed amount. Weigh yourself before and after a ride to see how much fluid you lose. The Honey Bee Power isotonic drink has 13.5 g of carbohydrate per 15 g serving.',
          'Wie viel man trinkt, hängt von Hitze, Tempo und Schweißmenge ab; allgemeine Empfehlungen raten zu einem individuellen Plan statt einer festen Menge. Vor und nach der Fahrt wiegen, um den Flüssigkeitsverlust zu sehen. Das Honey Bee Power Isotonic hat 13,5 g Kohlenhydrate pro 15-g-Portion.',
          'Koliko piti, je odvisno od vročine, tempa in potenja; splošne smernice priporočajo individualen načrt namesto fiksne količine. Stehtaj se pred vožnjo in po njej, da vidiš izgubo tekočine. Izotonik Honey Bee Power ima 13,5 g ogljikovih hidratov v 15-gramskem obroku.',
          'Ile pić, zależy od upału, tempa i pocenia się; ogólne wskazówki zalecają indywidualny plan zamiast stałej ilości. Zważ się przed jazdą i po niej, by zobaczyć utratę płynów. Izotonik Honey Bee Power ma 13,5 g węglowodanów w porcji 15 g.',
        ),
      },
      RECOVERY_GEL,
    ],
    products: ['gel', 'isotonic'],
    faq: [DURING_FAQ, CAFFEINE_FAQ],
  },
  {
    slug: 'triatlon',
    title: T('Triatlon', 'Triathlon', 'Triathlon', 'Triatlon', 'Triathlon'),
    metaTitle: T('Prehrana za triatlon', 'Nutrition for triathlon', 'Ernährung im Triathlon', 'Prehrana za triatlon', 'Odżywianie w triathlonie'),
    metaDescription: T(
      'Prehrana za triatlon po disciplinama: što prije plivanja, na biciklu, u trčanju i nakon cilja. Opće smjernice s izvorima i Honey Bee Power za oporavak.',
      'Triathlon nutrition by discipline: before the swim, on the bike, on the run and after the finish. General guidance with sources.',
      'Triathlon-Ernährung nach Disziplin: vor dem Schwimmen, auf dem Rad, beim Laufen und nach dem Ziel. Allgemeine Orientierung mit Quellen.',
      'Prehrana za triatlon po disciplinah: pred plavanjem, na kolesu, med tekom in po cilju. Splošne smernice z viri in Honey Bee Power za obnovo.',
      'Odżywianie w triathlonie według dyscyplin: przed pływaniem, na rowerze, w biegu i po mecie. Ogólne wskazówki ze źródłami.',
    ),
    lead: T(
      'U plivanju se ne jede, na biciklu se jede najlakše, a u trčanju najteže. Zato se prehrana za triatlon planira po disciplinama.',
      'You cannot eat while swimming, eating is easiest on the bike and hardest on the run. That is why triathlon nutrition is planned by discipline.',
      'Beim Schwimmen isst man nicht, auf dem Rad am leichtesten, beim Laufen am schwersten. Deshalb plant man die Triathlon-Ernährung nach Disziplinen.',
      'Med plavanjem se ne je, na kolesu je najlažje, med tekom najtežje. Zato se prehrana za triatlon načrtuje po disciplinah.',
      'W pływaniu się nie je, na rowerze najłatwiej, w biegu najtrudniej. Dlatego odżywianie w triathlonie planuje się według dyscyplin.',
    ),
    image: '/images/found/triatlon.jpg',
    imageAlt: T('Gledatelji na plaži na startu plivanja triatlona', 'Spectators on the beach at a triathlon swim start', 'Zuschauer am Strand beim Schwimmstart eines Triathlons', 'Gledalci na plaži ob startu plavanja na triatlonu', 'Widzowie na plaży przy starcie pływania w triathlonie'),
    sections: [
      {
        title: T('Prije plivanja i na biciklu', 'Before the swim and on the bike', 'Vor dem Schwimmen und auf dem Rad', 'Pred plavanjem in na kolesu', 'Przed pływaniem i na rowerze'),
        body: T(
          'Zadnji veći obrok jedi nekoliko sati prije starta, da želudac bude miran u vodi. Na biciklu je najlakše jesti i piti, pa većina triatlonaca tu unosi najviše ugljikohidrata, prema općim smjernicama za trajanje napora (Thomas i sur., 2016).',
          'Eat your last larger meal a few hours before the start so your stomach is calm in the water. Eating and drinking is easiest on the bike, so most triathletes take in most of their carbohydrate there, following the general guidance for effort duration (Thomas et al., 2016).',
          'Die letzte größere Mahlzeit einige Stunden vor dem Start essen, damit der Magen im Wasser ruhig bleibt. Auf dem Rad isst und trinkt man am leichtesten, daher nehmen die meisten dort die meisten Kohlenhydrate auf, nach der allgemeinen Orientierung für die Belastungsdauer (Thomas et al., 2016).',
          'Zadnji večji obrok pojej nekaj ur pred startom, da bo želodec v vodi miren. Na kolesu je najlažje jesti in piti, zato večina triatloncev tam zaužije največ ogljikovih hidratov, po splošnih smernicah za trajanje napora (Thomas in sod., 2016).',
          'Ostatni większy posiłek zjedz kilka godzin przed startem, by żołądek był spokojny w wodzie. Na rowerze najłatwiej jeść i pić, więc większość triathlonistów tam przyjmuje najwięcej węglowodanów, zgodnie z ogólnymi wskazówkami dla czasu wysiłku (Thomas i in., 2016).',
        ),
      },
      DURING_GENERAL,
      RECOVERY_GEL,
    ],
    products: ['gel', 'isotonic'],
    faq: [DURING_FAQ, CAFFEINE_FAQ],
  },
  {
    slug: 'planinarenje',
    title: T('Planinarenje', 'Hiking', 'Wandern', 'Pohodništvo', 'Turystyka górska'),
    metaTitle: T('Prehrana za planinarenje: što spakirati', 'Nutrition for hiking: what to pack', 'Ernährung beim Wandern: was einpacken', 'Prehrana za pohodništvo: kaj vzeti', 'Odżywianie w górach: co spakować'),
    metaDescription: T(
      'Što spakirati za cjelodnevni uspon: hrana za usput, voda po vrućini i oporavak nakon silaska. Honey Bee Power gel od 40 g lako stane u džep ruksaka.',
      'What to pack for a full-day climb: food on the way, water in the heat and recovery after the descent. A 40 g Honey Bee Power gel fits a pack pocket.',
      'Was man für eine Tagestour einpackt: Proviant, Wasser bei Hitze und Erholung nach dem Abstieg. Ein 40-g-Gel passt in jede Rucksacktasche.',
      'Kaj vzeti na celodnevni vzpon: hrana za na pot, voda v vročini in obnova po sestopu. Gel 40 g gre v žep nahrbtnika.',
      'Co spakować na całodzienne wyjście: jedzenie na trasę, woda w upale i regeneracja po zejściu. Żel 40 g mieści się w kieszeni plecaka.',
    ),
    lead: T(
      'Uspon na Velebit ili Papuk traje satima, a hrana se nosi na leđima. Manje, lagane porcije i dovoljno vode važniji su od velikog obroka na vrhu.',
      'A climb on Velebit or Papuk takes hours, and the food is carried on your back. Small, light portions and enough water matter more than a big meal at the top.',
      'Ein Aufstieg auf den Velebit oder Papuk dauert Stunden, das Essen trägt man auf dem Rücken. Kleine, leichte Portionen und genug Wasser zählen mehr als eine große Mahlzeit am Gipfel.',
      'Vzpon na Velebit ali Papuk traja ure, hrano pa nosiš na hrbtu. Majhni, lahki obroki in dovolj vode so pomembnejši od velikega obroka na vrhu.',
      'Wejście na Velebit czy Papuk trwa godzinami, a jedzenie niesiesz na plecach. Małe, lekkie porcje i dość wody liczą się bardziej niż duży posiłek na szczycie.',
    ),
    image: '/images/found/velebit.jpg',
    imageAlt: T('Vrhovi Sjevernog Velebita: Kuk od Rujica, Crni vrh i Orlov kuk', 'Peaks of Northern Velebit: Kuk od Rujica, Crni vrh and Orlov kuk', 'Gipfel des Nördlichen Velebit: Kuk od Rujica, Crni vrh und Orlov kuk', 'Vrhovi Severnega Velebita: Kuk od Rujica, Crni vrh in Orlov kuk', 'Szczyty Północnego Velebitu: Kuk od Rujica, Crni vrh i Orlov kuk'),
    sections: [
      {
        title: T('Što spakirati', 'What to pack', 'Was einpacken', 'Kaj vzeti', 'Co spakować'),
        body: T(
          'Za cjelodnevni izlet: vodu (više nego što misliš da ti treba, posebno ljeti i na kršu), hranu koja se ne kvari i ne mrvi, te nešto slano. Pojedi manju porciju svakih sat do dva hoda. Prazno pakiranje uvijek nosi natrag u dolinu.',
          'For a full day out: water (more than you think, especially in summer and on karst), food that keeps and does not crumble, and something salty. Eat a small portion every one to two hours of walking. Always carry empty packaging back down.',
          'Für einen ganzen Tag: Wasser (mehr als gedacht, besonders im Sommer und im Karst), haltbares Essen, das nicht krümelt, und etwas Salziges. Alle ein bis zwei Gehstunden eine kleine Portion essen. Leere Verpackungen immer wieder mit ins Tal nehmen.',
          'Za celodnevni izlet: vodo (več, kot misliš, posebej poleti in na krasu), hrano, ki se ne pokvari in ne drobi, ter nekaj slanega. Vsako uro do dve hoje pojej manjši obrok. Prazno embalažo vedno odnesi nazaj v dolino.',
          'Na całodzienne wyjście: wodę (więcej, niż myślisz, zwłaszcza latem i na krasie), jedzenie, które się nie psuje i nie kruszy, oraz coś słonego. Co godzinę lub dwie marszu zjedz małą porcję. Puste opakowania zawsze znoś do doliny.',
        ),
      },
      RECOVERY_GEL,
    ],
    products: ['gel', 'isotonic'],
    faq: [CAFFEINE_FAQ],
  },
  {
    slug: 'teretana',
    title: T('Teretana', 'Gym', 'Fitnessstudio', 'Fitnes', 'Siłownia'),
    metaTitle: T('Whey protein s medom nakon treninga', 'Whey protein with honey after training', 'Whey Protein mit Honig nach dem Training', 'Whey protein z medom po treningu', 'Białko whey z miodem po treningu'),
    metaDescription: T(
      'Koliko proteina nakon treninga i kada, uz izvor. Honey Bee Power whey sa sušenim medom i stevijom, oko 22 g proteina u 33 g. Sadrži mlijeko.',
      'How much protein after training and when: general guidance with a source. Honey Bee Power whey with dried honey and stevia, about 22 g protein per 33 g.',
      'Wie viel Protein nach dem Training und wann: allgemeine Orientierung mit Quelle. Honey Bee Power Whey mit Honig und Stevia, etwa 22 g Protein pro 33 g.',
      'Koliko beljakovin po treningu in kdaj: splošne smernice z virom. Whey Honey Bee Power s sušenim medom in stevio, približno 22 g beljakovin v 33 g.',
      'Ile białka po treningu i kiedy: ogólne wskazówki ze źródłem. Whey Honey Bee Power z suszonym miodem i stewią, około 22 g białka w 33 g.',
    ),
    lead: T(
      'Nakon treninga snage mišićima treba protein, raspoređen kroz dan. Jedna porcija Honey Bee Power wheyja od 33 g ima oko 22 g proteina.',
      'After strength training, muscles need protein spread through the day. One 33 g serving of Honey Bee Power whey has about 22 g of protein.',
      'Nach dem Krafttraining brauchen die Muskeln Protein, über den Tag verteilt. Eine 33-g-Portion Honey Bee Power Whey hat etwa 22 g Protein.',
      'Po treningu moči mišice potrebujejo beljakovine, razporejene čez dan. En 33-gramski obrok whey proteina Honey Bee Power ima približno 22 g beljakovin.',
      'Po treningu siłowym mięśnie potrzebują białka rozłożonego w ciągu dnia. Jedna porcja 33 g whey Honey Bee Power ma około 22 g białka.',
    ),
    image: '/images/events-web/event-5.jpg',
    imageAlt: T('Grupa sportaša na treningu u dvorani', 'A group of athletes training in a gym', 'Eine Gruppe Sportler beim Training in der Halle', 'Skupina športnikov na treningu v dvorani', 'Grupa sportowców na treningu na sali'),
    sections: [
      {
        title: T('Koliko proteina i kada', 'How much protein and when', 'Wie viel Protein und wann', 'Koliko beljakovin in kdaj', 'Ile białka i kiedy'),
        body: T(
          'Opće smjernice navode oko 0,3 g proteina po kilogramu tjelesne težine po obroku, nakon treninga i svakih nekoliko sati kroz dan, odnosno ukupno 1,2–2,0 g po kilogramu dnevno za sportaše (Thomas i sur., 2016). Za osobu od 70 kg to je oko 21 g po obroku.',
          'General guidance lists about 0.3 g of protein per kilogram of body weight per meal, after training and every few hours through the day, or 1.2–2.0 g per kilogram per day in total for athletes (Thomas et al., 2016). For a 70 kg person that is about 21 g per meal.',
          'Allgemeine Empfehlungen nennen etwa 0,3 g Protein pro Kilogramm Körpergewicht pro Mahlzeit, nach dem Training und alle paar Stunden über den Tag, insgesamt 1,2–2,0 g pro Kilogramm täglich für Sportler (Thomas et al., 2016). Bei 70 kg sind das etwa 21 g pro Mahlzeit.',
          'Splošne smernice navajajo približno 0,3 g beljakovin na kilogram telesne mase na obrok, po treningu in vsakih nekaj ur čez dan, oziroma skupno 1,2–2,0 g na kilogram dnevno za športnike (Thomas in sod., 2016). Za osebo s 70 kg je to približno 21 g na obrok.',
          'Ogólne wskazówki podają około 0,3 g białka na kilogram masy ciała na posiłek, po treningu i co kilka godzin w ciągu dnia, łącznie 1,2–2,0 g na kilogram dziennie dla sportowców (Thomas i in., 2016). Dla osoby 70 kg to około 21 g na posiłek.',
        ),
      },
      {
        title: T('Što je u wheyju', 'What is in the whey', 'Was im Whey steckt', 'Kaj je v whey proteinu', 'Co jest w whey'),
        body: T(
          'Whey protein (91–92 %), sušeni med (6 %), stevija i guma arabika, prema prezentaciji proizvođača; deklaraciju na pakiranju potvrđujemo. Sadrži mlijeko. Nije zaslađen samo medom.',
          'Whey protein (91–92%), dried honey (6%), stevia and gum arabic, according to the producer’s presentation; we are confirming the pack label. Contains milk. It is not sweetened with honey alone.',
          'Molkenprotein (91–92 %), getrockneter Honig (6 %), Stevia und Gummi arabicum, laut Präsentation des Herstellers; das Etikett wird geprüft. Enthält Milch. Nicht nur mit Honig gesüßt.',
          'Sirotkine beljakovine (91–92 %), sušen med (6 %), stevia in arabski gumi, po predstavitvi proizvajalca; deklaracijo preverjamo. Vsebuje mleko. Ni sladkan samo z medom.',
          'Białko serwatkowe (91–92%), suszony miód (6%), stewia i guma arabska, według prezentacji producenta; etykietę weryfikujemy. Zawiera mleko. Nie jest słodzone wyłącznie miodem.',
        ),
      },
    ],
    products: ['whey'],
    faq: [
      {
        q: T('Je li whey zaslađen samo medom?', 'Is the whey sweetened only with honey?', 'Ist das Whey nur mit Honig gesüßt?', 'Ali je whey sladkan samo z medom?', 'Czy whey jest słodzone tylko miodem?'),
        a: T('Ne. Sadrži sušeni med (6 %) i steviju.', 'No. It contains dried honey (6%) and stevia.', 'Nein. Es enthält getrockneten Honig (6 %) und Stevia.', 'Ne. Vsebuje sušen med (6 %) in stevio.', 'Nie. Zawiera suszony miód (6%) i stewię.'),
      },
    ],
  },
  {
    slug: 'ekipni-sportovi',
    title: T('Ekipni sportovi', 'Team sports', 'Mannschaftssport', 'Ekipni športi', 'Sporty drużynowe'),
    metaTitle: T('Prehrana za rukomet, nogomet i košarku', 'Nutrition for handball and football', 'Ernährung für Hand-, Fuß- und Basketball', 'Prehrana za rokomet, nogomet in košarko', 'Odżywianie w piłce ręcznej i nożnej'),
    metaDescription: T(
      'Prehrana na turnirima i utakmicama: što između utakmica, tekućina na poluvremenu i oporavak. Honey Bee Power za klubove, uz B2B upit.',
      'Nutrition at tournaments and matches: what to eat between games, fluids at half-time and recovery afterwards. Honey Bee Power for clubs.',
      'Ernährung bei Turnieren und Spielen: zwischen den Spielen, Flüssigkeit in der Halbzeit und Erholung danach. Honey Bee Power für Vereine.',
      'Prehrana na turnirjih in tekmah: kaj med tekmami, tekočina ob polčasu in obnova po njih. Honey Bee Power za klube, z B2B povpraševanjem.',
      'Odżywianie na turniejach i meczach: co między meczami, płyny w przerwie i regeneracja po. Honey Bee Power dla klubów, z zapytaniem B2B.',
    ),
    lead: T(
      'Turnir s dvije ili tri utakmice u danu prazni zalihe brže od jednog treninga. Između utakmica i nakon njih ugljikohidrati i tekućina važni su koliko i taktika.',
      'A tournament with two or three games in a day empties stores faster than a single training session. Between games and after them, carbohydrate and fluids matter as much as tactics.',
      'Ein Turnier mit zwei oder drei Spielen an einem Tag leert die Speicher schneller als ein Training. Zwischen den Spielen und danach zählen Kohlenhydrate und Flüssigkeit so viel wie Taktik.',
      'Turnir z dvema ali tremi tekmami na dan izprazni zaloge hitreje kot en trening. Med tekmami in po njih so ogljikovi hidrati in tekočina pomembni kot taktika.',
      'Turniej z dwoma lub trzema meczami dziennie opróżnia zapasy szybciej niż jeden trening. Między meczami i po nich węglowodany i płyny są tak ważne jak taktyka.',
    ),
    image: '/images/events-web/event-24.jpg',
    imageAlt: T('Rukometna ekipa u dresovima Honey Bee Power', 'A handball team in Honey Bee Power shirts', 'Eine Handballmannschaft in Honey Bee Power Trikots', 'Rokometna ekipa v dresih Honey Bee Power', 'Drużyna piłki ręcznej w koszulkach Honey Bee Power'),
    imagePosition: '50% 40%',
    sections: [
      {
        title: T('Između utakmica', 'Between games', 'Zwischen den Spielen', 'Med tekmami', 'Między meczami'),
        body: T(
          'Kad je između utakmica nekoliko sati, pojedi lagan obrok s ugljikohidratima i popij dovoljno tekućine. Kad je razmak kratak, birajte manje porcije koje ne opterećuju želudac. Za klubove: veće količine gelova, izotonika i wheyja naručuju se B2B upitom.',
          'When there are several hours between games, eat a light carbohydrate meal and drink enough fluid. When the gap is short, choose smaller portions that sit lightly. For clubs: larger quantities of gels, isotonic drinks and whey are ordered with a B2B enquiry.',
          'Bei mehreren Stunden zwischen den Spielen eine leichte kohlenhydratreiche Mahlzeit essen und genug trinken. Bei kurzen Pausen kleinere, gut verträgliche Portionen wählen. Für Vereine: größere Mengen per B2B-Anfrage.',
          'Ko je med tekmami nekaj ur, pojej lahek obrok z ogljikovimi hidrati in popij dovolj tekočine. Ko je razmik kratek, izberite manjše obroke, ki ne obremenijo želodca. Za klube: večje količine se naročijo z B2B povpraševanjem.',
          'Gdy między meczami jest kilka godzin, zjedz lekki posiłek z węglowodanami i pij dość płynów. Gdy przerwa jest krótka, wybierz mniejsze, lekkie porcje. Dla klubów: większe ilości zamawia się zapytaniem B2B.',
        ),
      },
      RECOVERY_GEL,
    ],
    products: ['gel', 'isotonic', 'whey'],
    faq: [DURING_FAQ, CAFFEINE_FAQ],
  },
]

export function getSportPage(slug: string): SportPage | undefined {
  return SPORT_PAGES.find((s) => s.slug === slug)
}
