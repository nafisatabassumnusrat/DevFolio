// ── STATE ──
const state = {
  template: 0,
  primaryColor: '#6c63ff',
  font: 'Syne',
  anim: 'fade',
  darkPortfolio: true,
  name: '', role: '', bio: '', avatar: '', bgImage: '',
  about: '', experience: '', resume: '',
  github: '', linkedin: '', twitter: '', instagram: '', website: '',
  email: '', phone: '', location: '',
  education: [],
  skills: [],
  projects: [],
  achievements: [],
  references: []
};

// ── BUILDER SIDEBAR ──
function switchSection(sec, el) {
  document.querySelectorAll('.form-section').forEach(s => s.classList.remove('active'));
  const target = document.getElementById('sec-' + sec);
  if (target) target.classList.add('active');
  document.querySelectorAll('.sidebar-item').forEach(s => s.classList.remove('active'));
  if (el) el.classList.add('active');
}

// ── NAVIGATION ──
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const pg = document.getElementById(id + '-page');
  if (pg) pg.classList.add('active');
  window.scrollTo(0, 0);
  // Update nav active
  const map = { home:'nav-home', templates:'nav-templates', blog:'nav-blog', builder:'nav-preview' };
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  if (map[id]) { const el = document.getElementById(map[id]); if (el) el.classList.add('active'); }
  // Hide footer on builder page
  const footer = document.getElementById('site-footer');
  if (footer) footer.style.display = (id === 'builder') ? 'none' : 'flex';
}

function setActiveNav(el) {
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  if (el) el.classList.add('active');
}

// ── THEME ──
let darkMode = true;
function toggleTheme() {
  darkMode = !darkMode;
  document.documentElement.setAttribute('data-theme', darkMode ? '' : 'light');
  document.querySelector('.theme-btn').textContent = darkMode ? '🌙' : '☀️';
}

// ── AVATAR UPLOAD ──
function handleAvatarUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    state.avatar = ev.target.result;
    document.getElementById('avatar-preview-wrap').innerHTML =
      `<img src="${state.avatar}" class="img-preview" alt="Avatar"><div class="img-upload-text">Image uploaded ✓</div>`;
    updatePreview();
  };
  reader.readAsDataURL(file);
}
function handleBgUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => { state.bgImage = ev.target.result; updatePreview(); };
  reader.readAsDataURL(file);
}

// ── DYNAMIC LISTS ──
function addEducation() {
  if (state.education.length >= 10) return;
  const id = Date.now();
  state.education.push({ id, degree: '', institution: '', year: '' });
  renderEducation();
}
function removeEducation(id) {
  state.education = state.education.filter(e => e.id !== id);
  renderEducation(); updatePreview();
}
function renderEducation() {
  const el = document.getElementById('edu-list');
  el.innerHTML = state.education.map(e => `
    <div class="dynamic-item">
      <div class="dynamic-item-header">
        <div class="dynamic-item-title">Education Entry</div>
        <button class="btn-remove" onclick="removeEducation(${e.id})">✕</button>
      </div>
      <div class="form-group" style="margin-bottom:10px">
        <label class="form-label">Degree</label>
        <input class="form-input" value="${e.degree}" placeholder="e.g. B.Sc. Computer Science" oninput="state.education.find(x=>x.id==${e.id}).degree=this.value;updatePreview()">
      </div>
      <div class="form-row">
        <div class="form-group" style="margin-bottom:0">
          <label class="form-label">Institution</label>
          <input class="form-input" value="${e.institution}" placeholder="University name" oninput="state.education.find(x=>x.id==${e.id}).institution=this.value;updatePreview()">
        </div>
        <div class="form-group" style="margin-bottom:0">
          <label class="form-label">Year</label>
          <input class="form-input" value="${e.year}" placeholder="2024" oninput="state.education.find(x=>x.id==${e.id}).year=this.value;updatePreview()">
        </div>
      </div>
    </div>`).join('');
}

function addSkill() {
  if (state.skills.length >= 20) return;
  const id = Date.now();
  state.skills.push({ id, name: '', level: 75 });
  renderSkills();
}
function removeSkill(id) {
  state.skills = state.skills.filter(s => s.id !== id);
  renderSkills(); updatePreview();
}
function renderSkills() {
  const el = document.getElementById('skills-list');
  el.innerHTML = state.skills.map(s => `
    <div class="dynamic-item">
      <div class="dynamic-item-header">
        <div class="dynamic-item-title">Skill</div>
        <button class="btn-remove" onclick="removeSkill(${s.id})">✕</button>
      </div>
      <div class="skill-row">
        <input class="form-input skill-name-input" value="${s.name}" placeholder="e.g. JavaScript" oninput="state.skills.find(x=>x.id==${s.id}).name=this.value;updatePreview()">
        <div class="skill-level-wrap">
          <div style="display:flex;justify-content:space-between;margin-bottom:4px">
            <span style="font-size:11px;color:var(--text3)">Level</span>
            <span style="font-size:11px;color:var(--accent)" id="skill-val-${s.id}">${s.level}%</span>
          </div>
          <input type="range" class="range-input" min="1" max="100" value="${s.level}"
            oninput="state.skills.find(x=>x.id==${s.id}).level=+this.value;document.getElementById('skill-val-${s.id}').textContent=this.value+'%';updatePreview()">
        </div>
      </div>
    </div>`).join('');
}

