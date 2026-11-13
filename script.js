'use strict';

// Všechny ukázkové údaje jsou lokální; žádný backend, žádný nákup či platba.
const demoProjects = [
  { name: 'Rezidenční projekt Praha – Zličín', type: 'Rezidence', city: 'Praha', state: 'Ukázková emise' },
  { name: 'Bydlení Vltavská', type: 'Rezidence', city: 'Praha', state: 'Ukázková příležitost' },
  { name: 'Nové čtvrti Brno – Líšeň', type: 'Rezidence', city: 'Brno', state: 'Ukázková příležitost' },
  { name: 'Administrativní centrum Liberec', type: 'Komerční', city: 'Liberec', state: 'Ukázková emise' },
  { name: 'Rezidence U Parku', type: 'Rezidence', city: 'Plzeň', state: 'Ukázková příležitost' },
  { name: 'Logistické centrum Morava', type: 'Komerční', city: 'Olomouc', state: 'Ukázkový projekt' },
  { name: 'Nábřeží Hradec Králové', type: 'Rezidence', city: 'Hradec Králové', state: 'Ukázková emise' },
  { name: 'Revitalizace brownfieldu Ostrava', type: 'Komerční', city: 'Ostrava', state: 'Ukázkový projekt' },
  { name: 'Městské bydlení Pardubice', type: 'Rezidence', city: 'Pardubice', state: 'Ukázková příležitost' },
  { name: 'Technologický park Zlín', type: 'Komerční', city: 'Zlín', state: 'Ukázkový projekt' },
  { name: 'Apartmány Jižní Čechy', type: 'Rezidence', city: 'České Budějovice', state: 'Ukázková emise' },
  { name: 'Polyfunkční dům Karlín', type: 'Komerční', city: 'Praha', state: 'Ukázková příležitost' }
];
const detailData = {
  direct: { title: 'Přímý produkt', description: 'Konkrétní projekt, emitent a podmínky emise. Prozkoumejte, jak je investice strukturovaná, z čeho se financuje a jaká rizika nese.', facts: ['Přehled podkladů k emitentovi', 'Účel financování a zdroje splácení', 'Zajištění a rizika konkrétní emise'] },
  radar: { title: 'Dluhopisový Radar', description: 'Analytická větev zaměřená na prověřování emitentů a srovnávání vybraných dluhopisových emisí.', facts: ['Finanční výkazy a zadlužení', 'Srovnání emisních podmínek', 'Přehled rizik a dostupných dokumentů'] },
  realty: { title: 'Reality vs. finance', description: 'Srovnání vlastnictví nemovitosti s investicí do jejího financování, včetně rozdílů v likviditě, nákladech a riziku.', facts: ['Přímé vlastnictví versus financování', 'Náklady na správu a likvidita', 'Scénáře výnosů a ztrát'] },
  capital: { title: 'Uvolněný kapitál', description: 'Možnosti, jak rozdělit aktuálně volné finanční prostředky mezi různé časové horizonty a typy projektů.', facts: ['Kolik prostředků potřebujete mít likvidních', 'Investiční horizont a diverzifikace', 'Kontrola rizika a dostupnosti prostředků'] },
  club: { title: 'Investors Club & Private Capital Club', description: 'Přístup k vybraným projektům a privátním příležitostem. Modelové hranice ze zadání jsou od 1 mil. Kč a od 5 mil. Kč.', facts: ['Výběr projektů podle profilu investora', 'Individuální podklady a prověřování', 'Jasné informace o rizicích'] }
};

const dialog = document.getElementById('contentDialog');
const content = document.getElementById('dialogContent');
const dialogTitle = document.getElementById('dialogTitle');
const dialogKicker = document.getElementById('dialogKicker');
const navBranches = document.getElementById('navBranches');
const branchesMenu = document.getElementById('branchesMenu');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const live = document.getElementById('a11yLive');
let language = 'cz';
let previousFocus = null;
let demoMemberMemory = null;

