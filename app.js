const KEY = 'mpa-v2';

const fresh = () => ({
  days: {},
  settings: {
    lang: 'bi',
    theme: 'light',
    pin: '',
    times: {
      fajr: '05:05',
      dhuhr: '12:10',
      asr: '15:30',
      maghrib: '18:05',
      isha: '19:15'
    },
    reminders: [],
    income: {
      target: 10000,
      earned: 0,
      focus: 'AI Malayalam facts content',
      actions: []
    }
  }
});

function readDB() {
  try {
    const value = JSON.parse(localStorage.getItem(KEY));
    if (value && value.days && value.settings) {
      const base = fresh();
      value.settings = {
        ...base.settings,
        ...value.settings,
        times: { ...base.settings.times, ...(value.settings.times || {}) },
        reminders: Array.isArray(value.settings.reminders) ? value.settings.reminders : [],
        income: { ...base.settings.income, ...(value.settings.income || {}) }
      };
      if (!value.days || typeof value.days !== 'object') value.days = {};
      return value;
    }
  } catch (error) {
    console.error('Could not read app data:', error);
  }
  return fresh();
}

let db = readDB();
let lang = db.settings.lang || 'bi';

const $ = id => document.getElementById(id);
const dateKey = (d = new Date()) =>
  d.getFullYear() + '-' +
  String(d.getMonth() + 1).padStart(2, '0') + '-' +
  String(d.getDate()).padStart(2, '0');

function day(k = dateKey()) {
  if (!db.days[k]) {
    db.days[k] = {
      tasks: [false, false, false],
      prayers: [false, false, false, false, false],
      habits: [false, false, false, false],
      quran: 0, wake: '', sleep: '', foods: [],
      weight: '', walk: 0, water: 0, studies: [],
      mood: 'okay', difficulty: '', win: '', tomorrow: ''
    };
  }
  const d = db.days[k];
  d.tasks ||= [false, false, false];
  d.prayers ||= [false, false, false, false, false];
  d.habits ||= [false, false, false, false];
  d.foods ||= [];
  d.studies ||= [];
  return d;
}

function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(db));
    render();
  } catch (error) {
    alert('Could not save. Your browser storage may be full. Export a backup.');
    console.error(error);
  }
}

