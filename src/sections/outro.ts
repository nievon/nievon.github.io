import { contacts } from '../data/contacts';
import { esc, t, ui } from '../i18n';
import { icon, type IconName } from '../icons';
import { state } from '../state';
import type { L } from '../types';

export function processSection(): string {
  const steps: [IconName, L, L][] = [
    ['clipboardList', ui.processEstimate, ui.processEstimateText],
    ['codeXml', ui.processStages, ui.processStagesText],
    ['rocket', ui.processLaunch, ui.processLaunchText],
    ['wrench', ui.processSupport, ui.processSupportText],
    ['gitBranch', ui.processHandover, ui.processHandoverText],
  ];
  return `
  <div class="mx-auto max-w-[1120px] px-5 py-14 md:py-20">
    <div class="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
      <div class="process-intro">
        <h2 class="section-title">${esc(t(ui.processTitle))}</h2>
        <p class="section-lead">${esc(t(ui.processLead))}</p>
      </div>
      <ol class="timeline">
        ${steps
          .map(
            ([ic, title, text]) => `
        <li class="tl-step" data-reveal>
          <span class="tl-node" aria-hidden="true">${icon(ic, 20)}</span>
          <div class="tl-body">
            <h3>${esc(t(title))}</h3>
            <p>${esc(t(text))}</p>
          </div>
        </li>`,
          )
          .join('')}
      </ol>
    </div>
  </div>`;
}

function contactRow(key: string, ic: IconName, label: string, value: string, url: string, copyable: boolean): string {
  const copied = state.copied?.key === key ? state.copied : null;
  const copyText = copied ? t(copied.ok ? ui.copied : ui.copyFailed) : t(ui.copy);
  return `
  <li class="contact-row">
    <span class="contact-icon" aria-hidden="true">${icon(ic, 18)}</span>
    <span class="min-w-0 flex-1">
      <span class="block text-[13px] leading-5 text-fg2">${esc(label)}</span>
      <a class="link contact-value" href="${url}"${url.startsWith('http') ? ' target="_blank" rel="noopener"' : ''}>${esc(value)}</a>
    </span>
    ${
      copyable
        ? `<button type="button" class="btn btn-small${copied ? ' is-copied' : ''} print:hidden" data-action="copy" data-value="${esc(value)}" data-copy-key="${key}" data-key="copy:${key}" aria-label="${esc(t(ui.copyOf, { value }))}" title="${esc(copyText)}">
            ${icon(copied?.ok ? 'check' : 'copy')}<span class="hidden xl:inline">${esc(copyText)}</span>
          </button>`
        : ''
    }
  </li>`;
}

export function contactsSection(): string {
  return `
  <div class="mx-auto max-w-[1120px] px-5 py-14 md:py-20">
    <div class="cta" data-reveal>
      <div>
        <h2 class="cta-title">${esc(t(ui.contactsTitle))}</h2>
        <p class="cta-lead print:hidden">${esc(t(ui.contactsLead))}</p>
        <div class="mt-6 flex flex-wrap gap-3 print:hidden">
          <a class="btn btn-primary" href="${contacts.telegram.url}" target="_blank" rel="noopener">${icon('send')}${esc(t(ui.contactsCta))}</a>
          <button type="button" class="btn btn-quiet" data-action="print" data-key="print">${icon('printer')}${esc(t(ui.print))}</button>
        </div>
      </div>
      <ul class="contact-list">
        ${contactRow('telegram', 'send', 'Telegram', contacts.telegram.value, contacts.telegram.url, true)}
        ${contactRow('email', 'mail', 'Email', contacts.email.value, contacts.email.url, true)}
        ${contactRow('github', 'github', 'GitHub', contacts.github.label, contacts.github.url, false)}
      </ul>
    </div>
  </div>`;
}

export function footer(): string {
  return `
  <div class="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-2 px-5 py-8 text-[13px] leading-5 text-muted">
    <span>${esc(t(contacts.name))} · <span class="font-mono">${contacts.handle}</span></span>
    <span class="font-mono tabular-nums">${new Date().getFullYear()}</span>
  </div>`;
}
