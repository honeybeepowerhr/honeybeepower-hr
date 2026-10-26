# Dopuna: drugi smjer „Noćni med” (zamjenjuje izgled opisan niže)

Klijent je odbacio prvi izgled (krem podloga, Bodoni, brutalne crne ploče). Izgled je u cijelosti zamijenjen; **funkcionalnost nije mijenjana** (košarica, upit preko WhatsAppa i e-maila, B2B, kalkulator, filtri, cjenik, prijevodi, SEO, preusmjeravanja). Opis smjera u odjeljku 1 niže vrijedi samo za povijest.

- **Smjer:** tamna topla crna podloga (`#0a0806`), krem tekst, jedan naglasak (jantar meda `#ffb71b`), boje okusa s pakiranja (limun, naranča, malina) i šesterokut s vrećice kao motiv. Fontovi: **Archivo** (varijabilna težina i širina) za naslove i **Figtree** za tekst, oba preko `next/font/google` s `latin-ext`. Zaobljene kartice (24 px), gumbi u obliku pilule.
- **Naslovnica:** uvod „Gel od meda.” u kojem je riječ „meda.” ispunjena fotografijom saća, tri vrećice gela s pravim fotografijama (poveznice na proizvode) i tri brojke s deklaracije; traka sastojaka koja klizi; sastav po okusu u karticama; kadar poleđine (nepromijenjen); proizvodi u tri kartice; tri ploče sporta; kalkulator oporavka u ploči; priča; „Na stazi” kao mozaik; cjenik; jantarna ploča za klubove; česta pitanja; podnožje s telefonom kao naslovom.
- **Dijeli se sve ostalo preko tokena** (`src/app/globals.css`): sve stranice (proizvodi, kategorije, cjenik, B2B, sport, vodiči, kontakt, košarica) dobile su novi izgled bez izmjene logike. Redovi proizvoda su zaobljene kartice u boji okusa.
- **Dodani tekstovi** (na svih 5 jezika, **čekaju provjeru izvornih govornika**): `home.hero.statHoney*`, `statCarbs*`, `statIngredients*`, `pouchesLabel`.
- **Performanse:** ulaz uvoda i glavne fotografije proizvoda prebačen na čisti CSS (prije ih je skrivao GSAP do hidracije); GSAP sloj učitava se tek nakon prvog iscrtavanja (`SectionMotion` je tanki wrapper, kod je u `SectionMotionImpl`); uklonjeni blur filteri.
- **Izmjereno (lokalno, `next start`, Lighthouse 12, mobilni profil sa simuliranim usporavanjem):** gel naranča **91** performanse / 100 / 100 / 92; naslovnica **67 do 71** (cilj 90 nije dostignut), pristupačnost 100, najbolje prakse 100, SEO 92 (canonical pokazuje na produkcijsku domenu). Bez usporavanja naslovnica ima **100** (LCP 1,3 s, TBT 40 ms), pa je razlika u simuliranom procesoru; sljedeći korak je smanjiti hidraciju naslovnice (kalkulator i podaci proizvoda su klijentski kod). Ponoviti na Cloudflare previewu.
- **Nije ponovljeno:** inspektor design-taste-frontend (skill nije dostupan u ovoj sesiji) i mjerenje na stranicama izvan naslovnice i proizvoda. Provjereno ručno snimkama zaslona na 1440 i 390 px (naslovnica, proizvod, kategorija, cjenik, B2B, sport, košarica, izbornik) i testom dodavanja u upit.
- **Uklonjeno:** stari ukrasi i polaroidi na „Na stazi” (zamijenjeni mozaikom); font Bodoni Moda i Jost.

# Izvještaj: redizajn honeybeepowerhr.com

Grana `redizajn` (od `hitni-popravci`). Ništa nije objavljeno ni poslano na GitHub. `main` nije diran: lokalni merge `hitni-popravci` → `main` blokirao je sustav dopuštenja, pa ga treba napraviti vlasnik.

## 1. Smjer i ideja