const words = {
  ml: {
    welcome: 'നമസ്കാരം!',
    subtitle: 'ഓരോ ദിവസവും ചെറിയ പുരോഗതി',
    home: 'ഹോം',
    habits: 'ശീലങ്ങൾ',
    health: 'ആരോഗ്യം',
    study: 'പഠനം',
    settings: 'ക്രമീകരണങ്ങൾ',
    tasks: 'ഇന്നത്തെ പ്രധാന 3 ജോലികൾ',
    prayer: 'നമസ്കാരവും ശീലങ്ങളും',
    food: 'ഭക്ഷണവും ആരോഗ്യവും',
    skills: 'പഠനവും കഴിവുകളും',
    coach: 'വ്യക്തിഗത സഹായി',
    charts: 'പുരോഗതി ചാർട്ടുകൾ',
    income: 'വരുമാന ലക്ഷ്യങ്ങൾ',
    report: 'ദിവസ റിപ്പോർട്ട്',
    save: 'സേവ് ചെയ്യുക',
    add: 'ചേർക്കുക',
    language: 'ഭാഷ',
    theme: 'തീം',
    noStudy: 'ഇന്ന് പഠന സെഷനുകൾ രേഖപ്പെടുത്തിയിട്ടില്ല.',
    next: 'ഒരു ചെറിയ ജോലി തിരഞ്ഞെടുക്കുക.',
    done: 'നന്നായി! ഇന്നത്തെ പുരോഗതി പരിശോധിച്ച് നാളത്തെ പദ്ധതി തയ്യാറാക്കുക.',
    saved: 'സേവ് ചെയ്തു',
    enterFood: 'ഭക്ഷണവും ഗ്രാമും നൽകുക.',
    enterMinutes: 'മിനിറ്റ് നൽകുക.',
    copied: 'പകർത്തി',
    backup: 'Export backup',
    invalidBackup: 'Backup ഫയൽ ശരിയല്ല.',
    importSuccess: 'Backup ഇറക്കുമതി ചെയ്തു.',
    target: 'മാസ വരുമാന ലക്ഷ്യം',
    earned: 'ലഭിച്ച വരുമാനം',
    reminder: 'ഓർമ്മപ്പെടുത്തൽ',
    noData: 'വിവരങ്ങളൊന്നുമില്ല'
  },
  en: {
    welcome: 'Welcome back!',
    subtitle: 'Small steps, every day',
    home: 'Home',
    habits: 'Habits',
    health: 'Health',
    study: 'Study',
    settings: 'Settings',
    tasks: "Today's Top 3 tasks",
    prayer: 'Prayer & habits',
    food: 'Food & health',
    skills: 'Study & skills',
    coach: 'Personal coach',
    charts: 'Progress charts',
    income: 'Income goals',
    report: 'Daily report',
    save: 'Save',
    add: 'Add',
    language: 'Language',
    theme: 'Theme',
    noStudy: 'No study sessions logged today.',
    next: 'Choose one small task.',
    done: 'Great work! Review today and plan tomorrow.',
    saved: 'Saved',
    enterFood: 'Enter food and grams.',
    enterMinutes: 'Enter minutes.',
    copied: 'Copied',
    backup: 'Export backup',
    invalidBackup: 'Invalid backup file.',
    importSuccess: 'Backup imported.',
    target: 'Monthly income target',
    earned: 'Income earned',
    reminder: 'Reminder',
    noData: 'No data yet'
  },
  bi: {
    welcome: 'നമസ്കാരം! Welcome back.',
    subtitle: 'Small steps, every day • ഓരോ ദിവസവും ചെറിയ പുരോഗതി',
    home: 'Home',
    habits: 'Habits',
    health: 'Health',
    study: 'Study',
    settings: 'Settings',
    tasks: "Today's Top 3 / ഇന്നത്തെ പ്രധാന 3",
    prayer: 'Prayer & habits / നമസ്കാരവും ശീലങ്ങളും',
    food: 'Food & health / ഭക്ഷണവും ആരോഗ്യവും',
    skills: 'Study & skills / പഠനവും കഴിവുകളും',
    coach: 'AI Coach / വ്യക്തിഗത സഹായി',
    charts: 'Progress charts / പുരോഗതി',
    income: 'Income goals / വരുമാന ലക്ഷ്യങ്ങൾ',
    report: 'Daily report / ദിവസ റിപ്പോർട്ട്',
    save: 'Save / സേവ് ചെയ്യുക',
    add: 'Add / ചേർക്കുക',
    language: 'Language / ഭാഷ',
    theme: 'Theme / തീം',
    noStudy: 'No sessions logged / പഠന സെഷനുകൾ ഇല്ല.',
    next: 'Choose one small task. / ഒരു ചെറിയ ജോലി തിരഞ്ഞെടുക്കുക.',
    done: 'Great work! / നന്നായി!',
    saved: 'Saved / സേവ് ചെയ്തു',
    enterFood: 'Enter food and grams / ഭക്ഷണവും ഗ്രാമും നൽകുക.',
    enterMinutes: 'Enter minutes / മിനിറ്റ് നൽകുക.',
    copied: 'Copied / പകർത്തി',
    backup: 'Export backup',
    invalidBackup: 'Invalid backup / തെറ്റായ ഫയൽ.',
    importSuccess: 'Backup imported / Backup ചേർത്തു.',
    target: 'Monthly target / മാസ ലക്ഷ്യം',
    earned: 'Earned / ലഭിച്ചത്',
    reminder: 'Reminder / ഓർമ്മപ്പെടുത്തൽ',
    noData: 'No data / വിവരങ്ങളില്ല'
  }
};

function tr(key) {
  return (words[lang] && words[lang][key]) ||
         words.bi[key] || key;
}

const taskNames = [
  'Prayer + Qur’an / നമസ്കാരം + ഖുർആൻ',
  'Study / പഠനം',
  'Health / ആരോഗ്യം'
];

const prayerNames = [
  'Fajr / സുബ്ഹ്', 'Dhuhr / ളുഹർ',
  'Asr / അസർ', 'Maghrib / മഗ്‌രിബ്', 'Isha / ഇശാ'
];

const habitNames = [
  'Qur’an / ഖുർആൻ', 'Walk / നടത്തം',
  'English / ഇംഗ്ലീഷ്', 'Help family / വീട്ടിൽ സഹായം'
];

