# Zadatak: redizajn Honey Bee Power stranice

Prvo pročitaj `CLAUDE.md`, `PRODUCT.md` i `redizajn/podaci-deklaracije.json`. Radi fazu po fazu. Na mjestima označenim **STANI** pokaži mi rezultat i čekaj odgovor.

---

## Faza 0: priprema

1. Pokreni `git status`. Ako ima nespremljenih promjena, **STANI** i pitaj me što s njima.
2. `pnpm install`, zatim `pnpm dev` i provjeri da se stranica otvara na http://localhost:3000.
3. Pročitaj strukturu projekta i napiši mi u pet do deset redaka što si našao (rute, komponente naslovnice, gdje su podaci, što se koristi iz Sanityja, a što iz `src/lib`).

## Faza 1: hitni popravci (grana `hitni-popravci`, od `main`)

Ovo ide na sadašnju stranicu što prije, zato na zasebnu granu napravljenu od `main`:

1. Ukloni lažne ocjene: polja `reviewCount` i `averageRating` iz `src/lib/products-data.ts` i tipova, `AggregateRating` iz `src/lib/seo/schemas.ts`, prikaz zvjezdica na karticama i stranicama proizvoda, karticu recenzija na proizvodu. API za recenzije isključi dok ne postoji sustav provjerenih recenzija. Prilagodi testove.
2. Impressum, footer, uvjeti i privatnost: pravne podatke uzmi iz `LEGAL_ENTITY` u `src/lib/cjenik-data.ts` (obrt, ne d.o.o.). Ukloni OIB 12345678901 i MBS 030123456.
3. Na svim jezicima (`src/messages/*.json`, `COPY` u `src/app/[locale]/page.tsx`, podaci proizvoda i vodiča) ukloni „hrvatski brend”, „domaći med”, „domaći pčelinjaci” i njihove prijevode. Ispravno: proizvođač APIMAR iz Poljske, Planet Bio je distributer za Hrvatsku.
4. Ukloni osobnu Gmail adresu svugdje.
5. Ukloni usporednu tablicu s „generičkim gelovima” (`ComparisonTable`) i izmišljene brojeve uz Instagram objave.
6. FAQ: ispravi odgovor da se sve sladi samo medom (whey sadrži steviju).
7. Na stranicama gelova dodaj sastav s deklaracije i upozorenje: „Ne preporučuje se osobama osjetljivim na kofein, trudnicama, dojiljama i djeci.”
8. `pnpm build:next` i `pnpm test` moraju proći.

**STANI:** pokaži mi popis promjena. Objavu pokrećem ja ili ti, tek kad ti izričito kažem.

Zatim spoji `hitni-popravci` u `main` (kad odobrim) i napravi granu **`redizajn`** od `main`.

## Faza 2: kontekst i stanje prije

1. Pokreni skill **impeccable** (kontekst). `PRODUCT.md` je već napisan: potvrdi ga i ne izmišljaj ništa što u njemu nedostaje.
2. Po postupku za redizajn iz skilla **design-taste-frontend** snimi stanje prije: pokreni inspektor na lokalnoj stranici u `.taste-skill/before` za naslovnicu, jedan proizvod i jedan vodič.

## Faza 3: smjer i tekstovi (design-taste-frontend, koraci 1–5)

Ovo je redizajn: stack, rute, košarica, upiti i podaci ostaju; izgled i kompozicija su potpuno novi. Tailwind ostaje sustav stilova. Novi tokeni idu u `src/app/globals.css`, a stari ukrasi (`HexagonGrid`, `HexDivider`, `AmbientBackground`, `Spotlight`, `TiltCard`, `Marquee`, `CountUp`) zamjenjuju se kompozicijama iz smjera.

**Inventar (što ima samo ovaj klijent):**
- gel ima tri ili četiri sastojka: višecvjetni med (91–95,5 %), liofilizirano voće, ekstrakt sjemenki guarane i morska sol (malina bez soli)
- proizvođač APIMAR iz Baranówa u Poljskoj; med s poljskih pčelinjaka
- tri okusa s pravim bojama voća: limun, naranča, malina
- gel od 40 g s 29–32,8 g ugljikohidrata
- deklaracija na poleđini pakiranja (fotografije `*-zadnja.png` postoje)
- skladište u Krndijskoj 4 u Našicama, dostava 1–3 radna dana
- promo pult na Vukovarskom maratonu; klubovi RK NEXE, ŽRK Brod, KBK Impact Našice (suradnja nepotvrđena)
- 25 fotografija s događaja, video proizvoda

**Argument naslovnice (tvrdnja i dokaz, redom):**
1. Uvod: što je Honey Bee Power i što se može napraviti (gumb „Pogledaj proizvode”).
2. Sastav: tri ili četiri sastojka, ništa drugo (deklaracija, fotografije sastojaka).
3. Proizvodi: gel, izotonik, whey (prave fotografije i brojke po porciji).
4. Kalkulator (specifikacija niže).
5. Naša priča: od poljskih pčelinjaka do skladišta u Našicama.
6. Na stazi: prave fotografije s utrka i klubova.
7. Cjenik: proizvodi, pakiranja, cijene iz službenog cjenika.
8. Za klubove i trgovine: B2B poziv.
9. Česta pitanja.
10. Podnožje: kontakt kao glavni element.