- **Smjer:** „The sentence is the layout” (design-taste-frontend, seed **1725151227**, sektor physical-product, ton bold). Fontovi Bodoni Moda (naslovi, težina 800–900, „brutalno” velika) i Jost (tekst), oba preko `next/font/google` s `latin-ext`.
- **Boje:** proporcije s lista (jedna podloga, crna slova, jedan naglasak), boje uzete iz proizvoda: neutralna svijetla podloga `#e6e3dd`, crna `#0b0b0a`, **boja meda `#eaa221` samo na glavnom gumbu**, boje okusa (limun `#f2d21b`, naranča `#f08a1c`, malina `#c3203f`) kao polja na stranicama proizvoda. Na zahtjev za „brutalniji” izgled: crna obrnuta polja, plakatne veličine, kvadratni rubovi, bez sjena i gradijenata.
- **Ideja:** „Na ovoj stranici deklaracija s tri ili četiri sastojka postaje rečenica u kojoj fotografije sastojaka stoje umjesto riječi.” (uvod „Gel od [saće] meda.”, izjava o sastavu sa sličicama meda, voća, guarane i soli, trake od 100 % po okusu).
- **Živi element:** kalkulator oporavka, **varijanta B** (4 g ugljikohidrata po kg, četiri doze u prva 4 sata, udio jednog gela, puni tekst odobrene tvrdnje i napomena da nije medicinski savjet; bez JavaScripta prikazuje tablicu smjernica). Varijanta A nije rađena dok proizvođač ne potvrdi upotrebu gela tijekom napora.
- **Odstupanja od lista smjera:** fotografije „Na stazi” stoje uz naslov, ne preko njega (kućno pravilo: ništa ne smije prekrivati naslov); traka u uvodu je kvadratna (nema zaobljenja, jedan radijus 0 na cijeloj stranici).

## 2. Stanje prije i poslije (inspektor design-taste-frontend)

| Stranica | Prije (FAIL / WARN) | Poslije, produkcijski build |
|---|---|---|
| Naslovnica | 15 / 5 | **0 FAIL**, 2 WARN (prikvačeni kadar poleđine i ploče s glagolima: namjerno, smjer ih traži) |
| Proizvod (gel naranča) | 15 / 6 | 1 FAIL „still-page” (vidi niže), 2 WARN |
| Vodič | 13 / 6 (stara adresa je davala 404) | 1 FAIL „still-page”, 1 WARN |

**FAIL „still-page” na uslužnim stranicama je artefakt ovog računala:** Windows ima isključene animacije, pa preglednik inspektora javlja `prefers-reduced-motion: reduce` i GSAP sloj (ispravno) ne radi. Uz izričito emuliran `no-preference` vlastita provjera izbroji 8–92 pomaknutih elemenata po stranici (naslovnica 92, proizvod 62, kategorija 29, sport 26, vodič 23, FAQ 24, cjenik 22, događaji 35; najmanje B2B 8 i kontakt 9). Inspektor treba ponoviti na računalu s uključenim animacijama.

Ostala mjerenja: `pnpm build:next` prolazi, `pnpm test` prolazi (21 datoteka, 112 testova), `pnpm lint` bez grešaka.

**Lighthouse (lokalno, `next start`, simulirani spori 4G):**

| | Performanse | Pristupačnost | Najbolje prakse | SEO |
|---|---|---|---|---|
| Naslovnica | 73 | 100 | 100 | 92 |
| Gel naranča | 87 | 100 | 100 | 92 |

Nije dostignuto 90+ za performanse: LCP je fotografija u uvodu (oko 4,7 s u simulaciji, lokalni poslužitelj optimizira sliku na prvi zahtjev). CLS je spušten s 0,19 na 0. SEO 92 je zbog `canonical` koji pokazuje na produkcijsku domenu dok se mjeri na localhostu. **Ponoviti Lighthouse na Cloudflare preview okruženju** (`pnpm preview`).

## 3. Što je napravljeno

**Faza 1 (grana `hitni-popravci`, commit 11089bb):** uklonjene lažne ocjene (podaci, tipovi, AggregateRating, zvjezdice, ReviewsTab; `/api/reviews` vraća 410); pravni podaci obrta iz `LEGAL_ENTITY` umjesto „d.o.o.” i lažnog OIB-a i MBS-a; uklonjeno „hrvatski brend”, „domaći med” i prijevodi; uklonjen osobni Gmail (primatelj obavijesti sada iz `INQUIRY_RECIPIENT_EMAIL`, zadano info@planetbio.hr); uklonjena usporedna tablica i brojevi uz Instagram; FAQ o steviji; sastav i upozorenje na gelovima; cijene gelova i izotonika iz cjenika; `inquiries-backup.json` izbačen iz praćenja.

**Redizajn (grana `redizajn`):** nova naslovnica; predložak proizvoda (glavna brojka, sastav, nutritivna tablica, poleđina, kofein i upozorenje, način primjene i tvrdnja s deklaracije, sportovi, FAQ, povezani proizvodi); kategorije s usporedbom okusa; popis proizvoda s filtrom po vrsti i sportu; 6 stranica po sportu; `/oporavak-nakon-treninga`; 4 vodiča (3 stara prerađena, 1 novi); naša priča; B2B s proizvodima i količinama; događaji; gdje kupiti; kontakt; FAQ (20 pitanja); pravne stranice; cjenik (iste funkcije, novi izgled); impressum s autorima fotografija; košarica i upit na novom dijalogu; GSAP animacije; slike za dijeljenje 1200 × 630; JSON-LD Organization, Product + Offer (bez ocjena), BreadcrumbList, FAQPage, Article; sitemap; 301 preusmjeravanja; README za Cloudflare.