const foods = {
  rice:[1.3,.027], 'ചോറ്':[1.3,.027],
  dosa:[1.65,.035], 'ദോശ':[1.65,.035],
  idli:[1.3,.025], 'ഇഡലി':[1.3,.025],
  chapati:[2.8,.09], 'ചപ്പാത്തി':[2.8,.09],
  egg:[1.55,.13], 'മുട്ട':[1.55,.13],
  banana:[.89,.011], 'പഴം':[.89,.011],
  chicken:[1.8,.27], 'ചിക്കൻ':[1.8,.27],
  fish:[1.4,.22], 'മീൻ':[1.4,.22],
  milk:[.62,.033], 'പാൽ':[.62,.033],
  oats:[3.89,.17], 'ഓട്സ്':[3.89,.17],
  bread:[2.65,.09], 'ബ്രെഡ്':[2.65,.09],
  puttu:[1.8,.04], 'പുട്ട്':[1.8,.04],
  appam:[1.5,.03], 'അപ്പം':[1.5,.03],
  sambar:[.7,.035], 'സാമ്പാർ':[.7,.035],
  curd:[.6,.035], 'തൈര്':[.6,.035],
  apple:[.52,.003], 'ആപ്പിൾ':[.52,.003],
  potato:[.87,.02], 'ഉരുളക്കിഴങ്ങ്':[.87,.02]
};

function show(id) {
  if (!$ (id)) return;
  document.querySelectorAll('.view').forEach(v =>
    v.classList.toggle('active', v.id === id)
  );
  document.querySelectorAll('nav button').forEach(b =>
    b.classList.toggle('activeNav', b.dataset.v === id)
  );
  window.scrollTo({ top: 0, behavior: 'smooth' });
  render();
}

function renderHome() {
  const d = day();
  const n = d.tasks.filter(Boolean).length;
  $('tasks').innerHTML = taskNames.map((x, i) =>
    '<label class="check"><input type="checkbox" ' +
    (d.tasks[i] ? 'checked' : '') +
    ' onchange="day().tasks[' + i + ']=this.checked;save()">' +
    '<span>' + x + '<small>' +
    [
      'Aim for prayers and 10 minutes Qur’an',
      'One focused B.Com CA or English session',
      'Walk and log meals'
    ][i] + '</small></span></label>'
  ).join('');
  $('taskStat').textContent = n + '/3';
  $('prayStat').textContent = d.prayers.filter(Boolean).length + '/5';
  $('studyStat').textContent = d.studies.reduce((a, s) => a + (+s.m || 0), 0) + 'm';
  $('prog').style.width = (n / 3 * 100) + '%';
  $('next').textContent = n === 3 ? tr('done') : tr('next');
}

function renderPrayer() {
  const d = day();
  $('prayers').innerHTML = prayerNames.map((x, i) =>
    '<label class="check"><input type="checkbox" ' +
    (d.prayers[i] ? 'checked' : '') +
    ' onchange="day().prayers[' + i + ']=this.checked;save()">' +
    '<span>' + x + '<small>' +
    Object.values(db.settings.times)[i] +
    '</small></span></label>'
  ).join('');

  $('habits').innerHTML = habitNames.map((x, i) =>
    '<label class="check"><input type="checkbox" ' +
    (d.habits[i] ? 'checked' : '') +
    ' onchange="day().habits[' + i + ']=this.checked;save()">' +
    '<span>' + x + '</span></label>'
  ).join('');

  $('quran').value = d.quran || '';
  $('wake').value = d.wake || '';
  $('sleep').value = d.sleep || '';

  $('prayerTimes').innerHTML =
    Object.entries(db.settings.times).map(([k, v]) =>
      '<div class="field"><label>' + k + '</label>' +
      '<input id="time_' + k + '" type="time" value="' + v + '"></div>'
    ).join('');
}

function savePrayer() {
  const d = day();
  d.quran = +$('quran').value || 0;
  d.wake = $('wake').value;
  d.sleep = $('sleep').value;
  for (const k of Object.keys(db.settings.times)) {
    const input = $('time_' + k);
    if (input) db.settings.times[k] = input.value;
  }
  save();
  alert(tr('saved'));
}

function addFood() {
  const d = document.createElement('div');
  d.className = 'foodrow';
  d.innerHTML =
    '<input class="fname" placeholder="Food / ഭക്ഷണം">' +
    '<input class="grams" type="number" min="1" placeholder="g">' +
    '<button type="button" class="secondary" aria-label="Remove food" ' +
    'onclick="this.parentElement.remove()">×</button>';
  $('foodrows').appendChild(d);
}

function estimate(name, grams) {
  const n = name.toLowerCase();
  const key = Object.keys(foods).find(k => n.includes(k.toLowerCase()));
  return key
    ? { k: Math.round(foods[key][0] * grams),
        p: Math.round(foods[key][1] * grams * 10) / 10,
        known: true }
    : { k: 0, p: 0, known: false };
}