**Smjer.** Dodijeli ga ovom naredbom (prilagodi putanju skilla):

```
node <skill>/scripts/draw.mjs --sector physical-product --brief "Honey-based energy gels, isotonic drinks and whey protein for runners, cyclists and sports clubs: three or four ingredients (91-95.5% multiflower honey from Polish apiaries, freeze-dried fruit, guarana, sea salt); distributed in Croatia from a warehouse in Nasice" --sections intro,showcase,how-it-works,about,gallery,list,cta,faq,footer --have photography,product-photo --tone bold --direction sentence-as-layout --seed 1725151227
```

U probnom izvlačenju ovo je dalo smjer „The sentence is the layout”: fontovi Bodoni Moda i Jost, uvod sa sličicama umetnutima u rečenicu, zadržan kadar proizvoda s tri udaljenosti, cjenik kao tablica desno, podnožje s telefonom kao naslovom. Ako tvoja verzija skilla izvuče nešto drugo, prihvati ono što izvuče.

**Fontovi:** preko `next/font/google`, s podskupovima `latin` i `latin-ext` (hrvatski i poljski znakovi). Zamjenjuju Barlow Condensed i Inter.

**Boje:** zadrži proporcije s lista, ali boje uzmi iz proizvoda (navedi to u izvještaju): crna slova, neutralna svijetla podloga, boja meda kao jedini naglasak na glavnom gumbu, boje okusa (limun, naranča, malina) kao polja na stranicama proizvoda.

**Ideja:** „Na ovoj stranici deklaracija s tri ili četiri sastojka postaje rečenica u kojoj fotografije sastojaka stoje umjesto riječi.”

**Tekstovi:** napiši cijeli tekst naslovnice na hrvatskom kao copy deck prije bilo kakvog koda, po pravilima iz `CLAUDE.md`.

**STANI:** pokaži mi dodijeljeni smjer, rečenicu ideje i copy deck naslovnice. Pitaj me i koju varijantu kalkulatora radimo (A ili B, niže).

## Faza 4: naslovnica i jedna stranica proizvoda

1. Izgradi naslovnicu po smjeru (design-taste-frontend, korak 6), s kalkulatorom.
2. Izgradi novi predložak stranice proizvoda i provjeri ga na **Energy gel naranča**:
   - naziv, okus, pakiranje, cijena iz službenog cjenika (ili `[UPIŠI]` dok se ne odluči), postojeći gumb za upit
   - glavna brojka velikim slovima: „31,2 g ugljikohidrata”
   - sastav s postocima i nutritivna tablica s deklaracije, fotografija poleđine pakiranja
   - odobrena tvrdnja i način primjene točno kako piše na deklaraciji, upozorenje za kofein, kofein `[UPIŠI]`
   - za koji sport (poveznice), 4–6 čestih pitanja, povezani proizvodi
   - bez ocjena i recenzija
3. Postojeća košarica i upit (WhatsApp i e-mail) ostaju i dobivaju novi izgled.
4. Pokreni inspektor skilla na 1440, 768 i 390 px, pogledaj snimke i popravi sve FAIL-ove.

**STANI:** pokaži mi snimke naslovnice i stranice proizvoda. Ovo ide klijentu na pregled.

## Faza 5: ostale stranice

Isti smjer, tokeni i predlošci. Susjedne sekcije ne smiju imati isti raspored.

- Sve stranice proizvoda (paketi od 10: vlastiti kratki tekst ili `canonical` na pojedinačni gel)
- Popis proizvoda s filtrom po kategoriji i sportu
- Sport: `/sport/trcanje`, `/sport/biciklizam`, `/sport/triatlon`, `/sport/planinarenje`, `/sport/teretana`, `/sport/ekipni-sportovi`. Postojeću `/sportasi` preusmjeri ili ukloni (napiši što je bila).
- Kalkulator kao zasebna stranica: `/koliko-gelova-trebam` (varijanta A) ili `/oporavak-nakon-treninga` (varijanta B)
- Vodiči: novi predložak (autor „Honey Bee Power” dok klijent ne potvrdi pravog, izvori, datum ažuriranja, česta pitanja); tri stara vodiča prepiši bez neodobrenih tvrdnji
- Naša priča (`/o-nama`), Za klubove i trgovine (`/b2b`), Događaji (`/dogadaji`, s `/aktivnosti` preusmjeriti; prazno stanje dok ne stigne popis), Gdje kupiti, Cjenik, FAQ, Kontakt, Dostava i plaćanje, Povrat i reklamacije, Uvjeti, Privatnost, Impressum
- Kviz i exit-intent prozor: predloži u izvještaju ostaju li (kviz na staroj stranici nije bio dovršen)
- Prijevodi: nove tekstove prevedi u `src/messages/en.json`, `de.json`, `sl.json`, `pl.json` i označi ih za provjeru

## Faza 6: animacije

