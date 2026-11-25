import { contacts } from '../data/contacts';
import { esc, getLang, t, ui } from '../i18n';
import { icon, type IconName } from '../icons';
import { state } from '../state';
import type { L } from '../types';
import { segmented } from '../ui';

const links: { href: string; label: L; short: L; icon: IconName }[] = [
  { href: '#projects', label: ui.navProjects, short: ui.navProjects, icon: 'briefcase' },
  { href: '#about', label: ui.navAbout, short: ui.navAbout, icon: 'user' },
  { href: '#services', label: ui.navServices, short: ui.navServices, icon: 'layoutDashboard' },
  { href: '#stack', label: ui.navStack, short: ui.navStack, icon: 'codeXml' },
  { href: '#contacts', label: ui.navContacts, short: ui.navContacts, icon: 'send' },
];

// The entrance plays once, on first load.
let played = false;

export function header(): string {
  const nav = links.map((l) => `<a class="nav-link" href="${l.href}">${esc(t(l.label))}</a>`).join('');
  // Brand, links and controls drop in one after another.
  const first = !played;
  played = true;
  const drop = (wait: number) => (first ? `hdr-in" style="--wait:${wait}ms` : '');
  const themeLabel = t(state.theme === 'dark' ? ui.themeToLight : ui.themeToDark);

  return `
  <a class="skip-link" href="#main">${esc(t(ui.skip))}</a>
  <div class="mx-auto flex h-14 max-w-[1120px] items-center gap-4 px-5">
    <a href="#top" class="flex items-baseline gap-2 py-2 text-fg no-underline ${drop(0)}">
      <span class="text-[16px] font-medium">${esc(t(contacts.name))}</span>
      <span class="font-mono text-[12px] text-muted">${contacts.handle}</span>
    </a>
    <nav class="nav-desktop ml-auto hidden items-center gap-1 md:flex ${drop(80)}" aria-label="${esc(t(ui.navLabel))}">${nav}<span class="nav-ind" aria-hidden="true"></span></nav>
    <div class="ml-auto flex items-center gap-2 md:ml-2 ${drop(160)}">
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
  </div>`;
}

/** Bottom tab bar: the top-level navigation on a phone, within thumb reach. */
export function tabbar(): string {
  return `
  <nav class="tabbar-inner" aria-label="${esc(t(ui.navLabel))}">
    ${links
      .map(
        (l) =>
          `<a class="tab-link" href="${l.href}">${icon(l.icon, 20)}<span>${esc(t(l.short))}</span></a>`,
      )
      .join('')}
  </nav>`;
}
