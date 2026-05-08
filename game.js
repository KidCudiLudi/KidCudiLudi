// ============================================================
//  Pixel Fisher RPG - game.js
// ============================================================

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

// ---- PIXEL PALETTE ----
const P = {
  sky1: '#1a1a3e', sky2: '#0d0d2b',
  sun:  '#ffe066', sunGlow: '#ff8800',
  mountain: '#2a2a4a', mountainSnow: '#ddeeff',
  grass1: '#2d6a2d', grass2: '#1f4f1f', grass3: '#3a8c3a',
  dirt: '#5c3a1e', dirt2: '#7a4e28',
  water1: '#1a4a7c', water2: '#1f5a99', water3: '#2470b8', waterLight: '#3a88d0',
  waterFoam: '#5aaeff',
  dock: '#6b4226', dockDark: '#4a2e18', dockPlank: '#8a5a30',
  stone: '#5a5a6a', stoneDark: '#3a3a4a', stoneLight: '#7a7a8a',
  fish1: '#ff6644', fish2: '#ff9922', fish3: '#44aaff', fish4: '#aa66ff',
  hook: '#cccccc', line: '#ffffff',
  playerSkin: '#f5c88a', playerHair: '#3a2a1a', playerShirt: '#3355aa',
  playerPants: '#2a2a4a', playerShoe: '#1a1a1a', playerHat: '#8b4513',
  tree1: '#1a5c1a', tree2: '#0f3f0f', treeTrunk: '#5c3a1e',
  house: '#7a5a3a', houseRoof: '#aa3333', houseWindow: '#88ccff',
  cloud: '#ccddff', cloudShadow: '#99aabb',
  bubble: 'rgba(100,180,255,0.5)',
  coin: '#ffcc00',
};

// ---- GAME STATE ----
const state = {
  player: {
    level: 1, xp: 0, xpMax: 100,
    coins: 50,
    energy: 100, energyMax: 100,
    rodLevel: 1, baitLevel: 1, lureLevel: 1,
    x: 380, y: 310,
  },
  fish: [],        // inventory
  casting: false,
  reeling: false,
  castProgress: 0,
  biteTimer: 0,
  biteChance: 0,
  fishOnLine: null,
  reelingProgress: 0,
  reelingDifficulty: 1,
  hookX: 0, hookY: 0,
  hookVisible: false,
  lineAngle: 0,
  ripples: [],
  bubbles: [],
  birds: [],
  clouds: [],
  particles: [],
  time: 0,
  wave: 0,
  animFrame: 0,
  playerAnim: 0,
  castAnim: 0,
  splashParticles: [],
};

// ---- FISH TYPES ----
const FISH_TYPES = [
  { id:'minnow',    name:'Płotka',       emoji:'🐟', rarity:'common',    minLvl:1,  baseXp:8,   baseVal:5,   weight:[0.3,0.8],  color:'#aaddff', desc:'Pospolita ryba.' },
  { id:'perch',     name:'Okoń',         emoji:'🐠', rarity:'common',    minLvl:1,  baseXp:12,  baseVal:10,  weight:[0.5,1.5],  color:'#ffaa44', desc:'Prążkowany drapieżnik.' },
  { id:'carp',      name:'Karp',         emoji:'🐡', rarity:'uncommon',  minLvl:2,  baseXp:20,  baseVal:22,  weight:[1.0,4.0],  color:'#ff8844', desc:'Tłusta ryba słodkowodna.' },
  { id:'pike',      name:'Szczupak',     emoji:'🦈', rarity:'uncommon',  minLvl:3,  baseXp:28,  baseVal:35,  weight:[2.0,7.0],  color:'#88cc44', desc:'Zwinny drapieżnik.' },
  { id:'trout',     name:'Pstrąg',       emoji:'🐟', rarity:'rare',      minLvl:4,  baseXp:40,  baseVal:55,  weight:[0.8,3.0],  color:'#ff55aa', desc:'Górska piękność.' },
  { id:'catfish',   name:'Sum',          emoji:'🐊', rarity:'rare',      minLvl:5,  baseXp:55,  baseVal:75,  weight:[3.0,12.0], color:'#8855cc', desc:'Nocny myśliwy.' },
  { id:'salmon',    name:'Łosoś',        emoji:'🐟', rarity:'epic',      minLvl:7,  baseXp:80,  baseVal:120, weight:[2.0,8.0],  color:'#ff4444', desc:'Król rzeki.' },
  { id:'sturgeon',  name:'Jesiotr',      emoji:'🦑', rarity:'epic',      minLvl:9,  baseXp:100, baseVal:180, weight:[5.0,20.0], color:'#7744aa', desc:'Pradawna ryba.' },
  { id:'goldfish',  name:'Złota Rybka',  emoji:'✨', rarity:'legendary', minLvl:10, baseXp:200, baseVal:500, weight:[0.1,0.3],  color:'#ffcc00', desc:'Spełnia jedno życzenie!' },
  { id:'dragon',    name:'Smok Wodny',   emoji:'🐉', rarity:'legendary', minLvl:15, baseXp:500, baseVal:1000,weight:[10.0,30.0],color:'#aa00ff', desc:'Legendarny potwór głębin.' },
];

const RARITY_WEIGHTS = {
  common:    { weight: 60, color: '#aaaaaa' },
  uncommon:  { weight: 25, color: '#55cc55' },
  rare:      { weight: 10, color: '#5588ff' },
  epic:      { weight: 4,  color: '#aa55ff' },
  legendary: { weight: 1,  color: '#ffaa00' },
};

