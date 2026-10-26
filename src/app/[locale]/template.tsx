/** Prijelaz između stranica: sadržaj novo otvorene stranice ulazi odozdo uz pojavljivanje. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-in">{children}</div>
}
