/* ============================================================
   Portfolio Config, shared by index.html (live site) and admin.html (editor)
   Single source of truth for templates, defaults, persistence, and apply logic.
   ============================================================ */
(function (global) {
  'use strict';

  // ---------- 5 TEMPLATES (vibes) ----------
  // Each template is a set of CSS custom-property overrides + an optional body class
  // for fine-tuning (fonts, light-mode surface fixes, etc.).
  const TEMPLATES = {
    midnight: {
      name: 'Midnight',
      vibe: 'Deep navy · electric blue',
      bodyClass: '',
      swatch: ['#0a0e1a', '#4fb3ff', '#f4b860'],
      vars: {
        '--bg': '#0a0e1a', '--bg-elevated': '#0f1424', '--bg-card': '#131a2c', '--bg-card-hover': '#1a2238',
        '--border': 'rgba(255,255,255,0.08)', '--border-bright': 'rgba(255,255,255,0.18)',
        '--text': '#e6edf3', '--text-dim': '#98a3b8', '--text-muted': '#5b6478',
        '--accent': '#4fb3ff', '--accent-soft': 'rgba(79,179,255,0.12)', '--accent-glow': 'rgba(79,179,255,0.35)',
        '--warm': '#f4b860', '--green': '#56d394', '--lilac': '#a78bfa', '--red': '#f47272'
      }
    },
    aurora: {
      name: 'Aurora',
      vibe: 'Plum · violet & teal',
      bodyClass: 'tpl-aurora',
      swatch: ['#0c0a1d', '#a78bfa', '#5eead4'],
      vars: {
        '--bg': '#0c0a1d', '--bg-elevated': '#13102a', '--bg-card': '#181433', '--bg-card-hover': '#201a42',
        '--border': 'rgba(167,139,250,0.14)', '--border-bright': 'rgba(167,139,250,0.30)',
        '--text': '#ece8fb', '--text-dim': '#a9a0d0', '--text-muted': '#6b6394',
        '--accent': '#a78bfa', '--accent-soft': 'rgba(167,139,250,0.14)', '--accent-glow': 'rgba(167,139,250,0.42)',
        '--warm': '#5eead4', '--green': '#56d394', '--lilac': '#f0abfc', '--red': '#fb7185'
      }
    },
    ember: {
      name: 'Ember',
      vibe: 'Charcoal · amber & coral',
      bodyClass: 'tpl-ember',
      swatch: ['#140f0c', '#f4a259', '#ff7d6b'],
      vars: {
        '--bg': '#140f0c', '--bg-elevated': '#1c1511', '--bg-card': '#241a14', '--bg-card-hover': '#2e221a',
        '--border': 'rgba(244,184,96,0.14)', '--border-bright': 'rgba(244,184,96,0.30)',
        '--text': '#f6ece2', '--text-dim': '#c4a890', '--text-muted': '#8a7563',
        '--accent': '#f4a259', '--accent-soft': 'rgba(244,162,89,0.14)', '--accent-glow': 'rgba(244,162,89,0.42)',
        '--warm': '#ff7d6b', '--green': '#9bd17b', '--lilac': '#e6a0c4', '--red': '#ff6b6b'
      }
    },
    terminal: {
      name: 'Terminal',
      vibe: 'Black · phosphor green · mono',
      bodyClass: 'tpl-terminal',
      swatch: ['#050806', '#56d394', '#e8d44d'],
      vars: {
        '--bg': '#050806', '--bg-elevated': '#0a0f0b', '--bg-card': '#0c130d', '--bg-card-hover': '#111a12',
        '--border': 'rgba(86,211,148,0.16)', '--border-bright': 'rgba(86,211,148,0.32)',
        '--text': '#d6f5e0', '--text-dim': '#7fae8f', '--text-muted': '#4d6b56',
        '--accent': '#56d394', '--accent-soft': 'rgba(86,211,148,0.12)', '--accent-glow': 'rgba(86,211,148,0.42)',
        '--warm': '#e8d44d', '--green': '#56d394', '--lilac': '#5eead4', '--red': '#ff6b6b'
      }
    },
    daylight: {
      name: 'Daylight',
      vibe: 'Cream · ink · editorial',
      bodyClass: 'tpl-daylight',
      swatch: ['#f7f4ee', '#1f6feb', '#b4690e'],
      vars: {
        '--bg': '#f7f4ee', '--bg-elevated': '#ffffff', '--bg-card': '#ffffff', '--bg-card-hover': '#f1ece2',
        '--border': 'rgba(20,20,20,0.10)', '--border-bright': 'rgba(20,20,20,0.22)',
        '--text': '#1a1a1a', '--text-dim': '#55514a', '--text-muted': '#8a847a',
        '--accent': '#1f6feb', '--accent-soft': 'rgba(31,111,235,0.10)', '--accent-glow': 'rgba(31,111,235,0.22)',
        '--warm': '#b4690e', '--green': '#1a7f4b', '--lilac': '#7c3aed', '--red': '#c0392b'
      }
    }
  };

  // Template-specific CSS (fonts, light-mode surface fixes) injected once.
  const TEMPLATE_CSS = `
    /* Terminal, monospace display + square edges */
    body.tpl-terminal .hero-title,
    body.tpl-terminal .section-head h2,
    body.tpl-terminal .about-h2,
    body.tpl-terminal .contact-headline,
    body.tpl-terminal .detail-title { font-family: 'JetBrains Mono', monospace !important; letter-spacing: -0.02em; }
    body.tpl-terminal .serif { font-family: 'JetBrains Mono', monospace !important; font-style: normal !important; }
    body.tpl-terminal .hero-title .gradient,
    body.tpl-terminal .contact-headline { -webkit-text-fill-color: var(--text); background: none; }

    /* Daylight, flip dark-first hardcoded surfaces so the light theme holds together */
    body.tpl-daylight { background: var(--bg); }
    body.tpl-daylight::before {
      background-image:
        linear-gradient(rgba(0,0,0,0.035) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,0,0,0.035) 1px, transparent 1px) !important;
    }
    body.tpl-daylight .nav { background: rgba(255,255,255,0.82) !important; }
    body.tpl-daylight .hero-title .gradient,
    body.tpl-daylight .contact-left h2,
    body.tpl-daylight .contact-headline,
    body.tpl-daylight .cover-name {
      background: linear-gradient(135deg, #1a1a1a 0%, #55514a 100%) !important;
      -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
    }
    body.tpl-daylight .compact-icon { background: rgba(0,0,0,0.04); border-color: rgba(0,0,0,0.10); }
    body.tpl-daylight .compact-icon.plus { color: var(--text-dim); }
    body.tpl-daylight .tool-chip,
    body.tpl-daylight .search-input,
    body.tpl-daylight .project-block,
    body.tpl-daylight .filter-pill { background: rgba(0,0,0,0.02); }
    body.tpl-daylight .mobile-bottom-nav { background: rgba(255,255,255,0.88) !important; border-color: rgba(20,20,20,0.10); }
    body.tpl-daylight .nav-cta { color: #fff; }
    body.tpl-daylight .btn-primary { color: #fff; }
    body.tpl-daylight .detail-header { background: rgba(247,244,238,0.88) !important; }
    /* Diagram cards intentionally stay dark on Daylight (read like code blocks) */
    body.tpl-daylight .detail-diagram-card { background: #131a2c; border-color: rgba(255,255,255,0.10); }

    /* Corner roundness override (safe subset, pills keep their shape) */
    body.tpl-radius .btn,
    body.tpl-radius .cap-card,
    body.tpl-radius .project-card-compact,
    body.tpl-radius .wf-card,
    body.tpl-radius .tools-cat,
    body.tpl-radius .contact-row,
    body.tpl-radius .hero-stat,
    body.tpl-radius .stat-card,
    body.tpl-radius .interest-card { border-radius: var(--radius-override) !important; }
  `;

  // ---------- DEFAULT CONTENT (mirrors the shipped index.html) ----------
  const DEFAULT_CONFIG = {
    version: 1,
    template: 'midnight',
    style: {
      accent: '',          // '' = use template's accent; otherwise overrides
      radius: ''           // '' = default; e.g. '6px' | '14px' | '22px'
    },
    content: {
      heroTitleA: 'Multi-agent systems',
      heroTitleB: 'that run operations.',
      heroSub: 'Autonomous AI and operational workflows for startups that ship.',
      aboutHeadline: 'Operator, venture builder, building from Jos.',
      aboutP1: "I'm Mark, a Jos-based operator and venture builder with eight years spent launching and scaling African startups. My work sits at the intersection of operational systems, AI-driven workflows, and ventures that move physical goods at scale.",
      aboutP2: "Currently building Yaries, a logistics OS for 1–20 bike fleets that handles dispatch, compliance, and delivery from a single control centre. Also building Merch Jungle, Nigeria's first local print-on-demand platform, with a long-range goal of raising 30 Nigerian POD millionaires by 2028. Co-founder at Seamline Technologies.",
      aboutP3: "The thread connecting all of it: turn African ambition into scalable digital businesses. Operations is the layer that makes the rest reliable, and that's where I focus.",
      footerCopy: '© Yaries Intelligent Machines 2026'
    },
    contact: {
      email: 'mydasihit@gmail.com',
      phone: '+2348064103799',
      whatsapp: '2348064103799'
    },
    layout: {
      order: ['work', 'about', 'press', 'capabilities', 'tools', 'workflows', 'approach', 'contact'],
      visible: { work: true, about: true, press: true, capabilities: true, tools: true, workflows: true, approach: true, contact: true }
    }
  };

  const STORAGE_KEY = 'portfolioConfig';

  // ---------- Persistence ----------
  function deepMerge(base, over) {
    const out = Array.isArray(base) ? base.slice() : Object.assign({}, base);
    if (!over || typeof over !== 'object') return out;
    Object.keys(over).forEach(function (k) {
      if (over[k] && typeof over[k] === 'object' && !Array.isArray(over[k]) && base && typeof base[k] === 'object') {
        out[k] = deepMerge(base[k], over[k]);
      } else {
        out[k] = over[k];
      }
    });
    return out;
  }

  function getConfig() {
    var stored = null;
    try { stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null'); } catch (e) { stored = null; }
    return deepMerge(DEFAULT_CONFIG, stored || {});
  }

  function saveConfig(cfg) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg)); return true; } catch (e) { return false; }
  }

  function resetConfig() {
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
  }

  // ---------- Apply to a live document ----------
  function ensureTemplateStyle(doc) {
    if (!doc.getElementById('tpl-style')) {
      var s = doc.createElement('style');
      s.id = 'tpl-style';
      s.textContent = TEMPLATE_CSS;
      doc.head.appendChild(s);
    }
  }

  function applyConfig(cfg, doc) {
    doc = doc || document;
    cfg = cfg || getConfig();
    var root = doc.documentElement;
    var body = doc.body;
    ensureTemplateStyle(doc);

    // --- Template (CSS vars + body class) ---
    var tpl = TEMPLATES[cfg.template] || TEMPLATES.midnight;
    Object.keys(tpl.vars).forEach(function (k) { root.style.setProperty(k, tpl.vars[k]); });
    Object.keys(TEMPLATES).forEach(function (key) {
      var bc = TEMPLATES[key].bodyClass;
      if (bc) body.classList.remove(bc);
    });
    if (tpl.bodyClass) body.classList.add(tpl.bodyClass);

    // --- Style overrides ---
    if (cfg.style && cfg.style.accent) {
      root.style.setProperty('--accent', cfg.style.accent);
      root.style.setProperty('--accent-soft', hexToRgba(cfg.style.accent, 0.13));
      root.style.setProperty('--accent-glow', hexToRgba(cfg.style.accent, 0.38));
    }
    if (cfg.style && cfg.style.radius) {
      root.style.setProperty('--radius-override', cfg.style.radius);
      body.classList.add('tpl-radius');
    } else {
      root.style.removeProperty('--radius-override');
      body.classList.remove('tpl-radius');
    }

    // --- Content text ---
    // Only override a field when it differs from the shipped default, so the
    // original rich markup (serif accents, bold/italic) is preserved until edited.
    var c = cfg.content || {};
    var dc = DEFAULT_CONFIG.content;
    ['heroTitleA', 'heroTitleB', 'heroSub', 'aboutHeadline', 'aboutP1', 'aboutP2', 'aboutP3', 'footerCopy'].forEach(function (key) {
      if (c[key] != null && c[key] !== dc[key]) {
        setText(doc, '[data-cfg="' + key + '"]', c[key]);
      }
    });

    // --- Contact links ---
    var ct = cfg.contact || {};
    eachEl(doc, '[data-cfg-href="email"]', function (el) {
      if (ct.email) el.setAttribute('href', 'mailto:' + ct.email + '?subject=Project%20Inquiry');
    });
    eachEl(doc, '[data-cfg-href="whatsapp"]', function (el) {
      if (ct.whatsapp) el.setAttribute('href', 'https://wa.me/' + ct.whatsapp + '?text=Hi%20Mark%2C%20I%27d%20like%20to%20discuss%20a%20project');
    });
    eachEl(doc, '[data-cfg-href="phone"]', function (el) {
      if (ct.phone) el.setAttribute('href', 'tel:' + ct.phone);
    });
    eachEl(doc, '[data-cfg-href="detailEmail"]', function (el) {
      if (ct.email) el.setAttribute('href', 'mailto:' + ct.email + '?subject=Implement%20this%20workflow%20for%20my%20business');
    });

    // --- Layout: visibility + order ---
    var lay = cfg.layout || {};
    var main = doc.querySelector('main');
    if (lay.visible) {
      Object.keys(lay.visible).forEach(function (id) {
        var sec = doc.getElementById(id);
        if (sec) sec.style.display = lay.visible[id] === false ? 'none' : '';
        // hide nav links pointing to a hidden section
        eachEl(doc, '.nav-links a[href="#' + id + '"], .mb-nav-item[data-target="' + id + '"]', function (a) {
          a.style.display = lay.visible[id] === false ? 'none' : '';
        });
      });
    }
    if (lay.order && main) {
      lay.order.forEach(function (id) {
        var sec = doc.getElementById(id);
        if (sec) main.appendChild(sec); // re-append in configured order (hero has no id, stays first)
      });
    }
  }

  // ---------- helpers ----------
  function setText(doc, sel, val) {
    if (val == null) return;
    eachEl(doc, sel, function (el) { el.textContent = val; });
  }
  function eachEl(doc, sel, fn) {
    var nodes = doc.querySelectorAll(sel);
    for (var i = 0; i < nodes.length; i++) fn(nodes[i]);
  }
  function hexToRgba(hex, a) {
    var h = (hex || '').replace('#', '');
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    var n = parseInt(h, 16);
    if (isNaN(n) || h.length !== 6) return 'rgba(79,179,255,' + a + ')';
    var r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
  }

  // ---------- global published config (portfolio-config.json) ----------
  // Priority when rendering the live site:
  //   defaults  <  global portfolio-config.json (published, seen by everyone)  <  localStorage (this browser's admin edits)
  function fetchGlobal(cb) {
    try {
      fetch('./portfolio-config.json?t=' + Date.now(), { cache: 'no-store' })
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (j) { cb(j); })
        .catch(function () { cb(null); });
    } catch (e) { cb(null); }
  }

  function getLocalRaw() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null'); } catch (e) { return null; }
  }

  // ---------- live-site bootstrap ----------
  function initLiveSite() {
    // 1) Apply immediately from localStorage-or-defaults (no flash, instant for the admin).
    try { applyConfig(getConfig(), document); } catch (e) {}

    // 2) Refine with the globally-published config so every visitor sees published changes.
    fetchGlobal(function (globalCfg) {
      if (globalCfg) {
        var merged = deepMerge(DEFAULT_CONFIG, deepMerge(globalCfg, getLocalRaw() || {}));
        try { applyConfig(merged, document); } catch (e) {}
      }
    });

    // 3) Live preview channel from the admin editor (instant, no reload).
    window.addEventListener('message', function (e) {
      if (e.data && e.data.type === 'applyConfig' && e.data.config) {
        try { applyConfig(e.data.config, document); } catch (err) {}
      }
    });

    // 4) Cross-tab sync, if the admin saves in another tab, update this one live.
    window.addEventListener('storage', function (e) {
      if (e.key === STORAGE_KEY) {
        try { applyConfig(getConfig(), document); } catch (err) {}
      }
    });
  }

  global.PortfolioConfig = {
    TEMPLATES: TEMPLATES,
    DEFAULT_CONFIG: DEFAULT_CONFIG,
    STORAGE_KEY: STORAGE_KEY,
    getConfig: getConfig,
    saveConfig: saveConfig,
    resetConfig: resetConfig,
    applyConfig: applyConfig,
    initLiveSite: initLiveSite,
    hexToRgba: hexToRgba
  };
})(window);
