import { projects } from '../data/projects';
import { stack } from '../data/stack';
import { esc, t, ui } from '../i18n';
import { phone, state } from '../state';

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
  const shown = stack
    .map((g) => ({ ...g, items: g.items.filter((i) => i.core || usedIn(i.id).length > 0) }))
    .filter((g) => g.items.length);
  const chips = (g: (typeof shown)[number]) =>
    g.items
      .map(
        (i) =>
          `<li><button type="button" class="chip" data-action="tech" data-value="${i.id}" data-key="tech:${i.id}" aria-pressed="${state.tech === i.id}">${esc(i.name)}</button></li>`,
      )
      .join('');

  // On a phone the six groups are tabs, so the block is one screen instead of a long list.
  let body: string;
  if (phone.matches) {
    const active = shown.find((g) => g.id === state.stackGroup) ?? shown[0];
    body = `
    <div class="stack-tabs mt-6" role="group" aria-label="${esc(t(ui.stackTitle))}">
      ${shown
        .map(
          (g) =>
            `<button type="button" class="stack-tab" data-action="stack-group" data-value="${g.id}" data-key="stack-group:${g.id}" aria-pressed="${g.id === active.id}">${esc(t(g.title))}</button>`,
        )
        .join('')}
    </div>
    <ul class="stack-panel mt-4 flex flex-wrap gap-2">${chips(active)}</ul>`;
  } else {
    body = `<div class="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">${shown
      .map(
        (g) => `<div data-reveal>
            <h3 class="text-[14px] font-medium leading-5">${esc(t(g.title))}</h3>
            <ul class="mt-3 flex flex-wrap gap-2">${chips(g)}</ul>
          </div>`,
      )
      .join('')}</div>`;
  }

  return `
  <div class="mx-auto max-w-[1120px] px-5 py-14 md:py-20">
    <h2 class="section-title">${esc(t(ui.stackTitle))}</h2>
    <p class="section-lead print:hidden">${esc(t(ui.stackLead))}</p>
    ${body}
    <p class="stack-result print:hidden" aria-live="polite">${stackResult()}</p>
  </div>`;
}