function escapeHTML(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function showDialog(title, html, kicker = 'INVESTORSKÁ PLATFORMA') {
  previousFocus = document.activeElement;
  dialogKicker.textContent = kicker;
  dialogTitle.textContent = title;
  content.innerHTML = html;
  if (!dialog.open) dialog.showModal();
  document.getElementById('closeDialog').focus();
  closeNavigation();
}
function closeDialog() { if (dialog.open) dialog.close(); }
document.getElementById('closeDialog').addEventListener('click', closeDialog);
dialog.addEventListener('click', event => { if (event.target === dialog) closeDialog(); });
dialog.addEventListener('close', () => { if (previousFocus && previousFocus.isConnected && !previousFocus.closest('[hidden]')) previousFocus.focus(); });

function closeNavigation() {
  branchesMenu.hidden = true;
  navBranches.setAttribute('aria-expanded', 'false');
  mobileMenu.hidden = true;
  mobileMenuToggle.setAttribute('aria-expanded', 'false');
}
navBranches.addEventListener('click', () => {
  const opening = branchesMenu.hidden;
  closeNavigation();
  branchesMenu.hidden = !opening;
  navBranches.setAttribute('aria-expanded', String(opening));
});
mobileMenuToggle.addEventListener('click', () => {
  const opening = mobileMenu.hidden;
  closeNavigation();
  mobileMenu.hidden = !opening;
  mobileMenuToggle.setAttribute('aria-expanded', String(opening));
});
document.addEventListener('pointerdown', event => {
  if (!event.target.closest('.nav-dropdown-wrap') && !branchesMenu.hidden) closeNavigation();
});
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeNavigation(); });