function addProject() {
  if (state.projects.length >= 10) return;
  const id = Date.now();
  state.projects.push({ id, name: '', desc: '', tech: '', image: '', github: '', demo: '' });
  renderProjects();
}
function removeProject(id) {
  state.projects = state.projects.filter(p => p.id !== id);
  renderProjects(); updatePreview();
}
function handleProjectImg(id, e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => { state.projects.find(x => x.id == id).image = ev.target.result; updatePreview(); };
  reader.readAsDataURL(file);
}
function renderProjects() {
  const el = document.getElementById('projects-list');
  el.innerHTML = state.projects.map(p => `
    <div class="dynamic-item">
      <div class="dynamic-item-header">
        <div class="dynamic-item-title">Project</div>
        <button class="btn-remove" onclick="removeProject(${p.id})">✕</button>
      </div>
      <div class="form-group" style="margin-bottom:10px">
        <label class="form-label">Project Name</label>
        <input class="form-input" value="${p.name}" placeholder="My Awesome Project" oninput="state.projects.find(x=>x.id==${p.id}).name=this.value;updatePreview()">
      </div>
      <div class="form-group" style="margin-bottom:10px">
        <label class="form-label">Description</label>
        <textarea class="form-textarea" style="min-height:60px" placeholder="What does this project do?" oninput="state.projects.find(x=>x.id==${p.id}).desc=this.value;updatePreview()">${p.desc}</textarea>
      </div>
      <div class="form-group" style="margin-bottom:10px">
        <label class="form-label">Tech Stack</label>
        <input class="form-input" value="${p.tech}" placeholder="React, Node.js, MongoDB" oninput="state.projects.find(x=>x.id==${p.id}).tech=this.value;updatePreview()">
      </div>
      <div class="form-group" style="margin-bottom:10px">
        <label class="form-label">Project Image</label>
        <div class="img-upload-area" style="padding:14px">
          <input type="file" accept="image/*" onchange="handleProjectImg(${p.id},event)">
          <div style="font-size:11px;color:var(--text3)">${p.image ? '✓ Image uploaded' : 'Click to upload image'}</div>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group" style="margin-bottom:0">
          <label class="form-label">GitHub</label>
          <input class="form-input" value="${p.github}" placeholder="https://github.com/..." oninput="state.projects.find(x=>x.id==${p.id}).github=this.value;updatePreview()">
        </div>
        <div class="form-group" style="margin-bottom:0">
          <label class="form-label">Live Demo</label>
          <input class="form-input" value="${p.demo}" placeholder="https://..." oninput="state.projects.find(x=>x.id==${p.id}).demo=this.value;updatePreview()">
        </div>
      </div>
    </div>`).join('');
}

function addAchievement() {
  if (state.achievements.length >= 6) return;
  const id = Date.now();
  state.achievements.push({ id, title: '', org: '', year: '', link: '' });
  renderAchievements();
}
function removeAchievement(id) {
  state.achievements = state.achievements.filter(a => a.id !== id);
  renderAchievements(); updatePreview();
}
function renderAchievements() {
  const el = document.getElementById('achievements-list');
  el.innerHTML = state.achievements.map(a => `
    <div class="dynamic-item">
      <div class="dynamic-item-header">
        <div class="dynamic-item-title">Achievement</div>
        <button class="btn-remove" onclick="removeAchievement(${a.id})">✕</button>
      </div>
      <div class="form-row" style="margin-bottom:10px">
        <div class="form-group" style="margin-bottom:0">
          <label class="form-label">Certificate Title</label>
          <input class="form-input" value="${a.title}" placeholder="AWS Developer Cert" oninput="state.achievements.find(x=>x.id==${a.id}).title=this.value;updatePreview()">
        </div>
        <div class="form-group" style="margin-bottom:0">
          <label class="form-label">Organization</label>
          <input class="form-input" value="${a.org}" placeholder="Amazon" oninput="state.achievements.find(x=>x.id==${a.id}).org=this.value;updatePreview()">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group" style="margin-bottom:0">
          <label class="form-label">Year</label>
          <input class="form-input" value="${a.year}" placeholder="2025" oninput="state.achievements.find(x=>x.id==${a.id}).year=this.value;updatePreview()">
        </div>
        <div class="form-group" style="margin-bottom:0">
          <label class="form-label">Link (optional)</label>
          <input class="form-input" value="${a.link}" placeholder="https://cert.link" oninput="state.achievements.find(x=>x.id==${a.id}).link=this.value;updatePreview()">
        </div>
      </div>
    </div>`).join('');
}

function addReference() {
  if (state.references.length >= 4) return;
  const id = Date.now();
  state.references.push({ id, name: '', position: '', company: '', email: '' });
  renderReferences();
}
function removeReference(id) {
  state.references = state.references.filter(r => r.id !== id);
  renderReferences(); updatePreview();
}
function renderReferences() {
  const el = document.getElementById('references-list');
  el.innerHTML = state.references.map(r => `
    <div class="dynamic-item">
      <div class="dynamic-item-header">
        <div class="dynamic-item-title">Reference</div>
        <button class="btn-remove" onclick="removeReference(${r.id})">✕</button>
      </div>
      <div class="form-row" style="margin-bottom:10px">
        <div class="form-group" style="margin-bottom:0">
          <label class="form-label">Name</label>
          <input class="form-input" value="${r.name}" placeholder="Jane Smith" oninput="state.references.find(x=>x.id==${r.id}).name=this.value;updatePreview()">
        </div>
        <div class="form-group" style="margin-bottom:0">
          <label class="form-label">Position</label>
          <input class="form-input" value="${r.position}" placeholder="CTO" oninput="state.references.find(x=>x.id==${r.id}).position=this.value;updatePreview()">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group" style="margin-bottom:0">
          <label class="form-label">Company</label>
          <input class="form-input" value="${r.company}" placeholder="TechCorp" oninput="state.references.find(x=>x.id==${r.id}).company=this.value;updatePreview()">
        </div>
        <div class="form-group" style="margin-bottom:0">
          <label class="form-label">Email</label>
          <input class="form-input" value="${r.email}" placeholder="jane@techcorp.com" oninput="state.references.find(x=>x.id==${r.id}).email=this.value;updatePreview()">
        </div>
      </div>
    </div>`).join('');
}

// ── CUSTOMIZATION ──
function setColor(color, el) {
  state.primaryColor = color;
  document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('selected'));
  if (el) el.classList.add('selected');
  updatePreview();
}
function setFont(font, el) {
  state.font = font;
  document.querySelectorAll('.font-option').forEach(f => f.classList.remove('selected'));
  el.classList.add('selected');
  updatePreview();
}
function setAnim(anim, el) {
  state.anim = anim;
  document.querySelectorAll('.anim-option').forEach(a => a.classList.remove('selected'));
  el.classList.add('selected');
  updatePreview();
}

