# Honey Bee Power, honeybeepowerhr.com

Stranica za Honey Bee Power proizvode (proizvođač P.P.H. APIMAR, Poljska; distributer za Hrvatsku Planet Bio, obrt, Našice). Kupnja je na upit: košarica se šalje WhatsAppom ili e-mailom. Next.js 15, TypeScript strict, Tailwind CSS 4, next-intl, GSAP; objava na Cloudflare Workers preko OpenNexta.

---

## Tehnički stack

| Sloj | Tehnologija |
|---|---|
| Framework | Next.js 15 (App Router) |
| Jezik | TypeScript (strict mode) |
| Styling | Tailwind CSS 4 (tokeni u `src/app/globals.css`), GSAP + ScrollTrigger za animacije |
| Podaci | `src/lib` (proizvodi, deklaracije, cjenik, vodiči, sportovi); Sanity samo za spremanje upita |
| Plaćanje | nema plaćanja na stranici (upit); Stripe je u kodu, ali nije dovršen |
| E-mail | Resend (transakcijski), Mailchimp (newsletter) |
| Analytics | GA4 via GTM, Meta Pixel, Microsoft Clarity |
| Hosting | Cloudflare Workers preko OpenNexta (`@opennextjs/cloudflare`) |
| Jezici | HR (bez prefiksa), EN, DE, SL, PL |

---

## Lokalni razvoj

### Preduvjeti

- **Node.js** >= 20.x
- **pnpm** >= 9.x — instaliraj sa `npm install -g pnpm`

### Instalacija

```bash
# Kloniraj repozitorij
git clone <repo-url>
cd planetbio

# Instaliraj dependencije
pnpm install

# Kopiraj env varijable
cp .env.example .env.local

# Popuni .env.local s pravim vrijednostima (vidi sekciju ispod)

# Pokreni dev server
pnpm dev
```

