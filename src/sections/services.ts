import { projects } from '../data/projects';
import { services, type Service } from '../data/services';
import { esc, t, ui } from '../i18n';
import { icon } from '../icons';
import { phone, state } from '../state';
import { dots } from './projects';

/** How many services lead the section as large cards. */
const FEATURED = 2;

function examples(s: Service): string {
  const cases = projects.filter((p) => s.projectIds.includes(p.id));
  cases.sort((a, b) => s.projectIds.indexOf(a.id) - s.projectIds.indexOf(b.id));
  if (!cases.length) return '';
  return `<p class="service-case">${esc(t(cases.length > 1 ? ui.servicesCases : ui.servicesCase))} ${cases
    .map((p) => `<a class="link" href="#project-${p.id}">${esc(t(p.title))}</a>`)
    .join(', ')}</p>`;
}

function card(s: Service): string {
  return `
    <div class="service-card" data-reveal>
      <dt><span class="service-icon" aria-hidden="true">${icon(s.icon, 20)}</span>${esc(t(s.title))}</dt>
      <dd>
        <p>${esc(t(s.text))}</p>
        ${examples(s)}
      </dd>
    </div>`;
}

/** A list row. On a phone the rows form an accordion: the title is a button and the text opens under it. */
function row(s: Service): string {
  const body = `<p>${esc(t(s.text))}</p>${examples(s)}`;
  if (!phone.matches) {
    return `
    <div class="service-row" data-reveal>
      <dt><span class="service-icon" aria-hidden="true">${icon(s.icon, 20)}</span>${esc(t(s.title))}</dt>
      <dd>${body}</dd>
    </div>`;
  }
  const open = !!state.acc[s.id];
  return `
    <div class="service-row is-acc" data-reveal>
      <dt>
        <button type="button" class="acc-toggle" data-action="acc" data-value="${s.id}" data-key="acc:${s.id}" aria-expanded="${open}" aria-controls="svc-${s.id}">
          <span class="service-icon" aria-hidden="true">${icon(s.icon, 20)}</span>
          <span class="min-w-0 flex-1 text-left">${esc(t(s.title))}</span>
          ${icon('chevronDown', 18)}
        </button>
      </dt>
      <dd id="svc-${s.id}" class="acc${open ? ' is-open' : ''}"${open ? '' : ' inert'}><div class="acc-inner">${body}</div></dd>
    </div>`;
}

export function servicesSection(): string {
  return `
  <div class="mx-auto max-w-[1120px] px-5 py-14 md:py-20">
    <h2 class="section-title">${esc(t(ui.servicesTitle))}</h2>
    <p class="section-lead">${esc(t(ui.servicesLead))}</p>
    <dl class="service-cards swipe mt-8">${services.slice(0, FEATURED).map(card).join('')}</dl>
    ${dots(FEATURED)}
    <dl class="services mt-8">${services.slice(FEATURED).map(row).join('')}</dl>
  </div>`;
}
