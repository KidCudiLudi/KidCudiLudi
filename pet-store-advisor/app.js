const state = {
  category: 'all',
  tags: new Set(),
  search: '',
  noteId: null,
  mode: 'welcome', // 'welcome' | 'note' | 'review'
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

function getAllTags() {
  const tags = new Set();
  NOTES.forEach(n => n.tags.forEach(t => tags.add(t)));
  return Array.from(tags).sort();
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
    const haystack = (note.title + ' ' + note.tags.join(' ') + ' ' + note.category).toLowerCase();
    if (!haystack.includes(q)) return false;
  }
  return true;
}

function getFilteredNotes() {
  return NOTES.filter(noteMatches);
}

function categoryCounts() {
  const counts = {};
  CATEGORIES.forEach(c => (counts[c] = 0));
  NOTES.forEach(n => {
    const tmpCat = state.category;
    state.category = 'all';
    const matches = noteMatches(n);
    state.category = tmpCat;
    if (matches) counts[n.category] = (counts[n.category] || 0) + 1;
  });
  return counts;
}

function renderSidebar() {
  const catList = document.getElementById('categoryList');
  const counts = categoryCounts();
  const totalCount = Object.values(counts).reduce((a, b) => a + b, 0);

  let html = `<li class="${state.category === 'all' ? 'active' : ''}" data-cat="all">
    <span>Wszystkie tematy</span><span class="count">${totalCount}</span>
  </li>`;

  CATEGORIES.forEach(cat => {
    if (counts[cat] === 0 && state.category !== cat) return;
    html += `<li class="${state.category === cat ? 'active' : ''}" data-cat="${cat}">
      <span>${cat}</span><span class="count">${counts[cat] || 0}</span>
    </li>`;
  });
  catList.innerHTML = html;

  catList.querySelectorAll('li').forEach(li => {
    li.addEventListener('click', () => {
      state.category = li.dataset.cat;
      renderSidebar();
      renderNoteList();
    });
  });

  const tagCloud = document.getElementById('tagCloud');
  tagCloud.innerHTML = getAllTags()
    .map(t => `<span class="tag-chip ${state.tags.has(t) ? 'active' : ''}" data-tag="${t}">${t}</span>`)
    .join('');

  tagCloud.querySelectorAll('.tag-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const tag = chip.dataset.tag;
      if (state.tags.has(tag)) state.tags.delete(tag);
      else state.tags.add(tag);
      renderSidebar();
      renderNoteList();
    });
  });
}

function renderNoteList() {
  const list = document.getElementById('noteList');
  const filtered = getFilteredNotes();

  if (filtered.length === 0) {
    list.innerHTML = `<li class="empty-msg">Brak notatek dla wybranych filtrów.</li>`;
    return;
  }

  list.innerHTML = filtered
    .map(
      n => `<li class="${n.id === state.noteId ? 'active' : ''}" data-id="${n.id}">
        ${n.title}
        <span class="note-cat">${n.category}</span>
      </li>`
    )
    .join('');

  list.querySelectorAll('li[data-id]').forEach(li => {
    li.addEventListener('click', () => {
      state.noteId = li.dataset.id;
      state.mode = 'note';
      renderNoteList();
      renderMain();
    });
  });
}

function sourceBadge(source) {
  return source === 'training'
    ? '<span class="source-badge training">szkolenie</span>'
    : '<span class="source-badge extra">rozszerzenie</span>';
}

function renderItemList(items) {
  if (!items || items.length === 0) return '<p class="empty-msg">Brak danych.</p>';
  return `<ul>${items
    .map(i => `<li>${sourceBadge(i.source)}${i.text}</li>`)
    .join('')}</ul>`;
}

function renderLegend() {
  return `<div class="legend">
    <span><span class="dot training"></span> Treść ze szkolenia</span>
    <span><span class="dot extra"></span> Rozszerzenie / wyjaśnienie dodatkowe</span>
  </div>`;
}

function renderProductCard(karta) {
  if (!karta) return '';
  return `<div class="section-block">
    <div class="product-card">
      <h3>🛒 Karta produktu</h3>
      <dl>
        <dt>Dla jakich zwierząt</dt><dd>${karta.dlaJakichZwierzat}</dd>
        <dt>Główne zalety</dt><dd><ul>${karta.glowneZalety.map(z => `<li>${z}</li>`).join('')}</ul></dd>
        <dt>Kiedy polecać</dt><dd>${karta.kiedyPolecac}</dd>
        <dt>Kiedy nie polecać</dt><dd>${karta.kiedyNiePolecac}</dd>
        <dt>Najczęstsze pytania klientów</dt><dd><ul>${karta.najczestszePytania.map(p => `<li>${p}</li>`).join('')}</ul></dd>
        <dt>Gotowa odpowiedź dla klienta</dt><dd>${karta.gotowaOdpowiedz}</dd>
      </dl>
    </div>
  </div>`;
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
  html += `<h2>${note.title}</h2>`;
  html += `<div class="note-meta">
    <span class="tag-chip">${note.category}</span>
    ${note.tags.map(t => `<span class="tag-chip">${t}</span>`).join('')}
  </div>`;
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
    <p>To Twoja baza wiedzy budowana na podstawie materiałów szkoleniowych ze sklepu zoologicznego.</p>
    <ul>
      <li><strong>Kategorie i tagi</strong> po lewej stronie pomogą Ci szybko znaleźć temat.</li>
      <li>Każda notatka rozdziela informacje <span class="source-badge training" style="position:static">szkolenie</span> od <span class="source-badge extra" style="position:static">rozszerzenie</span> – wiesz, co pochodzi z materiałów, a co jest dodatkowym wyjaśnieniem.</li>
      <li>Przyciskiem <strong>„Szybka powtórka – wszystkie tematy”</strong> u góry zrobisz błyskawiczny przegląd przed zmianą.</li>
      <li>Wyszukiwarka pozwala znaleźć notatkę po nazwie, kategorii lub tagu.</li>
    </ul>
    <p>Wybierz temat z listy po lewej, aby zobaczyć notatkę.</p>
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
      <h3>${note.title}</h3>
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
    const note = NOTES.find(n => n.id === state.noteId);
    if (note) {
      main.innerHTML = renderNoteDetail(note);
      return;
    }
  }
  main.innerHTML = renderWelcome();
}

document.getElementById('searchInput').addEventListener('input', e => {
  state.search = e.target.value;
  renderSidebar();
  renderNoteList();
});

document.getElementById('reviewBtn').addEventListener('click', () => {
  state.mode = 'review';
  state.noteId = null;
  renderNoteList();
  renderMain();
});

renderSidebar();
renderNoteList();
renderMain();
