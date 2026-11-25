import { projects } from '../data/projects';
import { stack } from '../data/stack';
import { esc, t, ui } from '../i18n';
import { state } from '../state';

const usedIn = (techId: string) => projects.filter((p) => p.stack.includes(techId));

/** The line under the matrix: which cases use the selected technology. */
export function stackResult(): string {
  const selected = stack.flatMap((g) => g.items).find((i) => i.id === state.tech);
  const reset = `<button type="button" class="link-quiet" data-action="tech" data-value="" data-key="tech-reset">${esc(t(ui.stackReset))}</button>`;
  const cases = selected ? usedIn(selected.id) : [];
  if (!selected) return `<span class="text-muted">${esc(t(ui.stackHint))}</span>`;
  return cases.length
    ? `<span>${esc(t(ui.stackUsedIn, { name: selected.name }))}</span>
       ${cases.map((p) => `<a class="link" href="#project-${p.id}">${esc(t(p.title))}</a>`).join('')}
       ${reset}`
    : `<span>${esc(t(ui.stackNoCase, { name: selected.name }))}</span>${reset}`;
}

export function stackSection(): string {
  const groups = stack
    .map((g) => {
      const items = g.items
        .filter((i) => i.core || usedIn(i.id).length > 0)
        .map(
          (i) =>
            `<li><button type="button" class="chip" data-action="tech" data-value="${i.id}" data-key="tech:${i.id}" aria-pressed="${state.tech === i.id}">${esc(i.name)}</button></li>`,
        )
        .join('');
      return items
        ? `<div data-reveal>
            <h3 class="text-[14px] font-medium leading-5 text-fg">${esc(t(g.title))}</h3>
            <ul class="mt-3 flex flex-wrap gap-2">${items}</ul>
          </div>`
        : '';
    })
    .join('');

  return `
  <div class="mx-auto max-w-[1120px] px-5 py-14 md:py-20">
    <h2 class="section-title">${esc(t(ui.stackTitle))}</h2>
    <p class="section-lead print:hidden">${esc(t(ui.stackLead))}</p>
    <div class="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">${groups}</div>
    <p class="stack-result print:hidden" aria-live="polite">${stackResult()}</p>
  </div>`;
}
