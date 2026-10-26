/**
 * Tuđe fotografije (otvorene licence), preuzete skriptom assets.mjs iz skilla
 * design-taste-frontend. Izvor: public/images/found/credits.json.
 * Svaka stoji uz sastojak ili pčelinjak kao ilustracija, nikad kao proizvod klijenta.
 */
export interface PhotoCredit {
  file: string
  title: string
  creator: string | null
  license: string
  licenseUrl: string
  page: string
}

export const PHOTO_CREDITS: PhotoCredit[] = [
  {
    file: "/images/found/sace.jpg",
    title: "Pangetkon, Shan Hills, Myanmar, Fresh organic honey in honeycombs",
    creator: "Vyacheslav Argenberg",
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0",
    page: "https://commons.wikimedia.org/wiki/File:Pangetkon,_Shan_Hills,_Myanmar,_Fresh_organic_honey_in_honeycombs.jpg",
  },
  {
    file: "/images/found/malina.jpg",
    title: "Framboise Margy 3",
    creator: "Vassil",
    license: "public domain",
    licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
    page: "https://commons.wikimedia.org/wiki/File:Framboise_Margy_3.jpg",
  },
  {
    file: "/images/found/guarana.jpg",
    title: "Flickr - ggallice - Guarana (1)",
    creator: "Geoff Gallice from Gainesville, FL, USA",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0",
    page: "https://commons.wikimedia.org/wiki/File:Flickr_-_ggallice_-_Guarana_(1).jpg",
  },
  {
    file: "/images/found/naranca.jpg",
    title: "Ambersweet oranges",
    creator: null,
    license: "public domain",
    licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
    page: "https://commons.wikimedia.org/wiki/File:Ambersweet_oranges.jpg",
  },
  {
    file: "/images/found/pcelinjak-1939.jpg",
    title: "Pasieka Stanisława Brzósko",
    creator: null,
    license: "CC0",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/deed.en",
    page: "https://commons.wikimedia.org/wiki/File:Pasieka_Stanis%C5%82awa_Brz%C3%B3sko.jpg",
  },
  {
    file: "/images/found/na-pcelinjaku-1905.jpg",
    title: "Aleksander-augustynowicz-na-pasici-1905",
    creator: "Aleksander Augustynowicz",
    license: "public domain",
    licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
    page: "https://commons.wikimedia.org/wiki/File:Aleksander-augustynowicz-na-pasici-1905.jpg",
  },
  {
    file: "/images/found/med-zlica.jpg",
    title: "Honey dripper load",
    creator: "Matankic",
    license: "CC0",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/deed.en",
    page: "https://commons.wikimedia.org/wiki/File:Honey_dripper_load.jpg",
  },
  {
    file: "/images/found/sol.jpg",
    title: "Sea-salt-minemaio",
    creator: null,
    license: "public domain",
    licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
    page: "https://commons.wikimedia.org/wiki/File:Sea-salt-minemaio.jpg",
  },
  {
    file: "/images/found/limun.jpg",
    title: "Lemon, Lemon tree, Florence, Italy",
    creator: "Vyacheslav Argenberg",
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0",
    page: "https://commons.wikimedia.org/wiki/File:Lemon,_Lemon_tree,_Florence,_Italy.jpg",
  },
]