**Preusmjeravanja 301:** `/aktivnosti` → `/dogadaji`, `/sportasi` → `/dogadaji` (bila je samo privremeno preusmjeravanje na aktivnosti), `/koliko-gelova-trebam` → `/oporavak-nakon-treninga`, tri stara vodiča → nove adrese; sve i s prefiksima `/en`, `/de`, `/sl`, `/pl`.

## 4. Uklonjene funkcije i datoteke

| Što | Zašto |
|---|---|
| Lažne ocjene, `ReviewsTab`, upis recenzija (`/api/reviews` → 410) | izmišljeni dokazi; čeka sustav provjerenih recenzija |
| `ComparisonTable` | napadala maltodekstrin i sadržavala netočne tvrdnje |
| `HeroSection`, `ProductLineSection`, `WhyHBPSection`, `SocialProofSection`, `InstagramFeed`, `ActivitiesGallery`, `B2BBlock` | zamijenjeni sekcijama iz smjera |
| `QuizSection` (kviz) | nije bio dovršen (20 % prije prvog odgovora); logika `features/quiz` i testovi ostaju. Prijedlog: ne vraćati, kalkulator ga zamjenjuje |
| `NewsletterSection` | nije imao polje za e-mail; `/api/newsletter` ostaje. Prijedlog: vratiti tek s pravim obrascem i privolom |
| Exit-intent prozor | nije imao komponentu, samo logiku (ostaje); prijedlog: ne uvoditi |
| `PartnerLogos` (logotipi klubova) | nema potvrđenog dopuštenja |
| `PresentationDownload` i poveznice na PDF prezentacije | PDF-ovi imaju pogrešne vrijednosti za malinu i osobni Gmail; datoteke ostaju u `public/presentations` |
| Ukrasi: `HexagonGrid`, `HexDivider`, `AmbientBackground`, `Spotlight`, `TiltCard`, `Marquee`, `CountUp`, `ScrollProgress`, `Reveal`, `useTilt`, `useMagnetic` | stari izgled, zamijenjen smjerom |
| Stare kartice i galerije proizvoda (`ProductCard`, `CatalogueGrid`, `CatalogueFilters`, `ProductInfo`, `ProductTabs`, `ProductGallery`, `VariantSwitcher` …), `GelDeclaration`, `ProductImageGallery` | zamijenjeni novim predloškom |
| shadcn `ui/*` (button, input, dialog, sheet, select, tabs …), `SocialIcons`, `ErrorBoundary` | nekorišteni nakon redizajna; dijalozi su na Radix Dialogu |
| `faq-data.ts`, `FAQClient`, `ShippingPaymentClient`, rute `/aktivnosti`, `/sportasi` | zamijenjeni (FAQ, pravni predložak, `/dogadaji` s 301) |

Izvorne fotografije nisu brisane; dodane su lagane kopije `public/images/events-web` (43 MB → 8,8 MB) i `public/images/products-web` (60 MB → 4 MB).

## 5. Popis [UPIŠI] (podaci koje treba dati klijent)

| Gdje | Što nedostaje |
|---|---|
| Stranice gelova, FAQ, vodič „Kada uzeti gel” | **količina kofeina po gelu (mg)** |
| Stranice izotonika, FAQ, kategorija | **puni sastav izotonika**, **način pripreme** |
| Izotonik naranča | porcija 15 g je izračunata iz vrijednosti na 100 g (stupac na fotografiji nečitljiv) |
| Whey (sve stranice) | podaci su iz prezentacije; **deklaracija wheyja** nije pregledana |
| Paketi od 10 gelova, paket izotonika sa shakerom | **cijena** (nisu u službenom cjeniku; u kodu 29,99 € i 31,99 € nisu prikazane) |
| B2B | **popusti i minimalna narudžba** |
| Uvjeti | **status PDV-a**, **tijelo za izvansudsko rješavanje sporova** |
| Dostava i plaćanje | **cijena dostave ili pravilo za besplatnu dostavu** |
| Privatnost | **rok čuvanja upita** |
| Događaji | **popis događaja s datumima** (sad je iskreno prazno stanje) |
| Vodiči | stvarni autor (sad „Honey Bee Power”) |

**Cijene:** prikazane su samo cijene iz službenog cjenika (gel 1,80 €, izotonik 500 g 8,00 €, 15 g 1,60 €, whey 700 g 38,00 €, 33 g 3,00 €, shaker 9,00 €). Kod je imao gel 2,49 € i izotonik 11,99 €; to je usklađeno s cjenikom.

## 6. Tuđe fotografije (izvor i licenca)