function renderDetail(key) {
  const item = detailData[key];
  if (!item) return;
  const points = item.facts.map(s => `<li>${escapeHTML(s)}</li>`).join('');
  showDialog(item.title, `<p>${escapeHTML(item.description)}</p><div class="detail-box"><strong>Co tato větev řeší</strong><ul>${points}</ul></div><button type="button" class="modal-action" id="detailProjects">Zobrazit ukázkové projekty</button><p class="modal-small">Obsah slouží pouze jako interaktivní demonstrace, ne jako osobní investiční doporučení.</p>`, 'INVESTIČNÍ VĚTEV');
  document.getElementById('detailProjects').addEventListener('click', renderProjects);
}
function renderProjects() {
  showDialog('Aktuální projekty', `<p>Prohlédněte si fungování projektového katalogu. <strong>Všech 12 záznamů je smyšlených</strong> a není určeno k investování.</p>
  <div class="project-tools">
    <label><svg class="icon"><use href="#i-search"/></svg><input type="search" id="projectSearch" placeholder="Hledat podle názvu nebo města…" aria-label="Hledat v projektech"></label>
    <select id="projectType" aria-label="Kategorie projektu"><option value="all">Všechny typy</option><option value="Rezidence">Rezidence</option><option value="Komerční">Komerční</option></select>
  </div><div class="project-count" id="projectCount"></div><div class="project-results" id="projectResults"></div>`, 'PROJEKTY · DEMONSTRACE');
  const search = document.getElementById('projectSearch');
  const type = document.getElementById('projectType');
  const results = document.getElementById('projectResults');
  const count = document.getElementById('projectCount');
  function update() {
    const query = search.value.trim().toLocaleLowerCase('cs');
    const kind = type.value;
    const items = demoProjects.filter(p => (kind === 'all' || p.type === kind) && `${p.name} ${p.city}`.toLocaleLowerCase('cs').includes(query));
    count.textContent = `${items.length} / ${demoProjects.length} ukázkových projektů`;
    results.innerHTML = items.length ? items.map(p => `<article class="project-mini"><strong>${escapeHTML(p.name)}</strong><span>${escapeHTML(p.type)} · ${escapeHTML(p.city)} · ${escapeHTML(p.state)}</span></article>`).join('') : '<div class="empty-message">Žádný projekt neodpovídá filtru. Zkuste jiné hledání.</div>';
  }
  search.addEventListener('input', update);
  type.addEventListener('change', update);
  update();
}
function renderHow() {
  showDialog('Jak investice funguje', `<p>Krátký přehled procesu od výběru investiční větve po rozhodnutí. Ve vizuální předloze je uvedeno dvouminutové video; video nebylo dodáno, proto je zde čitelný postup.</p>
  <ol class="step-list">
    <li><strong>Vyberte si investiční větev</strong><p>Rozhodněte se, zda vás zajímá konkrétní emise, analýza emitenta nebo srovnání financování.</p></li>
    <li><strong>Prověřte podklady</strong><p>Seznamte se s hospodařením emitenta, emisními podmínkami, likviditou a možnými ztrátami.</p></li>
    <li><strong>Vyhodnoťte riziko</strong><p>Zkontrolujte, zda horizont a riziko odpovídají vaší finanční situaci. Zajištění samo o sobě neznamená bezpečnou investici.</p></li>
    <li><strong>Rozhodněte se informovaně</strong><p>Teprve s úplnou dokumentací a po právním ověření lze uvažovat o skutečné investici.</p></li>
  </ol><div class="detail-box"><strong>Upozornění</strong><p>Jde o offline demonstraci webu, nikoli o skutečný investiční portál.</p></div>`, 'JAK TO FUNGUJE');
}
function renderAbout() {
  showDialog('O Investorské platformě', `<p>Stránka prezentuje pět způsobů, jak přemýšlet o financování reálných projektů: přímé emise, analýzu emitentů, reality versus finance, uvolněný kapitál a privátní klub.</p>
  <div class="detail-box"><strong>Prototyp dle grafické předlohy</strong><p>Není napojen na finanční trhy, žádná investice zde není nabízena ani sjednávána. Před ostrým provozem je nutné doplnit ověřené informace o provozovateli, konkrétních emitentech a veškeré regulatorní náležitosti.</p></div>`, 'O PLATFORMĚ');
}
function renderLogin() {
  const current = demoMemberMemory || (() => { try { return localStorage.getItem('demoMemberEmail'); } catch { return null; } })();
  if (current) {
    showDialog('Členská sekce · demo', `<div class="login-success"><svg class="icon"><use href="#i-check"/></svg><div><strong>Demo režim je aktivní.</strong><p>Přihlášený e-mail: ${escapeHTML(current)}</p></div></div><p class="modal-small">Toto je pouze lokální ukázka stavu přihlášení, bez ověření totožnosti a bez přístupu k datům.</p><button type="button" class="modal-secondary" id="demoLogout">Odhlásit demo</button>`, 'VSTUP PRO ČLENY');
    document.getElementById('demoLogout').addEventListener('click', () => {demoMemberMemory = null; try{localStorage.removeItem('demoMemberEmail');}catch{} renderLogin();});
    return;
  }
  showDialog('Vstup pro členy', `<p>Ukázkové přihlášení v prohlížeči. Nefunguje zde reálná autentizace ani přístup k investičním účtům.</p><form id="demoLogin" class="login-form" novalidate><label for="loginEmail">E-mail</label><input id="loginEmail" type="email" name="email" placeholder="vas@email.cz" autocomplete="email" required><div class="form-error" id="loginError" role="alert" hidden>Vyplňte platnou e-mailovou adresu.</div><button class="modal-action" type="submit">Pokračovat v demu</button></form><p class="modal-small">E-mail se nikam neposílá; pro lokální demonstraci se uloží pouze do úložiště prohlížeče.</p>`, 'VSTUP PRO ČLENY');
  document.getElementById('demoLogin').addEventListener('submit', event => {
    event.preventDefault();
    const input = document.getElementById('loginEmail');
    const error = document.getElementById('loginError');
    if (!input.checkValidity() || !input.value.trim()) { error.hidden = false; input.setAttribute('aria-invalid','true'); input.focus(); return; }
    demoMemberMemory = input.value.trim();
    try { localStorage.setItem('demoMemberEmail', demoMemberMemory); } catch {}
    renderLogin();
    live.textContent = 'Ukázkový účet otevřen.';
  });
}

document.querySelectorAll('[data-action], [data-detail]').forEach(button => {
  button.addEventListener('click', () => {
    const key = button.dataset.detail;
    if (key) return renderDetail(key);
    const action = button.dataset.action;
    if (action === 'projects') renderProjects();
    if (action === 'how') renderHow();
    if (action === 'about') renderAbout();
    if (action === 'login') renderLogin();
  });
});

