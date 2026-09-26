import { NextResponse } from 'next/server'

export async function GET() {
  const xslContent = `<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="html" encoding="UTF-8" indent="yes"/>

<xsl:template match="/">
  <html lang="hr">
  <head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Službeni Digitalni Cjenik | Planet Bio — Honey Bee Power</title>
    <style>
      :root {
        --bg-main: #0b0f19;
        --bg-card: #151c2c;
        --bg-row-alt: #1a2336;
        --border-color: #2a364f;
        --accent-amber: #f59e0b;
        --accent-glow: rgba(245, 158, 11, 0.15);
        --text-bright: #f8fafc;
        --text-muted: #94a3b8;
        --green-badge: #10b981;
        --orange-badge: #f97316;
      }
      
      * { box-sizing: border-box; margin: 0; padding: 0; }

      body {
        background-color: var(--bg-main);
        color: var(--text-bright);
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        padding: 24px;
        line-height: 1.5;
      }

      .container {
        max-width: 1200px;
        margin: 0 auto;
      }

      /* Header styling */
      .header-card {
        background: linear-gradient(135deg, #1e1b4b 0%, #151c2c 50%, #451a03 100%);
        border: 1px solid #78350f;
        border-radius: 20px;
        padding: 32px;
        margin-bottom: 28px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 30px var(--accent-glow);
        position: relative;
        overflow: hidden;
      }

      .header-card::before {
        content: "XML OFFICIAL";
        position: absolute;
        top: 20px;
        right: -35px;
        background: var(--accent-amber);
        color: #000;
        font-size: 11px;
        font-weight: 900;
        padding: 4px 40px;
        transform: rotate(45deg);
        letter-spacing: 1px;
      }

      .badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        background: rgba(245, 158, 11, 0.1);
        border: 1px solid rgba(245, 158, 11, 0.3);
        color: var(--accent-amber);
        padding: 6px 14px;
        border-radius: 50px;
        font-size: 12px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 12px;
      }

      h1 {
        font-size: 32px;
        font-weight: 900;
        background: linear-gradient(to right, #ffffff, #fef3c7, #f59e0b);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-bottom: 8px;
      }

      .company-details {
        color: var(--text-muted);
        font-size: 14px;
        margin-bottom: 24px;
      }

      /* Grid Stats */
      .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 16px;
        margin-bottom: 28px;
      }

      .stat-card {
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        border-radius: 14px;
        padding: 20px;
      }

      .stat-label {
        color: var(--text-muted);
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 4px;
      }

      .stat-value {
        font-size: 22px;
        font-weight: 800;
        color: var(--text-bright);
      }

      /* Table styling */
      .table-wrapper {
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      }

      table {
        width: 100%;
        border-collapse: collapse;
        text-align: left;
        font-size: 14px;
      }

      th {
        background: #0f172a;
        color: var(--accent-amber);
        font-size: 12px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        padding: 16px;
        border-bottom: 1px solid var(--border-color);
      }

      td {
        padding: 14px 16px;
        border-bottom: 1px solid var(--border-color);
        color: #e2e8f0;
      }

      tr:hover {
        background-color: rgba(245, 158, 11, 0.05);
      }

      .price-current {
        font-weight: 800;
        color: #38bdf8;
        font-size: 15px;
      }

      .price-anchor {
        color: var(--text-muted);
        text-decoration: line-through;
        font-size: 13px;
      }

      .status-badge {
        display: inline-block;
        padding: 4px 10px;
        border-radius: 6px;
        font-size: 11px;
        font-weight: 700;
      }

      .status-unchanged {
        background: rgba(16, 185, 129, 0.15);
        color: #34d399;
        border: 1px solid rgba(16, 185, 129, 0.3);
      }

      .status-changed {
        background: rgba(249, 115, 22, 0.15);
        color: #fb923c;
        border: 1px solid rgba(249, 115, 22, 0.3);
      }

      .ean-code {
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-size: 12px;
        color: var(--text-muted);
      }

      .footer-note {
        margin-top: 24px;
        padding: 16px;
        background: rgba(15, 23, 42, 0.6);
        border: 1px dashed var(--border-color);
        border-radius: 12px;
        font-size: 12px;
        color: var(--text-muted);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .actions {
        display: flex;
        gap: 12px;
        margin-top: 16px;
      }

      .btn {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: var(--accent-amber);
        color: #000;
        padding: 10px 18px;
        border-radius: 10px;
        font-weight: 700;
        font-size: 13px;
        text-decoration: none;
        transition: transform 0.2s, background 0.2s;
      }

      .btn:hover {
        background: #fbbf24;
        transform: translateY(-1px);
      }

      .btn-outline {
        background: transparent;
        border: 1px solid var(--border-color);
        color: var(--text-bright);
      }

      .btn-outline:hover {
        background: var(--border-color);
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header-card">
        <div class="badge">Službeni Digitalni Cjenik — RH 2026.</div>
        <h1><xsl:value-of select="//*[local-name()='pravnaOsoba']/*[local-name()='naziv']"/></h1>
        <div class="company-details">
          OIB: <strong><xsl:value-of select="//*[local-name()='pravnaOsoba']/*[local-name()='oib']"/></strong> | 
          MB: <strong><xsl:value-of select="//*[local-name()='pravnaOsoba']/*[local-name()='maticniBroj']"/></strong> | 
          Adresa: <xsl:value-of select="//*[local-name()='pravnaOsoba']/*[local-name()='adresa']"/>, 
          <xsl:value-of select="//*[local-name()='pravnaOsoba']/*[local-name()='postanskiBroj']"/>&#160;<xsl:value-of select="//*[local-name()='pravnaOsoba']/*[local-name()='grad']"/>
        </div>

        <div class="actions">
          <a href="/cjenik.xml?download=1" class="btn">Preuzmi .XML Dokument</a>
          <a href="/cjenik.csv?download=1" class="btn btn-outline">Preuzmi .CSV Tablicu</a>
          <a href="/cjenik" class="btn btn-outline">Idi na Web Stranicu Cjenika</a>
        </div>
      </div>

      <!-- Stats -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-label">Datum Ažuriranja</div>
          <div class="stat-value" style="font-size:16px; color:#f59e0b;">
            <xsl:value-of select="//*[local-name()='metapodaci']/*[local-name()='datumAzuriranja']"/>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Referentni Datum Sidrenja</div>
          <div class="stat-value" style="font-size:16px; color:#10b981;">
            <xsl:value-of select="//*[local-name()='metapodaci']/*[local-name()='referentniDatumSidrenja']"/>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Ukupno Stavki</div>
          <div class="stat-value">
            <xsl:value-of select="//*[local-name()='statistika']/*[local-name()='ukupnoProizvoda']"/>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Valuta</div>
          <div class="stat-value" style="color:#38bdf8;">EUR (€)</div>
        </div>
      </div>

      <!-- Table -->
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th style="width: 50px; text-align: center;">R.B.</th>
              <th>Naziv Proizvoda</th>
              <th>Vrsta</th>
              <th>Okus</th>
              <th>Pakiranje</th>
              <th>EAN Barkod</th>
              <th>Aktualna Cijena</th>
              <th>Sidrena Cijena (10.9.2026.)</th>
              <th style="text-align: center;">Status</th>
            </tr>
          </thead>
          <tbody>
            <xsl:for-each select="//*[local-name()='proizvod']">
              <tr>
                <td style="text-align: center; color: var(--text-muted); font-weight: 700;">
                  <xsl:value-of select="*[local-name()='rb']"/>
                </td>
                <td style="font-weight: 700;">
                  <xsl:value-of select="*[local-name()='naziv']"/>
                </td>
                <td>
                  <xsl:value-of select="*[local-name()='vrsta']"/>
                </td>
                <td style="color: #cbd5e1;">
                  <xsl:value-of select="*[local-name()='okus']"/>
                </td>
                <td style="color: #94a3b8; font-size: 13px;">
                  <xsl:value-of select="*[local-name()='pakiranje']"/>
                </td>
                <td class="ean-code">
                  <xsl:value-of select="*[local-name()='barkod']"/>
                </td>
                <td class="price-current">
                  <xsl:value-of select="*[local-name()='aktualnaCijenaEur']"/> &#8364;
                </td>
                <td class="price-anchor">
                  <xsl:value-of select="*[local-name()='sidrenaCijenaEur']"/> &#8364;
                </td>
                <td style="text-align: center;">
                  <xsl:choose>
                    <xsl:when select="*[local-name()='aktualnaCijenaEur'] = *[local-name()='sidrenaCijenaEur']">
                      <span class="status-badge status-unchanged">Sidrena cijena</span>
                    </xsl:when>
                    <xsl:otherwise>
                      <span class="status-badge status-changed">
                        <xsl:value-of select="*[local-name()='statusCijene']"/>
                      </span>
                    </xsl:otherwise>
                  </xsl:choose>
                </td>
              </tr>
            </xsl:for-each>
          </tbody>
        </table>
      </div>

      <div class="footer-note">
        <div>
          <strong>Pravna Napomena:</strong> Ovaj XML dokument ispunjava zakonske obveze strojno čitljivog cjenika s iroko prihvaćenim sidrenim cijenama od 10.9.2026. godine.
        </div>
        <div>
          Planet Bio &#169; 2026. Sva prava pridržana.
        </div>
      </div>
    </div>
  </body>
  </html>
</xsl:template>
</xsl:stylesheet>`

  return new NextResponse(xslContent, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}