Aplikacija će biti dostupna na [http://localhost:3000](http://localhost:3000).

### Ostale naredbe

```bash
pnpm build:next  # Next.js production build
pnpm start       # Pokreni production build lokalno
pnpm test        # Testovi (vitest)
pnpm lint        # ESLint provjera
pnpm preview     # OpenNext build i lokalni pregled u Workers okruženju
```

---

## Environment varijable

Sve varijable okruženja su definirane u `.env.example`. Kreiraj `.env.local` i popuni ih:

| Varijabla | Opis |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID (javni) |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset (npr. `production`) |
| `SANITY_API_TOKEN` | Sanity API token s write permissijama (server-side) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key (javni) |
| `STRIPE_SECRET_KEY` | Stripe secret key (server-side) |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `RESEND_API_KEY` | Resend API key za transakcijske emailove |
| `MAILCHIMP_API_KEY` | Mailchimp API key za newsletter |
| `MAILCHIMP_AUDIENCE_ID` | Mailchimp audience/list ID |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager container ID (npr. `GTM-XXXX`) |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Google Maps JavaScript API key |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel ID |
| `NEXT_PUBLIC_CLARITY_ID` | Microsoft Clarity project ID |
| `CORVUS_SHOP_ID` | Corvus Pay shop ID |
| `CORVUS_SECRET_KEY` | Corvus Pay secret key |
| `NEXT_PUBLIC_SITE_URL` | Puna adresa stranice (npr. `https://honeybeepowerhr.com`) |
| `INQUIRY_RECIPIENT_EMAIL` | Kamo stižu obavijesti o upitima i porukama (zadano `info@planetbio.hr`) |
| `B2B_RECIPIENT_EMAIL` | Kamo stižu B2B upiti (zadano isto kao gore) |

> ⚠️ Nikada ne commita `.env.local` u git — `.gitignore` ga automatski isključuje.

---

## Struktura projekta

```
planetbio/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── [locale]/                 # i18n routing (hr, en, de, sl)
│   │   │   ├── layout.tsx            # Locale root layout (fontovi, GTM, consent)
│   │   │   ├── page.tsx              # Homepage (ISR)
│   │   │   ├── proizvodi/            # Katalog i product pages
│   │   │   ├── narudzba/             # Checkout i potvrda narudžbe
│   │   │   ├── vodici/               # Blog / vodiči
│   │   │   ├── b2b/                  # B2B stranica i forma
│   │   │   ├── gdje-kupiti/          # Karta prodajnih mjesta
│   │   │   ├── sportasi/             # Profili sportaša
│   │   │   └── aktivnosti/           # Galerija aktivnosti
│   │   ├── api/                      # API Route Handlers
│   │   │   ├── checkout/route.ts
│   │   │   ├── webhooks/
│   │   │   │   ├── stripe/route.ts
│   │   │   │   └── sanity/route.ts
│   │   │   ├── newsletter/route.ts
│   │   │   ├── b2b/route.ts
│   │   │   ├── reviews/route.ts
│   │   │   ├── abandoned-cart/route.ts
│   │   │   └── feed/route.ts
│   │   ├── layout.tsx                # Root layout
│   │   └── page.tsx                  # Root page
│   ├── components/                   # UI komponente
│   │   ├── ui/                       # shadcn/ui primitivi
│   │   ├── layout/                   # Header, Footer, InfoBar
│   │   ├── home/                     # Hero, Quiz, Reviews, Newsletter
│   │   ├── product/                  # ProductCard, Gallery, Tabs, Reviews
│   │   ├── cart/                     # CartPanel, CartItem, CartUpsell
│   │   ├── checkout/                 # CheckoutForm, PaymentMethods
│   │   ├── blog/                     # ArticleCard, ArticleBody
│   │   ├── seo/                      # JsonLd, Hreflang, Canonical
│   │   └── analytics/                # GTM, ConsentBanner, PixelEvents
│   ├── features/                     # Domenske feature module
│   │   ├── cart/                     # Zustand store + logika košarice
│   │   ├── checkout/                 # Checkout state + Zod sheme
│   │   ├── quiz/                     # Quiz state + logika preporuka
│   │   ├── search/                   # Search overlay + filtriranje
│   │   └── i18n/                     # next-intl config + locale routing
│   ├── lib/                          # Klijenti i utility funkcije
│   │   ├── sanity/                   # Sanity client, queries, groq
│   │   ├── stripe/                   # Stripe client i helperi
│   │   ├── resend/                   # Email templati i send helperi
│   │   └── analytics/                # GTM push helperi
│   ├── types/
│   │   └── index.ts                  # Dijeljeni TypeScript tipovi
│   ├── messages/                     # next-intl prijevodi
│   │   ├── hr.json                   # Hrvatski (default)
│   │   ├── en.json                   # Engleski
│   │   ├── de.json                   # Njemački
│   │   └── sl.json                   # Slovenački
│   └── middleware.ts                 # next-intl locale routing
├── public/                           # Statički resursi (slike, fontovi)
├── .env.example                      # Primjer env varijabli
├── .env.local                        # Lokalne env varijable (nije u git)
├── .npmrc                            # pnpm konfiguracija
├── eslint.config.mjs                 # ESLint konfiguracija
├── next.config.ts                    # Next.js konfiguracija
├── package.json                      # Dependencije i skripte
└── tsconfig.json                     # TypeScript konfiguracija (strict: true)
```

---

## Jezici

Webshop podržava četiri jezika s URL strukturom:

| Jezik | URL prefiks |
|---|---|
| Hrvatski (default) | `/` |
| Engleski | `/en/` |
| Njemački | `/de/` |
| Slovenački | `/sl/` |

Implementirano kroz `next-intl` s middleware routing-om. Prijevodne datoteke se nalaze u `src/messages/`.

---

## Objava (Cloudflare Workers)

Stranica se objavljuje na Cloudflare Workers preko OpenNexta (`open-next.config.ts`, `wrangler.jsonc`).

```bash
pnpm preview   # build i lokalni pregled u Workers okruženju
pnpm deploy    # build i objava (samo uz odobrenje vlasnika)
```

Tajne varijable postavljaju se u Cloudflareu (`wrangler secret put IME`), a lokalno u `.dev.vars`. Slike se optimiziraju preko Cloudflare Images (binding `IMAGES`).

---

## Korisne poveznice

- [Next.js 15 dokumentacija](https://nextjs.org/docs)
- [next-intl dokumentacija](https://next-intl-docs.vercel.app/)
- [Sanity.io dokumentacija](https://www.sanity.io/docs)
- [Stripe dokumentacija](https://stripe.com/docs)
- [shadcn/ui komponente](https://ui.shadcn.com/)
