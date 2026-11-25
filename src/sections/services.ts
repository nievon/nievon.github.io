import { projects } from '../data/projects';
import { services } from '../data/services';
import { esc, t, ui } from '../i18n';
import { icon } from '../icons';

/** How many services lead the section as large cards. */
const FEATURED = 2;

export function servicesSection(): string {
  const rows = services.map((s, i) => {
      const cases = projects.filter((p) => s.projectIds.includes(p.id));
      cases.sort((a, b) => s.projectIds.indexOf(a.id) - s.projectIds.indexOf(b.id));
      return `
      <div class="${i < FEATURED ? 'service-card' : 'service-row'}" data-reveal>
        <dt><span class="service-icon" aria-hidden="true">${icon(s.icon, 20)}</span>${esc(t(s.title))}</dt>
        <dd>
          <p>${esc(t(s.text))}</p>
          ${
            cases.length
              ? `<p class="service-case">${esc(t(cases.length > 1 ? ui.servicesCases : ui.servicesCase))} ${cases
                  .map((p) => `<a class="link" href="#project-${p.id}">${esc(t(p.title))}</a>`)
                  .join(', ')}</p>`
              : ''
          }
        </dd>
      </div>`;
  });

  return `
  <div class="mx-auto max-w-[1120px] px-5 py-14 md:py-20">
    <h2 class="section-title">${esc(t(ui.servicesTitle))}</h2>
    <p class="section-lead">${esc(t(ui.servicesLead))}</p>
    <dl class="service-cards mt-8">${rows.slice(0, FEATURED).join('')}</dl>
    <dl class="services mt-8">${rows.slice(FEATURED).join('')}</dl>
  </div>`;
}
