import { contacts } from '../data/contacts';
import { esc, rich, t, ui } from '../i18n';
import { icon } from '../icons';

/** Milliseconds per typed character: the name is typed at an unhurried pace, in a little over a second. */
const TYPE_STEP = 190;

// The entrance plays once, on first load. A later re-render (language switch) shows the hero as is.
let played = false;

/** Split a line into per-character spans so they can appear one by one. Layout does not change. */
function typed(text: string, from: number): { html: string; next: number } {
  let n = from;
  const html = [...text].map((ch) => `<span class="ch" style="--c:${n++}">${esc(ch)}</span>`).join('');
  return { html, next: n };
}

export function hero(): string {
  const animate = !played;
  played = true;

  const name = `${t(contacts.name)}.`;
  const role = t(ui.heroRole);
  const first = typed(name, 0);
  // The rest of the hero fades up on its own short schedule and does not wait for the typing.
  const after = 80;

  const facts: [string, string][] = [
    [t(ui.factExperience), esc(t(ui.factExperienceValue))],
    [t(ui.factEducation), esc(t(ui.factEducationValue))],
    [t(ui.factStack), '<span class="font-mono text-[13px]">PHP / Laravel · Python · SQL</span>'],
    [t(ui.factFormat), esc(t(ui.factFormatValue))],
    [
      t(ui.factCode),
      `<a class="link font-mono text-[13px]" href="${contacts.github.url}" target="_blank" rel="noopener">${contacts.github.label}</a>`,
    ],
  ];

  const late = (extra: number) => (animate ? ` class="hero-late" style="--wait:${after + extra}ms"` : '');

  return `
  <div class="hero-bg" aria-hidden="true"></div>
  <div class="hero-inner">
    <div>
      <h1 class="hero-title${animate ? ' is-typing' : ''}" style="--step:${TYPE_STEP}ms" aria-label="${esc(`${name} ${role}`)}">
        <span class="block" aria-hidden="true">${first.html}</span>
        <span class="block text-fg2${animate ? ' hero-late' : ''}"${animate ? ` style="--wait:${after}ms"` : ''} aria-hidden="true">${esc(role)}</span>
      </h1>
      <div${late(140)}>
        <p class="mt-6 max-w-[34rem] text-[18px] leading-7 text-fg2">${rich(t(ui.heroLead))}</p>
      </div>
      <div${late(280)}>
        <div class="mt-8 flex flex-wrap gap-3 print:hidden">
          <a class="btn btn-primary" href="#projects">${esc(t(ui.heroPrimary))}${icon('arrowRight')}</a>
          <a class="btn btn-quiet" href="#contacts">${esc(t(ui.heroSecondary))}</a>
        </div>
      </div>
    </div>
    <aside class="sheet${animate ? ' hero-late' : ''}"${animate ? ` style="--wait:${after + 420}ms"` : ''} aria-label="${esc(t(ui.factsTitle))}">
      <dl>
        ${facts
          .map(
            ([k, v]) => `
        <div class="sheet-row">
          <dt>${esc(k)}</dt>
          <dd>${v}</dd>
        </div>`,
          )
          .join('')}
      </dl>
    </aside>
  </div>`;
}
