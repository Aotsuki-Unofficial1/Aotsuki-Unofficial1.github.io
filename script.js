'use strict';
/* ============================================================
   AOTSUKI LABS — script.js
   ============================================================ */

const DL = 'https://github.com/Aotsuki-Unofficial1/aotsuki-unofficial.github.io/releases/download/v1.0.0/KALIX.zip';

/* ── Page navigation ──────────────────────────────── */
const Pages = (() => {
  let cur = 'home';

  const LIGHT_PAGES = ['products','about','capabilities'];

  function go(pageId, opts = {}) {
    if (pageId === cur && !opts.force) return;

    document.getElementById('page-' + cur)?.classList.remove('active');
    const next = document.getElementById('page-' + pageId);
    if (!next) return;
    next.classList.add('active');
    cur = pageId;

    // Nav light/dark
    const nav = document.getElementById('nav');
    if (nav) nav.classList.toggle('on-light', LIGHT_PAGES.includes(pageId));

    // Update nav links
    document.querySelectorAll('.nl').forEach(a => {
      a.classList.toggle('active', a.dataset.page === pageId);
    });

    window.scrollTo({ top: 0, behavior: 'instant' });
    Reveal.scan();

    // Product switcher
    if (pageId === 'products') {
      const prod = opts.prod || 'v1';
      setTimeout(() => switchProd(prod), 30);
    }
  }

  function init() {
    // All elements with data-page
    document.addEventListener('click', e => {
      const el = e.target.closest('[data-page]');
      if (!el) return;

      // Skip if it's an <a> with a real href (like download links)
      if (el.tagName === 'A' && el.href && !el.href.includes('#')) return;

      e.preventDefault();
      const page = el.dataset.page;
      const prod = el.dataset.prod;
      if (page) go(page, { prod });
    });

    // Initial page
    go('home', { force: true });
  }

  return { init, go };
})();

/* ── Product tab switcher ─────────────────────────── */
function switchProd(id) {
  document.querySelectorAll('.pt').forEach(b => {
    b.classList.toggle('active', b.dataset.prod === id);
  });
  document.querySelectorAll('.prod-panel').forEach(p => {
    p.classList.toggle('active', p.id === 'prod-' + id);
  });
  if (id === 'v1') setTimeout(() => Terminal.tryStart(), 80);
}

function initProdTabs() {
  document.querySelectorAll('.pt').forEach(btn => {
    btn.addEventListener('click', () => switchProd(btn.dataset.prod));
  });

  // data-switch-prod buttons (inside v2 panel)
  document.addEventListener('click', e => {
    const el = e.target.closest('[data-switch-prod]');
    if (!el) return;
    e.stopPropagation();
    switchProd(el.dataset.prod);
  });
}

/* ── Nav ──────────────────────────────────────────── */
const Nav = (() => {
  function init() {
    const nav = document.getElementById('nav');
    if (!nav) return;

    const burger = document.getElementById('burger');
    const menu   = document.getElementById('mobile-menu');

    if (burger && menu) {
      burger.addEventListener('click', () => {
        const open = menu.classList.toggle('open');
        burger.classList.toggle('open', open);
        burger.setAttribute('aria-expanded', String(open));
      });

      // Close on mobile link click
      menu.querySelectorAll('[data-page]').forEach(a => {
        a.addEventListener('click', () => {
          menu.classList.remove('open');
          burger.classList.remove('open');
          burger.setAttribute('aria-expanded', 'false');
        });
      });
    }
  }
  return { init };
})();

/* ── Scroll Reveal ────────────────────────────────── */
const Reveal = (() => {
  let io;

  function scan() {
    const active = document.querySelector('.page.active');
    if (!active) return;
    const vh = window.innerHeight;
    active.querySelectorAll('.reveal').forEach((el, i) => {
      if (el.getBoundingClientRect().top > vh * 0.93) {
        el.classList.add('off');
        const siblings = [...(el.parentElement?.querySelectorAll(':scope > .reveal') || [])];
        const idx = siblings.indexOf(el);
        if (idx > 0) el.style.setProperty('--d', `${Math.min(idx * 80, 280)}ms`);
        io.observe(el);
      }
    });
  }

  function init() {
    io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove('off');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });

    scan();
    window.addEventListener('scroll', () => {
      document.querySelectorAll('.reveal.off').forEach(el => io.observe(el));
    }, { passive: true });
  }

  return { init, scan };
})();