function saveFood() {
  const items = [...document.querySelectorAll('.foodrow')].map(r => {
    const n = r.querySelector('.fname').value.trim();
    const g = +r.querySelector('.grams').value || 0;
    const e = estimate(n, g);
    return { n, g, k: e.k, p: e.p, known: e.known };
  }).filter(x => x.n && x.g > 0);

  if (!items.length) return alert(tr('enterFood'));
  day().foods.push({ meal: $('meal').value, items });
  $('foodrows').innerHTML = '';
  addFood();
  save();
}

function saveHealth() {
  const d = day();
  d.weight = $('weight').value;
  d.walk = +$('walk').value || 0;
  d.water = +$('water').value || 0;
  save();
  alert(tr('saved'));
}

function renderFood() {
  const d = day();
  const items = d.foods.flatMap(x => x.items || []);
  $('foodsum').textContent =
    d.foods.length + ' meal logs • approx ' +
    items.reduce((s, x) => s + (+x.k || 0), 0) + ' kcal • ' +
    items.reduce((s, x) => s + (+x.p || 0), 0).toFixed(1) +
    'g protein' +
    (items.some(x => !x.known) ? ' (some foods not recognized)' : '');
  $('weight').value = d.weight || '';
  $('walk').value = d.walk || '';
  $('water').value = d.water || '';
}

function saveStudy() {
  const m = +$('mins').value || 0;
  if (m <= 0) return alert(tr('enterMinutes'));
  day().studies.push({
    subject: $('subject').value,
    m,
    notes: $('notes').value
  });
  $('mins').value = '';
  $('notes').value = '';
  save();
}

function renderStudy() {
  $('studyhistory').innerHTML =
    day().studies.map(s =>
      '<div class="task">' + s.subject + ' — ' + s.m +
      ' min <small>' + s.notes + '</small></div>'
    ).join('') || '<small>' + tr('noStudy') + '</small>';
}

function reportText() {
  const d = day();
  const items = d.foods.flatMap(x => x.items || []);
  return 'MY PERSONAL ASSISTANT — ' + dateKey() +
    '\nTop tasks: ' + d.tasks.filter(Boolean).length + '/3' +
    '\nPrayers: ' + d.prayers.filter(Boolean).length + '/5' +
    '\nQur’an: ' + d.quran + ' minutes' +
    '\nHabits: ' + d.habits.filter(Boolean).length + '/4' +
    '\nStudy: ' + d.studies.reduce((s, x) => s + (+x.m || 0), 0) + ' minutes' +
    '\nFood: ' + d.foods.length + ' meal logs; approx ' +
    items.reduce((s, x) => s + (+x.k || 0), 0) + ' kcal, ' +
    items.reduce((s, x) => s + (+x.p || 0), 0).toFixed(1) + 'g protein' +
    '\nWalking: ' + d.walk + ' minutes; water: ' + d.water +
    ' glasses; weight: ' + (d.weight || 'not logged') + ' kg' +
    '\nMood: ' + d.mood + '; difficulty: ' + (d.difficulty || 'not logged') +
    '\nWin: ' + (d.win || 'not logged') +
    '\nTomorrow: ' + (d.tomorrow || 'not logged') +
    '\nNutrition values are rough estimates.';
}

function renderReport() {
  $('reporttext').textContent = reportText();
  $('win').value = day().win || '';
  $('tomorrow').value = day().tomorrow || '';
}

function saveReflection() {
  day().win = $('win').value;
  day().tomorrow = $('tomorrow').value;
  save();
}

async function copy(s) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(s);
    } else {
      const e = document.createElement('textarea');
      e.value = s;
      e.style.position = 'fixed';
      e.style.opacity = '0';
      document.body.appendChild(e);
      e.select();
      const ok = document.execCommand('copy');
      e.remove();
      if (!ok) throw new Error('Copy failed');
    }
    alert(tr('copied'));
  } catch (error) {
    alert('Copy failed. Please select and copy the text manually.');
  }
}

function copyReport() {
  copy(reportText());
}

function copyPrompt() {
  copy(
    'Analyze this report and suggest a realistic plan for tomorrow in ' +
    (lang === 'ml' ? 'Malayalam' : lang === 'en' ? 'English' : 'Malayalam + English') +
    '. Keep only Top 3 priorities.\n\n' + reportText()
  );
}

