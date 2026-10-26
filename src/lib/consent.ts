/** Ključ privole u localStorage (dijele ga traka i analitika). */
export const CONSENT_KEY = 'hbp_cookie_consent'

/**
 * Skripta u <head> prije iscrtavanja: ako je odluka već spremljena, sakrij
 * traku privole (klasa na <html>), pa se sadržaj ne pomiče nakon učitavanja.
 */
export const CONSENT_INLINE_SCRIPT = `try{if(localStorage.getItem('${CONSENT_KEY}')!==null)document.documentElement.classList.add('consent-done')}catch(e){}`