// ── TEMPLATE SELECTION ──
function selectTemplate(idx) {
  state.template = idx;
  const labels = [
    '✅ Minimal Developer','🌑 Dark Programmer','🌈 Modern Gradient',
    '🎨 Creative Designer','🃏 Card Layout','💻 Terminal Style'
  ];
  for (let i = 0; i < 6; i++) {
    const el = document.getElementById('tpl-opt-' + i);
    if (!el) continue;
    el.style.borderColor = i === idx ? 'var(--accent)' : 'var(--border)';
    el.style.background = i === idx ? 'rgba(108,99,255,0.08)' : '';
    el.querySelector('.dynamic-item-title').textContent = labels[i];
  }
  updatePreview();
}
function selectTemplateAndBuild(idx) {
  selectTemplate(idx);
  showPage('builder');
}
function previewTemplate(idx) {
  selectTemplate(idx);
  const html = generatePortfolioHTML();
  const frame = document.getElementById('fullscreen-frame');
  const doc = frame.contentDocument || frame.contentWindow.document;
  doc.open(); doc.write(html); doc.close();
  document.getElementById('fullscreen-modal').classList.add('open');
}

// ── PORTFOLIO HTML GENERATOR ──
function syncFromInputs() {
  const g = id => { const el = document.getElementById(id); return el ? el.value : ''; };
  state.name = g('inp-name'); state.role = g('inp-role'); state.bio = g('inp-bio');
  state.about = g('inp-about'); state.experience = g('inp-experience'); state.resume = g('inp-resume');
  state.github = g('inp-github'); state.linkedin = g('inp-linkedin');
  state.twitter = g('inp-twitter'); state.instagram = g('inp-instagram'); state.website = g('inp-website');
  state.email = g('inp-email'); state.phone = g('inp-phone'); state.location = g('inp-location');
  state.darkPortfolio = document.getElementById('portfolio-dark').checked;
}

