import type { Locale } from '@/types'
import { LEGAL_ENTITY } from '@/lib/cjenik-data'

/**
 * Pravne stranice. Tekst treba pregledati pravnik prije objave (nisu pravni savjet).
 * Obvezujuća je hrvatska verzija; engleska je prijevod, a de/sl/pl prikazuju englesku
 * uz napomenu.
 */

export interface LegalSection {
  title: string
  paragraphs: string[]
  list?: string[]
}

export interface LegalDoc {
  title: string
  metaDescription: string
  updated: string
  intro: string
  sections: LegalSection[]
}

type LegalLang = 'hr' | 'en'
export type LegalSlug = 'uvjeti-koristenja' | 'politika-privatnosti' | 'dostava-i-placanje' | 'pravo-na-povrat'

const E = LEGAL_ENTITY
const SELLER_HR = `${E.nazivTvrtke}, ${E.adresa}, ${E.postanskiBroj} ${E.grad}, OIB ${E.oib}, matični broj obrta ${E.maticniBroj}`
const SELLER_EN = `${E.nazivTvrtke}, ${E.adresa}, ${E.postanskiBroj} ${E.grad}, Croatia, tax ID (OIB) ${E.oib}, registration number ${E.maticniBroj}`

const DOCS: Record<LegalSlug, Record<LegalLang, LegalDoc>> = {
  'uvjeti-koristenja': {
    hr: {
      title: 'Uvjeti prodaje i korištenja',
      metaDescription: 'Uvjeti narudžbe Honey Bee Power proizvoda: prodavatelj Planet Bio, narudžba na upit, cijene iz cjenika, plaćanje pouzećem ili virmanom, pravo na raskid.',
      updated: '2026-10-26',
      intro: 'Ovi uvjeti uređuju korištenje stranice honeybeepowerhr.com i narudžbe Honey Bee Power proizvoda.',
      sections: [
        { title: 'Prodavatelj', paragraphs: [`Prodavatelj je ${SELLER_HR}. Kontakt: info@planetbio.hr, +385 97 709 7962. Proizvođač Honey Bee Power proizvoda je P.P.H. APIMAR, Baranów, Poljska; Planet Bio je distributer za Hrvatsku.`] },
        { title: 'Kako se naručuje', paragraphs: ['Na stranici se ne plaća. Kupac proizvode dodaje u upit i šalje ga WhatsAppom ili e-mailom. Prodavatelj odgovara ponudom s ukupnom cijenom, troškom dostave i načinom plaćanja. Ugovor je sklopljen kad kupac prihvati ponudu.'] },
        { title: 'Cijene', paragraphs: ['Cijene na stranici jednake su cijenama iz službenog cjenika (stranica Cjenik), u eurima. Trošak dostave nije uključen i navodi se u ponudi prije sklapanja ugovora.'] },
        { title: 'Plaćanje', paragraphs: ['Plaćanje je moguće pouzećem ili virmanom (uplatom na račun prodavatelja) prema dogovoru u ponudi. Plaćanje karticom trenutačno nije moguće.'] },
        { title: 'Dostava', paragraphs: ['Dostavljamo na području Republike Hrvatske, obično 1–3 radna dana nakon potvrde narudžbe. Za dostavu izvan Hrvatske pošaljite upit.'] },
        { title: 'Pravo na jednostrani raskid ugovora', paragraphs: ['Potrošač ima pravo raskinuti ugovor sklopljen na daljinu u roku od 14 dana od primitka robe, bez navođenja razloga. Pojedinosti i iznimke opisane su na stranici Povrat i reklamacije.'] },
        { title: 'Reklamacije', paragraphs: ['Prigovor se može podnijeti pisano na info@planetbio.hr ili na adresu prodavatelja. Na pisani prigovor odgovaramo pisano u roku od 15 dana od primitka.'] },
        { title: 'Podaci o proizvodima', paragraphs: ['Sastav, nutritivne vrijednosti, način primjene i upozorenja preneseni su s deklaracija na pakiranjima. Mjerodavna je deklaracija na proizvodu koji ste primili. Dodaci prehrani i sportska prehrana nisu zamjena za raznovrsnu prehranu.'] },
      ],
    },
    en: {
      title: 'Terms of sale and use',
      metaDescription: 'Terms for ordering Honey Bee Power products: seller Planet Bio, order by enquiry, list prices, cash on delivery or bank transfer, right of withdrawal.',
      updated: '2026-10-26',
      intro: 'These terms govern the use of honeybeepowerhr.com and orders of Honey Bee Power products.',
      sections: [
        { title: 'Seller', paragraphs: [`The seller is ${SELLER_EN}. Contact: info@planetbio.hr, +385 97 709 7962. Honey Bee Power products are made by P.P.H. APIMAR, Baranów, Poland; Planet Bio is the distributor for Croatia.`] },
        { title: 'How to order', paragraphs: ['Nothing is paid on the website. The customer adds products to an enquiry and sends it by WhatsApp or e-mail. The seller replies with an offer stating the total price, shipping cost and payment method. The contract is concluded when the customer accepts the offer.'] },
        { title: 'Prices', paragraphs: ['Prices on the website match the official price list (Price list page), in euros. Shipping is not included and is stated in the offer before the contract is concluded.'] },
        { title: 'Payment', paragraphs: ['Payment is by cash on delivery or bank transfer, as agreed in the offer. Card payment is currently not available.'] },
        { title: 'Shipping', paragraphs: ['We ship within Croatia, usually 1–3 working days after order confirmation. For shipping outside Croatia, please send an enquiry.'] },
        { title: 'Right of withdrawal', paragraphs: ['Consumers may withdraw from a distance contract within 14 days of receiving the goods, without giving a reason. Details and exceptions are on the Returns and complaints page.'] },
        { title: 'Complaints', paragraphs: ['Complaints can be sent in writing to info@planetbio.hr or to the seller’s address. We reply in writing within 15 days of receipt.'] },
        { title: 'Product information', paragraphs: ['Ingredients, nutrition, directions and warnings are copied from the pack labels. The label on the product you receive prevails. Food supplements and sports nutrition are not a substitute for a varied diet.'] },
      ],
    },
  },
  'politika-privatnosti': {
    hr: {
      title: 'Politika privatnosti',
      metaDescription: 'Koje podatke Planet Bio prikuplja preko stranice Honey Bee Power, zašto, koliko ih čuva, kome ih daje i koja su vaša prava, uz pritužbu AZOP-u.',
      updated: '2026-10-26',
      intro: `Voditelj obrade osobnih podataka je ${SELLER_HR}, e-mail info@planetbio.hr.`,
      sections: [
        { title: 'Koje podatke prikupljamo', paragraphs: ['Samo ono što nam pošaljete:'], list: ['Upit iz košarice: ime i prezime, broj telefona i popis proizvoda.', 'Kontakt obrazac: ime i prezime, e-mail, broj telefona (neobavezno) i poruka.', 'B2B obrazac: naziv kluba ili tvrtke, kontakt osoba, e-mail, telefon, vrsta suradnje, proizvodi i poruka.', 'Kolačići: izbor o kolačićima i sadržaj košarice spremaju se u vašem pregledniku.'] },
        { title: 'Svrha i pravna osnova', paragraphs: ['Podatke iz upita i obrazaca koristimo da odgovorimo i pripremimo ponudu (radnje prije sklapanja ugovora i izvršenje ugovora, čl. 6. st. 1. t. (b) Opće uredbe o zaštiti podataka). Podatke potrebne za račune čuvamo zbog zakonske obveze (t. (c)). Analitičke i marketinške kolačiće koristimo samo uz vašu privolu (t. (a)), koju možete povući u bilo kojem trenutku.'] },
        { title: 'Kome se podaci daju', paragraphs: ['Podatke ne prodajemo. Za rad stranice koristimo pružatelje usluga koji ih obrađuju u naše ime:'], list: ['Cloudflare (smještaj stranice)', 'Sanity (spremanje upita)', 'Resend (slanje e-mail obavijesti o upitima)', 'WhatsApp (Meta), ako upit pošaljete WhatsAppom', 'Uz privolu: Google Tag Manager i Google Analytics, Microsoft Clarity, Meta Pixel', 'Dostavna služba, kad šaljemo narudžbu'] },
        { title: 'Koliko dugo čuvamo podatke', paragraphs: ['Podatke s računa čuvamo onoliko koliko propisuju porezni i računovodstveni propisi.'] },
        { title: 'Vaša prava', paragraphs: ['Imate pravo na pristup, ispravak, brisanje, ograničenje obrade, prenosivost podataka, prigovor na obradu i povlačenje privole. Zahtjev pošaljite na info@planetbio.hr; odgovaramo u roku od mjesec dana.', 'Imate pravo podnijeti pritužbu Agenciji za zaštitu osobnih podataka (AZOP), Selska cesta 136, 10000 Zagreb, azop.hr.'] },
        { title: 'Kolačići', paragraphs: ['Nužni kolačići pamte košaricu i vaš izbor o kolačićima. Analitički (Google Analytics, Microsoft Clarity) i marketinški (Meta Pixel) učitavaju se samo ako odaberete „Prihvati sve”. Izbor možete promijeniti preko poveznice „Postavke kolačića” u podnožju.'] },
      ],
    },
    en: {
      title: 'Privacy policy',
      metaDescription: 'What data Planet Bio collects through the Honey Bee Power website, why, how long it is kept, who receives it and your rights, including complaints.',
      updated: '2026-10-26',
      intro: `The data controller is ${SELLER_EN}, e-mail info@planetbio.hr.`,
      sections: [
        { title: 'What we collect', paragraphs: ['Only what you send us:'], list: ['Basket enquiry: full name, phone number and the list of products.', 'Contact form: full name, e-mail, phone number (optional) and message.', 'B2B form: club or company name, contact person, e-mail, phone, type of partnership, products and message.', 'Cookies: your cookie choice and basket contents are stored in your browser.'] },
        { title: 'Purpose and legal basis', paragraphs: ['We use enquiry and form data to reply and prepare an offer (pre-contractual steps and performance of a contract, Art. 6(1)(b) GDPR). Data needed for invoices is kept to meet legal obligations (Art. 6(1)(c)). Analytics and marketing cookies are used only with your consent (Art. 6(1)(a)), which you can withdraw at any time.'] },
        { title: 'Who receives the data', paragraphs: ['We do not sell data. We use service providers that process it on our behalf:'], list: ['Cloudflare (hosting)', 'Sanity (storing enquiries)', 'Resend (e-mail notifications about enquiries)', 'WhatsApp (Meta), if you send the enquiry by WhatsApp', 'With consent: Google Tag Manager and Google Analytics, Microsoft Clarity, Meta Pixel', 'The courier, when we ship an order'] },
        { title: 'How long we keep data', paragraphs: ['Invoice data is kept as long as tax and accounting rules require.'] },
        { title: 'Your rights', paragraphs: ['You have the right of access, rectification, erasure, restriction, data portability, objection and withdrawal of consent. Send requests to info@planetbio.hr; we reply within one month.', 'You may lodge a complaint with the Croatian Personal Data Protection Agency (AZOP), Selska cesta 136, 10000 Zagreb, azop.hr.'] },
        { title: 'Cookies', paragraphs: ['Necessary cookies remember the basket and your cookie choice. Analytics (Google Analytics, Microsoft Clarity) and marketing (Meta Pixel) cookies load only if you choose “Accept all”. You can change your choice via “Cookie settings” in the footer.'] },
      ],
    },
  },
  'dostava-i-placanje': {
    hr: {
      title: 'Dostava i plaćanje',
      metaDescription: 'Dostava Honey Bee Power proizvoda iz Našica za 1–3 radna dana nakon potvrde. Plaćanje pouzećem ili virmanom; trošak dostave navodimo u ponudi.',
      updated: '2026-10-26',
      intro: 'Narudžba ide na upit: nakon što pošaljete upit, javljamo se s ponudom u kojoj su ukupna cijena, trošak dostave i način plaćanja.',
      sections: [
        { title: 'Dostava', paragraphs: ['Šaljemo iz skladišta u Krndijskoj 4 u Našicama, na području Republike Hrvatske, obično za 1–3 radna dana nakon potvrde narudžbe.', 'Trošak dostave navodimo u ponudi prije potvrde narudžbe.'] },
        { title: 'Plaćanje', paragraphs: ['Pouzećem (plaćanje dostavljaču pri preuzimanju) ili virmanom na račun obrta Planet Bio prije slanja. Plaćanje karticom na stranici trenutačno nije moguće.'] },
        { title: 'Klubovi i trgovine', paragraphs: ['Za veće količine pošaljite B2B upit; dostavu i plaćanje dogovaramo prema količini.'] },
      ],
    },
    en: {
      title: 'Shipping and payment',
      metaDescription: 'Honey Bee Power ships from Našice within 1–3 working days of confirmation. Pay by cash on delivery or bank transfer; shipping cost is stated in the offer.',
      updated: '2026-10-26',
      intro: 'Orders work by enquiry: after you send an enquiry, we reply with an offer stating the total price, shipping cost and payment method.',
      sections: [
        { title: 'Shipping', paragraphs: ['We ship from our warehouse at Krndijska 4 in Našice, within Croatia, usually 1–3 working days after order confirmation.', 'We state the shipping cost in the offer before the order is confirmed.'] },
        { title: 'Payment', paragraphs: ['Cash on delivery (pay the courier on receipt) or bank transfer to Planet Bio before shipping. Card payment on the website is currently not available.'] },
        { title: 'Clubs and shops', paragraphs: ['For larger quantities, send a B2B enquiry; shipping and payment are agreed according to quantity.'] },
      ],
    },
  },
  'pravo-na-povrat': {
    hr: {
      title: 'Povrat i reklamacije',
      metaDescription: 'Pravo na jednostrani raskid ugovora u 14 dana, kako vratiti proizvod, iznimke za otvorene proizvode i kako podnijeti reklamaciju.',
      updated: '2026-10-26',
      intro: 'Kao potrošač imate pravo raskinuti ugovor sklopljen na daljinu i pravo na reklamaciju zbog nedostataka.',
      sections: [
        { title: 'Raskid u 14 dana', paragraphs: ['Ugovor možete raskinuti u roku od 14 dana od dana kad ste primili robu, bez navođenja razloga. Dovoljno je poslati jasnu izjavu na info@planetbio.hr ili na adresu Krndijska 4, 31500 Našice.', 'Robu vratite najkasnije 14 dana od izjave o raskidu. Izravni trošak povrata snosite vi. Uplaćeni iznos, uključujući osnovni trošak dostave, vraćamo u roku od 14 dana od primitka izjave, a možemo ga zadržati dok ne primimo robu.'] },
        { title: 'Iznimke', paragraphs: ['Pravo na raskid ne vrijedi za zapečaćenu robu koja nije prikladna za vraćanje zbog zaštite zdravlja ili higijenskih razloga ako je otvorena nakon isporuke (npr. otvorena vrećica gela ili posuda proteina).'] },
        { title: 'Reklamacije', paragraphs: ['Ako proizvod ima nedostatak ili je oštećen u dostavi, javite nam se na info@planetbio.hr s fotografijom i brojem narudžbe. Na pisani prigovor odgovaramo pisano u roku od 15 dana.'] },
      ],
    },
    en: {
      title: 'Returns and complaints',
      metaDescription: 'The 14-day right of withdrawal, how to return a product, exceptions for opened products and how to make a complaint.',
      updated: '2026-10-26',
      intro: 'As a consumer you have the right to withdraw from a distance contract and to complain about defects.',
      sections: [
        { title: 'Withdrawal within 14 days', paragraphs: ['You may withdraw within 14 days of receiving the goods, without giving a reason. Send a clear statement to info@planetbio.hr or to Krndijska 4, 31500 Našice.', 'Return the goods no later than 14 days after your statement. You bear the direct cost of return. We refund the amount paid, including standard shipping, within 14 days of receiving your statement, and may withhold it until we receive the goods.'] },
        { title: 'Exceptions', paragraphs: ['The right of withdrawal does not apply to sealed goods unsuitable for return for health or hygiene reasons once unsealed after delivery (e.g. an opened gel sachet or protein tub).'] },
        { title: 'Complaints', paragraphs: ['If a product is defective or damaged in transit, contact info@planetbio.hr with a photo and the order number. We reply in writing within 15 days.'] },
      ],
    },
  },
}

export function getLegalDoc(slug: LegalSlug, locale: Locale): { doc: LegalDoc; fallback: boolean } {
  const lang: LegalLang = locale === 'hr' ? 'hr' : 'en'
  return { doc: DOCS[slug][lang], fallback: locale !== 'hr' && locale !== 'en' }
}
