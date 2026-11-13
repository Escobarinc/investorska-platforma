# Investorská platforma — REPLICA

Funkční offline rekonstrukce webové stránky podle dodaného obrázku (13. 11. 2026).

## Spuštění

1. Rozbalte ZIP.
2. Otevřete `website/index.html` dvojklikem v Safari, Chromiu nebo jiném současném prohlížeči.
3. Není potřeba hosting, npm, internet, API, instalace ani další soubory.

## Interakce

- Hlavní navigace: rozbalovací nabídka pěti investičních větví.
- Výchozí CTA a položka Projekty: 12 ilustračních projektů, vyhledávání a filtrování podle typu.
- Pět karet: smysluplné podrobnosti v modálním okně a návaznost na projekty.
- Jak to funguje: textový čtyřkrokový průvodce. Původní dvouminutové video nebylo dodáno.
- CZ/EN: přepnutí základního obsahu úvodní stránky; modály jsou záměrně v češtině.
- Vstup pro členy: pouze lokální demo, ukládá e-mail do localStorage (nebo do paměti, pokud úložiště není dostupné), umožňuje odhlášení; nejde o bezpečné produkční přihlášení.
- Responzivita pro mobil, tablet a desktop.

## Důležitá omezení

- Text, procenta, sazby a názvy projektu pocházejí z grafické předlohy, nikoli z ověřené nabídky. **Nejde o finanční produkt, obchodní sdělení ani investiční doporučení.**
- 12 projektů v katalogu je kompletně smyšlených.
- Chybí produkční backend, skutečná autentizace, právní a regulatorní texty. Nespouštět jako skutečnou investiční nabídku bez doplnění a kontroly.
- Původní obrázek nezachycuje footer, proto je doplněna minimalizovaná patička za viditelnou částí obrazovky.
- Fotografie jsou nově generované nebo vznikly pouze z jiné generované kompozice, nikoli výřezy fotografie z dodané předlohy.

## Kontrola

V archivu je `verify.py` a `website/geometry.json`. V rozbalené kořenové složce lze spustit:

```bash
python3 verify.py website/
```

Rozvržení a interakce byly navíc vykreslené a testované v headless Chromiu na desktopu 1440 px, mobilu 390 a 320 px a tabletu 768 a 980 px. Bez síťových zdrojů.