const i18nExtra = [
  ['.hero-description', 'Zajištěné dluhopisy, prověřené projekty a jasná ekonomika.<br>Vyberte si cestu, která odpovídá vašemu kapitálu, cílům a aktuální<br>investiční situaci.', 'Secured bonds, verified projects and clear financials.<br>Choose the path that matches your capital, goals and current<br>investment situation.'],
  ['.panel-title', 'AKTUÁLNÍ EMISE', 'CURRENT ISSUE'],
  ['.panel-heading-row h2', 'Rezidenční projekt<br>Praha – Zličín', 'Residential project<br>Prague – Zličín'],
  ['.investment-metrics dt:nth-child(1)', '', ''],
  ['.branches-header h2', 'Vyberte si vstup, který odpovídá vaší situaci', 'Choose the investment path that fits your situation'],
  ['.branch-eyebrow', 'PĚT INVESTIČNÍCH VĚTVÍ <span class="eyebrow-end-line"></span>', 'FIVE INVESTMENT PATHS <span class="eyebrow-end-line"></span>'],
  ['.trust-item:nth-child(1) span', 'Konkrétní projekty<br>s reálným zajištěním', 'Real projects<br>with tangible collateral'],
  ['.trust-item:nth-child(2) span', 'Transparentní<br>podmínky a ekonomika', 'Transparent terms<br>and financials'],
  ['.trust-item:nth-child(3) span', 'Řešení pro různé<br>velikosti kapitálu', 'Solutions for different<br>investment amounts'],
  ['.card-construction .card-info strong', 'Přímý produkt', 'Direct offering'],
  ['.card-radar .card-info strong', 'Dluhopisový Radar', 'Bond Radar'],
  ['.card-realty .card-info strong', 'Reality vs. finance', 'Real estate vs. finance'],
  ['.card-capital .card-info strong', 'Uvolněný kapitál', 'Available capital'],
  ['.card-club .card-info strong', 'Investors Club &amp;<br>Private Capital Club', 'Investors Club &amp;<br>Private Capital Club'],
  ['.card-construction .card-copy', 'Konkrétní projekt, emitent<br>a podmínky emise', 'A real project, the issuer<br>and bond terms'],
  ['.card-radar .card-copy', 'Prověřte emitenta a porovnejte<br>vybrané emise', 'Review issuers and compare<br>selected bonds'],
  ['.card-realty .card-copy', 'Vlastnit nemovitost, nebo<br>investovat do jejího financování?', 'Own real estate or<br>fund its development?'],
  ['.card-capital .card-copy', 'Rozhodněte, jak efektivně<br>zainvestovat aktuálně dostupné<br>prostředky', 'Choose how to put your<br>available capital<br>to work'],
  ['.card-club .card-copy', 'Vybrané projekty od 1 mil. Kč<br>a privátní příležitosti od 5 mil. Kč', 'Selected projects from CZK 1M<br>and private deals from CZK 5M'],
  ['.investment-metrics div:nth-child(1) dt', 'Výnos pro investora', 'Investor yield'],
  ['.investment-metrics div:nth-child(2) dt', 'Minimální investice', 'Minimum investment'],
  ['.investment-metrics div:nth-child(3) dt', 'Doba investice', 'Investment period'],
  ['.investment-metrics div:nth-child(3) dd', '24–36 měsíců', '24–36 months'],
  ['footer.site-footer p:first-of-type', 'Realitní projekty · Dluhopisy · Investiční příležitosti', 'Real estate · Bonds · Investment opportunities']
];
document.getElementById('langSwitch').addEventListener('click', () => {
  language = language === 'cz' ? 'en' : 'cz';
  document.documentElement.lang = language === 'cz' ? 'cs' : 'en';
  document.querySelectorAll('[data-cz][data-en]').forEach(el => {
    if (el.matches('.hero-description')) return;
    el.textContent = el.dataset[language];
  });
  i18nExtra.forEach(([selector, cz, en]) => {
    const el = document.querySelector(selector);
    if (el && (cz || en)) el.innerHTML = language === 'cz' ? cz : en;
  });
  document.getElementById('langSwitch').setAttribute('aria-label', language === 'cz' ? 'Switch to English' : 'Přepnout do češtiny');
  live.textContent = language === 'cz' ? 'Čeština aktivní' : 'English selected';
});