function generatePortfolioHTML() {
  syncFromInputs();
  const s = state;
  const tpl = s.template; // 0-5
  const col = s.primaryColor;
  const name = s.name || 'Your Name';
  const role = s.role || 'Web Developer';
  const bio = s.bio || 'Passionate developer building amazing digital experiences.';

  // ── Per-template color/style overrides ──
  let isDark = s.darkPortfolio;
  let heroBg = '', heroOverlay = '', heroTextAlign = 'center', heroLayout = 'center';
  let navStyle = '', bodyFont = s.font === 'JetBrains Mono' ? "'JetBrains Mono',monospace" : s.font === 'Georgia' ? "Georgia,serif" : `'${s.font}',sans-serif`;
  let extraCSS = '';

  if (tpl === 0) { // Minimal Developer – light, serif, lots of whitespace
    isDark = false;
    heroBg = 'background:#fafafa';
    extraCSS = `.hero-title{letter-spacing:-4px;color:#0a0a1f}.hero-role{font-size:18px;letter-spacing:2px;text-transform:uppercase;color:${col}}.section-title{font-size:36px;font-weight:900;letter-spacing:-2px}`;
  } else if (tpl === 1) { // Dark Programmer – very dark, neon, code vibes
    isDark = true;
    heroBg = 'background:linear-gradient(160deg,#050510 0%,#0a0a1f 100%)';
    extraCSS = `.hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 60% 50% at 50% 30%,${col}18,transparent);pointer-events:none}.hero-title{font-family:'JetBrains Mono',monospace;letter-spacing:-2px}.hero-role{font-family:'JetBrains Mono',monospace;font-size:14px;letter-spacing:2px;color:${col};text-transform:uppercase}.hero-bio{font-family:'JetBrains Mono',monospace;font-size:13px}.section-title::before{content:'// ';color:${col}66}`;
  } else if (tpl === 2) { // Modern Gradient – vibrant gradient hero
    isDark = true;
    heroBg = `background:linear-gradient(135deg,#667eea,#764ba2 50%,#f093fb)`;
    heroOverlay = `background:rgba(0,0,0,0.35)`;
    extraCSS = `.hero-title{color:#fff;text-shadow:0 4px 20px rgba(0,0,0,0.3)}.hero-role{color:rgba(255,255,255,0.9);font-size:20px}.hero-bio{color:rgba(255,255,255,0.8)}.btn-ps{color:#fff;border-color:rgba(255,255,255,0.6)}.section-title{background:linear-gradient(135deg,${col},#f093fb);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}`;
  } else if (tpl === 3) { // Creative Designer – warm tones, artistic
    isDark = false;
    heroBg = `background:linear-gradient(135deg,#fff7ed,#fde8d8)`;
    extraCSS = `.hero-title{color:#1a0a00;letter-spacing:-3px}.hero-role{color:${col};font-size:18px;font-style:italic}.section-title{font-style:italic;letter-spacing:-1px}.section-line{height:4px;border-radius:0;transform:skewX(-10deg)}`;
  } else if (tpl === 4) { // Card Layout – structured grid, professional
    isDark = true;
    heroBg = `background:#0d0d1a`;
    extraCSS = `.hero{flex-direction:row;text-align:left;justify-content:flex-start;gap:60px;padding:120px 80px 80px}.hero-content{align-items:flex-start}.hero-title{letter-spacing:-3px}.hero-btns{justify-content:flex-start}.section-title{display:flex;align-items:center;gap:12px}.section-title::after{content:'';flex:1;height:1px;background:${col}44}@media(max-width:768px){.hero{flex-direction:column;text-align:center;padding:80px 20px 40px}.hero-content{align-items:center}.hero-btns{justify-content:center}}`;
  } else if (tpl === 5) { // Terminal – monospace, green on black
    isDark = true;
    bodyFont = "'JetBrains Mono',monospace";
    heroBg = `background:#000`;
    extraCSS = `body{color:#00ff41}.hero-title{color:#00ff41;font-size:clamp(24px,4vw,48px);letter-spacing:0}.hero-role{color:${col};font-size:14px}.hero-bio{color:#00cc33;font-size:13px}.nav-brand{color:#00ff41}.section-title{color:#00ff41;font-size:24px}.section-line{background:#00ff41}.btn-pa{background:#00ff41;color:#000}.btn-ps{color:#00ff41;border-color:#00ff41}nav{background:rgba(0,0,0,0.95);border-bottom:1px solid #00ff4144}.hero::before{content:'> ';color:#00ff4166;font-size:14px;display:block;margin-bottom:20px}`;
  }

  const colors = {
    bg: isDark ? '#0a0a0f' : '#f8f9fa',
    bg2: isDark ? '#0f0f1a' : '#ffffff',
    surface: isDark ? '#16161f' : '#ffffff',
    text: isDark ? '#f0f0ff' : '#0a0a1f',
    text2: isDark ? '#a0a0c0' : '#4a4a70',
    border: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
  };
  const animCSS = s.anim === 'slide'
    ? `@keyframes enterAnim{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}`
    : s.anim === 'zoom'
    ? `@keyframes enterAnim{from{opacity:0;transform:scale(0.9)}to{opacity:1;transform:scale(1)}}`
    : `@keyframes enterAnim{from{opacity:0}to{opacity:1}}`;
  const font = bodyFont;
  const socialLinks = [
    s.github && `<a href="${s.github}" target="_blank" style="color:${col};text-decoration:none;font-size:14px;padding:8px 16px;border:1px solid ${col};border-radius:8px;transition:all 0.2s" onmouseover="this.style.background='${col}';this.style.color='#fff'" onmouseout="this.style.background='transparent';this.style.color='${col}'">GitHub</a>`,
    s.linkedin && `<a href="${s.linkedin}" target="_blank" style="color:${col};text-decoration:none;font-size:14px;padding:8px 16px;border:1px solid ${col};border-radius:8px;transition:all 0.2s" onmouseover="this.style.background='${col}';this.style.color='#fff'" onmouseout="this.style.background='transparent';this.style.color='${col}'">LinkedIn</a>`,
    s.twitter && `<a href="${s.twitter}" target="_blank" style="color:${col};text-decoration:none;font-size:14px;padding:8px 16px;border:1px solid ${col};border-radius:8px;transition:all 0.2s" onmouseover="this.style.background='${col}';this.style.color='#fff'" onmouseout="this.style.background='transparent';this.style.color='${col}'">Twitter</a>`,
    s.instagram && `<a href="${s.instagram}" target="_blank" style="color:${col};text-decoration:none;font-size:14px;padding:8px 16px;border:1px solid ${col};border-radius:8px;transition:all 0.2s" onmouseover="this.style.background='${col}';this.style.color='#fff'" onmouseout="this.style.background='transparent';this.style.color='${col}'">Instagram</a>`,
    s.website && `<a href="${s.website}" target="_blank" style="color:${col};text-decoration:none;font-size:14px;padding:8px 16px;border:1px solid ${col};border-radius:8px;transition:all 0.2s" onmouseover="this.style.background='${col}';this.style.color='#fff'" onmouseout="this.style.background='transparent';this.style.color='${col}'">Website</a>`,
  ].filter(Boolean).join(' ');
  const eduHTML = s.education.map(e => `
    <div style="background:${colors.surface};border:1px solid ${colors.border};border-radius:12px;padding:20px;margin-bottom:16px;animation:enterAnim 0.6s ease both">
      <div style="font-weight:700;font-size:17px;margin-bottom:4px">${e.degree || 'Degree'}</div>
      <div style="color:${col};font-size:14px;margin-bottom:2px">${e.institution || 'Institution'}</div>
      <div style="color:${colors.text2};font-size:13px">${e.year || 'Year'}</div>
    </div>`).join('') || `<div style="color:${colors.text2};font-style:italic">No education entries yet.</div>`;
  const skillsHTML = s.skills.map(sk => `
    <div style="margin-bottom:16px;animation:enterAnim 0.6s ease both">
      <div style="display:flex;justify-content:space-between;margin-bottom:6px">
        <span style="font-size:14px;font-weight:500">${sk.name || 'Skill'}</span>
        <span style="font-size:13px;color:${col}">${sk.level}%</span>
      </div>
      <div style="height:6px;background:${colors.border};border-radius:3px;overflow:hidden">
        <div style="height:100%;width:${sk.level}%;background:linear-gradient(90deg,${col},${col}88);border-radius:3px"></div>
      </div>
    </div>`).join('') || `<div style="color:${colors.text2};font-style:italic">No skills added yet.</div>`;
  const projectsHTML = s.projects.map(p => `
    <div style="background:${colors.surface};border:1px solid ${colors.border};border-radius:14px;overflow:hidden;transition:transform 0.3s,box-shadow 0.3s;animation:enterAnim 0.6s ease both" onmouseover="this.style.transform='translateY(-6px)';this.style.boxShadow='0 20px 40px rgba(0,0,0,0.2)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='none'">
      ${p.image ? `<img src="${p.image}" style="width:100%;height:160px;object-fit:cover" alt="${p.name}">` : `<div style="height:120px;background:linear-gradient(135deg,${col}22,${col}44);display:flex;align-items:center;justify-content:center;font-size:36px">🚀</div>`}
      <div style="padding:20px">
        <div style="font-weight:700;font-size:17px;margin-bottom:6px">${p.name || 'Project Name'}</div>
        <div style="color:${colors.text2};font-size:13px;line-height:1.7;margin-bottom:12px">${p.desc || 'Project description'}</div>
        <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px">${(p.tech||'').split(',').filter(Boolean).map(t => `<span style="padding:3px 10px;background:${col}22;color:${col};border-radius:100px;font-size:12px">${t.trim()}</span>`).join('')}</div>
        <div style="display:flex;gap:10px">
          ${p.github ? `<a href="${p.github}" target="_blank" style="color:${col};text-decoration:none;font-size:13px;font-weight:500">GitHub →</a>` : ''}
          ${p.demo ? `<a href="${p.demo}" target="_blank" style="color:${colors.text2};text-decoration:none;font-size:13px;font-weight:500">Live Demo →</a>` : ''}
        </div>
      </div>
    </div>`).join('') || `<div style="color:${colors.text2};font-style:italic">No projects added yet.</div>`;
  const achHTML = s.achievements.map(a => `
    <div style="background:${colors.surface};border:1px solid ${colors.border};border-radius:12px;padding:18px;animation:enterAnim 0.6s ease both">
      <div style="font-size:22px;margin-bottom:8px">🏆</div>
      <div style="font-weight:700;font-size:15px;margin-bottom:4px">${a.title || 'Certificate'}</div>
      <div style="color:${col};font-size:13px;margin-bottom:2px">${a.org || 'Organization'}</div>
      <div style="color:${colors.text2};font-size:12px;margin-bottom:10px">${a.year || 'Year'}</div>
      ${a.link ? `<a href="${a.link}" target="_blank" style="color:${col};font-size:13px;text-decoration:none;font-weight:500">View Certificate →</a>` : ''}
    </div>`).join('') || `<div style="color:${colors.text2};font-style:italic">No achievements added yet.</div>`;
  const refHTML = s.references.map(r => `
    <div style="background:${colors.surface};border:1px solid ${colors.border};border-radius:12px;padding:20px;animation:enterAnim 0.6s ease both">
      <div style="width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,${col},${col}88);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:18px;color:#fff;margin-bottom:12px">${(r.name||'?')[0]}</div>
      <div style="font-weight:700;font-size:15px;margin-bottom:2px">${r.name || 'Reference Name'}</div>
      <div style="color:${col};font-size:13px;margin-bottom:2px">${r.position || 'Position'} — ${r.company || 'Company'}</div>
      <div style="color:${colors.text2};font-size:12px">${r.email || ''}</div>
    </div>`).join('') || `<div style="color:${colors.text2};font-style:italic">No references added yet.</div>`;
  const avatarHTML = s.avatar
    ? `<img src="${s.avatar}" style="width:120px;height:120px;border-radius:50%;border:3px solid ${col};object-fit:cover;margin:0 auto 20px;display:block;box-shadow:0 0 0 6px ${col}22" alt="${name}">`
    : `<div style="width:100px;height:100px;border-radius:50%;background:linear-gradient(135deg,${col},${col}88);display:flex;align-items:center;justify-content:center;font-size:40px;color:#fff;margin:0 auto 20px">${name[0]||'?'}</div>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${name} — Portfolio</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:${font};background:${colors.bg};color:${colors.text};line-height:1.6}
a{color:inherit;text-decoration:none}
${animCSS}
@keyframes devNA{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
.section{padding:80px 40px;max-width:1100px;margin:0 auto}
.section-title{font-size:clamp(28px,4vw,40px);font-weight:800;letter-spacing:-1px;margin-bottom:8px}
.section-line{width:50px;height:3px;background:${col};border-radius:2px;margin-bottom:40px}
nav{position:fixed;top:0;left:0;right:0;height:60px;background:${isDark?'rgba(10,10,15,0.9)':'rgba(248,249,250,0.9)'};backdrop-filter:blur(20px);border-bottom:1px solid ${colors.border};display:flex;align-items:center;justify-content:space-between;padding:0 40px;z-index:100}
.nav-brand{font-weight:800;font-size:20px;color:${col}}
.nav-links{display:flex;gap:24px}
.nav-links a{font-size:14px;font-weight:500;color:${colors.text2};transition:color 0.2s}
.nav-links a:hover{color:${col}}
.hero{min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:80px 40px 40px;position:relative;overflow:hidden;${heroBg||`background:${colors.bg}`};${s.bgImage?`background:url(${s.bgImage}) center/cover`:''}}
.hero-overlay{position:absolute;inset:0;${heroOverlay||`background:${isDark?'rgba(0,0,0,0.5)':'rgba(255,255,255,0.6)'}`};${s.bgImage||tpl===2?'':'display:none'}}
.hero-content{position:relative;z-index:1;animation:enterAnim 0.8s ease;display:flex;flex-direction:column;align-items:center}
.hero-title{font-size:clamp(36px,7vw,80px);font-weight:800;letter-spacing:-3px;line-height:1;margin-bottom:12px}
.hero-role{font-size:clamp(16px,2.5vw,24px);color:${col};font-weight:500;margin-bottom:16px}
.hero-bio{font-size:16px;color:${colors.text2};max-width:500px;margin:0 auto 32px;line-height:1.8}
.hero-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:28px}
.btn-p{padding:13px 28px;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;border:none;font-family:${font};transition:all 0.2s}
.btn-pa{background:${col};color:#fff}
.btn-pa:hover{filter:brightness(1.1);transform:translateY(-2px)}
.btn-ps{background:transparent;color:${col};border:2px solid ${col}}
.btn-ps:hover{background:${col};color:#fff;transform:translateY(-2px)}
.skills-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:0 40px}
.projects-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:24px}
.ach-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px}
.ref-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px}
.edu-timeline{position:relative;padding-left:30px}
.edu-timeline::before{content:'';position:absolute;left:0;top:0;bottom:0;width:2px;background:${col}44}
.edu-item{position:relative;margin-bottom:24px}
.edu-item::before{content:'';position:absolute;left:-34px;top:22px;width:10px;height:10px;border-radius:50%;background:${col};border:2px solid ${colors.bg}}
.contact-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px}
.contact-item{background:${colors.surface};border:1px solid ${colors.border};border-radius:12px;padding:20px;text-align:center}
.contact-icon{font-size:24px;margin-bottom:8px}
.contact-label{font-size:12px;color:${colors.text2};text-transform:uppercase;letter-spacing:1px;margin-bottom:4px}
.contact-val{font-size:15px;font-weight:500}
footer{background:${colors.bg2};border-top:1px solid ${colors.border};padding:32px 40px;text-align:center}
.footer-copy{color:${colors.text2};font-size:14px;margin-bottom:8px}
.footer-credit{color:${colors.text2};font-size:13px}
::-webkit-scrollbar{width:5px}
::-webkit-scrollbar-track{background:${colors.bg}}
::-webkit-scrollbar-thumb{background:${col};border-radius:10px}
@media(max-width:768px){.section{padding:60px 20px}.nav-links{display:none}.hero{padding:80px 20px 40px}.hero-title{letter-spacing:-1px}}
${extraCSS}
</style>
</head>
<body>
<nav>
  <div class="nav-brand">${name.split(' ')[0]||'Portfolio'}</div>
  <div class="nav-links">
    <a href="#about">About</a><a href="#skills">Skills</a><a href="#projects">Projects</a><a href="#contact">Contact</a>
  </div>
</nav>
<section class="hero" id="home">
  <div class="hero-overlay"></div>
  <div class="hero-content">
    ${avatarHTML}
    <h1 class="hero-title">${name}</h1>
    <div class="hero-role">${role}</div>
    <p class="hero-bio">${bio}</p>
    <div class="hero-btns">
      <a href="#contact" class="btn-p btn-pa">Hire Me</a>
      <a href="#projects" class="btn-p btn-ps">View Projects</a>
      <a href="#contact" class="btn-p btn-ps">Contact Me</a>
    </div>
    <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">${socialLinks}</div>
  </div>
</section>
<section id="about"><div class="section">
  <div class="section-title">About Me</div><div class="section-line"></div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:start">
    <div>
      <p style="font-size:16px;color:${colors.text2};line-height:1.85;margin-bottom:20px">${s.about||'Add your about description in the builder.'}</p>
      ${s.experience?`<div style="display:inline-flex;align-items:center;gap:10px;background:${col}22;padding:10px 20px;border-radius:100px;margin-bottom:20px"><span style="font-size:22px;font-weight:800;color:${col}">${s.experience}</span><span style="font-size:14px;color:${colors.text2}">Years of Experience</span></div>`:''}
      ${s.resume?`<div><a href="${s.resume}" target="_blank" class="btn-p btn-pa" style="display:inline-block">Download Resume ↓</a></div>`:''}
    </div>
    <div id="education">
      <div style="font-size:20px;font-weight:700;margin-bottom:20px">Education</div>
      <div class="edu-timeline">${eduHTML}</div>
    </div>
  </div>
</div></section>
<section id="skills" style="background:${colors.bg2}"><div class="section">
  <div class="section-title">Skills</div><div class="section-line"></div>
  <div class="skills-grid">${skillsHTML}</div>
</div></section>
<section id="projects"><div class="section">
  <div class="section-title">Projects</div><div class="section-line"></div>
  <div class="projects-grid">${projectsHTML}</div>
</div></section>
<section id="achievements" style="background:${colors.bg2}"><div class="section">
  <div class="section-title">Achievements & Certificates</div><div class="section-line"></div>
  <div class="ach-grid">${achHTML}</div>
</div></section>
<section id="references"><div class="section">
  <div class="section-title">References</div><div class="section-line"></div>
  <div class="ref-grid">${refHTML}</div>
</div></section>
<section id="contact" style="background:${colors.bg2}"><div class="section">
  <div class="section-title">Contact</div><div class="section-line"></div>
  <div class="contact-grid">
    ${s.email?`<div class="contact-item"><div class="contact-icon">📧</div><div class="contact-label">Email</div><div class="contact-val">${s.email}</div></div>`:''}
    ${s.phone?`<div class="contact-item"><div class="contact-icon">📱</div><div class="contact-label">Phone</div><div class="contact-val">${s.phone}</div></div>`:''}
    ${s.location?`<div class="contact-item"><div class="contact-icon">📍</div><div class="contact-label">Location</div><div class="contact-val">${s.location}</div></div>`:''}
  </div>
</div></section>
<footer>
  <div class="footer-copy">© 2026 ${name} — Portfolio</div>
  <div class="footer-credit">Designed &amp; Developed by <a href="#" style="font-weight:700;text-decoration:none;background:linear-gradient(270deg,#a855f7,#3b82f6,#06b6d4,#ec4899,#f97316,#a855f7);background-size:400% 400%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:devNA 4s ease infinite">Nafisa Tabassum Nusrat</a></div>
</footer>
<script>
document.querySelectorAll('.skills-grid > div').forEach((el,i)=>{ el.style.animationDelay=i*0.1+'s'; });
const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.style.animationPlayState='running'}});},{threshold:0.1});
document.querySelectorAll('[style*="enterAnim"]').forEach(el=>{ el.style.animationPlayState='paused'; obs.observe(el); });
<\/script>
</body>
</html>`;
}

