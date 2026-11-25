import { projects } from '../data/projects';
import { stack } from '../data/stack';
import { esc, rich, t, ui } from '../i18n';
import { icon } from '../icons';
import { state } from '../state';
import type { Project } from '../types';

const techName = new Map(stack.flatMap((g) => g.items).map((i) => [i.id, i.name]));

// Photos are found by file name: src/assets/projects/<project id>.<ext>
const photoFiles = import.meta.glob<string>('../assets/projects/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
});
const photoUrl = new Map(
  Object.entries(photoFiles).map(([path, url]) => [path.split('/').pop()!.replace(/\.[^.]+$/, ''), url]),
);

function meta(p: Project): string {
  if (p.confidential) return `<span class="status">${icon('lock')}${esc(t(ui.confidential))}</span>`;
  if (!p.status) return '';
  return `<span class="status" data-tone="${p.status.tone}"><span class="status-dot" aria-hidden="true"></span>${esc(t(p.status.label))}</span>`;
}

function links(p: Project): string {
  return p.links
    .map(
      (l) =>
        `<a class="link inline-flex min-h-8 items-center gap-1" href="${l.url}" target="_blank" rel="noopener">${esc(t(l.label))}${icon(l.kind === 'repo' ? 'github' : 'arrowUpRight')}<span class="sr-only"> (${esc(t(ui.opensInNewTab))})</span></a>`,
    )
    .join('');
}

function tech(p: Project): string {
  return `
    <p class="text-[15px] leading-[22px] text-fg">${esc(t(p.technicalDetails.lead))}</p>
    <ul class="spec-list">
      ${p.technicalDetails.points.map((pt) => `<li>${esc(t(pt))}</li>`).join('')}
    </ul>
    <p class="tech-line">${p.stack
      .map((id) => `<span data-tech="${id}"${id === state.tech ? ' class="is-on"' : ''}>${esc(techName.get(id) ?? id)}</span>`)
      .join('<span aria-hidden="true"> · </span>')}</p>`;
}

function disclosure(p: Project, label: string): string {
  return `
    <button type="button" class="disclosure print:hidden" data-action="details" data-project="${p.id}" data-key="details:${p.id}" aria-expanded="${!!state.open[p.id]}" aria-controls="details-${p.id}">
      ${esc(label)}${icon('chevronDown')}
    </button>`;
}

/** Collapsible panel. It stays in the page so opening and closing can be animated. */
function more(p: Project, content: string): string {
  const open = !!state.open[p.id];
  return `
    <div id="details-${p.id}" class="case-more${open ? ' is-open' : ''}"${open ? '' : ' inert'}>
      <div class="case-more-inner"><div class="case-more-body">${content}</div></div>
    </div>`;
}

function part(title: string, text: string, outcome = false, step = 2, extra = ''): string {
  return `
    <div class="story-part${outcome ? ' is-outcome' : ''}${extra}" data-s style="--i:${step}">
      <h4>${outcome ? icon('check') : ''}${esc(title)}</h4>
      <p>${rich(text)}</p>
    </div>`;
}

/** Stack ids on the card, so a stack selection can be applied in place. */
const hl = (p: Project) =>
  `data-stack="${p.stack.join(' ')}" data-hl="${!!state.tech && p.stack.includes(state.tech)}"`;

function photo(p: Project): string {
  const light = photoUrl.get(p.id);
  const dark = photoUrl.get(`${p.id}-dark`);
  if (light) {
    // The screenshot fills the slot edge to edge, anchored to its top-left corner,
    // and opens larger on click. A `-dark` file, when present, replaces it in the dark theme.
    const alt = esc(t(p.photo!.alt));
    return `
    <button type="button" class="case-photo has-shot${dark ? ' has-dark' : ''}" data-action="zoom" data-key="zoom:${p.id}" aria-label="${esc(t(ui.zoomOf, { name: t(p.title) }))}">
      <img class="shot-light" src="${light}" alt="${alt}" loading="lazy" decoding="async" />
      ${dark ? `<img class="shot-dark" src="${dark}" alt="${alt}" loading="lazy" decoding="async" />` : ''}
      <span class="shot-zoom" aria-hidden="true">${icon('maximize')}${esc(t(ui.zoom))}</span>
    </button>`;
  }
  // Empty slot. The file hint is for the site owner and is left out of the production build.
  const hint = import.meta.env.DEV
    ? `<span>${esc(t(ui.photoSlot))}</span><code>src/assets/projects/${p.id}.webp</code>`
    : '';
  return `<div class="case-photo is-empty print:hidden" aria-hidden="true">${icon('image', 18)}${hint}</div>`;
}

/** Icon tile, project name and kind. */
function title(p: Project, withKind = true): string {
  return `
    <div class="case-title">
      <span class="case-icon" aria-hidden="true">${icon(p.icon, 20)}</span>
      <p class="case-kind">${esc(t(p.title))}${withKind ? `<span class="case-kind-sub">${esc(t(p.kind))}</span>` : ''}</p>
    </div>`;
}

/**
 * The full story of a case. On wide screens it is simply shown. On a phone the
 * cases sit in a swipeable row, so each card leads with its result and keeps the
 * problem and the work behind a "show the case" toggle.
 */