/* ── Terminal ─────────────────────────────────────── */
const Terminal = (() => {
  const SCRIPT = [
    { dim: '─────────────────────────────────────────────────────' },
    { txt: 'KALIX v1.0  ·  Hardware Intelligence Engine' },
    { txt: 'Aotsuki Labs  ·  2025  ·  WIN64 Portable' },
    { dim: '─────────────────────────────────────────────────────' },
    { p:true, txt: 'Initialising kernel interface bridge...' },
    { p:true, ok:true, txt: 'Ring-0 bridge: ESTABLISHED' },
    { p:true, ok:true, txt: 'Thread pool (4 workers): ACTIVE' },
    { dim: '─────────────────────────────────────────────────────' },
    { p:true, txt: 'Phase 1 — Component Enumeration' },
    { p:true, ok:true, txt: 'CPU    Intel i9-13900K  20T/12C   [VERIFIED ✓]' },
    { p:true, ok:true, txt: 'MEM[0] SK Hynix 32GB DDR5-6000   [SN MATCH ✓]' },
    { p:true, ok:true, txt: 'MEM[1] SK Hynix 32GB DDR5-6000   [SN MATCH ✓]' },
    { p:true, ok:true, txt: 'GPU    NVIDIA RTX 4090 24GB       [CLEAN ✓]' },
    { p:true, ok:true, txt: 'SSD    Samsung 990 Pro 2TB NVMe   [CLEAN ✓]' },
    { p:true, ok:true, txt: 'MOBO   ASUS ROG MAXIMUS Z790      [BIOS v3.4]' },
    { dim: '─────────────────────────────────────────────────────' },
    { p:true, txt: 'Phase 2 — Thermal Intelligence' },
    { p:true, ok:true, txt: 'CPU die   42°C   TDP headroom: 67%' },
    { p:true, ok:true, txt: 'GPU core  38°C   Fan: 24%' },
    { p:true, ok:true, txt: 'Throttle events (60s window): 0' },
    { dim: '─────────────────────────────────────────────────────' },
    { p:true, txt: 'Phase 3 — Integrity Verification' },
    { p:true, ok:true, txt: 'Serial cross-ref: 5/5 MATCHED' },
    { p:true, ok:true, txt: 'Firmware signatures: ALL VALID' },
    { p:true, ok:true, txt: 'SHA-256 manifest: WRITTEN' },
    { dim: '─────────────────────────────────────────────────────' },
    { done:true, txt: 'AUDIT COMPLETE — 0.38ms' },
  ];

  let busy = false;

  function run(el) {
    if (busy || !el) return;
    busy = true;
    el.innerHTML = '';
    SCRIPT.forEach((l, i) => {
      setTimeout(() => {
        const d = document.createElement('div');
        d.className = 'tl tin';
        if      (l.done) d.innerHTML = `<span class="tp">›</span> <span class="tdone">${l.txt} <span class="tcur">█</span></span>`;
        else if (l.dim)  { d.className = 'tl tin tdim'; d.textContent = l.dim; }
        else if (l.p)    d.innerHTML = `<span class="tp">›</span><span class="${l.ok?'tok':''}">${l.txt}</span>`;
        else             { d.className = 'tl tin tdim'; d.textContent = l.txt; }
        el.appendChild(d);
        el.scrollTop = el.scrollHeight;
        if (i === SCRIPT.length - 1) setTimeout(() => { busy = false; }, 15000);
      }, i * 92 + 250);
    });
  }

  function tryStart() {
    const el = document.getElementById('term');
    if (el) run(el);
  }

  function init() {
    const el = document.getElementById('term');
    if (!el) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) run(el); });
    }, { threshold: 0.2 });
    io.observe(el);
  }

  return { init, tryStart };
})();

/* ── Boot ─────────────────────────────────────────── */
function boot() {
  Pages.init();
  Nav.init();
  initProdTabs();
  Reveal.init();
  Terminal.init();
}

document.readyState === 'loading'
  ? document.addEventListener('DOMContentLoaded', boot)
  : boot();