// ── PREVIEW ──
let previewTimer;
function updatePreview() {
  clearTimeout(previewTimer);
  previewTimer = setTimeout(() => {
    const html = generatePortfolioHTML();
    const frame = document.getElementById('preview-frame');
    const doc = frame.contentDocument || frame.contentWindow.document;
    doc.open(); doc.write(html); doc.close();
  }, 200);
}
function refreshPreview() { updatePreview(); }
function openFullscreen() {
  const html = generatePortfolioHTML();
  const frame = document.getElementById('fullscreen-frame');
  const doc = frame.contentDocument || frame.contentWindow.document;
  doc.open(); doc.write(html); doc.close();
  document.getElementById('fullscreen-modal').classList.add('open');
}
function closeFullscreen() {
  document.getElementById('fullscreen-modal').classList.remove('open');
}

// ── EXPORT ──
function exportHTML() {
  const html = generatePortfolioHTML();
  const blob = new Blob([html], { type: 'text/html' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = (state.name || 'portfolio').toLowerCase().replace(/\s+/g,'-') + '-portfolio.html';
  a.click();
}
function exportZIP() {
  alert('📦 ZIP Export: Your portfolio HTML will download now. Rename it index.html and deploy anywhere!');
  exportHTML();
}

// ── SHOW MORE TEMPLATES ──
function showMoreTemplates() {
  const hidden = document.getElementById('hidden-templates');
  const btn = document.getElementById('show-more-btn');
  hidden.classList.toggle('show');
  btn.textContent = hidden.classList.contains('show') ? '↑ Show Less Templates' : '↓ Show More Templates';
}

// ── BLOG ARTICLES ──
const articles = {
  html: {
    cat: 'Foundation', title: 'HTML Learning Guide', time: '8 min read',
    body: `<h2>What is HTML?</h2><p>HTML (HyperText Markup Language) is the standard language used to create and structure web pages. Every website you visit is built on HTML — it defines the structure and content of web pages.</p><h2>Core Concepts</h2><h3>Elements and Tags</h3><p>HTML uses tags to mark up content. Tags come in pairs — an opening tag and a closing tag:</p><pre><code>&lt;h1&gt;Hello, World!&lt;/h1&gt;\n&lt;p&gt;This is a paragraph.&lt;/p&gt;\n&lt;a href="https://example.com"&gt;Click me&lt;/a&gt;</code></pre><h3>Document Structure</h3><pre><code>&lt;!DOCTYPE html&gt;\n&lt;html lang="en"&gt;\n  &lt;head&gt;\n    &lt;meta charset="UTF-8"&gt;\n    &lt;title&gt;My Page&lt;/title&gt;\n  &lt;/head&gt;\n  &lt;body&gt;\n    &lt;h1&gt;Welcome!&lt;/h1&gt;\n  &lt;/body&gt;\n&lt;/html&gt;</code></pre><h2>Key HTML Elements</h2><ul><li><code>&lt;h1&gt;–&lt;h6&gt;</code> — Headings</li><li><code>&lt;p&gt;</code> — Paragraph</li><li><code>&lt;div&gt;</code> — Block container</li><li><code>&lt;img&gt;</code> — Images</li><li><code>&lt;a&gt;</code> — Links</li><li><code>&lt;ul&gt;, &lt;ol&gt;, &lt;li&gt;</code> — Lists</li><li><code>&lt;form&gt;, &lt;input&gt;, &lt;button&gt;</code> — Forms</li><li><code>&lt;header&gt;, &lt;nav&gt;, &lt;main&gt;, &lt;footer&gt;</code> — Semantic layout</li></ul><h2>Semantic HTML</h2><p>Use elements that convey meaning. Instead of wrapping everything in &lt;div&gt; tags, use semantic elements:</p><pre><code>&lt;header&gt;Navigation&lt;/header&gt;\n&lt;main&gt;\n  &lt;article&gt;Main content&lt;/article&gt;\n&lt;/main&gt;\n&lt;footer&gt;Footer&lt;/footer&gt;</code></pre><h2>Next Steps</h2><p>Once comfortable with HTML, move on to CSS to style your pages, then JavaScript to make them interactive.</p>`
  },
  css: {
    cat: 'Styling', title: 'CSS Learning Guide', time: '12 min read',
    body: `<h2>What is CSS?</h2><p>CSS (Cascading Style Sheets) controls the visual presentation of HTML — colors, fonts, spacing, layouts, animations. CSS transforms raw HTML into beautiful interfaces.</p><h2>Selectors & Properties</h2><pre><code>h1 { color: #6c63ff; font-size: 40px; }\n.card { background: white; border-radius: 12px; }\n#header { position: fixed; top: 0; }</code></pre><h2>The Box Model</h2><ul><li><code>margin</code> — Space outside the element</li><li><code>border</code> — The element's border</li><li><code>padding</code> — Space inside the border</li><li><code>content</code> — The actual content</li></ul><h2>Flexbox Layout</h2><pre><code>.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 20px;\n}</code></pre><h2>CSS Grid</h2><pre><code>.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 24px;\n}</code></pre><h2>Responsive Design</h2><pre><code>@media (max-width: 768px) {\n  .grid { grid-template-columns: 1fr; }\n}</code></pre><h2>CSS Variables</h2><pre><code>:root { --primary: #6c63ff; }\n.button { background: var(--primary); }</code></pre>`
  },
  js: {
    cat: 'Programming', title: 'JavaScript Learning Guide', time: '15 min read',
    body: `<h2>What is JavaScript?</h2><p>JavaScript is the programming language of the web. It runs in browsers and adds interactivity, logic, and dynamic behavior to web pages.</p><h2>Variables & Types</h2><pre><code>const name = "Alex";    // string\nlet age = 25;           // number\nlet active = true;      // boolean\nlet tags = ["js","html"]; // array\nlet user = { name, age }; // object</code></pre><h2>Functions</h2><pre><code>// Arrow function\nconst greet = (name) => \`Hello, \${name}!\`;</code></pre><h2>DOM Manipulation</h2><pre><code>const heading = document.querySelector("h1");\nheading.textContent = "Updated Title";\nheading.style.color = "#6c63ff";\nheading.classList.add("active");</code></pre><h2>Events</h2><pre><code>btn.addEventListener("click", () => {\n  alert("Clicked!");\n});</code></pre><h2>Fetch API</h2><pre><code>async function getData() {\n  const res = await fetch("https://api.example.com/data");\n  const data = await res.json();\n  console.log(data);\n}</code></pre><h2>Modern Features</h2><ul><li><strong>Destructuring:</strong> <code>const { name, age } = user;</code></li><li><strong>Spread:</strong> <code>const merged = { ...obj1, ...obj2 };</code></li><li><strong>Optional chaining:</strong> <code>user?.address?.city</code></li><li><strong>Template literals:</strong> <code>\`Hello \${name}!\`</code></li></ul>`
  },
  roadmap: {
    cat: 'Career', title: 'How to Become a Web Developer in 2026', time: '10 min read',
    body: `<h2>The Complete Web Developer Roadmap</h2><p>Becoming a web developer is achievable. With focus and consistency, you can go from zero to job-ready in 6–12 months.</p><div class="article-step"><div class="step-num">1</div><div class="step-content"><h4>Learn HTML</h4><p>Start with the foundation. Learn elements, semantic markup, forms, and accessibility. Timeline: 1–2 weeks.</p></div></div><div class="article-step"><div class="step-num">2</div><div class="step-content"><h4>Learn CSS</h4><p>Style your HTML pages. Master Flexbox, Grid, responsive design, and animations. Timeline: 3–4 weeks.</p></div></div><div class="article-step"><div class="step-num">3</div><div class="step-content"><h4>Learn JavaScript</h4><p>Add interactivity. Learn variables, functions, DOM manipulation, events, and async programming. Timeline: 2–3 months.</p></div></div><div class="article-step"><div class="step-num">4</div><div class="step-content"><h4>Learn a Framework</h4><p>Pick React — the most in-demand skill in 2026. Timeline: 1–2 months.</p></div></div><div class="article-step"><div class="step-num">5</div><div class="step-content"><h4>Learn Git & GitHub</h4><p>Version control is non-negotiable in professional development. Timeline: 1 week.</p></div></div><div class="article-step"><div class="step-num">6</div><div class="step-content"><h4>Build Real Projects</h4><p>Build at least 3–5 projects you're proud of. Portfolio, weather app, e-commerce store. Timeline: ongoing.</p></div></div><div class="article-step"><div class="step-num">7</div><div class="step-content"><h4>Create Your Portfolio</h4><p>Use DevFolio to create a stunning portfolio. Showcase your best 3–5 projects with live demos.</p></div></div><h2>Essential Tools</h2><ul><li><strong>VS Code</strong> — Best code editor</li><li><strong>Chrome DevTools</strong> — Debug in browser</li><li><strong>GitHub</strong> — Host your code</li><li><strong>Netlify / Vercel</strong> — Free deployment</li></ul>`
  },
  portfolio: {
    cat: 'Portfolio Tips', title: '10 Portfolio Tips for Developers That Actually Work', time: '6 min read',
    body: `<h2>Why Your Portfolio Matters More Than Your Resume</h2><p>Hiring managers spend an average of 6 seconds on a resume. But they'll spend minutes exploring a great portfolio. Here are 10 tips to make it exceptional.</p><div class="article-step"><div class="step-num">1</div><div class="step-content"><h4>Quality Over Quantity</h4><p>Show 3–5 of your absolute best projects — not everything you've ever built. One impressive project beats ten average ones every time.</p></div></div><div class="article-step"><div class="step-num">2</div><div class="step-content"><h4>Every Project Needs a Live Demo</h4><p>Deployed projects signal professionalism. Use GitHub Pages, Netlify, or Vercel — all free. If a recruiter can't click it, they'll skip it.</p></div></div><div class="article-step"><div class="step-num">3</div><div class="step-content"><h4>Write Compelling Project Descriptions</h4><p>Don't just say "built with React." Say what problem it solves, what decisions you made, and what you learned.</p></div></div><div class="article-step"><div class="step-num">4</div><div class="step-content"><h4>Make Your GitHub README Shine</h4><p>Every repo should have a polished README with screenshots and setup instructions. It signals that you care about documentation.</p></div></div><div class="article-step"><div class="step-num">5</div><div class="step-content"><h4>Load Fast, Look Good on Mobile</h4><p>Your portfolio itself must be fast and responsive. If it breaks on mobile, you've lost the opportunity before they've seen your work.</p></div></div><div class="article-step"><div class="step-num">6</div><div class="step-content"><h4>Use Real Content, Not Lorem Ipsum</h4><p>Placeholder text screams "unfinished." Fill every section with real, thoughtful content.</p></div></div><div class="article-step"><div class="step-num">7</div><div class="step-content"><h4>Add a Clear Call to Action</h4><p>Make it obvious with a prominent "Hire Me" button and easy-to-find contact info. Don't make people search for how to reach you.</p></div></div><div class="article-step"><div class="step-num">8</div><div class="step-content"><h4>Keep Your GitHub Active</h4><p>Green contribution squares signal a developer who codes consistently. Pin your best repos.</p></div></div><div class="article-step"><div class="step-num">9</div><div class="step-content"><h4>Show Your Personality</h4><p>Portfolios that feel human stand out. Share what you're passionate about and what kinds of problems you love solving.</p></div></div><div class="article-step"><div class="step-num">10</div><div class="step-content"><h4>Update It Regularly</h4><p>Set a reminder every 3 months to update your projects and skills. Your portfolio should always reflect where you are right now.</p></div></div><h2>The One Metric That Matters</h2><p>Ask yourself: "Would I be proud to send this link to my dream employer right now?" If yes — you're ready.</p>`
  }
};

function showArticle(key) {
  const art = articles[key];
  if (!art) return;
  document.getElementById('article-cat').textContent = art.cat;
  document.getElementById('article-title').textContent = art.title;
  document.getElementById('article-time').textContent = '⏱ ' + art.time;
  document.getElementById('article-body').innerHTML = art.body;
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('article-page').classList.add('active');
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  window.scrollTo(0, 0);
  const footer = document.getElementById('site-footer');
  if (footer) footer.style.display = 'flex';
}

// ── INIT ──
(function init() {
  addSkill();
  addProject();
  addEducation();
  addAchievement();
  addReference();
  updatePreview();
  setTimeout(updatePreview, 500);
})();

// ── LOADING SCREEN ──
(function() {
  const loader = document.getElementById('devfolio-loader');
  if (!loader) return;
  // Hide after 3 seconds
  setTimeout(function() {
    loader.classList.add('hidden');
    // Remove from DOM after transition
    setTimeout(function() {
      loader.parentNode && loader.parentNode.removeChild(loader);
    }, 600);
  }, 3000);
})();