function story(p: Project, columns: boolean): string {
  const open = !!state.unfolded[p.id];
  return `
    <div class="story lead-outcome md:hidden">
      ${part(t(ui.storyOutcome), t(p.story.outcome), true, 2)}
    </div>
    <button type="button" class="fold-toggle md:hidden print:hidden" data-action="fold" data-project="${p.id}" data-key="fold:${p.id}" aria-expanded="${open}" aria-controls="fold-${p.id}">
      <span class="when-closed">${esc(t(ui.foldOpen))}</span><span class="when-open">${esc(t(ui.foldClose))}</span>${icon('chevronDown')}
    </button>
    <div id="fold-${p.id}" class="fold${open ? ' is-open' : ''}"><div class="fold-inner">
      <div class="story${columns ? ' story-columns' : ''}">
        ${part(t(ui.storyProblem), t(p.story.problem), false, 2)}
        ${part(t(ui.storySolution), t(p.story.solution), false, 3)}
        ${part(t(ui.storyOutcome), t(p.story.outcome), true, 4, ' max-md:hidden')}
      </div>
    </div></div>`;
}

/** A case with a photo: the image takes one side, the story the other. */
function photoCase(p: Project, index: number): string {
  return `
  <article id="project-${p.id}" class="case case-photo-card${index % 2 ? ' is-flipped' : ''}" ${hl(p)} data-reveal="case">
    ${photo(p)}
    <div class="case-body">
      <div class="flex flex-wrap items-center justify-between gap-x-4 gap-y-2" data-s style="--i:0">
        ${title(p)}
        ${meta(p)}
      </div>
      <h3 class="case-hook" data-s style="--i:1">${esc(t(p.hook))}</h3>
      ${story(p, false)}
      <div class="case-foot" data-s style="--i:5">
        ${links(p)}
        ${disclosure(p, t(ui.viewTech))}
      </div>
      ${more(p, tech(p))}
    </div>
  </article>`;
}

/** On a phone a case without a screenshot gets an icon panel of the same size, so every card in the row starts alike. */
function banner(p: Project): string {
  return `<div class="case-banner md:hidden print:hidden" aria-hidden="true">${icon(p.icon, 48, 1.25)}</div>`;
}

/** A wide case without a photo: the story runs in three columns. */
function wideCase(p: Project): string {
  return `
  <article id="project-${p.id}" class="case case-wide" ${hl(p)} data-reveal="case">
    ${banner(p)}
    <div class="flex flex-wrap items-center justify-between gap-x-4 gap-y-2" data-s style="--i:0">
      ${title(p)}
      ${meta(p)}
    </div>
    <h3 class="case-hook" data-s style="--i:1">${esc(t(p.hook))}</h3>
    ${story(p, true)}
    <div class="case-foot" data-s style="--i:5">
      ${links(p)}
      ${disclosure(p, t(ui.viewTech))}
    </div>
    ${more(p, tech(p))}
  </article>`;
}

/** A case without a photo: smaller, leads with the result, the rest opens on demand. */
function compactCase(p: Project, index: number): string {
  return `
  <article id="project-${p.id}" class="case case-compact" ${hl(p)} data-reveal="${index % 2 ? 'right' : 'left'}">
    ${banner(p)}
    <div data-s style="--i:0">${title(p, false)}</div>
    <h3 class="case-hook" data-s style="--i:1">${esc(t(p.hook))}</h3>
    <div class="story lead-outcome">
      ${part(t(ui.storyOutcome), t(p.story.outcome), true)}
    </div>
    ${more(
      p,
      `<div class="story">
        ${part(t(ui.storyProblem), t(p.story.problem))}
        ${part(t(ui.storySolution), t(p.story.solution))}
      </div>
      <div class="mt-4">${tech(p)}</div>`,
    )}
    <div class="case-foot" data-s style="--i:5">
      ${links(p)}
      ${disclosure(p, t(ui.more))}
    </div>
    ${p.confidential || p.status ? `<p class="case-note">${meta(p)}</p>` : ''}
  </article>`;
}

/** Position dots for a row that swipes sideways on a phone. */
export function dots(count: number): string {
  return `<div class="swipe-dots md:hidden print:hidden" aria-hidden="true">${Array.from({ length: count }, (_, i) => `<span${i === 0 ? ' class="is-on"' : ''}></span>`).join('')}</div>`;
}

export function projectsSection(): string {
  const byFeatured = (a: Project, b: Project) => Number(!!b.featured) - Number(!!a.featured);
  const withPhoto = projects.filter((p) => p.photo).sort(byFeatured);
  const wide = projects.filter((p) => !p.photo && p.wide);
  const compact = projects.filter((p) => !p.photo && !p.wide);
  return `
  <div class="mx-auto max-w-[1120px] px-5 py-14 md:py-20">
    <h2 class="section-title">${esc(t(ui.projectsTitle))}</h2>
    <p class="section-lead print:hidden">${esc(t(ui.projectsLead))}</p>
    <div class="cases swipe mt-8">
      ${withPhoto.map(photoCase).join('')}
      ${wide.map(wideCase).join('')}
      ${compact.map(compactCase).join('')}
    </div>
    ${dots(projects.length)}
  </div>`;
}