1. `pnpm add gsap @gsap/react`.
2. Animacijski sloj po koraku 9 skilla design-taste-frontend, uz **gsap-core**, **gsap-timeline**, **gsap-scrolltrigger** i **gsap-react**: glavni trenutak sa smjera, ulazak elemenata sekcija, jedna slika u pokretu (postojeći video proizvoda), zadržani kadar proizvoda.
3. Mikroanimacije uz **transitions-dev**: gumbi, česta pitanja, košarica, promjena brojki u kalkulatoru.
4. Sve animacije poštuju `prefers-reduced-motion` (postoji `src/hooks/useReducedMotion.ts`), a sadržaj je vidljiv i bez JavaScripta.

## Faza 7: SEO i tehnika

1. Metapodaci po stranici (naslov do 60 znakova, opis do 155) i posebna slika za dijeljenje umjesto logotipa.
2. JSON-LD: Organization, Product + Offer (**bez AggregateRating i Review**), BreadcrumbList, FAQPage, Article.
3. `sitemap.ts` s novim rutama; preusmjeravanja 301 u `next.config.ts` (`redirects()`).
4. Optimizirane slike (neke fotografije događaja imaju 3–4 MB).
5. Ažuriraj `README.md`: objava na Cloudflareu preko OpenNexta, a ne na Vercelu.

## Faza 8: revizija

1. **impeccable** `audit` i `critique` na naslovnici, proizvodu, sportu i vodiču. Popravi ono što nađe.
2. Inspektor design-taste-frontend na produkcijskoj verziji (`pnpm build:next` pa `pnpm start`): 0 FAIL.
3. Lighthouse 90+ na naslovnici i stranici proizvoda. `pnpm test` prolazi.

## Faza 9: poliranje

**make-interfaces-feel-better**, **transitions-polish** i **gsap-performance**: detalji, tajming animacija, glatkoća na mobitelu.

## Faza 10: izvještaj

Napiši `redizajn/IZVJESTAJ.md`:
- dodijeljeni smjer (naziv i seed) i svaka promjena s razlogom
- rečenica ideje i kalkulator
- stanje prije i poslije (mjere inspektora)
- uklonjene funkcije i datoteke
- popis svih `[UPIŠI]` po stranicama
- svaka tuđa fotografija s izvorom i licencom
- što treba provjeriti prije objave

**STANI:** grana `redizajn` se ne spaja u `main` i ne objavljuje bez mog odobrenja.

---

## Specifikacija kalkulatora

Varijantu bira klijent (pitaj me u fazi 3). Do odgovora gradi **B**.

### Varijanta B: oporavak nakon treninga (u skladu s deklaracijom)

- **Unos:** tjelesna težina u kilogramima.
- **Izračun:** cilj je 4 g ugljikohidrata po kilogramu, iz svih izvora, u dozama, unutar 4 do 6 sati nakon vrlo intenzivnog ili dugotrajnog napora (uvjet iz odobrene tvrdnje na deklaraciji).
- **Prikaz:** ukupna količina ugljikohidrata (npr. 70 kg → 280 g), raspodjela u nekoliko doza kroz 4 do 6 sati, i koliko ugljikohidrata daje jedan gel (29–32,8 g ovisno o okusu). Jasno piše da gel pokriva samo dio, a ostatak dolazi iz hrane i napitaka.
- Uz rezultat uvijek: puni tekst odobrene tvrdnje i rečenica „Ovo je opća smjernica, a ne medicinski ni prehrambeni savjet.”

### Varijanta A: gelovi tijekom napora (samo ako proizvođač potvrdi)

- **Unos:** trajanje (sati i minute) i sport; okus nije obavezan (točni ugljikohidrati po okusu iz JSON-a).
- **Izračun** (Thomas, Erdman i Burke, *Nutrition and Athletic Performance*, Med Sci Sports Exerc 2016;48(3):543–568):

| Trajanje | Ugljikohidrati na sat | Prikaz |
| --- | --- | --- |
| do 45 min | nije potrebno | „Za ovako kratak napor gel ti ne treba. Dovoljna je voda.” |
| 45–75 min | malo ili ništa | „Najviše 1 gel, ako ti odgovara.” |
| 75 min – 2 h 30 min | 30–60 g | raspon gelova za cijelo trajanje |
| više od 2 h 30 min | do 90 g | raspon gelova, uz napomenu da veće količine treba isprobati na treningu |

- Broj gelova = (trajanje u satima × raspon g/h) ÷ ugljikohidrati po gelu, zaokruženo na cijeli gel; raspored kao vremenska crta.
- Kofein: kad `kofein_mg` nije `null`, prikaži ukupnu količinu; dok je `null`, prikaži upozorenje s deklaracije i `[UPIŠI: količina kofeina]`.
- Uz rezultat uvijek izvor smjernica i rečenica: „Ovo je opća smjernica, a ne medicinski ni prehrambeni savjet. Novu prehranu prvo isprobaj na treningu.”

### Za obje varijante

- Radi palcem na mobitelu i tipkovnicom; bez JavaScripta prikazuje tablicu smjernica.
- Gumb ispod rezultata dodaje gelove u postojeću košaricu (upit).
