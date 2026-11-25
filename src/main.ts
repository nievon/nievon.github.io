import './style.css';
import { esc, getLang, setLang, t, ui } from './i18n';
import { icon } from './icons';
import { footer, contactsSection, processSection } from './sections/outro';
import { aboutSection } from './sections/about';
import { backdrop } from './sections/backdrop';
import { header } from './sections/header';
import { hero } from './sections/hero';
import { projectsSection } from './sections/projects';
import { stackResult, stackSection } from './sections/stack';
import { servicesSection } from './sections/services';
import { state } from './state';

const app = document.querySelector<HTMLDivElement>('#app')!;

app.innerHTML = `
  <div id="backdrop" class="backdrop" aria-hidden="true">${backdrop()}</div>
  <header id="site-header" class="site-header"></header>
  <main id="main" tabindex="-1">
    <section id="top" class="hero"></section>
    <section id="projects" class="section"></section>
    <section id="services" class="section"></section>
    <section id="about" class="section"></section>
    <section id="process" class="section"></section>
    <section id="stack" class="section"></section>
    <section id="contacts" class="section"></section>
  </main>
  <footer id="site-footer" class="section"></footer>
  <p id="live" class="sr-only" aria-live="polite"></p>
  <dialog id="lightbox" class="lightbox"></dialog>`;

const regions = {
  'site-header': header,
  top: hero,
  projects: projectsSection,
  services: servicesSection,
  stack: stackSection,
  about: aboutSection,
  process: processSection,
  contacts: contactsSection,
  'site-footer': footer,
} as const;

type Region = keyof typeof regions;

/** Re-render the given regions and put keyboard focus back where it was. */
function render(...ids: Region[]): void {
  const focused = (document.activeElement as HTMLElement | null)?.dataset.key;
  for (const id of ids.length ? ids : (Object.keys(regions) as Region[])) {
    document.getElementById(id)!.innerHTML = regions[id]();
  }
  armReveal();
  syncNav();
  if (focused) app.querySelector<HTMLElement>(`[data-key="${CSS.escape(focused)}"]`)?.focus({ preventScroll: true });
}

// --- Motion -----------------------------------------------------------------
// Blocks fade and rise once as they scroll into view. A re-render (language,
// a toggle) must not replay that, so revealed blocks are remembered by key.

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const revealed = new Set<string>();

const revealObserver = new IntersectionObserver(
  (entries) => {
    const entering = entries
      .filter((e) => e.isIntersecting)
      .sort(
        (a, b) =>
          a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left,
      );
    entering.forEach((entry, i) => {
      const el = entry.target as HTMLElement;
      const delay = Math.min(i, 4) * 80;
      revealObserver.unobserve(el);
      revealed.add(el.dataset.revealKey!);
      // Blocks that arrive together follow each other by a short step.
      el.style.transitionDelay = `${delay}ms`;
      el.classList.add('is-in');
      window.setTimeout(() => {
        el.style.transitionDelay = '';
        el.classList.add('is-done');
      }, 1300 + delay);
    });
  },
  // A block starts once a good strip of it has cleared the bottom edge.
  { rootMargin: '0px 0px -12% 0px', threshold: 0.12 },
);

function armReveal(): void {
  for (const id of Object.keys(regions) as Region[]) {
    document
      .getElementById(id)!
      .querySelectorAll<HTMLElement>('[data-reveal]')
      .forEach((el, i) => {
        if (el.dataset.revealKey) return;
        const key = `${id}:${i}`;
        el.dataset.revealKey = key;
        if (revealed.has(key) || reducedMotion.matches) el.classList.add('is-in', 'is-done');
        else revealObserver.observe(el);
      });
  }
}

// Scroll-linked value: the fill of the process timeline. One measurement per frame.
let scrollQueued = false;

function syncScroll(): void {
  scrollQueued = false;
  syncNav();
  // The backdrop marks read this one value and move by their own depth.
  if (!reducedMotion.matches) document.getElementById('backdrop')!.style.setProperty('--sy', String(window.scrollY));
  const root = document.documentElement;
  const timeline = document.querySelector<HTMLElement>('.timeline');
  if (timeline) {
    const rect = timeline.getBoundingClientRect();
    const passed = (window.innerHeight * 0.62 - rect.top) / rect.height;
    root.style.setProperty('--tl', String(Math.max(0, Math.min(1, passed))));
  }
}

