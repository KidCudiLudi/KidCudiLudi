const STORAGE_KEY_NOTES = 'maxizoo_custom_notes_v1';
const STORAGE_KEY_THEME = 'maxizoo_theme';

const state = {
  category: 'all',
  tags: new Set(),
  search: '',
  noteId: null,
  mode: 'welcome', // 'welcome' | 'topics' | 'note' | 'review'
  editId: null, // id of custom note currently being edited, or null for "new"
};

const CATEGORY_ICONS = {
  'Psy': '🐶',
  'Koty': '🐱',
  'Akwarystyka': '🐠',
  'Terrarystyka': '🦎',
  'Gryzonie i ptaki': '🐹',
  'Żywienie i suplementacja': '🍖',
  'Pielęgnacja i higiena': '🧼',
  'Zdrowie': '💊',
  'Obsługa klienta i sprzedaż': '🛍️',
  'Marki i asortyment': '🏷️',
  'Inne': '📦',
};

const SECTION_LABELS = {
  najwazniejsze: '⭐ Najważniejsze informacje',
  coWiedziec: '🧠 Co powinien wiedzieć doradca klienta',
  jakWytlumaczyc: '💬 Jak wytłumaczyć to klientowi',
  pytania: '❓ Pytania, które warto zadać klientowi',
  bledy: '⚠️ Najczęstsze błędy i pułapki',
  dodatkowe: '📚 Dodatkowe wyjaśnienia',
  powtorka: '✅ Szybka powtórka',
};

const WARNING_LEVELS = {
  red: { icon: '🔴', label: 'Niebezpieczeństwo', cls: 'warn-red' },
  yellow: { icon: '🟡', label: 'Ważna informacja', cls: 'warn-yellow' },
  green: { icon: '🟢', label: 'Dobre zastosowanie', cls: 'warn-green' },
};

const PRODUCT_FIELD_LABELS = {
  producent: 'Producent',
  marka: 'Marka',
  kategoria: 'Kategoria produktu',
  opis: 'Opis',
  cechy: 'Najważniejsze cechy',
  korzysciKlient: 'Korzyści dla klienta',
  korzysciZwierze: 'Korzyści dla zwierzęcia',
  dlaKogo: 'Dla kogo produkt jest przeznaczony',
  dlaKogoNie: 'Dla kogo NIE jest przeznaczony',
  przeciwwskazania: 'Przeciwwskazania',
  naCoZwrocicUwage: 'Na co zwrócić uwagę',
  najczestszeBledy: 'Najczęstsze błędy klientów',
  pytaniaDoKlienta: 'Pytania jakie należy zadać klientowi',
  alternatywy: 'Alternatywy',
  produktyUzupelniajace: 'Produkty uzupełniające',
  crossSelling: 'Cross-selling',
  upselling: 'Upselling',
  argumentySprzedazowe: 'Argumenty sprzedażowe',
};

const LIST_FIELDS = [
  'cechy', 'korzysciKlient', 'korzysciZwierze', 'przeciwwskazania', 'naCoZwrocicUwage',
  'najczestszeBledy', 'pytaniaDoKlienta', 'alternatywy', 'produktyUzupelniajace',
  'crossSelling', 'upselling', 'argumentySprzedazowe',
];

// -------------------- persistence --------------------

function loadCustomNotes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_NOTES);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveCustomNotes(notes) {
  try { localStorage.setItem(STORAGE_KEY_NOTES, JSON.stringify(notes)); } catch (e) {}
}

let CUSTOM_NOTES = loadCustomNotes();

function getAllNotes() {
  return NOTES.concat(CUSTOM_NOTES);
}

// -------------------- theme --------------------

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const btn = document.getElementById('themeToggle');
  if (btn) btn.textContent = theme === 'dark' ? '☀️ Jasny' : '🌙 Ciemny';
}