// ---- UPGRADES ----
const UPGRADES = [
  {
    id: 'rod',
    name: 'Wędka',
    emoji: '🎣',
    desc: 'Zwiększa szansę na rzut i redukuje trudność holowania.',
    levels: [
      { cost: 0,   label: 'Bambusowa',      bonus: 'Podstawowa wędka' },
      { cost: 80,  label: 'Drewniana',       bonus: '+10% szansy na branie' },
      { cost: 200, label: 'Włókno węglowe',  bonus: '+20% szansy, -10% trudność' },
      { cost: 500, label: 'Titanowa',        bonus: '+35% szansy, -20% trudność' },
      { cost: 1200,label: 'Magiczna',        bonus: '+50% szansy, -30% trudność' },
    ],
    statKey: 'rodLevel',
  },
  {
    id: 'bait',
    name: 'Przynęta',
    emoji: '🪱',
    desc: 'Lepsza przynęta przyciąga rzadsze ryby.',
    levels: [
      { cost: 0,   label: 'Dżdżownica',   bonus: 'Podstawowa' },
      { cost: 60,  label: 'Mucha',         bonus: '+10% rzadkości' },
      { cost: 180, label: 'Błystka',       bonus: '+25% rzadkości' },
      { cost: 450, label: 'Żywa rybka',    bonus: '+40% rzadkości' },
      { cost: 1000,label: 'Magiczny robak',bonus: '+60% rzadkości, +legendarny' },
    ],
    statKey: 'baitLevel',
  },
  {
    id: 'lure',
    name: 'Kołowrotek',
    emoji: '⚙️',
    desc: 'Szybsze holowanie i większa XP.',
    levels: [
      { cost: 0,   label: 'Plastikowy',  bonus: 'Podstawowy' },
      { cost: 100, label: 'Metalowy',    bonus: '+15% szybkości holowania' },
      { cost: 280, label: 'Baitrunner',  bonus: '+30% szybkości, +10% XP' },
      { cost: 700, label: 'Pro Series',  bonus: '+50% szybkości, +25% XP' },
      { cost: 1500,label: 'Diamentowy',  bonus: '+75% szybkości, +50% XP' },
    ],
    statKey: 'lureLevel',
  },
];

// ---- UTILITY ----
function rand(a, b) { return a + Math.random() * (b - a); }
function randInt(a, b) { return Math.floor(rand(a, b + 1)); }
function lerp(a, b, t) { return a + (b - a) * t; }
function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

function weightedRandom(items) {
  let total = items.reduce((s, i) => s + i.w, 0);
  let r = Math.random() * total;
  for (const i of items) { r -= i.w; if (r <= 0) return i.v; }
  return items[items.length - 1].v;
}

function pickFish() {
  const p = state.player;
  const available = FISH_TYPES.filter(f => f.minLvl <= p.level);
  const baitBonus = (p.baitLevel - 1) * 0.15;

  const pool = [];
  for (const f of available) {
    let w = RARITY_WEIGHTS[f.rarity].weight;
    if (f.rarity !== 'common') w *= (1 + baitBonus);
    pool.push({ w, v: f });
  }
  return weightedRandom(pool);
}

function calcFishValue(fish) {
  const w = rand(fish.weight[0], fish.weight[1]);
  const mult = 0.8 + w / fish.weight[1] * 0.5;
  return { weight: w.toFixed(2), value: Math.round(fish.baseVal * mult) };
}

// ---- MESSAGES ----
const msgLog = document.getElementById('messageLog');
const msgs = [];
function addMsg(text, color = '#e8d5a3') {
  const el = document.createElement('div');
  el.className = 'msg';
  el.style.borderColor = color;
  el.style.color = color;
  el.textContent = text;
  msgLog.prepend(el);
  msgs.push({ el, timer: 4000 });
  if (msgs.length > 4) {
    const old = msgs.shift();
    old.el.remove();
  }
}

function updateMsgs(dt) {
  for (const m of msgs) {
    m.timer -= dt;
    if (m.timer < 800) m.el.classList.add('fade');
    if (m.timer <= 0) m.el.remove();
  }
  for (let i = msgs.length - 1; i >= 0; i--) {
    if (msgs[i].timer <= 0) msgs.splice(i, 1);
  }
}

// ---- NOTIFICATION ----
const notifEl = document.getElementById('notification');
let notifTimer = 0;
function showNotif(text, color = '#ffaa00') {
  notifEl.textContent = text;
  notifEl.style.borderColor = color;
  notifEl.style.color = color;
  notifEl.style.opacity = '1';
  notifTimer = 2000;
}

// ---- HUD ----
function updateHUD() {
  const p = state.player;
  const hudEl = document.getElementById('playerHud');
  const xpPct = Math.round(p.xp / p.xpMax * 100);
  const energyPct = Math.round(p.energy / p.energyMax * 100);
  const rod = UPGRADES[0].levels[p.rodLevel - 1].label;
  const bait = UPGRADES[1].levels[p.baitLevel - 1].label;
  hudEl.innerHTML = `
    <span class="label">LVL ${p.level}</span> &nbsp;
    <span class="label">💰 ${p.coins}</span><br>
    XP: <div class="bar-container"><div class="bar-fill bar-xp" style="width:${xpPct}%"></div></div> ${p.xp}/${p.xpMax}<br>
    ⚡ <div class="bar-container"><div class="bar-fill bar-energy" style="width:${energyPct}%"></div></div> ${Math.ceil(p.energy)}/${p.energyMax}<br>
    🎣 ${rod} &nbsp; 🪱 ${bait}
  `;
}

// ---- XP / LEVEL ----
function addXP(amount) {
  const p = state.player;
  const lureBonus = 1 + (p.lureLevel - 1) * 0.15;
  amount = Math.round(amount * lureBonus);
  p.xp += amount;
  while (p.xp >= p.xpMax) {
    p.xp -= p.xpMax;
    p.level++;
    p.xpMax = Math.round(p.xpMax * 1.4);
    p.energyMax = Math.min(200, p.energyMax + 10);
    p.energy = p.energyMax;
    showNotif(`⬆ POZIOM ${p.level}!`, '#ffaa00');
    addMsg(`Awansowałeś na poziom ${p.level}! Max energia wzrosła.`, '#ffaa00');
    spawnLevelUpParticles();
  }
}

