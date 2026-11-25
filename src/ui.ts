import { esc } from './i18n';

interface SegOption {
  value: string;
  label: string;
  /** Accessible name when the visible label is an abbreviation. */
  title?: string;
}

/** Two-or-three way switch built from plain toggle buttons. */
export function segmented(opts: {
  label: string;
  action: string;
  key: string;
  current: string;
  options: SegOption[];
  data?: Record<string, string>;
  mono?: boolean;
}): string {
  const data = Object.entries(opts.data ?? {})
    .map(([k, v]) => ` data-${k}="${esc(v)}"`)
    .join('');
  const buttons = opts.options
    .map(
      (o) =>
        `<button type="button" class="seg-btn${opts.mono ? ' font-mono' : ''}" data-action="${opts.action}" data-value="${esc(o.value)}"${data} data-key="${esc(opts.key)}:${esc(o.value)}" aria-pressed="${o.value === opts.current}"${o.title ? ` aria-label="${esc(o.title)}"` : ''}>${esc(o.label)}</button>`,
    )
    .join('');
  return `<div class="seg" role="group" aria-label="${esc(opts.label)}">${buttons}</div>`;
}