function coach() {
  const d = day();
  d.mood = $('mood').value;
  d.difficulty = $('difficulty').value;
  localStorage.setItem(KEY, JSON.stringify(db));

  const suggestions = ['NEXT STEPS / അടുത്ത നിർദേശങ്ങൾ'];
  if (d.prayers.filter(Boolean).length < 5)
    suggestions.push('• Focus on the next prayer. / അടുത്ത നമസ്കാരത്തിൽ ശ്രദ്ധിക്കുക.');
  if (d.studies.reduce((s, x) => s + (+x.m || 0), 0) < 45)
    suggestions.push('• Do one 25-minute B.Com CA or English session.');
  if (d.walk < 20)
    suggestions.push('• If practical, take an easy 10–20 minute walk.');
  if (!d.foods.length)
    suggestions.push('• Log your next meal and approximate portion.');
  if (d.mood === 'tired')
    suggestions.push('• Reduce today’s plan and protect your sleep.');
  if (d.difficulty)
    suggestions.push('• Make tomorrow’s hardest task smaller.');
  suggestions.push('• Basic rule-based coach; not connected to cloud AI.');
  $('coachout').textContent = suggestions.join('\n');
}

function chart(id, get) {
  const rows = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    rows.push({
      label: d.toLocaleDateString(undefined, { weekday: 'short' }),
      value: get(db.days[dateKey(d)] || {})
    });
  }
  const max = Math.max(1, ...rows.map(x => x.value));
  $(id).innerHTML = rows.map(x =>
    '<div class="barrow"><span>' + x.label +
    '</span><div class="track"><div class="fill" style="width:' +
    (x.value / max * 100) + '%"></div></div><b>' +
    x.value + '</b></div>'
  ).join('');
}

function renderCharts() {
  chart('studyChart', d => (d.studies || []).reduce((s, x) => s + (+x.m || 0), 0));
  chart('walkChart', d => +d.walk || 0);
  chart('prayChart', d => (d.prayers || []).filter(Boolean).length);
}

function saveIncome() {
  db.settings.income = {
    ...db.settings.income,
    target: +$('target').value || 0,
    earned: +$('earned').value || 0,
    focus: $('focus').value
  };
  save();
}

function addAction() {
  const s = $('action').value.trim();
  if (!s) return;
  db.settings.income.actions.push({ s, done: false });
  $('action').value = '';
  save();
}

function renderIncome() {
  const x = db.settings.income;
  $('target').value = x.target;
  $('earned').value = x.earned;
  $('focus').value = x.focus;
  $('incomeout').textContent =
    '₹' + x.earned + ' / ₹' + x.target + ' • ' +
    (x.target ? Math.round(x.earned / x.target * 100) : 0) +
    '% of target';

  $('actions').innerHTML = x.actions.map((a, i) =>
    '<label class="check"><input type="checkbox" ' +
    (a.done ? 'checked' : '') +
    ' onchange="db.settings.income.actions[' + i + '].done=this.checked;save()">' +
    '<span>' + a.s + '</span>' +
    '<button type="button" class="secondary" onclick="db.settings.income.actions.splice(' +
    i + ',1);save()">×</button></label>'
  ).join('');
}

function setLang(value) {
  if (!['ml', 'en', 'bi'].includes(value)) return;
  lang = value;
  db.settings.lang = value;
  localStorage.setItem(KEY, JSON.stringify(db));
  applyLanguage();
  render();
}

function applyLanguage() {
  document.documentElement.lang = lang === 'ml' ? 'ml' : 'en';

  const hello = $('hello');
  if (hello) hello.textContent = tr('welcome');

  const date = $('date');
  if (date) {
    date.textContent = new Date().toLocaleDateString(
      lang === 'ml' ? 'ml-IN' : 'en-IN',
      { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
    );
  }

  const navKeys = ['home', 'habits', 'health', 'study', 'settings'];
  document.querySelectorAll('nav button').forEach((button, i) => {
    const span = button.querySelector('span');
    button.textContent = '';
    if (span) button.appendChild(span);
    button.appendChild(document.createTextNode(tr(navKeys[i] || 'home')));
  });

  const titles = {
    home: 'tasks', prayer: 'prayer', food: 'food',
    study: 'skills', coach: 'coach', charts: 'charts',
    income: 'income', settings: 'settings', report: 'report'
  };

  for (const [id, key] of Object.entries(titles)) {
    const section = $(id);
    const heading = section && section.querySelector('.section');
    if (heading) heading.textContent = tr(key);
  }

  document.querySelectorAll('.lang button').forEach(button => {
    const value = button.getAttribute('onclick') || '';
    button.setAttribute('aria-pressed',
      value.includes("'" + lang + "'") ? 'true' : 'false');
  });
}

function setTheme(value) {
  if (!['light', 'dark', 'system'].includes(value)) return;
  db.settings.theme = value;
  applyTheme();
  localStorage.setItem(KEY, JSON.stringify(db));
}

function applyTheme() {
  const value = db.settings.theme || 'light';
  const dark = value === 'dark' ||
    (value === 'system' &&
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);

  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  if ($('theme')) $('theme').value = value;
}

async function hash(value) {
  const bytes = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(value)
  );
  return [...new Uint8Array(bytes)]
    .map(x => x.toString(16).padStart(2, '0')).join('');
}