| Datoteka | Naslov | Autor | Licenca | Izvor |
|---|---|---|---|---|
| sace.jpg | Pangetkon, Shan Hills, Myanmar, Fresh organic honey in honeycombs | Vyacheslav Argenberg | CC BY 4.0 | commons.wikimedia.org/wiki/File:Pangetkon,_Shan_Hills,_Myanmar,_Fresh_organic_honey_in_honeycombs.jpg |
| med-zlica.jpg | Honey dripper load | Matankic | CC0 | commons.wikimedia.org/wiki/File:Honey_dripper_load.jpg |
| malina.jpg | Framboise Margy 3 | Vassil | javno vlasništvo | commons.wikimedia.org/wiki/File:Framboise_Margy_3.jpg |
| naranca.jpg | Ambersweet oranges | (USDA) | javno vlasništvo | commons.wikimedia.org/wiki/File:Ambersweet_oranges.jpg |
| limun.jpg | Lemon, Lemon tree, Florence, Italy | Vyacheslav Argenberg | CC BY 4.0 | commons.wikimedia.org/wiki/File:Lemon,_Lemon_tree,_Florence,_Italy.jpg |
| guarana.jpg | Flickr - ggallice - Guarana (1) | Geoff Gallice | CC BY 2.0 | commons.wikimedia.org/wiki/File:Flickr_-_ggallice_-_Guarana_(1).jpg |
| sol.jpg | Sea-salt-minemaio | nepoznat | javno vlasništvo | commons.wikimedia.org/wiki/File:Sea-salt-minemaio.jpg |
| pcelinjak-1939.jpg | Pasieka Stanisława Brzósko (1939) | nepoznat | CC0 | commons.wikimedia.org/wiki/File:Pasieka_Stanisława_Brzósko.jpg |
| na-pcelinjaku-1905.jpg | Na pasici (1905) | Aleksander Augustynowicz | javno vlasništvo | commons.wikimedia.org/wiki/File:Aleksander-augustynowicz-na-pasici-1905.jpg |
| triatlon.jpg | DHL Triathlon Mission Bay 2008 | Ingolfson | javno vlasništvo | commons.wikimedia.org/wiki/File:DHL_Triathlon_Mission_Bay_2008.jpg |
| velebit.jpg | Velebit 20250915 133901 HDR | Harald Hetzner | CC0 | commons.wikimedia.org/wiki/File:Velebit_20250915_133901_HDR.jpg |

Zapisi su u `public/images/found/credits.json`; zasluge su u podnožju („Autori fotografija”) i u impressumu. Nijedna se ne predstavlja kao proizvod ili ljudi klijenta (pčelinjaci su opisani kao arhivske slike). Stranica biciklizma koristi fotografiju proizvoda jer nema poštene slobodne fotografije biciklizma; zamijeniti vlastitom. Fontovi za slike za dijeljenje (Bodoni Moda, Jost) su OFL.

Vlastite fotografije (proizvodi, 25 s događaja, video) su klijentove; na njima su prepoznatljive osobe i klubovi: **potvrditi dopuštenje za objavu**.

## 7. Prije objave provjeriti

1. Spojiti `hitni-popravci` u `main` (vlasnik) i odlučiti o objavi hitnih popravaka.
2. **`inquiries-backup.json` je u povijesti gita** (commit 7bb5321): ako je repozitorij javan, podaci kupaca su izloženi; čišćenje povijesti je zaseban korak.
3. Postaviti `INQUIRY_RECIPIENT_EMAIL` (i po želji `B2B_RECIPIENT_EMAIL`) u Cloudflareu, inače upiti idu na info@planetbio.hr.
4. Pravni pregled: uvjeti, privatnost, povrat, zdravstvene tvrdnje i tekstovi vodiča i sportova (nutricionist).
5. Prijevodi EN, DE, SL, PL: pregled izvornih govornika (sav tekst označen u `redizajn/prijevodi/*.py`). Pravne stranice za DE, SL i PL prikazuju engleski tekst uz napomenu.
6. Proizvođač: upotreba gela tijekom napora (varijanta A kalkulatora), kofein, sastav izotonika, deklaracija wheyja.
7. Lighthouse i inspektor ponoviti na Cloudflare previewu, s uključenim animacijama.
8. Cjenik: arhiva od 30 dana i dalje samo nudi izbor datuma (kao i prije), ne prikazuje povijesne cijene.
9. Klijentova odluka o modelu kupnje (A, B ili C); sada je B (upit), jasno tako nazvan.

## 8. Alati

Tekstovi: `redizajn/prijevodi/*.py` → `python redizajn/prijevodi/merge.py`. Slike za dijeljenje: `redizajn/og/make_og.py`. Copy deck naslovnice: `redizajn/copy-deck-naslovnica.md`.
