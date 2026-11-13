# Vizuální QA — 13. 11. 2026

## Round 1 — vlastní skutečný screenshot v Chromiu (1440×1000)

- **VERIFIED:** hlavička 70 px, hero 526 px, investiční sekce 350 px, patička 160 px. Všech šest fotografií se načte. Žádný horizontální overflow a žádné JS exception.
- **VERIFIED:** referenční skladba je zachována: navbar, velké dvouřádkové hero, CTA+ikona videa, tři důvěryhodnostní body, karta investice, pět karet větví.
- **OPRAVENO:** odstíny fade gradientu v hero a měřítko hlavní architektury, info karta posunuta níže, sekce karet posunuta pod titulek dle předlohy.
- **OPRAVENO:** původně vyčnívající světlé okraje u pěti fotografií byly odstraněny.

## Round 2 — mobil a tablet

- **VERIFIED:** 390 a 320 px bez horizontálního přesahu, menu i všechny větve funkční.
- **OPRAVENO:** na šířce 320 px byl hamburger schovaný kvůli příliš široké značce; logo a jazykový přepínač jsou nyní kompaktnější.
- **OPRAVENO:** při 768–980 px se pod textem hrdiny překrýval panel emise a video CTA; panel je nyní řazen do vlastního řádku. Geometricky ověřeno bez překryvu.
- **VERIFIED:** keyboard Escape uzavírá modály, přihlášení a odhlášení, filtrování katalogu, přepínání CZ/EN, všechna tlačítka.

## Zbývající rozdíly proti obrázku

1. Nově vytvořené fotografie jsou podobné tématem a kompozicí, ne identické s původními.
2. Původní přesný font nelze z obrázku ověřit; použité lokální systémové fonty mají drobné rozdíly v šířce.
3. Footer a skryté interaktivní modaly jsou rekonstruované/doplněné mimo viditelnou předlohu.

Vizuální QA proběhla s vlastními screenshoty po vykreslení stránky v Chromiu pomocí dočasné testovací HTML reprezentace; kvůli globální administrátorské politice Chromia nebylo možné navigovat přímo na file:// ani http://localhost. Dočasná testovací reprezentace inlinovala obsah lokálních souborů pro účely prohlížečového testu; distribuovaný web nadále používá běžné relativní soubory a neobsahuje base64 obrázky.