async function setPin() {
  const value = $('pin').value;
  if (!/^\d{4,8}$/.test(value)) {
    alert('Enter 4–8 digits');
    return;
  }
  if (!crypto.subtle) {
    alert('PIN setup requires a secure HTTPS page.');
    return;
  }
  db.settings.pin = await hash(value);
  $('pin').value = '';
  save();
  alert('PIN saved. This does not lock the app or encrypt your data.');
}

function removePin() {
  if (confirm('Remove saved PIN?')) {
    db.settings.pin = '';
    save();
  }
}

function backup() {
  const blob = new Blob([JSON.stringify(db, null, 2)], {
    type: 'application/json'
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'personal-assistant-backup.json';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

function restore(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const incoming = JSON.parse(reader.result);
      if (!incoming || !incoming.days || !incoming.settings) {
        throw new Error('Invalid backup');
      }
      if (!confirm('Replace current app data with this backup?')) return;

      const previous = localStorage.getItem(KEY);
      try {
        localStorage.setItem(KEY, JSON.stringify(incoming));
        db = readDB();
        lang = db.settings.lang || 'bi';
        render();
        alert(tr('importSuccess'));
      } catch (error) {
        if (previous !== null) localStorage.setItem(KEY, previous);
        alert('Import failed. Existing data was kept.');
      }
    } catch (error) {
      alert(tr('invalidBackup'));
    } finally {
      event.target.value = '';
    }
  };
  reader.readAsText(file);
}

function clearDay() {
  if (confirm('Delete today’s entries? This cannot be undone without a backup.')) {
    delete db.days[dateKey()];
    save();
  }
}

function addReminder() {
  const message = $('rmsg').value.trim();
  const time = $('rtime').value;
  if (!message || !time) {
    alert('Enter a reminder message and time.');
    return;
  }
  db.settings.reminders.push({ s: message, t: time, last: '' });
  $('rmsg').value = '';
  save();
}

function renderReminders() {
  $('reminders').innerHTML = db.settings.reminders.map((r, i) =>
    '<div class="task">' + r.t + ' — ' + r.s +
    ' <button type="button" class="secondary" onclick="db.settings.reminders.splice(' +
    i + ',1);save()">×</button></div>'
  ).join('');
}

async function enableNotify() {
  if (!('Notification' in window)) {
    alert('Notifications are not supported in this browser.');
    return;
  }
  const permission = await Notification.requestPermission();
  alert('Notification permission: ' + permission +
    '. Reminders are checked while the app is open.');
}

function checkReminders() {
  const time = new Date().toTimeString().slice(0, 5);
  const today = dateKey();

  for (const reminder of db.settings.reminders) {
    if (reminder.t !== time || reminder.last === today) continue;
    reminder.last = today;
    localStorage.setItem(KEY, JSON.stringify(db));

    if ('Notification' in window &&
        Notification.permission === 'granted' &&
        document.hidden) {
      new Notification('My Personal Assistant', { body: reminder.s });
    } else if (!document.hidden) {
      alert('Reminder: ' + reminder.s);
    }
  }
}

function render() {
  applyLanguage();
  renderHome();
  renderPrayer();
  renderFood();
  renderStudy();
  renderCharts();
  renderIncome();
  renderReminders();
  renderReport();
  applyTheme();
}

window.addEventListener('storage', event => {
  if (event.key === KEY && event.newValue) {
    db = readDB();
    lang = db.settings.lang || 'bi';
    render();
  }
});

if ($('date')) $('date').textContent = new Date().toLocaleDateString();
if ($('foodrows') && !$('foodrows').children.length) addFood();
render();

setInterval(checkReminders, 30000);

if ('serviceWorker' in navigator &&
    location.protocol.startsWith('http')) {
  navigator.serviceWorker.register('./sw.js').catch(console.error);
}
