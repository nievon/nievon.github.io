import { esc, rich, t, ui } from '../i18n';
import { icon, type IconName } from '../icons';
import type { L } from '../types';
import { dots } from './projects';

export function aboutSection(): string {
  const principles: [IconName, L, L][] = [
    ['messagesSquare', ui.aboutClearTitle, ui.aboutClearText],
    ['rocket', ui.aboutTurnkeyTitle, ui.aboutTurnkeyText],
    ['clipboardList', ui.aboutHonestTitle, ui.aboutHonestText],
  ];

  return `
  <div class="mx-auto max-w-[1120px] px-5 py-14 md:py-20">
    <div class="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
      <div>
        <h2 class="section-title">${esc(t(ui.aboutTitle))}</h2>
        <p class="about-lead" data-reveal>${rich(t(ui.aboutLead))}</p>
        <p class="about-text" data-reveal>${rich(t(ui.aboutApproach))}</p>
        <p class="about-text" data-reveal>${rich(t(ui.aboutStack))}</p>
      </div>
      <div class="min-w-0">
      <ul class="about-list swipe">
        ${principles
          .map(
            ([ic, title, text]) => `
        <li class="about-item" data-reveal>
          <span class="service-icon" aria-hidden="true">${icon(ic, 20)}</span>
          <div>
            <h3>${esc(t(title))}</h3>
            <p>${esc(t(text))}</p>
          </div>
        </li>`,
          )
          .join('')}
      </ul>
      ${dots(principles.length)}
      </div>
    </div>
  </div>`;
}
