import { contacts } from '../data/contacts';
import { esc, getLang, t, ui } from '../i18n';
import { icon } from '../icons';
import { state } from '../state';
import { segmented } from '../ui';

const links = [
  { href: '#projects', label: ui.navProjects },
  { href: '#services', label: ui.navServices },
  { href: '#about', label: ui.navAbout },
  { href: '#stack', label: ui.navStack },
  { href: '#contacts', label: ui.navContacts },
];

// The entrance plays once, on first load.
let played = false;

export function header(): string {
  const nav = links.map((l) => `<a class="nav-link" href="${l.href}">${esc(t(l.label))}</a>`).join('');
  // Brand, links and controls drop in one after another.
  const first = !played;
  played = true;
  const drop = (wait: number) => (first ? ` hdr-in" style="--wait:${wait}ms` : '');
  const themeLabel = t(state.theme === 'dark' ? ui.themeToLight : ui.themeToDark);

  return `
  <a class="skip-link" href="#main">${esc(t(ui.skip))}</a>
  <div class="mx-auto flex h-14 max-w-[1120px] items-center gap-4 px-5">
    <a href="#top" class="flex items-baseline gap-2 py-2 text-fg no-underline${drop(0)}">
      <span class="text-[16px] font-medium">${esc(t(contacts.name))}</span>
      <span class="font-mono text-[12px] text-muted">${contacts.handle}</span>
    </a>
    <nav class="nav-desktop ml-auto hidden items-center gap-1 md:flex${drop(80)}" aria-label="${esc(t(ui.navLabel))}">${nav}<span class="nav-ind" aria-hidden="true"></span></nav>
    <div class="ml-auto flex items-center gap-2 md:ml-2${drop(160)}">
      <a class="btn btn-primary btn-nav hidden lg:inline-flex" href="#contacts">${esc(t(ui.navCta))}</a>
      ${segmented({
        label: t(ui.langLabel),
        action: 'lang',
        key: 'lang',
        current: getLang(),
        mono: true,
        options: [
          { value: 'ru', label: 'RU', title: 'Русский' },
          { value: 'en', label: 'EN', title: 'English' },
        ],
      })}
      <button type="button" class="icon-btn" data-action="theme" data-key="theme" aria-label="${esc(themeLabel)}" title="${esc(themeLabel)}">
        ${icon(state.theme === 'dark' ? 'sun' : 'moon', 18)}
      </button>
      <a class="icon-btn" href="${contacts.github.url}" target="_blank" rel="noopener" aria-label="${esc(t(ui.githubLabel))}" title="${esc(t(ui.githubLabel))}">
        ${icon('github', 18)}
      </a>
    </div>
  </div>
  <nav class="mobile-nav md:hidden${drop(160)}" aria-label="${esc(t(ui.navLabel))}">
    <div class="mx-auto flex max-w-[1120px] gap-1 overflow-x-auto px-3 pb-2">${nav}</div>
  </nav>`;
}