// Header state: it is clear over the top of the hero and takes its surface once
// the page moves; the link of the section in view is marked, and on desktop a
// line slides under it.
let currentSection = '';

function syncNav(): void {
  const header = document.getElementById('site-header')!;
  header.classList.toggle('is-scrolled', window.scrollY > 8);

  const marker = window.innerHeight * 0.35;
  let active = '';
  for (const id of ['projects', 'services', 'about', 'process', 'stack', 'contacts']) {
    if (document.getElementById(id)!.getBoundingClientRect().top <= marker) active = id;
  }
  // The last section is short, so the end of the page counts as reaching it.
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) active = 'contacts';
  // The process section has no link of its own; it continues the About section.
  if (active === 'process') active = 'about';
  const changed = active !== currentSection;
  currentSection = active;

  header.querySelectorAll<HTMLAnchorElement>('.nav-link').forEach((link) => {
    if (link.getAttribute('href') === `#${active}`) link.setAttribute('aria-current', 'true');
    else link.removeAttribute('aria-current');
  });

  const nav = header.querySelector<HTMLElement>('.nav-desktop');
  const line = nav?.querySelector<HTMLElement>('.nav-ind');
  const link = nav?.querySelector<HTMLElement>('.nav-link[aria-current]');
  if (!nav || !line) return;
  if (link && link.offsetWidth) {
    line.style.setProperty('--x', `${link.offsetLeft + 12}px`);
    line.style.setProperty('--w', String(link.offsetWidth - 24));
    line.classList.add('is-on');
  } else {
    line.classList.remove('is-on');
  }
  // On mobile the link row scrolls sideways; keep the current link in view.
  // Only the row itself is scrolled, so the page's own scrolling is not disturbed.
  const row = header.querySelector<HTMLElement>('.mobile-nav > div');
  const current = row?.querySelector<HTMLElement>(`.nav-link[href="#${active}"]`);
  if (changed && row && current && row.offsetWidth) {
    row.scrollTo({
      left: current.offsetLeft - (row.offsetWidth - current.offsetWidth) / 2,
      behavior: reducedMotion.matches ? 'auto' : 'smooth',
    });
  }
}

function queueScroll(): void {
  if (scrollQueued) return;
  scrollQueued = true;
  requestAnimationFrame(syncScroll);
}

window.addEventListener('scroll', queueScroll, { passive: true });
window.addEventListener('resize', queueScroll);

// Hero backdrop: a patch of light over the dot grid. It drifts slowly on its
// own and follows the pointer while the pointer is over the hero.
function heroLight(): void {
  const top = document.getElementById('top')!;
  let x = 68;
  let y = 34;
  let pointer: { x: number; y: number } | null = null;
  let visible = true;
  let running = false;

  const frame = (now: number) => {
    if (!visible || reducedMotion.matches) {
      running = false;
      return;
    }
    const t = now / 1000;
    const tx = pointer ? pointer.x : 66 + 20 * Math.cos(t / 7);
    const ty = pointer ? pointer.y : 38 + 16 * Math.sin(t / 9);
    x += (tx - x) * 0.06;
    y += (ty - y) * 0.06;
    top.style.setProperty('--mx', `${x.toFixed(2)}%`);
    top.style.setProperty('--my', `${y.toFixed(2)}%`);
    requestAnimationFrame(frame);
  };
  const start = () => {
    if (running || reducedMotion.matches) return;
    running = true;
    requestAnimationFrame(frame);
  };

  top.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    const rect = top.getBoundingClientRect();
    pointer = { x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 };
  });
  top.addEventListener('pointerleave', () => {
    pointer = null;
  });
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) start();
  }).observe(top);
  reducedMotion.addEventListener('change', start);
}

function syncDocument(): void {
  document.title = t(ui.docTitle);
  document.querySelector('meta[name="description"]')?.setAttribute('content', t(ui.docDescription));
}

const announce = (text: string) => {
  document.getElementById('live')!.textContent = text;
};