function initTheme() {
  let saved;
  try { saved = localStorage.getItem(STORAGE_KEY_THEME); } catch (e) {}
  const theme = saved || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  applyTheme(theme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  try { localStorage.setItem(STORAGE_KEY_THEME, next); } catch (e) {}
  applyTheme(next);
}

// -------------------- search / filtering --------------------

function getAllTags() {
  const tags = new Set();
  getAllNotes().forEach(n => n.tags.forEach(t => tags.add(t)));
  return Array.from(tags).sort();
}

function flattenSearchableText(note) {
  const parts = [note.title, note.category, note.tags.join(' ')];
  const s = note.sections || {};

  Object.keys(SECTION_LABELS).forEach(key => {
    (s[key] || []).forEach(item => parts.push(item.text));
  });
  (s.zapamietaj || []).forEach(item => parts.push(item.text));
  (s.ostrzezenia || []).forEach(item => parts.push(item.text));

  const k = s.kartaProduktu;
  if (k) {
    parts.push(k.producent, k.marka, k.kategoria, k.opis, k.dlaKogo, k.dlaKogoNie, k.skroconaWersja);
    LIST_FIELDS.forEach(f => parts.push((k[f] || []).join(' ')));
    (k.faq || []).forEach(f => parts.push(f.q, f.a));
  }

  return parts.filter(Boolean).join(' ').toLowerCase();
}

function noteMatches(note) {
  if (state.category !== 'all' && note.category !== state.category) return false;
  if (state.tags.size > 0) {
    for (const t of state.tags) {
      if (!note.tags.includes(t)) return false;
    }
  }
  if (state.search.trim()) {
    const q = state.search.trim().toLowerCase();
    if (!flattenSearchableText(note).includes(q)) return false;
  }
  return true;
}

function getFilteredNotes() {
  return getAllNotes().filter(noteMatches);
}

function categoryCounts() {
  const counts = {};
  CATEGORIES.forEach(c => (counts[c] = 0));
  getAllNotes().forEach(n => {
    const tmpCat = state.category;
    state.category = 'all';
    const matches = noteMatches(n);
    state.category = tmpCat;
    if (matches) counts[n.category] = (counts[n.category] || 0) + 1;
  });
  return counts;
}

// -------------------- category bar / tags --------------------

function renderCategoryBar() {
  const bar = document.getElementById('categoryBar');
  const counts = categoryCounts();
  const totalCount = Object.values(counts).reduce((a, b) => a + b, 0);

  let html = `<div class="cat-card ${state.category === 'all' ? 'active' : ''}" data-cat="all">
    <span class="cat-icon">📋</span>
    <span class="cat-name">Wszystkie</span>
    <span class="cat-count">${totalCount}</span>
  </div>`;

  CATEGORIES.forEach(cat => {
    if (counts[cat] === 0 && state.category !== cat) return;
    html += `<div class="cat-card ${state.category === cat ? 'active' : ''}" data-cat="${escapeHtml(cat)}">
      <span class="cat-icon">${CATEGORY_ICONS[cat] || '📦'}</span>
      <span class="cat-name">${escapeHtml(cat)}</span>
      <span class="cat-count">${counts[cat] || 0}</span>
    </div>`;
  });
  bar.innerHTML = html;

  bar.querySelectorAll('.cat-card').forEach(card => {
    card.addEventListener('click', () => {
      state.category = card.dataset.cat;
      state.noteId = null;
      state.mode = 'topics';
      renderCategoryBar();
      renderMain();
    });
  });
}

function renderTagCloud() {
  const tagCloud = document.getElementById('tagCloud');
  tagCloud.innerHTML = getAllTags()
    .map(t => `<span class="tag-chip ${state.tags.has(t) ? 'active' : ''}" data-tag="${escapeHtml(t)}">${escapeHtml(t)}</span>`)
    .join('');

  tagCloud.querySelectorAll('.tag-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const tag = chip.dataset.tag;
      if (state.tags.has(tag)) state.tags.delete(tag);
      else state.tags.add(tag);
      if (state.mode === 'welcome') state.mode = 'topics';
      renderCategoryBar();
      renderTagCloud();
      renderMain();
    });
  });
}

function renderTagToggleLabel() {
  const btn = document.getElementById('tagToggle');
  const count = state.tags.size;
  btn.innerHTML = `🏷️ Tagi${count ? ` (${count})` : ''} <span class="tag-toggle-arrow">${document.getElementById('tagCloud').hidden ? '▾' : '▴'}</span>`;
}

// -------------------- topic grid --------------------