// ---- INIT SCENERY ----
function initScenery() {
  for (let i = 0; i < 6; i++) {
    state.birds.push({ x: rand(0, 800), y: rand(30, 130), vx: rand(0.3, 0.8) * (Math.random() > 0.5 ? 1 : -1), phase: rand(0, Math.PI * 2) });
  }
  for (let i = 0; i < 5; i++) {
    state.clouds.push({ x: rand(0, 800), y: rand(20, 100), w: rand(60, 140), speed: rand(0.05, 0.15) });
  }
}
initScenery();

// ---- PARTICLES ----
function spawnSplash(x, y) {
  for (let i = 0; i < 12; i++) {
    const angle = rand(-Math.PI, 0);
    const speed = rand(1, 4);
    state.particles.push({
      x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
      life: 1, decay: rand(0.03, 0.07), color: P.waterFoam, size: rand(2, 5),
    });
  }
}

function spawnLevelUpParticles() {
  for (let i = 0; i < 20; i++) {
    const angle = rand(0, Math.PI * 2);
    const speed = rand(2, 6);
    state.particles.push({
      x: state.player.x + 10, y: state.player.y,
      vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed - 2,
      life: 1, decay: rand(0.02, 0.05), color: '#ffaa00', size: rand(3, 7),
    });
  }
}

function spawnCoinParticles(x, y, n = 8) {
  for (let i = 0; i < n; i++) {
    const angle = rand(-Math.PI, 0);
    const speed = rand(1, 3);
    state.particles.push({
      x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed - 1,
      life: 1, decay: rand(0.025, 0.055), color: '#ffcc00', size: rand(3, 6),
      text: '💰',
    });
  }
}

// ============================================================
//  DRAW FUNCTIONS
// ============================================================

function drawPixelRect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(Math.round(x), Math.round(y), w, h);
}

function drawBackground() {
  // Sky gradient
  const skyGrad = ctx.createLinearGradient(0, 0, 0, 300);
  skyGrad.addColorStop(0, P.sky2);
  skyGrad.addColorStop(1, P.sky1);
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, 800, 600);

  // Stars
  ctx.fillStyle = 'rgba(255,255,255,0.6)';
  for (let i = 0; i < 40; i++) {
    const sx = (i * 197 + 50) % 800;
    const sy = (i * 137 + 20) % 200;
    const blink = 0.4 + 0.6 * Math.sin(state.time * 0.002 + i);
    ctx.globalAlpha = blink * 0.7;
    ctx.fillRect(sx, sy, 1, 1);
  }
  ctx.globalAlpha = 1;

  // Moon
  ctx.fillStyle = '#ffe8aa';
  ctx.beginPath();
  ctx.arc(680, 55, 22, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = P.sky2;
  ctx.beginPath();
  ctx.arc(692, 49, 20, 0, Math.PI * 2);
  ctx.fill();

  // Clouds
  for (const c of state.clouds) {
    drawCloud(c.x, c.y, c.w);
  }

  // Distant mountains
  drawMountains();

  // Trees (background)
  for (let i = 0; i < 8; i++) {
    const tx = 20 + i * 95 + (i % 2) * 20;
    drawTree(tx, 255, 0.7 + (i % 3) * 0.1);
  }

  // Ground
  drawGround();

  // Water
  drawWater();

  // Dock
  drawDock();

  // Trees (foreground left)
  drawTree(30, 320, 1.0);
  drawTree(70, 315, 0.85);

  // House (right side)
  drawHouse(620, 240);

  // Birds
  for (const b of state.birds) {
    drawBird(b.x, b.y, b.phase);
  }
}

function drawCloud(x, y, w) {
  ctx.fillStyle = P.cloudShadow;
  for (let px = 0; px < w; px += 4) {
    const h = 8 + 6 * Math.sin((px / w) * Math.PI);
    ctx.fillRect(Math.round(x + px), Math.round(y + 4), 4, h);
  }
  ctx.fillStyle = P.cloud;
  for (let px = 0; px < w - 4; px += 4) {
    const h = 12 + 8 * Math.sin((px / (w - 4)) * Math.PI);
    ctx.fillRect(Math.round(x + px + 2), Math.round(y), 4, h);
  }
}

function drawMountains() {
  const pts = [[0,280],[80,180],[160,250],[240,160],[340,220],[420,140],[520,210],[620,160],[700,220],[800,170],[800,280]];
  // shadow
  ctx.fillStyle = '#1a1a35';
  ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
  for (const [mx, my] of pts) ctx.lineTo(mx, my + 6);
  ctx.lineTo(800, 280); ctx.lineTo(0, 280); ctx.closePath(); ctx.fill();
  // main
  ctx.fillStyle = P.mountain;
  ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
  for (const [mx, my] of pts) ctx.lineTo(mx, my);
  ctx.lineTo(800, 280); ctx.lineTo(0, 280); ctx.closePath(); ctx.fill();
  // snow caps
  ctx.fillStyle = P.mountainSnow;
  const peaks = [[80,180],[240,160],[420,140],[620,160]];
  for (const [px, py] of peaks) {
    ctx.beginPath();
    ctx.moveTo(px - 20, py + 25);
    ctx.lineTo(px, py);
    ctx.lineTo(px + 20, py + 25);
    ctx.closePath(); ctx.fill();
  }
}

function drawGround() {
  // Main ground
  for (let x = 0; x < 800; x += 4) {
    const h = 4 + 2 * Math.sin(x * 0.03 + 0.5);
    drawPixelRect(x, 310, 4, h, (x / 4 % 2 === 0) ? P.grass1 : P.grass2);
  }
  drawPixelRect(0, 314, 800, 30, P.dirt);
  for (let x = 0; x < 800; x += 8) {
    drawPixelRect(x, 315, 4, 2, P.dirt2);
  }

  // Water bank (left side leading to dock)
  for (let x = 0; x < 420; x += 4) {
    const slope = 310 + (x / 420) * 40;
    drawPixelRect(x, slope, 4, 4, P.grass3);
  }
}