/** Swap page state under a short cross-fade where the browser supports it. */
function crossfade(update: () => void): void {
  if ('startViewTransition' in document && !reducedMotion.matches) document.startViewTransition(update);
  else update();
}

/** Apply the stack selection to the page in place, so every change can transition. */
function applyTech(): void {
  const tech = state.tech;
  app.querySelectorAll<HTMLElement>('.case[data-stack]').forEach((card) => {
    card.dataset.hl = String(!!tech && card.dataset.stack!.split(' ').includes(tech));
  });
  app.querySelectorAll<HTMLElement>('.tech-line [data-tech]').forEach((el) => {
    el.classList.toggle('is-on', el.dataset.tech === tech);
  });
  app.querySelectorAll<HTMLElement>('.chip[data-action="tech"]').forEach((chip) => {
    chip.setAttribute('aria-pressed', String(chip.dataset.value === tech));
  });
  const result = app.querySelector<HTMLElement>('.stack-result');
  if (result) result.innerHTML = stackResult();
}

// --- Actions ----------------------------------------------------------------

let copyTimer: number | undefined;

async function copy(value: string, key: string): Promise<void> {
  let ok = true;
  try {
    await navigator.clipboard.writeText(value);
  } catch {
    ok = false;
  }
  state.copied = { key, ok };
  render('contacts');
  announce(t(ok ? ui.copied : ui.copyFailed));
  window.clearTimeout(copyTimer);
  copyTimer = window.setTimeout(() => {
    state.copied = null;
    render('contacts');
    announce('');
  }, 2000);
}

app.addEventListener('click', (event) => {
  const el = (event.target as HTMLElement).closest<HTMLElement>('[data-action]');
  if (!el) return;
  const value = el.dataset.value ?? '';

  switch (el.dataset.action) {
    case 'lang':
      if (value === getLang()) return;
      crossfade(() => {
        setLang(value === 'en' ? 'en' : 'ru');
        syncDocument();
        render();
      });
      break;

    case 'theme': {
      const next = state.theme === 'dark' ? 'light' : 'dark';
      crossfade(() => {
        state.theme = next;
        document.documentElement.dataset.theme = next;
        render('site-header');
      });
      try {
        localStorage.setItem('theme-v2', next);
      } catch {
        /* storage unavailable */
      }
      break;
    }

    case 'details': {
      // Toggled in place, so the panel can open and close with a transition.
      const id = el.dataset.project!;
      const open = (state.open[id] = !state.open[id]);
      const panel = document.getElementById(`details-${id}`)!;
      el.setAttribute('aria-expanded', String(open));
      panel.classList.toggle('is-open', open);
      panel.toggleAttribute('inert', !open);
      break;
    }

    case 'tech': {
      const previous = state.tech;
      state.tech = value && value !== previous ? value : null;
      applyTech();
      // The reset link disappears with the selection, so hand focus back to the chip.
      if (el.dataset.key === 'tech-reset' && previous) {
        app.querySelector<HTMLElement>(`[data-key="tech:${CSS.escape(previous)}"]`)?.focus();
      }
      break;
    }

    case 'zoom': {
      // Show whichever screenshot is on screen now, so the theme is kept.
      const shown = [...el.querySelectorAll<HTMLImageElement>('img')].find((img) => img.offsetParent !== null);
      if (!shown) break;
      const box = document.getElementById('lightbox') as HTMLDialogElement;
      box.innerHTML = `
        <button type="button" class="lightbox-close icon-btn" data-action="zoom-close" aria-label="${esc(t(ui.zoomClose))}">${icon('close', 18)}</button>
        <img src="${shown.currentSrc || shown.src}" alt="${esc(shown.alt)}" />`;
      box.showModal();
      break;
    }

    case 'zoom-close':
      (document.getElementById('lightbox') as HTMLDialogElement).close();
      break;

    case 'copy':
      void copy(value, el.dataset.copyKey!);
      break;

    case 'print':
      window.print();
      break;
  }
});

// A click on the dimmed area around the picture closes the viewer.
document.getElementById('lightbox')!.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) (event.currentTarget as HTMLDialogElement).close();
});

syncDocument();
render();
syncScroll();
heroLight();