function renderTopicGrid() {
  const filtered = getFilteredNotes();
  const heading = state.category === 'all' ? 'Wszystkie tematy' : state.category;

  let html = `<div class="topic-grid-wrap"><h2 class="topic-grid-title">${escapeHtml(heading)}</h2>`;

  if (filtered.length === 0) {
    html += `<p class="empty-msg">Brak notatek dla wybranych filtrów.</p></div>`;
    return html;
  }

  html += `<div class="topic-grid">`;
  html += filtered
    .map(
      n => `<div class="topic-card" data-id="${n.id}">
        <div class="topic-card-icon">${CATEGORY_ICONS[n.category] || '📦'}</div>
        <div class="topic-card-body">
          <div class="topic-card-title">${escapeHtml(n.title)}</div>
          <div class="topic-card-cat">${escapeHtml(n.category)}${n.id.startsWith('custom-') ? ' · własna' : ''}</div>
          <div class="topic-card-tags">${n.tags.slice(0, 4).map(t => `<span class="tag-chip-mini">${escapeHtml(t)}</span>`).join('')}</div>
        </div>
      </div>`
    )
    .join('');
  html += `</div></div>`;
  return html;
}

function bindTopicGrid() {
  document.querySelectorAll('.topic-card[data-id]').forEach(card => {
    card.addEventListener('click', () => {
      state.noteId = card.dataset.id;
      state.mode = 'note';
      renderMain();
    });
  });
}

// -------------------- rendering helpers --------------------