function drawWater() {
  const waveOff = state.wave;
  // Water body
  for (let y = 350; y < 600; y += 4) {
    const depth = (y - 350) / 250;
    const c = lerpColor(P.water2, P.water1, depth);
    ctx.fillStyle = c;
    ctx.fillRect(0, y, 800, 4);
  }

  // Wave lines
  for (let i = 0; i < 5; i++) {
    const wy = 354 + i * 12;
    ctx.strokeStyle = P.waterLight;
    ctx.globalAlpha = 0.3 + 0.15 * Math.sin(state.time * 0.003 + i);
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = 0; x < 800; x += 2) {
      const wh = 2 * Math.sin((x * 0.025) + waveOff + i * 1.2);
      if (x === 0) ctx.moveTo(x, wy + wh);
      else ctx.lineTo(x, wy + wh);
    }
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  // Water surface shimmer
  for (let i = 0; i < 8; i++) {
    const sx = (i * 150 + state.time * 0.05) % 800;
    const sy = 355 + (i * 30) % 40;
    ctx.fillStyle = P.waterFoam;
    ctx.globalAlpha = 0.15 + 0.1 * Math.sin(state.time * 0.004 + i * 2);
    ctx.fillRect(sx, sy, rand(20, 60), 2);
  }
  ctx.globalAlpha = 1;

  // Ripples
  for (const r of state.ripples) {
    ctx.strokeStyle = P.waterLight;
    ctx.globalAlpha = r.alpha;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.ellipse(r.x, r.y, r.rx, r.ry, 0, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  // Bubbles
  for (const b of state.bubbles) {
    ctx.fillStyle = P.bubble;
    ctx.globalAlpha = b.alpha;
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function lerpColor(c1, c2, t) {
  const r1 = parseInt(c1.slice(1, 3), 16), g1 = parseInt(c1.slice(3, 5), 16), b1 = parseInt(c1.slice(5, 7), 16);
  const r2 = parseInt(c2.slice(1, 3), 16), g2 = parseInt(c2.slice(3, 5), 16), b2 = parseInt(c2.slice(5, 7), 16);
  const r = Math.round(lerp(r1, r2, t)), g = Math.round(lerp(g1, g2, t)), b = Math.round(lerp(b1, b2, t));
  return `rgb(${r},${g},${b})`;
}

function drawDock() {
  // Dock posts
  for (let i = 0; i < 3; i++) {
    const px = 300 + i * 50;
    drawPixelRect(px, 330, 6, 50, P.dockDark);
    drawPixelRect(px + 1, 332, 4, 6, P.dock);
  }
  // Dock surface (planks)
  for (let i = 0; i < 10; i++) {
    const dx = 270 + i * 16;
    drawPixelRect(dx, 322, 14, 12, (i % 2 === 0) ? P.dock : P.dockPlank);
    drawPixelRect(dx, 322, 14, 2, P.dockPlank);
    drawPixelRect(dx, 332, 14, 1, P.dockDark);
  }
  // Dock edge
  drawPixelRect(268, 320, 4, 14, P.dockDark);
  drawPixelRect(430, 320, 4, 14, P.dockDark);
  // Side railing
  drawPixelRect(270, 318, 162, 4, P.dock);
}

function drawTree(x, y, scale = 1.0) {
  const s = scale;
  // Trunk
  drawPixelRect(x + 6 * s, y - 28 * s, 8 * s, 28 * s, P.treeTrunk);
  drawPixelRect(x + 8 * s, y - 26 * s, 4 * s, 22 * s, '#7a5030');
  // Leaves (3 layers)
  for (let layer = 0; layer < 3; layer++) {
    const lw = (20 - layer * 5) * s;
    const lh = (16 - layer * 3) * s;
    const lx = x + 10 * s - lw / 2;
    const ly = y - 40 * s - layer * 14 * s;
    ctx.fillStyle = layer === 1 ? P.tree1 : P.tree2;
    ctx.fillRect(Math.round(lx), Math.round(ly), Math.round(lw), Math.round(lh));
    // highlights
    ctx.fillStyle = '#2a8a2a';
    ctx.fillRect(Math.round(lx + 4 * s), Math.round(ly + 2 * s), Math.round(4 * s), Math.round(4 * s));
  }
}

function drawHouse(x, y) {
  // Shadow
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.fillRect(x - 2, y + 2, 102, 72);
  // Walls
  drawPixelRect(x, y, 100, 70, P.house);
  for (let i = 0; i < 10; i++) {
    drawPixelRect(x, y + i * 7, 100, 2, P.dockDark);
  }
  // Roof
  ctx.fillStyle = P.houseRoof;
  ctx.beginPath();
  ctx.moveTo(x - 8, y);
  ctx.lineTo(x + 50, y - 35);
  ctx.lineTo(x + 108, y);
  ctx.closePath(); ctx.fill();
  // Roof shadow
  ctx.fillStyle = '#881111';
  ctx.beginPath();
  ctx.moveTo(x - 8, y);
  ctx.lineTo(x + 50, y - 35);
  ctx.lineTo(x + 50, y - 35);
  ctx.lineTo(x + 52, y - 35);
  ctx.lineTo(x + 108, y);
  ctx.closePath(); ctx.fill();
  // Windows
  drawPixelRect(x + 12, y + 15, 22, 20, P.houseWindow);
  drawPixelRect(x + 18, y + 14, 10, 2, '#6699aa');
  drawPixelRect(x + 14, y + 25, 18, 2, '#6699aa');
  drawPixelRect(x + 66, y + 15, 22, 20, P.houseWindow);
  drawPixelRect(x + 72, y + 14, 10, 2, '#6699aa');
  drawPixelRect(x + 68, y + 25, 18, 2, '#6699aa');
  // Door
  drawPixelRect(x + 38, y + 40, 24, 30, '#3a2010');
  drawPixelRect(x + 57, y + 52, 4, 4, '#ffcc44');
  // Sign
  drawPixelRect(x + 35, y + 5, 30, 12, '#c8a050');
  ctx.fillStyle = '#3a2010';
  ctx.font = '6px Courier New';
  ctx.fillText('SKLEP', x + 37, y + 13);
}

function drawBird(x, y, phase) {
  const flap = Math.sin(phase + state.time * 0.005) * 4;
  ctx.strokeStyle = '#aaaacc';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(x - 5, y);
  ctx.quadraticCurveTo(x, y + flap, x + 5, y);
  ctx.stroke();
}

function drawPlayer() {
  const p = state.player;
  const px = Math.round(p.x);
  const py = Math.round(p.y);
  const castAnim = state.castAnim;

  // Shadow
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.beginPath();
  ctx.ellipse(px + 8, py + 34, 14, 5, 0, 0, Math.PI * 2);
  ctx.fill();

  // Shoes
  drawPixelRect(px + 2, py + 28, 8, 6, P.playerShoe);
  drawPixelRect(px + 14, py + 28, 8, 6, P.playerShoe);

  // Pants
  drawPixelRect(px + 2, py + 18, 8, 12, P.playerPants);
  drawPixelRect(px + 14, py + 18, 8, 12, P.playerPants);

  // Shirt
  drawPixelRect(px + 1, py + 8, 22, 12, P.playerShirt);
  // Shirt detail
  ctx.fillStyle = '#224488';
  ctx.fillRect(px + 1, py + 8, 22, 2);

  // Arms
  const armAngle = state.casting ? -0.8 + castAnim * 0.6 : 0.3 * Math.sin(state.time * 0.004);
  // Right arm (holding rod)
  const armLen = 10;
  const armEndX = px + 22 + Math.cos(armAngle) * armLen;
  const armEndY = py + 10 + Math.sin(armAngle) * armLen;
  ctx.strokeStyle = P.playerSkin;
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(px + 22, py + 10);
  ctx.lineTo(armEndX, armEndY);
  ctx.stroke();
  // Left arm
  ctx.beginPath();
  ctx.moveTo(px + 2, py + 10);
  ctx.lineTo(px - 4, py + 16);
  ctx.stroke();

  // Head
  drawPixelRect(px + 5, py, 16, 16, P.playerSkin);
  // Eyes
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(px + 8, py + 5, 3, 3);
  ctx.fillRect(px + 14, py + 5, 3, 3);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px + 9, py + 5, 1, 1);
  ctx.fillRect(px + 15, py + 5, 1, 1);
  // Smile
  ctx.fillStyle = '#cc8844';
  ctx.fillRect(px + 8, py + 11, 8, 2);
  ctx.fillStyle = P.playerSkin;
  ctx.fillRect(px + 9, py + 11, 2, 1);
  ctx.fillRect(px + 14, py + 11, 2, 1);
  // Hat
  drawPixelRect(px + 4, py - 5, 18, 6, P.playerHat);
  drawPixelRect(px + 2, py - 1, 22, 3, P.playerHat);
  ctx.fillStyle = '#6b3410';
  ctx.fillRect(px + 4, py - 5, 18, 2);
  // Hat band
  ctx.fillStyle = '#ff8800';
  ctx.fillRect(px + 4, py - 1, 18, 2);

  // Fishing rod
  drawFishingRod(armEndX, armEndY);
}

function drawFishingRod(ax, ay) {
  if (!state.hookVisible && !state.casting) return;

  const p = state.player;
  const rodTipX = ax + 40;
  const rodTipY = ay - 30;

  // Rod body (pixel art style)
  ctx.strokeStyle = '#8b6914';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(ax, ay);
  ctx.lineTo(rodTipX, rodTipY);
  ctx.stroke();
  // Rod highlight
  ctx.strokeStyle = '#c8a050';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(ax + 1, ay + 1);
  ctx.lineTo(rodTipX + 1, rodTipY + 1);
  ctx.stroke();
  // Rod guides
  for (let i = 0; i < 3; i++) {
    const t = (i + 1) / 4;
    const gx = lerp(ax, rodTipX, t);
    const gy = lerp(ay, rodTipY, t);
    ctx.fillStyle = '#888';
    ctx.fillRect(Math.round(gx), Math.round(gy - 1), 2, 3);
  }

  // Fishing line
  if (state.hookVisible || state.reeling) {
    const hx = state.hookX;
    const hy = state.hookY;
    ctx.strokeStyle = 'rgba(255,255,255,0.7)';
    ctx.lineWidth = 1;
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(rodTipX, rodTipY);
    // Slight sag in line
    const midX = (rodTipX + hx) / 2;
    const midY = (rodTipY + hy) / 2 + 15;
    ctx.quadraticCurveTo(midX, midY, hx, hy);
    ctx.stroke();

    // Hook
    if (state.hookVisible) {
      ctx.strokeStyle = P.hook;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(hx, hy);
      ctx.lineTo(hx, hy + 8);
      ctx.arc(hx + 3, hy + 8, 3, Math.PI, 0, true);
      ctx.stroke();

      // Fish on hook?
      if (state.fishOnLine) {
        const fish = state.fishOnLine;
        ctx.font = '16px serif';
        ctx.fillText(fish.emoji, hx - 8, hy + 5);
      }
    }
  }
  ctx.setLineDash([]);
}

function drawParticles() {
  for (const p of state.particles) {
    ctx.fillStyle = p.color;
    ctx.globalAlpha = p.life;
    if (p.text) {
      ctx.font = `${Math.round(p.size * 2)}px serif`;
      ctx.fillText(p.text, p.x, p.y);
    } else {
      ctx.fillRect(Math.round(p.x), Math.round(p.y), Math.round(p.size), Math.round(p.size));
    }
  }
  ctx.globalAlpha = 1;
}

function drawCastIndicator() {
  if (!state.casting) return;
  const progress = state.castProgress;
  const cx = state.player.x + 30;
  const cy = state.player.y - 20;

  // Power bar background
  drawPixelRect(cx - 2, cy - 52, 16, 50, '#111');
  drawPixelRect(cx, cy - 50, 12, 46, '#222');

  // Power bar fill
  const barH = Math.round(46 * progress);
  const barColor = progress < 0.4 ? '#4488ff' : progress < 0.75 ? '#44ff44' : '#ff4444';
  drawPixelRect(cx, cy - 4 - barH + 46, 12, barH, barColor);

  // Label
  ctx.fillStyle = '#ffffff';
  ctx.font = '8px Courier New';
  ctx.fillText('SIŁA', cx - 1, cy - 54);
}

// ============================================================
//  FISHING LOGIC
// ============================================================

const castBtn = document.getElementById('castBtn');

castBtn.addEventListener('click', () => {
  if (state.reeling) {
    doReel();
  } else if (state.casting) {
    releaseCast();
  } else {
    startCast();
  }
});

function startCast() {
  if (state.player.energy < 10) {
    addMsg('Za mało energii! Odpocznij chwilę.', '#ff5555');
    return;
  }
  state.casting = true;
  state.castProgress = 0;
  castBtn.textContent = '💪 Puść!';
  castBtn.classList.add('casting');
  addMsg('Trzymaj i puść aby rzucić!');
}

function releaseCast() {
  if (!state.casting) return;
  state.casting = false;
  const power = state.castProgress;

  // Calculate landing position based on power
  const dist = 80 + power * 280;
  state.hookX = state.player.x + dist + 60;
  state.hookY = lerp(390, 430, power);
  state.hookVisible = true;
  state.reeling = false;
  state.castAnim = 1;

  // Energy cost
  state.player.energy = Math.max(0, state.player.energy - 8);

  // Splash effect
  spawnSplash(state.hookX, state.hookY);
  state.ripples.push({ x: state.hookX, y: state.hookY, rx: 2, ry: 1, alpha: 0.8 });

  // Calculate bite chance and timer
  const rodBonus = 1 + (state.player.rodLevel - 1) * 0.12;
  const baitBonus = 1 + (state.player.baitLevel - 1) * 0.08;
  state.biteChance = clamp(0.15 * rodBonus * baitBonus, 0.05, 0.85);
  state.biteTimer = rand(2000, 5000) / rodBonus;
  state.fishOnLine = null;

  castBtn.textContent = '🎣 Holuj!';
  castBtn.classList.remove('casting');
  castBtn.classList.add('reeling');
  addMsg(`Zarzucono na ${Math.round(dist)}m! Czekaj na branie...`);
}

function doReel() {
  if (!state.hookVisible && !state.reeling) return;

  if (state.fishOnLine) {
    // Active reeling - fight the fish
    const lureBonus = 1 + (state.player.lureLevel - 1) * 0.17;
    state.reelingProgress += 0.12 * lureBonus;

    // Hook moves toward player
    state.hookX = lerp(state.hookX, state.player.x + 80, 0.15);
    state.hookY = lerp(state.hookY, 380, 0.1);

    if (state.reelingProgress >= 1) {
      catchFish();
    } else {
      addMsg(`Holujesz... ${Math.round(state.reelingProgress * 100)}%`, '#44aaff');
    }
  } else {
    // No fish, just reel in
    state.hookX = lerp(state.hookX, state.player.x + 60, 0.3);
    state.hookY = lerp(state.hookY, 340, 0.3);
    if (state.hookX < state.player.x + 70) {
      resetHook();
      addMsg('Nic nie złowiono. Spróbuj ponownie!');
    }
  }
}

function catchFish() {
  const fish = state.fishOnLine;
  const { weight, value } = calcFishValue(fish);
  const xpGain = fish.baseXp;

  state.fish.push({ ...fish, weight: parseFloat(weight), value, caught: Date.now() });

  addXP(xpGain);
  spawnSplash(state.hookX, state.hookY);
  spawnCoinParticles(state.hookX, state.hookY - 30, 6);

  const rarityColor = RARITY_WEIGHTS[fish.rarity].color;
  addMsg(`🎉 Złowiłeś ${fish.name}! ${weight}kg | +${xpGain} XP`, rarityColor);
  showNotif(`${fish.emoji} ${fish.name}!`, rarityColor);

  resetHook();
}

function resetHook() {
  state.hookVisible = false;
  state.reeling = false;
  state.fishOnLine = null;
  state.reelingProgress = 0;
  state.biteTimer = 0;
  castBtn.textContent = '🎣 Zarzuć wędkę';
  castBtn.classList.remove('casting', 'reeling');
}

// ============================================================
//  UPDATE LOOP
// ============================================================

let lastTime = 0;

function update(ts) {
  const dt = Math.min(ts - lastTime, 100);
  lastTime = ts;

  state.time = ts;
  state.wave = ts * 0.002;
  state.animFrame = Math.floor(ts / 200) % 4;

  // Energy regen
  if (!state.casting && !state.reeling) {
    state.player.energy = Math.min(state.player.energyMax, state.player.energy + 0.005 * dt);
  }

  // Cast power charging
  if (state.casting) {
    state.castProgress = Math.min(1, state.castProgress + 0.0008 * dt);
    if (state.castProgress >= 1) state.castProgress = 0; // loop for visual
  }

  // Cast animation
  if (state.castAnim > 0) state.castAnim = Math.max(0, state.castAnim - 0.04);

  // Bite timer
  if (state.hookVisible && !state.fishOnLine && state.biteTimer > 0) {
    state.biteTimer -= dt;
    if (state.biteTimer <= 0) {
      if (Math.random() < state.biteChance) {
        const fish = pickFish();
        state.fishOnLine = fish;
        state.reelingProgress = 0;
        state.reelingDifficulty = fish.weight[1] * 0.3;

        // Bite splash
        spawnSplash(state.hookX, state.hookY);
        for (let i = 0; i < 3; i++) {
          state.ripples.push({ x: state.hookX + rand(-10, 10), y: state.hookY, rx: 2, ry: 1, alpha: 0.9 });
        }

        const rarityColor = RARITY_WEIGHTS[fish.rarity].color;
        addMsg(`🐟 BRANIE! ${fish.name} na haku! Holuj szybko!`, rarityColor);
      } else {
        // No bite, reset
        resetHook();
        addMsg('Ryba uciekła... Spróbuj ponownie.');
      }
    }

    // Hook bobbing
    if (!state.fishOnLine) {
      state.hookY += Math.sin(state.time * 0.006) * 0.15;
    } else {
      // Fish fighting - hook shakes
      state.hookX += Math.sin(state.time * 0.02) * 0.8;
      state.hookY += Math.sin(state.time * 0.015) * 0.5;
    }
  }

  // Ripples
  for (const r of state.ripples) {
    r.rx += 0.04 * dt * 0.06;
    r.ry += 0.02 * dt * 0.06;
    r.alpha -= 0.01 * dt * 0.06;
  }
  state.ripples = state.ripples.filter(r => r.alpha > 0);

  // Bubbles
  if (state.hookVisible && Math.random() < 0.03) {
    state.bubbles.push({ x: state.hookX + rand(-15, 15), y: state.hookY - 5, r: rand(2, 5), vy: -0.3, alpha: 0.6 });
  }
  for (const b of state.bubbles) {
    b.y += b.vy;
    b.alpha -= 0.005;
  }
  state.bubbles = state.bubbles.filter(b => b.alpha > 0);

  // Particles
  for (const p of state.particles) {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.1;
    p.life -= p.decay;
  }
  state.particles = state.particles.filter(p => p.life > 0);

  // Birds
  for (const b of state.birds) {
    b.x += b.vx;
    b.phase += 0.05;
    if (b.x > 850) b.x = -10;
    if (b.x < -10) b.x = 810;
  }

  // Clouds
  for (const c of state.clouds) {
    c.x += c.speed;
    if (c.x > 900) c.x = -150;
  }

  // Notification
  if (notifTimer > 0) {
    notifTimer -= dt;
    if (notifTimer <= 0) notifEl.style.opacity = '0';
  }

  updateMsgs(dt);
  updateHUD();
}

// ============================================================
//  RENDER LOOP
// ============================================================

function render() {
  ctx.clearRect(0, 0, 800, 600);
  drawBackground();
  drawPlayer();
  drawCastIndicator();
  drawParticles();
}

function gameLoop(ts) {
  update(ts);
  render();
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

// ============================================================
//  PANELS
// ============================================================

function closeAllPanels() {
  document.getElementById('inventoryPanel').style.display = 'none';
  document.getElementById('shopPanel').style.display = 'none';
  document.getElementById('upgradesPanel').style.display = 'none';
}

// --- INVENTORY ---
document.getElementById('inventoryBtn').addEventListener('click', () => {
  const panel = document.getElementById('inventoryPanel');
  if (panel.style.display === 'block') { closeAllPanels(); return; }
  closeAllPanels();
  renderInventory();
  panel.style.display = 'block';
});

function renderInventory() {
  const content = document.getElementById('inventoryContent');
  if (state.fish.length === 0) {
    content.innerHTML = '<div style="text-align:center;color:#666;padding:20px;">Brak ryb. Idź łowić!</div>';
    return;
  }

  let total = 0;
  let html = '';
  const counts = {};
  for (const f of state.fish) {
    const key = f.id;
    if (!counts[key]) counts[key] = { fish: f, count: 0, totalVal: 0 };
    counts[key].count++;
    counts[key].totalVal += f.value;
    total += f.value;
  }

  for (const key in counts) {
    const { fish, count, totalVal } = counts[key];
    const rc = RARITY_WEIGHTS[fish.rarity].color;
    html += `<div class="fish-row">
      <span class="fish-emoji">${fish.emoji}</span>
      <div class="fish-info">
        <div class="fish-name" style="color:${rc}">${fish.name} x${count}</div>
        <div class="fish-detail rarity-${fish.rarity}">${fish.rarity} | Wartość: ${totalVal} 💰</div>
      </div>
      <button class="sell-btn" onclick="sellFish('${key}',1)">Sprzedaj 1<br>+${fish.value}💰</button>
      <button class="sell-btn" onclick="sellFish('${key}',${count})">Sprzedaj<br>wszystkie</button>
    </div>`;
  }
  html += `<div style="text-align:right;padding:8px;color:#8fc97a;font-weight:bold;">Łączna wartość: ${total} 💰</div>`;
  html += `<div style="text-align:center;padding-top:4px"><button class="sell-btn" onclick="sellAllFish()">💰 SPRZEDAJ WSZYSTKO (${total} 💰)</button></div>`;
  content.innerHTML = html;
}

window.sellFish = function(id, count) {
  let sold = 0, coins = 0;
  for (let i = state.fish.length - 1; i >= 0 && sold < count; i--) {
    if (state.fish[i].id === id) {
      coins += state.fish[i].value;
      state.fish.splice(i, 1);
      sold++;
    }
  }
  state.player.coins += coins;
  addMsg(`Sprzedano ${sold}x ryb za ${coins} 💰`, '#ffcc00');
  spawnCoinParticles(state.player.x + 20, state.player.y - 10, 5);
  renderInventory();
};

window.sellAllFish = function() {
  let total = state.fish.reduce((s, f) => s + f.value, 0);
  state.player.coins += total;
  const n = state.fish.length;
  state.fish = [];
  addMsg(`Sprzedano ${n} ryb za ${total} 💰!`, '#ffcc00');
  spawnCoinParticles(state.player.x + 20, state.player.y - 10, 12);
  renderInventory();
};

// --- SHOP ---
document.getElementById('shopBtn').addEventListener('click', () => {
  const panel = document.getElementById('shopPanel');
  if (panel.style.display === 'block') { closeAllPanels(); return; }
  closeAllPanels();
  renderShop();
  panel.style.display = 'block';
});

function renderShop() {
  const content = document.getElementById('shopContent');
  const shopItems = [
    { id: 'energy_small',  name: 'Mały lunch',       emoji: '🥪', cost: 15,  desc: '+30 energii',         effect: () => { state.player.energy = Math.min(state.player.energyMax, state.player.energy + 30); } },
    { id: 'energy_big',    name: 'Obiad',             emoji: '🍱', cost: 40,  desc: '+80 energii',         effect: () => { state.player.energy = Math.min(state.player.energyMax, state.player.energy + 80); } },
    { id: 'energy_full',   name: 'Uczta rybaka',      emoji: '🍣', cost: 100, desc: 'Pełna energia + bufi', effect: () => { state.player.energy = state.player.energyMax; addMsg('Poczułeś przypływ sił!', '#44ff44'); } },
    { id: 'xp_potion',     name: 'Eliksir doświadcz.', emoji: '✨', cost: 80,  desc: '+50 XP',              effect: () => { addXP(50); } },
    { id: 'xp_big',        name: 'Wielki eliksir XP', emoji: '💫', cost: 200, desc: '+150 XP',             effect: () => { addXP(150); } },
  ];

  let html = `<div style="color:#777;font-size:11px;margin-bottom:10px;">Twoje monety: <span style="color:#ffcc00">${state.player.coins} 💰</span></div>`;
  for (const item of shopItems) {
    const canAfford = state.player.coins >= item.cost;
    html += `<div class="fish-row">
      <span class="fish-emoji">${item.emoji}</span>
      <div class="fish-info">
        <div class="fish-name">${item.name}</div>
        <div class="fish-detail">${item.desc}</div>
      </div>
      <button class="buy-btn" onclick="buyShopItem('${item.id}')" ${canAfford ? '' : 'disabled style="opacity:0.4;cursor:not-allowed"'}>
        Kup<br>${item.cost}💰
      </button>
    </div>`;
    // store effects for access
    if (!window._shopItems) window._shopItems = {};
    window._shopItems[item.id] = item;
  }
  content.innerHTML = html;
}

window.buyShopItem = function(id) {
  const item = window._shopItems[id];
  if (!item || state.player.coins < item.cost) return;
  state.player.coins -= item.cost;
  item.effect();
  addMsg(`Kupiono: ${item.name}!`, '#44ff44');
  renderShop();
};

// --- UPGRADES ---
document.getElementById('upgradesBtn').addEventListener('click', () => {
  const panel = document.getElementById('upgradesPanel');
  if (panel.style.display === 'block') { closeAllPanels(); return; }
  closeAllPanels();
  renderUpgrades();
  panel.style.display = 'block';
});

function renderUpgrades() {
  const content = document.getElementById('upgradesContent');
  let html = `<div style="color:#777;font-size:11px;margin-bottom:10px;">Twoje monety: <span style="color:#ffcc00">${state.player.coins} 💰</span></div>`;

  for (const upg of UPGRADES) {
    const current = state.player[upg.statKey];
    const maxLevel = upg.levels.length;
    const isMax = current >= maxLevel;
    const nextLevel = upg.levels[current]; // next upgrade (0-indexed = current level)
    const currentInfo = upg.levels[current - 1];
    const canAfford = !isMax && state.player.coins >= nextLevel.cost;

    html += `<div class="upgrade-row">
      <span class="upgrade-icon">${upg.emoji}</span>
      <div class="upgrade-info">
        <div class="upgrade-name">${upg.name}</div>
        <div class="upgrade-level">Poziom ${current}/${maxLevel - 1}: ${currentInfo.label}</div>
        <div class="upgrade-desc">${isMax ? '✅ Maksymalny poziom!' : `Następne: ${nextLevel.label} | ${nextLevel.bonus}`}</div>
      </div>
      ${isMax ? '<span style="color:#ffaa00">MAX</span>' :
        `<button class="buy-btn" onclick="buyUpgrade('${upg.id}')" ${canAfford ? '' : 'disabled style="opacity:0.4;cursor:not-allowed"'}>
          Ulepsz<br>${nextLevel.cost}💰
        </button>`}
    </div>`;
  }

  html += `<div style="color:#555;font-size:11px;margin-top:12px;padding:8px;border-top:1px solid #223322;">
    💡 Wskazówka: Łów ryby → sprzedaj w ekwipunku → kupuj ulepszenia
  </div>`;

  content.innerHTML = html;
}

window.buyUpgrade = function(id) {
  const upg = UPGRADES.find(u => u.id === id);
  if (!upg) return;
  const current = state.player[upg.statKey];
  const maxLevel = upg.levels.length;
  if (current >= maxLevel) return;
  const nextLevel = upg.levels[current];
  if (state.player.coins < nextLevel.cost) return;

  state.player.coins -= nextLevel.cost;
  state.player[upg.statKey]++;

  addMsg(`✅ Ulepszono ${upg.name} do poziomu ${state.player[upg.statKey]}!`, '#44ff44');
  spawnCoinParticles(state.player.x, state.player.y - 20, 4);
  renderUpgrades();
};

// ============================================================
//  KEYBOARD SHORTCUTS
// ============================================================

document.addEventListener('keydown', (e) => {
  switch (e.code) {
    case 'Space': case 'KeyF':
      e.preventDefault();
      castBtn.click();
      break;
    case 'KeyI':
      document.getElementById('inventoryBtn').click();
      break;
    case 'KeyS':
      document.getElementById('shopBtn').click();
      break;
    case 'KeyU':
      document.getElementById('upgradesBtn').click();
      break;
    case 'Escape':
      closeAllPanels();
      break;
  }
});

// Initial message
addMsg('Witaj w Pixel Fisher RPG! Naciśnij SPACJĘ aby zarzucić wędkę.', '#8fc97a');
addMsg('Klawisz I = Ekwipunek | S = Sklep | U = Ulepszenia', '#777');