function escapeHtml(str) {
  if (str === undefined || str === null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function sourceBadge(source) {
  return source === 'training'
    ? '<span class="source-badge training">szkolenie</span>'
    : '<span class="source-badge extra">rozszerzenie</span>';
}

function renderItemList(items) {
  if (!items || items.length === 0) return '<p class="empty-msg">Brak danych.</p>';
  return `<ul>${items
    .map(i => `<li>${sourceBadge(i.source)}${escapeHtml(i.text)}</li>`)
    .join('')}</ul>`;
}

function renderLegend() {
  return `<div class="legend">
    <span><span class="dot training"></span> Treść ze szkolenia</span>
    <span><span class="dot extra"></span> Rozszerzenie / wyjaśnienie dodatkowe</span>
  </div>`;
}

function renderWarnings(ostrzezenia) {
  if (!ostrzezenia || ostrzezenia.length === 0) return '';
  const items = ostrzezenia
    .map(w => {
      const cfg = WARNING_LEVELS[w.level] || WARNING_LEVELS.yellow;
      return `<li class="${cfg.cls}"><span class="warn-icon">${cfg.icon}</span><span class="warn-label">${cfg.label}:</span> ${escapeHtml(w.text)}</li>`;
    })
    .join('');
  return `<div class="section-block"><ul class="warning-list">${items}</ul></div>`;
}

function renderListField(items) {
  if (!items || items.length === 0) return '<p class="empty-msg">Brak danych.</p>';
  return `<ul>${items.map(i => `<li>${escapeHtml(i)}</li>`).join('')}</ul>`;
}

function renderProductCard(karta) {
  if (!karta) return '';
  let html = `<div class="section-block"><div class="product-card">`;
  html += `<h3>🛒 Karta produktu</h3>`;

  if (karta.zdjecie) {
    html += `<img class="product-image" src="${escapeHtml(karta.zdjecie)}" alt="Zdjęcie produktu" />`;
  }

  const meta = [];
  if (karta.producent) meta.push(`<strong>Producent:</strong> ${escapeHtml(karta.producent)}`);
  if (karta.marka) meta.push(`<strong>Marka:</strong> ${escapeHtml(karta.marka)}`);
  if (karta.kategoria) meta.push(`<strong>Kategoria:</strong> ${escapeHtml(karta.kategoria)}`);
  if (meta.length) html += `<div class="product-meta">${meta.join(' &nbsp;·&nbsp; ')}</div>`;

  if (karta.opis) html += `<p class="product-desc">${escapeHtml(karta.opis)}</p>`;

  html += `<dl>`;
  Object.keys(PRODUCT_FIELD_LABELS).forEach(key => {
    if (['producent', 'marka', 'kategoria', 'opis'].includes(key)) return;
    const val = karta[key];
    if (!val || (Array.isArray(val) && val.length === 0)) return;
    html += `<dt>${PRODUCT_FIELD_LABELS[key]}</dt><dd>`;
    if (Array.isArray(val)) {
      html += renderListField(val);
    } else {
      html += `<p>${escapeHtml(val)}</p>`;
    }
    html += `</dd>`;
  });

  if (karta.dlaKogo) {
    html += `<dt>Dla kogo produkt jest przeznaczony</dt><dd><p>${escapeHtml(karta.dlaKogo)}</p></dd>`;
  }
  if (karta.dlaKogoNie) {
    html += `<dt>Dla kogo NIE jest przeznaczony</dt><dd><p>${escapeHtml(karta.dlaKogoNie)}</p></dd>`;
  }

  if (karta.faq && karta.faq.length) {
    html += `<dt>Najczęściej zadawane pytania</dt><dd><ul class="faq-list">`;
    karta.faq.forEach(f => {
      html += `<li><strong>P:</strong> ${escapeHtml(f.q)}<br><strong>O:</strong> ${escapeHtml(f.a)}</li>`;
    });
    html += `</ul></dd>`;
  }

  html += `</dl>`;

  if (karta.skroconaWersja) {
    html += `<div class="quick-version"><h4>⚡ Skrócona wersja do szybkiej obsługi klienta</h4><p>${escapeHtml(karta.skroconaWersja)}</p></div>`;
  }

  html += `</div></div>`;
  return html;
}

function renderRememberCard(zapamietaj) {
  if (!zapamietaj || zapamietaj.length === 0) return '';
  return `<div class="section-block">
    <div class="remember-card">
      <h3>🧩 Zapamiętaj</h3>
      ${renderItemList(zapamietaj)}
    </div>
  </div>`;
}

function renderNoteDetail(note) {
  let html = `<div class="note-card">`;
  if (note.isDemo) {
    html += `<div class="demo-banner">📌 To jest przykładowa notatka demonstrująca format. Prześlij swoje materiały szkoleniowe, aby zastąpić ją realną treścią.</div>`;
  }

  html += `<button class="btn-back" id="backToTopicsBtn">← Wróć do tematów</button>`;

  html += `<div class="note-card-header">`;
  html += `<h2>${escapeHtml(note.title)}</h2>`;
  if (note.id.startsWith('custom-')) {
    html += `<div class="note-actions">
      <button class="btn-small" id="editNoteBtn">✏️ Edytuj</button>
      <button class="btn-small btn-danger" id="deleteNoteBtn">🗑️ Usuń</button>
    </div>`;
  }
  html += `</div>`;

  html += `<div class="note-meta">
    <span class="tag-chip">${escapeHtml(note.category)}</span>
    ${note.tags.map(t => `<span class="tag-chip">${escapeHtml(t)}</span>`).join('')}
  </div>`;

  html += renderWarnings(note.sections.ostrzezenia);
  html += renderLegend();

  Object.keys(SECTION_LABELS).forEach(key => {
    const items = note.sections[key];
    if (!items) return;
    html += `<div class="section-block">
      <h3>${SECTION_LABELS[key]}</h3>
      ${renderItemList(items)}
    </div>`;
  });

  html += renderProductCard(note.sections.kartaProduktu);
  html += renderRememberCard(note.sections.zapamietaj);

  html += `</div>`;
  return html;
}

function renderWelcome() {
  return `<div class="welcome-card">
    <h2>👋 Witaj w Twoich notatkach doradcy klienta</h2>
    <p>To Twoja baza wiedzy budowana na podstawie materiałów szkoleniowych ze sklepu zoologicznego Maxi Zoo.</p>
    <ul>
      <li><strong>Kategorie u góry</strong> – kliknij kafelek kategorii, aby zobaczyć jej tematy.</li>
      <li>Każda notatka rozdziela informacje <span class="source-badge training" style="position:static">szkolenie</span> od <span class="source-badge extra" style="position:static">rozszerzenie</span> – wiesz, co pochodzi z materiałów, a co jest dodatkowym wyjaśnieniem.</li>
      <li>Ostrzeżenia 🔴🟡🟢 widoczne na górze karty produktu pokazują od razu niebezpieczeństwa, ważne informacje i dobre zastosowania.</li>
      <li>Przyciskiem <strong>„Szybka powtórka – wszystkie tematy”</strong> u góry zrobisz błyskawiczny przegląd przed zmianą.</li>
      <li>Wyszukiwarka przeszukuje wszystkie treści notatek (nie tylko tytuły) – wpisz np. składnik, chorobę lub nazwę produktu.</li>
      <li>Przycisk <strong>🏷️ Tagi</strong> rozwija listę tagów do dodatkowego filtrowania.</li>
      <li>Przyciskiem <strong>„+ Nowy temat”</strong> dodasz własną notatkę / kartę produktu – zapisuje się lokalnie w tym urządzeniu/przeglądarce.</li>
    </ul>
    <p>Wybierz kategorię powyżej, aby zobaczyć jej tematy.</p>
  </div>`;
}

function renderReview() {
  const filtered = getFilteredNotes();
  if (filtered.length === 0) {
    return `<div class="review-card"><h2>✅ Szybka powtórka</h2><p class="empty-msg">Brak notatek dla wybranych filtrów.</p></div>`;
  }
  let html = `<div class="review-card"><h2>✅ Szybka powtórka – wszystkie tematy</h2>`;
  filtered.forEach(note => {
    const items = note.sections.powtorka;
    if (!items || items.length === 0) return;
    html += `<div class="review-topic">
      <h3>${escapeHtml(note.title)}</h3>
      ${renderItemList(items)}
    </div>`;
  });
  html += `</div>`;
  return html;
}

function renderMain() {
  const main = document.getElementById('mainContent');
  if (state.mode === 'review') {
    main.innerHTML = renderReview();
    return;
  }
  if (state.mode === 'note' && state.noteId) {
    const note = getAllNotes().find(n => n.id === state.noteId);
    if (note) {
      main.innerHTML = renderNoteDetail(note);
      bindNoteDetailActions(note);
      return;
    }
  }
  if (state.mode === 'topics') {
    main.innerHTML = renderTopicGrid();
    bindTopicGrid();
    return;
  }
  main.innerHTML = renderWelcome();
}

function bindNoteDetailActions(note) {
  const editBtn = document.getElementById('editNoteBtn');
  const delBtn = document.getElementById('deleteNoteBtn');
  const backBtn = document.getElementById('backToTopicsBtn');
  if (editBtn) editBtn.addEventListener('click', () => openNoteForm(note));
  if (delBtn) delBtn.addEventListener('click', () => deleteCustomNote(note.id));
  if (backBtn) backBtn.addEventListener('click', () => {
    state.noteId = null;
    state.mode = 'topics';
    renderMain();
  });
}

// -------------------- add / edit note form --------------------

function parseLines(text) {
  return (text || '')
    .split('\n')
    .map(l => l.trim())
    .filter(Boolean);
}

function parseWarnings(text) {
  return parseLines(text).map(line => {
    const m = line.match(/^(RED|YELLOW|GREEN)\s*:\s*(.+)$/i);
    if (m) {
      return { level: m[1].toLowerCase(), text: m[2].trim() };
    }
    return { level: 'yellow', text: line };
  });
}

function parseFaq(text) {
  const lines = parseLines(text);
  const faq = [];
  let current = null;
  lines.forEach(line => {
    const qm = line.match(/^P\s*:\s*(.+)$/i) || line.match(/^Q\s*:\s*(.+)$/i);
    const am = line.match(/^O\s*:\s*(.+)$/i) || line.match(/^A\s*:\s*(.+)$/i);
    if (qm) {
      if (current && current.q && current.a) faq.push(current);
      current = { q: qm[1].trim(), a: '' };
    } else if (am && current) {
      current.a = am[1].trim();
    }
  });
  if (current && current.q && current.a) faq.push(current);
  return faq;
}

function itemsToTextarea(items) {
  return (items || []).map(i => i.text).join('\n');
}

function warningsToTextarea(items) {
  return (items || []).map(i => `${i.level.toUpperCase()}: ${i.text}`).join('\n');
}

function faqToTextarea(items) {
  return (items || []).map(i => `P: ${i.q}\nO: ${i.a}`).join('\n');
}

function buildNoteFormHtml(note) {
  const s = note ? note.sections : {};
  const k = (s && s.kartaProduktu) || {};
  const hasCard = !!(s && s.kartaProduktu);

  const categoryOptions = CATEGORIES.map(c =>
    `<option value="${escapeHtml(c)}" ${note && note.category === c ? 'selected' : ''}>${escapeHtml(c)}</option>`
  ).join('');

  const sectionTextareas = Object.keys(SECTION_LABELS).map(key => `
    <label class="form-label">${SECTION_LABELS[key]}<br><span class="form-hint">jedna informacja w jednej linii</span></label>
    <textarea name="section_${key}" rows="3">${escapeHtml(itemsToTextarea(s && s[key]))}</textarea>
  `).join('');

  const listFieldTextareas = LIST_FIELDS.map(key => `
    <label class="form-label">${PRODUCT_FIELD_LABELS[key]}<br><span class="form-hint">jedna pozycja w jednej linii</span></label>
    <textarea name="karta_${key}" rows="2">${escapeHtml((k[key] || []).join('\n'))}</textarea>
  `).join('');

  return `
    <form id="noteForm">
      <label class="form-label">Tytuł tematu / produktu *</label>
      <input type="text" name="title" required value="${escapeHtml(note ? note.title : '')}" />

      <label class="form-label">Kategoria *</label>
      <select name="category" required>${categoryOptions}</select>

      <label class="form-label">Tagi<br><span class="form-hint">oddzielone przecinkami, np. psy, alergie, karma sucha</span></label>
      <input type="text" name="tags" value="${escapeHtml(note ? note.tags.join(', ') : '')}" />

      <label class="form-label">🔴🟡🟢 Ostrzeżenia<br><span class="form-hint">jedna linia = jedno ostrzeżenie, format: RED: tekst / YELLOW: tekst / GREEN: tekst</span></label>
      <textarea name="ostrzezenia" rows="3">${escapeHtml(warningsToTextarea(s && s.ostrzezenia))}</textarea>

      ${sectionTextareas}

      <label class="form-label">🧩 Zapamiętaj<br><span class="form-hint">jedna informacja w jednej linii</span></label>
      <textarea name="section_zapamietaj" rows="2">${escapeHtml(itemsToTextarea(s && s.zapamietaj))}</textarea>

      <label class="form-checkbox">
        <input type="checkbox" name="hasCard" id="hasCardCheckbox" ${hasCard ? 'checked' : ''} />
        To jest karta produktu (dodaj pełny profil sprzedażowy)
      </label>

      <fieldset id="cardFieldset" class="card-fieldset" ${hasCard ? '' : 'hidden'}>
        <label class="form-label">Producent</label>
        <input type="text" name="karta_producent" value="${escapeHtml(k.producent || '')}" />

        <label class="form-label">Marka</label>
        <input type="text" name="karta_marka" value="${escapeHtml(k.marka || '')}" />

        <label class="form-label">Kategoria produktu</label>
        <input type="text" name="karta_kategoria" value="${escapeHtml(k.kategoria || '')}" />

        <label class="form-label">Zdjęcie produktu (URL)<br><span class="form-hint">opcjonalnie – link do obrazka</span></label>
        <input type="text" name="karta_zdjecie" value="${escapeHtml(k.zdjecie || '')}" />

        <label class="form-label">Opis</label>
        <textarea name="karta_opis" rows="2">${escapeHtml(k.opis || '')}</textarea>

        <label class="form-label">Dla kogo produkt jest przeznaczony</label>
        <textarea name="karta_dlaKogo" rows="2">${escapeHtml(k.dlaKogo || '')}</textarea>

        <label class="form-label">Dla kogo NIE jest przeznaczony</label>
        <textarea name="karta_dlaKogoNie" rows="2">${escapeHtml(k.dlaKogoNie || '')}</textarea>

        ${listFieldTextareas}

        <label class="form-label">Najczęściej zadawane pytania (FAQ)<br><span class="form-hint">format: P: pytanie / O: odpowiedź, w kolejnych liniach</span></label>
        <textarea name="karta_faq" rows="3">${escapeHtml(faqToTextarea(k.faq))}</textarea>

        <label class="form-label">⚡ Skrócona wersja do szybkiej obsługi klienta</label>
        <textarea name="karta_skroconaWersja" rows="2">${escapeHtml(k.skroconaWersja || '')}</textarea>
      </fieldset>

      <div class="form-actions">
        <button type="submit" class="btn-primary">💾 Zapisz temat</button>
        <button type="button" class="btn-secondary" id="cancelFormBtn">Anuluj</button>
      </div>
    </form>
  `;
}

function openNoteForm(note) {
  state.editId = note ? note.id : null;
  const modal = document.getElementById('noteModal');
  const body = document.getElementById('noteModalBody');
  document.getElementById('noteModalTitle').textContent = note ? '✏️ Edytuj temat' : '➕ Nowy temat';
  body.innerHTML = buildNoteFormHtml(note);
  modal.classList.add('open');

  const hasCardCheckbox = document.getElementById('hasCardCheckbox');
  const cardFieldset = document.getElementById('cardFieldset');
  hasCardCheckbox.addEventListener('change', () => {
    cardFieldset.hidden = !hasCardCheckbox.checked;
  });

  document.getElementById('cancelFormBtn').addEventListener('click', closeNoteForm);
  document.getElementById('noteForm').addEventListener('submit', e => {
    e.preventDefault();
    saveNoteForm(e.target);
  });
}

function closeNoteForm() {
  document.getElementById('noteModal').classList.remove('open');
  state.editId = null;
}

function saveNoteForm(form) {
  const fd = new FormData(form);
  const title = fd.get('title').trim();
  const category = fd.get('category');
  const tags = fd.get('tags').split(',').map(t => t.trim()).filter(Boolean);

  const sections = {
    ostrzezenia: parseWarnings(fd.get('ostrzezenia')),
  };

  Object.keys(SECTION_LABELS).forEach(key => {
    const lines = parseLines(fd.get(`section_${key}`));
    sections[key] = lines.map(text => ({ text, source: 'extra' }));
  });

  const zapamietajLines = parseLines(fd.get('section_zapamietaj'));
  sections.zapamietaj = zapamietajLines.map(text => ({ text, source: 'extra' }));

  if (fd.get('hasCard')) {
    const karta = {
      producent: fd.get('karta_producent').trim(),
      marka: fd.get('karta_marka').trim(),
      kategoria: fd.get('karta_kategoria').trim(),
      zdjecie: fd.get('karta_zdjecie').trim(),
      opis: fd.get('karta_opis').trim(),
      dlaKogo: fd.get('karta_dlaKogo').trim(),
      dlaKogoNie: fd.get('karta_dlaKogoNie').trim(),
      faq: parseFaq(fd.get('karta_faq')),
      skroconaWersja: fd.get('karta_skroconaWersja').trim(),
    };
    LIST_FIELDS.forEach(key => {
      karta[key] = parseLines(fd.get(`karta_${key}`));
    });
    sections.kartaProduktu = karta;
  } else {
    sections.kartaProduktu = null;
  }

  let id = state.editId;
  if (id) {
    const existing = CUSTOM_NOTES.find(n => n.id === id);
    existing.title = title;
    existing.category = category;
    existing.tags = tags;
    existing.updated = new Date().toISOString().slice(0, 10);
    existing.sections = sections;
  } else {
    id = 'custom-' + Date.now();
    CUSTOM_NOTES.push({
      id,
      title,
      category,
      tags,
      updated: new Date().toISOString().slice(0, 10),
      sections,
    });
  }

  saveCustomNotes(CUSTOM_NOTES);
  closeNoteForm();

  state.noteId = id;
  state.mode = 'note';
  renderCategoryBar();
  renderTagCloud();
  renderMain();
}

function deleteCustomNote(id) {
  if (!confirm('Czy na pewno usunąć ten temat? Tej operacji nie można odwrócić.')) return;
  CUSTOM_NOTES = CUSTOM_NOTES.filter(n => n.id !== id);
  saveCustomNotes(CUSTOM_NOTES);
  state.noteId = null;
  state.mode = 'topics';
  renderCategoryBar();
  renderTagCloud();
  renderMain();
}

// -------------------- init --------------------

initTheme();

document.getElementById('searchInput').addEventListener('input', e => {
  state.search = e.target.value;
  state.noteId = null;
  state.mode = state.search.trim() ? 'topics' : (state.category !== 'all' ? 'topics' : 'welcome');
  renderCategoryBar();
  renderMain();
});

document.getElementById('reviewBtn').addEventListener('click', () => {
  state.mode = 'review';
  state.noteId = null;
  renderMain();
});

document.getElementById('tagToggle').addEventListener('click', () => {
  const cloud = document.getElementById('tagCloud');
  cloud.hidden = !cloud.hidden;
  renderTagToggleLabel();
});

document.getElementById('themeToggle').addEventListener('click', toggleTheme);

document.getElementById('newNoteBtn').addEventListener('click', () => openNoteForm(null));

document.getElementById('noteModalClose').addEventListener('click', closeNoteForm);
document.getElementById('noteModal').addEventListener('click', e => {
  if (e.target.id === 'noteModal') closeNoteForm();
});

document.addEventListener('keydown', e => {
  if (e.key === '/' && document.activeElement !== document.getElementById('searchInput')) {
    e.preventDefault();
    document.getElementById('searchInput').focus();
  }
  if (e.key === 'Escape') closeNoteForm();
});

renderCategoryBar();
renderTagCloud();
renderTagToggleLabel();
renderMain();
